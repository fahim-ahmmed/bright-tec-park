'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToaster } from '@gravity-ui/uikit';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const field = 'h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none';
const label = 'mb-2 block text-xs font-semibold text-slate-300';

export default function FeeCalculator() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const locale = isBn ? 'bn-BD' : 'en-US';
  const { add } = useToaster();
  const [courseId, setCourseId] = useState(COURSES_DATA[0].id);
  const [cat, setCat] = useState('hsc');
  const [coupon, setCoupon] = useState('HSC50');
  const [applied, setApplied] = useState(true);
  const [months, setMonths] = useState(2);

  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];
  let pct = 0;
  if (applied && coupon.trim().toUpperCase() === 'HSC50') pct = 50;
  else if (cat === 'hsc') pct = 50;
  else if (cat === 'female') pct = 25;
  else if (cat === 'meritorious') pct = 30;
  else if (course.discountFee) pct = Math.round(((course.fee - course.discountFee) / course.fee) * 100);

  const off = Math.round((course.fee * pct) / 100);
  const total = Math.max(0, course.fee - off);
  const per = Math.round(total / months);

  const apply = () => {
    const c = coupon.trim().toUpperCase();
    const ok = c === 'HSC50' || c === 'BENGAL2026';
    setApplied(ok);
    if (!ok) add({ name: 'calc-coupon', title: isBn ? 'কুপনটি সঠিক নয়' : 'Invalid coupon', content: isBn ? 'HSC50 ব্যবহার করে ৫০% ছাড় নিন।' : 'Use HSC50 for 50% discount.', theme: 'danger', autoHiding: 3500 });
  };

  const cats = [
    ['hsc', isBn ? 'HSC পরীক্ষার্থী' : 'HSC student', '50%'],
    ['female', isBn ? 'নারী শিক্ষার্থী' : 'Female student', '25%'],
    ['meritorious', isBn ? 'মেধাবী ও দরিদ্র' : 'Merit / need-based', '30%'],
    ['regular', isBn ? 'সাধারণ শিক্ষার্থী' : 'Regular student', isBn ? 'নিয়মিত' : 'Standard'],
  ];

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="flex items-center gap-3.5 border-b border-slate-800 px-5 py-5 sm:px-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25"><Calculator className="h-5 w-5" /></span>
        <div>
          <h2 className="text-lg font-extrabold text-white sm:text-2xl">{t('calc_title')}</h2>
          <p className="text-xs text-slate-400 sm:text-sm">{t('calc_sub')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Form */}
        <div className="space-y-6 p-5 sm:p-8 lg:col-span-7">
          <div>
            <label htmlFor="calc-course" className={label}>{t('calc_select_course')}</label>
            <select id="calc-course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className={field}>
              {COURSES_DATA.map((c) => <option key={c.id} value={c.id}>{isBn ? c.titleBn : c.titleEn}</option>)}
            </select>
          </div>

          <div>
            <span className={label}>{isBn ? 'আপনার ক্যাটাগরি / স্কলারশিপ' : 'Your category / scholarship'}</span>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {cats.map(([id, text, badge]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setCat(id); if (id === 'hsc') { setCoupon('HSC50'); setApplied(true); } if (id === 'regular') setApplied(false); }}
                  className={`flex h-12 cursor-pointer items-center justify-between gap-2 rounded-xl border px-4 text-sm transition-colors ${
                    cat === id ? 'border-emerald-500 bg-emerald-500/10 font-bold text-white' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span>{text}</span>
                  <span className={`text-xs font-bold ${cat === id ? 'text-emerald-400' : 'text-slate-500'}`}>{badge}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="calc-coupon" className={label}>{isBn ? 'প্রমো কোড' : 'Promo code'}</label>
            <div className="flex gap-2">
              <input id="calc-coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="HSC50" className={`${field} flex-1 font-mono uppercase`} />
              <button type="button" onClick={apply} className="h-11 shrink-0 cursor-pointer rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 text-sm font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20">
                {isBn ? 'প্রয়োগ' : 'Apply'}
              </button>
            </div>
            {applied && <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" />{isBn ? 'কুপন সক্রিয়, ৫০% ছাড় প্রযোজ্য।' : 'Coupon active: 50% discount applied.'}</p>}
          </div>

          <div>
            <span className={label}>{t('calc_installments')}</span>
            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((m) => (
                <button key={m} type="button" onClick={() => setMonths(m)} className={`h-11 cursor-pointer rounded-xl border text-sm font-semibold transition-colors ${months === m ? 'border-emerald-500 bg-emerald-500 font-extrabold text-slate-950' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'}`}>
                  {m === 1 ? (isBn ? 'এককালীন' : 'One time') : isBn ? `${m} কিস্তি` : `${m} instalments`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col justify-between gap-6 border-t border-slate-800 bg-slate-950/60 p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isBn ? 'ফি সংক্ষেপ' : 'Fee summary'}</h3>
            <p className="text-sm font-bold leading-snug text-white">{isBn ? course.titleBn : course.titleEn}</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-300"><span>{isBn ? 'মূল কোর্স ফি' : 'Base fee'}</span><span className="font-mono text-slate-400 line-through">৳{course.fee.toLocaleString(locale)}</span></div>
              <div className="flex justify-between font-semibold text-emerald-400"><span>{isBn ? `ছাড় (${pct.toLocaleString(locale)}%)` : `Discount (${pct}%)`}</span><span className="font-mono">- ৳{off.toLocaleString(locale)}</span></div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <span className="text-xs text-slate-300">{isBn ? 'সর্বমোট প্রদেয় ফি' : 'Total payable'}</span>
              <p className="font-display text-3xl font-extrabold text-emerald-400 sm:text-4xl">৳{total.toLocaleString(locale)}</p>
              {months > 1 && (
                <p className="mt-1 text-xs text-slate-300">
                  {isBn ? `প্রতি কিস্তি ৳${per.toLocaleString(locale)} (ভর্তির সময় ১ম কিস্তি, বাকি প্রতি মাসে)` : `৳${per.toLocaleString(locale)} per instalment (first on admission, rest monthly)`}
                </p>
              )}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {[
                isBn ? 'কোর্স ম্যাটেরিয়ালস ও লেকচার শিট ফ্রি' : 'Course materials & lecture sheets free',
                isBn ? '১ জন ১টি কম্পিউটার ও ল্যাব সাপোর্ট' : '1 computer per student & lab support',
                isBn ? 'BTEB অনুমোদিত প্রতিষ্ঠান' : 'BTEB-approved institute',
              ].map((x) => <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{x}</li>)}
            </ul>
          </div>
          <Link href={`/admission?course=${course.id}${applied ? '&coupon=HSC50' : ''}`} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400">
            {isBn ? 'এই কোর্সে আবেদন করুন' : 'Apply for this course'}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}