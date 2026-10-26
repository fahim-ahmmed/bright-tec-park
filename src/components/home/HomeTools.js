'use client';
import Link from 'next/link';
import { ShieldCheck, MapPin, LayoutDashboard, HardDrive, GraduationCap, Calculator, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

export default function HomeTools() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const items = [
    { href: '/verify', icon: ShieldCheck, tone: 'bg-sky-500/10 text-sky-300 ring-sky-500/25', title: isBn ? 'অনলাইন সনদ যাচাই' : 'Certificate verification', text: isBn ? 'সার্টিফিকেট আইডি বা রেজিস্ট্রেশন নম্বর দিয়ে সনদ যাচাই করুন।' : 'Verify with a certificate ID or registration number.' },
    { href: '/student', icon: LayoutDashboard, tone: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/25', title: isBn ? 'শিক্ষার্থী ড্যাশবোর্ড' : 'Student dashboard', text: isBn ? 'ক্লাস রুটিন, কোর্স ফাইল ও হোমওয়ার্ক জমা এক জায়গায়।' : 'Class routine, materials and homework in one place.' },
    { href: '/drive', icon: HardDrive, tone: 'bg-gold-400/10 text-gold-300 ring-gold-400/25', title: isBn ? 'গুগল ড্রাইভ পোর্টাল' : 'Google Drive portal', text: isBn ? 'লেকচার শিট ও অ্যাসাইনমেন্ট ফাইল সহজে পরিচালনা করুন।' : 'Manage lecture sheets and assignment files.' },
    { href: '/admission', icon: GraduationCap, tone: 'bg-violet-500/10 text-violet-300 ring-violet-500/25', title: isBn ? 'অনলাইন ভর্তি আবেদন' : 'Online admission', text: isBn ? 'ঘরে বসেই আবেদন করে অ্যাডমিশন স্লিপ নিন।' : 'Apply from home and get your admission slip.' },
    { href: '#calculator', icon: Calculator, tone: 'bg-rose-500/10 text-rose-300 ring-rose-500/25', title: isBn ? 'কোর্স ফি ক্যালকুলেটর' : 'Course fee calculator', text: isBn ? 'ছাড় ও কিস্তি হিসাব করে নিজের ফি জেনে নিন।' : 'Work out your fee with discounts and instalments.' },
    { href: '/campus', icon: MapPin, tone: 'bg-orange-500/10 text-orange-300 ring-orange-500/25', title: isBn ? 'ক্যাম্পাস ও লোকেশন' : 'Campus & location', text: isBn ? 'সিঙ্গার মোড়ে কীভাবে আসবেন, গুগল ম্যাপসহ।' : 'How to reach Singer Mor, with Google Maps.' },
  ];
  return (
    <section className="border-t border-slate-800 bg-slate-900/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isBn ? 'শিক্ষার্থী সেবা' : 'Student services'}
          title={isBn ? 'শিক্ষার্থীদের জন্য ' : 'Digital services '}
          highlight={isBn ? 'ডিজিটাল সুবিধা' : 'for students'}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((it, i) => (
            <ScrollReveal key={it.href} delay={(i % 3) * 0.05}>
              <Link href={it.href} className="group flex h-full items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40">
                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${it.tone}`}><it.icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 text-[15px] font-bold text-white">
                    {it.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-emerald-300" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-400">{it.text}</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}