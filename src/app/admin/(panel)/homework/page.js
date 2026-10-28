'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { StatusBadge, HW_STATUS, fmtDate } from '@/components/admin/ui';

const statusOptions = Object.entries(HW_STATUS).map(([k, v]) => [k, v[0]]);

const config = {
  resource: 'homework',
  title: 'হোমওয়ার্ক ও অ্যাসাইনমেন্ট',
  subtitle: 'ছাত্রদের জমা দেওয়া কাজ রিভিউ করুন এবং মেন্টরের মন্তব্য লিখুন।',
  searchPlaceholder: 'শিরোনাম, ছাত্রের নাম বা ইমেইল…',
  filter: { label: 'সব স্ট্যাটাস', options: statusOptions },
  canCreate: false,
  columns: [
    { key: 'createdAt', label: 'তারিখ', render: (r) => <span className="text-xs">{fmtDate(r.createdAt)}</span> },
    { key: 'studentName', label: 'ছাত্র', render: (r) => (<div><p className="font-bold text-white">{r.studentName}</p><p className="font-mono text-xs text-slate-400">{r.studentEmail}</p></div>) },
    {
      key: 'title', label: 'অ্যাসাইনমেন্ট',
      render: (r) => (
        <div className="max-w-[320px]">
          <p className="font-semibold text-slate-100">{r.title}</p>
          {r.notes && <p className="mt-0.5 line-clamp-2 text-xs text-slate-400">{r.notes}</p>}
          {r.link && <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-300 hover:underline">ফাইল খুলুন ↗</a>}
        </div>
      ),
    },
    { key: 'status', label: 'স্ট্যাটাস', render: (r) => <StatusBadge map={HW_STATUS} value={r.status || 'submitted'} /> },
  ],
  fields: [
    { key: 'status', label: 'স্ট্যাটাস', type: 'select', required: true, options: statusOptions, full: true },
    { key: 'mentorNote', label: 'মেন্টরের মন্তব্য (ছাত্র দেখতে পাবে)', type: 'textarea', rows: 4, full: true },
  ],
  defaults: { status: 'submitted' },
};

export default function AdminHomeworkPage() {
  return <ResourceManager config={config} />;
}