'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, CheckCircle2, XCircle, Award, FileCheck } from 'lucide-react';
import { Button } from '@heroui/react';
import { useLanguage } from '@/context/LanguageContext';

export default function CertificateVerification() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const verify = async (override) => {
    const id = (override ?? query).trim();
    if (!id) { setResult(null); return setError(isBn ? 'অনুগ্রহ করে একটি সঠিক সার্টিফিকেট আইডি বা রেজিস্ট্রেশন নম্বর দিন।' : 'Please enter a valid Certificate ID or Registration Number.'); }
    setError(''); setResult(null); setLoading(true);
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(id)}`);
      if (res.status === 404) setError(isBn ? `দুঃখিত, "${id}" নম্বরে কোনো সনদ রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে নম্বর যাচাই করুন।` : `No certificate record found for "${id}". Please recheck the number.`);
      else if (!res.ok) throw new Error();
      else setResult((await res.json()).certificate);
    } catch { setError(isBn ? 'যাচাই করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।' : 'Could not verify right now. Please try again shortly.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="verify" className="py-12 sm:py-20 bg-slate-900/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />{isBn ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড ভেরিফাইড' : 'BTEB Verified Portal'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? 'অনলাইন ' : 'Online '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{isBn ? 'সার্টিফিকেট যাচাই' : 'Certificate Verification'}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">{t('verify_sub')}</p>
        </div>

        <div className="bg-slate-950 p-5 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <form onSubmit={(e) => { e.preventDefault(); verify(); }} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Certificate ID" placeholder={isBn ? 'উদাহরণ: BCTI-2024-101 বা রোল নম্বর...' : 'e.g. BCTI-2024-101 or Roll No...'}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 font-mono" />
            </div>
            <Button type="submit" isLoading={loading} className="bg-emerald-500 text-slate-950 font-bold h-12" startContent={!loading && <FileCheck className="w-4 h-4" />}>{t('verify_btn')}</Button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>{isBn ? 'ক্লিক করে টেস্ট করুন:' : 'Try a sample ID:'}</span>
            {['BCTI-2024-101', 'BCTI-2025-248', 'BCTI-2026-007', 'BTEB-27117-092'].map((id) => (
              <button key={id} type="button" onClick={() => { setQuery(id); verify(id); }} className="px-2 py-1 rounded-md bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 font-mono text-[11px] cursor-pointer">{id}</button>
            ))}
          </div>

          {error && <div role="alert" className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2"><XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" /><span>{error}</span></div>}

          {result && (
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm"><CheckCircle2 className="w-5 h-5" /><span>{isBn ? 'সনদটি সফলভাবে ভেরিফাইড!' : 'Certificate verified'}</span></div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">BTEB CODE: 27117</span>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div><dt className="text-slate-400">{isBn ? 'শিক্ষার্থীর নাম:' : 'Student:'}</dt><dd className="font-bold text-white text-sm">{result.studentName}</dd></div>
                <div><dt className="text-slate-400">{isBn ? 'কোর্স:' : 'Course:'}</dt><dd className="font-semibold text-emerald-300">{isBn ? result.courseNameBn : result.courseNameEn}</dd></div>
                <div><dt className="text-slate-400">{isBn ? 'রেজিস্ট্রেশন নম্বর:' : 'Registration No:'}</dt><dd className="font-mono text-slate-200">{result.regNo}</dd></div>
                <div><dt className="text-slate-400">{isBn ? 'গ্রেড:' : 'Grade:'}</dt><dd className="font-bold text-amber-400 font-mono">{result.cgpa}</dd></div>
              </dl>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">{isBn ? 'সনদ ইস্যুর তারিখ:' : 'Issued:'} {result.issueDate}</span>
                <Link href={`/verify/${encodeURIComponent(result.certificateId)}`} className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                  <Award className="w-4 h-4" />{isBn ? 'অফিশিয়াল সার্টিফিকেট দেখুন' : 'View official certificate'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
