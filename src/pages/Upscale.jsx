import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ToolLayout from '../components/ToolLayout';
import ProcessingOverlay from '../components/ProcessingOverlay';
import ComparisonSlider from '../components/ComparisonSlider';
import { PageMeta } from '../hooks/usePageMeta';
import { playChime } from '../utils/sound';

const SAMPLES = [
  { url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80', label: 'Cat' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', label: 'Portrait' },
];

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 20 * 1024 * 1024;

export default function Upscale() {
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
  const [dimensions, setDimensions] = useState(null); // { origW, origH, upW, upH }
  const fileRef = useRef(null);
  const timerRef = useRef(null);
  const retryRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (retryRef.current) clearInterval(retryRef.current);
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (previewUrl && previewUrl !== originalUrl) URL.revokeObjectURL(previewUrl);
      if (result) URL.revokeObjectURL(result);
    };
  }, []);

  // Accept image from another tool
  useEffect(() => {
    if (location.state?.imageUrl) {
      fetch(location.state.imageUrl)
        .then(r => r.blob())
        .then(blob => {
          const file = new File([blob], 'from-bg-remover.png', { type: blob.type || 'image/png' });
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
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (previewUrl && previewUrl !== originalUrl) URL.revokeObjectURL(previewUrl);
    if (result) URL.revokeObjectURL(result);

    const url = URL.createObjectURL(file);
    setImage(file);
    setResult(null);
    setOriginalUrl(url);
    setPreviewUrl(url);
    setError('');
    setDimensions(null);

    // Get original dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions(prev => ({ ...prev, origW: img.naturalWidth, origH: img.naturalHeight }));
    };
    img.src = url;
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

  const prepareUpscaleImage = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 500;
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        if (Math.max(w, h) <= maxSide) {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        const ratio = maxSide / Math.max(w, h);
        const nw = Math.max(1, Math.round(w * ratio));
        const nh = Math.max(1, Math.round(h * ratio));
        const canvas = document.createElement('canvas');
        canvas.width = nw;
        canvas.height = nh;
        canvas.getContext('2d').drawImage(img, 0, 0, nw, nh);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Failed to process image'));
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.onerror = () => reject(new Error('Failed to read image'));
      img.src = URL.createObjectURL(file);
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
      const base64 = await prepareUpscaleImage(image);
      const res = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
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

      if (data.status === 'done' && data.result) {
        const binaryStr = atob(data.result);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/png' });
        const resultUrl = URL.createObjectURL(blob);
        setResult(resultUrl);

        // Get upscaled dimensions
        const upImg = new Image();
        upImg.onload = () => {
          setDimensions(prev => ({ ...prev, upW: upImg.naturalWidth, upH: upImg.naturalHeight }));
        };
        upImg.src = resultUrl;
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
    setDimensions(null);
  };

  const handleCrossTool = () => {
    navigate('/tools/bg-remove', { state: { imageUrl: result } });
  };

  return (
    <ToolLayout title="4x HD Upscaler" otherToolName="Remove BG" otherToolLink="/tools/bg-remove">
      <PageMeta
        title="Image Upscaler — Upscale Photo to 4x Free, No Quality Loss"
        description="Upscale images to 4x resolution free with AI — no quality loss, no signup. Enhance low-resolution JPG, PNG & WebP photos to crisp HD results."
        canonical="/tools/upscale"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Photo Studio — Image Upscaler',
            url: 'https://aiphotostudio.vercel.app/tools/upscale',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            featureList: [
              'Upscale images to 4x resolution with AI',
              'Free unlimited image enhancement',
              'No quality loss or pixelation',
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
              { '@type': 'ListItem', position: 2, name: 'Image Upscaler', item: 'https://aiphotostudio.vercel.app/tools/upscale' },
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M11 8v6" />
                  <path d="M8 11h6" />
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
                {dimensions?.origW && !loading && (
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {dimensions.origW} × {dimensions.origH} → {dimensions.origW * 4} × {dimensions.origH * 4}
                  </p>
                )}
                {!loading && (
                  <button
                    onClick={handleProcess}
                    disabled={retryCountdown > 0}
                    className="btn-solid h-12 px-8 text-sm"
                    style={retryCountdown > 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    {retryCountdown > 0 ? `Try again in ${retryCountdown}s` : 'Upscale 4x'}
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
              afterLabel="Upscaled 4x"
            />

            {/* Dimension info */}
            {dimensions?.origW && dimensions?.upW && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
              }}>
                <span>{dimensions.origW} × {dimensions.origH}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,220,180,0.6)" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span style={{ color: 'rgba(255,220,180,0.85)' }}>{dimensions.upW} × {dimensions.upH}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  if (!result) return;
                  const a = document.createElement('a');
                  a.href = result;
                  a.download = 'upscaled.png';
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
                  Remove BG from this →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related SEO tool pages */}
      <div style={{ marginTop: '40px', marginBottom: '60px' }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
          Popular upscale tools
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {[
            { to: '/tools/ai-image-upscaler', label: 'AI Image Upscaler' },
            { to: '/tools/upscale-image-8x', label: 'Upscale 8x' },
            { to: '/tools/upscale-image-to-8k', label: 'Upscale to 8K' },
            { to: '/tools/enhance-photo-quality', label: 'Enhance Photo Quality' },
            { to: '/tools/unblur-image', label: 'Unblur Image' },
            { to: '/tools/image-enlarger', label: 'Image Enlarger' },
            { to: '/tools/photo-enhancer', label: 'Photo Enhancer' },
            { to: '/tools/upscale-image-to-hd', label: 'Upscale to HD' },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm border border-white/15 px-3 py-1.5 hover:border-[rgba(255,220,180,0.5)] hover:text-[rgba(255,220,180,0.85)] transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
