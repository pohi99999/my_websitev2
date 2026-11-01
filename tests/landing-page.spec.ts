import { test, expect } from '@playwright/test';

test('Landing page loads and CTA is visible', async ({ page }) => {
  await page.goto('/weboldal-ai-kkv');
  // the copy as it is today (app/weboldal-ai-kkv/components/Hero.jsx); the CTA is a link since the
  // dead <button> elements were replaced
  await expect(page.locator('h1')).toContainText('Weboldal, amelyen a vevő foglal vagy ajánlatot kér.');

  const cta = page.getByRole('link', { name: /Kérek ingyenes látványtervet/i });
  await expect(cta).toBeVisible();
});

test('Mobile layout displays correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/weboldal-ai-kkv');
  await expect(page.locator('h1')).toBeVisible();
});