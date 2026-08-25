import { useEffect, useState } from 'react';

const PHASES = [
  { min: 0, text: 'Uploading your image' },
  { min: 5, text: 'AI is analyzing' },
  { min: 15, text: 'Working its magic' },
  { min: 30, text: 'Almost there' },
];

export default function ProcessingOverlay({ elapsed = 0 }) {
  const phase = [...PHASES].reverse().find((p) => elapsed >= p.min);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/50 backdrop-blur-[2px]">
      <div className="spinner mb-4" />
      <p className="text-white/90 text-sm font-medium">{phase?.text || 'Preparing'}</p>
      <div className="dot-bounce flex gap-1.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>
    </div>
  );
}
