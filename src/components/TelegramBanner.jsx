export default function TelegramBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto glass-card p-8 sm:p-12 text-center">
        {/* Telegram icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2AABEE]/20 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#2AABEE"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
          More AI Tools on Telegram
        </h2>
        <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          5+ powerful AI tools available for free on our Telegram bot. Background Remover, Upscaler, AI Image Generator, AI Video, and Voice Generator — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://t.me/AiBgRemover_Bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid h-12 px-8 text-sm"
          >
            Open @AiBgRemover_Bot
          </a>
          <span className="text-white/30 text-xs">Free &middot; No signup required</span>
        </div>
      </div>
    </section>
  );
}
