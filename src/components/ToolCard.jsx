import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ToolCard({ icon, title, description, to, gradient, color, index = 0 }) {
  const ref = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 150, damping: 22, mass: 0.5 });

  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);

  const glowX = useTransform(sx, [0, 1], ['-500px', '500px']);
  const glowY = useTransform(sy, [0, 1], ['-500px', '500px']);

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
    <motion.div
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl group"
      >
        <Link
          to={to}
          className="relative flex flex-col items-start gap-5 no-underline h-full p-8 sm:p-10 tool-card-dark"
          style={{ borderColor: 'rgba(255,255,255,0.08)', minHeight: '260px' }}
        >
          <motion.div
            className="pointer-events-none absolute w-[1000px] h-[1000px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              left: glowX,
              top: glowY,
              background: color
                ? `radial-gradient(circle, ${color}22 0%, transparent 60%)`
                : 'radial-gradient(circle, rgba(255,220,180,0.18) 0%, transparent 60%)',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {color && (
            <motion.div
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{ backgroundColor: color, transform: 'translateZ(20px)' }}
            />
          )}

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              backgroundColor: color ? `${color}20` : 'rgba(255,255,255,0.04)',
              color,
              transform: 'translateZ(40px)',
            }}
          >
            {icon}
          </div>

          <div style={{ transform: 'translateZ(30px)' }}>
            <h3
              className="text-xl text-white mb-3 uppercase"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.62)' }}
            >
              {description}
            </p>
          </div>

          <span
            className="text-sm mt-2 flex items-center gap-2"
            style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,220,180,0.9)', transform: 'translateZ(26px)' }}
          >
            Try Now
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
