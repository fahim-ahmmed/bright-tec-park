'use client';
import { useState } from 'react';

// Shows the teacher photo, falling back to a monogram if the image is missing.
export default function TeacherPhoto({ src, name, className = '' }) {
  const [broken, setBroken] = useState(false);
  if (broken || !src) {
    return <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-600 to-sky-600 text-white text-4xl font-black ${className}`}>{name.slice(0, 1)}</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={name} loading="lazy" onError={() => setBroken(true)} className={`w-full h-full object-cover ${className}`} />;
}
