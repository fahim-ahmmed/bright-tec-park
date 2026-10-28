'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { COURSES_DATA } from '@/data/mockData';
import { StatusBadge, ADMISSION_STATUS, money, fmtDate } from '@/components/admin/ui';

const statusOptions = Object.entries(ADMISSION_STATUS).map(([k, v]) => [k, v[0]]);

const config = {
  resource: 'admissions',
  title: 'ভর্তি আবেদন',
  subtitle: 'আবেদনের স্ট্যাটাস, কোর্স প্রোগ্রেস ও ফি এখান থেকে নিয়ন্ত্রণ করুন। এনরোলড করলে ছাত্রের ড্যাশবোর্ডে সাথে সাথে দেখা যাবে।',
  searchPlaceholder: 'নাম, মোবাইল, টোকেন বা কোর্স দিয়ে খুঁজুন…',
  filter: { label: 'সব স্ট্যাটাস', options: statusOptions },
  canCreate: true,
  createLabel: 'ওয়াক-ইন ভর্তি যোগ করুন',
  defaults: { status: 'pending', courseId: COURSES_DATA[0].id, education: 'HSC Candidate', shift: 'morning', batch: '২০২৬ সেশন' },
  columns: [
    { key: 'token', label: 'টোকেন', render: (r) => <span className="font-mono text-xs text-emerald-300">{r.token}</span> },
    { key: 'fullName', label: 'শিক্ষার্থী', render: (r) => (<div><p className="font-bold text-white">{r.fullName}</p><p className="font-mono text-xs text-slate-400">{r.phone}</p></div>) },
    { key: 'courseName', label: 'কোর্স', render: (r) => <span className="line-clamp-2 max-w-[220px] text-xs">{r.courseName}</span> },
    { key: 'payableFee', label: 'প্রদেয় ফি', render: (r) => <span className="font-mono">{money(r.payableFee)}</span> },
    { key: 'status', label: 'স্ট্যাটাস', render: (r) => <StatusBadge map={ADMISSION_STATUS} value={r.status} /> },
    { key: 'createdAt', label: 'তারিখ', render: (r) => <span className="text-xs text-slate-400">{fmtDate(r.createdAt)}</span> },
  ],
  rowActions: [
    { label: 'পেমেন্ট', href: (r) => `/admin/payments?new=${encodeURIComponent(r.token)}` },
    { label: 'প্রোফাইল', href: (r) => `/admin/students?open=${encodeURIComponent(r.userId)}`, show: (r) => !!r.userId },
  ],
  fields: [
    { key: 'fullName', label: 'শিক্ষার্থীর নাম', type: 'text', required: true },
    { key: 'phone', label: 'মোবাইল নম্বর', type: 'text', required: true, placeholder: '017xxxxxxxx' },
    { key: 'email', label: 'ইমেইল (ঐচ্ছিক)', type: 'text' },
    { key: 'courseId', label: 'কোর্স', type: 'select', required: true, lockOnEdit: true, options: COURSES_DATA.map((c) => [c.id, c.titleBn]) },
    { key: 'status', label: 'স্ট্যাটাস', type: 'select', required: true, options: statusOptions },
    { key: 'payableFee', label: 'প্রদেয় ফি (৳)', type: 'number', hint: 'খালি রাখলে কোর্সের অফার ফি বসবে।' },
    { key: 'progressPercent', label: 'কোর্স প্রোগ্রেস (%)', type: 'number', onlyOn: 'edit', hint: 'খালি রাখলে নিচের মডিউল টিক থেকে হিসাব হবে।' },
    { key: 'batch', label: 'ব্যাচ', type: 'text' },
    { key: 'shift', label: 'শিফট', type: 'select', required: true, options: [['morning', 'সকাল'], ['noon', 'দুপুর'], ['afternoon', 'বিকাল'], ['evening', 'সান্ধ্যকালীন'], ['weekend', 'শুক্র-শনিবার']] },
    { key: 'education', label: 'শিক্ষাগত যোগ্যতা', type: 'select', required: true, options: [['HSC Candidate', 'এইচএসসি পরীক্ষার্থী'], ['SSC', 'এসএসসি পাস'], ['Honours/Degree', 'অনার্স / ডিগ্রি'], ['Job Holder', 'চাকরিজীবী'], ['Kids', 'স্কুল শিক্ষার্থী']] },
    { key: 'address', label: 'ঠিকানা', type: 'text', full: true },
    { key: 'completedModules', label: 'সম্পন্ন মডিউল', type: 'modules', onlyOn: 'edit', full: true },
  ],
};

export default function AdminAdmissionsPage() {
  return <ResourceManager config={config} />;
}