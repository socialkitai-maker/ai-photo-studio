import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AmbientBackground from './AmbientBackground';

function BrandMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  );
}

export default function ToolLayout({ title, otherToolName, otherToolLink, children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0608', color: '#fff', position: 'relative' }}>
      {/* Ambient atmosphere */}
      <AmbientBackground variant="subtle" />

      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Gold hairline */}
        <div className="absolute left-0 bottom-[-1px] h-px w-full pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,220,180,0.7), transparent)', opacity: 0.7 }} />
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.55)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Home
        </Link>

        {/* Center brand + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'rgba(255,220,180,0.7)' }}>
            <BrandMark size={20} />
          </span>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
            color: '#fff',
            margin: 0,
          }}>
            {title}
          </h1>
        </div>

        {/* Cross-link */}
        <Link
          to={otherToolLink}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,220,180,0.7)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,220,180,1)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,220,180,0.7)'}
        >
          <span className="hidden sm:inline">{otherToolName}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </header>

      {/* Content */}
      <motion.main
        style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 16px 64px', position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}
