'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TEACHERS_LIST } from '@/data/teachersData';
import { useLanguage } from '@/context/LanguageContext';
import TeacherPhoto from '../TeacherPhoto';
import ScrollReveal from '../ScrollReveal';
import SectionHeading from './SectionHeading';

const FEATURED = ['t-1', 't-2', 't-3', 't-5'];

export default function HomeTeachers() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const list = FEATURED.map((id) => TEACHERS_LIST.find((t) => t.id === id)).filter(Boolean);
  return (
    <section className="bg-slate-900/50 border-y border-slate-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={isBn ? '২৫ জন অভিজ্ঞ শিক্ষক' : '25 expert instructors'} title={isBn ? 'যাঁদের কাছে ' : 'Learn from '} highlight={isBn ? 'শিখবেন' : 'working professionals'} text={isBn ? 'ইন্ডাস্ট্রি প্রফেশনাল ও সনদপ্রাপ্ত মেন্টরদের তত্ত্বাবধানে হাতে-কলমে প্রশিক্ষণ।' : 'Hands-on training led by industry professionals and certified mentors.'} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {list.map((t, i) => {
            const name = isBn ? t.nameBn : t.nameEn;
            return (
              <ScrollReveal key={t.id} delay={i * 0.06}>
                <article className="card-glass group overflow-hidden rounded-2xl">
                  <div className="aspect-[4/4.2] overflow-hidden bg-slate-900"><TeacherPhoto src={t.photoUrl} name={name} className="transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{name}</h3>
                    <p className="mt-1 text-[11px] sm:text-xs font-semibold text-emerald-300 line-clamp-2">{isBn ? t.designationBn : t.designationEn}</p>
                    <p className="mt-2 text-[11px] text-slate-400">{isBn ? t.experienceBn : t.experienceEn} · {t.studentsTrained.toLocaleString(isBn ? 'bn-BD' : 'en-US')}+ {isBn ? 'শিক্ষার্থী' : 'students'}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
        <div className="mt-8 text-center"><Link href="/teachers" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">{isBn ? 'সব ২৫ জন শিক্ষক দেখুন' : 'Meet all 25 instructors'}<ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  );
}
