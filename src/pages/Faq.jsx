import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../hooks/usePageMeta';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/10">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-['Fraunces'] text-xl uppercase pr-8 text-white group-hover:text-[rgba(255,220,180,0.85)] transition-colors">
          {question}
        </span>
        <span className="text-[rgba(255,220,180,0.85)] text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-300 leading-relaxed pr-8 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Faq() {
  const faqs = [
    {
      q: "Is AI Photo Studio really free?",
      a: "Yes, completely free. We don't require credit cards, there are no subscriptions, and we don't watermark your images."
    },
    {
      q: "Do I need to create an account?",
      a: "No, you can start using our tools immediately without signing up or logging in."
    },
    {
      q: "What file formats are supported?",
      a: "Currently, we support JPG, PNG, and WebP formats for both uploads and downloads."
    },
    {
      q: "Is there a file size limit?",
      a: "Yes, to ensure fast processing for everyone, we currently limit uploads to 10MB per image."
    },
    {
      q: "How long does processing take?",
      a: "Most operations take between 2 to 5 seconds depending on the complexity of the image and the specific tool used."
    },
    {
      q: "Are my images safe?",
      a: "Absolutely. We are privacy-first. Your images are only stored temporarily for processing and are automatically deleted from our servers immediately afterward."
    },
    {
      q: "Can I use the processed images for commercial purposes?",
      a: "Yes. You retain full copyright of your images. If you had commercial rights to the original image, you have commercial rights to the processed result."
    },
    {
      q: "Why is the background remover leaving some parts behind?",
      a: "While our AI is advanced, it relies on contrast. Images with low contrast between the subject and the background or highly complex backgrounds may occasionally need manual touch-ups."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta 
        title="FAQ — Free Background Remover & Image Upscaler | AI Photo Studio" 
        description="Answers about AI Photo Studio's free background remover and 4x image upscaler: privacy, file formats, size limits, commercial use and more." 
        canonical="/faq"
        jsonLd={faqJsonLd}
      />
      <SiteNav />
      
      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-4xl md:text-5xl uppercase mb-12 text-center">
            Frequently Asked Questions <span className="text-[rgba(255,220,180,0.85)] italic opacity-60">›</span>
          </h1>
        </Reveal>
        
        <div className="mb-16">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
        
        <div className="text-center bg-white/5 border border-white/10 p-8">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-6">Try our AI-powered tools right now. No signup required.</p>
          <Link to="/tools" className="inline-block px-8 py-3 bg-[rgba(255,220,180,0.85)] text-[#0a0608] uppercase font-bold tracking-widest hover:bg-white transition-colors">
            View All Tools
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
