const MIN_MS = 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const LIMITS = [
  { window: MIN_MS, max: parseInt(process.env.RATELIMIT_PER_MIN || '8', 10) },
  { window: HOUR_MS, max: parseInt(process.env.RATELIMIT_PER_HOUR || '30', 10) },
  { window: DAY_MS, max: parseInt(process.env.RATELIMIT_PER_DAY || '100', 10) },
];

const hits = new Map();
let lastCleanup = Date.now();

function cleanup(now) {
  if (now - lastCleanup < 5 * MIN_MS) return;
  lastCleanup = now;
  for (const [ip, stamps] of hits) {
    const fresh = stamps.filter((t) => now - t < DAY_MS);
    if (fresh.length === 0) hits.delete(ip);
    else hits.set(ip, fresh);
  }
}

export function getClientIp(req) {
  let fwd;
  if (typeof req.headers?.get === 'function') {
    fwd = req.headers.get('x-forwarded-for');
  } else {
    fwd = req.headers?.['x-forwarded-for'];
  }
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function checkRateLimit(req) {
  const now = Date.now();
  cleanup(now);

  const ip = getClientIp(req);
  const stamps = hits.get(ip) || [];

  for (const limit of LIMITS) {
    let count = 0;
    for (let i = stamps.length - 1; i >= 0; i--) {
      if (now - stamps[i] >= limit.window) break;
      count++;
    }
    if (count >= limit.max) {
      const oldestInWindow = stamps[stamps.length - count];
      const retryAfter = Math.max(Math.ceil((oldestInWindow + limit.window - now) / 1000), 1);
      return { ok: false, retryAfter };
    }
  }

  stamps.push(now);
  hits.set(ip, stamps);
  return { ok: true, retryAfter: 0 };
}
