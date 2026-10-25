'use client';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeFinalCTA() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-8 sm:p-14 text-center">
        <div className="absolute -top-24 left-1/2 h-60 w-[480px] max-w-full -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[90px]" aria-hidden="true" />
        <div className="relative space-y-5">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">{isBn ? 'আজই আপনার ক্যারিয়ারের প্রথম ধাপ নিন' : 'Take the first step in your career today'}</h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-300">{isBn ? 'সিট সীমিত। HSC50 কোডে ৫০% ছাড়ে এখনই আবেদন করুন অথবা সরাসরি কল করুন।' : 'Seats are limited. Apply now with HSC50 for 50% off, or call us directly.'}</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link href="/admission" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300">{isBn ? 'ভর্তি আবেদন করুন' : 'Apply for admission'}<ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${INSTITUTE_INFO.phone1}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-slate-800"><Phone className="h-4 w-4 text-emerald-300" />{INSTITUTE_INFO.phone1}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
