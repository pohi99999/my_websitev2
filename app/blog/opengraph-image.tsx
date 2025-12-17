import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Blog & Tudástár – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderBrandImage({
    size,
    theme: 'blog',
    title: 'Blog & Tudástár',
    description: 'Cikkek, white paper anyagok, technológia és a Brunella Agent System kulisszatitkai.',
    tags: ['AI ügynökök', 'Automatizálás', 'Filozófia', 'Tech mélyfúrás']
  });
}
