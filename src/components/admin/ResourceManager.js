'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToaster } from '@gravity-ui/uikit';
import { COURSES_DATA } from '@/data/mockData';

const inputCls = 'h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const initialValue = (f, row, defaults) => {
  const raw = row ? row[f.key] : defaults[f.key];
  if (f.type === 'checkbox') return raw === undefined ? (defaults[f.key] ?? false) : !!raw;
  if (f.type === 'modules') return Array.isArray(raw) ? raw : [];
  if (f.type === 'date') return raw ? String(raw).slice(0, 10) : '';
  return raw ?? '';
};

export default function ResourceManager({ config }) {
  const {
    resource, title, subtitle, columns, fields, filter,
    canCreate = false, canEdit = true, canDelete = true,
    defaults = {}, searchPlaceholder = 'খুঁজুন…', rowActions = [], prefillKey,
    createLabel = 'নতুন যোগ করুন', emptyText = 'কোনো তথ্য পাওয়া যায়নি।',
  } = config;
  const { add } = useToaster();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [fv, setFv] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [modal, setModal] = useState(null); // { mode, row? }
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput.trim()); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const sp = new URLSearchParams({ page: String(page), limit: '20' });
      if (q) sp.set('q', q);
      if (fv) sp.set('filter', fv);
      const res = await fetch(`/api/admin/${resource}?${sp}`, { cache: 'no-store' });
      if (res.status === 401) { window.location.href = '/admin/login'; return; }
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'তথ্য লোড করা যায়নি।');
      setItems(d.items); setTotal(d.total); setPages(d.pages);
    } catch (e) { setLoadError(e.message); } finally { setLoading(false); }
  }, [resource, page, q, fv]);

  useEffect(() => { load(); }, [load]);

  const openCreate = useCallback((prefill = {}) => {
    const d = { ...defaults, ...prefill };
    setForm(Object.fromEntries(fields.filter((f) => f.onlyOn !== 'edit').map((f) => [f.key, initialValue(f, null, d)])));
    setFormError('');
    setModal({ mode: 'create' });
  }, [defaults, fields]);

  const openEdit = (row) => {
    setForm(Object.fromEntries(fields.filter((f) => f.onlyOn !== 'create').map((f) => [f.key, initialValue(f, row, defaults)])));
    setFormError('');
    setModal({ mode: 'edit', row });
  };

  // ?new=VALUE opens the create form with `prefillKey` filled (used from the admissions page → payments).
  useEffect(() => {
    if (!prefillKey || !canCreate) return;
    const v = new URLSearchParams(window.location.search).get('new');
    if (v) openCreate({ [prefillKey]: v });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const edit = modal.mode === 'edit';
      const res = await fetch(edit ? `/api/admin/${resource}/${modal.row.id}` : `/api/admin/${resource}`, {
        method: edit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'সংরক্ষণ করা যায়নি।');
      add({ name: `adm-${Date.now()}`, title: 'সংরক্ষিত হয়েছে', theme: 'success', autoHiding: 2500 });
      setModal(null);
      load();
    } catch (err) { setFormError(err.message); } finally { setSaving(false); }
  };

  const remove = async (row) => {
    if (!window.confirm('এই তথ্যটি স্থায়ীভাবে মুছে ফেলবেন?')) return;
    try {
      const res = await fetch(`/api/admin/${resource}/${row.id}`, { method: 'DELETE' });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'মুছে ফেলা যায়নি।');
      add({ name: `adm-${Date.now()}`, title: 'মুছে ফেলা হয়েছে', theme: 'success', autoHiding: 2500 });
      load();
    } catch (err) { add({ name: `adm-err-${Date.now()}`, title: 'ব্যর্থ হয়েছে', content: err.message, theme: 'danger', autoHiding: 4000 }); }
  };

  const setVal = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const renderField = (f) => {
    const locked = modal.mode === 'edit' && f.lockOnEdit;
    const wrap = (child) => (
      <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
        <span className="mb-1.5 block text-xs font-semibold text-slate-300">{f.label}{f.required ? ' *' : ''}</span>
        {child}
        {f.hint && <span className="mt-1 block text-[11px] text-slate-500">{f.hint}</span>}
      </div>
    );

    if (f.type === 'checkbox') {
      return (
        <label key={f.key} className="flex h-10 cursor-pointer items-center gap-2.5 text-sm text-slate-200">
          <input type="checkbox" checked={!!form[f.key]} onChange={setVal(f.key)} className="h-4 w-4 accent-emerald-500" />{f.label}
        </label>
      );
    }
    if (f.type === 'textarea') return wrap(<textarea rows={f.rows || 3} value={form[f.key] ?? ''} onChange={setVal(f.key)} placeholder={f.placeholder} className={`${inputCls} h-auto py-2.5`} />);
    if (f.type === 'select') {
      return wrap(
        <select value={form[f.key] ?? ''} onChange={setVal(f.key)} disabled={locked} className={inputCls}>
          {!f.required && <option value="">—</option>}
          {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      );
    }
    if (f.type === 'modules') {
      const course = COURSES_DATA.find((c) => c.id === form.courseId);
      const done = form[f.key] || [];
      const toggle = (i) => setForm((s) => ({ ...s, [f.key]: done.includes(i) ? done.filter((x) => x !== i) : [...done, i] }));
      return wrap(
        !course ? <p className="text-xs text-slate-500">কোর্স পাওয়া যায়নি।</p> : (
          <ul className="space-y-1.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            {course.modules.map((m, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-300">
                  <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500" />{m}
                </label>
              </li>
            ))}
          </ul>
        )
      );
    }
    return wrap(
      <input
        type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
        value={form[f.key] ?? ''} onChange={setVal(f.key)} placeholder={f.placeholder}
        required={f.required} disabled={locked} min={f.type === 'number' ? 0 : undefined} className={inputCls}
      />
    );
  };

  const visibleFields = modal ? fields.filter((f) => f.onlyOn !== (modal.mode === 'edit' ? 'create' : 'edit')) : [];
  const showActions = canEdit || canDelete || rowActions.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        {canCreate && (
          <button type="button" onClick={() => openCreate()} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-extrabold text-slate-950 hover:bg-emerald-400"><Plus className="h-4 w-4" />{createLabel}</button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder={searchPlaceholder} aria-label="অনুসন্ধান" className={`${inputCls} h-11 pl-10`} />
        </div>
        {filter && (
          <select value={fv} onChange={(e) => { setFv(e.target.value); setPage(1); }} aria-label="ফিল্টার" className={`${inputCls} h-11 sm:w-52`}>
            <option value="">{filter.label}</option>
            {filter.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        )}
      </div>

      {loadError && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{loadError}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400">
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>)}
              {showActions && <th className="px-4 py-3 text-right font-semibold">অ্যাকশন</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-400"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-400">{emptyText}</td></tr>
            ) : items.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-800/40">
                {columns.map((c) => <td key={c.key} className="px-4 py-3 align-top text-slate-200">{c.render ? c.render(row) : (row[c.key] ?? '—')}</td>)}
                {showActions && (
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center justify-end gap-1.5">
                      {rowActions.filter((a) => !a.show || a.show(row)).map((a) => (
                        <Link key={a.label} href={a.href(row)} className="inline-flex h-8 items-center rounded-lg border border-slate-700 px-2.5 text-xs font-bold text-sky-300 hover:bg-slate-800">{a.label}</Link>
                      ))}
                      {canEdit && <button type="button" onClick={() => openEdit(row)} aria-label="এডিট" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-700 text-emerald-300 hover:bg-slate-800"><Pencil className="h-3.5 w-3.5" /></button>}
                      {canDelete && <button type="button" onClick={() => remove(row)} aria-label="মুছুন" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-rose-500/30 text-rose-300 hover:bg-rose-500/10"><Trash2 className="h-3.5 w-3.5" /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>মোট {total.toLocaleString('bn-BD')} টি</span>
        <div className="flex items-center gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="আগের পেজ" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
          <span>{page.toLocaleString('bn-BD')} / {pages.toLocaleString('bn-BD')}</span>
          <button type="button" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} aria-label="পরের পেজ" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
          <button type="button" aria-label="বন্ধ করুন" onClick={() => setModal(null)} className="absolute inset-0 cursor-default" />
          <form onSubmit={save} className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-slate-700 bg-slate-900 shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <h2 className="text-base font-extrabold text-white">{modal.mode === 'edit' ? 'তথ্য এডিট করুন' : createLabel}</h2>
              <button type="button" onClick={() => setModal(null)} aria-label="বন্ধ করুন" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2">{visibleFields.map(renderField)}</div>
            {formError && <p role="alert" className="mx-5 mb-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{formError}</p>}
            <div className="flex justify-end gap-2.5 border-t border-slate-800 px-5 py-4">
              <button type="button" onClick={() => setModal(null)} className="h-11 cursor-pointer rounded-xl border border-slate-700 px-5 text-sm font-bold text-slate-200 hover:bg-slate-800">বাতিল</button>
              <button type="submit" disabled={saving} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />}সংরক্ষণ করুন</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}