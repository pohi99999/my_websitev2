import { test, expect } from '@playwright/test';

// Marveen 5574: on /kapcsolat the cookie banner was the LCP element and came at ~4 s on a slow phone, because it
// only rendered after client JS. It is now in the server HTML; a visitor who already chose never sees it.

const FLASH_DETECTOR = `window.__bannerSeen=false;(function loop(){var b=document.getElementById('cookie-consent');if(b&&getComputedStyle(b).display!=='none'&&b.getBoundingClientRect().height>0)window.__bannerSeen=true;if(performance.now()<6000)requestAnimationFrame(loop);})();`;

test('the banner is in the server HTML of a first visit, in the page language', async ({ request }) => {
  for (const [path, text] of [['/kapcsolat', 'statisztikai sütiket'], ['/en/kapcsolat', 'statistical cookies'], ['/de', 'Statistik-Cookies']] as const) {
    const html = await (await request.get(path)).text();
    expect(html, path).toContain('id="cookie-consent"');
    expect(html, path).toContain(text);
    expect(html, path).toContain('id="consent-flag"');
  }
});

test('a visitor who already chose never sees the banner, not even for a frame', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
  await page.addInitScript(FLASH_DETECTOR);
  await page.goto('/kapcsolat');
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => (window as unknown as { __bannerSeen: boolean }).__bannerSeen)).toBe(false);
  expect(await page.locator('html').getAttribute('data-consent')).toBe('set');
  await expect(page.locator('#cookie-consent')).toHaveCount(0);
});

test('a first visit shows it, a choice hides it, and the settings button brings it back', async ({ page }) => {
  await page.addInitScript(FLASH_DETECTOR);
  await page.goto('/adatvedelmi-nyilatkozat');
  await expect(page.locator('#cookie-consent')).toBeVisible();
  await page.locator('#cookie-consent').getByRole('button', { name: 'Csak a szükségesek' }).click();
  await expect(page.locator('#cookie-consent')).toHaveCount(0);
  expect(await page.evaluate(() => window.localStorage.getItem('pt-cookie-consent'))).toBe('necessary');
  await page.getByRole('button', { name: 'Süti-beállítások módosítása' }).click();
  await expect(page.locator('#cookie-consent')).toBeVisible();
});
