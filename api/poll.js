import { getWebPool, ensureWebTables } from './_lib/webdb.js';

const OPTIONS = ['image', 'video', 'voice', 'batch'];

let pool = null;

async function db() {
  if (pool) return pool;
  pool = getWebPool();
  if (!pool) return null;
  try {
    await ensureWebTables(pool);
  } catch (e) {
    return null;
  }
  return pool;
}

export async function totals(p) {
  const r = await p.query('SELECT option_key, COUNT(*)::int AS n FROM poll_votes GROUP BY option_key');
  const results = {};
  let total = 0;
  for (const k of OPTIONS) results[k] = 0;
  for (const row of r.rows) {
    if (row.option_key in results) {
      results[row.option_key] = row.n;
      total += row.n;
    }
  }
  return { results, total };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const p = await db();
  if (!p) {
    return res.status(503).json({ error: 'poll not configured' });
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(await totals(p));
    }

    if (req.method === 'POST') {
      const opt = req.body?.option;
      if (!OPTIONS.includes(opt)) return res.status(400).json({ error: 'invalid option' });
      await p.query('INSERT INTO poll_votes (option_key) VALUES ($1)', [opt]);
      return res.status(200).json(await totals(p));
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('[poll] error:', err.message);
    return res.status(503).json({ error: 'poll temporarily unavailable' });
  }
}