import { getBlogPostMeta } from '../blogPosts.meta';
import { renderBrandImage } from '../../_og/brand';

export const runtime = 'edge';
export const alt = 'Blog bejegyzés – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function titleFromSlug(slug: string) {
  const decoded = decodeURIComponent(slug || '').replace(/-/g, ' ').trim();
  if (!decoded) return 'Blog bejegyzés';
  return decoded
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export default function OpenGraphImage({ params }: { params: { slug: string } }) {
  const slug = params?.slug ?? '';
  const meta = getBlogPostMeta(slug);
  const title = meta?.title ?? titleFromSlug(slug);
  const subtitle = meta ? `${meta.category} · ${meta.date}` : 'Pohánka AI Blog';

  return renderBrandImage({
    size,
    theme: 'blog',
    title,
    kicker: subtitle,
    tags: ['AI ügynökök', 'Automatizálás', 'Glass Box', 'Gyakorlat']
  });
}
