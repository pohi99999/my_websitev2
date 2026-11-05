import { test, expect } from '@playwright/test';
import { BASE_PRICE } from '../app/lib/basePrice';

// 2026-11-05 (Stratega, Peter 13528): the website was the 9th of 9 sections, with no price and no link to its page.

for (const [path, href, title, price] of [
  ['/szolgaltatasok', '/weboldal-ai-kkv', 'Weboldal foglalással vagy ajánlatkéréssel', BASE_PRICE.hu],
  ['/en/szolgaltatasok', '/en/weboldal-ai-kkv', 'Website with booking or quote requests', BASE_PRICE.en],
  ['/de/szolgaltatasok', '/de/weboldal-ai-kkv', 'Website mit Buchung oder Anfrageformular', BASE_PRICE.de],
]) {
  test(`${path}: the website card comes first, with the price and the link`, async ({ page }) => {
    await page.goto(path);
    const card = page.getByTestId('web-card');
    await expect(card).toContainText(title);
    await expect(card).toContainText(price);
    await expect(card).toHaveAttribute('href', href);
    const cardTop = await card.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    const h2Top = await page.locator('main h2').first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    expect(cardTop).toBeLessThan(h2Top);
  });
}

test('/szolgaltatasok: the new heading and first sentence; the undecided sections stay', async ({ page }) => {
  await page.goto('/szolgaltatasok');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Automatizálás és AI, ami átveszi a kézi munkát');
  await expect(page.locator('main')).toContainText('Weboldal, amelyen a vevő foglal vagy ajánlatot kér.');
  await expect(page.locator('main')).not.toContainText('konkrétan elad');
  for (const kept of ['Nova: Intelligens Digitális Munkatárs', 'P-Sales: Ingatlan Értékesítő Platform', 'P-Search: Pályázat & Hitelkereső']) {
    await expect(page.locator('main')).toContainText(kept);
  }
  const ids = await page.locator('main [id]').evaluateAll((els) => els.map((e) => e.id));
  expect(ids.indexOf('web')).toBeLessThan(ids.indexOf('ai-rendszerek'));
});
