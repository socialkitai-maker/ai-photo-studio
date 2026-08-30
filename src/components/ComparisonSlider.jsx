import { useState, useRef, useCallback } from 'react';

export default function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Original',
  afterLabel = 'Result',
  checkerboard = false,
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    updatePos(e.clientX);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerMove = (e) => {
    if (dragging.current) updatePos(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[640px] overflow-hidden rounded-2xl select-none touch-none"
      style={{ aspectRatio: '4 / 3' }}
    >
      {/* Checkerboard background for transparent images */}
      {checkerboard && (
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-conic-gradient(#404040 0% 25%, #505050 0% 50%) 0 0 / 20px 20px',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* After image (full, behind) */}
      <img
        src={afterSrc}
        alt="After"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {/* Checkerboard behind before image too if needed */}
        {checkerboard && (
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-conic-gradient(#404040 0% 25%, #505050 0% 50%) 0 0 / 20px 20px',
            }}
          />
        )}
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none z-10"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-ew-resize"
        style={{ left: `${pos}%` }}
        onPointerDown={onPointerDown}
      >
        <div className="w-10 h-10 rounded-full bg-white/90 border border-white/50 shadow-lg flex items-center justify-center backdrop-blur-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 18L2 12l6-6" />
            <path d="M16 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white/80 backdrop-blur-sm border border-white/10">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white/80 backdrop-blur-sm border border-white/10">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
