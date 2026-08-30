import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import SectionKicker from '../components/SectionKicker';
import Reveal from '../components/Reveal';

const tools = [
  {
    icon: '✂️',
    title: 'Background Remover',
    description: 'Instantly remove backgrounds from any image with pixel-perfect precision using our advanced AI.',
    to: '/tools/bg-remove',
    color: '#c3e3f4',
  },
  {
    icon: '🔍',
    title: 'Image Upscaler',
    description: 'Enhance and enlarge your photos up to 4x without losing quality. Perfect for printing and web.',
    to: '/tools/upscale',
    color: '#dcedc2',
  },
];

const features = [
  { title: '100% Free', desc: 'No hidden costs or subscriptions.' },
  { title: 'No Signup', desc: 'Start editing instantly.' },
  { title: 'Lightning Fast', desc: 'Results in seconds.' },
  { title: 'High Quality', desc: 'Professional-grade outputs.' },
  { title: 'Secure', desc: 'Images are auto-deleted.' },
  { title: 'Browser-based', desc: 'Nothing to install.' },
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col">
      <PageMeta
        title="AI Photo Tools — Free AI Image Editor"
        description="Access our suite of free AI-powered photo editing tools. Remove backgrounds or upscale images in seconds."
        canonical="/tools"
      />
      <SiteNav />

      <main className="flex-grow max-w-[1000px] w-full mx-auto px-4">
        <SectionKicker
          kicker="The studio"
          title={<>AI PHOTO <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>›</span> <span style={{ fontStyle: 'italic' }}>TOOLS</span></>}
          sub="Every tool is free, unlimited, and ready the moment you arrive."
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} index={i} />
          ))}
        </div>

        <section className="mb-16">
          <SectionKicker kicker="Why us" title="KEY FEATURES" align="center" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <div className="p-6 border border-white/5 h-full" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h3 className="uppercase mb-2" style={{ fontFamily: "'Fraunces', serif", color: 'rgba(255,220,180,0.85)' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.55)' }}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <div className="text-center mb-8">
            <Link
              to="/tools/bg-remove"
              className="inline-block px-8 py-3 uppercase font-bold tracking-widest hover:bg-white transition-colors"
              style={{ backgroundColor: 'rgba(255,220,180,0.85)', color: '#0a0608', fontFamily: "'Outfit', sans-serif" }}
            >
              Start Creating
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}