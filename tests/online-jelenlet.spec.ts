import { test, expect } from '@playwright/test';
import { googleReviews, GOOGLE_RATING, GOOGLE_PROFILE_URL } from '../app/components/googleReviews';

// The "Online jelenlét induló csomag" page (Péter 13785/13787): the price and the terms word for word, the
// reviews from the single source, Hungarian only, and nothing of it in the /en and /de homepage scripts.

const PATH = '/online-jelenlet';
const SAMPLE = 'https://hari-attila-web.vercel.app/';
const norm = (s: string) => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
});

test('200, one headline, its own canonical, no language alternates', async ({ page }) => {
  const res = await page.goto(PATH);
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Online jelenlét induló csomag kisvállalkozóknak');
  await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.pohankaestarsa.com${PATH}`);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('the price and the terms, word for word', async ({ page }) => {
  await page.goto(PATH);
  const text = norm(await page.locator('main').innerText());
  for (const sentence of [
    'Weboldal: 150 000 Ft + áfa, egyszeri díj.',
    'Google Cégprofil és Facebook-oldal beállítása: 30 000 Ft + áfa, egyszeri díj.',
    'Havi díj nincs.',
    'Ami a csomagon túl kell (például árkalkulátor), azt külön ajánlatban kapja meg.',
    'Az első verziót az anyagok megérkezése után 5 munkanapon belül megmutatjuk.',
    'ennek az ideje a Google-től függ, nem tőlünk, ezért az 5 munkanapba nem számít bele.',
    'Az anyagot (szöveg, képek) Ön hagyja jóvá, mielőtt bármi kikerül.',
    'Alapadatok (név, cím, adószám, elérhetőség), 10-20 fotó a munkáiról',
  ]) expect(text, sentence).toContain(sentence);
});

test('the sample does not claim a finished Business Profile (Péter 13854)', async ({ page }) => {
  await page.goto(PATH);
  const text = norm(await page.locator('main').innerText());
  expect(text).toContain('a Google Cégprofil igazolása folyamatban');
  expect(text).not.toContain('pontosan ezt készítettük el');
  expect(text).not.toContain('és Google Cégprofilt');
});

test('the first step does not ask for a photo the contact form cannot take (Péter 13856)', async ({ page }) => {
  await page.goto(PATH);
  const first = norm(await page.locator('ol').nth(1).locator('li').first().innerText());
  expect(first).toBe('Ön kitölti az ajánlatkérőt, és az első egyeztetésen megbeszéljük, hogyan küldje el a fotókat.');
  const text = norm(await page.locator('main').innerText());
  expect(text).not.toContain('küld pár fotót');
  // "Mit kérünk Öntől?" stays as it was
  expect(text).toContain('Alapadatok (név, cím, adószám, elérhetőség), 10-20 fotó a munkáiról, és a hozzájárulását ahhoz, hogy a képei megjelenjenek.');
});

test('no promise from the other offers, no phone number, no dash', async ({ page }) => {
  await page.goto(PATH);
  const own = norm(await page.locator('main > div').first().innerText());
  expect(own).not.toMatch(/[—–]/);
  expect(own).not.toMatch(/két hét|2 hét|\+36|tel:|látványterv/i);
  await expect(page.locator('main a[href^="tel:"]')).toHaveCount(0);
});

test('the reviews are the single source, word for word, with the profile link', async ({ page }) => {
  await page.goto(PATH);
  const block = page.locator('#testimonials');
  const text = norm(await block.innerText());
  for (const r of googleReviews) {
    expect(text, r.name).toContain(norm(r.name));
    for (const p of r.paragraphs) expect(text, p.slice(0, 30)).toContain(norm(p));
  }
  expect(text).toContain(`${GOOGLE_RATING.count} vélemény a Google Cégprofilunkon`);
  await expect(block.locator(`a[href="${GOOGLE_PROFILE_URL}"]`)).toHaveCount(1);
});

test('the sample link opens safely; every quote button goes to the contact page', async ({ page }) => {
  await page.goto(PATH);
  const sample = page.locator(`main a[href="${SAMPLE}"]`);
  await expect(sample).toHaveCount(1);
  await expect(sample).toHaveAttribute('target', '_blank');
  await expect(sample).toHaveAttribute('rel', /noopener/);
  const quote = page.locator('main').getByRole('link', { name: 'Ajánlatkérés', exact: true });
  await expect(quote).toHaveCount(2);
  for (const a of await quote.all()) await expect(a).toHaveAttribute('href', '/kapcsolat');
});

test('Hungarian only: /en and /de are 404, the language switch goes to that home page', async ({ page, request, isMobile }) => {
  for (const p of [`/en${PATH}`, `/de${PATH}`]) expect((await request.get(p)).status(), p).toBe(404);
  await page.goto(PATH);
  if (isMobile) await page.locator('header button[aria-controls="mobile-menu"]').click();
  const scope = isMobile ? page.locator('#mobile-menu') : page.locator('header');
  await scope.getByRole('group', { name: /Language selector/ }).first().getByRole('button', { name: /^EN/ }).click();
  await expect(page).toHaveURL(/\/en$/);
});

test('the homepage scripts carry nothing of this page beyond the footer link (/, /en, /de)', async ({ request }) => {
  for (const path of ['/', '/en', '/de']) {
    const html = await (await request.get(path)).text();
    const srcs = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\\\s]+?\.js/g)].map((m) => m[0]))];
    expect(srcs.length, path).toBeGreaterThan(0);
    for (const s of srcs) {
      const body = await (await request.get(s)).text();
      for (const copy of ['Térkövező, klímaszerelő', 'igazolása folyamatban', 'Havi díj nincs']) expect(body.includes(copy), `${path} ${s}: ${copy}`).toBe(false);
    }
  }
});

test('linked from the Hungarian footer only, and not from the main menu', async ({ page }) => {
  for (const path of ['/', '/szolgaltatasok', PATH]) {
    await page.goto(path);
    await expect(page.locator('footer a[href="/online-jelenlet"]'), path).toHaveText('Online jelenlét induló csomag');
    await expect(page.locator('header a[href*="online-jelenlet"]'), path).toHaveCount(0);
  }
  for (const path of ['/en', '/de']) {
    await page.goto(path);
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('a[href*="online-jelenlet"]'), path).toHaveCount(0);
  }
});

test('linked under the price block of /weboldal-ai-kkv, in Hungarian only', async ({ page, request }) => {
  await page.goto('/weboldal-ai-kkv');
  const link = page.locator('main a[href="/online-jelenlet"]');
  await expect(link).toHaveCount(1);
  await expect(link).toHaveText('Online jelenlét induló csomag');
  const y = (l: import('@playwright/test').Locator) => l.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  const price = page.locator('#arcsomag');
  const bottom = await price.evaluate((e) => e.getBoundingClientRect().bottom + window.scrollY);
  expect(await y(link)).toBeGreaterThan(bottom - 100);
  expect(await y(link)).toBeLessThan(bottom + 100);
  for (const p of ['/en/weboldal-ai-kkv', '/de/weboldal-ai-kkv']) expect(await (await request.get(p)).text(), p).not.toContain('online-jelenlet');
});

test('no background video: the page is solid black, a phone would download it for nothing', async ({ page }) => {
  const mp4: string[] = [];
  page.on('request', (r) => { if (/\.mp4(\?|$)/.test(r.url())) mp4.push(r.url()); });
  await page.goto(PATH, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  expect(mp4).toEqual([]);
});

test('the sitemap lists the page, in Hungarian only', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).toContain(`<loc>https://www.pohankaestarsa.com${PATH}</loc>`);
  expect(xml).not.toContain(`/en${PATH}`);
  expect(xml).not.toContain(`/de${PATH}`);
});

