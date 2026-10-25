'use client';

// Ported from PhotoArtworkViews.tsx: ComputerLabPhotoView + CertificatePhotoView.
export function ComputerLabPhotoView({ className = '' }) {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg viewBox="0 0 1000 580" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="কম্পিউটার ল্যাব">
        <defs>
          <linearGradient id="labCeil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f172a" /><stop offset="1" stopColor="#1e293b" /></linearGradient>
          <linearGradient id="labFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e293b" /><stop offset="1" stopColor="#090d16" /></linearGradient>
          <linearGradient id="labScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0369a1" /><stop offset="1" stopColor="#082f49" /></linearGradient>
        </defs>
        <rect width="1000" height="580" fill="#0a0f1d" />
        <polygon points="0,0 1000,0 900,120 100,120" fill="url(#labCeil)" />
        <line x1="120" y1="40" x2="880" y2="40" stroke="#38bdf8" strokeWidth="4" opacity=".8" />
        <line x1="150" y1="80" x2="850" y2="80" stroke="#0ea5e9" strokeWidth="3" opacity=".7" />
        <g transform="translate(680,70)"><rect width="160" height="42" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" /><line x1="10" y1="30" x2="150" y2="30" stroke="#94a3b8" strokeWidth="2" /><text x="80" y="20" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">2-TON INVERTER AC</text></g>
        <g transform="translate(250,70)"><rect width="380" height="48" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" /><text x="190" y="22" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত কম্পিউটার ল্যাব</text><text x="190" y="38" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">BTEB CODE: 27117 · 100% PRACTICAL WORKSTATIONS</text></g>
        <g transform="translate(70,90)"><rect width="90" height="380" fill="#0284c7" rx="4" /><rect x="5" y="5" width="80" height="370" fill="#0369a1" /><circle cx="45" cy="50" r="28" fill="#fff" /><circle cx="45" cy="50" r="25" fill="#0284c7" /><text x="45" y="58" fill="#fff" fontSize="22" fontWeight="900" fontStyle="italic" textAnchor="middle">hp</text><text x="45" y="110" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">TECH</text><text x="45" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">PARTNER</text></g>
        <polygon points="0,320 1000,320 1000,580 0,580" fill="url(#labFloor)" />
        <rect x="180" y="240" width="760" height="40" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        {[200, 320, 440, 560, 680, 800].map((mx) => (
          <g key={mx}><rect x={mx} y="195" width="80" height="50" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2" /><rect x={mx + 4} y="199" width="72" height="42" fill="url(#labScreen)" />
            <line x1={mx + 8} y1="208" x2={mx + 45} y2="208" stroke="#38bdf8" strokeWidth="2" /><line x1={mx + 8} y1="216" x2={mx + 60} y2="216" stroke="#4ade80" strokeWidth="2" /><line x1={mx + 8} y1="224" x2={mx + 50} y2="224" stroke="#facc15" strokeWidth="2" /></g>
        ))}
        <rect x="140" y="340" width="820" height="55" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        {[170, 330, 490, 650, 810].map((mx) => (
          <g key={mx}><rect x={mx} y="275" width="115" height="75" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" /><rect x={mx + 5} y="280" width="105" height="65" rx="2" fill="#0369a1" /><rect x={mx + 8} y="284" width="99" height="15" fill="#0284c7" /><text x={mx + 12} y="295" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">MICROSOFT 365 / BTEB</text>
            {[305, 315, 325].map((y) => <line key={y} x1={mx + 10} y1={y} x2={mx + 100} y2={y} stroke="#bae6fd" strokeWidth="1" />)}<rect x={mx + 52} y="350" width="12" height="16" fill="#334155" /><rect x={mx + 15} y="375" width="70" height="12" rx="2" fill="#1e293b" stroke="#475569" /></g>
        ))}
        {[220, 380, 540, 700, 860].map((sx, i) => (
          <g key={sx} transform={`translate(${sx},330)`}><ellipse cx="0" cy="110" rx="26" ry="10" fill="#0f172a" /><rect x="-24" y="40" width="48" height="55" rx="6" fill="#1e293b" /><path d="M -22,110 C -22,70 -18,60 0,60 C 18,60 22,70 22,110 Z" fill={i % 2 ? '#047857' : '#0369a1'} /><circle cx="0" cy="38" r="14" fill="#0f172a" /><path d="M -15,40 A 15 15 0 0 1 15,40" fill="none" stroke="#38bdf8" strokeWidth="3" /></g>
        ))}
        <g transform="translate(180,220)"><path d="M -18,170 C -18,90 -12,80 0,80 C 12,80 18,90 18,170 Z" fill="#0f172a" /><polygon points="-8,82 8,82 4,120 -4,120" fill="#f8fafc" /><polygon points="-2,82 2,82 1,115 -1,115" fill="#dc2626" /><circle cx="0" cy="55" r="18" fill="#1e293b" /><line x1="12" y1="105" x2="45" y2="90" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" /></g>
      </svg>
      <div className="absolute bottom-2 left-2 right-2 sm:right-auto bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 pointer-events-none">
        <div className="text-xs font-black text-white">আমাদের আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থী টিম</div>
        <div className="text-[10px] text-sky-400 font-medium">HP টেক পার্টনার ল্যাব · ১ জন ১টি কম্পিউটার · প্র্যাকটিক্যাল প্রশিক্ষণ</div>
      </div>
    </div>
  );
}

