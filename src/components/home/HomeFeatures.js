'use client';
import { Monitor, Wifi, Tv, ShieldCheck, Users, Headphones } from 'lucide-react';
import { CAMPUS_FACILITIES } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

const ICONS = { MonitorCheck: Monitor, Wifi, Tv, ShieldCheck, Users, Headphones };

export default function HomeFeatures() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  return (
    <section className="bg-slate-900/50 py-16 sm:py-24 border-y border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isBn ? 'কেন বেঙ্গল ইনস্টিটিউট' : 'Why Bengal Institute'}
          title={isBn ? 'শেখার জন্য যা যা দরকার, ' : 'Everything you need to learn, '}
          highlight={isBn ? 'সব এক ছাদের নিচে' : 'under one roof'}
          text={isBn ? 'আধুনিক ল্যাব, অভিজ্ঞ মেন্টর ও সরকারি সনদ — প্রতিটি কোর্সে একই মান।' : 'Modern labs, experienced mentors and a government certificate — the same standard in every course.'}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CAMPUS_FACILITIES.map((f, i) => {
            const Icon = ICONS[f.icon] || Monitor;
            return (
              <ScrollReveal key={f.titleEn} delay={(i % 3) * 0.06}>
                <article className="card-glass group h-full rounded-2xl p-6 transition-colors hover:border-emerald-400/40">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 group-hover:bg-emerald-400/20"><Icon className="h-5 w-5" /></div>
                  <h3 className="mb-1.5 text-base font-bold text-white">{isBn ? f.titleBn : f.titleEn}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{isBn ? f.descBn : f.descEn}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
