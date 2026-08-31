import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../hooks/usePageMeta';
import SiteNav from '../../components/SiteNav';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';

const ACCENT = 'rgba(255,220,180,0.85)';

export default function SeoToolPage({ page }) {
  const {
    path,
    title,
    description,
    heroTitle,
    heroSubtitle,
    tool,
    toolLabel,
    toolCta,
    steps,
    content,
    faqs,
    relatedLinks,
  } = page;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI Photo Studio',
      url: 'https://aiphotostudio.vercel.app',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aiphotostudio.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://aiphotostudio.vercel.app/tools' },
        { '@type': 'ListItem', position: 3, name: heroTitle },
      ],
    },
    ...(faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
  ];

  const toolPath = tool === 'upscale' ? '/tools/upscale' : '/tools/bg-remove';
  const ctaLabel = toolCta || (tool === 'upscale' ? 'Upscale Image Now' : 'Remove Background Now');

  return (
    <div className="min-h-screen bg-[#0a0608] text-white pt-24 pb-12 flex flex-col font-['Outfit']">
      <PageMeta title={title} description={description} canonical={path} jsonLd={jsonLd} />
      <SiteNav />

      <main className="flex-grow max-w-[800px] w-full mx-auto px-4">
        {/* Hero */}
        <Reveal y={24}>
          <h1 className="font-['Fraunces'] text-3xl md:text-5xl uppercase mb-4 text-center">
            {heroTitle} <span className="italic opacity-60" style={{ color: ACCENT }}>›</span>
          </h1>
          {heroSubtitle && (
            <p className="text-center text-lg mb-12" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {heroSubtitle}
            </p>
          )}
        </Reveal>

        {/* CTA top */}
        <div className="text-center mb-12">
          <Link
            to={toolPath}
            className="inline-block px-8 py-3 uppercase font-bold tracking-widest hover:bg-white transition-colors"
            style={{ backgroundColor: ACCENT, color: '#0a0608' }}
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Steps */}
        {steps?.length > 0 && (
          <Reveal delay={0.1}>
            <section className="mb-12">
              <h2 className="font-['Fraunces'] text-2xl uppercase mb-8 text-center" style={{ color: ACCENT }}>
                How It Works
              </h2>
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div
                      className="text-xl font-['Fraunces'] bg-white/5 w-10 h-10 flex items-center justify-center rounded-full shrink-0 border border-white/10"
                      style={{ color: ACCENT }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg uppercase mb-1">{s.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Content */}
        {content && (
          <Reveal delay={0.15}>
            <article className="mb-12 space-y-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {content.intro && <p className="text-lg">{content.intro}</p>}
              {content.sections?.map((sec, i) => (
                <div key={i}>
                  {sec.h2 && (
                    <h2 className="font-['Fraunces'] text-xl uppercase mt-10 mb-4" style={{ color: ACCENT }}>
                      {sec.h2}
                    </h2>
                  )}
                  {sec.text && <p>{sec.text}</p>}
                  {sec.list && (
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      {sec.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>
          </Reveal>
        )}

        {/* FAQ */}
        {faqs?.length > 0 && (
          <Reveal delay={0.2}>
            <section className="mb-12 border-t border-white/10 pt-8">
              <h2 className="font-['Fraunces'] text-2xl uppercase mb-8 text-center" style={{ color: ACCENT }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((f, i) => (
                  <div key={i} className="p-5 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h3 className="text-base font-semibold mb-2">{f.q}</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* CTA bottom */}
        <div className="text-center py-10 border-t border-white/10 mb-10">
          <h2 className="font-['Fraunces'] text-2xl uppercase mb-6">Ready to try it?</h2>
          <Link
            to={toolPath}
            className="inline-block px-8 py-3 uppercase font-bold tracking-widest hover:bg-white transition-colors"
            style={{ backgroundColor: ACCENT, color: '#0a0608' }}
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Related links */}
        {relatedLinks?.length > 0 && (
          <div className="mb-16">
            <h2 className="font-['Fraunces'] text-lg uppercase mb-4 text-center" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Related Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {relatedLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] hover:text-[rgba(255,220,180,0.85)] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
