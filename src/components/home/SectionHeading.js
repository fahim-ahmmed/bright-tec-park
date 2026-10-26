export default function SectionHeading({ eyebrow, title, highlight, text, align = 'center', gold = false, as: Tag = 'h2', className = '' }) {
  const accent = gold ? 'text-gold-400' : 'text-emerald-400';
  const center = align === 'center';
  return (
    <div className={`mb-10 max-w-2xl sm:mb-12 ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={`mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-wide ${accent}`}>
          <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
          {eyebrow}
          {center && <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />}
        </div>
      )}
      <Tag className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        {title}
        {highlight && <> <span className={accent}>{highlight}</span></>}
      </Tag>
      {text && <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{text}</p>}
    </div>
  );
}