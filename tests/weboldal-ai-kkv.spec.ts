import { test, expect } from '@playwright/test';

// The /weboldal-ai-kkv landing page: hero, the offer (price) section, and the
// calls to action that lead the visitor to the contact form.
test.describe('/weboldal-ai-kkv landing page', () => {
  test.beforeEach(async ({ page }) => {
    // Nothing on this page may reach the e-mail route.
    await page.route('**/api/contact', (route) => route.abort());
    await page.goto('/weboldal-ai-kkv');
  });

  test('hero shows the heading, the selling points and both CTAs', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Weboldal, amelyen a vevő foglal vagy ajánlatot kér.');
    await expect(page.getByText('Két hét átfutás, fix áron.')).toBeVisible();
    await expect(page.getByRole('link', { name: /Kérek ingyenes látványtervet/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Referenciák és csomagok' })).toBeVisible();
  });

  test('the secondary CTA scrolls to the offer section', async ({ page }) => {
    await page.getByRole('link', { name: 'Referenciák és csomagok' }).click();
    await expect(page).toHaveURL(/#arcsomag$/);
    const offer = page.locator('#arcsomag');
    await expect(offer.locator('#arcsomag-heading')).toBeInViewport();
    await expect(offer.getByRole('link').first()).toBeVisible();
  });

  test('the primary hero CTA reaches the contact form', async ({ page }) => {
    await page.getByRole('link', { name: /Kérek ingyenes látványtervet/ }).click();
    await expect(page).toHaveURL(/\/kapcsolat$/);
    await expect(page.locator('form #contact-email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Üzenet Küldése' })).toBeEnabled();
  });

  test('the closing CTA reaches the contact form', async ({ page }) => {
    const closing = page.getByRole('link', { name: 'Ingyenes konzultációt kérek' });
    await closing.scrollIntoViewIfNeeded();
    await closing.click();
    await expect(page).toHaveURL(/\/kapcsolat$/);
    await expect(page.locator('form #contact-name')).toBeVisible();
  });
});
