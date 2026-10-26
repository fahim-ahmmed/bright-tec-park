'use client';
import { useEffect, useState } from 'react';
import { CalendarDays, Clock, MapPin, FlaskConical, FileCheck2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// [bn, en, JS getDay()]
const WEEK = [['শনি', 'Sat', 6], ['রবি', 'Sun', 0], ['সোম', 'Mon', 1], ['মঙ্গল', 'Tue', 2], ['বুধ', 'Wed', 3], ['বৃহস্পতি', 'Thu', 4], ['শুক্র', 'Fri', 5]];

const SHIFT = {
  morning: ['সকাল (৯:০০টা - ১১:০০টা)', 'Morning (9:00 - 11:00)'],
  noon: ['দুপুর (১১:০০টা - ১:০০টা)', 'Noon (11:00 - 1:00)'],
  afternoon: ['বিকাল (৩:০০টা - ৫:০০টা)', 'Afternoon (3:00 - 5:00)'],
  evening: ['সান্ধ্যকালীন (৬:০০টা - ৮:০০টা)', 'Evening (6:00 - 8:00)'],
  weekend: ['শুক্র-শনিবার বিশেষ ব্যাচ', 'Fri–Sat special batch'],
};

export default function ClassRoutine({ admission, course }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [today, setToday] = useState(-1);
  useEffect(() => { setToday(new Date().getDay()); }, []);

  if (!admission || !course) {
    return <p className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-400">{isBn ? 'ভর্তি নিশ্চিত হলে আপনার ক্লাস রুটিন এখানে দেখা যাবে।' : 'Your class routine will appear here once you are enrolled.'}</p>;
  }

  const batch = course.batchInfo;
  const scheduleBn = batch.scheduleBn;
  const shift = SHIFT[admission.shift];

  const rows = [
    [Clock, 'text-emerald-400', isBn ? 'ব্যাচ শিডিউল' : 'Batch schedule', isBn ? scheduleBn : batch.scheduleEn],
    shift && [Clock, 'text-sky-400', isBn ? 'আপনার পছন্দের শিফট' : 'Your preferred shift', isBn ? shift[0] : shift[1]],
    [MapPin, 'text-rose-400', isBn ? 'ল্যাব / স্থান' : 'Lab / venue', isBn ? 'বেঙ্গল কম্পিউটার ল্যাব, ১ম তলা, জনতা ব্যাংক ভবন, সিঙ্গার মোড়' : 'Bengal Computer Lab, 1st floor, Janata Bank Building, Singer Mor'],
    [FlaskConical, 'text-gold-400', isBn ? 'বিশেষ ল্যাব প্র্যাকটিস' : 'Special lab practice', isBn ? 'শুক্রবার বিকাল ৩:০০ - ৫:০০' : 'Friday 3:00 - 5:00 PM'],
    [FileCheck2, 'text-violet-400', isBn ? 'মক টেস্ট / বোর্ড পরীক্ষার প্রস্তুতি' : 'Mock test / board exam prep', isBn ? 'প্রতি মাসের শেষ শনিবার' : 'Last Saturday of every month'],
  ].filter(Boolean);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
        <h2 className="mb-1 flex items-center gap-2 text-base font-extrabold text-white"><CalendarDays className="h-4.5 w-4.5 text-emerald-400" />{isBn ? 'সাপ্তাহিক ক্লাস' : 'Weekly classes'}</h2>
        <p className="mb-4 text-xs text-slate-400">{isBn ? course.titleBn : course.titleEn} · {isBn ? batch.batchCodeBn : batch.batchCodeEn}</p>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {WEEK.map(([bn, en, js]) => {
            const has = scheduleBn.includes(bn);
            const isToday = today === js;
            return (
              <div key={en} className={`flex flex-col items-center rounded-xl border px-1 py-3 text-center transition-colors ${has ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-800 bg-slate-950/50'} ${isToday ? 'ring-2 ring-gold-400/60' : ''}`}>
                <span className={`text-[11px] font-bold sm:text-xs ${has ? 'text-emerald-300' : 'text-slate-500'}`}>{isBn ? bn : en}</span>
                <span className={`mt-1.5 h-2 w-2 rounded-full ${has ? 'bg-emerald-400' : 'bg-slate-700'}`} />
              </div>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-2 text-[11px] text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />{isBn ? 'ক্লাসের দিন' : 'Class day'}<span className="ml-3 h-2 w-2 rounded-full ring-2 ring-gold-400/60" />{isBn ? 'আজ' : 'Today'}</p>
      </section>

      <ul className="space-y-2.5">
        {rows.map(([Icon, tone, label, value]) => (
          <li key={label} className="flex items-start gap-3.5 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800"><Icon className={`h-4 w-4 ${tone}`} /></span>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">{label}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}