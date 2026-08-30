import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ToolLayout from '../components/ToolLayout';
import ProcessingOverlay from '../components/ProcessingOverlay';
import ComparisonSlider from '../components/ComparisonSlider';
import { PageMeta } from '../hooks/usePageMeta';
import { playChime } from '../utils/sound';

const SAMPLES = [
  { url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80', label: 'Cat' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', label: 'Portrait' },
];

function maskHasAlpha(maskBase64) {
  try {
    const bytes = atob(maskBase64.slice(0, 44));
    const colorType = bytes.charCodeAt(25);
    return colorType === 4 || colorType === 6;
  } catch {
    return true;
  }
}

function luminanceToAlpha(maskImg, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(maskImg, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const px = imgData.data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = (px[i] + px[i + 1] + px[i + 2]) / 3;
    px[i] = px[i + 1] = px[i + 2] = 255;
    px[i + 3] = lum;
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

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
        const mask = maskHasAlpha(maskBase64)
          ? maskImg
          : luminanceToAlpha(maskImg, img.width, img.height);

        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(mask, 0, 0, img.width, img.height);
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

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 20 * 1024 * 1024;

export default function BgRemove() {
  const navigate = useNavigate();
  const location = useLocation();

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const fileRef = useRef(null);
  const timerRef = useRef(null);
  const retryRef = useRef(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (retryRef.current) clearInterval(retryRef.current);
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (previewUrl && previewUrl !== originalUrl) URL.revokeObjectURL(previewUrl);
      if (result) URL.revokeObjectURL(result);
    };
  }, []);

  // Accept image from another tool via navigation state
  useEffect(() => {
    if (location.state?.imageUrl) {
      fetch(location.state.imageUrl)
        .then(r => r.blob())
        .then(blob => {
          const file = new File([blob], 'from-upscaler.png', { type: blob.type || 'image/png' });
          handleFile(file);
        })
        .catch(() => {});
    }
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

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!VALID_TYPES.includes(file.type)) {
      setError('Invalid file type. Please use JPEG, PNG, or WebP.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('File too large. Maximum size is 20MB.');
      return;
    }
    // Cleanup old URLs
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (previewUrl && previewUrl !== originalUrl) URL.revokeObjectURL(previewUrl);
    if (result) URL.revokeObjectURL(result);

    const url = URL.createObjectURL(file);
    setImage(file);
    setResult(null);
    setOriginalUrl(url);
    setPreviewUrl(url);
    setError('');
  }, [originalUrl, previewUrl, result]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) handleFile(file);
        return;
      }
    }
  };

  const handleSample = async (url) => {
    setError('');
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' });
      handleFile(file);
    } catch {
      setError('Failed to load sample image.');
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const startRetryCountdown = (seconds) => {
    setRetryCountdown(seconds);
    if (retryRef.current) clearInterval(retryRef.current);
    retryRef.current = setInterval(() => {
      setRetryCountdown(prev => {
        if (prev <= 1) {
          clearInterval(retryRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleProcess = async () => {
    if (!image || retryCountdown > 0) return;
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
        const retryAfter = parseInt(res.headers.get('Retry-After') || '60', 10);
        startRetryCountdown(retryAfter);
        throw new Error('rate');
      }

      if (!res.ok) {
        let msg = 'failed';
        try {
          const d = await res.json();
          if (d.error) msg = d.error;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();

      if (data.status === 'done' && data.mask) {
        const composited = await compositeMask(data.image, data.mask);
        setResult(composited);
      } else {
        throw new Error('failed');
      }
    } catch (err) {
      if (err.message !== 'rate') {
        setError(
          err.message && err.message !== 'failed'
            ? err.message
            : 'Something went wrong. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (previewUrl && previewUrl !== originalUrl) URL.revokeObjectURL(previewUrl);
    if (result) URL.revokeObjectURL(result);
    setImage(null);
    setResult(null);
    setOriginalUrl(null);
    setPreviewUrl(null);
    setError('');
    setElapsed(0);
  };

  const handleCrossTool = () => {
    navigate('/tools/upscale', { state: { imageUrl: result } });
  };

  return (
    <ToolLayout title="Background Remover" otherToolName="Upscale 4x" otherToolLink="/tools/upscale">
      <PageMeta
        title="Background Remover — Remove Image Background Online Free, No Signup"
        description="Remove the background from any image online for free in seconds. AI background remover for JPG, PNG & WebP — instant transparent PNG download, no signup."
        canonical="/tools/bg-remove"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Photo Studio — Background Remover',
            url: 'https://aiphotostudio.vercel.app/tools/bg-remove',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            featureList: [
              'Remove image background with AI',
              'Free unlimited background removal',
              'Transparent PNG output',
              'No signup required',
              'JPG, PNG and WebP support',
            ],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aiphotostudio.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: 'Background Remover', item: 'https://aiphotostudio.vercel.app/tools/bg-remove' },
            ],
          },
        ]}
      />

      <div onPaste={handlePaste}>
        {!result ? (
          <>
            {/* Upload area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !loading && fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center transition-all duration-300 ${
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
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
                {image ? image.name : 'Drag & drop, click to browse, or paste from clipboard'}
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                JPEG, PNG, WebP · Max 20MB
              </p>
            </div>

            {/* Try a sample */}
            {!image && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Or try a sample
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {SAMPLES.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSample(s.url)}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#1a1a1a',
                        padding: 0,
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,220,180,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                    >
                      <img src={s.url} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview + process button */}
            {image && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={`max-h-64 rounded-xl object-contain ${loading ? 'processing-pulse' : ''}`}
                  />
                  {loading && <ProcessingOverlay elapsed={elapsed} />}
                </div>
                {!loading && (
                  <button
                    onClick={handleProcess}
                    disabled={retryCountdown > 0}
                    className="btn-solid h-12 px-8 text-sm"
                    style={retryCountdown > 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    {retryCountdown > 0 ? `Try again in ${retryCountdown}s` : 'Remove Background'}
                  </button>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Rate limit countdown */}
            {retryCountdown > 0 && !error && (
              <div className="mt-4 p-3 rounded-xl border text-sm text-center" style={{ borderColor: 'rgba(255,220,180,0.2)', background: 'rgba(255,220,180,0.05)', color: 'rgba(255,220,180,0.8)' }}>
                Rate limited — try again in {retryCountdown}s
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
              checkerboard
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
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={handleReset} className="btn-ghost h-11 px-6 text-sm">
                  Try Another
                </button>
                <button
                  onClick={handleCrossTool}
                  className="btn-ghost h-11 px-6 text-sm"
                  style={{ borderColor: 'rgba(255,220,180,0.3)', color: 'rgba(255,220,180,0.85)' }}
                >
                  Upscale this result →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
