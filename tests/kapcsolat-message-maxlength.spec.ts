import { test, expect } from '@playwright/test';

// 2026-11-05 live audit: the /kapcsolat message had no length limit, while /api/contact rejects a message above
// 6000 characters with a generic error (the /szolgaltatasok form was capped in #181, this one was left out).
// /api/contact is always mocked here (it sends real mail).

const LIMIT = 6000;
const TEXTAREA = '#contact-message';

test.describe('/kapcsolat message length', () => {
  test('the message is capped at 6000: a longer paste is cut', async ({ page }) => {
    await page.goto('/kapcsolat');
    const textarea = page.locator(TEXTAREA);
    await expect(textarea).toHaveAttribute('maxlength', String(LIMIT));
    await textarea.focus();
    await page.keyboard.insertText('a'.repeat(LIMIT + 100)); // what a paste does
    expect(await textarea.evaluate((el: HTMLTextAreaElement) => el.value.length)).toBe(LIMIT);
  });

  test('the "characters left" line appears only within 300 characters of the limit', async ({ page }) => {
    await page.goto('/kapcsolat');
    const textarea = page.locator(TEXTAREA);
    const counter = page.getByText(/Még \d+ karakter írható\./);
    await textarea.fill('a'.repeat(LIMIT - 301));
    await expect(counter).toHaveCount(0);
    await textarea.fill('a'.repeat(LIMIT - 300));
    await expect(page.getByText('Még 300 karakter írható.')).toBeVisible();
    await textarea.fill('a'.repeat(LIMIT));
    await expect(page.getByText('Még 0 karakter írható.')).toBeVisible();
  });

  for (const [path, text] of [['/en/kapcsolat', '10 characters left.'], ['/de/kapcsolat', 'Noch 10 Zeichen möglich.']]) {
    test(`the line is translated on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.locator(TEXTAREA).fill('a'.repeat(LIMIT - 10));
      await expect(page.getByText(text)).toBeVisible();
    });
  }

  test('a message of exactly 6000 characters is sent whole', async ({ page }) => {
    let sent: string | undefined;
    await page.route('**/api/contact', (route) => {
      sent = (route.request().postDataJSON() as { message: string }).message;
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/kapcsolat');
    await page.locator('#contact-name').fill('Teszt Elek');
    await page.locator('#contact-email').fill('teszt@example.com');
    await page.locator(TEXTAREA).fill('a'.repeat(LIMIT));
    await page.getByRole('button', { name: 'Üzenet Küldése' }).click();
    await expect(page.getByText('Köszönjük! Az üzenet elküldve.')).toBeVisible();
    expect(sent?.length).toBe(LIMIT);
  });
});
