import { test, expect, type APIRequestContext } from '@playwright/test';

// Follow-up to #174 (card 0c1060b6, Marveen 5839/5845): the portfolio subpages keep the 4.7 MB video off
// phones too; no "Details" link points to "#"; and no page puts a second <main> inside the layout's #main-content.

const SUBPAGES = ['/portfolio/brunella-bas', '/portfolio/pohi-ai-pro', '/portfolio/web-robotpilota', '/en/portfolio/palyazat-radar', '/de/portfolio/tartalom-gyartas'];

for (const path of SUBPAGES) {
  test(`phone: ${path} downloads no video`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const mp4: string[] = [];
    page.on('request', (r) => { if (/\.mp4(\?|$)/.test(r.url())) mp4.push(r.url()); });
    await page.goto(path, { waitUntil: 'load' });
    // the layout's background video starts after load, in an idle moment
    await page.waitForTimeout(3000);
    expect(mp4).toEqual([]);
    await ctx.close();
  });
}

test('desktop: a portfolio subpage keeps its background video', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const mp4 = page.waitForRequest((r) => r.url().includes('/portfolio.mp4'));
  await page.goto('/portfolio/brunella-bas', { waitUntil: 'load' });
  expect((await mp4).url()).toContain('/portfolio.mp4');
  await ctx.close();
});

// The invented case studies (/portfolio/1, 2, 3) are gone (Marveen 8389, Péter 17433): they answer 404 in
// every language, their share images too, and no page links to them.
test('the removed case studies answer 404', async ({ request }) => {
  const paths = ['1', '2', '3'].flatMap((id) => [`/portfolio/${id}`, `/en/portfolio/${id}`, `/de/portfolio/${id}`,
    `/portfolio/${id}/opengraph-image`, `/portfolio/${id}/twitter-image`]);
  const bad: string[] = [];
  for (const path of paths) {
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() !== 404) bad.push(`${path}: ${res.status()}`);
  }
  expect(bad).toEqual([]);
});

test('the real case studies still answer 200', async ({ request }) => {
  for (const path of ['/portfolio/web-robotpilota', '/en/portfolio/palyazat-radar', '/de/portfolio/tartalom-gyartas']) {
    expect((await request.get(path, { maxRedirects: 0 })).status(), path).toBe(200);
  }
});

for (const path of ['/portfolio', '/en/portfolio', '/de/portfolio']) {
  test(`${path}: no link points to "#"`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#portfolio a[href="#"]')).toHaveCount(0);
  });
}

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

test('every page has exactly one <main>', async ({ request }) => {
  test.setTimeout(120_000);
  // /aszf, /en/aszf and /de/aszf lose their second <main> with #176 (the ÁSZF PR), not here
  const legal = ['/impresszum', '/adatvedelmi-nyilatkozat'].flatMap((p) => [p, `/en${p}`, `/de${p}`]);
  const bad: string[] = [];
  for (const path of [...new Set([...(await sitemapPaths(request)), ...legal, '/p-search/adatvedelem', '/en/p-search/privacy'])]) {
    const res = await request.get(path);
    if (res.status() !== 200) { bad.push(`${path}: ${res.status()}`); continue; }
    const n = ((await res.text()).match(/<main[\s>]/g) ?? []).length;
    if (n !== 1) bad.push(`${path}: ${n} <main>`);
  }
  expect(bad).toEqual([]);
});
