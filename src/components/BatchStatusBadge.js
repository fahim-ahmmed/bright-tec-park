'use client';
import { Users, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BatchStatusBadge({ batchInfo, variant = 'badge-md', className = '' }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  if (!batchInfo) return null;

  const { status, enrolledStudents, totalSeats, startDateBn, startDateEn, batchCodeBn, batchCodeEn, scheduleBn, scheduleEn } = batchInfo;
  const seatsLeft = Math.max(0, totalSeats - enrolledStudents);
  const pct = Math.min(100, Math.round((enrolledStudents / totalSeats) * 100));
  const code = isBn ? batchCodeBn : batchCodeEn;
  const pill = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black border shadow-sm';

  if (variant === 'badge-sm' || variant === 'badge-md') {
    if (status === 'enrolling')
      return (
        <span className={`${pill} bg-emerald-500/15 border-emerald-500/40 text-emerald-300 ${className}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{isBn ? 'ভর্তি চলছে' : 'Enrolling Now'}</span>
          {seatsLeft > 0 && <span className="text-emerald-400/90 font-medium pl-1 border-l border-emerald-500/30">{isBn ? `${seatsLeft}টি আসন বাকি` : `${seatsLeft} seats left`}</span>}
        </span>
      );
    if (status === 'full')
      return (
        <span className={`${pill} bg-rose-500/15 border-rose-500/40 text-rose-300 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>{isBn ? 'ব্যাচ পূর্ণ' : 'Batch Full'}</span>
          <span className="text-rose-400/90 font-medium pl-1 border-l border-rose-500/30">{isBn ? 'অপেক্ষমাণ তালিকা' : 'Waitlist'}</span>
        </span>
      );
    return (
      <span className={`${pill} bg-amber-500/15 border-amber-500/40 text-amber-300 ${className}`}>
        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
        <span>{isBn ? 'শীঘ্রই শুরু' : 'Coming Soon'}</span>
        {startDateBn && <span className="text-amber-400/90 font-medium pl-1 border-l border-amber-500/30">{isBn ? 'প্রি-বুকিং' : 'Pre-Booking'}</span>}
      </span>
    );
  }

  if (variant === 'card-footer-progress') {
    const Icon = status === 'coming_soon' ? Calendar : Users;
    const tone = status === 'enrolling' ? 'text-emerald-400' : status === 'full' ? 'text-rose-400' : 'text-amber-400';
    const bar = status === 'enrolling' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : status === 'full' ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400';
    const width = status === 'full' ? 100 : status === 'enrolling' ? pct : 25;
    const right =
      status === 'enrolling' ? (isBn ? `${enrolledStudents}/${totalSeats} সিট বুকড (${pct}%)` : `${enrolledStudents}/${totalSeats} Seats (${pct}%)`)
      : status === 'full' ? (isBn ? '১০০% আসন পূর্ণ' : '100% Full')
      : (isBn ? `আসন সংখ্যা: ${totalSeats}` : `Capacity: ${totalSeats}`);
    return (
      <div className={`space-y-1.5 pt-2 ${className}`}>
        <div className="flex items-center justify-between text-[11px] gap-2">
          <span className="text-slate-400 flex items-center gap-1 font-medium min-w-0"><Icon className={`w-3.5 h-3.5 shrink-0 ${tone}`} /><span className="truncate">{code}</span></span>
          <span className={`font-bold shrink-0 ${tone}`}>{right}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden" role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100}>
          <div className={`h-full rounded-full ${bar}`} style={{ width: `${width}%` }} />
        </div>
        {status !== 'enrolling' && (
          <p className="text-[10px] text-slate-400">
            {status === 'full'
              ? `* ${isBn ? startDateBn || 'পরবর্তী ব্যাচ নিবন্ধন চলছে' : startDateEn || 'Waitlist open for next batch'}`
              : `* ${isBn ? `ক্লাস শুরু: ${startDateBn || 'শীঘ্রই'}` : `Starts: ${startDateEn || 'Soon'}`}`}
          </p>
        )}
      </div>
    );
  }

  // detail-box
  const tone = status === 'enrolling' ? 'bg-emerald-950/30 border-emerald-500/40' : status === 'full' ? 'bg-rose-950/30 border-rose-500/40' : 'bg-amber-950/30 border-amber-500/40';
  return (
    <div className={`p-3.5 rounded-xl border text-slate-200 ${tone} ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-black text-sm">
          {status === 'enrolling' && (isBn ? 'ব্যাচে সরাসরি ভর্তি চলছে' : 'Enrolling Now')}
          {status === 'full' && (isBn ? 'বর্তমান ব্যাচ পূর্ণ' : 'Batch Full - Waitlist')}
          {status === 'coming_soon' && (isBn ? 'আসন্ন নতুন ব্যাচ' : 'Coming Soon')}
        </span>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80">{code}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-800/80">
        <div>
          <span className="text-slate-400 block text-[10px]">{isBn ? 'আসন অবস্থা:' : 'Seat Status:'}</span>
          <span className="font-semibold text-white">
            {status === 'enrolling' && (isBn ? `${seatsLeft}টি আসন বাকি (মোট ${totalSeats})` : `${seatsLeft} seats left of ${totalSeats}`)}
            {status === 'full' && (isBn ? `${totalSeats}/${totalSeats} পূর্ণ` : `${totalSeats}/${totalSeats} Full`)}
            {status === 'coming_soon' && (isBn ? `মোট আসন: ${totalSeats}টি` : `Capacity: ${totalSeats}`)}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">{isBn ? 'শুরুর সময়:' : 'Start:'}</span>
          <span className="font-semibold text-white">{isBn ? startDateBn || 'চলমান' : startDateEn || 'Ongoing'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">{isBn ? 'শিডিউল:' : 'Schedule:'}</span>
          <span className="font-semibold text-white">{isBn ? scheduleBn : scheduleEn}</span>
        </div>
      </div>
    </div>
  );
}
