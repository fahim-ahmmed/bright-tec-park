'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight, Building2, ExternalLink } from 'lucide-react';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import BengalInstituteLogo from './BengalInstituteLogo';
import NewsletterSubscription from './NewsletterSubscription';
import { INSTITUTE_INFO, COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  const quick = [
    { href: '/', label: t('nav_home') },
    { href: '/courses', label: t('nav_courses') },
    { href: '/teachers', label: t('nav_teachers') },
    { href: '/analytics', label: isBn ? 'কোর্স অ্যানালিটিক্স ও প্লেসমেন্ট' : 'Course Analytics & Placement' },
    { href: '/roadmap', label: isBn ? '১০ দিনের এআই রোডম্যাপ' : '10-Day AI Roadmap' },
    { href: '/campus', label: t('nav_campus') },
    { href: '/drive', label: t('nav_drive'), accent: true },
    { href: '/verify', label: t('nav_verify') },
    { href: '/admission', label: t('btn_admission'), strong: true },
  ];

  const topPrograms = ['office-app', 'ai-prompt-freelancing', 'hsc-ict', 'cyber-security', 'graphic-design', 'kids-computer-coding']
    .map((id) => COURSES_DATA.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <NewsletterSubscription />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <BengalInstituteLogo size="md" className="h-12 w-auto" />
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <BtebLogo className="h-10 w-10" />
                <GovRegLogo className="h-10 w-10" />
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t('footer_about_desc')}</p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isBn ? `BTEB কোড: ${INSTITUTE_INFO.btebCode}` : `BTEB Code: ${INSTITUTE_INFO.btebCode}`}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isBn ? INSTITUTE_INFO.btebName : 'Approved by Bangladesh Technical Education Board'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t('footer_quick_links')}</h4>
            <ul className="space-y-2">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`flex items-center gap-1 hover:text-emerald-400 transition-colors ${l.accent ? 'text-amber-300' : ''} ${l.strong ? 'text-emerald-400 font-semibold' : ''}`}
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-500 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{isBn ? 'শীর্ষ কোর্সসমূহ' : 'Top Programs'}</h4>
            <ul className="space-y-2">
              {topPrograms.map((c) => (
                <li key={c.id}>
                  <Link href={`/courses/${c.id}`} className="hover:text-emerald-400 transition-colors">
                    {isBn ? c.titleBn : c.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              {t('footer_contact_info')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href={INSTITUTE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-emerald-300 group">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {isBn ? INSTITUTE_INFO.addressBn : INSTITUTE_INFO.addressEn}
                  <ExternalLink className="inline w-3 h-3 text-emerald-400 ml-1 opacity-70 group-hover:opacity-100" />
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-slate-400">{isBn ? INSTITUTE_INFO.workingHoursBn : INSTITUTE_INFO.workingHoursEn}</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <a href={`tel:${INSTITUTE_INFO.phone1}`} className="flex items-center gap-2 text-white hover:text-emerald-400 font-bold">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{INSTITUTE_INFO.phone1}</span>
                </a>
                <a href={`tel:${INSTITUTE_INFO.phone2}`} className="text-slate-300 hover:text-emerald-400 font-mono ml-6 text-[11px]">{INSTITUTE_INFO.phone2}</a>
                <a href={`tel:${INSTITUTE_INFO.phone3}`} className="text-slate-300 hover:text-emerald-400 font-mono ml-6 text-[11px]">{INSTITUTE_INFO.phone3}</a>
              </div>
              <div className="flex items-center gap-2 pt-1 break-all">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${INSTITUTE_INFO.email}`} className="text-slate-300 hover:text-white">{INSTITUTE_INFO.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {isBn
              ? `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameBn} (BENGAL® INSTITUTE)। সর্বস্বত্ব সংরক্ষিত।`
              : `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameEn} (BENGAL® INSTITUTE). All Rights Reserved.`}
          </span>
          <span className="text-slate-400">
            {isBn ? 'কারিগরি শিক্ষা বোর্ড অনুমোদিত কোড: ' : 'BTEB Approved Institution Code: '}
            <strong className="text-emerald-400 font-mono">27117</strong>
            {isBn ? ' · কুষ্টিয়া-৭০০০' : ' · Kushtia-7000'}
          </span>
        </div>
      </div>
    </footer>
  );
}
