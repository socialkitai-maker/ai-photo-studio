import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function HowToUpscaleTo4k() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Upscale an Image to 4K Free",
      "description": "Step-by-step guide to upscale a low-resolution image to 4K quality free using AI, without pixelation.",
      "totalTime": "PT30S",
      "step": [
        { "@type": "HowToStep", "name": "Upload the low-resolution image", "text": "Upload any JPG, PNG or WebP photo you want to sharpen." },
        { "@type": "HowToStep", "name": "Upscale with AI", "text": "The AI regenerates the image at 4x resolution, adding detail instead of stretching pixels." },
        { "@type": "HowToStep", "name": "Download the 4K result", "text": "Save the crisp high-resolution image for prints or large displays for free." },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I upscale an image to 4K for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our AI upscaler increases image resolution 4x completely free with no signup and no watermarks."
          }
        },
        {
          "@type": "Question",
          "name": "Will upscaling to 4K make my image pixelated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Traditional resizing stretches pixels, but AI upscaling generates new detail, so edges stay sharp."
          }
        },
        {
          "@type": "Question",
          "name": "What can I use an upscaled 4K image for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Large prints, posters, presentations, display screens and high-resolution thumbnails, to name a few."
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta
        title="Upscale Image to 4K Free — AI Enhancer Without Quality Loss"
        description="Upscale a low-resolution image to 4K free with AI — no quality loss, no signup. Enhance JPG, PNG & WebP photos to crisp high resolution in seconds."
        canonical="/how-to/upscale-to-4k"
        jsonLd={jsonLd}
      />
      <SiteNav />

      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-8 text-center">
            Upscale Image to 4K Free <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>

        <article className="prose prose-invert prose-p:text-gray-300 prose-h2:font-['Fraunces'] prose-h2:text-[rgba(255,220,180,0.85)] max-w-none mb-12">
          <p className="text-lg">
            Have a small, soft photo that needs to look sharp on a big screen or a print? Traditional resizing just stretches the
            pixels into blur. Our <strong>free AI image upscaler</strong> rebuilds the image at <strong>4K resolution</strong>, adding
            real detail — so it looks crisp instead of pixelated.
          </p>

          <h2 className="uppercase mt-12 mb-6">Step-by-Step Guide</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">1</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Upload the Low-Resolution Image</h3>
                <p>Drag & drop a JPG, PNG or WebP (up to 10MB). No signup, unlimited images.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">2</div>
              <div>
                <h3 className="text-xl uppercase mb-2">AI Upscales to 4x Resolution</h3>
                <p>The model analyzes and regenerates the image at up to 4x — edges sharpen, fine texture returns, colors stay natural.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">3</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Download the 4K-Ready Result</h3>
                <p>Save the high-resolution output directly to your device — ready for prints, posters and large displays.</p>
              </div>
            </div>
          </div>

          <h2 className="uppercase mt-12 mb-6">Perfect For</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Large prints & posters:</strong> bring phone photos up to print-ready resolution.</li>
            <li><strong>Presentations & slides:</strong> keep images sharp on projectors and 4K screens.</li>
            <li><strong>Restoring older photos:</strong> breathe detail back into low-res scans.</li>
            <li><strong>Marketing assets:</strong> crisp thumbnails, banners and product visuals.</li>
          </ul>

          <h2 className="uppercase mt-12 mb-6">Tips for the Sharpest Result</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Start from the highest resolution you have — AI works best when it has detail to work with.</li>
            <li>Avoid already-compressed low-quality crops; they limit how much detail can be recovered.</li>
            <li>Upscale once at 4x rather than repeatedly for cleanest results.</li>
          </ul>
        </article>

        <div className="text-center py-12 border-t border-white/10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Ready to make it sharp?</h2>
          <Link to="/tools/upscale" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Upscale Image to 4K Free
          </Link>
        </div>

        <div className="mb-16">
          <h2 className="font-['Fraunces'] text-xl uppercase mb-4 text-center text-white/80">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/how-to/upscale-image" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">How to Upscale Without Losing Quality</Link>
            <Link to="/how-to/remove-background" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Remove Background from Image</Link>
            <Link to="/how-to/remove-background-product-photos" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Product Photo Background Remover</Link>
            <Link to="/tools" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">All Free Tools</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}