'use client';
import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles, HardDrive, BarChart3, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

export default function HomeTools() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const items = [
    { href: '/verify', icon: ShieldCheck, tone: 'text-sky-300 bg-sky-400/10 ring-sky-400/25', title: isBn ? 'অনলাইন সনদ যাচাই' : 'Certificate verification', text: isBn ? 'সার্টিফিকেট আইডি বা রেজিস্ট্রেশন নম্বর দিয়ে যাচাই করুন।' : 'Verify with a certificate ID or registration number.' },
    { href: '/campus', icon: MapPin, tone: 'text-rose-300 bg-rose-400/10 ring-rose-400/25', title: isBn ? 'ক্যাম্পাস ও লোকেশন' : 'Campus & location', text: isBn ? 'সিঙ্গার মোড়ে কীভাবে আসবেন, গুগল ম্যাপসহ।' : 'How to reach Singer Mor, with Google Maps.' },
    { href: '/ai-studio', icon: Sparkles, tone: 'text-emerald-300 bg-emerald-400/10 ring-emerald-400/25', title: isBn ? 'এআই ইমেজ স্টুডিও' : 'AI image studio', text: isBn ? 'প্রজেক্টের জন্য প্রম্পট থেকে ছবি তৈরি করুন।' : 'Turn a prompt into a project image.' },
    { href: '/drive', icon: HardDrive, tone: 'text-gold-300 bg-gold-400/10 ring-gold-400/25', title: isBn ? 'গুগল ড্রাইভ পোর্টাল' : 'Google Drive portal', text: isBn ? 'লেকচার শিট ও অ্যাসাইনমেন্ট ফাইল পরিচালনা করুন।' : 'Manage lecture sheets and assignment files.' },
    { href: '/analytics', icon: BarChart3, tone: 'text-violet-300 bg-violet-400/10 ring-violet-400/25', title: isBn ? 'কোর্স অ্যানালিটিক্স' : 'Course analytics', text: isBn ? 'ফি ও ব্যাচ আসনের তুলনামূলক চার্ট।' : 'Fee and batch-seat comparison charts.' },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={isBn ? 'শিক্ষার্থী সুবিধা' : 'Student tools'} title={isBn ? 'শিক্ষার্থীদের জন্য ' : 'Built for '} highlight={isBn ? 'ডিজিটাল সুবিধা' : 'students'} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <ScrollReveal key={it.href} delay={(i % 3) * 0.05}>
              <Link href={it.href} className="card-glass group flex h-full items-start gap-4 rounded-2xl p-5 transition-colors hover:border-emerald-400/40">
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${it.tone}`}><it.icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2 text-sm font-bold text-white">{it.title}<ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-emerald-300" /></span><span className="mt-1 block text-xs leading-relaxed text-slate-400">{it.text}</span></span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
