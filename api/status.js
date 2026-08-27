import { getJob } from './_lib/store.js';

function json(res, obj, status = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

export const config = { maxDuration: 10 };

export default async function handler(req, res) {
  const url = new URL(req.url, 'https://x');
  const jobId = url.searchParams.get('jobId');

  if (!jobId) {
    return json(res, { error: 'Missing jobId parameter' }, 400);
  }

  try {
    const job = await getJob(jobId);

    if (!job) {
      return json(res, { status: 'not_found', error: 'Job not found or expired' }, 404);
    }

    if (job.status === 'done') {
      // Return result and clean up
      if (job.type === 'upscale') {
        return json(res, {
          status: 'done',
          type: 'upscale',
          result: job.result, // base64 image
        });
      }

      if (job.type === 'bg-remove') {
        return json(res, {
          status: 'done',
          type: 'bg-remove',
          mask: job.mask,   // base64 mask
          image: job.image, // base64 original
        });
      }
    }

    if (job.status === 'error') {
      return json(res, { status: 'error', error: job.error || 'Processing failed' });
    }

    // Still processing
    return json(res, { status: 'processing' });
  } catch (err) {
    console.error('[status] error:', err.message);
    return json(res, { error: 'Internal error' }, 500);
  }
}