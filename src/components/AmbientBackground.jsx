import { useEffect, useRef } from 'react';

const ORB_SPECS = [
  { color: '195,227,244', left: '6%', top: '14%', size: '46vmax', dx: '52px', dy: '-74px', dur: 30, delay: 0 },
  { color: '220,236,194', left: '74%', top: '60%', size: '50vmax', dx: '-58px', dy: '-68px', dur: 34, delay: 4 },
  { color: '240,228,192', left: '56%', top: '6%', size: '38vmax', dx: '62px', dy: '52px', dur: 26, delay: 8 },
  { color: '220,210,242', left: '20%', top: '72%', size: '42vmax', dx: '-46px', dy: '58px', dur: 32, delay: 2 },
  { color: '243,205,214', left: '86%', top: '24%', size: '30vmax', dx: '-40px', dy: '-52px', dur: 28, delay: 6 },
];

export default function AmbientBackground({ variant = 'default', className = '' }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const subtle = variant === 'subtle';
  const orbOpacity = subtle ? 0.035 : 0.075;
  const auroraOpacity = subtle ? 0.14 : 0.3;
  const grainOpacity = subtle ? 0.02 : 0.035;

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return undefined;
    if (typeof window === 'undefined') return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = canvas.getContext('2d');
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = 0;
    let running = false;
    let last = 0;

    const makeParticle = (w, h, anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 12,
      r: 0.6 + Math.random() * (subtle ? 1.1 : 1.9),
      vy: 0.1 + Math.random() * 0.32,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.25 + Math.random() * 0.65,
      swayAmp: 6 + Math.random() * 16,
      a0: 0.08 + Math.random() * 0.2,
      tw: 0.5 + Math.random() * 1.6,
    });

    const seed = (w, h) => {
      const target = subtle ? 26 : 64;
      const count = Math.max(16, Math.min(target, Math.round((w * h) / (subtle ? 52000 : 22000))));
      particles = Array.from({ length: count }, () => makeParticle(w, h, true));
    };

    const resize = () => {
      const rect = box.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = w * scale;
      canvas.height = h * scale;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      seed(w, h);
    };

    const frame = (now) => {
      if (!running) return;
      const dt = Math.min(50, now - last) / 16.67;
      last = now;
      const w = canvas.width / scale;
      const h = canvas.height / scale;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.sway += p.swaySpeed * dt * 0.02;
        p.y -= p.vy * dt;
        p.x += Math.sin(p.sway) * p.swayAmp * dt * 0.02;
        if (p.y < -14 || p.x < -14 || p.x > w + 14) {
          const np = makeParticle(w, h, false);
          p.x = np.x;
          p.y = np.y;
          continue;
        }
        const alpha = p.a0 * (0.75 + 0.25 * Math.sin(now * 0.001 * p.tw + p.sway));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 220, 180, 0.5)';
        ctx.fillStyle = `rgba(255, 220, ${170 + Math.floor(Math.random() * 40)}, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.02 });
    io.observe(box);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [subtle]);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`ambient-bg ${className}`}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {/* Aurora sweep */}
      <div
        className="ambient-aurora"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '170vmax',
          height: '170vmax',
          marginLeft: '-85vmax',
          marginTop: '-85vmax',
          opacity: auroraOpacity,
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,220,180,0.06) 42deg, transparent 92deg, rgba(255,220,180,0.04) 180deg, transparent 232deg, rgba(255,220,180,0.06) 322deg, transparent 360deg)',
        }}
      />

      {/* Pastel orbs */}
      {ORB_SPECS.map((o, i) => (
        <div
          key={i}
          className="ambient-orb"
          style={{
            position: 'absolute',
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${o.color},${orbOpacity}) 0%, rgba(${o.color},0) 62%)`,
            filter: 'blur(40px)',
            willChange: 'transform',
            ['--dx']: o.dx,
            ['--dy']: o.dy,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}

      {/* Gold ember canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Film grain */}
      <div
        className="ambient-grain"
        style={{ position: 'absolute', inset: 0, opacity: grainOpacity, mixBlendMode: 'overlay' }}
      />
    </div>
  );
}