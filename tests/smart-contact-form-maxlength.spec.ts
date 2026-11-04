import { test, expect } from '@playwright/test';

// 2026-11-01 audit: the description textarea of the /szolgaltatasok project form had no length limit, while
// /api/contact rejects a combined message above 6000 characters with a generic error. The form puts a header
// line and the budget in front of the description, so the field is capped at 5800 and the visitor sees how
// much is left once within 300 characters of the cap. /api/contact is always mocked here (it sends real mail).

const LIMIT = 5800;
const SERVER_LIMIT = 6000;
const TEXTAREA = 'textarea[name="project_description"]';
const COUNTER = /Még \d+ karakter írható\./;

test.describe('/szolgaltatasok project form description length', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/szolgaltatasok');
  });

  test('the textarea has maxLength 5800 and a 5900-character paste is cut to 5800', async ({ page }) => {
    const textarea = page.locator(TEXTAREA);
    await expect(textarea).toHaveAttribute('maxlength', String(LIMIT));
    expect(await textarea.evaluate((el: HTMLTextAreaElement) => el.maxLength)).toBe(LIMIT);

    await textarea.focus();
    await page.keyboard.insertText('a'.repeat(LIMIT + 100)); // what a paste does
    expect(await textarea.evaluate((el: HTMLTextAreaElement) => el.value.length)).toBe(LIMIT);
  });

  test('the "characters left" line appears only within 300 characters of the limit', async ({ page }) => {
    const textarea = page.locator(TEXTAREA);
    const counter = page.getByText(COUNTER);

    // retried until React has hydrated and owns the field
    await expect(async () => {
      await textarea.fill('a'.repeat(LIMIT - 200));
      await expect(page.getByText('Még 200 karakter írható.')).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 20_000 });

    await textarea.fill('a'.repeat(LIMIT - 300));
    await expect(page.getByText('Még 300 karakter írható.')).toBeVisible();

    await textarea.fill('a'.repeat(LIMIT - 301));
    await expect(counter).toHaveCount(0);

    await textarea.fill('short description');
    await expect(counter).toHaveCount(0);

    await textarea.fill('a'.repeat(LIMIT));
    await expect(page.getByText('Még 0 karakter írható.')).toBeVisible();
  });

  test('a full-length description plus the other fields stays under the server limit', async ({ page }) => {
    let posted: { message?: string } | null = null;
    await page.route('**/api/contact', async (route) => {
      posted = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    // the longest budget option makes the longest message
    const budgets = await page.locator('select[name="budget"] option:not([disabled])').evaluateAll((opts) =>
      (opts as HTMLOptionElement[]).map((o) => o.value)
    );
    const longest = budgets.reduce((a, b) => (b.length > a.length ? b : a));

    await expect(async () => {
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill(TEXTAREA, 'á'.repeat(LIMIT));
      await page.selectOption('select[name="budget"]', longest);
      await expect(page.getByText('Még 0 karakter írható.')).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 20_000 });

    await page.click('button[type="submit"]:has-text("Ajánlatkérés elküldése")');
    await expect(page.getByText('Köszönjük a megkeresést!')).toBeVisible();

    expect(posted).not.toBeNull();
    const message = posted!.message as string;
    expect(message).toContain('á'.repeat(LIMIT));
    expect(message.trim().length).toBeLessThanOrEqual(SERVER_LIMIT);
  });
});
