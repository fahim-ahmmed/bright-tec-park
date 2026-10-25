'use client';
import Link from 'next/link';
import {
  FileSpreadsheet, Sparkles, GraduationCap, ShieldAlert, Palette, Code, MessageSquare, Smile,
  CheckCircle2, Clock, Award, ArrowRight, BookOpen,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BatchStatusBadge from './BatchStatusBadge';

export const courseIconMap = {
  FileSpreadsheet: FileSpreadsheet, Sparkles, GraduationCap, ShieldAlert, Palette, Code, MessageSquare, Smile,
};

export default function CourseCard({ course }) {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const Icon = courseIconMap[course.iconName] || BookOpen;
  const locale = isBn ? 'bn-BD' : 'en-US';
  const hasDiscount = course.discountFee && course.discountFee < course.fee;
  const status = course.batchInfo?.status;

  const ctaCls =
    status === 'full'
      ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40'
      : status === 'coming_soon'
      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950';
  const ctaText =
    status === 'full' ? (isBn ? 'ব্যাচ পূর্ণ · অপেক্ষমাণ তালিকা' : 'Batch Full · Join Waitlist')
    : status === 'coming_soon' ? (isBn ? 'অগ্রিম আসন প্রি-বুকিং করুন' : 'Pre-Book Seat Now')
    : t('btn_enroll');

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-colors shadow-xl overflow-hidden h-full">
      <div>
        <div className="p-5 pb-0 flex items-start justify-between gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <BatchStatusBadge batchInfo={course.batchInfo} variant="badge-md" />
            <div className="flex flex-wrap items-center justify-end gap-1">
              {course.btebApproved && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  <Award className="w-3 h-3" /> BTEB {isBn ? 'সনদ' : 'Certificate'}
                </span>
              )}
              {course.tagBn && isBn && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{course.tagBn}</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 leading-snug">
            <Link href={`/courses/${course.id}`} className="focus:outline-none focus-visible:underline">
              {isBn ? course.titleBn : course.titleEn}
            </Link>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">{isBn ? course.titleEn : course.titleBn}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> {isBn ? course.durationBn : course.durationEn}
            </span>
            <span>{course.level}</span>
          </div>

          <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">{isBn ? course.descriptionBn : course.descriptionEn}</p>

          <div className="mt-4 space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">{isBn ? 'প্রধান বিষয়বস্তু:' : 'Core Modules:'}</span>
            {course.modules.slice(0, 3).map((m, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{m}</span>
              </div>
            ))}
            {course.modules.length > 3 && (
              <span className="text-[10px] text-emerald-400 font-medium block pt-0.5">
                + {isBn ? `আরও ${course.modules.length - 3}টি মডিউল` : `${course.modules.length - 3} more modules`}
              </span>
            )}
          </div>

          <BatchStatusBadge batchInfo={course.batchInfo} variant="card-footer-progress" />
        </div>
      </div>

      <div className="p-5 pt-3 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-end justify-between mb-3 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">{t('fee_label')}</span>
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-black text-emerald-400">৳{course.discountFee.toLocaleString(locale)}</span>
                  <span className="text-xs text-slate-500 line-through">৳{course.fee.toLocaleString(locale)}</span>
                </>
              ) : (
                <span className="text-xl font-black text-white">৳{course.fee.toLocaleString(locale)}</span>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.id}`} className="text-xs text-slate-300 hover:text-emerald-400 font-semibold underline underline-offset-4">
            {t('btn_view_syllabus')}
          </Link>
        </div>
        <Link href={`/admission?course=${course.id}`} className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs shadow-md ${ctaCls}`}>
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
