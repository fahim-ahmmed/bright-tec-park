'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Always start with 'bn' so server and first client render match (no hydration error).
  const [language, setLanguageState] = useState('bn');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bengal_language');
      if (saved === 'en' || saved === 'bn') setLanguageState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bengal_language', language);
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const setLanguage = useCallback((lang) => setLanguageState(lang), []);
  const toggleLanguage = useCallback(() => setLanguageState((p) => (p === 'bn' ? 'en' : 'bn')), []);

  const t = useCallback(
    (key, fallback) => {
      const item = translations[key];
      if (item) return item[language] || item.bn || fallback || key;
      return fallback || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
