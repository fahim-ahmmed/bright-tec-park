'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import {
  Phone, Mail, MapPin, ShieldCheck, Menu, X, Sparkles, GraduationCap, HardDrive, Flame,
  UserCircle2, ChevronDown, LogOut, LayoutDashboard, Home, BookOpen, Users, Route, Building2,
  BarChart3, ArrowRight,
} from 'lucide-react';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import BengalInstituteLogo from './BengalInstituteLogo';
import LanguageToggle from './LanguageToggle';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useSession, signOut } from '@/lib/auth-client';

const MAIN_LINKS = [
  { href: '/', key: 'nav_home', icon: Home },
  { href: '/courses', key: 'nav_courses', icon: BookOpen },
  { href: '/teachers', key: 'nav_teachers', icon: Users },
  { href: '/roadmap', key: 'nav_roadmap', icon: Route, badge: 'AI' },
  { href: '/campus', key: 'nav_campus', icon: Building2 },
  { href: '/verify', key: 'nav_verify', icon: ShieldCheck },
  { href: '#contact', key: 'nav_contact', icon: Phone },
];

const MORE_LINKS = [
  { href: '/analytics', key: 'nav_analytics', icon: BarChart3, tone: 'text-violet-400' },
  { href: '/ai-studio', key: 'nav_studio', icon: Sparkles, tone: 'text-emerald-400' },
  { href: '/drive', key: 'nav_drive', icon: HardDrive, tone: 'text-amber-400' },
  { href: '/firecrawl', label: 'Firecrawl Agent', icon: Flame, tone: 'text-orange-400' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const isBn = language === 'bn';
  const instituteName = isBn ? INSTITUTE_INFO.nameBn : INSTITUTE_INFO.nameEn;

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll + close on Escape while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : href.startsWith('/') && pathname.startsWith(href));
  const moreActive = MORE_LINKS.some((l) => isActive(l.href));
  const label = (l) => (l.key ? t(l.key) : l.label);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  /* ---------- Desktop pill link ---------- */
  const pill = (active) =>
    `relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
      active
        ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_-6px_rgba(52,211,153,0.6)]'
        : 'border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-emerald-400/40 hover:bg-slate-800/80 hover:text-white'
    }`;

  const renderUserMenu = () => (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-3 text-[13px] font-bold text-blue-100 transition-colors hover:bg-blue-500/20"
        >
          {user?.image ? <Avatar src={user.image} className="h-5 w-5" /> : <UserCircle2 className="h-4 w-4" />}
          <span className="max-w-[90px] truncate">{user.name?.split(' ')[0] || (isBn ? 'শিক্ষার্থী' : 'Student')}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" onAction={(k) => (k === 'logout' ? handleLogout() : router.push(String(k)))}>
        <DropdownItem key="/student" startContent={<LayoutDashboard className="h-4 w-4" />}>
          {isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
        </DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger" startContent={<LogOut className="h-4 w-4" />}>
          {t('btn_logout')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <>
      {/* ================= TOP BAR (md and up, scrolls away) ================= */}
      <div className="hidden border-b border-slate-800/80 bg-slate-900/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3.5" aria-label={instituteName}>
            <BengalInstituteLogo size="md" className="shrink-0" />
            <span className="h-10 w-px shrink-0 bg-slate-700/80" aria-hidden="true" />
            <div className="min-w-0 leading-tight">
              <span className="block truncate text-xl font-black tracking-tight text-white lg:text-2xl">{instituteName}</span>
              <span className="mt-1 flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex min-w-0 items-center gap-1.5">
                  <Mail className="h-3 w-3 shrink-0 text-sky-400" />
                  <span className="truncate">{INSTITUTE_INFO.email}</span>
                </span>
                <span className="hidden items-center gap-1.5 lg:flex">
                  <Phone className="h-3 w-3 shrink-0 text-emerald-400" />
                  <span className="font-semibold text-slate-300">{INSTITUTE_INFO.phone1}</span>
                </span>
              </span>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-5 text-[12px] text-slate-300">
            <a href={INSTITUTE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
              <MapPin className="h-3.5 w-3.5 text-rose-400" />
              {isBn ? 'সিঙ্গার মোড়, কুষ্টিয়া' : 'Singer Mor, Kushtia'}
            </a>
            <Link href="/verify" className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              {isBn ? 'সনদ যাচাই' : 'Verify Certificate'}
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAIN BAR (sticky) ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 shadow-xl backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[4rem] items-center justify-between gap-3 py-2 lg:min-h-[4.75rem]">
            {/* Logos with registration numbers (name is shown in the top bar on md+, here on mobile only) */}
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3 md:items-start lg:gap-4" aria-label={instituteName}>
              <div className="flex shrink-0 flex-col items-center gap-1">
                <BtebLogo className="h-10 w-10 lg:h-12 lg:w-12" />
                <span className="hidden whitespace-nowrap text-[10px] font-bold leading-none text-emerald-400 md:block">
                  BTEB: {INSTITUTE_INFO.btebCode}
                </span>
              </div>
              <div className="hidden shrink-0 flex-col items-center gap-1 xs:flex">
                <GovRegLogo className="h-10 w-10 lg:h-12 lg:w-12" />
                <span className="hidden whitespace-nowrap text-[10px] font-bold leading-none text-amber-300 md:block">
                  {isBn ? 'গভঃ রেজি: ১৬৫৪৪১' : 'Govt Reg: 165441'}
                </span>
              </div>

              {/* Mobile-only name */}
              <div className="min-w-0 leading-tight md:hidden">
                <span className="block max-w-[150px] truncate text-[15px] font-black text-white sm:max-w-[260px]">{instituteName}</span>
                <span className="mt-1 inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  BTEB: {INSTITUTE_INFO.btebCode}
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden shrink-0 items-center gap-1.5 xl:flex" aria-label="Main">
              {MAIN_LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined} className={pill(active)}>
                    {label(l)}
                    {l.badge && (
                      <span className="rounded bg-emerald-400/20 px-1 text-[9px] font-extrabold leading-4 text-emerald-300">{l.badge}</span>
                    )}
                    {active && <span className="absolute -bottom-[5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" aria-hidden="true" />}
                  </Link>
                );
              })}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button type="button" className={`${pill(moreActive)} cursor-pointer`}>
                    {t('nav_more')}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More" onAction={(k) => router.push(String(k))}>
                  {MORE_LINKS.map((l) => (
                    <DropdownItem key={l.href} startContent={<l.icon className={`h-4 w-4 ${l.tone}`} />}>
                      {label(l)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </nav>

            {/* Desktop actions */}
            <div className="ml-auto hidden shrink-0 items-center gap-2 sm:flex xl:ml-0">
              <LanguageToggle variant="compact" className="!h-9 !rounded-xl" />
              {user ? renderUserMenu() : (
                <Link
                  href="/login"
                  title={t('btn_login')}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-blue-400/40 bg-blue-500/10 px-3 text-[13px] font-bold text-blue-100 transition-colors hover:bg-blue-500/20"
                >
                  <UserCircle2 className="h-4 w-4" />
                  <span className="hidden 2xl:inline">{t('btn_login')}</span>
                </Link>
              )}
              <Link
                href="/admission"
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-500 px-4 text-[13px] font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 transition-colors hover:bg-emerald-400"
              >
                <GraduationCap className="h-4 w-4" />
                {t('btn_admission')}
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex shrink-0 items-center gap-2 sm:hidden">
              <Link
                href={user ? '/student' : '/login'}
                aria-label={isBn ? 'ছাত্র লগইন' : 'Student login'}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/40 bg-blue-500/10 text-blue-100"
              >
                {user?.image ? <img src={user.image} alt="" className="h-6 w-6 rounded-full object-cover" /> : <UserCircle2 className="h-5 w-5" />}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:border-emerald-400/50 hover:text-white xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE / TABLET DRAWER ================= */}
        {open && (
          <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-800 bg-slate-950 shadow-2xl xl:hidden">
            <div className="mx-auto max-w-2xl space-y-4 px-4 pb-8 pt-4">
              {/* Account card */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 to-indigo-950/50 p-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-500/20 text-blue-200">
                    {user?.image ? <img src={user.image} alt="" className="h-full w-full object-cover" /> : <UserCircle2 className="h-6 w-6" />}
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-bold text-white">{user ? user.name : isBn ? 'ছাত্র-ছাত্রী পোর্টাল' : 'Student Portal'}</span>
                    <span className="block truncate text-[11px] text-slate-400">{user ? user.email : isBn ? 'লগইন করে ড্যাশবোর্ড দেখুন' : 'Sign in to open your dashboard'}</span>
                  </div>
                </div>
                {user ? (
                  <button type="button" onClick={handleLogout} className="shrink-0 cursor-pointer rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white">
                    {t('btn_logout')}
                  </button>
                ) : (
                  <Link href="/login" className="shrink-0 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white">
                    {isBn ? 'লগইন' : 'Login'}
                  </Link>
                )}
              </div>

              {/* Primary CTA */}
              <Link
                href="/admission"
                className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20"
              >
                <span className="flex items-center gap-2"><GraduationCap className="h-5 w-5" />{t('hero_cta_admission')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Navigation */}
              <nav aria-label="Mobile" className="space-y-1.5">
                {[...MAIN_LINKS, ...MORE_LINKS].map((l) => {
                  const active = isActive(l.href);
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-xl border px-3.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                          : 'border-slate-800 bg-slate-900/60 text-slate-200 active:bg-slate-800'
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-emerald-400/15' : 'bg-slate-800'}`}>
                        <Icon className={`h-4 w-4 ${active ? 'text-emerald-300' : l.tone || 'text-slate-400'}`} />
                      </span>
                      <span className="flex-1">{label(l)}</span>
                      {l.badge && <span className="rounded bg-emerald-400/20 px-1.5 text-[10px] font-extrabold text-emerald-300">{l.badge}</span>}
                      {active && <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Language */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-xs font-bold text-slate-300">{isBn ? 'ভাষা' : 'Language'}</span>
                <LanguageToggle variant="pill" />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a href={`tel:${INSTITUTE_INFO.phone1}`} className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 py-3 text-sm font-bold text-emerald-400">
                  <Phone className="h-4 w-4" />
                  {INSTITUTE_INFO.phone1}
                </a>
                <a href={INSTITUTE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 py-3 text-sm font-bold text-rose-300">
                  <MapPin className="h-4 w-4" />
                  {isBn ? 'ম্যাপে লোকেশন' : 'View on map'}
                </a>
              </div>

              {/* Brand footer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <BtebLogo className="h-11 w-11" />
                    <span className="text-[10px] font-bold text-emerald-400">BTEB: {INSTITUTE_INFO.btebCode}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <GovRegLogo className="h-11 w-11" />
                    <span className="text-[10px] font-bold text-amber-300">{isBn ? 'গভঃ রেজি: ১৬৫৪৪১' : 'Govt Reg: 165441'}</span>
                  </div>
                </div>
                <BengalInstituteLogo size="sm" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}