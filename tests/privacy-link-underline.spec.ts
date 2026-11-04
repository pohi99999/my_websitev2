import { test, expect, type Locator } from '@playwright/test';

// 2026-11-01 audit: links inside running text on the privacy pages were told apart from the text by colour
// only (hover:underline). WCAG 1.4.1: links in a sentence are underlined at rest.

async function decoration(link: Locator) {
  return link.evaluate((el) => getComputedStyle(el).textDecorationLine);
}

test('/adatvedelmi-nyilatkozat: the naih.hu link is underlined at rest', async ({ page }) => {
  await page.goto('/adatvedelmi-nyilatkozat');
  const link = page.locator('a[href="https://www.naih.hu"]');
  await expect(link).toBeVisible();
  await page.mouse.move(0, 0); // not hovered
  expect(await decoration(link)).toBe('underline');
});

for (const path of ['/p-search/adatvedelem', '/en/p-search/privacy']) {
  test(`${path}: the NAIH links in the complaint sentence are underlined at rest`, async ({ page }) => {
    await page.goto(path);
    await page.mouse.move(0, 0);
    for (const href of ['https://www.naih.hu', 'mailto:ugyfelszolgalat@naih.hu']) {
      const link = page.locator(`p a[href="${href}"]`);
      await expect(link).toHaveCount(1);
      expect(await decoration(link), href).toBe('underline');
    }
  });
}
