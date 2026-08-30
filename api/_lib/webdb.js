import pg from 'pg';

const { Pool } = pg;

let pool = null;

export function getWebPool() {
  if (!process.env.WEB_DB_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.WEB_DB_URL,
      ssl: process.env.WEB_DB_SSL === 'false' ? false : { rejectUnauthorized: false },
      max: 2,
      maxUses: 20,
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export async function ensureWebTables(p) {
  await p.query(`
    CREATE TABLE IF NOT EXISTS web_requests (
      id SERIAL PRIMARY KEY,
      tool TEXT NOT NULL,
      ok BOOLEAN NOT NULL,
      ms INTEGER DEFAULT 0,
      ip_masked TEXT,
      err_code INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_web_requests_tool ON web_requests (tool);
    CREATE INDEX IF NOT EXISTS idx_web_requests_created ON web_requests (created_at);

    CREATE TABLE IF NOT EXISTS web_visitors (
      id SERIAL PRIMARY KEY,
      ip_hash TEXT UNIQUE,
      first_seen TIMESTAMPTZ DEFAULT NOW(),
      last_seen TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_web_visitors_last ON web_visitors (last_seen);

    CREATE TABLE IF NOT EXISTS poll_votes (
      id SERIAL PRIMARY KEY,
      option_key TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_poll_votes_option ON poll_votes (option_key);
  `);
}
