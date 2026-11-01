import { test, expect, type Page, type APIRequestContext } from '@playwright/test';

// /labor (card 0c1060b6): the 3D showcase on its own page. The page must be complete without the 3D
// layer, the scene may load only on capable desktops, and none of its code may reach the homepage
// (Lumen 5785: twice the /en and /de homepage JS grew because the catch-all imported the page).

const LANGS = [
  { path: '/labor', h1: 'Négy modul,', more: 'Részletek', titles: ['Weboldal és foglalás', 'Folyamat-automatizálás', 'Web- és mobilalkalmazás', 'AI-csapat (Brunella)'] },
  { path: '/en/labor', h1: 'Four modules,', more: 'Details', titles: ['Website and booking', 'Workflow automation', 'Web and mobile apps', 'AI team (Brunella)'] },
  { path: '/de/labor', h1: 'Vier Module,', more: 'Details', titles: ['Website und Buchung', 'Prozessautomatisierung', 'Web- und Mobile-Apps', 'KI-Team (Brunella)'] },
];
const SITE = 'https://www.pohankaestarsa.com';

// The scene chunk (scene/createLaborScene.ts) is the only code with this shader string; the page's
// own client chunk names createLaborScene in its import, so the name does not identify the chunk.
const SCENE_MARKER = 'uColor, 0.28';

async function noBanner(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
}

/** Every JS body the page downloads, by URL. */
function collectScripts(page: Page) {
  const bodies = new Map<string, Promise<string>>();
  page.on('response', (r) => {
    if (r.url().endsWith('.js')) bodies.set(r.url(), r.text().catch(() => ''));
  });
  return async () => {
    const out: [string, string][] = [];
    for (const [url, body] of bodies) out.push([url, await body]);
    return out;
  };
}

/** Records every value data-live takes on the canvas, from the first paint on. */
async function traceLive(page: Page) {
  await page.addInitScript(() => {
    const w = window as Window & { __live?: string[] };
    w.__live = [];
    new MutationObserver((ms) => {
      for (const m of ms) {
        const el = m.target as HTMLElement;
        if (el.dataset?.testid === 'labor-canvas') w.__live!.push(el.dataset.live ?? '');
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-live'] });
  });
  return () => page.evaluate(() => (window as Window & { __live?: string[] }).__live ?? []);
}

async function homepageScripts(request: APIRequestContext, path: string) {
  const html = await (await request.get(path)).text();
  const srcs = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\\\s]+?\.js/g)].map((m) => m[0]))];
  expect(srcs.length, `${path}: scripts in the HTML`).toBeGreaterThan(0);
  return Promise.all(srcs.map(async (s) => [s, await (await request.get(s)).text()] as const));
}

