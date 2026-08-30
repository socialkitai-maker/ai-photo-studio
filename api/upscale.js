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
    recordUsage({ tool: 'upscale', ok, ms: Date.now() - startTime, ip, errCode: ok ? null : res.statusCode });
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
    const upscaleUrl = process.env.UPSCALE_API_URL;
    if (!upscaleUrl) return json(res, { error: 'Service not configured' }, 500);

    const body = await readJson(req);
    if (!body.image) {
      return json(res, { error: 'No image provided' }, 400);
    }

    const imageBuffer = Buffer.from(body.image, 'base64');

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
      const { body: reqBody, boundary } = buildBody();
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
        body: reqBody,
      });
    };

    let apiRes = await callUpscale();
    if ([401, 403, 429].includes(apiRes.status)) {
      ({ idToken, localId } = await forceNewIdentity());
      await appStartup();
      apiRes = await callUpscale();
    }

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('[upscale] API error:', apiRes.status, errText.slice(0, 300));
      let detail = 'Processing failed';
      try {
        const e = errText ? JSON.parse(errText) : null;
        if (e?.message) detail = e.message;
      } catch {}
      return json(res, { error: detail }, 502);
    }

    const resultBuffer = Buffer.from(await apiRes.arrayBuffer());
    const resultBase64 = resultBuffer.toString('base64');

    return json(res, {
      status: 'done',
      result: resultBase64,
    });
  } catch (err) {
    console.error('[upscale] error:', err.message);
    return json(res, { error: 'Internal error' }, 500);
  }
}