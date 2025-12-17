import { ImageResponse } from 'next/og';
import { getPortfolioProjectMeta } from '../projects.meta';

export const runtime = 'edge';
export const alt = 'Portfólió esettanulmány – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage({ params }: { params: { id: string } }) {
  const id = params?.id ?? '';
  const meta = getPortfolioProjectMeta(id);
  const title = meta?.title ?? `Portfólió esettanulmány #${id || '?'}`;
  const emoji = meta?.emoji ?? '⭐';
  const subtitle = meta?.industry ? `Iparág: ${meta.industry}` : 'Pohánka AI · Portfólió';
  const description = meta?.description ?? 'Projektek és esettanulmányok – mérhető üzleti hatással.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background:
            'radial-gradient(1100px 600px at 20% 12%, #22c55e 0%, rgba(34,197,94,0.0) 55%), radial-gradient(1100px 600px at 86% 86%, #0ea5e9 0%, rgba(14,165,233,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.92, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(14,165,233,0.9) 100%)'
            }}
          />
          <div style={{ fontWeight: 600 }}>Pohánka AI · Portfólió</div>
        </div>

        <div style={{ marginTop: 14, fontSize: 60, opacity: 0.9 }}>{emoji}</div>

        <div style={{ marginTop: 10, fontSize: 24, color: 'rgba(255,255,255,0.75)' }}>{subtitle}</div>

        <div style={{ marginTop: 18, fontSize: 82, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>

        <div style={{ marginTop: 18, fontSize: 28, maxWidth: 980, lineHeight: 1.25, color: 'rgba(255,255,255,0.88)' }}>{description}</div>

        <div style={{ marginTop: 42, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Esettanulmány', 'Portfólió', 'AI', 'Automatizálás'].map((label) => (
            <div
              key={label}
              style={{
                fontSize: 22,
                padding: '10px 16px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)'
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
