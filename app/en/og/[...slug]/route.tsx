// Localized share image for /en URLs (referenced from the catch-all's metadata). Under /en the
// middleware sets x-site-language, so the page's own generateMetadata answers in this language.
// "index" is the home page. Unknown URLs get the plain brand image, never an error page.
import { renderBrandImage, type BrandTheme } from '../../../_og/brand';
import { pageMetadataFor, titleText } from '../../../lib/localizedRouteMeta';

const size = { width: 1200, height: 630 };

function themeFor(slug: string[]): BrandTheme {
  if (slug[0] === 'portfolio' && slug[1] === 'brunella-bas') return 'brunella';
  if (slug[0] === 'blog') return 'blog';
  if (slug[0] === 'portfolio') return 'portfolio';
  if (slug[0] === 'termekek') return 'products';
  return 'core';
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const raw = (await params).slug ?? [];
  const slug = raw.length === 1 && raw[0] === 'index' ? [] : raw;
  const meta = await pageMetadataFor(slug);
  const title = titleText(meta?.title).replace(/\s*\|\s*Pohánka AI.*$/, '') || 'Pohánka AI';
  const description = typeof meta?.description === 'string' ? meta.description : undefined;
  return renderBrandImage({ size, theme: themeFor(slug), kicker: 'Pohánka AI', title, description });
}
