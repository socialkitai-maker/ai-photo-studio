let redis = null;

function getRedis() {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('Upstash Redis not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
  }
  // Dynamic import to avoid crash at module load time
  return import('@upstash/redis').then(({ Redis }) => {
    redis = new Redis({ url, token });
    return redis;
  });
}

const JOB_TTL = 300; // 5 minutes

export async function createJob(jobId, data) {
  const r = await getRedis();
  await r.set(`job:${jobId}`, JSON.stringify(data), { ex: JOB_TTL });
}

export async function getJob(jobId) {
  const r = await getRedis();
  const raw = await r.get(`job:${jobId}`);
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export async function updateJob(jobId, data) {
  const r = await getRedis();
  await r.set(`job:${jobId}`, JSON.stringify(data), { ex: JOB_TTL });
}

export function generateJobId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
