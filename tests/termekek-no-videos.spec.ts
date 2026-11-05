import { test, expect } from '@playwright/test';

// 2026-11-05 (Stratega, Peter 13528): the showcase held "coming soon" videos and an x.com post of another company.
// Only those leave the page; the rest of its text waits for Peter.

test('/termekek has no video and no x.com link, and the three cards and the call to action stay', async ({ page }) => {
  await page.goto('/termekek');
  await expect(page.locator('main video')).toHaveCount(0);
  await expect(page.locator('main a[href*="x.com"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('hamarosan');
  await expect(page.getByRole('heading', { name: 'BAS System' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pohi AI Pro' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Kérjen konzultációt/ })).toBeVisible();
});
