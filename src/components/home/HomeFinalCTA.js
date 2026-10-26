'use client';
import Link from 'next/link';
import { Phone, ArrowRight, MapPin, Clock } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeFinalCTA() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="space-y-5 p-8 sm:p-12 lg:col-span-3">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              {isBn ? 'আজই আপনার ক্যারিয়ারের ' : 'Take the first step in '}
              <span className="text-gold-400">{isBn ? 'প্রথম ধাপ নিন' : 'your career today'}</span>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
              {isBn ? 'আসন সীমিত। HSC50 কোডে ৫০% ছাড়ে এখনই আবেদন করুন অথবা সরাসরি কল করুন।' : 'Seats are limited. Apply now with HSC50 for 50% off, or call us directly.'}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/admission" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400">
                {isBn ? 'ভর্তি আবেদন করুন' : 'Apply for admission'}<ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${INSTITUTE_INFO.phone1}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800">
                <Phone className="h-4 w-4 text-emerald-400" />{INSTITUTE_INFO.phone1}
              </a>
            </div>
          </div>

          <div className="space-y-5 border-t border-slate-700/60 bg-slate-950/40 p-8 sm:p-10 lg:col-span-2 lg:border-l lg:border-t-0">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400"><MapPin className="h-4 w-4" /></span>
              <div>
                <p className="text-xs font-bold text-slate-400">{isBn ? 'ক্যাম্পাস' : 'Campus'}</p>
                <p className="text-sm leading-relaxed text-slate-200">{isBn ? INSTITUTE_INFO.addressBn : INSTITUTE_INFO.addressEn}</p>
                <a href={INSTITUTE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs font-semibold text-emerald-300 hover:underline">
                  {isBn ? 'ম্যাপে দেখুন →' : 'View on map →'}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400"><Clock className="h-4 w-4" /></span>
              <div>
                <p className="text-xs font-bold text-slate-400">{isBn ? 'অফিস সময়' : 'Office hours'}</p>
                <p className="text-sm text-slate-200">{isBn ? INSTITUTE_INFO.workingHoursBn : INSTITUTE_INFO.workingHoursEn}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}