const FIREBASE_SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
const FIREBASE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token';

let authCache = null;
let tokenExpiry = 0;
let useCount = 0;

const ROTATE_AFTER_USES = parseInt(process.env.IDENTITY_ROTATE_USES || '10', 10);

async function signInAnonymously() {
  if (authCache && Date.now() < tokenExpiry) return authCache;

  const apiKey = process.env.FIREBASE_API_KEY;
  if (!apiKey) throw new Error('Missing FIREBASE_API_KEY');

  const res = await fetch(`${FIREBASE_SIGNUP_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ returnSecureToken: true }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firebase sign-in failed: ${res.status}`);
  }

  const data = await res.json();
  authCache = { idToken: data.idToken, localId: data.localId, refreshToken: data.refreshToken };
  tokenExpiry = Date.now() + (parseInt(data.expiresIn) - 60) * 1000;
  return authCache;
}

async function refreshToken() {
  if (!authCache?.refreshToken) return signInAnonymously();

  const apiKey = process.env.FIREBASE_API_KEY;
  const res = await fetch(`${FIREBASE_TOKEN_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: authCache.refreshToken }),
  });

  if (!res.ok) {
    authCache = null;
    return signInAnonymously();
  }

  const data = await res.json();
  authCache.idToken = data.id_token;
  authCache.refreshToken = data.refresh_token;
  tokenExpiry = Date.now() + (parseInt(data.expires_in) - 60) * 1000;
  return authCache;
}

export async function ensureAuth() {
  if (authCache && useCount >= ROTATE_AFTER_USES) {
    authCache = null;
    tokenExpiry = 0;
  }

  if (!authCache) {
    const fresh = await signInAnonymously();
    useCount = 1;
    return fresh;
  }

  if (Date.now() >= tokenExpiry) {
    try {
      const refreshed = await refreshToken();
      useCount += 1;
      return refreshed;
    } catch {
      const fresh = await signInAnonymously();
      useCount = 1;
      return fresh;
    }
  }

  useCount += 1;
  return authCache;
}

export async function forceNewIdentity() {
  authCache = null;
  tokenExpiry = 0;
  useCount = 0;
  return ensureAuth();
}

export async function appStartup() {
  const startupUrl = process.env.STARTUP_API_URL;
  if (!startupUrl) return;

  const { idToken } = await ensureAuth();
  const res = await fetch(startupUrl, {
    method: 'POST',
    headers: { authorization: idToken },
  });
  if (!res.ok) {
    console.warn(`[app-startup] warning: ${res.status}`);
  }
}

export const HEADERS = {
  PLATFORM: process.env.PLATFORM_HEADER || 'android',
  APP_VER: process.env.APP_VER_HEADER || '2026.19.02 (2395)',
  ENTITLEMENT: process.env.ENTITLEMENT_HEADER || 'none',
  LANG: process.env.LANG_HEADER || 'en-GB',
  TELEMETRY: process.env.TELEMETRY_HEADER || 'false',
  TZ: process.env.TZ_HEADER || 'UTC',
};
