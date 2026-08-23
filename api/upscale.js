import { ensureAuth, forceNewIdentity, appStartup, HEADERS } from './_lib/firebase.js';
import { checkRateLimit } from './_lib/ratelimit.js';

function json(obj, status, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

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
    const upscaleUrl = process.env.UPSCALE_API_URL;
    if (!upscaleUrl) return json({ error: 'Service not configured' }, 500);

    const formData = await request.formData();
    const file = formData.get('image');
    if (!file || typeof file === 'string') {
      return json({ error: 'No image provided' }, 400);
    }

    let imageBuffer = Buffer.from(await file.arrayBuffer());

    await appStartup();
    let { idToken, localId } = await ensureAuth();

    const buildBody = () => {
      const boundary = '----boundary' + Date.now();
      const enc = Buffer.from;
      const parts = [];

      const addField = (name, value) => {
        parts.push(enc('--' + boundary + '\r\n'));
        parts.push(enc('Content-Disposition: form-data; name="' + name + '"\r\n\r\n'));
        parts.push(enc(value + '\r\n'));
      };

      const addFile = (name, filename, buf, contentType) => {
        parts.push(enc('--' + boundary + '\r\n'));
        parts.push(enc('Content-Disposition: form-data; name="' + name + '"; filename="' + filename + '"\r\n'));
        parts.push(enc('Content-Type: ' + contentType + '\r\n\r\n'));
        parts.push(buf);
        parts.push(enc('\r\n'));
      };

      addFile('imageFile', 'image.jpg', imageBuffer, 'image/jpeg');
      addField('creativity', '0');
      addField('scale', '4');
      addField('user_id', localId);

      parts.push(enc('--' + boundary + '--\r\n'));
      return { body: Buffer.concat(parts), boundary };
    };

    const callUpscale = () => {
      const { body, boundary } = buildBody();
      return fetch(upscaleUrl, {
        method: 'POST',
        headers: {
          authorization: idToken,
          'pr-platform': HEADERS.PLATFORM,
          'pr-app-version': HEADERS.APP_VER,
          'pr-current-space-entitlement': HEADERS.ENTITLEMENT,
          'pr-user-bcp-language': HEADERS.LANG,
          'pr-telemetry-enabled': HEADERS.TELEMETRY,
          'pr-main-subject-id': 'not_set',
          'pr-user-timezone': HEADERS.TZ,
          'Content-Type': 'multipart/form-data; boundary=' + boundary,
        },
        body,
      });
    };

    let apiRes = await callUpscale();
    if ([401, 403, 429].includes(apiRes.status)) {
      console.warn('[upscale] quota/auth error, rotating identity');
      ({ idToken, localId } = await forceNewIdentity());
      await appStartup();
      apiRes = await callUpscale();
    }

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('[upscale] API error:', apiRes.status, errText.slice(0, 200));
      return json({ error: 'Processing failed' }, 502);
    }

    const resultBuffer = Buffer.from(await apiRes.arrayBuffer());

    return new Response(resultBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[upscale] error:', err.message);
    return json({ error: 'Internal error' }, 500);
  }
}
