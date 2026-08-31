import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionKicker from './SectionKicker';
import AmbientBackground from './AmbientBackground';

const steps = [
  {
    number: '01',
    title: 'UPLOAD',
    color: '#c3e3f4',
    description: 'Drag & drop or click to upload any image from your device. No signup, no limits.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI PROCESSES',
    color: '#dcedc2',
    description: 'Our AI analyzes your image and processes it in seconds — clean edges, crisp detail.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'DOWNLOAD',
    color: '#f0e4c0',
    description: 'Get your processed image in high quality on transparent or upscaled backgrounds. Ready to use.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

function ProgressDot({ index, count, scrollYProgress }) {
  const background = useTransform(
    scrollYProgress,
    [index / count, index / count + 0.01],
    ['rgba(255,255,255,0.2)', 'rgba(255,220,180,0.9)']
  );
  return <motion.span className="h-1.5 rounded-full" style={{ width: 42, background }} />;
}

/* ── Desktop StepCard (unchanged) ── */
function StepCard({ step }) {
  return (
    <div
      className="relative flex flex-col items-center text-center p-8 sm:p-12 rounded-none h-full justify-center"
      style={{ borderLeft: `3px solid ${step.color}` }}
    >
      <span
        className="text-7xl sm:text-8xl leading-none mb-6"
        style={{ fontFamily: "'Fraunces', serif", color: step.color }}
      >
        {step.number}
      </span>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${step.color}1a`, color: step.color }}
      >
        {step.icon}
      </div>
      <h3
        className="text-2xl sm:text-3xl text-white mb-3 uppercase"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {step.title}
      </h3>
      <p
        className="text-sm sm:text-base max-w-sm leading-relaxed"
        style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}
      >
        {step.description}
      </p>
    </div>
  );
}

/* ── Mobile StepCard (compact vertical) ── */
function MobileStepCard({ step, index }) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center p-6 rounded-2xl"
      style={{
        borderLeft: `3px solid ${step.color}`,
        background: 'rgba(255,255,255,0.02)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="text-5xl leading-none mb-4"
        style={{ fontFamily: "'Fraunces', serif", color: step.color }}
      >
        {step.number}
      </span>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${step.color}1a`, color: step.color }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {step.icon.props.children}
        </svg>
      </div>
      <h3
        className="text-xl text-white mb-2 uppercase"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {step.title}
      </h3>
      <p
        className="text-sm leading-relaxed max-w-xs"
        style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

/* ── Hook: responsive breakpoint ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function HowItWorks() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const isMobile = useIsMobile();

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);
  const monoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* ═══════════════════════════════════
     MOBILE — vertical scroll, no pin
     ═══════════════════════════════════ */
  if (isMobile) {
    return (
      <div className="relative" style={{ background: '#0a0608' }}>
        {/* Ambient atmosphere */}
        <AmbientBackground variant="subtle" />

        {/* Section header */}
        <div className="relative z-10 pt-16 pb-4 px-6">
          <SectionKicker
            kicker="Simple in three steps"
            title="How it works"
            align="center"
          />
        </div>

        {/* Vertical cards */}
        <div className="relative z-10 flex flex-col gap-6 px-5 pb-20">
          {steps.map((step, i) => (
            <MobileStepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Minimal mobile progress — vertical dots */}
        <div className="flex items-center justify-center gap-2 pb-10">
          {steps.map((step, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full"
              style={{ width: 32, background: 'rgba(255,220,180,0.5)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     DESKTOP — pinned horizontal slider
     (original behavior, untouched)
     ═══════════════════════════════════════ */
  return (
    <div ref={trackRef} className="relative" style={{ height: '340vh' }}>
      <div className="sticky top-0 flex flex-col justify-center overflow-hidden" style={{ height: '100vh', background: '#0a0608' }}>
        {/* Ambient atmosphere */}
        <AmbientBackground variant="subtle" />

        {/* Big ghost heading behind */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: monoOpacity }}
        >
          <span
            className="uppercase whitespace-nowrap"
            style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 16vw, 14rem)', color: 'rgba(255,255,255,0.04)' }}
          >
            How it works
          </span>
        </motion.div>

        <motion.div
          className="absolute top-8 sm:top-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionKicker
            kicker="Simple in three steps"
            title="How it works"
            align="center"
          />
        </motion.div>

        {/* Horizontal slider */}
        <motion.div
          className="flex"
          style={{ x, width: '300%', position: 'relative', zIndex: 1 }}
        >
          {steps.map((step) => (
            <div key={step.number} className="w-1/3 flex-shrink-0 flex items-center justify-center px-4">
              <StepCard step={step} />
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-3">
          {steps.map((_, i) => (
            <ProgressDot key={i} index={i} count={steps.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}