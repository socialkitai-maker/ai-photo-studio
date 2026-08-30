import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://aiphotostudio.vercel.app';

/**
 * PageMeta — drop-in component for per-route <head> metadata.
 *
 * @param {string}  title       — <title> tag content
 * @param {string}  description — meta description
 * @param {string}  canonical   — path (e.g. "/tools"), will be prefixed with BASE_URL
 * @param {object}  jsonLd      — optional JSON-LD structured data object (or array of objects)
 */
export function PageMeta({ title, description, canonical, jsonLd }) {
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default PageMeta;
