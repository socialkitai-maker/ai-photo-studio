import crypto from 'crypto';
import { getStats } from './_lib/stats.js';
import { getClientIp } from './_lib/ratelimit.js';

// Login rate limiter (5 attempts per minute per IP)
const loginAttempts = new Map();

function checkLoginRate(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  const recent = attempts.filter(t => now - t < 60000);
  if (recent.length >= 5) return false;
  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
}

function getPassword() {
  return process.env.ADMIN_PASSWORD;
}

function createToken(payload) {
  const secret = getSecret();
  const data = JSON.stringify({ ...payload, exp: Date.now() + 2 * 3600 * 1000 });
  const encoded = Buffer.from(data).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [encoded, sig] = token.split('.');
  if (!encoded || !sig) return null;
  const secret = getSecret();
  const expectedSig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    if (name) {
      cookies[name] = decodeURIComponent(parts.join('='));
    }
  });
  return cookies;
}

function json(res, obj, status = 200, headers = {}) {
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // POST = login
  if (req.method === 'POST') {
    const ip = getClientIp(req);
    if (!checkLoginRate(ip)) {
      return json(res, { error: 'Too many login attempts' }, 429);
    }
    
    const body = await readBody(req);
    const password = body.password;
    const configuredPassword = getPassword();

    if (!configuredPassword) {
      return json(res, { error: 'Admin is not configured. Set the ADMIN_PASSWORD environment variable.' }, 503);
    }
    
    if (!password || password !== configuredPassword) {
      return json(res, { error: 'Invalid password' }, 401);
    }
    
    const token = createToken({ role: 'admin', ip });
    
    // Set HttpOnly cookie
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`);
    
    return json(res, { ok: true, token });
  }
  
  // GET = stats (requires auth)
  if (req.method === 'GET') {
    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies.admin_token || req.headers.authorization?.replace('Bearer ', '');
    
    const payload = verifyToken(token);
    if (!payload) {
      return json(res, { error: 'Unauthorized' }, 401);
    }
    
    return json(res, getStats());
  }
  
  // DELETE = logout
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    return json(res, { ok: true });
  }
  
  return json(res, { error: 'Method not allowed' }, 405);
}
