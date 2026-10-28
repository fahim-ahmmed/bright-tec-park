'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge, NOTICE_CATS, fmtDate } from '@/components/admin/ui';

const today = () => new Date().toISOString().slice(0, 10);

const config = {
  resource: 'notices',
  title: 'নোটিশ',
  subtitle: 'ক্লাস বন্ধ, ছুটি, ল্যাব বন্ধ বা জরুরি ঘোষণা দিন। সাথে সাথে সব ছাত্রের ড্যাশবোর্ডে যাবে, আর "জরুরি" টিক দিলে উপরে হাইলাইট হবে।',
  searchPlaceholder: 'নোটিশ খুঁজুন…',
  canCreate: true,
  createLabel: 'নতুন নোটিশ',
  defaults: { category: 'General', date: today(), active: true, isUrgent: false },
  columns: [
    { key: 'date', label: 'তারিখ', render: (r) => <span className="text-xs">{fmtDate(r.date)}</span> },
    { key: 'titleBn', label: 'নোটিশ', render: (r) => (<div className="max-w-[420px]"><p className="font-bold text-white">{r.titleBn}</p>{r.titleEn && <p className="mt-0.5 text-xs text-slate-400">{r.titleEn}</p>}</div>) },
    { key: 'category', label: 'ধরন', render: (r) => <Badge tone="blue">{NOTICE_CATS[r.category] || r.category}</Badge> },
    { key: 'flags', label: 'অবস্থা', render: (r) => (<div className="flex flex-wrap gap-1.5">{r.isUrgent && <Badge tone="red">জরুরি</Badge>}<Badge tone={r.active === false ? 'slate' : 'green'}>{r.active === false ? 'লুকানো' : 'সক্রিয়'}</Badge></div>) },
  ],
  fields: [
    { key: 'titleBn', label: 'শিরোনাম (বাংলা)', type: 'textarea', rows: 2, required: true, full: true },
    { key: 'titleEn', label: 'Title (English)', type: 'textarea', rows: 2, full: true },
    { key: 'bodyBn', label: 'বিস্তারিত (বাংলা, ঐচ্ছিক)', type: 'textarea', full: true },
    { key: 'bodyEn', label: 'Details (English, optional)', type: 'textarea', full: true },
    { key: 'category', label: 'ধরন', type: 'select', required: true, options: Object.entries(NOTICE_CATS) },
    { key: 'date', label: 'তারিখ', type: 'date', required: true },
    { key: 'isUrgent', label: 'জরুরি নোটিশ', type: 'checkbox' },
    { key: 'active', label: 'সক্রিয় (ছাত্ররা দেখতে পাবে)', type: 'checkbox' },
  ],
};

export default function AdminNoticesPage() {
  return <ResourceManager config={config} />;
}