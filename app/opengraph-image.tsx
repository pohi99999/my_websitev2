import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pohánka AI – AI Ügynökség & Szoftverfejlesztés';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
            'radial-gradient(1200px 630px at 20% 10%, #2563eb 0%, rgba(37,99,235,0.0) 55%), radial-gradient(1200px 630px at 85% 85%, #a855f7 0%, rgba(168,85,247,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.92, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(168,85,247,0.9) 100%)'
            }}
          />
          <div style={{ fontWeight: 600 }}>Pohánka AI</div>
        </div>

        <div style={{ marginTop: 26, fontSize: 86, fontWeight: 800, letterSpacing: -2 }}>AI Ügynökség</div>

        <div
          style={{
            marginTop: 18,
            fontSize: 32,
            maxWidth: 980,
            lineHeight: 1.25,
            color: 'rgba(255,255,255,0.88)'
          }}
        >
          Innováció és mesterséges intelligencia – üzleti automatizálás, ügynökrendszerek, szoftverfejlesztés.
        </div>

        <div style={{ marginTop: 42, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Brunella Agents', 'Automatizálás', 'Szoftverfejlesztés', 'Human-in-the-loop'].map((label) => (
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
