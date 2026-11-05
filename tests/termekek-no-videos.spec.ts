import { test, expect } from '@playwright/test';

// 2026-11-05 (Stratega point 5, Peter 13535): only live products, Pohi AI Pro labelled; the "coming soon" videos and
// the x.com post of another company are gone.

for (const c of [
  { path: '/termekek', h1: 'Saját termékeink', status: 'Fejlesztés alatt', brunella: 'Amit kifelé küldene, azt Ön hagyja jóvá.', cta: 'Nincs megfelelő megoldás? Kérjen ingyenes konzultációt.' },
  { path: '/en/termekek', h1: 'Our own products', status: 'In development', brunella: 'Anything it would send out is approved by you first.', cta: 'No matching solution? Request a free consultation.' },
  { path: '/de/termekek', h1: 'Unsere eigenen Produkte', status: 'In Entwicklung', brunella: 'Was nach außen geht, geben Sie vorher frei.', cta: 'Keine passende Lösung? Fordern Sie eine kostenlose Beratung an.' },
]) {
  test(`${c.path}: three products, the label, no video`, async ({ page }) => {
    await page.goto(c.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(c.h1);
    const headings = await page.locator('main h2').allTextContents();
    expect(headings.slice(0, 3)).toEqual(['Brunella', 'P-Szakrajz', 'Pohi AI Pro']);
    const main = page.locator('main');
    await expect(main).toContainText(c.brunella);
    await expect(main.locator('a[href="https://p-szakrajz.vercel.app/"]')).toBeVisible();
    await expect(main.locator('span', { hasText: new RegExp(`^${c.status}$`) })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: c.cta })).toBeVisible();

    // the showcase rendered further down: go all the way before saying it is gone
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    await expect(main.locator('video, iframe')).toHaveCount(0);
    await expect(main.locator('a[href*="x.com"]')).toHaveCount(0);
    await expect(main).not.toContainText('BAS System');
  });
}

test('/termekek: the showcase title and its "coming soon" text are gone', async ({ page }) => {
  await page.goto('/termekek');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  const main = page.locator('main');
  await expect(main).not.toContainText('AI a Gyakorlatban');
  await expect(main).not.toContainText('További Fantasztikus Megoldások');
});
