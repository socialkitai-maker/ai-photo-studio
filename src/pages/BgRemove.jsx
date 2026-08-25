import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProcessingOverlay from '../components/ProcessingOverlay';
import ComparisonSlider from '../components/ComparisonSlider';
import { playChime } from '../utils/sound';

async function compositeMask(imageBase64, maskBase64) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);

      const maskImg = new Image();
      maskImg.onload = () => {
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskImg, 0, 0, img.width, img.height);
        ctx.globalCompositeOperation = 'source-over';

        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, 'image/png');
      };
      maskImg.onerror = () => reject(new Error('Failed to load mask'));
      maskImg.src = 'data:image/png;base64,' + maskBase64;
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = 'data:image/jpeg;base64,' + imageBase64;
  });
}

export default function BgRemove() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
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

  useEffect(() => {
    if (result) playChime();
  }, [result]);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setError('File too large. Max 20MB.');
      return;
    }
    setImage(file);
    setResult(null);
    setOriginalUrl(URL.createObjectURL(file));
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
      const res = await fetch('/api/bg-remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename: image.name }),
      });

      if (res.status === 429) {
        throw new Error('rate');
      }

      if (!res.ok) {
        throw new Error('failed');
      }

      const data = await res.json();

      if (data.status === 'done' && data.mask) {
        const composited = await compositeMask(data.image, data.mask);
        setResult(composited);
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
    setOriginalUrl(null);
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
        <h1 className="text-sm font-semibold text-white">Background Remover</h1>
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
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
                    Remove Background
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
          <div className="fade-in-up flex flex-col items-center gap-6">
            <ComparisonSlider
              beforeSrc={originalUrl}
              afterSrc={result}
              beforeLabel="Original"
              afterLabel="No Background"
            />
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  if (!result) return;
                  const a = document.createElement('a');
                  a.href = result;
                  a.download = 'bg-removed.png';
                  a.click();
                }}
                className="btn-solid h-12 px-8 text-sm flex items-center gap-2.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
              <button onClick={handleReset} className="btn-ghost h-11 px-6 text-sm">
                Try Another
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
