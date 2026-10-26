'use client';
import { Monitor, Wifi, Tv, ShieldCheck, Users, Headphones } from 'lucide-react';
import { CAMPUS_FACILITIES } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

const ICONS = { MonitorCheck: Monitor, Wifi, Tv, ShieldCheck, Users, Headphones };
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=75`;
// One relevant photo per facility (same order as CAMPUS_FACILITIES). Replace with your own photos any time.
const PHOTOS = [
  U('photo-1531482615713-2afd69097998'),
  U('photo-1518770660439-4636190af475'),
  U('photo-1524178232363-1fb2b075b655'),
  U('photo-1523240795612-9a054b0db644'),
  U('photo-1427504494785-3a9ca7044f45'),
  U('photo-1522202176988-66273c2fd55f'),
];

export default function HomeFeatures() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  return (
    <section className="border-y border-slate-800 bg-slate-900/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isBn ? 'কেন বেঙ্গল ইনস্টিটিউট' : 'Why Bengal Institute'}
          title={isBn ? 'শেখার জন্য যা যা দরকার, ' : 'Everything you need to learn, '}
          highlight={isBn ? 'সব এক ছাদের নিচে' : 'under one roof'}
          text={isBn ? 'আধুনিক ল্যাব, অভিজ্ঞ শিক্ষক ও সরকারি সনদ। প্রতিটি কোর্সে একই মান।' : 'Modern labs, experienced teachers and a government-approved certificate, with the same standard in every course.'}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPUS_FACILITIES.map((f, i) => {
            const Icon = ICONS[f.icon] || Monitor;
            return (
              <ScrollReveal key={f.titleEn} delay={(i % 3) * 0.06}>
                <article className="group h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-black/30">
                  <div className="relative h-44 overflow-hidden">
                    <SmartImage
                      src={PHOTOS[i]}
                      alt={isBn ? f.titleBn : f.titleEn}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallback={<Icon className="h-10 w-10 text-slate-600" />}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-lg">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 text-base font-bold text-white">{isBn ? f.titleBn : f.titleEn}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{isBn ? f.descBn : f.descEn}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}