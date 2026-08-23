import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import BgRemove from './pages/BgRemove';
import Upscale from './pages/Upscale';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tools/bg-remove" element={<BgRemove />} />
      <Route path="/tools/upscale" element={<Upscale />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