test('the share image is drawn for this page, not the generic card', async ({ request }) => {
  const res = await request.get(`/og${PATH}`);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/');
  const generic = await request.get('/og/nincs-ilyen-oldal');
  expect((await res.body()).equals(await generic.body())).toBe(false);
});

test('the longest word of the headline stays whole, at 320 and 375 px', async ({ browser }) => {
  for (const width of [320, 375]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(PATH);
    const lines = await page.locator('h1 span').evaluate((e) => {
      const rg = document.createRange(); rg.selectNodeContents(e);
      return new Set([...rg.getClientRects()].map((r) => Math.round(r.top))).size;
    });
    expect(lines, `${width} px`).toBe(1);
    await ctx.close();
  }
});

test('the price comes before the reviews on a phone', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(PATH);
  const y = (sel: string) => page.locator(sel).evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  expect(await y('#ara')).toBeLessThan(await y('#testimonials'));
  await ctx.close();
});

for (const width of [375, 1024, 1280]) {
  test(`no text line and no element sticks out at ${width} px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
    await page.goto(PATH);
    const bad = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth, out: string[] = [];
      const main = document.querySelector('main')!;
      for (const e of main.querySelectorAll('*')) {
        if (e.closest('svg') || e.closest('[aria-hidden="true"]')) continue;
        const r = e.getBoundingClientRect();
        if (r.width >= 1 && (r.right > vw + 1 || r.left < -1)) out.push(`${e.tagName} ${Math.round(r.left)}-${Math.round(r.right)}`);
      }
      const w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const n = w.currentNode, q = n.parentElement!;
        if (!n.textContent!.trim()) continue;
        let box: HTMLElement = q;
        while (getComputedStyle(box).display === 'inline') box = box.parentElement!;
        const b = box.getBoundingClientRect(), rg = document.createRange();
        rg.selectNodeContents(n);
        for (const r of rg.getClientRects()) if (r.width >= 1 && (r.right > b.right + 1.5 || r.left < b.left - 1.5 || r.right > vw + 1)) { out.push(`"${n.textContent!.trim().slice(0, 30)}" ${Math.round(r.right)} > ${Math.round(b.right)}`); break; }
      }
      return out;
    });
    expect(bad).toEqual([]);
    await ctx.close();
  });
}
