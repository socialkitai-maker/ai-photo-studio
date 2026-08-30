import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function HowToUpscaleImage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I upscale an image without losing quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, AI upscaling models analyze the image and generate new pixels to increase resolution while preserving crisp details, unlike traditional resizing."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="How to Upscale an Image Without Losing Quality — AI Photo Studio" 
        description="Learn how to upscale low-resolution images up to 4x using AI, maintaining perfect quality and sharpness for free." 
        canonical="/how-to/upscale-image"
        jsonLd={faqJsonLd}
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-8 text-center">
            How to Upscale an Image Without Losing Quality <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <article className="prose prose-invert prose-p:text-gray-300 prose-h2:font-['Fraunces'] prose-h2:text-[rgba(255,220,180,0.85)] max-w-none mb-12">
          <p className="text-lg">
            Traditional image resizing methods like bicubic interpolation simply stretch existing pixels, leading to blurriness and artifacts. AI upscaling takes a completely different approach, intelligently generating new detail to create crisp, high-resolution images.
          </p>
          
          <h2 className="uppercase mt-12 mb-6">Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f3cdd6] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">1</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Upload the Low-Res Image</h3>
                <p>Select your blurry or small image. Photos, anime, and digital art all work beautifully.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f3cdd6] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">2</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Select Upscale Factor</h3>
                <p>Depending on your needs, choose 2x or 4x upscaling to dramatically increase resolution.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f3cdd6] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">3</div>
              <div>
                <h3 className="text-xl uppercase mb-2">AI Enhancement</h3>
                <p>Our neural networks rebuild missing details, remove compression noise, and sharpen edges automatically.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f3cdd6] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">4</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Save High-Res Result</h3>
                <p>Download the crisp, high-resolution output ready for printing or high-DPI displays.</p>
              </div>
            </div>
          </div>

          <h2 className="uppercase mt-12 mb-6">Quality Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Avoid heavy compression:</strong> If possible, start with the least compressed version of your image.</li>
            <li><strong>Perfect for print:</strong> Use 4x upscaling to prepare small web images for physical printing.</li>
            <li><strong>Restoring old photos:</strong> Combined with upscaling, AI effectively removes noise from older digital captures.</li>
          </ul>
        </article>
        
        <div className="text-center py-12 border-t border-white/10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Enhance Your Images Now</h2>
          <Link to="/tools/upscale" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Upscale Image Free
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
