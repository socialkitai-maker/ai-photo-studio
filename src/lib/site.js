export const SITE_URL = 'https://aiphotostudio.vercel.app';

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}