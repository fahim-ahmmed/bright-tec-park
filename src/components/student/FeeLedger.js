'use client';
import { Phone, Receipt } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function FeeLedger({ admission, payments = [], compact = false, onMore }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const locale = isBn ? 'bn-BD' : 'en-US';
  const money = (n) => `৳${Number(n || 0).toLocaleString(locale)}`;
  const { base, discount, payable, paid, due } = admission.fee;
  const pct = payable > 0 ? Math.min(100, Math.round((paid / payable) * 100)) : 0;
  const history = payments.filter((p) => p.admissionToken === admission.token);

  const cards = [
    [isBn ? 'মোট কোর্স ফি' : 'Course fee', money(base), 'text-white'],
    [isBn ? 'ছাড় / স্কলারশিপ' : 'Discount', `- ${money(discount)}`, 'text-gold-300'],
    [isBn ? 'প্রদেয় ফি' : 'Payable', money(payable), 'text-white'],
    [isBn ? 'পরিশোধিত' : 'Paid', money(paid), 'text-emerald-400'],
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-white"><Receipt className="h-4.5 w-4.5 text-emerald-400" />{isBn ? 'ফি ও কিস্তির হিসাব' : 'Fee & instalment ledger'}</h2>
        {compact && onMore && <button type="button" onClick={onMore} className="cursor-pointer text-xs font-bold text-emerald-300 hover:underline">{isBn ? 'বিস্তারিত →' : 'Details →'}</button>}
      </div>

      <div className={`grid gap-3 ${compact ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {cards.map(([label, value, tone]) => (
          <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
            <p className="text-[11px] text-slate-400">{label}</p>
            <p className={`mt-1 font-mono text-lg font-extrabold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-400">{isBn ? 'পরিশোধের অগ্রগতি' : 'Payment progress'}</span>
          <span className="font-bold text-emerald-400">{pct.toLocaleString(locale)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${pct}%` }} /></div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">{isBn ? 'বাকি (Due)' : 'Balance due'}</span>
          <span className={`font-mono text-xl font-black ${due > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{due > 0 ? money(due) : isBn ? 'পরিশোধিত' : 'Fully paid'}</span>
        </div>
      </div>

      {!compact && (
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-bold text-white">{isBn ? 'পেমেন্টের ইতিহাস' : 'Payment history'}</h3>
          {history.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-xs text-slate-400">{isBn ? 'এখনও কোনো পেমেন্ট রেকর্ড নেই।' : 'No payments recorded yet.'}</p>
          ) : (
            <ul className="divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">
              {history.map((p, i) => (
                <li key={i} className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold text-white">{p.method || (isBn ? 'নগদ' : 'Cash')}{p.trxId ? <span className="ml-2 font-mono text-xs text-slate-400">#{p.trxId}</span> : null}</p>
                    <p className="text-xs text-slate-400">{p.paidAt ? new Date(p.paidAt).toLocaleDateString(locale) : ''}{p.note ? ` · ${p.note}` : ''}</p>
                  </div>
                  <span className="font-mono text-base font-extrabold text-emerald-400">+ {money(p.amount)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {isBn ? 'পেমেন্ট আপডেট অফিস থেকে করা হয়। কোনো ভুল থাকলে যোগাযোগ করুন:' : 'Payments are updated by the office. If something looks wrong, call:'}
            <a href={`tel:${INSTITUTE_INFO.phone1}`} className="inline-flex items-center gap-1 font-bold text-emerald-300 hover:underline"><Phone className="h-3 w-3" />{INSTITUTE_INFO.phone1}</a>
          </p>
        </div>
      )}
    </section>
  );
}