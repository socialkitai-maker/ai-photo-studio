import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Landing from './pages/Landing';
import BgRemove from './pages/BgRemove';
import Upscale from './pages/Upscale';

// Lazy-loaded pages (not critical for initial load)
const Tools = lazy(() => import('./pages/Tools'));
const HowToRemoveBackground = lazy(() => import('./pages/HowToRemoveBackground'));
const HowToUpscaleImage = lazy(() => import('./pages/HowToUpscaleImage'));
const HowToRemoveGreenScreen = lazy(() => import('./pages/HowToRemoveGreenScreen'));
const HowToRemoveBackgroundProductPhotos = lazy(() => import('./pages/HowToRemoveBackgroundProductPhotos'));
const HowToUpscaleTo4k = lazy(() => import('./pages/HowToUpscaleTo4k'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Faq = lazy(() => import('./pages/Faq'));
const Admin = lazy(() => import('./pages/Admin'));

// SEO programmatic tool pages (20 landing pages)
const SeoToolPageRoute = lazy(() => import('./pages/tools/SeoToolPageRoute'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0608',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.5)',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '14px',
    }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Core pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/tools/bg-remove" element={<BgRemove />} />
        <Route path="/tools/upscale" element={<Upscale />} />

        {/* SEO pages */}
        <Route path="/tools" element={<Tools />} />
        <Route path="/how-to/remove-background" element={<HowToRemoveBackground />} />
        <Route path="/how-to/upscale-image" element={<HowToUpscaleImage />} />
        <Route path="/how-to/remove-green-screen" element={<HowToRemoveGreenScreen />} />
        <Route path="/how-to/remove-background-product-photos" element={<HowToRemoveBackgroundProductPhotos />} />
        <Route path="/how-to/upscale-to-4k" element={<HowToUpscaleTo4k />} />

        {/* Trust pages */}
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<Faq />} />

        {/* SEO programmatic tool pages — catch-all for /tools/:slug */}
        <Route path="/tools/:slug" element={<SeoToolPageRoute />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
