import { useEffect, useState } from 'react';

const PHASES = [
  { min: 0, text: 'Uploading your image…' },
  { min: 3, text: 'AI is analyzing…' },
  { min: 10, text: 'Processing pixels…' },
  { min: 20, text: 'Refining details…' },
  { min: 35, text: 'Almost there…' },
  { min: 50, text: 'Finishing up…' },
];

export default function ProcessingOverlay({ elapsed = 0 }) {
  const phase = [...PHASES].reverse().find((p) => elapsed >= p.min);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/50 backdrop-blur-[2px]">
      <div className="spinner mb-4" />
      <p className="text-white/90 text-sm font-medium">{phase?.text || 'Preparing…'}</p>
      <div className="dot-bounce flex gap-1.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '12px',
        color: 'rgba(255,255,255,0.5)',
        marginTop: '12px',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        This usually takes ~40 seconds
      </p>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '11px',
        color: 'rgba(255,220,180,0.5)',
        marginTop: '6px',
        textAlign: 'center',
      }}>
        ⚠ Don't close this tab
      </p>
    </div>
  );
}
