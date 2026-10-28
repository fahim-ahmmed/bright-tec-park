'use client';
import { useCallback, useEffect, useState } from 'react';
import { Search, X, Loader2, ChevronLeft, ChevronRight, MapPin, GraduationCap, UserRound, Phone } from 'lucide-react';
import { Badge, StatusBadge, ADMISSION_STATUS, HW_STATUS, money, fmtDate } from './ui';

const inputCls = 'h-11 w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none';

const Row = ({ k, v }) => (
  <div className="flex justify-between gap-3 border-b border-slate-800/70 py-2 text-sm last:border-0">
    <span className="shrink-0 text-slate-400">{k}</span>
    <span className="break-words text-right font-semibold text-slate-100">{v || '—'}</span>
  </div>
);

export default function StudentsManager() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState(null); // { loading, data, error }

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput.trim()); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const sp = new URLSearchParams({ page: String(page) });
      if (q) sp.set('q', q);
      const res = await fetch(`/api/admin/students?${sp}`, { cache: 'no-store' });
      if (res.status === 401) { window.location.href = '/admin/login'; return; }
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'লোড করা যায়নি।');
      setItems(d.items); setTotal(d.total); setPages(d.pages);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }, [page, q]);
  useEffect(() => { load(); }, [load]);

  const open = useCallback(async (id) => {
    setDetail({ loading: true });
    try {
      const res = await fetch(`/api/admin/students/${encodeURIComponent(id)}`, { cache: 'no-store' });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'লোড করা যায়নি।');
      setDetail({ data: d });
    } catch (e) { setDetail({ error: e.message }); }
  }, []);

  // /admin/students?open=USER_ID
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('open');
    if (id) open(id);
  }, [open]);

  useEffect(() => {
    if (!detail) return;
    const onKey = (e) => e.key === 'Escape' && setDetail(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detail]);

  const d = detail?.data;
  const p = d?.profile;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-white">শিক্ষার্থী</h1>
        <p className="mt-1 text-sm text-slate-400">রেজিস্টার্ড শিক্ষার্থীদের প্রোফাইল, SSC/HSC তথ্য, ভর্তি ও পেমেন্ট এক জায়গায়।</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="নাম বা ইমেইল দিয়ে খুঁজুন…" aria-label="অনুসন্ধান" className={inputCls} />
      </div>

      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400">
              {['শিক্ষার্থী', 'কোর্স / স্ট্যাটাস', 'HSC তথ্য', 'প্রোফাইল', 'নিবন্ধন', ''].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" /></td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">কোনো শিক্ষার্থী পাওয়া যায়নি।</td></tr>
            ) : items.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-slate-800/40">
                <td className="px-4 py-3"><p className="font-bold text-white">{s.name}</p><p className="font-mono text-xs text-slate-400">{s.email}</p></td>
                <td className="px-4 py-3">{s.latestCourse ? (<><p className="line-clamp-1 max-w-[200px] text-xs">{s.latestCourse}</p><div className="mt-1"><StatusBadge map={ADMISSION_STATUS} value={s.latestStatus} /></div></>) : <span className="text-xs text-slate-500">ভর্তি নেই</span>}</td>
                <td className="px-4 py-3 text-xs text-slate-300">{s.hsc || '—'}</td>
                <td className="px-4 py-3">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.completeness}%` }} /></div>
                  <span className="text-[11px] text-slate-400">{s.completeness.toLocaleString('bn-BD')}%</span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{fmtDate(s.createdAt)}</td>
                <td className="px-4 py-3 text-right"><button type="button" onClick={() => open(s.id)} className="inline-flex h-8 cursor-pointer items-center rounded-lg border border-slate-700 px-3 text-xs font-bold text-emerald-300 hover:bg-slate-800">বিস্তারিত</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>মোট {total.toLocaleString('bn-BD')} জন</span>
        <div className="flex items-center gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((x) => x - 1)} aria-label="আগের পেজ" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
          <span>{page.toLocaleString('bn-BD')} / {pages.toLocaleString('bn-BD')}</span>
          <button type="button" disabled={page >= pages} onClick={() => setPage((x) => x + 1)} aria-label="পরের পেজ" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-4" role="dialog" aria-modal="true">
          <button type="button" aria-label="বন্ধ করুন" onClick={() => setDetail(null)} className="absolute inset-0 cursor-default" />
          <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-slate-700 bg-slate-900 shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <h2 className="text-base font-extrabold text-white">শিক্ষার্থীর বিস্তারিত</h2>
              <button type="button" onClick={() => setDetail(null)} aria-label="বন্ধ করুন" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {detail.loading && <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>}
              {detail.error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{detail.error}</p>}

              {d && (
                <>
                  <div className="flex items-center gap-4">
                    {p?.photo || d.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p?.photo || d.user.image} alt="" referrerPolicy="no-referrer" className="h-20 w-20 rounded-2xl border border-slate-700 object-cover" />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-3xl font-bold text-emerald-400">{(p?.fullName || d.user.name || '?').charAt(0).toUpperCase()}</div>
                    )}
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-extrabold text-white">{p?.fullName || d.user.name}</h3>
                      <p className="truncate font-mono text-xs text-slate-400">{d.user.email}</p>
                      {p?.phone && <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-slate-300"><Phone className="h-3 w-3 text-emerald-400" />{p.phone}</p>}
                      <p className="mt-1 text-[11px] text-slate-500">নিবন্ধন: {fmtDate(d.user.createdAt)}</p>
                    </div>
                  </div>

                  {!p ? (
                    <p className="rounded-xl border border-dashed border-slate-700 p-4 text-center text-sm text-slate-400">এই শিক্ষার্থী এখনও প্রোফাইল পূরণ করেননি।</p>
                  ) : (
                    <>
                      <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-white"><MapPin className="h-4 w-4 text-rose-400" />ঠিকানা</h4>
                        <Row k="বর্তমান" v={p.presentAddress} />
                        <Row k="স্থায়ী" v={p.permanentAddress} />
                      </section>

                      <section className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-white"><GraduationCap className="h-4 w-4 text-gold-400" />শিক্ষাগত যোগ্যতা</h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[['SSC / দাখিল', p.ssc], ['HSC / আলিম', p.hsc]].map(([label, e]) => (
                            <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                              <p className="mb-1 text-sm font-bold text-gold-300">{label}</p>
                              <Row k="প্রতিষ্ঠান" v={e?.institute} />
                              <Row k="বোর্ড" v={e?.board} />
                              <Row k="গ্রুপ" v={e?.group} />
                              <Row k="পাশের বছর" v={e?.year} />
                              <Row k="জিপিএ" v={e?.gpa} />
                              <Row k="রোল" v={e?.roll} />
                              <Row k="রেজি. নম্বর" v={e?.reg} />
                            </div>
                          ))}
                        </div>
                        {p.others?.length > 0 && (
                          <ul className="space-y-2">
                            {p.others.map((o, i) => (
                              <li key={i} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-200"><b>{o.level}</b> · {o.institute} {o.year && `· ${o.year}`} {o.result && `· ${o.result}`}</li>
                            ))}
                          </ul>
                        )}
                      </section>
                    </>
                  )}

                  <section className="space-y-2">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white"><UserRound className="h-4 w-4 text-sky-400" />ভর্তি ও ফি</h4>
                    {d.admissions.length === 0 ? <p className="text-sm text-slate-400">কোনো ভর্তি আবেদন নেই।</p> : d.admissions.map((a) => {
                      const paid = d.payments.filter((x) => x.admissionToken === a.token).reduce((s, x) => s + (Number(x.amount) || 0), 0);
                      const due = Math.max(0, (a.payableFee || 0) - paid);
                      return (
                        <div key={a.token} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div><p className="text-sm font-bold text-white">{a.courseName}</p><p className="font-mono text-xs text-slate-400">{a.token}</p></div>
                            <StatusBadge map={ADMISSION_STATUS} value={a.status} />
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="rounded-lg bg-slate-900 p-2"><p className="text-slate-400">প্রদেয়</p><p className="font-mono font-bold text-white">{money(a.payableFee)}</p></div>
                            <div className="rounded-lg bg-slate-900 p-2"><p className="text-slate-400">পরিশোধিত</p><p className="font-mono font-bold text-emerald-400">{money(paid)}</p></div>
                            <div className="rounded-lg bg-slate-900 p-2"><p className="text-slate-400">বাকি</p><p className={`font-mono font-bold ${due > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{money(due)}</p></div>
                          </div>
                        </div>
                      );
                    })}
                  </section>

                  {d.homework.length > 0 && (
                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-white">হোমওয়ার্ক ({d.homework.length.toLocaleString('bn-BD')})</h4>
                      <ul className="space-y-1.5">
                        {d.homework.slice(0, 5).map((h, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm">
                            <span className="truncate text-slate-200">{h.title}</span>
                            <StatusBadge map={HW_STATUS} value={h.status || 'submitted'} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}