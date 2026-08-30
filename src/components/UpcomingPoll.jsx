import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AmbientBackground from './AmbientBackground';
import SectionKicker from './SectionKicker';

const VOTE_KEY = 'aips:poll';

const OPTIONS = [
  { key: 'image', label: 'AI Image Generator', color: '#c3e3f4' },
  { key: 'video', label: 'AI Video Generator', color: '#dcedc2' },
  { key: 'voice', label: 'AI Voice Generator', color: '#f0e4c0' },
  { key: 'batch', label: 'Batch Background Remover', color: '#f3cdd6' },
];

const UPCOMING = [
  { label: 'AI Image Generator (FLUX Pro)', note: 'Live in Telegram', live: true },
  { label: 'AI Background Replace', note: 'Live in Telegram', live: true },
  { label: 'AI Voice Generator', note: 'Live in Telegram', live: true },
  { label: 'AI Video Generator', note: 'Live in Telegram', live: true },
  { label: 'AI Voice Generator (Hindi)', note: 'Next on the website', live: false },
  { label: 'Premium plans on the web', note: 'Next on the website', live: false },
];

function readVote() {
  try { return localStorage.getItem(VOTE_KEY); } catch { return null; }
}

export default function UpcomingPoll() {
  const [results, setResults] = useState(null);
  const [myVote, setMyVote] = useState(readVote());
  const [booting, setBooting] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/poll')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => { if (alive) setResults(data); })
      .catch(() => {})
      .finally(() => { if (alive) setBooting(false); });
    return () => { alive = false; };
  }, []);

  async function vote(key) {
    if (myVote || voting) return;
    setVoting(true);
    try {
      const res = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: key }),
      });
      if (res.ok) setResults(await res.json());
    } catch {}
    try { localStorage.setItem(VOTE_KEY, key); } catch {}
    setMyVote(key);
    setVoting(false);
  }

  const total = results?.total ?? 0;
  const pct = (key) => (total ? Math.round(((results.results[key] || 0) / total) * 100) : 0);

  return (
    <motion.section
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AmbientBackground variant="subtle" />
      <div className="relative max-w-4xl mx-auto text-center">
        <SectionKicker
          kicker="The roadmap"
          title={<>WHAT&rsquo;S NEXT <span style={{ fontStyle: 'italic', color: 'rgba(255,220,180,0.85)' }}>›</span> <span style={{ fontStyle: 'italic' }}>SOON</span></>}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-10 text-left">
          {/* Upcoming list */}
          <div className="p-6 sm:p-8 tool-card-dark" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 className="text-lg font-semibold text-white tracking-widest uppercase mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
              Coming to the website
            </h3>
            <ul className="space-y-4">
              {UPCOMING.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2.5 w-2.5 rounded-full flex-none"
                    style={{ backgroundColor: item.live ? '#dcedc2' : '#f3cdd6' }}
                  />
                  <div>
                    <p className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.85)' }}>
                      {item.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,220,180,0.6)' }}>
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="https://t.me/AiBgRemover_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-7 text-sm transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,220,180,0.85)', borderBottom: '1px solid rgba(255,220,180,0.35)' }}
            >
              Try them right now in our free Telegram bot &rarr;
            </a>
          </div>

          {/* Poll */}
          <div className="p-6 sm:p-8 tool-card-dark" style={{ borderColor: 'rgba(255,220,180,0.2)' }}>
            <h3 className="text-lg font-semibold text-white tracking-widest uppercase mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
              What should we add first?
            </h3>
            <p className="text-xs mb-6" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
              One vote per visitor &middot; {booting ? 'tallying…' : total > 0 ? `${total} vote${total === 1 ? '' : 's'} in` : 'be the first to vote'}
            </p>

            <div className="space-y-3">
              {OPTIONS.map((o) => {
                const my = myVote === o.key;
                const showBars = results != null && total > 0;
                return (
                  <button
                    key={o.key}
                    onClick={() => vote(o.key)}
                    disabled={!!myVote || voting}
                    className="w-full text-left rounded-xl px-4 py-3 transition-all disabled:cursor-default"
                    style={{
                      border: `1px solid ${my ? 'rgba(255,220,180,0.6)' : 'rgba(255,255,255,0.1)'}`,
                      backgroundColor: my ? 'rgba(255,220,180,0.07)' : 'rgba(255,255,255,0.02)',
                      cursor: myVote ? 'default' : 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {showBars && (
                      <span
                        className="absolute inset-y-0 left-0"
                        style={{ width: `${pct(o.key)}%`, backgroundColor: `${o.color}26`, transition: 'width .6s ease' }}
                      />
                    )}
                    <span className="relative flex items-center justify-between">
                      <span className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.9)' }}>
                        {o.label}
                      </span>
                      <span className="text-xs tabular-nums" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.55)' }}>
                        {showBars ? `${pct(o.key)}%` : ''}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {results == null && myVote && (
              <p className="text-xs mt-4 text-center" style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,220,180,0.6)' }}>
                Vote saved on this device — totals appear once we&rsquo;re live.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}