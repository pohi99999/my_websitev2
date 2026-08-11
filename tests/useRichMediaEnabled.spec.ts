import { test, expect } from '@playwright/test';

test.describe('useRichMediaEnabled E2E', () => {
  test('renders video when rich media is enabled (default)', async ({ page }) => {
    await page.goto('/');

    // The SequentialVideoBackground component renders 2 video elements when rich media is enabled.
    // They might take a moment to be attached, so we use toHaveCount with a wait.
    await expect(page.locator('video')).toHaveCount(2, { timeout: 10000 });
  });

  test('hides video when prefers-reduced-motion is set', async ({ page }) => {
    // Set prefers-reduced-motion to reduce before navigating
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // The component should render the fallback div instead of videos.
    await expect(page.locator('video')).toHaveCount(0, { timeout: 10000 });
  });

  test('hides video when save data is enabled', async ({ page }) => {
    // Mock navigator.connection.saveData
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', {
        get: () => ({ saveData: true }),
      });
    });

    await page.goto('/');

    await expect(page.locator('video')).toHaveCount(0, { timeout: 10000 });
  });

  test('renders video when connection object is missing', async ({ page }) => {
    // Mock navigator.connection as undefined
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', {
        get: () => undefined,
      });
    });

    await page.goto('/');

    await expect(page.locator('video')).toHaveCount(2, { timeout: 10000 });
  });
});
