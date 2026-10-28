'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ClipboardList, Hourglass, UserCheck, Users, Wallet, AlertCircle, ClipboardCheck, Award, Mail, Loader2 } from 'lucide-react';
import { StatusBadge, ADMISSION_STATUS, money, fmtDate } from './ui';

const tip = { background: '#111a2a', border: '1px solid #29384f', borderRadius: 12, color: '#e8edf5', fontSize: 12 };

export default function Dashboard() {
  const [d, setD] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats', { cache: 'no-store' })
      .then((r) => { if (r.status === 401) { window.location.href = '/admin/login'; return null; } return r.ok ? r.json() : Promise.reject(); })
      .then((x) => x && setD(x))
      .catch(() => setError('ড্যাশবোর্ডের তথ্য লোড করা যায়নি।'));
  }, []);

  if (error) return <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</p>;
  if (!d) return <div className="flex justify-center py-24"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>;

  const n = (v) => Number(v || 0).toLocaleString('bn-BD');
  const c = d.counts;
  const cards = [
    ['/admin/admissions', ClipboardList, 'মোট ভর্তি আবেদন', n(c.admTotal), 'text-sky-300 bg-sky-500/10'],
    ['/admin/admissions', Hourglass, 'অপেক্ষমাণ আবেদন', n(c.pending), 'text-amber-300 bg-amber-500/10'],
    ['/admin/admissions', UserCheck, 'এনরোলড শিক্ষার্থী', n(c.enrolled), 'text-emerald-300 bg-emerald-500/10'],
    ['/admin/students', Users, 'রেজিস্টার্ড অ্যাকাউন্ট', n(c.students), 'text-violet-300 bg-violet-500/10'],
    ['/admin/payments', Wallet, 'মোট আদায়', money(d.revenue), 'text-emerald-300 bg-emerald-500/10'],
    ['/admin/payments', AlertCircle, 'মোট বকেয়া', money(d.due), 'text-rose-300 bg-rose-500/10'],
    ['/admin/homework', ClipboardCheck, 'রিভিউ বাকি হোমওয়ার্ক', n(c.hwPending), 'text-gold-300 bg-gold-400/10'],
    ['/admin/newsletter', Mail, 'নিউজলেটার সাবস্ক্রাইবার', n(c.subs), 'text-sky-300 bg-sky-500/10'],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">ড্যাশবোর্ড</h1>
        <p className="mt-1 text-sm text-slate-400">ইনস্টিটিউটের সার্বিক অবস্থা এক নজরে।</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(([href, Icon, label, value, tone]) => (
          <Link key={label} href={href} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-emerald-500/40">
            <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
            <p className="font-display text-xl font-extrabold text-white sm:text-2xl">{value}</p>
            <p className="mt-0.5 text-xs text-slate-400">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ['মাসওয়ারি নতুন ভর্তি আবেদন', 'admissions', '#38bdf8'],
          ['মাসওয়ারি আদায় (৳)', 'revenue', '#34d399'],
        ].map(([title, key, color]) => (
          <section key={key} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-sm font-bold text-white">{title}</h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={d.months}>
                  <CartesianGrid stroke="#1a2638" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: '#8393ad', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#8393ad', fontSize: 11 }} allowDecimals={false} />
                  <Tooltip contentStyle={tip} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey={key} fill={color} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-sm font-bold text-white">সাম্প্রতিক ভর্তি আবেদন</h2>
          <Link href="/admin/admissions" className="text-xs font-bold text-emerald-300 hover:underline">সব দেখুন →</Link>
        </div>
        {d.recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-400">এখনও কোনো আবেদন আসেনি।</p>
        ) : (
          <ul className="divide-y divide-slate-800">
            {d.recent.map((a) => (
              <li key={a.token} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{a.fullName}</p>
                  <p className="truncate text-xs text-slate-400">{a.courseName} · <span className="font-mono">{a.token}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{fmtDate(a.createdAt)}</span>
                  <StatusBadge map={ADMISSION_STATUS} value={a.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}