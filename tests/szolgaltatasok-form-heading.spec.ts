import { test, expect } from '@playwright/test';

// 2026-11-01 audit: on /szolgaltatasok the section <h2> "Projekt egyeztetés" was followed directly by the
// form card's own <h3> "Projekt Egyeztetés". One visible title is enough; the form keeps an accessible name.

test.describe('/szolgaltatasok project form heading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/szolgaltatasok');
  });

  test('"Projekt egyeztetés" is a visible heading exactly once', async ({ page }) => {
    const headings = page.getByRole('heading', { name: /^\s*projekt egyeztetés\s*$/i });
    await expect(headings).toHaveCount(1);
    await expect(headings.first()).toBeVisible();
  });

  test('the form still has an accessible name', async ({ page }) => {
    // a <form> is only exposed as a "form" landmark when it has an accessible name
    await expect(page.getByRole('form', { name: 'Projekt egyeztetés' })).toBeVisible();
  });

  test('heading order stays valid: one h1, no skipped level', async ({ page }) => {
    const levels = await page.$$eval('h1, h2, h3, h4, h5, h6', (els) =>
      els
        .filter((el) => {
          const s = getComputedStyle(el);
          return s.display !== 'none' && s.visibility !== 'hidden';
        })
        .map((el) => Number(el.tagName[1]))
    );
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `heading #${i} jumps from h${levels[i - 1]} to h${levels[i]}`).toBeLessThanOrEqual(1);
    }
  });
});
