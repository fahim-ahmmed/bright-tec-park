'use client';
import Link from 'next/link';
import { Search, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

export default function HomeProcess() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const steps = [
    { icon: Search, n: '01', title: isBn ? 'কোর্স বেছে নিন' : 'Choose a course', text: isBn ? 'সিলেবাস, ফি ও ব্যাচের আসন দেখে আপনার উপযুক্ত কোর্স নির্বাচন করুন।' : 'Compare syllabus, fees and batch seats, then pick the right course.' },
    { icon: FileText, n: '02', title: isBn ? 'অনলাইনে আবেদন করুন' : 'Apply online', text: isBn ? 'ফর্ম পূরণ করে অ্যাডমিশন স্লিপ নিন। HSC50 কোডে ৫০% ছাড় পান।' : 'Fill the form and get your admission slip. Use HSC50 for 50% off.' },
    { icon: GraduationCap, n: '03', title: isBn ? 'ক্লাস শুরু ও সনদ' : 'Learn & get certified', text: isBn ? 'ক্যাম্পাসে ভর্তি নিশ্চিত করে ক্লাস শুরু করুন এবং BTEB অনুমোদিত সনদ অর্জন করুন।' : 'Confirm at campus, start classes and earn your BTEB-approved certificate.' },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={isBn ? 'ভর্তি প্রক্রিয়া' : 'How it works'} title={isBn ? 'মাত্র ৩টি ধাপে ' : 'Get started in '} highlight={isBn ? 'শুরু করুন' : 'three steps'} gold />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 0.08}>
              <li className="card-glass relative h-full list-none rounded-2xl p-6">
                <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-slate-700/60" aria-hidden="true">{s.n}</span>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 ring-1 ring-gold-400/25"><s.icon className="h-5 w-5" /></div>
                <h3 className="mb-1.5 text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{s.text}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link href="/admission" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300">{isBn ? 'ভর্তি আবেদন শুরু করুন' : 'Start your application'}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
