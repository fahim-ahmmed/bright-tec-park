'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Counts from `start` (default 1) up to `end` when the number scrolls into view.
export default function CountUp({ end, start = 1, decimals = 0, suffix = '', duration = 2.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const { language } = useLanguage();
  const locale = language === 'bn' ? 'bn-BD' : 'en-US';
  const [val, setVal] = useState(start);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(start, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduce, start, end, duration]);

  const shown = reduce ? end : val;
  const text = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  }).format(shown);

  return <span ref={ref} className="tabular-nums">{text}{suffix}</span>;
}