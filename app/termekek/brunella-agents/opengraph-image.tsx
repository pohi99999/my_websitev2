import { renderBrandImage } from '../../_og/brand';

export const runtime = 'edge';
export const alt = 'Brunella Agent System – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderBrandImage({
    size,
    theme: 'brunella',
    eyebrow: 'Pohánka AI · Termék',
    title: 'Brunella Agent System',
    description: 'Autonóm AI ügynökök KKV-k számára – automatizálás, monitorozás és human-in-the-loop kontroll.',
    tags: ['OCR → JSON', 'Agent Collaboration', 'Business Workflow', 'Safety & Control']
  });
}
