'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ThemeToggle({ className = '', variant = 'compact', showLabel = true }) {
  const { toggleTheme, setTheme, isDark } = useTheme();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const label = isDark ? (isBn ? 'ডার্ক' : 'Dark') : (isBn ? 'লাইট' : 'Light');
  const title = isBn
    ? isDark ? 'লাইট মোডে পরিবর্তন করুন' : 'ডার্ক মোডে পরিবর্তন করুন'
    : isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  if (variant === 'segmented' || variant === 'header-key') {
    const seg = (mode, Icon, text, active) => (
      <button
        type="button"
        onClick={() => setTheme(mode)}
        aria-pressed={active}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
          active
            ? mode === 'dark'
              ? 'bg-slate-800 text-amber-400 ring-1 ring-amber-400/40'
              : 'bg-amber-400 text-slate-950 font-black ring-1 ring-amber-500'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        {showLabel && <span>{text}</span>}
      </button>
    );
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner ${className}`} role="group" aria-label="Theme">
        {seg('dark', Moon, isBn ? 'ডার্ক' : 'Dark', isDark)}
        {seg('light', Sun, isBn ? 'লাইট' : 'Light', !isDark)}
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        title={title}
        aria-label={title}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-pointer shadow-sm ${
          isDark ? 'bg-slate-900/95 border-amber-500/40 text-amber-300' : 'bg-amber-100 border-amber-400 text-amber-900'
        } ${className}`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        {showLabel && <span className="text-[11px] font-bold">{label}</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={title}
      aria-label={title}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold border cursor-pointer shadow-sm ${
        isDark ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-500/40' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-400'
      } ${className}`}
    >
      {isDark ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-700" />}
      {showLabel && <span className="whitespace-nowrap">{isDark ? (isBn ? 'ডার্ক মোড' : 'Dark Mode') : (isBn ? 'লাইট মোড' : 'Light Mode')}</span>}
    </button>
  );
}
