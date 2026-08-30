import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function HowToRemoveGreenScreen() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Remove a Green Screen Background Free",
      "description": "Step-by-step guide to remove a green screen background from a photo online for free with AI — no chroma key software needed.",
      "totalTime": "PT30S",
      "step": [
        { "@type": "HowToStep", "name": "Upload the green screen photo", "text": "Upload any JPG, PNG or WebP photo shot on a green background." },
        { "@type": "HowToStep", "name": "Let the AI isolate the subject", "text": "The AI detects the subject and removes the green screen in seconds." },
        { "@type": "HowToStep", "name": "Preview and download the transparent PNG", "text": "Check the clean cutout and download your transparent PNG for free." },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I remove a green screen background without video editing software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our free AI background remover isolates the subject from a green screen in seconds, with no manual chroma keying."
          }
        },
        {
          "@type": "Question",
          "name": "Does the green screen remover work on videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not yet — today it works on images (JPG, PNG, WebP). Upload a frame as an image to get a transparent PNG."
          }
        },
        {
          "@type": "Question",
          "name": "Will removing the green background leave green edges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI removes green spill from edges, so you get clean cutouts without the green fringe chroma key scripts leave behind."
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta
        title="Remove Green Screen Background Free Online — No Chroma Key Software"
        description="Remove a green screen background from any photo free in seconds with AI. No chroma key software, no signup — instant transparent PNG downloads."
        canonical="/how-to/remove-green-screen"
        jsonLd={jsonLd}
      />
      <SiteNav />

      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-8 text-center">
            Remove Green Screen Background Free <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>

        <article className="prose prose-invert prose-p:text-gray-300 prose-h2:font-['Fraunces'] prose-h2:text-[rgba(255,220,180,0.85)] max-w-none mb-12">
          <p className="text-lg">
            A green screen — or chroma key — is great for filming, but not so great for a finished product. Removing it used
            to mean keying software, spill cleanup, and edge refining. With AI you can <strong>remove the green background in
            seconds, completely free</strong>, and get a clean transparent PNG instead.
          </p>

          <h2 className="uppercase mt-12 mb-6">Step-by-Step Guide</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#dcedc2] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">1</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Upload the Green Screen Photo</h3>
                <p>Drag & drop a JPG, PNG or WebP shot on a green backdrop. No signup, no upload limits.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#dcedc2] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">2</div>
              <div>
                <h3 className="text-xl uppercase mb-2">AI Isolates the Subject</h3>
                <p>The neural network finds the subject, masks out the green, and cleans green spill from the edges in 3–5 seconds.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#dcedc2] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">3</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Preview & Download Transparent PNG</h3>
                <p>Check the clean cutout against the transparent checkerboard, then download your free PNG and drop it on any background.</p>
              </div>
            </div>
          </div>

          <h2 className="uppercase mt-12 mb-6">Common Uses</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>YouTube thumbnails:</strong> shoot against green, replace with any backdrop.</li>
            <li><strong>E-commerce:</strong> turn green-screen product shots into clean white or transparent PNGs.</li>
            <li><strong>Media & presentations:</strong> remove green backgrounds from portraits for slides and posts.</li>
            <li><strong>Gaming & streaming:</strong> cut out streamer or gameplay content from green screens.</li>
          </ul>

          <h2 className="uppercase mt-12 mb-6">Tips for a Perfect Cutout</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use even lighting so the green is flat and easy to isolate.</li>
            <li>Keep some space between the subject and the green screen to avoid shadows.</li>
            <li>Shoot at higher resolution — more detail means cleaner hair and fabric edges.</li>
          </ul>
        </article>

        <div className="text-center py-12 border-t border-white/10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Ready to try it?</h2>
          <Link to="/tools/bg-remove" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Remove Green Screen Free
          </Link>
        </div>

        <div className="mb-16">
          <h2 className="font-['Fraunces'] text-xl uppercase mb-4 text-center text-white/80">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/how-to/remove-background" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Remove Background from Image</Link>
            <Link to="/how-to/remove-background-product-photos" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Product Photo Background Remover</Link>
            <Link to="/how-to/upscale-to-4k" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">Upscale Image to 4K</Link>
            <Link to="/tools" className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] transition-colors">All Free Tools</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}