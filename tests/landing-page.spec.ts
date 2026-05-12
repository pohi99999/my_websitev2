import { test, expect } from '@playwright/test';

test('Landing page loads and CTA is visible', async ({ page }) => {
  await page.goto('/weboldal-ai-kkv');
  await expect(page.locator('h1')).toContainText('Weboldal + AI-automatizálás magyar KKV-knak');
  
  const cta = page.getByRole('button', { name: /Ingyenes 15 perces konzultációt kérek/i });
  await expect(cta).toBeVisible();
});

test('Mobile layout displays correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/weboldal-ai-kkv');
  await expect(page.locator('h1')).toBeVisible();
});