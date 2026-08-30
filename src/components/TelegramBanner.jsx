import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AmbientBackground from './AmbientBackground';

export default function TelegramBanner() {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const glowX = useTransform(sx, [0, 1], ['-40%', '140%']);
  const glowY = useTransform(sy, [0, 1], ['-40%', '140%']);

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.section
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AmbientBackground variant="subtle" />
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative max-w-4xl mx-auto p-8 sm:p-14 text-center overflow-hidden tool-card-dark"
        style={{ borderColor: 'rgba(255,220,180,0.2)' }}
      >
        {/* Pulsing gold orb */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: 320,
            height: 320,
            background: 'radial-gradient(circle, rgba(255,220,180,0.16) 0%, transparent 65%)',
            animation: 'processing-pulse 4s ease-in-out infinite',
          }}
        />
        {/* Mouse-follow radial glow */}
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            left: glowX,
            top: glowY,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,220,180,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,220,180,0.1)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,220,180,0.85)">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 tracking-widest uppercase" style={{ fontFamily: "'Fraunces', serif" }}>
            MORE AI TOOLS <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>›</span> <span style={{ fontStyle: 'italic' }}>TELEGRAM</span>
          </h2>
          <p className="text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}>
            5+ powerful AI tools available for free on our Telegram bot. Background Remover, Upscaler, AI Image Generator, AI Video, and Voice Generator — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://t.me/AiBgRemover_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 text-sm flex items-center justify-center rounded-full transition-all hover:brightness-125"
              style={{
                border: '1px solid rgba(255,220,180,0.4)',
                color: 'rgba(255,220,180,0.9)',
                backgroundColor: 'rgba(255,220,180,0.06)',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Open @AiBgRemover_Bot
            </a>
            <a
              href="https://bondin.io/sycoishere"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 text-sm flex items-center justify-center rounded-full transition-all hover:brightness-125"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.7)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Support the project ☕
            </a>
            <span className="text-white/30 text-xs">Free &middot; No signup required</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}