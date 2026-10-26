'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import BtebLogo from './BtebLogo';
import GovRegLogo from './GovRegLogo';
import BengalInstituteLogo from './BengalInstituteLogo';
import NewsletterSubscription from './NewsletterSubscription';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  const quick = [
    { href: '/', label: t('nav_home') },
    { href: '/courses', label: t('nav_courses') },
    { href: '/campus', label: t('nav_campus') },
    { href: '/verify', label: t('nav_verify') },
    { href: '/student', label: isBn ? 'শিক্ষার্থী পোর্টাল' : 'Student portal' },
    { href: '/admission', label: t('btn_admission'), strong: true },
  ];

  return (
    <footer id="contact" className="mt-8 bg-slate-950 text-sm text-slate-400">
      <div className="footer-rule" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <NewsletterSubscription />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-5">
            <BengalInstituteLogo size="md" />
            <p className="max-w-md text-sm leading-relaxed text-slate-300">{t('footer_about_desc')}</p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <BtebLogo className="h-12 w-12" />
                <span className="text-[10px] font-bold text-emerald-400">BTEB: {INSTITUTE_INFO.btebCode}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <GovRegLogo className="h-12 w-12" />
                <span className="text-[10px] font-bold text-amber-300">{isBn ? 'গভঃ রেজি: ১৬৫৪৪১' : 'Govt Reg: 165441'}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-white">{t('footer_quick_links')}</h4>
            <ul className="space-y-2.5">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`group flex items-center gap-1.5 transition-colors hover:text-emerald-400 ${l.strong ? 'font-semibold text-emerald-400' : ''}`}>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-sm font-bold text-white">{t('footer_contact_info')}</h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li>
                <a href={INSTITUTE_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-emerald-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <span className="leading-relaxed">{isBn ? INSTITUTE_INFO.addressBn : INSTITUTE_INFO.addressEn}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="flex flex-wrap gap-x-3">
                  <a href={`tel:${INSTITUTE_INFO.phone1}`} className="font-semibold text-white hover:text-emerald-400">{INSTITUTE_INFO.phone1}</a>
                  <a href={`tel:${INSTITUTE_INFO.phone2}`} className="hover:text-emerald-400">{INSTITUTE_INFO.phone2}</a>
                </span>
              </li>
              <li className="flex items-center gap-3 break-all">
                <Mail className="h-4 w-4 shrink-0 text-sky-400" />
                <a href={`mailto:${INSTITUTE_INFO.email}`} className="hover:text-white">{INSTITUTE_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{isBn ? INSTITUTE_INFO.workingHoursBn : INSTITUTE_INFO.workingHoursEn}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 px-4 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>
            {isBn
              ? `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameBn}। সর্বস্বত্ব সংরক্ষিত।`
              : `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameEn}. All rights reserved.`}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            {isBn ? 'BTEB অনুমোদিত কোড: ' : 'BTEB approved code: '}
            <strong className="font-mono text-emerald-400">{INSTITUTE_INFO.btebCode}</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}