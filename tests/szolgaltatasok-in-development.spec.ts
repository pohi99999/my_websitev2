import { test, expect } from '@playwright/test';

// 2026-11-05, Peter's decision (13535): what cannot be handed over today says so, and the "not a demo, a working
// system" sentence excludes it. The /en and /de pages do not list these products, so there is nothing to label there.

const LABEL = 'Fejlesztés alatt';

test('the labels sit on Nova, P-Sales, the loan comparison and the instant notice, and nowhere else', async ({ page }) => {
  await page.goto('/szolgaltatasok');
  await expect(page.locator('section#nova > div').first()).toContainText(LABEL);
  await expect(page.locator('section#psales > div').first()).toContainText(LABEL);
  const psearch = page.locator('section#psearch');
  await expect(psearch.locator('> div').first()).not.toContainText(LABEL);
  await expect(psearch.locator('div', { has: page.getByRole('heading', { name: 'Hitelkereső & ajánlategyeztetés' }) }).last()).toContainText(LABEL);
  await expect(psearch.locator('li', { hasText: 'Azonnali értesítés új kiírásról' })).toContainText(LABEL);
  await expect(psearch.locator('li', { hasText: 'Napi automatikus keresés a háttérben' })).not.toContainText(LABEL);
  await expect(page.locator('section#web')).not.toContainText(LABEL);
  await expect(page.locator('section#ai-rendszerek')).not.toContainText(LABEL);
  // 2 sections + 1 card + 1 line
  await expect(page.locator('main span', { hasText: new RegExp(`^${LABEL}$`) })).toHaveCount(4);
});

test('the "working system" sentence excludes the labelled items', async ({ page }) => {
  await page.goto('/szolgaltatasok');
  await expect(page.locator('main')).toContainText('A felsorolt megoldásokat, a „Fejlesztés alatt” jelölésűek kivételével,');
});
