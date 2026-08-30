import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

function Stat({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6">
      <motion.span
        className="text-4xl sm:text-5xl"
        style={{ fontFamily: "'Fraunces', serif", color: 'rgba(255,220,180,0.9)' }}
      >
        {display}
      </motion.span>
      <span
        className="text-[11px] uppercase tracking-[0.22em] text-center"
        style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountUpStats() {
  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-6">
        <Stat value={120000} suffix="+" label="Images Processed" />
        <span className="hidden sm:block w-px h-12" style={{ background: 'rgba(255,220,180,0.2)' }} />
        <Stat value={28} suffix="ms" label="Avg. Processing" />
        <span className="hidden sm:block w-px h-12" style={{ background: 'rgba(255,220,180,0.2)' }} />
        <Stat value={0} suffix="₹" label="Always Free" />
        <span className="hidden sm:block w-px h-12" style={{ background: 'rgba(255,220,180,0.2)' }} />
        <Stat value={100} suffix="%" label="No Signup" />
      </div>
    </section>
  );
}