export function CertificatePhotoView({ className = '' }) {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="সনদপত্র হস্তান্তর">
        <defs>
          <linearGradient id="certBg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#08152c" /><stop offset="1" stopColor="#020817" /></linearGradient>
          <linearGradient id="goldF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d97706" /><stop offset=".5" stopColor="#fbbf24" /><stop offset="1" stopColor="#b45309" /></linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#certBg2)" />
        <circle cx="300" cy="180" r="160" fill="#0284c7" opacity=".15" /><circle cx="200" cy="220" r="120" fill="#10b981" opacity=".15" />
        <polygon points="50,420 550,420 500,280 100,280" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <g transform="translate(230,260) rotate(-6)"><rect width="150" height="100" rx="4" fill="#064e3b" stroke="#f59e0b" strokeWidth="2.5" /><circle cx="75" cy="40" r="20" fill="url(#goldF)" /><circle cx="75" cy="40" r="16" fill="#064e3b" /><text x="75" y="44" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">BTEB</text><rect x="30" y="68" width="90" height="3" fill="#fbbf24" /><rect x="40" y="76" width="70" height="2.5" fill="#fbbf24" /></g>
        <g transform="translate(140,290) rotate(8)"><rect width="90" height="70" rx="2" fill="#f8fafc" stroke="#cbd5e1" /><line x1="15" y1="18" x2="75" y2="18" stroke="#0284c7" strokeWidth="2.5" /><line x1="15" y1="28" x2="65" y2="28" stroke="#94a3b8" strokeWidth="1.5" /><line x1="15" y1="36" x2="70" y2="36" stroke="#94a3b8" strokeWidth="1.5" /><circle cx="68" cy="52" r="10" fill="#dc2626" opacity=".85" /></g>
        <g transform="translate(130,160)"><circle cx="30" cy="30" r="26" fill="#1e293b" /><path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0f172a" /><line x1="50" y1="85" x2="110" y2="110" stroke="#f1f5f9" strokeWidth="7" strokeLinecap="round" /></g>
        <g transform="translate(410,160)"><circle cx="30" cy="30" r="26" fill="#334155" /><path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0369a1" /><line x1="10" y1="85" x2="-45" y2="110" stroke="#f1f5f9" strokeWidth="7" strokeLinecap="round" /></g>
        <rect x="180" y="30" width="240" height="34" rx="17" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
        <text x="300" y="52" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">🎓 সরকারি BTEB সনদপত্র হস্তান্তর</text>
      </svg>
      <div className="absolute bottom-2 left-2 right-2 pointer-events-none"><div className="text-xs font-bold text-white drop-shadow">অফিসিয়াল সনদ ও কোর্স সমাপ্তির স্বীকৃতি হস্তান্তর</div></div>
    </div>
  );
}
