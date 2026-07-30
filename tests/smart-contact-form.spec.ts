import { test, expect } from '@playwright/test';

test.describe('SmartContactForm Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/szolgaltatasok');
  });

  test('submits successfully and shows success message', async ({ page }) => {
    await expect(page.locator('form').first()).toBeVisible();

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="project_description"]', 'Test project description');
    await page.selectOption('select[name="budget"]', '100.000 - 300.000 Ft');

    // Setup network mock before clicking
    const [request] = await Promise.all([
      page.waitForRequest(req => req.url().includes('/webhook/lead-form')),
      page.route('**/webhook/lead-form', async (route) => {
        await route.fulfill({ status: 200, body: 'ok' });
      }),
      // Click submit
      page.click('button[type="submit"]:has-text("Ajánlatkérés elküldése")')
    ]);

    const postData = request.postDataJSON();

    // Verify success message
    await expect(page.locator('text=Köszönjük a megkeresést!')).toBeVisible();

    // Verify the correct request payload was sent
    expect(postData).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      project_description: 'Test project description',
      budget: '100.000 - 300.000 Ft'
    });
  });

  test('shows error message on network failure', async ({ page }) => {
    // Setup network mock to return an error before clicking
    await page.route('**/webhook/lead-form', async (route) => {
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="project_description"]', 'Test failure project');
    await page.selectOption('select[name="budget"]', 'Azonnali demó (Ingyenes)');

    await page.click('button[type="submit"]:has-text("Ajánlatkérés elküldése")');

    // Verify error message
    await expect(page.locator('text=Hiba történt az elküldés során. Kérjük, próbálja újra.')).toBeVisible();
  });
});