for (const l of LANGS) {
  test(`${l.path}: 200, the headline in its language, canonical and hreflang`, async ({ page }) => {
    const res = await page.goto(l.path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText(l.h1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE + l.path);
    for (const [lang, href] of [['hu', '/labor'], ['en', '/en/labor'], ['de', '/de/labor'], ['x-default', '/labor']]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute('href', SITE + href);
    }
  });

  test(`${l.path}: the four card links name their service`, async ({ page }) => {
    await page.goto(l.path);
    const links = page.locator('article a');
    await expect(links).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const name = ((await links.nth(i).evaluate((a) => a.textContent ?? '')) || '').replace(/\u00ad/g, '');
      expect(name, `link ${i + 1}`).toContain(l.more);
      expect(name, `link ${i + 1}`).toContain(l.titles[i]);
      // and the accessibility tree says the same (the service name is an sr-only span, not hidden)
      await expect(links.nth(i)).toHaveAccessibleName(new RegExp(l.titles[i].split('').map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\u00ad?')));
    }
  });
}

test('the canvas is decoration: aria-hidden, out of the Tab order; no video and no .mp4 on /labor', async ({ page }) => {
  const mp4: string[] = [];
  page.on('request', (r) => {
    if (/\.mp4(\?|$)/.test(r.url())) mp4.push(r.url());
  });
  await noBanner(page);
  await page.goto('/labor', { waitUntil: 'load' });
  const canvas = page.getByTestId('labor-canvas');
  await expect(canvas).toHaveAttribute('aria-hidden', 'true');
  await expect(canvas).toHaveAttribute('tabindex', '-1');
  await page.waitForTimeout(1500);
  await expect(page.locator('video')).toHaveCount(0);
  expect(mp4).toEqual([]);
});

test('touch phone (390 px): poster only, the 3D chunk is never requested', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await noBanner(page);
  const scripts = collectScripts(page);
  const live = await traceLive(page);
  const poster = page.waitForResponse((r) => r.url().includes('/labor/poster-0-p.avif'));
  await page.goto('/labor', { waitUntil: 'load' });
  expect((await poster).status()).toBe(200);
  await expect.poll(() => page.evaluate(() => [...document.images].some((i) => i.currentSrc.includes('/labor/poster-0-p.avif') && i.complete && i.naturalWidth > 0))).toBe(true);
  // past the idle callback (timeout 2 s) in which the scene would start
  await page.waitForTimeout(3000);
  await expect(page.getByTestId('labor-canvas')).toHaveAttribute('data-live', 'false');
  expect(await live()).not.toContain('true');
  expect((await scripts()).filter(([, b]) => b.includes(SCENE_MARKER)).map(([u]) => u)).toEqual([]);
  await ctx.close();
});

test('reduced motion (1440 px): no 3D, the chunk is never requested', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await noBanner(page);
  const scripts = collectScripts(page);
  const live = await traceLive(page);
  await page.goto('/labor', { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  await expect(page.getByTestId('labor-canvas')).toHaveAttribute('data-live', 'false');
  expect(await live()).not.toContain('true');
  expect((await scripts()).filter(([, b]) => b.includes(SCENE_MARKER)).map(([u]) => u)).toEqual([]);
  await ctx.close();
});

test('desktop (1440 px): the scene loads after the load event and goes live', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await noBanner(page);
  const scripts = collectScripts(page);
  const live = await traceLive(page);
  await page.goto('/labor', { waitUntil: 'load' });
  const gl2 = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
  test.skip(!gl2, 'this browser has no WebGL2, so the page keeps the poster by design');
  await expect.poll(live, { timeout: 8000 }).toContain('true');
  // the detector above is the one the phone and reduced-motion cases rely on: here it must find the chunk
  expect((await scripts()).filter(([, b]) => b.includes(SCENE_MARKER)).length).toBe(1);
  // A headless browser without a display draws far below 60 fps, and then the frame guard rightly falls
  // back to the poster after its 2.5 s window; whether the scene stays live is measured on real hardware.
  await ctx.close();
});

test('the homepage scripts carry nothing of /labor (/, /en, /de)', async ({ request }) => {
  for (const path of ['/', '/en', '/de']) {
    for (const [src, body] of await homepageScripts(request, path)) {
      for (const marker of ['createLaborScene', 'labor-canvas']) {
        expect(body.includes(marker), `${path}: ${src} contains ${marker}`).toBe(false);
      }
    }
  }
});

test('the sitemap lists /labor in all three languages', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  for (const p of ['/labor', '/en/labor', '/de/labor']) expect(xml).toContain(`<loc>${SITE}${p}</loc>`);
});

for (const width of [360, 412, 1440]) {
  for (const l of LANGS) {
    test(`nothing sticks out sideways: ${l.path} at ${width} px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 800 } });
      const page = await ctx.newPage();
      await noBanner(page);
      await page.goto(l.path, { waitUntil: 'load' });
      // the page width, and every visible box and line of text against the screen: a box that a
      // clipping parent (overflow: hidden) keeps out of the page width still counts
      const out = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const bad: string[] = [];
        if (document.documentElement.scrollWidth > w) bad.push(`page ${document.documentElement.scrollWidth} px wide`);
        const name = (e: Element) => `${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''}`;
        for (const e of document.querySelectorAll('main *, header *, footer *')) {
          if (e.closest('[aria-hidden="true"]') || e.closest('.sr-only')) continue;
          const r = e.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if (r.right > w + 0.5 || r.left < -0.5) bad.push(`${name(e)} ${Math.round(r.left)}..${Math.round(r.right)}`);
        }
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let t = walker.nextNode(); t; t = walker.nextNode()) {
          const p = t.parentElement;
          if (!p || !t.textContent?.trim() || p.closest('[aria-hidden="true"], .sr-only, script, style, noscript')) continue;
          const range = document.createRange();
          range.selectNodeContents(t);
          for (const r of range.getClientRects()) if (r.width && (r.right > w + 0.5 || r.left < -0.5)) bad.push(`text "${t.textContent.trim().slice(0, 30)}" ${Math.round(r.left)}..${Math.round(r.right)}`);
        }
        return [...new Set(bad)];
      });
      expect(out).toEqual([]);
      await ctx.close();
    });
  }
}
