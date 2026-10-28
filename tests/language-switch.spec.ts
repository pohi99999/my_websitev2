import { test, expect, type Page } from '@playwright/test';

// The header language switcher (HU / EN / DE). On narrow viewports it lives in the mobile menu.

test.beforeEach(async ({ page }) => {
  // Pre-answer the cookie banner so it does not cover the mobile menu.
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
});
async function switcher(page: Page, isMobile: boolean) {
  if (isMobile) {
    // The menu can stay open across a client-side language switch; open it only if closed.
    if (!(await page.locator('#mobile-menu').isVisible())) {
      await page.locator('header button[aria-controls="mobile-menu"]').click();
    }
    await expect(page.locator('#mobile-menu')).toBeVisible();
    return page.locator('#mobile-menu').getByRole('group', { name: /Language selector/ });
  }
  return page.locator('header').getByRole('group', { name: /Language selector/ }).first();
}

test('switching HU -> EN -> DE -> HU changes the URL and the page language', async ({ page, isMobile }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
  await expect(page.locator('#home h1')).toContainText('kisvállalkozásoknak');

  await (await switcher(page, isMobile)).getByRole('button', { name: /^EN/ }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('#home h1')).toContainText('for small businesses.');

  await (await switcher(page, isMobile)).getByRole('button', { name: /^DE/ }).click();
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator('#home h1')).toContainText('für kleine Unternehmen.');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');

  await (await switcher(page, isMobile)).getByRole('button', { name: /^HU/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#home h1')).toContainText('kisvállalkozásoknak');
});

test('the active language button is marked with aria-current', async ({ page, isMobile }) => {
  await page.goto('/en');
  const group = await switcher(page, isMobile);
  await expect(group.getByRole('button', { name: /^EN/ })).toHaveAttribute('aria-current', 'true');
  await expect(group.getByRole('button', { name: /^HU/ })).not.toHaveAttribute('aria-current', 'true');
});
