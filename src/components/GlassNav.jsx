import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/tools/bg-remove', label: 'Remove BG' },
  { to: '/tools/upscale', label: 'Upscale' },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 font-semibold text-[15.5px] tracking-tight text-white animate-fade-in-scale"
      style={{ animationDelay: '0.08s' }}
      aria-label="AI Photo Studio"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(-30 12 12)">
          <circle cx="7.3" cy="3.2" r="1.45" />
          <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
          <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
          <circle cx="16.7" cy="20.8" r="1.45" />
        </g>
      </svg>
      <span>
        AI Photo <span className="font-normal opacity-70">Studio</span>
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav
      className="hidden md:flex items-center gap-2 animate-fade-in-scale"
      aria-label="Primary"
      style={{ animationDelay: '0.16s' }}
    >
      {navLinks.map((link, i) => (
        <Link
          key={link.to}
          to={link.to}
          className="glass-pill px-4 h-10 flex items-center text-[13px] font-medium text-white/90 hover:text-white transition-all duration-300"
          style={{ animationDelay: `${0.16 + i * 0.12}s` }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function BurgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/16 bg-white/5 hover:bg-white/10 transition-all duration-300 z-60"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="flex flex-col items-center gap-1.5">
        <span
          className={`block w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            isOpen ? 'translate-y-[4.5px] rotate-45' : ''
          }`}
        />
        <span
          className={`block w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            isOpen ? '-translate-y-[4.5px] -rotate-45' : ''
          }`}
        />
      </div>
    </button>
  );
}

function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/42 backdrop-blur-[24px] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
      {/* Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex flex-col items-center pt-24 gap-3 px-6 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="w-full h-14 flex items-center justify-center glass rounded-[10px] text-lg font-medium text-white/90 hover:text-white transition-all"
            style={{
              transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: isOpen ? 1 : 0,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/tools/bg-remove"
          onClick={onClose}
          className="btn-solid w-full h-14 text-base mt-3"
          style={{
            transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms',
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
            opacity: isOpen ? 1 : 0,
          }}
        >
          Start for Free
        </Link>
      </div>
    </>
  );
}

export default function GlassNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Link
            to="/tools/bg-remove"
            className="btn-solid hidden md:inline-flex h-10 px-5 text-[13px] animate-fade-in-scale"
            style={{ animationDelay: '0.34s' }}
          >
            Start for Free
          </Link>
          <BurgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
