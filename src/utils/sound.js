let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playChime() {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Two-note ascending chime — soft & pleasant
    const notes = [
      { freq: 587.33, start: 0, dur: 0.18 },   // D5
      { freq: 880.00, start: 0.12, dur: 0.22 }, // A5
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      // Gentle attack → sustain → fade out
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.12, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + dur);
    });
  } catch {
    // Web Audio not available — silently skip
  }
}
