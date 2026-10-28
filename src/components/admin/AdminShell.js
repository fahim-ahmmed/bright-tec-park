'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ClipboardList, Users, Wallet, Bell, ClipboardCheck, Award, Mail, LogOut, Menu, X, ExternalLink, ShieldCheck } from 'lucide-react';
import BengalInstituteLogo from '../BengalInstituteLogo';

const NAV = [
  ['/admin', 'ড্যাশবোর্ড', LayoutDashboard],
  ['/admin/admissions', 'ভর্তি আবেদন', ClipboardList],
  ['/admin/students', 'শিক্ষার্থী', Users],
  ['/admin/payments', 'পেমেন্ট ও ফি', Wallet],
  ['/admin/notices', 'নোটিশ', Bell],
  ['/admin/homework', 'হোমওয়ার্ক', ClipboardCheck],
  ['/admin/certificates', 'সনদ', Award],
  ['/admin/newsletter', 'নিউজলেটার', Mail],
];

export default function AdminShell({ email, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const active = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-800 p-5">
        <BengalInstituteLogo size="sm" />
        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400"><ShieldCheck className="h-3.5 w-3.5" />অ্যাডমিন প্যানেল</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin">
        {NAV.map(([href, label, Icon]) => (
          <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined}
            className={`flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors ${active(href) ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <Icon className="h-4.5 w-4.5 shrink-0" />{label}
          </Link>
        ))}
      </nav>
      <div className="space-y-2 border-t border-slate-800 p-3">
        <Link href="/" target="_blank" className="flex h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white"><ExternalLink className="h-4 w-4" />ওয়েবসাইট দেখুন</Link>
        <div className="rounded-xl bg-slate-950/60 p-3">
          <p className="truncate font-mono text-[11px] text-slate-400">{email}</p>
          <button type="button" onClick={logout} className="mt-2 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-300 hover:bg-rose-500/20"><LogOut className="h-3.5 w-3.5" />লগআউট</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-800 bg-slate-900 lg:block">{sidebar}</aside>

      {/* mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 backdrop-blur lg:hidden">
        <span className="flex items-center gap-2 text-sm font-extrabold text-white"><ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />অ্যাডমিন প্যানেল</span>
        <button type="button" onClick={() => setOpen(true)} aria-label="মেনু" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-700 text-slate-200"><Menu className="h-5 w-5" /></button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button type="button" aria-label="বন্ধ করুন" onClick={() => setOpen(false)} className="absolute inset-0 cursor-pointer bg-black/60" />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-slate-800 bg-slate-900 shadow-2xl">
            <button type="button" onClick={() => setOpen(false)} aria-label="বন্ধ করুন" className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}