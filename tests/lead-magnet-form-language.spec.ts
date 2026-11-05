import { test, expect } from '@playwright/test';

// 2026-11-05 live audit: /en and /de/hatekonysagi-audit showed the whole form in Hungarian under a translated title.
// The API is mocked; the values sent stay Hungarian, because the n8n workflow saves them as they are.

const HUNGARIAN = ['Tudja meg', 'Lépés', 'Melyik iparágban', 'Tovább', 'Vissza', 'Válasszon', 'Hova küldjük', 'Audit Kérése'];

for (const c of [
  { path: '/en/hatekonysagi-audit', h1: 'Digital Efficiency Audit', next: 'Next', submit: 'Request the audit', label: 'E-commerce (online shop)', size: '1-5 people', goal: 'Optimising costs', pain: 'Quoting and invoicing' },
  { path: '/de/hatekonysagi-audit', h1: 'Digitales Effizienz-Audit', next: 'Weiter', submit: 'Audit anfordern', label: 'E-Commerce (Webshop)', size: '1-5 Personen', goal: 'Kosten optimieren', pain: 'Angebote und Rechnungen' },
]) {
  test(`${c.path}: all three steps are translated, the values sent are not`, async ({ page }) => {
    let body: Record<string, string> | undefined;
    await page.route('**/api/lead-magnet-audit', (route) => {
      body = route.request().postDataJSON();
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto(c.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(c.h1);
    const main = page.locator('main');
    const noHungarian = async () => { for (const w of HUNGARIAN) await expect(main).not.toContainText(w); };

    await noHungarian();
    await page.selectOption('select[name="industry"]', { label: c.label });
    await page.getByLabel(c.size).check();
    await page.getByRole('button', { name: c.next }).click();

    await noHungarian();
    await page.selectOption('select[name="pain_points"]', { label: c.pain });
    await page.getByLabel(c.goal).check();
    await page.getByRole('button', { name: c.next }).click();

    await noHungarian();
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.getByRole('button', { name: c.submit }).click();
    await expect.poll(() => body).toBeTruthy();
    expect(body).toMatchObject({ industry: 'E-kereskedelem', size: '1-5 fő', pain_points: 'Ajánlatadás és számlázás', goals: 'Költségek optimalizálása' });
  });
}

test('/hatekonysagi-audit stays in Hungarian, word for word', async ({ page }) => {
  await page.goto('/hatekonysagi-audit');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Digitális Hatékonysági Audit');
  await expect(page.locator('main')).toContainText('Tudja meg 3 perc alatt, hol veszít a cég munkaórákat a kézi folyamatokon, és hogyan állíthatja meg ezt az MI segítségével!');
  await expect(page.locator('main')).toContainText('Lépés 1/3');
  await expect(page.locator('main')).toContainText('1. Melyik iparágban tevékenykedik a cég?');
});
