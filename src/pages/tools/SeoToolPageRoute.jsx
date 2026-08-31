import { useParams } from 'react-router-dom';
import SeoToolPage from './SeoToolPage';
import seoToolPages from '../../lib/seo-tool-pages';

export default function SeoToolPageRoute() {
  const { slug } = useParams();
  const page = seoToolPages.find((p) => p.path === `/tools/${slug}`);
  if (!page) return null;
  return <SeoToolPage page={page} />;
}
