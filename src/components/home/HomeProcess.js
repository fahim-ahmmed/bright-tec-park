'use client';
import Link from 'next/link';
import { Search, FileText, BadgeCheck, GraduationCap, ArrowRight, Phone } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

export default function HomeProcess() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const steps = [
    { icon: Search, title: isBn ? 'কোর্স বেছে নিন' : 'Choose a course', text: isBn ? 'সিলেবাস, ফি ও ব্যাচের আসন দেখে আপনার উপযুক্ত কোর্স নির্বাচন করুন।' : 'Compare syllabus, fees and batch seats, then pick the right course.' },
    { icon: FileText, title: isBn ? 'অনলাইনে আবেদন' : 'Apply online', text: isBn ? 'ফর্ম পূরণ করে অ্যাডমিশন স্লিপ ও রেজিস্ট্রেশন টোকেন নিন।' : 'Fill the form and receive your admission slip and token.' },
    { icon: BadgeCheck, title: isBn ? 'ভর্তি নিশ্চিত করুন' : 'Confirm admission', text: isBn ? 'ক্যাম্পাসে এসে অথবা বিকাশের মাধ্যমে ভর্তি নিশ্চিত করুন।' : 'Confirm at the campus or through bKash.' },
    { icon: GraduationCap, title: isBn ? 'ক্লাস ও সনদ' : 'Learn & get certified', text: isBn ? 'ব্যাচে ক্লাস শুরু করুন এবং কোর্স শেষে সনদ অর্জন করুন।' : 'Start classes in your batch and earn your certificate.' },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          gold
          eyebrow={isBn ? 'ভর্তি প্রক্রিয়া' : 'Admission process'}
          title={isBn ? 'সহজ ভর্তি প্রক্রিয়া, ' : 'A simple admission process, '}
          highlight={isBn ? 'ঝামেলাহীন শুরু' : 'hassle-free start'}
        />

        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-[3.25rem] hidden h-px border-t border-dashed border-slate-600 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center transition-colors hover:border-gold-400/40">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-gold-400 ring-1 ring-gold-400/30">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 text-[11px] font-black text-slate-950">{i + 1}</span>
                </div>
                <h3 className="mb-1.5 text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/admission" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400">
            {isBn ? 'ভর্তি আবেদন শুরু করুন' : 'Start your application'}<ArrowRight className="h-4 w-4" />
          </Link>
          <a href={`tel:${INSTITUTE_INFO.phone1}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800">
            <Phone className="h-4 w-4 text-emerald-400" />{INSTITUTE_INFO.phone1}
          </a>
        </div>
      </div>
    </section>
  );
}