import { renderBrandImage } from './_og/brand';

export const runtime = 'edge';
export const alt = 'Pohánka AI – AI Ügynökség & Szoftverfejlesztés';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return renderBrandImage({
    size,
    theme: 'core',
    title: 'AI Ügynökség',
    description: 'AI automatizálás és egyedi fejlesztés KKV-k számára.'
  });
}
