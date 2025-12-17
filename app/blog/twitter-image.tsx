import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Blog & Tudástár – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return renderBrandImage({
    size,
    theme: 'blog',
    title: 'Blog & Tudástár',
    description: 'Tudásanyagok AI ügynökökről és automatizálásról.'
  });
}
