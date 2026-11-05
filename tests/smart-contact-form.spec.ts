import { test, expect, type Page } from '@playwright/test';

// The "Projekt Egyeztetés" form on /szolgaltatasok sends through /api/contact (SMTP, as /kapcsolat), not
// the n8n lead-form webhook, whose workflow kept nothing (Marveen 5871). Success only when the server
// says ok.

const SUCCESS = 'Köszönjük a megkeresést!';
const ERROR = 'Hiba történt az elküldés során. Kérjük, próbálja újra.';
const SUBMIT = 'button[type="submit"]:has-text("Ajánlatkérés elküldése")';

async function fill(page: Page, description = 'Test project description', budget = '100.000 - 300.000 Ft') {
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="project_description"]', description);
  await page.selectOption('select[name="budget"]', budget);
}

test.describe('SmartContactForm Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/szolgaltatasok');
  });

  test('submits to /api/contact and shows success when the server says ok', async ({ page }) => {
    await expect(page.locator('form').first()).toBeVisible();
    await fill(page);
    await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }));

    const [request] = await Promise.all([page.waitForRequest((req) => req.url().endsWith('/api/contact')), page.click(SUBMIT)]);

    await expect(page.locator(`text=${SUCCESS}`)).toBeVisible();
    expect(request.method()).toBe('POST');
    expect(request.postDataJSON()).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Projekt Egyeztetés (Szolgáltatások oldal)\nTervezett büdzsé: 100.000 - 300.000 Ft\n\nTest project description',
      website: '',
    });
  });

  test('the budget is optional: the form goes out without it, and says so', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="project_description"]', 'Test project');
    await expect(page.locator('select[name="budget"]')).not.toHaveAttribute('required', /.*/);
    await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }));
    const [request] = await Promise.all([page.waitForRequest((req) => req.url().endsWith('/api/contact')), page.click(SUBMIT)]);
    expect(request.postDataJSON().message).toContain('Tervezett büdzsé: nincs megadva');
  });

  test('the "free instant demo" option is gone', async ({ page }) => {
    await expect(page.locator('select[name="budget"] option', { hasText: 'Azonnali demó' })).toHaveCount(0);
  });

  test('shows the error, not the success, when the server fails', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ ok: false, error: 'Unexpected error' }) }));
    await fill(page, 'Test failure project', '100.000 - 300.000 Ft');
    await page.click(SUBMIT);

    await expect(page.locator(`text=${ERROR}`)).toBeVisible();
    await expect(page.locator(`text=${SUCCESS}`)).toHaveCount(0);
  });

  test('shows the error when the server answers 200 without ok', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: false }) }));
    await fill(page);
    await page.click(SUBMIT);

    await expect(page.locator(`text=${ERROR}`)).toBeVisible();
    await expect(page.locator(`text=${SUCCESS}`)).toHaveCount(0);
  });

  test('never calls the n8n lead-form webhook', async ({ page }) => {
    const webhook: string[] = [];
    page.on('request', (r) => { if (r.url().includes('/webhook/lead-form')) webhook.push(r.url()); });
    await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }));
    await fill(page);
    await page.click(SUBMIT);
    await expect(page.locator(`text=${SUCCESS}`)).toBeVisible();
    expect(webhook).toEqual([]);
  });
});
