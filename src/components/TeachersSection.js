'use client';
import { useState } from 'react';
import TeacherPhoto from './TeacherPhoto';
import Link from 'next/link';
import { Users, Award, Clock, GraduationCap } from 'lucide-react';
import { TEACHERS_LIST } from '@/data/teachersData';
import { useLanguage } from '@/context/LanguageContext';

const CATS = [
  ['all', 'সকল', 'All'], ['office', 'অফিস', 'Office'], ['freelancing', 'ফ্রিল্যান্সিং', 'Freelancing'],
  ['design', 'ডিজাইন', 'Design'], ['coding', 'কোডিং', 'Coding'], ['ict', 'আইসিটি', 'ICT'],
  ['spoken', 'স্পোকেন ইংলিশ', 'Spoken'], ['cyber', 'সাইবার', 'Cyber'],
];

export default function TeachersSection() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [cat, setCat] = useState('all');
  const list = TEACHERS_LIST.filter((t) => cat === 'all' || t.category === cat);

  return (
    <section className="py-12 sm:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <Users className="w-3.5 h-3.5" />{isBn ? '২৫ জন অভিজ্ঞ শিক্ষক ও ইন্সট্রাক্টর' : '25 Expert Teachers & Instructors'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{isBn ? 'আমাদের শিক্ষকমণ্ডলী' : 'Our Faculty'}</h1>
          <p className="text-xs sm:text-sm text-slate-300">{isBn ? 'ইন্ডাস্ট্রি প্রফেশনাল ও সনদপ্রাপ্ত মেন্টরদের তত্ত্বাবধানে হাতে-কলমে প্রশিক্ষণ।' : 'Hands-on training led by industry professionals and certified mentors.'}</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar" role="tablist">
          {CATS.map(([id, bn, en]) => (
            <button key={id} type="button" role="tab" aria-selected={cat === id} onClick={() => setCat(id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${cat === id ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'}`}>
              {isBn ? bn : en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((t) => {
            const name = isBn ? t.nameBn : t.nameEn;
            return (
              <article key={t.id} className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col shadow-xl">
                <div className="relative aspect-[4/3] bg-slate-950"><TeacherPhoto src={t.photoUrl} name={name} />
                  <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold px-2 py-1 rounded-md bg-slate-950/85 text-emerald-300 border border-emerald-500/30 line-clamp-1">{isBn ? t.badgeBn : t.badgeEn}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-2.5">
                  <div>
                    <h2 className="font-black text-white text-base leading-tight">{name}</h2>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">{isBn ? t.designationBn : t.designationEn}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{isBn ? t.bioBn : t.bioEn}</p>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    <li className="flex items-start gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />{isBn ? t.educationBn : t.educationEn}</li>
                    <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />{isBn ? t.experienceBn : t.experienceEn} · {t.studentsTrained.toLocaleString(isBn ? 'bn-BD' : 'en-US')}+ {isBn ? 'শিক্ষার্থী' : 'students'}</li>
                    <li className="flex items-start gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />{isBn ? t.availableDaysBn : t.availableDaysEn}</li>
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-auto pt-1">
                    {t.skills.slice(0, 4).map((s) => <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">{s}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/admission" className="inline-flex px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm">{isBn ? 'ভর্তি আবেদন করুন' : 'Apply for Admission'}</Link>
        </div>
      </div>
    </section>
  );
}
