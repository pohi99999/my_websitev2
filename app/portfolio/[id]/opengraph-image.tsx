import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Portfólió esettanulmány – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const knownProjects: Record<string, { title: string; emoji?: string }> = {
  '1': { title: 'E-commerce AI Személyesítési Platform', emoji: '🛍️' },
  '2': { title: 'Felhő Migrációs Projekt', emoji: '☁️' },
  '3': { title: 'AI Chatbot Platform', emoji: '🤖' },
};

export default function OpenGraphImage({ params }: { params: { id: string } }) {
  const id = params?.id ?? '';
  const project = knownProjects[id];
  const title = project?.title ?? `Portfólió esettanulmány #${id || '?'}`;
  const emoji = project?.emoji ?? '⭐';

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
            'radial-gradient(1200px 630px at 20% 12%, #22c55e 0%, rgba(34,197,94,0.0) 55%), radial-gradient(1200px 630px at 85% 85%, #0ea5e9 0%, rgba(14,165,233,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
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

        <div style={{ marginTop: 16, fontSize: 64, opacity: 0.9 }}>{emoji}</div>

        <div style={{ marginTop: 18, fontSize: 80, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          {title}
        </div>

        <div style={{ marginTop: 18, fontSize: 30, maxWidth: 980, lineHeight: 1.25, color: 'rgba(255,255,255,0.88)' }}>
          Eredmények, megközelítés és technológiai stack – valós üzleti hatással.
        </div>

        <div style={{ marginTop: 42, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Esettanulmány', 'Mérhető eredmények', 'AI', 'Automatizálás'].map((label) => (
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
