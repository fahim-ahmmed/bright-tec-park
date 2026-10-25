'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Textarea, Select, SelectItem, Chip } from '@heroui/react';
import { useToaster } from '@gravity-ui/uikit';
import { LogOut, ShieldCheck, HardDrive, BookOpen, Upload, Calendar, Clock, Sparkles, CheckCircle2, ClipboardList } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentDashboard({ user }) {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const router = useRouter();
  const { add } = useToaster();
  const [tab, setTab] = useState('overview');
  const [admissions, setAdmissions] = useState(null);
  const [subs, setSubs] = useState([]);
  const [courseId, setCourseId] = useState(COURSES_DATA[0].id);
  const [form, setForm] = useState({ title: '', notes: '', link: '' });
  const [saving, setSaving] = useState(false);
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

  const loadSubs = () => fetch('/api/homework').then((r) => (r.ok ? r.json() : { submissions: [] })).then((d) => setSubs(d.submissions || [])).catch(() => {});
  useEffect(() => {
    fetch('/api/admissions').then((r) => (r.ok ? r.json() : { admissions: [] })).then((d) => setAdmissions(d.admissions || [])).catch(() => setAdmissions([]));
    loadSubs();
  }, []);

  const out = async () => { await signOut(); router.push('/'); router.refresh(); };

  const submitHomework = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, courseId }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      add({ name: 'hw', title: isBn ? 'হোমওয়ার্ক জমা হয়েছে' : 'Homework submitted', theme: 'success', autoHiding: 3500 });
      setForm({ title: '', notes: '', link: '' });
      loadSubs();
    } catch (err) {
      add({ name: 'hw-err', title: isBn ? 'জমা দেওয়া যায়নি' : 'Submission failed', content: err.message, theme: 'danger', autoHiding: 4500 });
    } finally { setSaving(false); }
  };

  const tabs = [
    ['overview', Sparkles, isBn ? 'ওভারভিউ' : 'Overview'],
    ['materials', BookOpen, isBn ? 'কোর্স ফাইল' : 'Materials'],
    ['submit', Upload, isBn ? 'হোমওয়ার্ক' : 'Homework'],
    ['routine', Calendar, isBn ? 'ক্লাস রুটিন' : 'Routine'],
  ];
  const routine = [
    ['text-emerald-400', 'সাপ্তাহিক ক্লাস ডে: রবি, মঙ্গল, বৃহস্পতি', 'সকাল ১০:০০ - ১২:০০'],
    ['text-sky-400', 'শুক্রবার স্পেশাল ল্যাব প্র্যাকটিস', 'বিকাল ৩:০০ - ৫:০০'],
    ['text-amber-400', 'BTEB বোর্ড ফাইনাল মক টেস্ট', 'মাসের শেষ শনিবার'],
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {user.image ? <img src={user.image} alt="" className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/50" referrerPolicy="no-referrer" /> :
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg shrink-0">{(user.name || '?').charAt(0).toUpperCase()}</div>}
          <div className="min-w-0">
            <h1 className="font-bold text-white text-base truncate">{user.name}</h1>
            <p className="text-xs text-slate-400 font-mono truncate">{user.email}</p>
          </div>
        </div>
        <Button color="danger" variant="flat" onPress={out} startContent={<LogOut className="w-4 h-4" />}>{t('btn_logout')}</Button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2" role="tablist">
        {tabs.map(([id, Icon, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer ${tab === id ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/drive" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex items-center gap-3 text-sm font-bold text-white"><HardDrive className="w-5 h-5 text-amber-400" />{isBn ? 'গুগল ড্রাইভ পোর্টাল' : 'Google Drive portal'}</Link>
            <Link href="/verify" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex items-center gap-3 text-sm font-bold text-white"><ShieldCheck className="w-5 h-5 text-sky-400" />{isBn ? 'সনদ যাচাই' : 'Verify certificate'}</Link>
          </div>
          <section className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-emerald-400" />{isBn ? 'আমার ভর্তি আবেদনসমূহ' : 'My admission applications'}</h2>
            {admissions === null ? <p className="text-xs text-slate-400">…</p> : admissions.length === 0 ? (
              <p className="text-xs text-slate-400">{isBn ? 'এখনও কোনো আবেদন নেই।' : 'No applications yet.'} <Link href="/admission" className="text-emerald-400 font-bold">{isBn ? 'ভর্তি আবেদন করুন' : 'Apply now'}</Link></p>
            ) : (
              <ul className="space-y-2">
                {admissions.map((a) => (
                  <li key={a.token} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="min-w-0"><div className="font-semibold text-white">{a.courseName}</div><div className="font-mono text-emerald-400">{a.token}</div></div>
                    <Chip size="sm" color={a.status === 'enrolled' ? 'success' : a.status === 'verified' ? 'primary' : 'warning'} variant="flat">{a.status}</Chip>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {tab === 'materials' && (
        <div className="space-y-3">
          <Select variant="bordered" label={isBn ? 'কোর্স নির্বাচন করুন' : 'Select course'} selectedKeys={[courseId]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && setCourseId(k.currentKey)}>
            {COURSES_DATA.map((c) => <SelectItem key={c.id}>{isBn ? c.titleBn : c.titleEn}</SelectItem>)}
          </Select>
          <ul className="space-y-2">
            {course.modules.map((m, i) => (
              <li key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"><span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">{i + 1}</span>{m}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-400">{isBn ? 'লেকচার শিট ও প্রজেক্ট ফাইল গুগল ড্রাইভে সংরক্ষিত।' : 'Lecture sheets and project files are stored in Google Drive.'} <Link href="/drive" className="text-amber-300 font-bold">{isBn ? 'ড্রাইভ পোর্টালে যান' : 'Open Drive portal'}</Link></p>
        </div>
      )}

      {tab === 'submit' && (
        <div className="space-y-4">
          <form onSubmit={submitHomework} className="space-y-3">
            <Select variant="bordered" label={isBn ? 'কোর্স' : 'Course'} selectedKeys={[courseId]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && setCourseId(k.currentKey)}>
              {COURSES_DATA.map((c) => <SelectItem key={c.id}>{isBn ? c.titleBn : c.titleEn}</SelectItem>)}
            </Select>
            <Input isRequired variant="bordered" label={isBn ? 'অ্যাসাইনমেন্ট বা প্রজেক্টের নাম' : 'Assignment / project title'} value={form.title} onValueChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <Input type="url" variant="bordered" label={isBn ? 'ড্রাইভ শেয়ার লিংক (ঐচ্ছিক)' : 'Drive share link (optional)'} placeholder="https://drive.google.com/..." value={form.link} onValueChange={(v) => setForm((f) => ({ ...f, link: v }))} />
            <Textarea variant="bordered" label={isBn ? 'মন্তব্য (ঐচ্ছিক)' : 'Notes (optional)'} value={form.notes} onValueChange={(v) => setForm((f) => ({ ...f, notes: v }))} />
            <Button type="submit" isLoading={saving} fullWidth className="bg-emerald-500 text-slate-950 font-bold">{isBn ? 'হোমওয়ার্ক সাবমিট করুন' : 'Submit homework'}</Button>
          </form>
          {subs.length > 0 && (
            <ul className="space-y-2">
              {subs.map((s, i) => (
                <li key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span className="text-slate-200 font-semibold truncate">{s.title}</span><span className="ml-auto text-slate-500 font-mono shrink-0">{new Date(s.createdAt).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}</span></li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'routine' && (
        <div className="space-y-3">
          {routine.map(([c, a, b]) => (
            <div key={a} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-2"><Clock className={`w-4 h-4 ${c}`} /><span className="font-bold text-white">{a}</span></div>
              <span className={`${c} font-mono text-[11px] font-bold`}>{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
