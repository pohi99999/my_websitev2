import { renderBrandImage } from '../_og/brand';

export const runtime = 'edge';
export const alt = 'Termékek – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderBrandImage({
    size,
    theme: 'products',
    title: 'Termékek',
    description: 'Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások KKV-k számára.',
    tags: ['Brunella Agents', 'Pohi AI Pro', 'Automatizálás', 'AI platformok']
  });
}
