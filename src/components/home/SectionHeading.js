export default function SectionHeading({ eyebrow, title, highlight, text, align = 'center', gold = false, as: Tag = 'h2' }) {
  return (
    <div className={`max-w-2xl space-y-3 mb-10 sm:mb-12 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${gold ? 'border-gold-400/30 bg-gold-400/10 text-gold-300' : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'}`}>{eyebrow}</span>}
      <Tag className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
        {title}{highlight && <> <span className={gold ? 'text-gradient-gold' : 'text-gradient-brand'}>{highlight}</span></>}
      </Tag>
      {text && <p className="text-sm sm:text-base leading-relaxed text-slate-300">{text}</p>}
    </div>
  );
}
