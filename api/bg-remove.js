import { ensureAuth, forceNewIdentity, appStartup, HEADERS } from './_lib/firebase.js';
import { checkRateLimit } from './_lib/ratelimit.js';

function json(obj, status, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export const config = { maxDuration: 30 };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const rl = checkRateLimit(request);
  if (!rl.ok) {
    return json(
      { error: 'Too many requests. Try again shortly.', retryAfter: rl.retryAfter },
      429,
      { 'Retry-After': String(rl.retryAfter) }
    );
  }

  try {
    const maskUrl = process.env.MASK_API_URL;
    if (!maskUrl) return json({ error: 'Service not configured' }, 500);

    const body = await request.json();
    if (!body.image) {
      return json({ error: 'No image provided' }, 400);
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
      console.error('[bg-remove] API error:', apiRes.status, errText.slice(0, 200));
      return json({ error: 'Processing failed' }, 502);
    }

    const data = await apiRes.json();
    if (!data.b64_mask) {
      return json({ error: 'Invalid response from service' }, 502);
    }

    return json({
      status: 'done',
      mask: data.b64_mask,
      image: body.image,
    });
  } catch (err) {
    console.error('[bg-remove] error:', err.message);
    return json({ error: 'Internal error' }, 500);
  }
}
