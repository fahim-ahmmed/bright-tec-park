'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { fmtDate } from '@/components/admin/ui';

const config = {
  resource: 'newsletter',
  title: 'নিউজলেটার সাবস্ক্রাইবার',
  subtitle: 'ওয়েবসাইটের ফুটার থেকে যারা সাবস্ক্রাইব করেছেন।',
  searchPlaceholder: 'ইমেইল খুঁজুন…',
  canCreate: false,
  canEdit: false,
  columns: [
    { key: 'email', label: 'ইমেইল', render: (r) => <span className="font-mono text-sm text-white">{r.email}</span> },
    { key: 'source', label: 'উৎস', render: (r) => <span className="text-xs text-slate-400">{r.source || '—'}</span> },
    { key: 'subscribedAt', label: 'তারিখ', render: (r) => <span className="text-xs">{fmtDate(r.subscribedAt)}</span> },
  ],
  fields: [],
};

export default function AdminNewsletterPage() {
  return <ResourceManager config={config} />;
}