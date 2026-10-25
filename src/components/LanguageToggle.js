'use client';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle({ className = '', variant = 'pill' }) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
          language === 'bn'
            ? 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border-emerald-500/40'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 shadow-md'
        } ${className}`}
        title={language === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় পড়ুন'}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
      </button>
    );
  }

  const btn = (lang, label) => (
    <button
      type="button"
      onClick={() => setLanguage(lang)}
      aria-pressed={language === lang}
      className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
        language === lang ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`inline-flex items-center p-0.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner ${className}`} role="group" aria-label="Language">
      {btn('bn', 'বাংলা')}
      {btn('en', 'English')}
    </div>
  );
}
