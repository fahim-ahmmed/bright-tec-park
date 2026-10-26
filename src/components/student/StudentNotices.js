'use client';
import { Bell, CalendarDays, Megaphone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CATS = {
  Admission: ['ভর্তি', 'Admission', 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'],
  Scholarship: ['স্কলারশিপ', 'Scholarship', 'border-gold-400/30 bg-gold-400/10 text-gold-300'],
  Exam: ['পরীক্ষা', 'Exam', 'border-sky-500/30 bg-sky-500/10 text-sky-300'],
  Event: ['ক্যাম্পাস', 'Campus', 'border-violet-500/30 bg-violet-500/10 text-violet-300'],
  Closure: ['ক্লাস/ল্যাব বন্ধ', 'Closure', 'border-rose-500/30 bg-rose-500/10 text-rose-300'],
  Holiday: ['ছুটি', 'Holiday', 'border-orange-500/30 bg-orange-500/10 text-orange-300'],
  General: ['সাধারণ', 'General', 'border-slate-600 bg-slate-800 text-slate-300'],
};

export default function StudentNotices({ notices = [], compact = false, onMore }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-white"><Bell className="h-4.5 w-4.5 text-gold-400" />{isBn ? 'নোটিশ বোর্ড' : 'Notice board'}</h2>
        {compact && onMore && <button type="button" onClick={onMore} className="cursor-pointer text-xs font-bold text-emerald-300 hover:underline">{isBn ? 'সব দেখুন →' : 'View all →'}</button>}
      </div>

      {notices.length === 0 ? (
        <p className="p-8 text-center text-sm text-slate-400">{isBn ? 'এই মুহূর্তে কোনো নোটিশ নেই।' : 'No notices right now.'}</p>
      ) : (
        <ul className="divide-y divide-slate-800">
          {notices.map((n, i) => {
            const cat = CATS[n.category] || CATS.General;
            const title = isBn ? n.titleBn : n.titleEn || n.titleBn;
            const body = isBn ? n.bodyBn : n.bodyEn || n.bodyBn;
            return (
              <li key={n.id || i} className={`flex gap-3.5 px-5 py-4 ${n.isUrgent ? 'bg-gold-400/5' : ''}`}>
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${n.isUrgent ? 'bg-gold-400/15 text-gold-400' : 'bg-slate-800 text-slate-400'}`}>
                  {n.isUrgent ? <Megaphone className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${cat[2]}`}>{isBn ? cat[0] : cat[1]}</span>
                    {n.isUrgent && <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" />{isBn ? 'জরুরি' : 'Urgent'}</span>}
                    {n.date && <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500"><CalendarDays className="h-3 w-3" />{n.date}</span>}
                  </div>
                  <p className="text-sm font-semibold leading-relaxed text-slate-100">{title}</p>
                  {body && !compact && <p className="text-xs leading-relaxed text-slate-400">{body}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}