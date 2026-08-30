import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="About AI Photo Studio — Free Background Remover & Image Upscaler" 
        description="AI Photo Studio offers free, no-signup AI photo tools: remove image backgrounds and upscale photos to 4x. Privacy-first, no watermarks, unlimited." 
        canonical="/about" 
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-4xl md:text-5xl uppercase mb-12 text-center">
            About Us <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <div className="space-y-12">
          <section className="border border-white/10 p-8 bg-white/5">
            <h2 className="font-['Fraunces'] text-2xl uppercase mb-4 text-[rgba(255,220,180,0.85)]">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At AI Photo Studio, we believe that professional-grade image editing shouldn't be locked behind expensive subscriptions or require years of technical expertise. Our mission is to make powerful AI photo tools accessible to everyone, everywhere, completely free of charge.
            </p>
          </section>
          
          <section>
            <h2 className="font-['Fraunces'] text-2xl uppercase mb-6 border-b border-white/10 pb-2">The Technology</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We leverage state-of-the-art machine learning models to provide incredibly accurate results in seconds. Whether it's identifying complex foreground subjects for background removal or hallucinating realistic details for image upscaling, our AI pipeline does the heavy lifting so you don't have to.
            </p>
          </section>
          
          <section>
            <h2 className="font-['Fraunces'] text-2xl uppercase mb-6 border-b border-white/10 pb-2">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="uppercase text-[#c3e3f4] mb-2 font-bold">Always Free</h3>
                <p className="text-sm text-gray-400">No paywalls, no credits, no premium tiers. Just free tools.</p>
              </div>
              <div>
                <h3 className="uppercase text-[#dcedc2] mb-2 font-bold">Frictionless</h3>
                <p className="text-sm text-gray-400">No account creation required. Drop your image and get to work.</p>
              </div>
              <div>
                <h3 className="uppercase text-[#f3cdd6] mb-2 font-bold">Privacy First</h3>
                <p className="text-sm text-gray-400">Your images belong to you. We delete them immediately after processing.</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/tools" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Explore Our Tools
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
