'use client';
import Link from 'next/link';
import { Printer, QrCode, ArrowLeft, ChevronRight } from 'lucide-react';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import BengalInstituteLogo from './BengalInstituteLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function CertificateView({ cert }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-5">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-slate-400 print:hidden">
        <Link href="/" className="hover:text-emerald-400">{isBn ? 'হোম' : 'Home'}</Link><ChevronRight className="w-3 h-3" />
        <Link href="/verify" className="hover:text-emerald-400">{isBn ? 'সনদ যাচাই' : 'Verify'}</Link><ChevronRight className="w-3 h-3" />
        <span className="text-emerald-400 font-mono">{cert.certificateId}</span>
      </nav>

      <div className="rounded-2xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl p-3 sm:p-8">
        <div className="p-4 sm:p-8 bg-gradient-to-b from-amber-50/5 via-slate-950 to-slate-950 rounded-xl border border-amber-500/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none"><BengalInstituteLogo size="xl" showText={false} /></div>
          <div className="relative flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-1">
              <BtebLogo className="h-12 w-12 sm:h-14 sm:w-14" /><BengalInstituteLogo size="md" /><GovRegLogo className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>
            <h1 className="text-base sm:text-2xl font-black text-amber-300 uppercase tracking-wider font-mono break-words">BENGAL COMPUTER TRAINING INSTITUTE</h1>
            <p className="text-xs text-slate-300">বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত প্রতিষ্ঠান · কোড: ২৭১১৭</p>
            <p className="text-[11px] text-slate-400">আজিজুর রহমান সুপার মার্কেট (১ম তলা, জনতা ব্যাংক ভবন), সিঙ্গার মোড়, কুষ্টিয়া</p>
            <div className="w-32 h-0.5 bg-amber-500/60 my-2" />
            <span className="text-sm font-bold text-emerald-400 tracking-wider font-mono">CERTIFICATE OF COMPLETION</span>
          </div>

          <div className="relative my-6 text-sm text-slate-200 space-y-3 leading-relaxed">
            <p className="text-xs text-slate-400">This is to certify that</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white underline decoration-amber-500/60 underline-offset-8 break-words">{cert.studentName}</h2>
            <p className="text-xs text-slate-400 pt-1">পিতা: {cert.fatherName}</p>
            <p className="pt-2 text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
              has successfully completed the comprehensive professional training on <span className="font-bold text-amber-300">{cert.courseNameEn}</span> ({cert.courseNameBn}) under session <span className="font-mono text-emerald-300">{cert.session}</span> with distinction.
            </p>
          </div>

          <dl className="relative my-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-left">
            {[['সার্টিফিকেট আইডি', cert.certificateId, 'text-emerald-400'], ['রোল নম্বর', cert.btebRoll, 'text-slate-200'], ['রেজিস্ট্রেশন নম্বর', cert.regNo, 'text-slate-200'], ['অর্জিত গ্রেড', cert.cgpa, 'text-amber-400 font-black']].map(([k, v, c]) => (
              <div key={k} className="min-w-0"><dt className="text-slate-400 text-[10px]">{k}</dt><dd className={`font-mono font-bold break-words ${c}`}>{v}</dd></div>
            ))}
          </dl>

          <div className="relative mt-8 pt-6 border-t border-slate-800/80 flex items-end justify-between gap-2 text-xs">
            <div className="text-left"><div className="w-20 sm:w-24 h-0.5 bg-slate-600 mb-1" /><span className="font-bold text-slate-300 block">কোর্স কো-অর্ডিনেটর</span><span className="text-[10px] text-slate-500">বেঙ্গল কম্পিউটার ইনস্টিটিউট</span></div>
            <div className="flex flex-col items-center"><div className="p-1.5 rounded-lg bg-white"><QrCode className="w-10 h-10 text-slate-950" /></div><span className="text-[9px] text-emerald-400 font-mono mt-1">VERIFIED ONLINE</span></div>
            <div className="text-right"><div className="w-20 sm:w-24 h-0.5 bg-slate-600 mb-1 ml-auto" /><span className="font-bold text-slate-300 block">পরিচালক / অধ্যক্ষ</span><span className="text-[10px] text-slate-500">BTEB সেন্টার কোড: ২৭১১৭</span></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 print:hidden">
        <Link href="/verify" className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"><ArrowLeft className="w-4 h-4" />{isBn ? 'যাচাই পেজে ফিরুন' : 'Back to verification'}</Link>
        <button type="button" onClick={() => window.print()} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"><Printer className="w-4 h-4" />{isBn ? 'প্রিন্ট' : 'Print'}</button>
      </div>
    </div>
  );
}
