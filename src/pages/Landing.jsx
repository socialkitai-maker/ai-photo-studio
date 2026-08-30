import PortalHero from '../components/PortalHero';
import ToolCard from '../components/ToolCard';
import TelegramBanner from '../components/TelegramBanner';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import SectionKicker from '../components/SectionKicker';
import SectionDivider from '../components/SectionDivider';
import ToolsMarquee from '../components/ToolsMarquee';
import CountUpStats from '../components/CountUpStats';
import AmbientBackground from '../components/AmbientBackground';
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
        title="AI Photo Studio — Remove Backgrounds & Upscale Free"
        description="Remove backgrounds and upscale images instantly with AI. Professional results in seconds. Free, unlimited, no signup."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Photo Studio",
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
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://aiphotostudio.com/"
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

      {/* Telegram Banner */}
      <TelegramBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}