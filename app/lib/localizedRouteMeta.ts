// Metadata for the /en and /de catch-all routes. Each page already has its own generateMetadata
// that reads x-site-language (set by middleware from the path) and returns a language-correct
// title, description, canonical and hreflang set; the catch-alls used to ignore it and gave every
// subpage a generic "Portfolio Project | Pohánka AI" with logo.png. Here the catch-all asks the
// target page instead, and only falls back to its own map where the page has no localized metadata
// (the legal pages) or the URL is unknown.
import type { Metadata } from 'next';
import { generateMetadata as homeMeta } from '../page';
import { generateMetadata as termekekMeta } from '../termekek/page';
import { generateMetadata as kapcsolatMeta } from '../kapcsolat/page';
import { generateMetadata as szolgaltatasokMeta } from '../szolgaltatasok/page';
import { generateMetadata as portfolioMeta } from '../portfolio/page';
import { generateMetadata as portfolioIdMeta } from '../portfolio/[id]/page';
import { generateMetadata as blogMeta } from '../blog/page';
import { generateMetadata as blogPostMeta } from '../blog/[slug]/page';
import { generateMetadata as rolunkMeta } from '../rolunk/page';
import { generateMetadata as fogalomtarMeta } from '../fogalomtar/page';
import { generateMetadata as termekPohiAiProMeta } from '../termekek/pohi-ai-pro/page';
import { generateMetadata as weboldalAiKkvMeta } from '../weboldal-ai-kkv/page';
import { generateMetadata as hatekonysagiAuditMeta } from '../hatekonysagi-audit/page';
import { generateMetadata as brunellaBasMeta } from '../portfolio/brunella-bas/page';
import { generateMetadata as portfolioPohiAiProMeta } from '../portfolio/pohi-ai-pro/page';
import { generateMetadata as tartalomGyartasMeta } from '../portfolio/tartalom-gyartas/page';
import { generateMetadata as webRobotpilotaMeta } from '../portfolio/web-robotpilota/page';
import { generateMetadata as palyazatRadarMeta } from '../portfolio/palyazat-radar/page';

const SITE_URL = 'https://www.pohankaestarsa.com';

type MetaFn = (args: { params: Promise<Record<string, string>> }) => Promise<Metadata> | Metadata;

const SINGLE: Record<string, MetaFn> = {
  termekek: termekekMeta,
  kapcsolat: kapcsolatMeta,
  szolgaltatasok: szolgaltatasokMeta,
  portfolio: portfolioMeta,
  blog: blogMeta,
  rolunk: rolunkMeta,
  fogalomtar: fogalomtarMeta,
  'weboldal-ai-kkv': weboldalAiKkvMeta,
  'hatekonysagi-audit': hatekonysagiAuditMeta,
};

const PORTFOLIO_PAGES: Record<string, MetaFn> = {
  'brunella-bas': brunellaBasMeta,
  'pohi-ai-pro': portfolioPohiAiProMeta,
  'tartalom-gyartas': tartalomGyartasMeta,
  'web-robotpilota': webRobotpilotaMeta,
  'palyazat-radar': palyazatRadarMeta,
};

function targetFor(slug: string[]): { fn: MetaFn; params: Record<string, string> } | null {
  if (slug.length === 0) return { fn: homeMeta, params: {} };
  if (slug.length === 1) return SINGLE[slug[0]] ? { fn: SINGLE[slug[0]], params: {} } : null;
  if (slug.length === 2) {
    if (slug[0] === 'termekek' && slug[1] === 'pohi-ai-pro') return { fn: termekPohiAiProMeta, params: {} };
    if (slug[0] === 'blog') return { fn: blogPostMeta, params: { slug: slug[1] } };
    if (slug[0] === 'portfolio') {
      const fixed = PORTFOLIO_PAGES[slug[1]];
      return fixed ? { fn: fixed, params: {} } : { fn: portfolioIdMeta, params: { id: slug[1] } };
    }
  }
  return null;
}

// The page's own metadata, or null when the page has none for this URL.
export async function pageMetadataFor(slug: string[]): Promise<Metadata | null> {
  const target = targetFor(slug);
  if (!target) return null;
  try {
    const m = await target.fn({ params: Promise.resolve(target.params) });
    return m && m.title ? m : null;
  } catch {
    return null;
  }
}

export function titleText(title: Metadata['title']): string {
  if (!title) return '';
  if (typeof title === 'string') return title;
  const t = title as { absolute?: string; default?: string };
  return t.absolute ?? t.default ?? '';
}

// The localized share image of one /en or /de URL (served by app/<lang>/og/[...slug]/route.tsx;
// "index" stands for the home page because a required catch-all cannot be empty).
export function localizedOgImagePath(slug: string[], lang: 'en' | 'de'): string {
  return `/${lang}/og/${slug.length ? slug.join('/') : 'index'}`;
}

function withOgImage(m: Metadata, slug: string[], lang: 'en' | 'de'): Metadata {
  const og = (m.openGraph ?? {}) as Record<string, unknown>;
  const imgs = ([] as unknown[]).concat(og.images ?? []);
  const realImage = imgs.some((i) => !/\/images\/logo\.png/.test(typeof i === 'string' ? i : String((i as { url?: unknown })?.url ?? '')));
  if (realImage) return m;
  const image = { url: localizedOgImagePath(slug, lang), width: 1200, height: 630, alt: titleText(m.title) || 'Pohánka AI' };
  return { ...m, openGraph: { ...og, images: [image] }, twitter: { ...(m.twitter ?? {}), images: [image.url] } };
}

// Metadata for one /en or /de URL: the page's own when it has it, else the catch-all's fallback.
export async function localizedMetadata(slug: string[], lang: 'en' | 'de', fallback: Metadata): Promise<Metadata> {
  const m = await pageMetadataFor(slug);
  if (!m) return withOgImage(fallback, slug, lang);
  const huPath = slug.length ? `/${slug.join('/')}` : '/';
  const langPath = `/${lang}${huPath === '/' ? '' : huPath}`;
  const og = (m.openGraph ?? {}) as Record<string, unknown>;
  return withOgImage({
    metadataBase: new URL(SITE_URL),
    ...m,
    openGraph: {
      ...og,
      title: (og.title as string | undefined) ?? titleText(m.title),
      description: (og.description as string | undefined) ?? (m.description ?? undefined),
      url: (og.url as string | undefined) ?? langPath,
      locale: (og.locale as string | undefined) ?? (lang === 'en' ? 'en_US' : 'de_DE'),
      siteName: (og.siteName as string | undefined) ?? 'Pohánka és Társa',
    },
  }, slug, lang);
}
