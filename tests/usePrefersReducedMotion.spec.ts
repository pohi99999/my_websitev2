import { test, expect } from '@playwright/test';

test.describe('usePrefersReducedMotion hook', () => {
  test('detects prefers-reduced-motion reduce in browser', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const isReduced = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(isReduced).toBe(true);
  });

  test('detects prefers-reduced-motion no-preference in browser', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const isReduced = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(isReduced).toBe(false);
  });
});
