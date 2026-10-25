'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import {
  Phone, MapPin, ShieldCheck, Menu, X, Sparkles, GraduationCap, HardDrive, Flame,
  UserCircle2, ChevronDown, LogOut, LayoutDashboard,
} from 'lucide-react';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import BengalInstituteLogo from './BengalInstituteLogo';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import TopLanguageHeaderKey from './TopLanguageHeaderKey';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useSession, signOut } from '@/lib/auth-client';

const MAIN_LINKS = [
  { href: '/', key: 'nav_home' },
  { href: '/courses', key: 'nav_courses' },
  { href: '/teachers', key: 'nav_teachers' },
  { href: '/roadmap', key: 'nav_roadmap', badge: 'AI' },
  { href: '/campus', key: 'nav_campus' },
  { href: '/verify', key: 'nav_verify' },
  { href: '#contact', key: 'nav_contact' },
];

const MORE_LINKS = [
  { href: '/analytics', key: 'nav_analytics' },
  { href: '/ai-studio', key: 'nav_studio' },
  { href: '/drive', key: 'nav_drive' },
  { href: '/firecrawl', label: 'Firecrawl Agent' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const isBn = language === 'bn';

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : href.startsWith('/') && pathname.startsWith(href));
  const linkCls = (href) =>
    `text-sm font-medium whitespace-nowrap transition-colors hover:text-emerald-400 ${
      isActive(href) ? 'text-emerald-400' : 'text-slate-300'
    }`;

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const renderUserMenu = () => (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button size="sm" variant="flat" className="bg-blue-600/90 text-white font-bold" startContent={
          user?.image ? <Avatar src={user.image} className="w-5 h-5" /> : <UserCircle2 className="w-4 h-4" />
        }>
          {user.name?.split(' ')[0] || (isBn ? 'শিক্ষার্থী' : 'Student')}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" onAction={(k) => (k === 'logout' ? handleLogout() : router.push(String(k)))}>
        <DropdownItem key="/student" startContent={<LayoutDashboard className="w-4 h-4" />}>
          {isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
        </DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger" startContent={<LogOut className="w-4 h-4" />}>
          {t('btn_logout')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <TopLanguageHeaderKey />

      {/* Utility bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-3 sm:px-4 py-1.5 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('top_bteb_code')}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{t('top_location')}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="flex items-center gap-1.5 bg-slate-950/90 py-0.5 px-2 rounded-full border border-emerald-500/40">
              <span className="text-[10px] text-slate-400 hidden xs:inline font-medium">{isBn ? 'ভাষা:' : 'Language:'}</span>
              <LanguageToggle variant="pill" />
            </div>
            <div className="hidden xs:flex items-center gap-1.5 bg-slate-950/90 py-0.5 px-2 rounded-full border border-amber-500/40">
              <span className="text-[10px] text-slate-400 hidden sm:inline font-medium">{isBn ? 'থিম:' : 'Theme:'}</span>
              <ThemeToggle variant="pill" />
            </div>
            <a href={`tel:${INSTITUTE_INFO.phone1}`} className="hidden sm:flex items-center gap-1 text-white hover:text-emerald-400 font-bold">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{INSTITUTE_INFO.phone1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 min-h-[4.5rem] sm:min-h-[5.5rem] py-2">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 group shrink-0 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <BtebLogo className="h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              <GovRegLogo className="h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-black text-white group-hover:text-emerald-400 transition-colors leading-tight truncate">
                {isBn ? INSTITUTE_INFO.nameBn : INSTITUTE_INFO.nameEn}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold mt-0.5">
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {isBn ? `BTEB কোড: ${INSTITUTE_INFO.btebCode}` : `BTEB Code: ${INSTITUTE_INFO.btebCode}`}
                </span>
                <span className="hidden sm:inline text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                  {isBn ? 'গভঃ রেজি: ১৬৫৪৪১' : 'Govt Reg: 165441'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden xl:flex items-center gap-4" aria-label="Main">
            {MAIN_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkCls(l.href)} flex items-center gap-1`}>
                {t(l.key)}
                {l.badge && <span className="px-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">{l.badge}</span>}
              </Link>
            ))}
            <Dropdown>
              <DropdownTrigger>
                <button type="button" className="text-sm font-medium text-slate-300 hover:text-emerald-400 flex items-center gap-1 cursor-pointer">
                  <span>{t('nav_more')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="More" onAction={(k) => router.push(String(k))}>
                {MORE_LINKS.map((l) => (
                  <DropdownItem
                    key={l.href}
                    startContent={
                      l.href === '/ai-studio' ? <Sparkles className="w-4 h-4 text-emerald-500" /> :
                      l.href === '/drive' ? <HardDrive className="w-4 h-4 text-amber-500" /> :
                      l.href === '/firecrawl' ? <Flame className="w-4 h-4 text-orange-500" /> : null
                    }
                  >
                    {l.key ? t(l.key) : l.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </nav>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="hidden lg:block"><ThemeToggle variant="compact" showLabel={false} /></div>
            {user ? renderUserMenu() : (
              <Button as={Link} href="/login" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold" startContent={<UserCircle2 className="w-4 h-4" />}>
                {t('btn_login')}
              </Button>
            )}
            <Button as={Link} href="/admission" size="sm" className="bg-emerald-500 text-slate-950 font-bold" startContent={<GraduationCap className="w-4 h-4" />}>
              {t('btn_admission')}
            </Button>
            <div className="hidden 2xl:flex pl-3 border-l border-slate-800 items-center">
              <BengalInstituteLogo size="md" className="h-14 w-auto" />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <Link
              href={user ? '/student' : '/login'}
              className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center"
              aria-label={isBn ? 'ছাত্র লগইন' : 'Student login'}
            >
              {user?.image ? <img src={user.image} alt="" className="w-5 h-5 rounded-full" /> : <UserCircle2 className="w-5 h-5" />}
            </Link>
            <Link href="/admission" className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs">
              {t('btn_admission')}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {open && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 max-h-[75vh] overflow-y-auto">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/40 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate">
                {user ? user.name : isBn ? 'ছাত্র-ছাত্রী পোর্টাল' : 'Student Portal'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user ? user.email : isBn ? 'লগইন করে ড্যাশবোর্ড অ্যাক্সেস করুন' : 'Sign in to access your dashboard'}
              </span>
            </div>
            {user ? (
              <button type="button" onClick={handleLogout} className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shrink-0 cursor-pointer">
                {t('btn_logout')}
              </button>
            ) : (
              <Link href="/login" className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0">
                {isBn ? 'লগইন' : 'Login'}
              </Link>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">{isBn ? 'ভাষা:' : 'Language:'}</span>
            <LanguageToggle variant="pill" />
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">{isBn ? 'থিম:' : 'Theme:'}</span>
            <ThemeToggle variant="segmented" />
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm font-medium" aria-label="Mobile">
            {[...MAIN_LINKS, ...MORE_LINKS].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`p-3 rounded-lg hover:bg-slate-900 min-h-11 flex items-center ${isActive(l.href) ? 'text-emerald-400 bg-slate-900' : 'text-slate-300'}`}
              >
                {l.key ? t(l.key) : l.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link href="/admission" className="py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm text-center">
              {t('hero_cta_admission')}
            </Link>
            <a href={`tel:${INSTITUTE_INFO.phone1}`} className="py-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-bold text-sm flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" />
              {t('btn_call')}: {INSTITUTE_INFO.phone1}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <BtebLogo className="h-12 w-12" />
              <GovRegLogo className="h-12 w-12" />
            </div>
            <BengalInstituteLogo size="sm" className="h-10 w-auto" />
          </div>
        </div>
      )}
    </header>
  );
}
