'use client';
import Link from 'next/link';
import { Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BatchStatusBadge from './BatchStatusBadge';

export default function CourseDetailView({ course }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const locale = isBn ? 'bn-BD' : 'en-US';
  const price = course.discountFee || course.fee;
  const status = course.batchInfo?.status;
  const ctaCls = status === 'full' ? 'bg-rose-500 hover:bg-rose-400 text-white' : status === 'coming_soon' ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950';
  const ctaText = status === 'full' ? (isBn ? 'পরবর্তী ব্যাচে ওয়েটলিস্ট আবেদন করুন' : 'Join Waitlist for Next Batch') : status === 'coming_soon' ? (isBn ? 'অগ্রিম আসন প্রি-বুকিং করুন' : 'Pre-Book Seat Now') : (isBn ? 'এই কোর্সে ভর্তি হতে আবেদন করুন' : 'Apply for Admission');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-400">{isBn ? 'হোম' : 'Home'}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/courses" className="hover:text-emerald-400">{isBn ? 'কোর্সসমূহ' : 'Courses'}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-emerald-400 line-clamp-1">{isBn ? course.titleBn : course.titleEn}</span>
      </nav>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex flex-wrap items-center gap-2 text-emerald-400 text-xs font-bold">
          <Clock className="w-4 h-4" />
          <span>{isBn ? course.durationBn : course.durationEn} · {course.level}</span>
          {course.btebApproved && <span className="ml-auto px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px]">{isBn ? 'BTEB সরকার অনুমোদিত' : 'BTEB Approved'}</span>}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{isBn ? course.titleBn : course.titleEn}</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">{isBn ? course.titleEn : course.titleBn}</p>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{isBn ? course.descriptionBn : course.descriptionEn}</p>

        <BatchStatusBadge batchInfo={course.batchInfo} variant="detail-box" />

        <section>
          <h2 className="text-sm font-bold text-emerald-400 mb-2">{isBn ? 'সম্পূর্ণ পাঠ্যক্রম ও প্র্যাকটিক্যাল ল্যাব মডিউল:' : 'Full syllabus & practical lab modules:'}</h2>
          <ol className="space-y-2">
            {course.modules.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">{i + 1}</span>
                <span>{m}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-slate-300 block mb-1.5">{isBn ? 'ব্যবহৃত সফটওয়্যার ও টুলস:' : 'Software & tools:'}</span>
            <div className="flex flex-wrap gap-1.5">{course.software.map((s) => <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">{s}</span>)}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-slate-300 block mb-1.5">{isBn ? 'ক্যারিয়ার সুযোগ:' : 'Career paths:'}</span>
            <div className="flex flex-wrap gap-1.5">{course.careerPaths.map((c) => <span key={c} className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">{c}</span>)}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">{isBn ? 'কোর্স ফি:' : 'Course fee:'}</span>
            <span className="text-2xl font-black text-emerald-400">৳{price.toLocaleString(locale)}</span>
            {course.discountFee && <span className="ml-2 text-xs text-slate-500 line-through">৳{course.fee.toLocaleString(locale)}</span>}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/courses" className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />{isBn ? 'সব কোর্স' : 'All courses'}
            </Link>
            <Link href={`/admission?course=${course.id}`} className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md text-center ${ctaCls}`}>{ctaText}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
