import { getWebPool, ensureWebTables } from './webdb.js';
import crypto from 'crypto';

let pool = null;
let tableReady = false;

function maskIp(ip) {
  if (!ip) return 'unknown';
  const parts = ip.split('.');
  if (parts.length === 4) return parts.slice(0, 3).join('.') + '.***';
  return ip.replace(/:[\da-f]+$/i, ':***');
}

function hashIp(ip) {
  if (!ip) return 'unknown';
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 24);
}

async function db() {
  if (tableReady) return pool;
  pool = getWebPool();
  if (!pool) return null;
  try {
    await ensureWebTables(pool);
    tableReady = true;
  } catch (e) {
    tableReady = false;
    return null;
  }
  return pool;
}

export async function recordUsage({ tool, ok, ms, ip, errCode }) {
  try {
    const p = await db();
    if (!p) return;
    const masked = maskIp(ip);
    await p.query(
      'INSERT INTO web_requests (tool, ok, ms, ip_masked, err_code) VALUES ($1, $2, $3, $4, $5)',
      [tool, !!ok, ms || 0, masked, errCode || null]
    );
  } catch (e) {
    // never throw — fire and forget
  }
}

export async function recordVisitor(ip) {
  try {
    const p = await db();
    if (!p) return;
    const h = hashIp(ip);
    await p.query(
      `INSERT INTO web_visitors (ip_hash) VALUES ($1)
       ON CONFLICT (ip_hash) DO UPDATE SET last_seen = NOW()`,
      [h]
    );
  } catch (e) {
    // never throw
  }
}

export async function getStats() {
  try {
    const p = await db();
    if (!p) {
      return { error: 'Database not configured (WEB_DB_URL missing)' };
    }

    const tools = {};
    for (const tool of ['bg-remove', 'upscale']) {
      const all = await p.query(
        'SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE ok)::int AS success, COUNT(*) FILTER (WHERE NOT ok)::int AS fail, COALESCE(AVG(ms),0)::int AS avgms, MAX(created_at) AS last_req FROM web_requests WHERE tool = $1',
        [tool]
      );
      const today = await p.query(
        "SELECT COUNT(*)::int AS n FROM web_requests WHERE tool = $1 AND created_at::date = CURRENT_DATE",
        [tool]
      );
      const hour = await p.query(
        "SELECT COUNT(*)::int AS n FROM web_requests WHERE tool = $1 AND created_at > NOW() - interval '1 hour'",
        [tool]
      );
      const r = all.rows[0];
      tools[tool] = {
        total: r.total,
        success: r.success,
        fail: r.fail,
        avgMs: r.avgms,
        today: today.rows[0].n,
        hour: hour.rows[0].n,
        lastRequest: r.last_req ? new Date(r.last_req).getTime() : null,
      };
    }

    const users = await p.query("SELECT COUNT(*)::int AS total FROM web_visitors");
    const usersToday = await p.query("SELECT COUNT(*)::int AS n FROM web_visitors WHERE last_seen > NOW() - interval '24 hours'");
    const online = await p.query("SELECT COUNT(*)::int AS n FROM web_visitors WHERE last_seen > NOW() - interval '10 minutes'");

    const recent = await p.query(
      'SELECT tool, ok, ms, ip_masked, err_code, created_at FROM web_requests ORDER BY id DESC LIMIT 50'
    );

    const poll = await p.query('SELECT option_key, COUNT(*)::int AS n FROM poll_votes GROUP BY option_key');

    return {
      usersTotal: users.rows[0].total,
      usersToday: usersToday.rows[0].n,
      usersOnline: online.rows[0].n,
      tools,
      poll: poll.rows,
      recentActivity: recent.rows.map((r) => ({
        tool: r.tool,
        ok: r.ok,
        ms: r.ms,
        ip: r.ip_masked,
        errCode: r.err_code,
        ts: new Date(r.created_at).getTime(),
      })),
    };
  } catch (e) {
    return { error: 'Stats query failed' };
  }
}
