import React from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="Terms of Service — AI Photo Studio" 
        description="Terms of service and usage guidelines for AI Photo Studio's free background remover and image upscaler tools." 
        canonical="/terms" 
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-4xl uppercase mb-8">
            Terms of Service <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="mb-6">Last updated: August 2026</p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using AI Photo Studio, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">2. Description of Service</h2>
          <p className="mb-4">
            AI Photo Studio provides free, web-based image processing tools utilizing artificial intelligence. The service is provided "as is" and "as available".
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">3. Usage Limits</h2>
          <p className="mb-4">
            While our service is free, we reserve the right to implement rate limiting to ensure fair usage and maintain server stability for all users. Excessive automated requests may result in temporary suspension of access.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">4. Intellectual Property</h2>
          <p className="mb-4">
            You retain all rights to the images you upload. We claim no ownership over your original or processed images. You are solely responsible for ensuring you have the necessary rights to use and modify the images you upload.
          </p>
          
          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">5. Acceptable Use</h2>
          <p className="mb-4">
            You agree not to use the service to process illicit, illegal, or highly objectionable material. We reserve the right to deny service to anyone at any time for any reason.
          </p>

          <h2 className="font-['Fraunces'] text-2xl uppercase mt-8 mb-4 text-white">6. Disclaimer of Warranties</h2>
          <p className="mb-4">
            We make no guarantees regarding the quality, accuracy, or reliability of the AI output. The service is provided without warranty of any kind.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
