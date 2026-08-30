// Module-level Maps for per-instance stats
const usageLog = []; // Last 50 entries: { tool, ts, ok, ms, ip, errCode }
const toolCounters = {
  'bg-remove': { total: 0, success: 0, fail: 0, today: 0, hour: 0, totalMs: 0, lastRequest: null },
  'upscale': { total: 0, success: 0, fail: 0, today: 0, hour: 0, totalMs: 0, lastRequest: null },
};
const onlineUsers = new Map(); // masked IP → timestamp
const instanceStart = Date.now();

let lastDailyReset = new Date().getDate();
let lastHourlyReset = new Date().getHours();

function maskIp(ip) {
  // Keep first 3 octets only: "1.2.3.4" → "1.2.3.***"
  if (!ip) return 'unknown';
  const parts = ip.split('.');
  if (parts.length === 4) return parts.slice(0, 3).join('.') + '.***';
  return ip.replace(/:[\da-f]+$/i, ':***'); // IPv6
}

function pruneOnline() {
  const cutoff = Date.now() - 60000; // 60s TTL
  for (const [ip, ts] of onlineUsers) {
    if (ts < cutoff) onlineUsers.delete(ip);
  }
}

function resetIfNeeded() {
  const now = new Date();
  const currentDate = now.getDate();
  const currentHour = now.getHours();

  if (currentDate !== lastDailyReset) {
    for (const tool of Object.values(toolCounters)) {
      tool.today = 0;
    }
    lastDailyReset = currentDate;
  }

  if (currentHour !== lastHourlyReset) {
    for (const tool of Object.values(toolCounters)) {
      tool.hour = 0;
    }
    lastHourlyReset = currentHour;
  }
}

export function recordUsage({ tool, ok, ms, ip, errCode }) {
  try {
    resetIfNeeded();
    const maskedIp = maskIp(ip);
    const now = Date.now();
    
    // Update online heartbeat
    onlineUsers.set(maskedIp, now);
    pruneOnline();
    
    // Update counters
    const c = toolCounters[tool];
    if (c) {
      c.total++;
      if (ok) c.success++; else c.fail++;
      c.today++;
      c.hour++;
      c.totalMs += (ms || 0);
      c.lastRequest = now;
    }
    
    // Add to log (keep last 50)
    usageLog.push({ tool, ts: now, ok, ms: ms || 0, ip: maskedIp, errCode: errCode || null });
    while (usageLog.length > 50) usageLog.shift();
  } catch (e) {
    // Never throw — fire and forget
  }
}

export function getStats() {
  try {
    resetIfNeeded();
    pruneOnline();
    return {
      usersOnline: onlineUsers.size,
      tools: {
        'bg-remove': {
          ...toolCounters['bg-remove'],
          avgMs: toolCounters['bg-remove'].total > 0
            ? Math.round(toolCounters['bg-remove'].totalMs / toolCounters['bg-remove'].total)
            : 0,
        },
        'upscale': {
          ...toolCounters['upscale'],
          avgMs: toolCounters['upscale'].total > 0
            ? Math.round(toolCounters['upscale'].totalMs / toolCounters['upscale'].total)
            : 0,
        },
      },
      recentActivity: [...usageLog].reverse(),
      instanceStarted: instanceStart,
      note: 'Best-effort in-memory data from a single serverless instance. Resets on cold starts.',
    };
  } catch (e) {
    return { error: 'Failed to retrieve stats' };
  }
}
