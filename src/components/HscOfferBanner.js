'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, Phone, Calendar, GraduationCap, ArrowRight, Gift } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HscOfferBanner() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [copied, setCopied] = useState(false);
  const [left, setLeft] = useState({ days: 4, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((p) => {
        if (p.seconds > 0) return { ...p, seconds: p.seconds - 1 };
        if (p.minutes > 0) return { ...p, minutes: p.minutes - 1, seconds: 59 };
        if (p.hours > 0) return { ...p, hours: p.hours - 1, minutes: 59, seconds: 59 };
        if (p.days > 0) return { days: p.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText('HSC50'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const units = [
    ['days', isBn ? 'দিন' : 'Days'], ['hours', isBn ? 'ঘণ্টা' : 'Hours'],
    ['minutes', isBn ? 'মিনিট' : 'Mins'], ['seconds', isBn ? 'সেকেন্ড' : 'Secs'],
  ];
  const tags = [
    [GraduationCap, isBn ? 'এইচএসসি আইসিটি স্পেশাল' : 'HSC ICT Special'],
    [Sparkles, isBn ? 'বেসিক কম্পিউটার ও অফিস' : 'Office Applications'],
    [Gift, isBn ? 'আর্টিফিশিয়াল ইন্টেলিজেন্স (AI)' : 'Artificial Intelligence (AI)'],
    [Calendar, isBn ? 'স্পোকেন ইংলিশ' : 'Spoken English'],
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-gold-400/30 shadow-2xl p-5 sm:p-10 my-4">
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gold-400/15 blur-3xl pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              {isBn ? 'স্বপ্ন নয়, এখনই নিজেকে প্রস্তুত করো!' : 'Prepare Your Future Today!'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5" />
              {isBn ? 'এপ্রিল–জুন ২০২৬ সেশন' : 'April–June 2026 Session'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isBn ? 'HSC পরীক্ষার্থীদের জন্য' : 'Special Offer for HSC Students'}
            </h2>
            <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-gradient-to-r from-gold-300 to-gold-500 text-slate-950 font-black text-2xl sm:text-4xl shadow-lg shadow-gold-500/25 -rotate-1">
              {isBn ? '৫০% ছাড়!' : '50% OFF!'}
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
            {isBn
              ? 'এইচএসসি পরীক্ষা পরবর্তী সোনালী সময়কে কাজে লাগিয়ে নিজেকে আইটি ও ফ্রিল্যান্সিংয়ে একধাপ এগিয়ে রাখো। বিশেষ ৫০% স্কলারশিপে ভর্তি চলছে!'
              : 'Make the most of your post-HSC free time by boosting your skills in IT, AI & Freelancing. Admission is open with a 50% scholarship!'}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map(([Icon, label]) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-emerald-500/30 text-xs font-semibold text-slate-200">
                <Icon className="w-4 h-4 text-emerald-400" />{label}
              </span>
            ))}
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">
              {isBn ? 'স্থান: আজিজুর রহমান সুপার মার্কেট, সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া' : 'Campus: Azizur Rahman Super Market, Singer Mor, NS Road, Kushtia'}
            </span>
            <a href="tel:01782824582" className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-bold">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />01782-824582
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-950/90 rounded-xl p-4 sm:p-5 border border-emerald-500/30 text-center space-y-4">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{isBn ? 'অফারের সময় বাকি' : 'Time Remaining'}</div>
          <div className="grid grid-cols-4 gap-2" role="timer">
            {units.map(([k, label]) => (
              <div key={k} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className={`block text-xl sm:text-2xl font-black font-mono ${k === 'seconds' ? 'text-emerald-400' : 'text-white'}`}>{String(left[k]).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400">{label}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-dashed border-emerald-500/60 flex items-center justify-between gap-2">
            <div className="text-left">
              <span className="block text-[10px] text-slate-400">{isBn ? 'কুপন কোড' : 'Coupon Code'}</span>
              <span className="text-base font-black text-emerald-400 tracking-wider font-mono">HSC50</span>
            </div>
            <button type="button" onClick={copy} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold cursor-pointer">
              {copied ? <><Check className="w-3.5 h-3.5" />{isBn ? 'কপি হয়েছে' : 'Copied'}</> : <><Copy className="w-3.5 h-3.5" />{isBn ? 'কোড কপি' : 'Copy Code'}</>}
            </button>
          </div>
          <Link href="/admission?coupon=HSC50&course=hsc-ict" className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-300 to-gold-500 text-slate-950 font-black text-sm shadow-lg shadow-gold-500/25">
            <span>{isBn ? '৫০% ছাড়ে এখনই আবেদন করুন' : 'Claim 50% Discount Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
