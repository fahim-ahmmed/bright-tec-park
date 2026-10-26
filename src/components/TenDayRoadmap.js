'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image as ImageIcon, ShieldCheck, Award, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { TEN_DAY_ROADMAP } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image: ImageIcon, ShieldCheck, Award };

export default function TenDayRoadmap({ heading: Heading = 'h1' }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [i, setI] = useState(0);
  const d = TEN_DAY_ROADMAP[i];
  const Icon = ICONS[d.icon] || Monitor;
  const pct = (i + 1) * 10;

  return (
    <section id="roadmap" className="border-y border-slate-800 bg-slate-900/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-emerald-400">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
            {isBn ? 'ছোট কোর্স, বড় শুরু' : 'A short course, a strong start'}
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
          </div>
          <Heading className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {isBn ? '১০ দিনের বিশেষ ' : '10-day special '}
            <span className="text-emerald-400">{isBn ? 'কম্পিউটার ও এআই রোডম্যাপ' : 'computer & AI roadmap'}</span>
          </Heading>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            {isBn
              ? 'কম্পিউটারের মৌলিক জ্ঞান থেকে অফিস অ্যাপ্লিকেশন, ইন্টারনেট ও ডিজিটাল নিরাপত্তা। দিনে দিনে ধাপে ধাপে শিখুন।'
              : 'From computer basics to office applications, the internet and digital safety. Learn step by step, day by day.'}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Timeline */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative max-h-[540px] space-y-2 overflow-y-auto pr-1 no-scrollbar">
              {TEN_DAY_ROADMAP.map((item, idx) => {
                const sel = i === idx;
                const done = idx < i;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-current={sel ? 'step' : undefined}
                    className={`flex w-full cursor-pointer items-center gap-3.5 rounded-xl border p-3 text-left transition-all ${
                      sel ? 'border-emerald-500/60 bg-slate-900 shadow-lg shadow-black/20' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      sel ? 'bg-emerald-500 text-slate-950' : done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {done ? <Check className="h-4 w-4" /> : idx + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold text-slate-400">{isBn ? item.highlightBn : item.highlightEn}</span>
                      <span className={`block truncate text-sm font-bold ${sel ? 'text-white' : 'text-slate-300'}`}>{isBn ? item.titleBn : item.titleEn}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5 sm:px-7">
                <span className="text-sm font-bold text-emerald-400">{isBn ? `দিন ${i + 1}` : d.day}</span>
                <span className="text-xs text-slate-400">{isBn ? `১০ দিনের মধ্যে ${i + 1}` : `${i + 1} of 10`}</span>
              </div>
              <div className="min-h-[300px] p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <span className="inline-block rounded-md border border-gold-400/30 bg-gold-400/10 px-2.5 py-0.5 text-[11px] font-bold text-gold-300">{isBn ? d.highlightBn : d.highlightEn}</span>
                        <h3 className="mt-2 text-lg font-extrabold leading-snug text-white sm:text-2xl">{isBn ? d.titleBn : d.titleEn}</h3>
                      </div>
                    </div>
                    <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300">{isBn ? d.descBn : d.descEn}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="border-t border-slate-800 px-5 py-4 sm:px-7">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{isBn ? 'রোডম্যাপ সম্পন্নতা' : 'Roadmap progress'}</span>
                  <span className="font-bold text-emerald-400">{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30">
                    <ChevronLeft className="h-4 w-4" />{isBn ? 'আগের দিন' : 'Previous'}
                  </button>
                  <button type="button" onClick={() => setI(Math.min(9, i + 1))} disabled={i === 9} className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-extrabold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-30">
                    {isBn ? 'পরের দিন' : 'Next'}<ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}