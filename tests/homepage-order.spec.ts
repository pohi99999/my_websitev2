import { test, expect } from '@playwright/test';

// 2026-11-05 (Stratega, Peter 13528): trust and price come before the AI block, which is now one card.

const y = async (page, selector: string) =>
  page.locator(selector).first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY);

test('the reviews, the price and the form come before the process and the AI card', async ({ page }) => {
  await page.goto('/');
  const reviews = await y(page, '#arcsomag-heading');
  const form = await y(page, '#contact-form');
  const ai = await y(page, '[data-testid="ai-teaser"]');
  const faq = await y(page, 'text=Gyakran ismételt kérdések');
  expect(reviews).toBeLessThan(form);
  expect(form).toBeLessThan(ai);
  expect(ai).toBeLessThan(faq);
});

test('the AI block is one card without the jargon, in the language of the URL', async ({ page }) => {
  await page.goto('/');
  const card = page.getByTestId('ai-teaser');
  await expect(card).toContainText('Több kell, mint weboldal?');
  await expect(card.getByRole('link', { name: 'Megnézem a szolgáltatásokat' })).toHaveAttribute('href', '/szolgaltatasok');
  const main = page.locator('main');
  for (const jargon of ['PILLÉR 1', 'PROOF', 'orchestration', 'KPI-alapú mérés']) {
    await expect(main).not.toContainText(jargon);
  }
  await page.goto('/de');
  await expect(page.getByTestId('ai-teaser').getByRole('link', { name: 'Leistungen ansehen' })).toHaveAttribute('href', '/de/szolgaltatasok');
});

test('the video section no longer promises client interviews', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).not.toContainText('Interjú pár elégedett ügyfelünkkel');
  await expect(page.getByRole('heading', { name: 'Egy kis humor: mit szólna az automatizáláshoz az állatvilág?' })).toBeVisible();
});
