import { test, expect } from '@playwright/test';

// 2026-11-01 audit: the "automation" card of the /termekek video showcase pointed a <video> at
// /showcase/automation-loop.mp4, a file that does not exist (404 on the live site). The card now shows its
// fallback link (the original x.com post) and never asks for the missing file.

const MISSING = '/showcase/automation-loop.mp4';
const FALLBACK = 'https://x.com/antigravity/status/1990813606217236828?s=20';

test('/termekek never requests the missing showcase video and shows the fallback link', async ({ page }) => {
  const requested: string[] = [];
  page.on('request', (req) => {
    if (new URL(req.url()).pathname === MISSING) requested.push(req.url());
  });

  await page.goto('/termekek');
  const link = page.locator(`a[href="${FALLBACK}"]`);
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('target', '_blank');

  // give a lazily attached <video>/<source> time to start fetching, if one were rendered
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1000);
  expect(requested).toEqual([]);
  await expect(page.locator(`video source[src="${MISSING}"], video[src="${MISSING}"]`)).toHaveCount(0);
});
