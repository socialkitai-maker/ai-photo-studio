import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function HowToRemoveBackground() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it completely free to remove background from images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our background removal tool is 100% free with no hidden fees or subscriptions."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to process an image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The AI processes most images in under 5 seconds."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="How to Remove Background from Image Free — AI Photo Studio" 
        description="Learn how to quickly and easily remove the background from any image for free using our advanced AI tool. Step-by-step guide included." 
        canonical="/how-to/remove-background"
        jsonLd={faqJsonLd}
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-8 text-center">
            How to Remove Background from Image Free <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <article className="prose prose-invert prose-p:text-gray-300 prose-h2:font-['Fraunces'] prose-h2:text-[rgba(255,220,180,0.85)] max-w-none mb-12">
          <p className="text-lg">
            Removing backgrounds used to take hours of meticulous masking in complex software. Now, thanks to AI, you can achieve perfect cutouts in seconds—completely free.
          </p>
          
          <h2 className="uppercase mt-12 mb-6">Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">1</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Upload Your Image</h3>
                <p>Click on the upload box or drag and drop your image file. We support JPG, PNG, and WebP formats.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">2</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Wait for AI Processing</h3>
                <p>Our advanced neural network analyzes the image, identifies the main subject, and precisely masks out the background. This usually takes 3-5 seconds.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">3</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Preview and Adjust</h3>
                <p>Review the result. The subject should be cleanly isolated against a transparent checkerboard background.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="text-2xl font-['Fraunces'] text-[#f0e4c0] bg-white/5 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-white/10">4</div>
              <div>
                <h3 className="text-xl uppercase mb-2">Download Free</h3>
                <p>Click the download button to save your new transparent PNG image directly to your device.</p>
              </div>
            </div>
          </div>

          <h2 className="uppercase mt-12 mb-6">Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>E-commerce:</strong> Create clean product shots for your online store.</li>
            <li><strong>Social Media:</strong> Design engaging YouTube thumbnails and Instagram posts.</li>
            <li><strong>Presentations:</strong> Make your slides pop with transparent graphics.</li>
            <li><strong>Graphic Design:</strong> Quickly prepare assets for collages and marketing materials.</li>
          </ul>

          <h2 className="uppercase mt-12 mb-6">Tips for Best Results</h2>
          <p>
            While our AI is highly capable, you can ensure perfect results by using images with good lighting, sharp focus on the subject, and distinct contrast between the subject and the background.
          </p>
        </article>
        
        <div className="text-center py-12 border-t border-white/10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Ready to try it?</h2>
          <Link to="/tools/bg-remove" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            Remove Background Now
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
