import { HardDrive } from 'lucide-react';
import GoogleDrivePortal from '@/components/GoogleDrivePortal';

export const metadata = { title: 'গুগল ড্রাইভ পোর্টাল | Bengal Institute' };

export default function DrivePage() {
  return (
    <section className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"><HardDrive className="w-3.5 h-3.5" />Google Workspace™ (Drive · Sheets · Docs)</div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">শিক্ষার্থী ও প্রশিক্ষণার্থী ক্লাউড পোর্টাল</h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">গুগল অ্যাকাউন্ট দিয়ে ক্লাসের অ্যাসাইনমেন্ট, স্প্রেডশিট ও ডকুমেন্টস সরাসরি অ্যাক্সেস, তৈরি ও পরিচালনা করুন।</p>
        </div>
        <GoogleDrivePortal />
      </div>
    </section>
  );
}
