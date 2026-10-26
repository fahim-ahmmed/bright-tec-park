'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Textarea, Select, SelectItem } from '@heroui/react';
import { useToaster } from '@gravity-ui/uikit';
import { CheckCircle2, Clock, RotateCcw, ExternalLink } from 'lucide-react';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const STATUS = {
  submitted: ['জমা হয়েছে', 'Submitted', 'border-sky-500/30 bg-sky-500/10 text-sky-300', Clock],
  reviewed: ['মেন্টর রিভিউ করেছেন', 'Reviewed by mentor', 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300', CheckCircle2],
  revision: ['সংশোধন প্রয়োজন', 'Needs revision', 'border-amber-500/30 bg-amber-500/10 text-amber-300', RotateCcw],
};

export default function HomeworkPanel({ defaultCourseId }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { add } = useToaster();
  const [subs, setSubs] = useState(null);
  const [courseId, setCourseId] = useState(defaultCourseId || COURSES_DATA[0].id);
  const [form, setForm] = useState({ title: '', notes: '', link: '' });
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetch('/api/homework', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { submissions: [] }))
      .then((d) => setSubs(d.submissions || []))
      .catch(() => setSubs([]));
  }, []);
  useEffect(() => { load(); }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, courseId }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      add({ name: 'hw', title: isBn ? 'হোমওয়ার্ক জমা হয়েছে' : 'Homework submitted', theme: 'success', autoHiding: 3500 });
      setForm({ title: '', notes: '', link: '' });
      load();
    } catch (err) {
      add({ name: 'hw-err', title: isBn ? 'জমা দেওয়া যায়নি' : 'Submission failed', content: err.message, theme: 'danger', autoHiding: 4500 });
    } finally { setSaving(false); }
  };

  const list = subs || [];
  const reviewed = list.filter((s) => s.status === 'reviewed').length;
  const locale = isBn ? 'bn-BD' : 'en-US';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          [isBn ? 'মোট জমা' : 'Submitted', list.length, 'text-white'],
          [isBn ? 'রিভিউ হয়েছে' : 'Reviewed', reviewed, 'text-emerald-400'],
          [isBn ? 'অপেক্ষমাণ' : 'Pending', list.filter((s) => (s.status || 'submitted') === 'submitted').length, 'text-sky-300'],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
            <p className={`font-display text-2xl font-extrabold ${c}`}>{v.toLocaleString(locale)}</p>
            <p className="text-[11px] text-slate-400">{l}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-base font-extrabold text-white">{isBn ? 'নতুন অ্যাসাইনমেন্ট জমা দিন' : 'Submit a new assignment'}</h2>
        <Select variant="bordered" label={isBn ? 'কোর্স' : 'Course'} selectedKeys={[courseId]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && setCourseId(k.currentKey)}>
          {COURSES_DATA.map((c) => <SelectItem key={c.id}>{isBn ? c.titleBn : c.titleEn}</SelectItem>)}
        </Select>
        <Input isRequired variant="bordered" label={isBn ? 'অ্যাসাইনমেন্ট বা প্রজেক্টের নাম' : 'Assignment / project title'} value={form.title} onValueChange={(v) => setForm((f) => ({ ...f, title: v }))} />
        <Input type="url" variant="bordered" label={isBn ? 'ড্রাইভ শেয়ার লিংক (ঐচ্ছিক)' : 'Drive share link (optional)'} placeholder="https://drive.google.com/..." value={form.link} onValueChange={(v) => setForm((f) => ({ ...f, link: v }))} />
        <Textarea variant="bordered" label={isBn ? 'মন্তব্য (ঐচ্ছিক)' : 'Notes (optional)'} value={form.notes} onValueChange={(v) => setForm((f) => ({ ...f, notes: v }))} />
        <Button type="submit" isLoading={saving} fullWidth className="bg-emerald-500 font-bold text-slate-950">{isBn ? 'হোমওয়ার্ক সাবমিট করুন' : 'Submit homework'}</Button>
      </form>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <h2 className="border-b border-slate-800 px-5 py-4 text-base font-extrabold text-white">{isBn ? 'আমার জমা দেওয়া হোমওয়ার্ক' : 'My submissions'}</h2>
        {subs === null ? (
          <p className="p-6 text-center text-xs text-slate-400">…</p>
        ) : list.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-400">{isBn ? 'এখনও কোনো হোমওয়ার্ক জমা দেননি।' : 'You have not submitted any homework yet.'}</p>
        ) : (
          <ul className="divide-y divide-slate-800">
            {list.map((s) => {
              const st = STATUS[s.status] || STATUS.submitted;
              const Icon = st[3];
              return (
                <li key={s.id} className="space-y-2 px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{s.title}</p>
                      <p className="font-mono text-[11px] text-slate-500">{new Date(s.createdAt).toLocaleDateString(locale)}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold ${st[2]}`}><Icon className="h-3.5 w-3.5" />{isBn ? st[0] : st[1]}</span>
                  </div>
                  {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-300 hover:underline"><ExternalLink className="h-3 w-3" />{isBn ? 'জমা দেওয়া ফাইল' : 'Submitted file'}</a>}
                  {s.mentorNote && <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed text-slate-300"><span className="font-bold text-emerald-300">{isBn ? 'মেন্টরের মন্তব্য: ' : 'Mentor note: '}</span>{s.mentorNote}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}