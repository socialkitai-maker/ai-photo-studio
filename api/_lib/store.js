import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const JOB_TTL = 300; // 5 minutes

export async function createJob(jobId, data) {
  await redis.set(`job:${jobId}`, JSON.stringify(data), { ex: JOB_TTL });
}

export async function getJob(jobId) {
  const raw = await redis.get(`job:${jobId}`);
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export async function updateJob(jobId, data) {
  await redis.set(`job:${jobId}`, JSON.stringify(data), { ex: JOB_TTL });
}

export function generateJobId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
