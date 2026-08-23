import { ensureAuth, forceNewIdentity, appStartup, HEADERS } from './_lib/firebase.js';
import { checkRateLimit } from './_lib/ratelimit.js';
import { createJob, getJob, updateJob, generateJobId } from './_lib/store.js';

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
    const maskUrl = process.env.MASK_API_URL;
    if (!maskUrl) return json({ error: 'Service not configured' }, 500);

    const body = await request.json();
    if (!body.image) {
      return json({ error: 'No image provided' }, 400);
    }

    const jobId = generateJobId();

    await createJob(jobId, {
      type: 'bg-remove',
      status: 'processing',
      image: body.image,
      filename: body.filename || 'image.jpg',
      createdAt: Date.now(),
    });

    // Start processing immediately (fire & forget)
    processBgRemove(jobId, maskUrl).catch((err) => {
      console.error('[bg-remove] background error:', err.message);
    });

    return json({ jobId, status: 'processing' }, 202);
  } catch (err) {
    console.error('[bg-remove] error:', err.message);
    return json({ error: 'Internal error' }, 500);
  }
}

async function processBgRemove(jobId, maskUrl) {
  const job = await getJob(jobId);
  if (!job || job.status !== 'processing') return;

  try {
    const imageBuffer = Buffer.from(job.image, 'base64');

    await appStartup();
    let { idToken, localId } = await ensureAuth();

    const buildForm = () => {
      const f = new FormData();
      f.append('sourceImage', new Blob([imageBuffer], { type: 'image/jpeg' }), job.filename);
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
      await updateJob(jobId, { status: 'error', error: 'Processing failed' });
      return;
    }

    const data = await apiRes.json();
    if (!data.b64_mask) {
      await updateJob(jobId, { status: 'error', error: 'Invalid response' });
      return;
    }

    await updateJob(jobId, {
      status: 'done',
      mask: data.b64_mask,
      image: job.image,
    });
  } catch (err) {
    console.error('[bg-remove] processing error:', err.message);
    await updateJob(jobId, { status: 'error', error: 'Processing failed' });
  }
}
