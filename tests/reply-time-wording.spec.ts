import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// 2026-11-05, Peter 13530 and 13607: the forms promise a reply within 1 working day instead of "soon", and the audit form
// does not promise a generated PDF nobody sends. The APIs are mocked: no mail goes out.

const SOURCES = ['app/components/ContactCapture.tsx', 'app/components/LeadMagnetForm.tsx', 'app/components/SmartContactForm.tsx', 'app/portfolio/brunella-bas/brunellaPageContent.js', 'app/lib/webmcp/requestQuoteTool.ts'];

test('no form text says "soon" any more', () => {
  for (const f of SOURCES) {
    const s = readFileSync(f, 'utf-8');
    for (const word of ['hamarosan', 'in Kürze', 'shortly', 'get in touch with you soon']) expect(s, `${f}: ${word}`).not.toContain(word);
  }
});

const ok = { status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) };

for (const c of [
  { path: '/hatekonysagi-audit', pick: 'E-kereskedelem (Webshop)', size: '1-5 fő', next: 'Tovább', pain: 'Ajánlatadás és számlázás', goal: 'Költségek optimalizálása', email: '6. Hova írjunk vissza?', submit: 'Audit Kérése', done: 'Átnézzük az adatait, és 1 munkanapon belül visszaírunk.' },
  { path: '/en/hatekonysagi-audit', pick: 'E-commerce (online shop)', size: '1-5 people', next: 'Next', pain: 'Quoting and invoicing', goal: 'Optimising costs', email: '6. Where should we reply?', submit: 'Request the audit', done: 'We will review your details and reply within 1 working day.' },
  { path: '/de/hatekonysagi-audit', pick: 'E-Commerce (Webshop)', size: '1-5 Personen', next: 'Weiter', pain: 'Angebote und Rechnungen', goal: 'Kosten optimieren', email: '6. Wohin dürfen wir antworten?', submit: 'Audit anfordern', done: 'Wir prüfen Ihre Angaben und antworten innerhalb von 1 Arbeitstag.' },
]) {
  test(`${c.path}: the honest question and answer, no PDF, no "generating"`, async ({ page }) => {
    await page.route('**/api/lead-magnet-audit', (route) => route.fulfill(ok));
    await page.goto(c.path);
    await page.selectOption('select[name="industry"]', { label: c.pick });
    await page.getByLabel(c.size).check();
    await page.getByRole('button', { name: c.next }).click();
    await page.selectOption('select[name="pain_points"]', { label: c.pain });
    await page.getByLabel(c.goal).check();
    await page.getByRole('button', { name: c.next }).click();
    await expect(page.getByText(c.email)).toBeVisible();
    await expect(page.locator('main')).not.toContainText('PDF');
    await page.fill('input[name="name"]', 'Teszt');
    await page.fill('input[name="email"]', 'teszt@example.com');
    await page.getByRole('button', { name: c.submit }).click();
    await expect(page.getByText(c.done)).toBeVisible();
  });
}

for (const [path, name, email, done] of [
  ['/', 'Teszt', 'teszt@example.com', 'Elmentettük az érdeklődést, 1 munkanapon belül jelentkezünk.'],
  ['/en', 'Test', 'test@example.com', 'We saved your request and will get back to you within 1 working day.'],
  ['/de', 'Test', 'test@example.com', 'Ihre Anfrage wurde gespeichert und wir melden uns innerhalb von 1 Arbeitstag.'],
]) {
  test(`${path}: the home form promises 1 working day`, async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill(ok));
    await page.goto(path);
    await page.fill('#home-contact-name', name);
    await page.fill('#home-contact-email', email);
    await page.locator('#contact-form button[type="submit"]').click();
    await expect(page.getByText(done)).toBeVisible();
  });
}

test('/szolgaltatasok: the project form promises 1 working day', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill(ok));
  await page.goto('/szolgaltatasok');
  await page.fill('input[name="name"]', 'Teszt');
  await page.fill('input[name="email"]', 'teszt@example.com');
  await page.fill('textarea[name="project_description"]', 'Teszt');
  await page.click('button[type="submit"]:has-text("Ajánlatkérés elküldése")');
  await expect(page.getByText('1 munkanapon belül felveszi Önnel a kapcsolatot.')).toBeVisible();
});
