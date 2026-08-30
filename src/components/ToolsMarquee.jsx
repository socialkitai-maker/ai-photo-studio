import { motion } from 'framer-motion';

const items = [
  { icon: '✂️', label: 'Background Remover' },
  { icon: '🔍', label: '4x HD Upscaler' },
  { icon: '🧹', label: 'Clean Edges' },
  { icon: '🎨', label: 'AI Image Gen' },
  { icon: '✨', label: 'Retouch' },
  { icon: '⚙️', label: 'Free & Unlimited' },
];

function Row({ reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2 w-full">
      <motion.div
        className="flex w-max gap-4"
        style={{ willChange: 'transform' }}
        animate={{ x: reverse ? ['0%', '50%'] : ['-50%', '0%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 24 }}
      >
        {doubled.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2 rounded-full whitespace-nowrap"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span className="text-lg">{it.icon}</span>
            <span
              className="text-xs uppercase tracking-[0.16em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.65)' }}
            >
              {it.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ToolsMarquee() {
  return (
    <section className="py-10 sm:py-14 overflow-hidden">
      <Row reverse={false} />
    </section>
  );
}
