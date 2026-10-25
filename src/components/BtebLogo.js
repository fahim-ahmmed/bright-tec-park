'use client';

// The original BtebLogo component was not part of the uploaded source,
// so this is a clean vector BTEB-style seal (swap with your official artwork any time).
export default function BtebLogo({
  className = 'h-11 w-11',
  title = 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) অনুমোদিত - কোড ২৭১১৭',
}) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none transition-transform duration-200 hover:scale-105 ${className}`} title={title}>
      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_2px_8px_rgba(2,132,199,0.35)]" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BTEB seal">
        <defs>
          <path id="btebTopArc" d="M 80,250 A 170,170 0 0,1 420,250" fill="none" />
          <path id="btebBottomArc" d="M 70,250 A 180,180 0 0,0 430,250" fill="none" />
        </defs>
        <circle cx="250" cy="250" r="242" fill="#0c4a6e" stroke="#082f49" strokeWidth="4" />
        <circle cx="250" cy="250" r="205" fill="#ffffff" stroke="#0284c7" strokeWidth="8" />
        <circle cx="250" cy="250" r="120" fill="#0369a1" />
        <text fill="#0c4a6e" fontFamily="'Hind Siliguri', system-ui, sans-serif" fontWeight="900" fontSize="30">
          <textPath href="#btebTopArc" startOffset="50%" textAnchor="middle">বাংলাদেশ কারিগরি শিক্ষা বোর্ড</textPath>
        </text>
        <text x="250" y="238" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="64" textAnchor="middle" letterSpacing="2">BTEB</text>
        <text x="250" y="300" fill="#bae6fd" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="40" textAnchor="middle">27117</text>
        <text fill="#0c4a6e" fontFamily="'Hind Siliguri', system-ui, sans-serif" fontWeight="900" fontSize="30">
          <textPath href="#btebBottomArc" startOffset="50%" textAnchor="middle">অনুমোদিত প্রতিষ্ঠান</textPath>
        </text>
      </svg>
    </div>
  );
}
