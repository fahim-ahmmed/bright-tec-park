'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { money, fmtDate } from '@/components/admin/ui';

const today = () => new Date().toISOString().slice(0, 10);

const config = {
  resource: 'payments',
  title: 'পেমেন্ট ও ফি',
  subtitle: 'ছাত্রের টাকা জমার এন্ট্রি দিন। বাকি ফি স্বয়ংক্রিয়ভাবে হিসাব হয়ে ছাত্রের ড্যাশবোর্ডে দেখাবে।',
  searchPlaceholder: 'টোকেন, নাম বা ট্রানজেকশন আইডি…',
  canCreate: true,
  createLabel: 'নতুন পেমেন্ট এন্ট্রি',
  prefillKey: 'admissionToken',
  defaults: { method: 'নগদ', paidAt: today() },
  columns: [
    { key: 'paidAt', label: 'তারিখ', render: (r) => <span className="text-xs">{fmtDate(r.paidAt)}</span> },
    { key: 'admissionToken', label: 'টোকেন', render: (r) => <span className="font-mono text-xs text-emerald-300">{r.admissionToken}</span> },
    { key: 'studentName', label: 'শিক্ষার্থী', render: (r) => (<div><p className="font-bold text-white">{r.studentName}</p><p className="line-clamp-1 max-w-[200px] text-xs text-slate-400">{r.courseName}</p></div>) },
    { key: 'amount', label: 'পরিমাণ', render: (r) => <span className="font-mono font-extrabold text-emerald-400">{money(r.amount)}</span> },
    { key: 'method', label: 'মাধ্যম', render: (r) => (<div><p>{r.method}</p>{r.trxId && <p className="font-mono text-[11px] text-slate-400">#{r.trxId}</p>}</div>) },
  ],
  fields: [
    { key: 'admissionToken', label: 'ভর্তি টোকেন', type: 'text', required: true, lockOnEdit: true, placeholder: 'BCTI-ADM-12345', hint: 'ভর্তি আবেদন পেজ থেকে টোকেন কপি করুন।' },
    { key: 'amount', label: 'টাকার পরিমাণ (৳)', type: 'number', required: true },
    { key: 'method', label: 'পেমেন্ট মাধ্যম', type: 'select', required: true, options: [['নগদ', 'ক্যাশ'], ['বিকাশ', 'বিকাশ'], ['নগদ (অ্যাপ)', 'নগদ (অ্যাপ)'], ['রকেট', 'রকেট'], ['ব্যাংক', 'ব্যাংক']] },
    { key: 'paidAt', label: 'তারিখ', type: 'date', required: true },
    { key: 'trxId', label: 'ট্রানজেকশন আইডি (ঐচ্ছিক)', type: 'text' },
    { key: 'note', label: 'নোট (ঐচ্ছিক)', type: 'text', placeholder: 'যেমন: ১ম কিস্তি' },
  ],
};

export default function AdminPaymentsPage() {
  return <ResourceManager config={config} />;
}