import { test, expect } from '@playwright/test';

// 2026-11-05 (Stratega, Peter 13528): three references link to the client's own domain. Measured live the same day:
// same text on hetenyirenata.com, and the two vercel.app addresses already redirect. homolamentor.com does not
// resolve; the domain is homlamentor.com.

test('the three references link to the live domains', async ({ page }) => {
  await page.goto('/portfolio');
  const main = page.locator('main');
  for (const href of ['https://hetenyirenata.com/', 'https://www.cars-sr99.com/', 'https://homlamentor.com/hu']) {
    expect(await main.locator(`a[href="${href}"]`).count()).toBeGreaterThan(0);
  }
  for (const old of ['hetenyirenata.vercel.app', 'cars-sr99.vercel.app', 'homolamentor.vercel.app', 'homolamentor.com']) {
    await expect(main.locator(`a[href*="${old}"]`)).toHaveCount(0);
  }
});
