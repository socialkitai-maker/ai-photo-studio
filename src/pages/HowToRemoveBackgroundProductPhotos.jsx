import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function HowToRemoveBackgroundProductPhotos() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Remove the Background from Product Photos Free",
      "description": "Step-by-step guide to remove backgrounds from product photos for e-commerce and get clean white or transparent PNG images for free.",
      "totalTime": "PT30S",
      "step": [
        { "@type": "HowToStep", "name": "Upload the product photo", "text": "Upload your product shot as a JPG, PNG or WebP image." },
        { "@type": "HowToStep", "name": "AI removes the background", "text": "The AI isolates the product with clean edges, in seconds." },
        { "@type": "HowToStep", "name": "Download the HD product PNG", "text": "Save the result as a transparent PNG for listings and ads." },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I remove product photo backgrounds for free for my e-commerce store?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the product background remover is completely free and you can use the results for commercial listings on any marketplace."
          }
        },
        {
          "@type": "Question",
          "name": "What format will my processed product photo be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You get a high-resolution transparent PNG, which you can place on white or any background for your listings."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work on complex product photos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — our AI is trained to keep fine details like hair-like edges, water bottles and jewellery intact for crisp cutouts."
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta
        title="Remove Background from Product Photos Free — E-commerce Background Remover"
        description="Remove backgrounds from product photos free for e-commerce. Get clean transparent PNG product shots in seconds — no signup, commercial use allowed."
        canonical="/how-to/remove-background-product-photos"
        jsonLd={jsonLd}
      />
      <SiteNav />

      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-8 text-center">
            Remove Background from Product Photos Free <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>

        <article className="prose prose-invert prose-p:text-gray-300 prose-h2:font-['Fraunces'] prose-h2:text-[rgba(255,220,180,0.85)] max-w-none mb-12">
          <p className="text-lg">
            Clean, consistent product images sell. Manually clipping out a bag, bottle or pair of shoes with software takes
            forever. Our <strong>free product photo background remover</strong> produces marketplace-ready transparent PNGs in
            seconds — so your listings look professional without the design bill.
          </p>

          <h2 className="uppercase mt-12 mb-6">Step-by-Step Guide</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#c3e3f4] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">1</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Upload the Product Photo</h3>
                <p>Drag & drop your product shot — JPG, PNG or WebP, up to 10MB. No signup, unlimited images.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#c3e3f4] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">2</div>
              <div>
                <h3 className="text-xl uppercase mb-2">AI Isolates the Product</h3>
                <p>The model detects the item and keeps fine detail — straps, handles, translucent bottles — while removing the background in 3–5 seconds.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#c3e3f4] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">3</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Download & Publish</h3>
                <p>Download the transparent PNG, drop it on a plain white background in one click, and add it to Amazon, eBay, Shopify or anywhere else.</p>
              </div>
            </div>
          </div>

          <h2 className="uppercase mt-12 mb-6">Why Sellers Love It</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Consistency:</strong> every product on a clean, uniform background looks more professional.</li>
            <li><strong>Compliance:</strong> white or transparent backgrounds meet marketplace listing rules.</li>
            <li><strong>Speed:</strong> process an entire catalog in minutes, not hours.</li>
            <li><strong>Free commercial use:</strong> keep 100% copyright over your product images.</li>
          </ul>

          <h2 className="uppercase mt-12 mb-6">Tips for Best Product Results</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Shoot against plain or lightly-textured backgrounds for the cleanest cutouts.</li>
            <li>Avoid busy scenes that compete with the product for attention.</li>
            <li>Capture the whole product — partial crops are harder to isolate automatically.</li>
          </ul>
        </article>

        <div className="text-center py-12 border-t border-white/10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Ready to clean up your catalog?</h2>
          <Link to="/tools/bg-remove" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Remove Product Background Free
          </Link>
        </div>

        <div className="mb-16">
          <h2 className="font-['Fraunces'] text-xl uppercase mb-4 text-center text-white/80">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/how-to/remove-background" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Remove Background from Image</Link>
            <Link to="/how-to/remove-green-screen" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Remove Green Screen</Link>
            <Link to="/how-to/upscale-to-4k" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Upscale Image to 4K</Link>
            <Link to="/tools" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">All Free Tools</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}