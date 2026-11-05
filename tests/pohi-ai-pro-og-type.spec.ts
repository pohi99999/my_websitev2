import { test, expect } from '@playwright/test';

// 2026-11-05 live audit: of the 85 sitemap URLs only /termekek/pohi-ai-pro (in all 3 languages) had no og:type.

for (const path of ['/termekek/pohi-ai-pro', '/en/termekek/pohi-ai-pro', '/de/termekek/pohi-ai-pro']) {
  test(`${path} has og:type`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html).toMatch(/<meta property="og:type" content="website"\s*\/?>/);
  });
}
