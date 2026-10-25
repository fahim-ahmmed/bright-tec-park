'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { useToaster } from '@gravity-ui/uikit';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

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

  const cats = [['hsc', isBn ? 'HSC পরীক্ষার্থী' : 'HSC Student', '50% OFF'], ['female', isBn ? 'নারী শিক্ষার্থী' : 'Female Student', '25% OFF'], ['meritorious', isBn ? 'মেধাবী ও দরিদ্র' : 'Merit / Need-based', '30% OFF'], ['regular', isBn ? 'সাধারণ শিক্ষার্থী' : 'Regular Student', 'Standard']];
  const field = 'w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl max-w-4xl mx-auto">
      <div className="flex items-center gap-2.5 mb-6 text-emerald-400">
        <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30"><Calculator className="w-5 h-5" /></div>
        <div><h2 className="text-lg sm:text-2xl font-black text-white">{t('calc_title')}</h2><p className="text-xs text-slate-400">{t('calc_sub')}</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-7 space-y-4">
          <div>
            <label htmlFor="calc-course" className="block text-xs font-bold text-slate-300 mb-1.5">{t('calc_select_course')}:</label>
            <select id="calc-course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className={field}>
              {COURSES_DATA.map((c) => <option key={c.id} value={c.id}>{isBn ? c.titleBn : c.titleEn} ({isBn ? 'ফি' : 'Fee'}: ৳{c.fee.toLocaleString(locale)})</option>)}
            </select>
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-300 mb-1.5">{isBn ? 'আপনার ক্যাটাগরি / স্কলারশিপ:' : 'Your Category / Scholarship:'}</span>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs">
              {cats.map(([id, label, badge]) => (
                <button key={id} type="button" onClick={() => { setCat(id); if (id === 'hsc') { setCoupon('HSC50'); setApplied(true); } if (id === 'regular') setApplied(false); }}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer ${cat === id ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}>
                  <div className="flex items-center justify-between gap-2"><span>{label}</span><span className="text-[10px] text-emerald-400 font-bold">{badge}</span></div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="calc-coupon" className="block text-xs font-bold text-slate-300 mb-1.5">{isBn ? 'ডিসকাউন্ট প্রমো কোড:' : 'Discount Promo Code:'}</label>
            <div className="flex gap-2">
              <input id="calc-coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="HSC50" className={`${field} flex-1 uppercase font-mono`} />
              <button type="button" onClick={apply} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl cursor-pointer">{isBn ? 'প্রয়োগ' : 'Apply'}</button>
            </div>
            {applied && <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">✓ {isBn ? 'কুপন সক্রিয়! ৫০% ছাড় প্রযোজ্য হয়েছে।' : 'Coupon active! 50% discount applied.'}</span>}
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-300 mb-1.5">{t('calc_installments')}:</span>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((m) => (
                <button key={m} type="button" onClick={() => setMonths(m)} className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${months === m ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'}`}>
                  {m === 1 ? (isBn ? 'এককালীন' : '1 Time') : isBn ? `${m} কিস্তিতে` : `${m} Installments`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isBn ? 'ফি সংক্ষেপ' : 'Fee Summary'}</h3>
            <div className="flex justify-between text-xs text-slate-300"><span>{isBn ? 'মূল কোর্স ফি:' : 'Base Course Fee:'}</span><span className="font-mono text-slate-400 line-through">৳{course.fee.toLocaleString(locale)}</span></div>
            <div className="flex justify-between text-xs text-emerald-400 font-semibold"><span>{isBn ? `মোট ছাড় (${pct}%):` : `Total Discount (${pct}%):`}</span><span className="font-mono">- ৳{off.toLocaleString(locale)}</span></div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline"><span className="text-xs font-bold text-white">{isBn ? 'সর্বমোট প্রদেয় ফি:' : 'Total Payable Fee:'}</span><span className="text-2xl font-black text-emerald-400 font-mono">৳{total.toLocaleString(locale)}</span></div>
            {months > 1 && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                <span className="block font-bold">{isBn ? `প্রতি কিস্তিতে প্রদেয়: ৳${per.toLocaleString(locale)}` : `Per Installment: ৳${per.toLocaleString(locale)}`}</span>
                <span className="text-[10px] text-slate-400">{isBn ? '(ভর্তির সময় ১ম কিস্তি ও আগামী মাসে পরবর্তী কিস্তি)' : '(1st payment on admission, rest monthly)'}</span>
              </div>
            )}
            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p>✓ {isBn ? 'কোর্স ম্যাটেরিয়ালস ও শিট সম্পূর্ণ ফ্রি' : 'Course materials & lecture notes free'}</p>
              <p>✓ {isBn ? '১ জন ১টি কম্পিউটার ল্যাব ও সার্বক্ষণিক সাপোর্ট' : '1 computer per student & lab support'}</p>
              <p>✓ {isBn ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) সনদ সুবিধা' : 'Govt. BTEB certification opportunity'}</p>
            </div>
          </div>
          <Link href={`/admission?course=${course.id}${applied ? '&coupon=HSC50' : ''}`} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md">
            <span>{isBn ? 'এই কোর্সে এখনই আবেদন করুন' : 'Apply for this Course Now'}</span><ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
