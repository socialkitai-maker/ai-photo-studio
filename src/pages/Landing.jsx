import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import TelegramBanner from '../components/TelegramBanner';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const tools = [
  {
    icon: '✂️',
    title: 'Background Remover',
    description: 'Remove backgrounds from any photo instantly with AI. Clean edges, transparent output, works on any subject.',
    to: '/tools/bg-remove',
    gradient: 'bg-blue-500/10',
  },
  {
    icon: '🔍',
    title: '4x HD Upscaler',
    description: 'Upscale images to 4x resolution without quality loss. Perfect for prints, thumbnails, and social media.',
    to: '/tools/upscale',
    gradient: 'bg-emerald-500/10',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero — fullscreen video + content */}
      <Hero />

      {/* Tools section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-4">
            Two Tools. Zero Complexity.
          </h2>
          <p className="text-white/40 text-center text-sm sm:text-base mb-10 sm:mb-14 max-w-lg mx-auto">
            Upload any image and get professional results in seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Telegram Banner */}
      <TelegramBanner />

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
