import { test, expect, type APIRequestContext } from '@playwright/test';

// From the live audit (card 0c1060b6, Lumen 5800/5806, Marveen 5809/5811/5819): on a phone the
// /portfolio LCP element was the 4.7 MB background video (6.8 s); the featured cards' titles skipped
// from h1 to h3; 14 pages showed the layout logo as twitter:image and 5 the generic /portfolio card;
// every blog post's share image said "Blog bejegyzés"; the privacy notice named the wrong court.

const PORTFOLIO = ['/portfolio', '/en/portfolio', '/de/portfolio'];
const SITE = 'https://www.pohankaestarsa.com';

for (const path of PORTFOLIO) {
  test(`phone: ${path} downloads no video, and the LCP is not the video`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const mp4: string[] = [];
    page.on('request', (r) => { if (/\.mp4(\?|$)/.test(r.url())) mp4.push(r.url()); });
    await page.addInitScript(() => {
      const w = window as Window & { __lcp?: string[] };
      w.__lcp = [];
      new PerformanceObserver((l) => {
        // the poster still counts as the <video> element's paint, so the resource tells them apart
        for (const e of l.getEntries() as (PerformanceEntry & { url?: string })[]) w.__lcp!.push(e.url || 'text');
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    const poster: number[] = [];
    page.on('response', (r) => { if (r.url().includes('/images/portfolio-poster.webp')) poster.push(r.status()); });
    await page.goto(path, { waitUntil: 'load' });
    // the layout's background video starts after load, in an idle moment
    await page.waitForTimeout(3000);
    expect(mp4).toEqual([]);
    expect(poster).toContain(200);
    const lcp = await page.evaluate(() => (window as Window & { __lcp?: string[] }).__lcp ?? []);
    expect(lcp.length).toBeGreaterThan(0);
    expect(lcp.at(-1)).not.toMatch(/\.mp4(\?|$)/);
    await ctx.close();
  });
}

test('desktop: /portfolio keeps its background video', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const mp4 = page.waitForRequest((r) => r.url().includes('/portfolio.mp4'));
  await page.goto('/portfolio', { waitUntil: 'load' });
  expect((await mp4).url()).toContain('/portfolio.mp4');
  await ctx.close();
});

for (const path of PORTFOLIO) {
  test(`heading levels never skip one: ${path}`, async ({ page }) => {
    await page.goto(path);
    const levels = await page.evaluate(() => [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1])));
    expect(levels[0]).toBe(1);
    const skips = levels.flatMap((l, i) => (i && l > levels[i - 1] + 1 ? [`h${levels[i - 1]} -> h${l} at #${i}`] : []));
    expect(skips).toEqual([]);
  });
}

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

test('twitter:image loads, is never the logo, and follows og:image', async ({ request }) => {
  test.setTimeout(120_000);
  const bad: string[] = [];
  for (const path of await sitemapPaths(request)) {
    const html = await (await request.get(path)).text();
    const tw = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (!tw) { bad.push(`${path}: no twitter:image`); continue; }
    if (tw.endsWith('/images/logo.png')) { bad.push(`${path}: logo`); continue; }
    const img = await request.get(new URL(tw, SITE).pathname + new URL(tw, SITE).search, { maxRedirects: 0 });
    if (img.status() !== 200 || !(img.headers()['content-type'] ?? '').startsWith('image/')) bad.push(`${path}: twitter:image ${img.status()}`);
    if (tw === og) continue;
    if (!og) continue; // nothing to follow (the Zalaegerszeg page gets its og:image in #172)
    // a segment's own pair of generated images (twitter-image.tsx next to opengraph-image.tsx, 1200x600 vs 1200x630)
    const twFile = new URL(tw, SITE).pathname.replace(/\/twitter-image$/, '/opengraph-image');
    if (og && twFile === new URL(og, SITE).pathname) continue;
    bad.push(`${path}: twitter ${tw} vs og ${og}`);
  }
  expect(bad).toEqual([]);
});

test('each blog post\'s share images draw its own title, not the fallback', async ({ request }) => {
  // the image is a PNG: two posts with different titles must give different bytes (with the slug lost,
  // both drew the same "Blog bejegyzés" card)
  for (const kind of ['opengraph-image', 'twitter-image']) {
    const [a, b] = await Promise.all(['brunella-mi-csapatvezeto', 'folyamat-automatizalas-5-lepes'].map(async (slug) => {
      const res = await request.get(`/blog/${slug}/${kind}`);
      expect(res.status(), `${slug} ${kind}`).toBe(200);
      return res.body();
    }));
    expect(Buffer.compare(a, b), kind).not.toBe(0);
  }
});

test('the privacy notice names the registry court as the imprint does', async ({ page }) => {
  await page.goto('/adatvedelmi-nyilatkozat');
  await expect(page.locator('body')).toContainText('20-09-069482 (Zalaegerszegi Törvényszék Cégbírósága)');
  await expect(page.locator('body')).not.toContainText('Zala Vármegyei Törvényszék');
});
