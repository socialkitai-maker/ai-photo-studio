import { useState, useEffect } from 'react';
import { playChime } from '../utils/sound';

export default function ResultView({ result, fileName, onReset }) {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (result) playChime();
  }, []);

  const handleDownload = () => {
    if (!result || downloading) return;
    setDownloading(true);
    const a = document.createElement('a');
    a.href = result;
    a.download = fileName || 'result.png';
    a.click();
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="fade-in-up flex flex-col items-center gap-6">
      <div className="relative rounded-xl overflow-hidden">
        <img src={result} alt="Result" className="max-h-[60vh] object-contain" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <button onClick={handleDownload} className="btn-solid h-12 px-8 text-sm flex items-center gap-2.5">
          {downloading ? (
            <>
              <svg className="check-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
              Downloaded!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </>
          )}
        </button>
        <button onClick={onReset} className="btn-ghost h-11 px-6 text-sm">
          Try Another
        </button>
      </div>
    </div>
  );
}
