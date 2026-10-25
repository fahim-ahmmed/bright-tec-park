'use client';
import { Globe2, ArrowLeftRight, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';

export default function TopLanguageHeaderKey() {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const isBn = language === 'bn';

  const keyBtn = (lang, flag, label) => (
    <button
      type="button"
      onClick={() => setLanguage(lang)}
      aria-pressed={language === lang}
      title={lang === 'bn' ? 'বাংলা ভাষায় পড়ুন' : 'Read in English'}
      className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black cursor-pointer ${
        language === lang
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50'
          : 'text-slate-300 hover:text-white hover:bg-slate-800'
      }`}
    >
      <span className="text-sm" aria-hidden="true">{flag}</span>
      <span>{label}</span>
      {language === lang && <Check className="w-3.5 h-3.5 stroke-[3]" />}
    </button>
  );

  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-emerald-950/70 to-slate-950 border-b-2 border-emerald-500/50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden xs:flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shrink-0">
            <Globe2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-white text-xs sm:text-sm truncate">
              {isBn ? 'বাংলা টু ইংরেজি সুইচ কি' : 'Bengali to English Switch Key'}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300 hidden md:block">
              {isBn
                ? 'ওয়েবসাইটের সকল তথ্য বাংলা ও ইংরেজি উভয় ভাষায় পড়ুন'
                : 'Read all website details in either Bengali or English'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border-2 border-emerald-500/60 shadow-lg" role="group" aria-label="Language">
            {keyBtn('bn', '🇧🇩', 'বাংলা')}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-1.5 mx-0.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-md cursor-pointer"
              title={isBn ? 'Switch to English' : 'বাংলা করুন'}
              aria-label="Toggle language"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
            {keyBtn('en', '🇬🇧', 'English')}
          </div>
          <div className="hidden sm:block">
            <ThemeToggle variant="header-key" />
          </div>
        </div>
      </div>
    </div>
  );
}
