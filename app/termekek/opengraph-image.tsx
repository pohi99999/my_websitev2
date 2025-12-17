import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Termékek – Pohánka AI';
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
            'radial-gradient(1200px 630px at 20% 10%, #6d28d9 0%, rgba(109,40,217,0.0) 55%), radial-gradient(1200px 630px at 85% 85%, #06b6d4 0%, rgba(6,182,212,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.92, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(6,182,212,0.9) 100%)'
            }}
          />
          <div style={{ fontWeight: 600 }}>Pohánka AI</div>
        </div>

        <div style={{ marginTop: 26, fontSize: 86, fontWeight: 800, letterSpacing: -2 }}>Termékek</div>

        <div
          style={{
            marginTop: 18,
            fontSize: 32,
            maxWidth: 980,
            lineHeight: 1.25,
            color: 'rgba(255,255,255,0.88)'
          }}
        >
          Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások KKV-k számára.
        </div>

        <div style={{ marginTop: 42, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Brunella Agents', 'Pohi AI Pro', 'Automatizálás', 'AI platformok'].map((label) => (
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
