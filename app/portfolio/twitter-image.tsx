import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Portfólió – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return renderBrandImage({
    size,
    theme: 'portfolio',
    title: 'Portfólió',
    description: 'Projektek és esettanulmányok.'
  });
}
