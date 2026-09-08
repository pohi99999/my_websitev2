import { test, expect } from '@playwright/test';

test.describe('LeadMagnetForm Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hatekonysagi-audit');
  });

  test('submits successfully and shows success message', async ({ page }) => {
    // Fill step 1
    await page.selectOption('select[name="industry"]', 'E-kereskedelem');
    await page.check('input[name="size"][value="1-5 fő"]');
    await page.click('button[type="submit"]:has-text("Tovább")');

    // Fill step 2
    await page.selectOption('select[name="pain_points"]', 'Ajánlatadás és számlázás');
    await page.check('input[name="goals"][value="Költségek optimalizálása"]');
    await page.click('button[type="submit"]:has-text("Tovább")');

    // Fill step 3
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');

    // Mock API response
    await page.route('**/api/lead-magnet-audit', async (route) => {
      await route.fulfill({ status: 200, body: 'ok' });
    });

    const [request] = await Promise.all([
      page.waitForRequest(req => req.url().includes('/api/lead-magnet-audit')),
      page.click('button[type="submit"]:has-text("Audit Kérése")')
    ]);

    const postData = request.postDataJSON();

    await expect(page.locator('text=Sikerült! 🎉')).toBeVisible();

    expect(postData).toEqual({
      industry: 'E-kereskedelem',
      size: '1-5 fő',
      pain_points: 'Ajánlatadás és számlázás',
      goals: 'Költségek optimalizálása',
      name: 'Test User',
      email: 'test@example.com'
    });
  });

  test('shows error message on network failure', async ({ page }) => {
    // Fill step 1
    await page.selectOption('select[name="industry"]', 'Szolgáltatás');
    await page.check('input[name="size"][value="6-20 fő"]');
    await page.click('button[type="submit"]:has-text("Tovább")');

    // Fill step 2
    await page.selectOption('select[name="pain_points"]', 'Marketing és posztolás');
    await page.check('input[name="goals"][value="Cég skálázása (növekedés)"]');
    await page.click('button[type="submit"]:has-text("Tovább")');

    // Fill step 3
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');

    // Mock API error response
    await page.route('**/api/lead-magnet-audit', async (route) => {
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.click('button[type="submit"]:has-text("Audit Kérése")');

    await expect(page.locator('text=Hiba történt a küldés során. Kérjük, próbáld újra később, vagy keress minket az elérhetőségeinken!')).toBeVisible();
  });
});
