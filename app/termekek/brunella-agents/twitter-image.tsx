import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Brunella Agent System – Pohánka AI';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';

export default function TwitterImage() {
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
          background: 'radial-gradient(1100px 600px at 18% 10%, #6d28d9 0%, rgba(109,40,217,0.0) 55%), radial-gradient(1100px 600px at 86% 86%, #06b6d4 0%, rgba(6,182,212,0.0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)',
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

        <div style={{ marginTop: 26, fontSize: 82, fontWeight: 800, letterSpacing: -2 }}>
          Brunella Agent System
        </div>

        <div style={{ marginTop: 18, fontSize: 30, maxWidth: 980, lineHeight: 1.25, color: 'rgba(255,255,255,0.88)' }}>
          Autonóm AI ügynökök KKV-k számára – automatizálás és üzleti workflow-k.
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
