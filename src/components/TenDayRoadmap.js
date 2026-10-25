'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image as ImageIcon, ShieldCheck, Award, ChevronRight, Sparkles, CheckCircle, Play } from 'lucide-react';
import { TEN_DAY_ROADMAP } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = { Monitor, Keyboard, FileText, Table, Presentation, Cloud, Cpu, Image: ImageIcon, ShieldCheck, Award };

export default function TenDayRoadmap() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [i, setI] = useState(0);
  const d = TEN_DAY_ROADMAP[i];
  const Icon = ICONS[d.icon] || Monitor;
  const pct = (i + 1) * 10;

  return (
    <section id="roadmap" className="py-12 sm:py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />{isBn ? 'আধুনিক কম্পিউটার ও এআই স্বাক্ষরতা মডেল' : 'Modern Computer & AI Literacy Framework'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? '১০ দিনের বিশেষ ' : '10-Day Accelerated '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">{isBn ? 'কম্পিউটার ও এআই রোডম্যাপ' : 'Computer & AI Roadmap'}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn ? 'কম্পিউটার স্বাক্ষরতা হলো কম্পিউটারের মৌলিক জ্ঞান, ব্যবহারিক দক্ষতা এবং প্রযুক্তিগত বিষয়াদির কার্যকর প্রয়োগ। দৈনন্দিন কাজ, শিক্ষা এবং পেশাগত জীবনে উন্নতির জন্য এটি একটি অত্যন্ত গুরুত্বপূর্ণ দক্ষতা।' : 'Computer literacy and AI competencies empower students with foundational knowledge, hands-on productivity, and modern automation tools essential for career growth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-2 sm:p-4 border border-slate-700/80 shadow-2xl glow-emerald">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-t-xl border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="ml-2 font-mono text-slate-300 hidden xs:inline">Bengal OS v2.6 · Lab PC #14</span></div>
                <span className="text-emerald-400 font-bold">{d.day} of 10</span>
              </div>
              <div className="p-4 sm:p-6 bg-slate-950/95 rounded-b-xl min-h-[340px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center justify-between mb-4 gap-2">
                      <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">{isBn ? d.highlightBn : d.highlightEn}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Play className="w-3 h-3 text-emerald-400" />{isBn ? 'লাইভ ল্যাব প্র্যাকটিস' : 'Live Lab Practice'}</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0"><Icon className="w-6 h-6" /></div>
                      <div>
                        <span className="text-emerald-400 font-mono text-xs font-bold">{d.day} {isBn ? 'সিলেবাস' : 'Syllabus'}</span>
                        <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5 leading-snug">{isBn ? d.titleBn : d.titleEn}</h2>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">{isBn ? d.descBn : d.descEn}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2"><span className="text-slate-400">{isBn ? 'রোডম্যাপ সম্পন্নতা:' : 'Roadmap Progress:'}</span><span className="text-emerald-400 font-bold font-mono">{pct}%</span></div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} /></div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="text-xs px-3 py-2 rounded-md bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 cursor-pointer">{isBn ? '← পূর্ববর্তী' : '← Previous'}</button>
                    <span className="text-[11px] text-slate-400">{isBn ? `দিন ${i + 1} / ১০` : `Day ${i + 1} / 10`}</span>
                    <button type="button" onClick={() => setI(Math.min(9, i + 1))} disabled={i === 9} className="text-xs px-3 py-2 rounded-md bg-emerald-600 text-white font-bold disabled:opacity-30 hover:bg-emerald-500 cursor-pointer">{isBn ? 'পরবর্তী →' : 'Next →'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-2.5 lg:max-h-[560px] lg:overflow-y-auto pr-1">
            {TEN_DAY_ROADMAP.map((item, idx) => {
              const sel = i === idx; const I = ICONS[item.icon] || Monitor;
              return (
                <button key={item.day} type="button" onClick={() => setI(idx)} aria-current={sel}
                  className={`w-full text-left p-3.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 ${sel ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${sel ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}><I className="w-4 h-4" /></div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2"><span className={`text-xs font-mono font-bold ${sel ? 'text-emerald-400' : 'text-slate-400'}`}>{item.day}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{isBn ? item.highlightBn : item.highlightEn}</span></div>
                      <h3 className="text-sm font-bold text-slate-200 mt-0.5 line-clamp-1">{isBn ? item.titleBn : item.titleEn}</h3>
                    </div>
                  </div>
                  {sel ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
