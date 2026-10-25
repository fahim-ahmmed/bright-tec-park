'use client';

const SIZE = { xs: 'h-8', sm: 'h-10', md: 'h-12', lg: 'h-16', xl: 'h-24' };

export default function BengalInstituteLogo({ className = '', size = 'md', showText = true }) {
  return (
    <div
      className={`inline-flex items-center shrink-0 select-none transition-transform duration-200 hover:scale-105 ${className}`}
      title="BENGAL® INSTITUTE"
    >
      <svg
        viewBox="0 0 460 300"
        className={`${SIZE[size] || SIZE.md} w-auto drop-shadow-[0_0_12px_rgba(0,255,0,0.45)]`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Bengal Institute logo"
      >
        <defs>
          <filter id="bengalNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M 235,55 L 50,55 L 50,245 L 235,245" fill="none" stroke="#00ff00" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" filter="url(#bengalNeonGlow)" />
        <path d="M 252,78 L 68,78 L 68,268 L 252,268" fill="none" stroke="#00ff00" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" filter="url(#bengalNeonGlow)" />
        {showText && (
          <g fill="#ffffff">
            <text x="92" y="146" fontFamily="system-ui, 'Segoe UI', Roboto, sans-serif" fontWeight="900" fontSize="66" letterSpacing="3">BENGAL</text>
            <g transform="translate(415, 128)">
              <circle cx="0" cy="0" r="13" fill="none" stroke="#ffffff" strokeWidth="2.8" />
              <text x="0" y="5" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" textAnchor="middle">R</text>
            </g>
            <text x="92" y="204" fontFamily="system-ui, 'Segoe UI', Roboto, sans-serif" fontWeight="900" fontSize="58" letterSpacing="3">INSTITUTE</text>
          </g>
        )}
      </svg>
    </div>
  );
}
