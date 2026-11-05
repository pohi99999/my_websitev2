import { test, expect } from '@playwright/test';

// 2026-11-05 (Stratega, Peter 13528): every "ingyenes latvanyterv" button lands on /kapcsolat, which offered only a
// free-text message under "Lepjen velunk kapcsolatba". It now asks what the home page form asks, the phone and the
// address are links, and WhatsApp is one tap away. /api/contact is always mocked (it sends real mail).

const CASES = [
  { path: '/kapcsolat', h1: 'Kérjen ingyenes látványtervet vagy konzultációt', button: 'Kérem a látványtervet', need: 'Ajánlatkérő weboldal', head: 'Kapcsolat oldali konzultáció- vagy látványterv-kérés', whatsapp: 'Írok WhatsAppon' },
  { path: '/en/kapcsolat', h1: 'Request a free design preview or consultation', button: 'Request the design preview', need: 'Website with quote requests', head: 'Contact page request', whatsapp: 'Write on WhatsApp' },
  { path: '/de/kapcsolat', h1: 'Fordern Sie einen kostenlosen Entwurf oder eine Beratung an', button: 'Entwurf anfordern', need: 'Website mit Anfrageformular', head: 'Kontaktseiten-Anfrage', whatsapp: 'Per WhatsApp schreiben' },
];

for (const c of CASES) {
  test.describe(c.path, () => {
    test('heading, links and WhatsApp', async ({ page }) => {
      await page.goto(c.path);
      await expect(page.getByRole('heading', { level: 1, name: c.h1 })).toBeVisible();
      await expect(page.locator('main a[href="tel:+36304291227"]')).toBeVisible();
      await expect(page.locator('main a[href="mailto:info@pohankaestarsa.com"]')).toBeVisible();
      await expect(page.getByRole('link', { name: c.whatsapp })).toHaveAttribute('href', /^https:\/\/wa\.me\/36304291227\?text=/);
    });

    test('the request goes out with the fields of the home page form', async ({ page }) => {
      let body: { name: string; email: string; message: string; website: string } | undefined;
      await page.route('**/api/contact', (route) => {
        body = route.request().postDataJSON();
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
      });
      await page.goto(c.path);
      await page.fill('#contact-name', 'Teszt Elek');
      await page.fill('#contact-email', 'teszt@example.com');
      await page.selectOption('#contact-need', { label: c.need });
      await page.fill('#contact-business', 'Autószerviz');
      await page.getByRole('button', { name: c.button }).click();
      await expect.poll(() => body).toBeTruthy();
      expect(body?.name).toBe('Teszt Elek');
      expect(body?.website).toBe('');
      expect(body?.message).toContain(c.head);
      expect(body?.message).toContain(c.need);
      expect(body?.message).toContain('Autószerviz');
      expect(body?.message).toContain('teszt@example.com');
    });
  });
}

test('/kapcsolat: the business line is optional and capped, and no placeholder sentence is left', async ({ page }) => {
  await page.goto('/kapcsolat');
  await expect(page.locator('#contact-business')).not.toHaveAttribute('required', /.*/);
  await expect(page.locator('#contact-business')).toHaveAttribute('maxlength', '1000');
  await expect(page.locator('main')).not.toContainText('[X');
  await expect(page.locator('main')).not.toContainText('időn belül');
});
