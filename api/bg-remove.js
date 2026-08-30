import { ensureAuth, forceNewIdentity, appStartup, HEADERS } from './_lib/firebase.js';
import { checkRateLimit, getClientIp } from './_lib/ratelimit.js';
import { recordUsage } from './_lib/stats.js';

function json(res, obj, status = 200, extraHeaders = {}) {
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  const startTime = Date.now();
  const ip = getClientIp(req);

  const _end = res.end;
  res.end = function(chunk, encoding, callback) {
    const ok = res.statusCode === 200;
    recordUsage({ tool: 'bg-remove', ok, ms: Date.now() - startTime, ip, errCode: ok ? null : res.statusCode });
    return _end.call(this, chunk, encoding, callback);
  };

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  const rl = checkRateLimit(req);
  if (!rl.ok) {
    return json(
      res,
      { error: 'Too many requests. Try again shortly.', retryAfter: rl.retryAfter },
      429,
      { 'Retry-After': String(rl.retryAfter) }
    );
  }

  try {
    const maskUrl = process.env.MASK_API_URL;
    if (!maskUrl) return json(res, { error: 'Service not configured' }, 500);

    const body = await readJson(req);
    if (!body.image) {
      return json(res, { error: 'No image provided' }, 400);
    }

    const imageBuffer = Buffer.from(body.image, 'base64');

    await appStartup();
    let { idToken, localId } = await ensureAuth();

    const buildForm = () => {
      const f = new FormData();
      f.append('sourceImage', new Blob([imageBuffer], { type: 'image/jpeg' }), body.filename || 'image.jpg');
      f.append('user_id', localId);
      f.append('resize_mask', 'true');
      f.append('model_type', 'u2net');
      f.append('experiment_flag', 'default');
      return f;
    };

    const callMask = () => fetch(maskUrl, {
      method: 'POST',
      headers: {
        authorization: idToken,
        'pr-platform': HEADERS.PLATFORM,
        'pr-app-version': HEADERS.APP_VER,
        'pr-current-space-entitlement': HEADERS.ENTITLEMENT,
        'pr-user-bcp-language': HEADERS.LANG,
        'pr-telemetry-enabled': HEADERS.TELEMETRY,
      },
      body: buildForm(),
    });

    let apiRes = await callMask();
    if ([401, 403, 429].includes(apiRes.status)) {
      ({ idToken, localId } = await forceNewIdentity());
      await appStartup();
      apiRes = await callMask();
    }

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('[bg-remove] API error:', apiRes.status, errText.slice(0, 300));
      let detail = 'Processing failed';
      try {
        const e = errText ? JSON.parse(errText) : null;
        if (e?.message) detail = e.message;
      } catch {}
      return json(res, { error: detail }, 502);
    }

    const data = await apiRes.json();
    if (!data.b64_mask) {
      return json(res, { error: 'Invalid response from service' }, 502);
    }

    return json(res, {
      status: 'done',
      mask: data.b64_mask,
      image: body.image,
    });
  } catch (err) {
    console.error('[bg-remove] error:', err.message);
    return json(res, { error: 'Internal error' }, 500);
  }
}