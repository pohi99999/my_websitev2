import { getPortfolioProjectMeta } from '../projects.meta';
import { renderBrandImage } from '../../_og/brand';

export const runtime = 'edge';
export const alt = 'Portfólió esettanulmány – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

// Next 16 passes params as a Promise (as in app/blog/[slug]): read synchronously, the id was undefined
export default async function TwitterImage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params)?.id ?? '';
  const meta = getPortfolioProjectMeta(id);
  const title = meta?.title ?? `Portfólió esettanulmány #${id || '?'}`;
  const emoji = meta?.emoji ?? '⭐';
  const subtitle = meta?.industry ? `Iparág: ${meta.industry}` : 'Pohánka AI · Portfólió';
  const description = meta?.description ?? 'Projektek és esettanulmányok – mérhető üzleti hatással.';

  return renderBrandImage({
    size,
    theme: 'portfolio',
    kicker: subtitle,
    title: `${emoji} ${title}`,
    description,
    tags: ['Esettanulmány', 'Portfólió', 'AI', 'Automatizálás']
  });
}
