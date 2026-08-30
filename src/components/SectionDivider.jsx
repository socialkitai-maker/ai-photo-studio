import Reveal from './Reveal';

export default function SectionDivider() {
  return (
    <Reveal y={12}>
      <div className="flex items-center justify-center gap-4" aria-hidden="true">
        <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,220,180,0.5))' }} />
        <span className="text-base" style={{ color: 'rgba(255,220,180,0.9)', fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>›</span>
        <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, rgba(255,220,180,0.5), transparent)' }} />
      </div>
    </Reveal>
  );
}