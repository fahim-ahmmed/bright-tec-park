'use client';
import Link from 'next/link';
import { Bell, CalendarDays, Phone, ArrowRight, Ticket } from 'lucide-react';
import { NOTICES_DATA, SPECIAL_OFFER, INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

export const NOTICES_EN = [
  'New session (April–June 2026) admission is open. Limited seats.',
  'A special 50% waiver on ICT and Spoken English batches for HSC candidates is starting soon.',
  'BTEB January–June session board exam routine has been published.',
  'Regular classes continue at our Singer Mor campus, 1st floor, Janata Bank Building.',
];

const CATS = {
  Admission: ['ভর্তি', 'Admission', 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'],
  Scholarship: ['স্কলারশিপ', 'Scholarship', 'border-gold-400/30 bg-gold-400/10 text-gold-300'],
  Exam: ['পরীক্ষা', 'Exam', 'border-sky-500/30 bg-sky-500/10 text-sky-300'],
  Event: ['ক্যাম্পাস', 'Campus', 'border-violet-500/30 bg-violet-500/10 text-violet-300'],
};

export default function HomeNotices() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section id="notices" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isBn ? 'নতুন খবর ও নোটিশ' : 'News & notices'}
          title={isBn ? 'ইনস্টিটিউটের ' : 'Latest from the '}
          highlight={isBn ? 'সর্বশেষ আপডেট' : 'institute'}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <div className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2.5 border-b border-slate-800 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400"><Bell className="h-4.5 w-4.5" /></span>
                <h3 className="text-base font-bold text-white">{isBn ? 'নোটিশ বোর্ড' : 'Notice board'}</h3>
              </div>
              <ul className="divide-y divide-slate-800">
                {NOTICES_DATA.map((n, i) => {
                  const cat = CATS[n.category] || CATS.Event;
                  return (
                    <li key={n.id} className="flex gap-4 px-5 py-4 transition-colors hover:bg-slate-800/40">
                      <div className="hidden w-24 shrink-0 sm:block">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400"><CalendarDays className="h-3.5 w-3.5" />{n.date}</span>
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${cat[2]}`}>{isBn ? cat[0] : cat[1]}</span>
                          {n.isUrgent && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />{isBn ? 'জরুরি' : 'Urgent'}
                            </span>
                          )}
                          <span className="font-mono text-[11px] text-slate-500 sm:hidden">{n.date}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-200">{isBn ? n.titleBn : NOTICES_EN[i]}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={0.08}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-gold-400/30 bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-7">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{isBn ? 'এখন ভর্তি চলছে' : 'Admission open now'}
                </span>
                <div>
                  <p className="text-sm text-slate-300">{isBn ? SPECIAL_OFFER.target : 'HSC candidates'}</p>
                  <p className="font-display text-5xl font-extrabold text-gold-400">{isBn ? SPECIAL_OFFER.discount : '50%'} <span className="text-2xl text-white">{isBn ? 'ছাড়' : 'off'}</span></p>
                  <p className="mt-1 text-xs text-slate-400">{isBn ? SPECIAL_OFFER.offerPeriod : 'April–June 2026 session'}</p>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-gold-400/50 bg-slate-950/60 px-4 py-3">
                  <Ticket className="h-5 w-5 text-gold-400" />
                  <div>
                    <span className="block text-[10px] text-slate-400">{isBn ? 'কুপন কোড' : 'Coupon code'}</span>
                    <span className="font-mono text-lg font-black tracking-wider text-white">{SPECIAL_OFFER.couponCode}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Link href="/admission?coupon=HSC50&course=hsc-ict" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-gold-300">
                  {isBn ? 'আবেদন করুন' : 'Apply now'}<ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${INSTITUTE_INFO.phone1}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
                  <Phone className="h-4 w-4 text-emerald-400" />{INSTITUTE_INFO.phone1}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}