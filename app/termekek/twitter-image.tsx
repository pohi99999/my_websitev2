import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Termékek – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return renderBrandImage({
    size,
    theme: 'products',
    title: 'Termékek',
    description: 'AI termékek és platformok KKV-knek.'
  });
}
