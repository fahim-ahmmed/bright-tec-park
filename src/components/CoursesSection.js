'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Filter, Users, ArrowRight } from 'lucide-react';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import CourseCard from './CourseCard';
import ScrollReveal from './ScrollReveal';
import BengalOneShowcaseBanner from './BengalOneShowcaseBanner';

export default function CoursesSection({ showFilters = true, limit, heading = true, showcase = false }) {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const [category, setCategory] = useState('all');
  const [batchStatus, setBatchStatus] = useState('all');

  const categories = [
    { id: 'all', label: isBn ? 'সকল কোর্সসমূহ' : 'All Courses' },
    { id: 'office', label: isBn ? 'কম্পিউটার অফিস' : 'Office Application' },
    { id: 'ai', label: isBn ? 'এআই ও ফ্রিল্যান্সিং' : 'AI & Freelancing' },
    { id: 'coding', label: isBn ? 'আইসিটি ও সাইবার সিকিউরিটি' : 'ICT & Coding' },
    { id: 'freelancing', label: isBn ? 'গ্রাফিক ও ওয়েব ডিজাইন' : 'Graphic & Web' },
    { id: 'language', label: isBn ? 'স্পোকেন ইংলিশ' : 'Spoken English' },
    { id: 'kids', label: isBn ? 'কিডস প্রোগ্রাম' : 'Kids Program' },
  ];
  const statuses = [
    { id: 'all', bn: 'সকল ব্যাচ', en: 'All Batches', n: COURSES_DATA.length },
    { id: 'enrolling', bn: 'ভর্তি চলছে', en: 'Enrolling Now', dot: 'bg-emerald-400', n: COURSES_DATA.filter((c) => c.batchInfo?.status === 'enrolling').length },
    { id: 'full', bn: 'ব্যাচ পূর্ণ', en: 'Full', dot: 'bg-rose-500', n: COURSES_DATA.filter((c) => c.batchInfo?.status === 'full').length },
    { id: 'coming_soon', bn: 'শীঘ্রই শুরু', en: 'Coming Soon', dot: 'bg-amber-400', n: COURSES_DATA.filter((c) => c.batchInfo?.status === 'coming_soon').length },
  ];

  let list = COURSES_DATA.filter(
    (c) => (category === 'all' || c.category === category) && (batchStatus === 'all' || c.batchInfo?.status === batchStatus)
  );
  if (limit) list = list.slice(0, limit);

  return (
    <section id="courses" className="py-12 sm:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="space-y-2.5 max-w-xl flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('courses_badge')}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t('courses_heading_part1')}{' '}
                <span className="text-gradient-brand">{t('courses_heading_part2')}</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">{t('courses_subheading')}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded-md">✓ {isBn ? '১৬ বছরের সাফল্য' : '16 Years of Excellence'}</span>
                <span className="text-[11px] font-semibold text-sky-300 bg-sky-400/10 border border-sky-400/25 px-2 py-0.5 rounded-md">✓ {isBn ? 'আধুনিক কম্পিউটার ও এআই ল্যাব' : 'Modern Computer & AI Lab'}</span>
              </div>
            </div>
            {showcase && (
              <div className="shrink-0 self-center lg:self-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <BengalOneShowcaseBanner className="w-full" />
              </div>
            )}
          </div>
        )}

        {showFilters && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Category">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer ${
                    category === c.id ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'ব্যাচ স্ট্যাটাস অনুযায়ী ফিল্টার:' : 'Filter by Batch Status:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {statuses.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setBatchStatus(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                      batchStatus === s.id ? 'bg-slate-800 text-white border-emerald-500' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800/80'
                    }`}
                  >
                    {s.dot && <span className={`w-2 h-2 rounded-full ${s.dot}`} />}
                    <span>{isBn ? s.bn : s.en}</span>
                    <span className="px-1.5 rounded-full bg-slate-900 text-[10px] text-slate-400 font-mono">{s.n}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {list.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Users className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">{isBn ? 'কোনো কোর্স পাওয়া যায়নি' : 'No courses found'}</h4>
            <p className="text-xs text-slate-400 mb-4">{isBn ? 'অন্য ক্যাটাগরি বা ব্যাচ স্ট্যাটাস নির্বাচন করুন।' : 'Try a different category or batch status.'}</p>
            <button type="button" onClick={() => { setCategory('all'); setBatchStatus('all'); }} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer">
              {isBn ? 'সব কোর্স দেখুন' : 'Show all courses'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {list.map((course, i) => (
              <ScrollReveal key={course.id} delay={(i % 3) * 0.06}>
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {limit && (
          <div className="mt-8 text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm">
              {isBn ? 'সব কোর্স ও সিলেবাস দেখুন' : 'See all courses & syllabus'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
