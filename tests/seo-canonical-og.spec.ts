import { test, expect, type APIRequestContext } from '@playwright/test';

// Technical SEO audit (card 0c1060b6, Marveen 5799/5804): every indexable page names itself as the
// canonical URL, and every sitemap page has a share image that loads. Two pages failed this on
// bd47452: /impresszum inherited the layout's canonical (the home page), and
// /weboldal-keszites-zalaegerszeg lost the share image to its own openGraph block.

const SITE = 'https://www.pohankaestarsa.com';
// indexable and linked from the footer, but kept out of the sitemap (023ffcc)
const LEGAL = ['/impresszum', '/adatvedelmi-nyilatkozat', '/aszf'].flatMap((p) => [p, `/en${p}`, `/de${p}`]);

// the home page is https://www.pohankaestarsa.com with or without the slash: the same URL
const same = (u: string) => (u === SITE ? `${SITE}/` : u);

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(50);
  return locs.map((l) => new URL(l).pathname);
}

const attr = (html: string, re: RegExp) => [...html.matchAll(re)].map((m) => m[1].replace(/&amp;/g, '&'));

test('every sitemap page and every legal page is its own canonical URL', async ({ request }) => {
  test.setTimeout(120_000);
  const bad: string[] = [];
  for (const path of [...(await sitemapPaths(request)), ...LEGAL]) {
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() !== 200) { bad.push(`${path}: ${res.status()}`); continue; }
    const canonical = attr(await res.text(), /<link rel="canonical" href="([^"]+)"/g);
    if (canonical.length !== 1 || same(canonical[0]) !== same(SITE + path)) bad.push(`${path}: canonical ${JSON.stringify(canonical)}`);
  }
  expect(bad).toEqual([]);
});

test('every sitemap page has a share image, and the image loads', async ({ request }) => {
  test.setTimeout(180_000);
  const bad: string[] = [];
  const images = new Map<string, string[]>();
  for (const path of await sitemapPaths(request)) {
    const og = attr(await (await request.get(path)).text(), /<meta property="og:image" content="([^"]+)"/g);
    if (!og.length) { bad.push(`${path}: no og:image`); continue; }
    const url = new URL(og[0], SITE);
    if (url.origin !== SITE) { bad.push(`${path}: og:image on ${url.origin}`); continue; }
    images.set(url.pathname, [...(images.get(url.pathname) ?? []), path]);
  }
  // each image once
  for (const [img, pages] of images) {
    const res = await request.get(img, { maxRedirects: 0 });
    const type = res.headers()['content-type'] ?? '';
    if (res.status() !== 200 || !type.startsWith('image/')) bad.push(`${img} (${pages[0]}): ${res.status()} ${type}`);
  }
  expect(bad).toEqual([]);
});
