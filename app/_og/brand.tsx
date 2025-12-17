import { ImageResponse } from 'next/og';
import { getInterFont } from './fonts';

export type BrandTheme = 'core' | 'blog' | 'portfolio' | 'products' | 'brunella';

type BrandImageOptions = {
  size: { width: number; height: number };
  theme: BrandTheme;
  eyebrow?: string;
  kicker?: string;
  title: string;
  description?: string;
  tags?: string[];
};

const THEMES: Record<BrandTheme, { a: string; b: string; label: string; badge: string }> = {
  core: {
    a: '#2563eb',
    b: '#a855f7',
    label: 'Pohánka AI',
    badge: 'linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(168,85,247,0.9) 100%)'
  },
  blog: {
    a: '#0ea5e9',
    b: '#ec4899',
    label: 'Pohánka AI · Blog',
    badge: 'linear-gradient(135deg, rgba(14,165,233,0.9) 0%, rgba(236,72,153,0.9) 100%)'
  },
  portfolio: {
    a: '#22c55e',
    b: '#0ea5e9',
    label: 'Pohánka AI · Portfólió',
    badge: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(14,165,233,0.9) 100%)'
  },
  products: {
    a: '#6366f1',
    b: '#22c55e',
    label: 'Pohánka AI · Termékek',
    badge: 'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(34,197,94,0.9) 100%)'
  },
  brunella: {
    a: '#a855f7',
    b: '#0ea5e9',
    label: 'Brunella Agents',
    badge: 'linear-gradient(135deg, rgba(168,85,247,0.9) 0%, rgba(14,165,233,0.9) 100%)'
  }
};

export async function renderBrandImage({ size, theme, eyebrow, kicker, title, description, tags }: BrandImageOptions) {
  const t = THEMES[theme];
  const isTwitter = size.height <= 600;

  const inter500 = await getInterFont(500);
  const inter800 = await getInterFont(800);

  const pad = 72;

  const titleSize = isTwitter ? 78 : 82;
  const descSize = isTwitter ? 28 : 30;

  const titleClamp = isTwitter ? 3 : 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${pad}px`,
          background: `radial-gradient(${size.width}px ${size.height}px at 18% 12%, ${t.a} 0%, rgba(0,0,0,0) 55%), radial-gradient(${size.width}px ${size.height}px at 86% 86%, ${t.b} 0%, rgba(0,0,0,0) 55%), linear-gradient(135deg, #05060a 0%, #070814 55%, #05060a 100%)`,
          color: '#ffffff',
          fontFamily: 'Inter'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: 0.94, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: t.badge,
              boxShadow: '0 18px 40px rgba(0,0,0,0.35)'
            }}
          />
          <div style={{ fontWeight: 700 }}>{t.label}</div>
        </div>

        {(eyebrow || kicker) && (
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              flexWrap: 'wrap',
              color: 'rgba(255,255,255,0.78)',
              fontSize: 24
            }}
          >
            {eyebrow && <div style={{ fontWeight: 500 }}>{eyebrow}</div>}
            {eyebrow && kicker && <div style={{ opacity: 0.5 }}>·</div>}
            {kicker && <div style={{ fontWeight: 500 }}>{kicker}</div>}
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            fontSize: titleSize,
            fontWeight: 800,
            letterSpacing: -2.2,
            lineHeight: 1.05,
            maxWidth: 1040,
            display: '-webkit-box',
            WebkitLineClamp: titleClamp,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              marginTop: 18,
              fontSize: descSize,
              maxWidth: 980,
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.88)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {description}
          </div>
        )}

        {!!tags?.length && (
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {tags.slice(0, 6).map((label) => (
              <div
                key={label}
                style={{
                  fontSize: 22,
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.92)'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            left: pad,
            bottom: 42,
            fontSize: 18,
            color: 'rgba(255,255,255,0.55)'
          }}
        >
          pohanka.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: inter500, style: 'normal', weight: 500 },
        { name: 'Inter', data: inter800, style: 'normal', weight: 800 }
      ]
    }
  );
}
