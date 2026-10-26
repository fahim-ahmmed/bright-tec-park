'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Award, Printer, Copy, Check, Hourglass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CertificatesPanel({ certificates = [] }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [copied, setCopied] = useState('');

  const copy = async (id) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/verify/${encodeURIComponent(id)}`);
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    } catch {}
  };

  if (certificates.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400"><Hourglass className="h-6 w-6" /></span>
        <p className="text-sm font-bold text-white">{isBn ? 'এখনও কোনো সনদ প্রস্তুত নেই' : 'No certificate is ready yet'}</p>
        <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-400">{isBn ? 'কোর্স অথবা বোর্ড পরীক্ষা সম্পন্ন হলে আপনার সনদ ও গ্রেডশিট এখানে যুক্ত হবে। তখন এক ক্লিকে প্রিন্ট বা PDF করে নিতে পারবেন।' : 'Once your course or board exam is complete, your certificate and grade sheet will appear here, ready to print or save as PDF.'}</p>
        <Link href="/verify" className="mt-4 inline-block text-xs font-bold text-emerald-300 hover:underline">{isBn ? 'অন্য সনদ যাচাই করুন →' : 'Verify another certificate →'}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {certificates.map((c) => (
        <section key={c.certificateId} className="overflow-hidden rounded-2xl border border-gold-400/30 bg-slate-900">
          <div className="flex items-start gap-3.5 border-b border-slate-800 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400"><Award className="h-6 w-6" /></span>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-white">{isBn ? c.courseNameBn : c.courseNameEn}</h2>
              <p className="mt-0.5 text-xs text-slate-400">{c.session} · {isBn ? 'ইস্যু:' : 'Issued:'} {c.issueDate}</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px bg-slate-800 sm:grid-cols-4">
            {[
              [isBn ? 'সার্টিফিকেট আইডি' : 'Certificate ID', c.certificateId, 'text-emerald-400'],
              [isBn ? 'রোল নম্বর' : 'Roll no.', c.btebRoll, 'text-white'],
              [isBn ? 'রেজিস্ট্রেশন নম্বর' : 'Registration no.', c.regNo, 'text-white'],
              [isBn ? 'গ্রেড / GPA' : 'Grade / GPA', c.cgpa, 'font-black text-gold-400'],
            ].map(([k, v, tone]) => (
              <div key={k} className="bg-slate-900 p-4">
                <dt className="text-[11px] text-slate-400">{k}</dt>
                <dd className={`mt-1 break-words font-mono text-sm font-bold ${tone}`}>{v || '—'}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-2 p-4 sm:flex-row">
            <Link href={`/verify/${encodeURIComponent(c.certificateId)}`} target="_blank" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-extrabold text-slate-950 transition-colors hover:bg-emerald-400">
              <Printer className="h-4 w-4" />{isBn ? 'সনদ দেখুন ও প্রিন্ট / PDF করুন' : 'View & print / save as PDF'}
            </Link>
            <button type="button" onClick={() => copy(c.certificateId)} className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-800">
              {copied === c.certificateId ? <><Check className="h-4 w-4 text-emerald-400" />{isBn ? 'কপি হয়েছে' : 'Copied'}</> : <><Copy className="h-4 w-4" />{isBn ? 'যাচাই লিংক' : 'Verify link'}</>}
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}