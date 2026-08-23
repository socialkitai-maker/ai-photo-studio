import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlassNav from './GlassNav';
import VideoCarousel from './VideoCarousel';
import VideoSwitcher from './VideoSwitcher';

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0);

  const isDark = activeVideo === 2; // Deep Woods = index 2

  const contentStyle = useMemo(() => ({
    transition: 'color 700ms ease',
    color: isDark ? '#182C41' : undefined,
  }), [isDark]);

  const subtextStyle = useMemo(() => ({
    transition: 'color 700ms ease',
    color: isDark ? '#1a3a52' : undefined,
  }), [isDark]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background + PNG Overlay */}
      <VideoCarousel activeIndex={activeVideo} onActiveChange={setActiveVideo} />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation — always white regardless of dark mode */}
      <div className="relative z-50">
        <GlassNav />
      </div>

      {/* Hero Content — centered */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl w-full" style={contentStyle}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 py-2.5 rounded-full liquid-glass text-[13px] animate-pop-in"
            style={{ animationDelay: '0.22s', color: isDark ? '#182C41' : 'rgba(255,255,255,0.9)' }}
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 20 24"
              fill="currentColor"
              className="drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]"
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            Free &middot; Unlimited &middot; No signup required
          </div>

          {/* Headline */}
          <h1 className="font-sans font-medium text-[36px] sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[76px] leading-[1.1] tracking-[-0.045em] mb-4 sm:mb-5">
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="block animate-fade-in-mask"
                style={{ animationDelay: '0.42s' }}
              >
                Remove Backgrounds &amp;
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="block animate-fade-in-mask"
                style={{ animationDelay: '0.62s' }}
              >
                Upscale with{' '}
                <em className="font-serif italic text-[1.08em] tracking-[-0.03em] not-underline" style={{ color: isDark ? '#2a5070' : '#9a9a9a' }}>
                  Intelligence
                </em>
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-xl mb-6 sm:mb-7 animate-fade-in-up"
            style={{ ...subtextStyle, animationDelay: '0.82s', animationDuration: '1.25s' }}
          >
            Professional-quality results in seconds. No design skills needed. Upload any image and let AI do the rest.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10">
            <Link
              to="/tools/bg-remove"
              className="btn-solid h-[42px] px-6 text-[14px] animate-btn-in"
              style={{ animationDelay: '0.96s' }}
            >
              Remove Background Free
            </Link>
            <Link
              to="/tools/upscale"
              className="btn-ghost h-[42px] px-6 text-[14px] animate-slide-in-right"
              style={{ animationDelay: '1.10s' }}
            >
              Upscale 4x
            </Link>
          </div>

          {/* Video Switcher */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
            <VideoSwitcher activeIndex={activeVideo} onSelect={setActiveVideo} />
          </div>
        </div>
      </div>
    </section>
  );
}
