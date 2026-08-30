import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0608] border-b border-white/10">
      <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="rgba(255,220,180,0.85)" />
          </svg>
          <span className="font-['Fraunces'] text-xl uppercase tracking-wider text-white">AI Photo Studio</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-['Outfit'] uppercase text-sm">
          <Link to="/" className="text-white hover:text-[#ffddb4] transition-colors">Home</Link>
          <Link to="/tools" className="text-white hover:text-[#ffddb4] transition-colors">Tools</Link>
          <div className="group relative">
            <span className="text-white hover:text-[#ffddb4] transition-colors cursor-pointer">How-To ›</span>
            <div className="absolute top-full left-0 mt-0 w-48 bg-[#0a0608] border border-white/10 hidden group-hover:flex flex-col py-2 shadow-xl">
              <Link to="/how-to/remove-background" className="px-4 py-2 text-white hover:text-[#ffddb4] hover:bg-white/5 transition-colors">Remove Background</Link>
              <Link to="/how-to/upscale-image" className="px-4 py-2 text-white hover:text-[#ffddb4] hover:bg-white/5 transition-colors">Upscale Image</Link>
            </div>
          </div>
          <Link to="/about" className="text-white hover:text-[#ffddb4] transition-colors">About</Link>
          <Link to="/tools/bg-remove" className="ml-4 px-4 py-2 bg-[rgba(255,220,180,0.85)] text-[#0a0608] font-bold rounded-sm hover:bg-white transition-colors">
            Try Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0608] border-b border-white/10 px-4 py-4 flex flex-col gap-4 font-['Outfit'] uppercase text-sm">
          <Link to="/" className="text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/tools" className="text-white" onClick={() => setIsOpen(false)}>Tools</Link>
          <Link to="/how-to/remove-background" className="text-white" onClick={() => setIsOpen(false)}>Remove Background</Link>
          <Link to="/how-to/upscale-image" className="text-white" onClick={() => setIsOpen(false)}>Upscale Image</Link>
          <Link to="/about" className="text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/tools/bg-remove" className="inline-block text-center px-4 py-2 bg-[rgba(255,220,180,0.85)] text-[#0a0608] font-bold rounded-sm" onClick={() => setIsOpen(false)}>
            Try Free
          </Link>
        </div>
      )}
    </nav>
  );
}
