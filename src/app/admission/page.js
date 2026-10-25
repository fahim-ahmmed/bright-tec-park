import { Suspense } from 'react';
import AdmissionForm from '@/components/AdmissionForm';
import AdmissionHeader from '@/components/AdmissionHeader';

export const metadata = { title: 'অনলাইন ভর্তি আবেদন | Bengal Institute', description: 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে অনলাইনে ভর্তি আবেদন করুন।' };

export default function AdmissionPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 sm:p-8">
        <AdmissionHeader />
        <Suspense fallback={<div className="py-10 text-center text-xs text-slate-400">Loading…</div>}>
          <AdmissionForm />
        </Suspense>
      </div>
    </div>
  );
}
