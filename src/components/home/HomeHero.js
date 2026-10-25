'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@heroui/react';
import { ArrowRight, Bell, ShieldCheck, Sparkles, MonitorCheck } from 'lucide-react';
import BtebLogo from '../BtebLogo';
import GovRegLogo from '../GovRegLogo';
import ModernizedHeroBanner from '../ModernizedHeroBanner';
import { NOTICES_DATA, INSTITUTE_STATISTICS } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const NOTICES_EN = [
  'Special HSC Discount: 50% waiver on all computer and AI courses.',
  'BTEB 2026 Registration: Last date for admission is ongoing.',
  'Free AI Masterclass & Freelancing Seminar every Friday.',
  'New Campus: Singer Mor, 1st Floor (Janata Bank Building), Kushtia.',
];

function Ticker({ items, label }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-900/70 backdrop-blur px-2 py-1.5" role="region" aria-label={label}>
      <span className="flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-black text-slate-950 shrink-0"><Bell className="h-3 w-3" />{label}</span>
      <div className="overflow-hidden whitespace-nowrap text-xs text-slate-300 w-full">
        <div className="animate-marquee">
          {[0, 1].map((d) => (
            <span key={d} className="inline-flex items-center gap-8 pr-8" aria-hidden={d === 1}>
              {items.map((n, i) => <span key={i} className="inline-flex items-center gap-8"><span>{n}</span><span className="text-gold-400">◆</span></span>)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeHero() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const reduce = useReducedMotion();
  const notices = NOTICES_DATA.slice(0, 4).map((n, i) => (isBn ? n.titleBn : NOTICES_EN[i]));
  const stats = [
    [INSTITUTE_STATISTICS.successfulStudents, isBn ? 'সফল শিক্ষার্থী' : 'Graduates'],
    [INSTITUTE_STATISTICS.courseCount, isBn ? 'প্রফেশনাল কোর্স' : 'Courses'],
    [INSTITUTE_STATISTICS.averagePlacementRate, isBn ? 'গড় প্লেসমেন্ট' : 'Avg. placement'],
    ['2016', isBn ? 'থেকে বিশ্বস্ত' : 'Trusted since'],
  ];
  const fade = (delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-grid -z-10" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-40 -right-40 -z-10 h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[120px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 pb-14 sm:pb-20 space-y-10 sm:space-y-14">
        <Ticker items={notices} label={t('notice_badge')} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              {t('hero_badge')}
            </motion.div>

            <motion.h1 {...fade(0.08)} className="font-display text-[2rem] leading-[1.2] sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white">
              {t('hero_title_part1')}{' '}<span className="text-gradient-brand">{t('hero_title_highlight')}</span>
            </motion.h1>

            <motion.p {...fade(0.16)} className="max-w-xl text-sm sm:text-lg leading-relaxed text-slate-300">{t('hero_subtitle')}</motion.p>

            <motion.div {...fade(0.24)} className="flex flex-col sm:flex-row gap-3">
              <Button as={Link} href="/admission" size="lg" radius="lg" className="bg-emerald-400 font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25" endContent={<ArrowRight className="h-4 w-4" />}>{t('hero_cta_admission')}</Button>
              <Button as={Link} href="/courses" size="lg" radius="lg" variant="bordered" className="border-slate-600 font-bold text-white">{t('hero_cta_courses')}</Button>
            </motion.div>

            <motion.div {...fade(0.3)} className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <div className="flex items-center gap-2.5"><BtebLogo className="h-12 w-12" /><GovRegLogo className="h-12 w-12" /></div>
              <div className="text-xs text-slate-400 leading-snug">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200"><ShieldCheck className="h-4 w-4 text-emerald-400" />{isBn ? 'সরকার অনুমোদিত প্রশিক্ষণ কেন্দ্র' : 'Government-approved training centre'}</div>
                <Link href="/verify" className="text-emerald-300 hover:underline">{t('hero_cta_verify')} →</Link>
              </div>
            </motion.div>
          </div>

          <motion.div {...fade(0.2)} className="lg:col-span-6 relative">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-tr from-emerald-400/25 via-transparent to-gold-400/20 blur-xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/60 p-3 sm:p-4 shadow-2xl backdrop-blur">
              <ModernizedHeroBanner showStats={false} />
            </div>
            <Link href="/admission?coupon=HSC50&course=hsc-ict" className="absolute -top-3 right-3 sm:-right-3 flex items-center gap-2 rounded-2xl border border-gold-400/40 bg-slate-950/95 px-3.5 py-2 shadow-xl hover:border-gold-400">
              <Sparkles className="h-4 w-4 text-gold-400" /><span className="text-xs font-extrabold text-gold-300">{isBn ? 'HSC পরীক্ষার্থী ৫০% ছাড়' : 'HSC students 50% off'}</span>
            </Link>
            <div className="absolute -bottom-4 left-3 sm:-left-4 flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-slate-950/95 px-3.5 py-2 shadow-xl">
              <MonitorCheck className="h-4 w-4 text-emerald-400" /><span className="text-xs font-bold text-slate-100">{isBn ? '১ জন ১টি কম্পিউটার' : '1 PC per student'}</span>
            </div>
          </motion.div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-700/40">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-slate-900/80 px-5 py-5 text-center backdrop-blur">
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-2xl sm:text-3xl font-extrabold text-white">{v}</dd>
              <p className="mt-0.5 text-xs text-slate-400" aria-hidden="true">{l}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
