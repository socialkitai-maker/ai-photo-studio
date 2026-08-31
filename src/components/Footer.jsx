import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import AmbientBackground from './AmbientBackground';

function Magnetic({ children, strength = 10, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * (strength / 100));
    my.set((e.clientY - cy) * (strength / 100));
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-10 sm:py-14 px-4 sm:px-6"
      style={{ backgroundColor: '#0a0608', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Ambient atmosphere */}
      <AmbientBackground variant="subtle" />

      {/* Giant wordmark backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden">
        <motion.p
          className="uppercase text-center whitespace-nowrap leading-none"
          style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3.5rem, 14vw, 12rem)', color: 'rgba(255,255,255,0.03)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          AI Photo Studio
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Top row: Brand & Made in India */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <Magnetic strength={12}>
            <div className="flex items-center gap-2 text-lg" style={{ fontFamily: "'Fraunces', serif", color: 'rgba(255,220,180,0.85)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <g transform="rotate(-30 12 12)">
                  <circle cx="7.3" cy="3.2" r="1.45" />
                  <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <circle cx="16.7" cy="20.8" r="1.45" />
                </g>
              </svg>
              <span>AI Photo Studio</span>
            </div>
          </Magnetic>
          <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
            Made with intelligence in India 🇮🇳
          </p>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}>
          {[
            { to: '/about', label: 'About' },
            { to: '/privacy', label: 'Privacy' },
            { to: '/terms', label: 'Terms' },
            { to: '/faq', label: 'FAQ' },
            { to: 'https://bondin.io/sycoishere', label: 'Support', external: true },
          ].map((l) => (
            <Magnetic key={l.to} strength={8}>
              {l.external ? (
                <a href={l.to} target="_blank" rel="noopener noreferrer" className="inline-block hover:text-white transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link to={l.to} className="inline-block hover:text-white transition-colors">
                  {l.label}
                </Link>
              )}
            </Magnetic>
          ))}
        </div>

        {/* Bottom row: credit & support */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mt-4">
          <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
            Made with intelligence by <span style={{ color: 'rgba(255,220,180,0.9)' }}>syco</span>
          </p>
          <Magnetic strength={6}>
            <a
              href="https://bondin.io/sycoishere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline-offset-2 hover:underline transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,220,180,0.8)' }}
            >
              Support me &rsaquo;
            </a>
          </Magnetic>
        </div>
      </div>

    </footer>
  );
}