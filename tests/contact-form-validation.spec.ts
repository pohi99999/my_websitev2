import { test, expect, type Page } from '@playwright/test';

// CLIENT-SIDE validation of the /kapcsolat form only. The e-mail route is intercepted and
// aborted, so even a validation regression can never send a real message from this spec.
test.describe('contact form client-side validation', () => {
  let contactRequests: number;

  test.beforeEach(async ({ page }) => {
    contactRequests = 0;
    await page.route('**/api/contact', (route) => {
      contactRequests += 1;
      return route.abort();
    });
    await page.goto('/kapcsolat');
    await expect(page.locator('form #contact-email')).toBeVisible();
  });

  const submit = (page: Page) => page.getByRole('button', { name: 'Üzenet Küldése' }).click();
  const validity = (page: Page, selector: string) =>
    page.locator(selector).evaluate((el: HTMLInputElement | HTMLTextAreaElement) => ({
      valid: el.validity.valid,
      valueMissing: el.validity.valueMissing,
      typeMismatch: el.validity.typeMismatch,
    }));

  test('an empty form is rejected and nothing is sent', async ({ page }) => {
    await submit(page);

    for (const field of ['#contact-name', '#contact-email', '#contact-message']) {
      expect(await validity(page, field)).toMatchObject({ valid: false, valueMissing: true });
    }
    expect(await page.locator('form').evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(false);
    await expect(page.getByRole('button', { name: 'Üzenet Küldése' })).toBeEnabled();
    await expect(page.getByText('Köszönjük! Az üzenet elküldve.')).toHaveCount(0);
    expect(contactRequests).toBe(0);
  });

  for (const bad of ['not-an-email', 'name@', '@example.com', 'two@@example.com']) {
    test(`an invalid e-mail (${bad}) is rejected and nothing is sent`, async ({ page }) => {
      await page.fill('#contact-name', 'Playwright Teszt');
      await page.fill('#contact-email', bad);
      await page.fill('#contact-message', 'Validation test message, never sent.');
      await submit(page);

      expect(await validity(page, '#contact-email')).toMatchObject({ valid: false, typeMismatch: true });
      expect(await validity(page, '#contact-name')).toMatchObject({ valid: true });
      expect(await validity(page, '#contact-message')).toMatchObject({ valid: true });
      await expect(page.getByText('Köszönjük! Az üzenet elküldve.')).toHaveCount(0);
      expect(contactRequests).toBe(0);
    });
  }

  test('a valid e-mail passes client-side validation', async ({ page }) => {
    await page.fill('#contact-name', 'Playwright Teszt');
    await page.fill('#contact-email', 'teszt@example.com');
    await page.fill('#contact-message', 'Validation test message, never sent.');
    expect(await page.locator('form').evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(true);
    // Deliberately not submitted: this spec never exercises the send path.
    expect(contactRequests).toBe(0);
  });
});
