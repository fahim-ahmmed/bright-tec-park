'use client';
import Link from 'next/link';
import { CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const STATUS = {
  pending: ['অনুমোদনের অপেক্ষায়', 'Awaiting confirmation', 'border-amber-500/30 bg-amber-500/10 text-amber-300'],
  verified: ['যাচাইকৃত', 'Verified', 'border-sky-500/30 bg-sky-500/10 text-sky-300'],
  enrolled: ['এনরোলড', 'Enrolled', 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'],
};

export default function CourseProgress({ admission, course }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (!admission) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><BookOpen className="h-6 w-6" /></span>
        <p className="text-sm font-bold text-white">{isBn ? 'আপনি এখনও কোনো কোর্সে ভর্তি হননি' : 'You are not enrolled in a course yet'}</p>
        <p className="mt-1 text-xs text-slate-400">{isBn ? 'অনলাইনে আবেদন করুন, ভর্তি নিশ্চিত হলে এখানে প্রোগ্রেস দেখা যাবে।' : 'Apply online. Your progress will appear here after confirmation.'}</p>
        <Link href="/admission" className="mt-5 inline-flex h-10 items-center rounded-xl bg-emerald-500 px-5 text-sm font-extrabold text-slate-950 hover:bg-emerald-400">{isBn ? 'ভর্তি আবেদন করুন' : 'Apply for admission'}</Link>
      </div>
    );
  }

  const st = STATUS[admission.status] || STATUS.pending;
  const modules = course?.modules || [];
  const done = admission.completedModules || [];
  const pct = admission.percent;
  const nf = (n) => n.toLocaleString(isBn ? 'bn-BD' : 'en-US');

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-400">{isBn ? 'বর্তমান কোর্স' : 'Current course'}</p>
            <h2 className="text-lg font-extrabold leading-snug text-white sm:text-xl">{course ? (isBn ? course.titleBn : course.titleEn) : admission.courseName}</h2>
            <p className="mt-1 font-mono text-xs text-slate-400">{admission.token} · {admission.batch}</p>
          </div>
          <span className={`rounded-lg border px-3 py-1 text-xs font-bold ${st[2]}`}>{isBn ? st[0] : st[1]}</span>
        </div>

        <div>
          <div className="mb-2 flex items-end justify-between">
            <span className="text-xs text-slate-400">{isBn ? 'কোর্স অগ্রগতি' : 'Course progress'}</span>
            <span className="text-sm font-black text-gold-400">{nf(pct)}% {isBn ? 'সম্পন্ন' : 'Completed'}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          {modules.length > 0 && <p className="mt-2 text-xs text-slate-400">{isBn ? `${nf(done.length)}/${nf(modules.length)} মডিউল শেষ` : `${done.length}/${modules.length} modules finished`}</p>}
        </div>

        {admission.status === 'pending' && (
          <p className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            {isBn ? 'আপনার ভর্তি এখনও নিশ্চিত হয়নি। ক্যাম্পাসে এসে বা বিকাশে ফি দিয়ে ভর্তি নিশ্চিত করুন।' : 'Your admission is not confirmed yet. Confirm at the campus or via bKash.'}
          </p>
        )}
      </div>

      {modules.length > 0 && (
        <ul className="divide-y divide-slate-800 border-t border-slate-800">
          {modules.map((m, i) => {
            const ok = done.includes(i);
            return (
              <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm sm:px-6">
                {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />}
                <span className={ok ? 'text-slate-300' : 'text-slate-400'}>{m}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}