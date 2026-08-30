import PortalHero from '../components/PortalHero';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import TelegramBanner from '../components/TelegramBanner';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import SectionKicker from '../components/SectionKicker';
import SectionDivider from '../components/SectionDivider';
import ToolsMarquee from '../components/ToolsMarquee';
import CountUpStats from '../components/CountUpStats';
import UpcomingPoll from '../components/UpcomingPoll';
import AmbientBackground from '../components/AmbientBackground';
import { SITE_URL } from '../lib/site';
import { PageMeta } from '../hooks/usePageMeta';

const tools = [
  {
    icon: '✂️',
    title: 'Background Remover',
    description: 'Remove backgrounds from any photo instantly with AI. Clean edges, transparent output, works on any subject.',
    to: '/tools/bg-remove',
    color: '#c3e3f4',
  },
  {
    icon: '🔍',
    title: '4x HD Upscaler',
    description: 'Upscale images to 4x resolution without quality loss. Perfect for prints, thumbnails, and social media.',
    to: '/tools/upscale',
    color: '#dcedc2',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0608' }}>
      <PageMeta
        title="Free Background Remover & Image Upscaler — No Signup | AI Photo Studio"
        description="Remove image backgrounds and upscale photos to 4x for free. AI-powered, no signup, no watermarks. JPG, PNG & WebP — instant transparent PNG downloads."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Photo Studio",
            "url": SITE_URL,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Photo Studio",
            "url": SITE_URL,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SITE_URL}/tools?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AI Photo Studio",
            "url": SITE_URL,
            "logo": `${SITE_URL}/favicon.svg`
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
              }
            ]
          }
        ]}
      />
      {/* Hero — fullscreen scroll parallax portal */}
      <PortalHero />

      {/* Tools section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <AmbientBackground />
        <div className="relative max-w-4xl mx-auto">
          <SectionKicker
            kicker="Freely forever"
            title={<>OUR <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>›</span> <span style={{ fontStyle: 'italic' }}>TOOLS</span></>}
            sub="Upload any image and get professional results in seconds."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {tools.map((tool, i) => (
              <ToolCard key={tool.title} {...tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <AmbientBackground variant="subtle" />
        <div className="relative">
          <ToolsMarquee />
          <CountUpStats />
        </div>
      </div>

      {/* How It Works — pinned horizontal journey */}
      <HowItWorks />

      {/* Instagram hook strip */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <AmbientBackground variant="subtle" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionDivider />
          <h3
            className="text-2xl sm:text-3xl uppercase mt-8 sm:mt-10"
            style={{ fontFamily: "'Fraunces', serif", color: '#fff' }}
          >
            Two clicks. <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>Zero</span> watermarks.
          </h3>
          <p
            className="text-sm sm:text-base mt-3 mx-auto max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.6)' }}
          >
            Remove the background or upscale the image — then take it straight to Instagram.
          </p>
        </div>
      </section>

      {/* Popular guides — internal linking for keywords */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <AmbientBackground variant="subtle" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionKicker kicker="Learn the craft" title={<>POPULAR <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>›</span> <span style={{ fontStyle: 'italic' }}>GUIDES</span></>} />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { to: '/how-to/remove-background', label: 'How to Remove Background from an Image' },
              { to: '/how-to/remove-green-screen', label: 'Remove Green Screen Background' },
              { to: '/how-to/remove-background-product-photos', label: 'Product Photo Background Remover' },
              { to: '/how-to/upscale-to-4k', label: 'Upscale Image to 4K' },
              { to: '/how-to/upscale-image', label: 'Upscale Without Losing Quality' },
              { to: '/tools', label: 'All Free Tools' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm border border-white/15 px-4 py-2 hover:border-[rgba(255,220,180,0.5)] hover:text-[rgba(255,220,180,0.85)] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.65)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming features + vote */}
      <UpcomingPoll />

      {/* Telegram Banner */}
      <TelegramBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}