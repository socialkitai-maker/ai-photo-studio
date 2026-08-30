import React from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="Privacy Policy — AI Photo Studio" 
        description="Read our privacy policy. We respect your privacy, do not store your images, and do not track you." 
        canonical="/privacy" 
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-4xl uppercase mb-8">
            Privacy Policy <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="mb-6">Last updated: August 2026</p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">1. Information We Collect</h2>
          <p className="mb-4">
            <strong>Images:</strong> When you use our tools, you upload images to our servers for processing. These images are kept strictly confidential.
          </p>
          <p className="mb-4">
            <strong>Usage Data:</strong> We may collect anonymous usage metrics (like which tool was used or processing times) to help improve our service. This data cannot be linked back to you.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">2. How We Use Your Data</h2>
          <p className="mb-4">
            The images you upload are used exclusively to perform the requested AI operation (e.g., removing the background). We do not use your images to train our AI models, nor do we share them with third parties.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">3. Data Retention and Deletion</h2>
          <p className="mb-4">
            We are committed to your privacy. All uploaded and processed images are automatically and permanently deleted from our servers shortly after processing is complete. We do not maintain historical archives of user files.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">4. Cookies and Tracking</h2>
          <p className="mb-4">
            We do not use tracking cookies. We do not store personally identifiable information on your device.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">5. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
