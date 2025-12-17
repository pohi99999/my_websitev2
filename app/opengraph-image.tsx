import { renderBrandImage } from './_og/brand';

export const runtime = 'edge';
export const alt = 'Pohánka AI – AI Ügynökség & Szoftverfejlesztés';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderBrandImage({
    size,
    theme: 'core',
    title: 'AI Ügynökség',
    description: 'Innováció és mesterséges intelligencia – üzleti automatizálás, ügynökrendszerek, szoftverfejlesztés.',
    tags: ['Brunella Agents', 'Automatizálás', 'Szoftverfejlesztés', 'Human-in-the-loop']
  });
}
