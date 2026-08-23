import { getJob } from './_lib/store.js';

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(request) {
  const url = new URL(request.url);
  const jobId = url.searchParams.get('jobId');

  if (!jobId) {
    return json({ error: 'Missing jobId parameter' }, 400);
  }

  try {
    const job = await getJob(jobId);

    if (!job) {
      return json({ status: 'not_found', error: 'Job not found or expired' }, 404);
    }

    if (job.status === 'done') {
      // Return result and clean up
      if (job.type === 'upscale') {
        return json({
          status: 'done',
          type: 'upscale',
          result: job.result, // base64 image
        });
      }

      if (job.type === 'bg-remove') {
        return json({
          status: 'done',
          type: 'bg-remove',
          mask: job.mask,   // base64 mask
          image: job.image, // base64 original
        });
      }
    }

    if (job.status === 'error') {
      return json({ status: 'error', error: job.error || 'Processing failed' });
    }

    // Still processing
    return json({ status: 'processing' });
  } catch (err) {
    console.error('[status] error:', err.message);
    return json({ error: 'Internal error' }, 500);
  }
}
