'use client';

// Vector illustration of the campus building (ported from BuildingPhotoView in PhotoArtworkViews).
export default function CampusBuildingView({ className = '' }) {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg viewBox="0 0 1000 580" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="বেঙ্গল ইনস্টিটিউট ক্যাম্পাস ভবন">
        <defs>
          <linearGradient id="cbSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset=".45" stopColor="#bae6fd" /><stop offset="1" stopColor="#fef3c7" /></linearGradient>
          <linearGradient id="cbWall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e2e8f0" /><stop offset=".5" stopColor="#cbd5e1" /><stop offset="1" stopColor="#94a3b8" /></linearGradient>
          <linearGradient id="cbSign" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#042f2e" /><stop offset=".5" stopColor="#064e3b" /><stop offset="1" stopColor="#022c22" /></linearGradient>
          <linearGradient id="cbBank" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0369a1" /><stop offset=".5" stopColor="#0284c7" /><stop offset="1" stopColor="#075985" /></linearGradient>
        </defs>
        <rect width="1000" height="580" fill="url(#cbSky)" />
        <g fill="#fff" opacity=".85"><ellipse cx="140" cy="70" rx="90" ry="28" /><ellipse cx="780" cy="85" rx="110" ry="32" /></g>
        <g opacity=".85"><circle cx="80" cy="440" r="75" fill="#15803d" /><circle cx="890" cy="440" r="85" fill="#15803d" /></g>

        <polygon points="120,490 120,105 880,105 880,490" fill="url(#cbWall)" />
        <rect x="110" y="85" width="780" height="22" rx="3" fill="#334155" />
        <line x1="210" y1="85" x2="210" y2="35" stroke="#10b981" strokeWidth="4" /><circle cx="210" cy="35" r="5" fill="#34d399" />
        {[170, 250, 330, 410, 490, 570, 650, 730, 810].map((x) => (
          <path key={x} d={`M ${x - 28},135 Q ${x},112 ${x + 28},135 L ${x + 28},160 L ${x - 28},160 Z`} fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
        ))}
        <rect x="310" y="115" width="380" height="26" rx="4" fill="#0f172a" />
        <text x="500" y="132" fill="#f8fafc" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="2">AZIZUR RAHMAN SUPER MARKET</text>

        {/* 1st floor: Bengal Institute */}
        <rect x="125" y="165" width="750" height="160" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        {[145, 235, 715, 800].map((wx) => (
          <g key={wx}>
            <rect x={wx} y="185" width="65" height="115" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
            <rect x={wx + 3} y="188" width="59" height="109" rx="2" fill="#0369a1" opacity=".35" />
            <rect x={wx + 15} y="225" width="34" height="25" rx="2" fill="#38bdf8" />
          </g>
        ))}
        <rect x="310" y="180" width="390" height="125" rx="8" fill="url(#cbSign)" stroke="#10b981" strokeWidth="3" />
        <rect x="315" y="185" width="380" height="4" fill="#34d399" />
        <rect x="315" y="296" width="380" height="4" fill="#10b981" />
        <text x="505" y="210" fill="#fff" fontSize="17" fontWeight="bold" textAnchor="middle">বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট</text>
        <text x="505" y="240" fill="#fff" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="2">BENGAL<tspan fill="#34d399" fontSize="18">®</tspan> INSTITUTE</text>
        <text x="505" y="260" fill="#a7f3d0" fontSize="10.5" fontWeight="bold" textAnchor="middle" letterSpacing="4">LEARN · PRACTICE · ACHIEVE</text>
        <rect x="330" y="272" width="165" height="22" rx="4" fill="#047857" />
        <text x="412" y="287" fill="#fff" fontSize="9.5" fontWeight="bold" textAnchor="middle">কারিগরি শিক্ষা বোর্ড কোড: ২৭১১৭</text>
        <rect x="505" y="272" width="180" height="22" rx="11" fill="#10b981" />
        <text x="595" y="287" fill="#022c22" fontSize="11" fontWeight="900" textAnchor="middle">01782-824582</text>
        <rect x="135" y="172" width="80" height="20" rx="10" fill="#10b981" />
        <text x="175" y="186" fill="#022c22" fontSize="9.5" fontWeight="900" textAnchor="middle">১ম তলা · একাডেমি</text>

        {/* Ground floor: Janata Bank */}
        <rect x="125" y="325" width="750" height="165" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <g transform="translate(150,365)">
          <rect width="75" height="125" rx="3" fill="#1e293b" />
          <rect x="5" y="5" width="65" height="25" rx="2" fill="#10b981" />
          <text x="37" y="21" fill="#022c22" fontSize="9" fontWeight="bold" textAnchor="middle">↑ বেঙ্গল ল্যাব</text>
          <path d="M 5,120 L 70,120 L 60,65 L 15,65 Z" fill="#475569" />
        </g>
        <g transform="translate(235,345)"><rect width="105" height="32" rx="3" fill="#ea580c" /><text x="52" y="21" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">শারমীনা ক্লথ</text><rect x="5" y="36" width="95" height="105" fill="#475569" /></g>
        <g transform="translate(348,345)"><rect width="105" height="32" rx="3" fill="#b91c1c" /><text x="52" y="21" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">আবির ফ্যাশন</text><rect x="5" y="36" width="95" height="105" fill="#475569" /></g>
        <g transform="translate(465,335)">
          <rect width="280" height="52" rx="4" fill="url(#cbBank)" stroke="#bae6fd" strokeWidth="2" />
          <circle cx="28" cy="26" r="17" fill="#fff" /><circle cx="28" cy="26" r="14" fill="#0369a1" />
          <text x="28" y="31" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">JB</text>
          <text x="55" y="26" fill="#fff" fontSize="18" fontWeight="bold">জনতা ব্যাংক লিমিটেড</text>
          <text x="55" y="42" fill="#e0f2fe" fontSize="10">সিঙ্গার মোড় শাখা, কুষ্টিয়া</text>
          <rect x="15" y="58" width="250" height="95" rx="3" fill="#0f172a" />
          <rect x="20" y="62" width="115" height="87" fill="#0369a1" opacity=".3" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="140" y="62" width="115" height="87" fill="#0369a1" opacity=".3" stroke="#38bdf8" strokeWidth="1.5" />
        </g>
        <g transform="translate(755,345)"><rect width="110" height="32" rx="3" fill="#000" stroke="#facc15" strokeWidth="1.5" /><rect x="2" y="2" width="106" height="12" fill="#facc15" /><text x="55" y="11" fill="#000" fontSize="7.5" fontWeight="900" textAnchor="middle">WESTERN UNION</text><text x="55" y="26" fill="#facc15" fontSize="8.5" fontWeight="bold" textAnchor="middle">মানি ট্রান্সফার</text><rect x="5" y="36" width="100" height="105" fill="#475569" /></g>

        <rect x="0" y="490" width="1000" height="90" fill="#334155" />
        <rect x="0" y="490" width="1000" height="12" fill="#64748b" />
        <line x1="50" y1="540" x2="950" y2="540" stroke="#fff" strokeWidth="4" strokeDasharray="25 20" opacity=".6" />
        <g transform="translate(40,480)"><rect width="190" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" /><text x="95" y="22" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">সিঙ্গার মোড়, এন এস রোড</text></g>
      </svg>
      <div className="absolute bottom-2 left-2 right-2 sm:right-auto bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 pointer-events-none">
        <div className="text-xs font-black text-white">আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন)</div>
        <div className="text-[10px] text-emerald-400 font-medium">১ম তলা: বেঙ্গল ইনস্টিটিউট · নিচতলা: জনতা ব্যাংক লিমিটেড</div>
      </div>
    </div>
  );
}
