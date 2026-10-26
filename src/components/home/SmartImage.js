'use client';
import { useState } from 'react';

// Photo with a graceful fallback block if the image fails to load.
export default function SmartImage({ src, alt = '', className = '', fallback = null }) {
  const [bad, setBad] = useState(false);
  if (bad || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`} role="img" aria-label={alt}>
        {fallback}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} />;
}