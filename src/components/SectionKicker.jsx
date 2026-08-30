import Reveal from './Reveal';

export default function SectionKicker({ kicker, title, sub, align = 'center' }) {
  const alignCls =
    align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center';
  return (
    <div className={`flex flex-col ${alignCls} gap-2 mb-12 sm:mb-16`}>
      <Reveal y={18}>
        <span
          className="text-xs uppercase tracking-[0.3em] flex items-center gap-3"
          style={{ fontFamily: "'Fraunces', serif", color: 'rgba(255,220,180,0.65)' }}
        >
          <span style={{ color: 'rgba(255,220,180,0.9)' }}>›</span>
          {kicker}
        </span>
      </Reveal>
      <Reveal y={24} delay={0.08}>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl uppercase leading-[1.05]"
          style={{ fontFamily: "'Fraunces', serif", color: '#fff' }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal y={20} delay={0.16}>
          <p
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
