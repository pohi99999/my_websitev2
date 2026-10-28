import { test, expect, type Page } from '@playwright/test';

// Every internal link in the site header (desktop nav, both mega menus, mobile menu, logo,
// contact CTA) must resolve with HTTP 200, so a renamed or deleted route is caught here.

test.beforeEach(async ({ page }) => {
  // Pre-answer the cookie banner so it does not cover the mobile menu.
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
});

const headerHrefs = (page: Page) =>
  page.locator('header a[href], #mobile-menu a[href]').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));

test('every header link on the homepage resolves with HTTP 200', async ({ page, request, isMobile }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const hrefs = await headerHrefs(page);
  if (isMobile) {
    await page.getByRole('button', { name: 'Menü megnyitása' }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    hrefs.push(...(await headerHrefs(page)));
  } else {
    // The mega menu links only mount while their panel is open.
    for (const key of ['services', 'products']) {
      await page.locator(`#mega-trigger-${key}`).click();
      await expect(page.locator(`#mega-panel-${key}`)).toBeVisible();
      hrefs.push(...(await headerHrefs(page)));
      await page.keyboard.press('Escape');
    }
  }

  const internal = [...new Set(hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//')).map((h) => h.split('#')[0] || '/'))];
  for (const expected of ['/', '/szolgaltatasok', '/termekek', '/weboldal-ai-kkv', '/portfolio', '/blog', '/rolunk', '/kapcsolat']) {
    expect(internal).toContain(expected);
  }

  const failures: string[] = [];
  for (const href of internal) {
    const res = await request.get(href);
    if (res.status() !== 200) failures.push(`${href} -> ${res.status()}`);
  }
  expect(failures).toEqual([]);
});

test('clicking a header nav link navigates to that page', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Menü megnyitása' }).click();
    // Mobile items carry an index prefix, e.g. "06. Blog".
    await page.locator('#mobile-menu').getByRole('link', { name: /^\d+\.\s*Blog$/ }).click();
  } else {
    await page.getByRole('navigation', { name: 'Főmenü' }).getByRole('link', { name: 'Blog', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.locator('h1')).toBeVisible();
});
