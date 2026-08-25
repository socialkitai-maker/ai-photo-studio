import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProcessingOverlay from '../components/ProcessingOverlay';
import ResultView from '../components/ResultView';

export default function Upscale() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const fileRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading]);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setError('File too large. Max 20MB.');
      return;
    }
    setImage(file);
    setResult(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleProcess = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    try {
      const base64 = await fileToBase64(image);
      const res = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      if (res.status === 429) {
        throw new Error('rate');
      }

      if (!res.ok) {
        throw new Error('failed');
      }

      const data = await res.json();

      if (data.status === 'done' && data.result) {
        // Convert base64 to blob URL
        const binaryStr = atob(data.result);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/png' });
        setResult(URL.createObjectURL(blob));
      } else {
        throw new Error('failed');
      }
    } catch (err) {
      setError(
        err.message === 'rate'
          ? "You're going too fast — try again in a minute."
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError('');
    setElapsed(0);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8">
        <Link to="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </Link>
        <h1 className="text-sm font-semibold text-white">4x HD Upscaler</h1>
        <div className="w-16" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {!result ? (
          <>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !loading && fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center transition-all duration-300 ${
                loading ? 'cursor-wait opacity-60' : 'cursor-pointer'
              } ${
                dragOver ? 'border-white/30 bg-white/[0.03]' : 'border-white/15 hover:border-white/25 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M11 8v6" />
                  <path d="M8 11h6" />
                </svg>
              </div>
              <p className="text-white/60 text-sm mb-2">
                {image ? image.name : 'Drag & drop an image or click to browse'}
              </p>
              <p className="text-white/30 text-xs">JPEG, PNG, WebP &middot; Max 20MB</p>
            </div>

            {image && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className={`max-h-64 rounded-xl object-contain ${loading ? 'processing-pulse' : ''}`}
                  />
                  {loading && <ProcessingOverlay elapsed={elapsed} />}
                </div>
                {!loading && (
                  <button
                    onClick={handleProcess}
                    className="btn-solid h-12 px-8 text-sm"
                  >
                    Upscale 4x
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </>
        ) : (
          <ResultView result={result} fileName="upscaled.png" onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
