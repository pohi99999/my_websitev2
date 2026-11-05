import { test, expect } from '@playwright/test';

// 2026-11-05 live audit: Chrome flagged the name and e-mail fields of the two contact forms for having no
// autocomplete attribute (the home page form has them). The honeypot must keep autocomplete="off".

test.describe('contact forms offer autofill', () => {
  test('/kapcsolat', async ({ page }) => {
    await page.goto('/kapcsolat');
    await expect(page.locator('#contact-name')).toHaveAttribute('autocomplete', 'name');
    await expect(page.locator('#contact-email')).toHaveAttribute('autocomplete', 'email');
    await expect(page.locator('input[name="website"]')).toHaveAttribute('autocomplete', 'off');
  });

  test('/szolgaltatasok', async ({ page }) => {
    await page.goto('/szolgaltatasok');
    await expect(page.locator('form input#name')).toHaveAttribute('autocomplete', 'name');
    await expect(page.locator('form input#email')).toHaveAttribute('autocomplete', 'email');
    await expect(page.locator('#smart-honeypot-website')).toHaveAttribute('autocomplete', 'off');
  });
});
