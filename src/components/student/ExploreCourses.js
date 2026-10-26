'use client';
import Link from 'next/link';
import { Clock, Award, ArrowRight } from 'lucide-react';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function ExploreCourses({ enrolledIds = [] }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const locale = isBn ? 'bn-BD' : 'en-US';
  const list = COURSES_DATA.filter((c) => !enrolledIds.includes(c.id));

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-extrabold text-white">{isBn ? 'আরও কোর্স দেখুন' : 'Explore more courses'}</h2>
        <p className="text-xs text-slate-400">{isBn ? 'বর্তমান শিক্ষার্থী হিসেবে আপনি সরাসরি আবেদন করতে পারবেন।' : 'As a current student you can apply directly.'}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((c) => {
          const off = c.discountFee && c.discountFee < c.fee ? Math.round(((c.fee - c.discountFee) / c.fee) * 100) : 0;
          const status = c.batchInfo.status;
          return (
            <article key={c.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-emerald-500/40">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {off > 0 && <span className="rounded-md bg-gold-400 px-2 py-0.5 text-[10px] font-black text-slate-950">{off.toLocaleString(locale)}% {isBn ? 'ছাড়' : 'OFF'}</span>}
                  {c.btebApproved && <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-300"><Award className="h-3 w-3" />BTEB</span>}
                  <span className={`text-[10px] font-bold ${status === 'enrolling' ? 'text-emerald-400' : status === 'full' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {status === 'enrolling' ? (isBn ? 'ভর্তি চলছে' : 'Enrolling') : status === 'full' ? (isBn ? 'ব্যাচ পূর্ণ' : 'Full') : isBn ? 'শীঘ্রই শুরু' : 'Coming soon'}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold leading-snug text-white">{isBn ? c.titleBn : c.titleEn}</h3>
                <p className="flex items-center gap-1.5 text-xs text-slate-400"><Clock className="h-3.5 w-3.5 text-emerald-400" />{isBn ? c.durationBn : c.durationEn}</p>
              </div>
              <div className="flex items-end justify-between gap-3 border-t border-slate-800 pt-4">
                <div>
                  {off > 0 && <span className="block text-xs text-slate-500 line-through">৳{c.fee.toLocaleString(locale)}</span>}
                  <span className="font-mono text-xl font-extrabold text-emerald-400">৳{(c.discountFee || c.fee).toLocaleString(locale)}</span>
                </div>
                <Link href={`/admission?course=${c.id}`} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-500 px-4 text-xs font-extrabold text-slate-950 transition-colors hover:bg-emerald-400">
                  {isBn ? 'আবেদন করুন' : 'Apply'}<ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}