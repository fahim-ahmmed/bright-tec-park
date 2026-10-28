'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { Badge } from '@/components/admin/ui';

const config = {
  resource: 'certificates',
  title: 'সনদ ও মার্কশিট',
  subtitle: 'এখানে সনদ যোগ করলে /verify পেজে যাচাই করা যাবে। ছাত্রের লগইন ইমেইল দিলে তার পোর্টালেও সনদ দেখাবে।',
  searchPlaceholder: 'সনদ আইডি, নাম, রোল বা রেজিস্ট্রেশন নম্বর…',
  canCreate: true,
  createLabel: 'নতুন সনদ যোগ করুন',
  columns: [
    { key: 'certificateId', label: 'সনদ আইডি', render: (r) => <span className="font-mono text-xs text-emerald-300">{r.certificateId}</span> },
    { key: 'studentName', label: 'শিক্ষার্থী', render: (r) => (<div><p className="font-bold text-white">{r.studentName}</p>{r.studentEmail && <p className="font-mono text-xs text-slate-400">{r.studentEmail}</p>}</div>) },
    { key: 'courseNameBn', label: 'কোর্স', render: (r) => <span className="line-clamp-2 max-w-[240px] text-xs">{r.courseNameBn}</span> },
    { key: 'cgpa', label: 'গ্রেড', render: (r) => <Badge tone="gold">{r.cgpa || r.grade || '—'}</Badge> },
    { key: 'issueDate', label: 'ইস্যু', render: (r) => <span className="text-xs">{r.issueDate || '—'}</span> },
  ],
  fields: [
    { key: 'certificateId', label: 'সার্টিফিকেট আইডি', type: 'text', required: true, lockOnEdit: true, placeholder: 'BCTI-2026-010' },
    { key: 'studentName', label: 'শিক্ষার্থীর নাম', type: 'text', required: true },
    { key: 'fatherName', label: 'পিতার নাম', type: 'text' },
    { key: 'studentEmail', label: 'ছাত্রের লগইন ইমেইল (পোর্টালে দেখাতে)', type: 'text' },
    { key: 'courseNameBn', label: 'কোর্সের নাম (বাংলা)', type: 'text', required: true, full: true },
    { key: 'courseNameEn', label: 'Course name (English)', type: 'text', full: true },
    { key: 'btebRoll', label: 'BTEB রোল নম্বর', type: 'text' },
    { key: 'regNo', label: 'রেজিস্ট্রেশন নম্বর', type: 'text' },
    { key: 'session', label: 'সেশন', type: 'text', placeholder: 'জানুয়ারি - জুন ২০২৬' },
    { key: 'grade', label: 'গ্রেড', type: 'text', placeholder: 'A+' },
    { key: 'cgpa', label: 'CGPA / গ্রেড বিবরণ', type: 'text', placeholder: '4.00 (A+)' },
    { key: 'issueDate', label: 'ইস্যুর তারিখ', type: 'text', placeholder: '১৫ জুলাই, ২০২৬' },
  ],
};

export default function AdminCertificatesPage() {
  return <ResourceManager config={config} />;
}