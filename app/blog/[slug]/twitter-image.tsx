import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog bejegyzés – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

const knownTitles: Record<string, string> = {
  'brunella-strategiai-white-paper': 'A Brunella-Dosszié (White Paper)',
  'bevezeto-a-mesterseges-intelligencia-vilagaba': 'Bevezető az MI Világába',
  'digitalis-lenyomat-anatomiaja': 'A Digitális Lenye-mat',
  'brunella-mi-csapatvezeto': 'Brunella: Az MI csapatvezető',
  'fekete-doboz-vege-glass-box': 'A "Fekete Doboz" Korszak Vége',
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

export default function TwitterImage({ params }: { params: { slug: string } }) {
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
            'radial-gradient(1100px 600px at 18% 12%, #0ea5e9 0%, rgba(14,165,233,0.0) 55%), radial-gradient(1100px 600px at 86% 86%, #ec4899 0%, rgba(236,72,153,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
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

        <div style={{ marginTop: 26, fontSize: 78, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          {title}
        </div>

        <div style={{ marginTop: 18, fontSize: 28, maxWidth: 980, lineHeight: 1.25, color: 'rgba(255,255,255,0.88)' }}>
          Tudástár AI ügynökökről és automatizálásról.
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
