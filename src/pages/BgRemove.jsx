import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function BgRemove() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

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

  const handleProcess = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', image);
      const res = await fetch('/api/bg-remove', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error(res.status === 429 ? 'rate' : 'Processing failed');
      }
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
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

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = 'bg-removed.png';
    a.click();
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError('');
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
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center cursor-pointer transition-all duration-300 ${
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
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-64 rounded-xl object-contain"
                />
                <button
                  onClick={handleProcess}
                  disabled={loading}
                  className="btn-solid h-12 px-8 text-sm disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative rounded-xl overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMjIyIi8+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==')]">
              <img src={result} alt="Result" className="max-h-[60vh] object-contain" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleDownload} className="btn-solid h-11 px-6 text-sm">
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
