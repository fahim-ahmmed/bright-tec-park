'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bell, CheckCircle2, Sparkles, MonitorCheck, Users, BookOpen, TrendingUp, CalendarDays } from 'lucide-react';
import ModernizedHeroBanner from '../ModernizedHeroBanner';
import CountUp from './CountUp';
import { NOTICES_EN } from './HomeNotices';
import { NOTICES_DATA, INSTITUTE_STATISTICS, INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const parseStat = (v) => {
  const s = String(v);
  return { end: parseFloat(s), decimals: (s.split('.')[1] || '').replace(/\D/g, '').length, suffix: s.replace(/^[\d.]+/, '') };
};

function Ticker({ items, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-1.5" role="region" aria-label={label}>
      <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-gold-400 px-3 py-1.5 text-[11px] font-black text-slate-950">
        <Bell className="h-3 w-3" />{label}
      </span>
      <div className="w-full overflow-hidden whitespace-nowrap text-xs text-slate-300">
        <div className="animate-marquee">
          {[0, 1].map((d) => (
            <span key={d} className="inline-flex items-center gap-8 pr-8" aria-hidden={d === 1}>
              {items.map((n, i) => (
                <span key={i} className="inline-flex items-center gap-8"><span>{n}</span><span className="text-gold-400">◆</span></span>
              ))}
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
    { icon: Users, label: isBn ? 'সফল শিক্ষার্থী' : 'Successful students', ...parseStat(INSTITUTE_STATISTICS.successfulStudents) },
    { icon: BookOpen, label: isBn ? 'প্রফেশনাল কোর্স' : 'Professional courses', ...parseStat(INSTITUTE_STATISTICS.courseCount) },
    { icon: TrendingUp, label: isBn ? 'গড় প্লেসমেন্ট' : 'Avg. placement', ...parseStat(INSTITUTE_STATISTICS.averagePlacementRate) },
    { icon: CalendarDays, label: isBn ? 'সাল থেকে বিশ্বস্ত' : 'Trusted since', end: INSTITUTE_INFO.established, decimals: 0, suffix: '' },
  ];

  const points = [
    isBn ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) অনুমোদিত প্রতিষ্ঠান' : 'Approved by Bangladesh Technical Education Board (BTEB)',
    isBn ? '১ জন ১টি কম্পিউটার, শতভাগ প্র্যাকটিক্যাল ক্লাস' : 'One computer per student, 100% hands-on classes',
    isBn ? 'কিস্তিতে ফি পরিশোধের সুবিধা' : 'Fee payable in instalments',
  ];

  const fade = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-14 pt-5 sm:px-6 sm:pb-20 lg:space-y-14 lg:px-8">
        <Ticker items={notices} label={t('notice_badge')} />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-6">
            <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {t('hero_badge')}
            </motion.div>

            <motion.h1 {...fade(0.08)} className="font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
              {t('hero_title_part1')}{' '}<span className="text-gold-400">{t('hero_title_highlight')}</span>
            </motion.h1>

            <motion.p {...fade(0.16)} className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg">{t('hero_subtitle')}</motion.p>

            <motion.ul {...fade(0.2)} className="space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-400" />{p}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fade(0.26)} className="flex flex-col gap-3 sm:flex-row">
              <Link href="/admission" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400">
                {t('hero_cta_admission')}<ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-slate-400 hover:bg-slate-800">
                {t('hero_cta_courses')}
              </Link>
            </motion.div>
          </div>

          <motion.div {...fade(0.2)} className="relative lg:col-span-6">
            <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900 p-3 shadow-2xl sm:p-4">
              <ModernizedHeroBanner showStats={false} />
            </div>
            <Link href="/admission?coupon=HSC50&course=hsc-ict" className="absolute -top-3 right-3 flex items-center gap-2 rounded-xl border border-gold-400/40 bg-slate-950 px-3.5 py-2 shadow-xl transition-colors hover:border-gold-400 sm:-right-3">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-xs font-extrabold text-gold-300">{isBn ? 'HSC পরীক্ষার্থী ৫০% ছাড়' : 'HSC students 50% off'}</span>
            </Link>
            <div className="absolute -bottom-4 left-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-slate-950 px-3.5 py-2 shadow-xl sm:-left-4">
              <MonitorCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-100">{isBn ? '১ জন ১টি কম্পিউটার' : '1 PC per student'}</span>
            </div>
          </motion.div>
        </div>

        {/* Animated stats */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 bg-slate-900 p-5 sm:p-6">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 sm:flex">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <dt className="mt-0.5 text-xs text-slate-400">{s.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}