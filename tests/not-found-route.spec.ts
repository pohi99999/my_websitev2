import { test, expect } from '@playwright/test';

// 2026-11-05 live audit: /termekek/<anything> answered 200 with an indexable "Termék nem található" page (a soft
// 404), and the 404 page spoke Hungarian on /en and /de. The product pages that really exist stay untouched.

test.describe('/termekek/[slug] does not answer 200 for a page it cannot show', () => {
  for (const path of ['/termekek/nincs-ilyen', '/termekek/lead-kvalifikator', '/termekek/web-rescue']) {
    test(`${path} is a real 404`, async ({ request }) => {
      expect((await request.get(path)).status()).toBe(404);
    });
  }

  for (const path of ['/termekek', '/termekek/pohi-ai-pro', '/termekek/instant-responder', '/termekek/brunella-agents']) {
    test(`${path} stays 200`, async ({ request }) => {
      expect((await request.get(path)).status()).toBe(200);
    });
  }
});

test.describe('the 404 page speaks the language of the URL', () => {
  const cases = [
    { path: '/nincs-ilyen-oldal', title: 'A keresett oldal nem található', back: 'Vissza a főoldalra', home: '/' },
    { path: '/en/nincs-ilyen-oldal', title: 'The page you are looking for cannot be found', back: 'Back to the home page', home: '/en' },
    { path: '/de/nincs-ilyen-oldal', title: 'Die gesuchte Seite wurde nicht gefunden', back: 'Zurück zur Startseite', home: '/de' },
  ];

  for (const { path, title, back, home } of cases) {
    test(path, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible();
      await expect(page.getByRole('link', { name: back })).toHaveAttribute('href', home);
    });
  }

  test('no Hungarian text is left on the German 404 page', async ({ page }) => {
    await page.goto('/de/nincs-ilyen-oldal');
    await expect(page.getByText('A keresett oldal nem található')).toHaveCount(0);
    await expect(page.getByText('Vissza a főoldalra')).toHaveCount(0);
  });
});
