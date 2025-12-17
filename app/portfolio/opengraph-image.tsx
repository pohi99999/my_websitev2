import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Portfólió – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderBrandImage({
    size,
    theme: 'portfolio',
    title: 'Portfólió',
    description: 'Kiemelt projektek és esettanulmányok: AI, automatizálás, webfejlesztés és üzleti rendszerek.',
    tags: ['Esettanulmányok', 'Automatizálás', 'AI', 'Web & rendszerek']
  });
}
