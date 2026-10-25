'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function AdmissionHeader() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  return (
    <div className="mb-6">
      <span className="text-[11px] font-bold text-emerald-400 font-mono">{isBn ? 'BTEB অনুমোদিত ইনস্টিটিউট কোড: ২৭১১৭' : 'BTEB Approved Institute Code: 27117'}</span>
      <h1 className="text-2xl font-black text-white mt-1">{t('modal_title')}</h1>
      <p className="text-xs text-slate-300">{isBn ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট, সিঙ্গার মোড়, জনতা ব্যাংক ভবন, কুষ্টিয়া।' : 'Bengal Computer Training Institute, Singer Mor, Janata Bank Building, Kushtia.'}</p>
    </div>
  );
}
