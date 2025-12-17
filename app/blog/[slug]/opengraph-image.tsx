import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog bejegyzés – Pohánka AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const knownTitles: Record<string, string> = {
  'brunella-strategiai-white-paper': 'A Brunella-Dosszié: Stratégia, Technológia és a Jövő Ügynökei',
  'bevezeto-a-mesterseges-intelligencia-vilagaba': 'Bevezető a Mesterséges Intelligencia Világába',
  'digitalis-lenyomat-anatomiaja': 'A Digitális Lenye-mat: Egy MI Partner Szemével',
  'brunella-mi-csapatvezeto': 'Brunella: Az MI csapatvezető és a jövő szervezete',
  'fekete-doboz-vege-glass-box': 'A "Fekete Doboz" Korszak Vége: Glass Box a Jövő',
  'az-ido-a-legertekesebb-valuta': 'Az IDŐ: A Legértékesebb Valuta',
  'brunella-agent-system-mukodese': 'Hogyan működik a BAS?',
};

function titleFromSlug(slug: string) {
  const decoded = decodeURIComponent(slug || '').replace(/-/g, ' ').trim();
  if (!decoded) return 'Blog bejegyzés';
  return decoded
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export default function OpenGraphImage({ params }: { params: { slug: string } }) {
  const slug = params?.slug ?? '';
  const title = knownTitles[slug] ?? titleFromSlug(slug);

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
            'radial-gradient(1200px 630px at 18% 12%, #0ea5e9 0%, rgba(14,165,233,0.0) 55%), radial-gradient(1200px 630px at 85% 85%, #ec4899 0%, rgba(236,72,153,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.92, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(14,165,233,0.9) 0%, rgba(236,72,153,0.9) 100%)'
            }}
          />
          <div style={{ fontWeight: 600 }}>Pohánka AI · Blog</div>
        </div>

        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          {title}
        </div>

        <div style={{ marginTop: 20, fontSize: 30, maxWidth: 980, lineHeight: 1.25, color: 'rgba(255,255,255,0.88)' }}>
          Tudástár AI ügynökökről, automatizálásról és a Brunella Agent Systemről.
        </div>

        <div style={{ marginTop: 42, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['AI ügynökök', 'Automatizálás', 'Glass Box', 'Gyakorlat'].map((label) => (
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
