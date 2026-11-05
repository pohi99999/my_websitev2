import { test, expect } from '@playwright/test';
import { PACKAGES, packagePrice } from '../app/lib/configurator';
import { OTHER_RESULT, featureSummary, parseConfiguratorResponse } from '../app/lib/configuratorUi';
import { BASE_PRICE } from '../app/lib/basePrice';

// The homepage configurator (card ff1d7435): the endpoint (Kenshin, PR #163) answers with keys only,
// the page writes the texts and every price from the shared fixed table (lib/configurator.ts).

test.describe('configurator answer reader', () => {
  test('a valid answer is read; unknown values are dropped and the packages are recomputed', () => {
    expect(parseConfiguratorResponse({ ok: true, source: 'ai', industry: 'beauty', features: ['booking', 'deposit'] })).toEqual({
      industry: 'beauty', features: ['booking', 'deposit'], packages: ['base', 'booking', 'deposit', 'care'],
    });
    const hostile = parseConfiguratorResponse({
      ok: true, industry: 'casino', features: ['booking', 'free_website', 'booking', 7], packages: ['base', 'gold'],
      price: '1 Ft', text: '<img src=x onerror=alert(1)>',
    });
    expect(hostile).toEqual({ industry: 'other', features: ['booking'], packages: ['base', 'booking', 'care'] });
    expect(Object.keys(hostile!).sort()).toEqual(['features', 'industry', 'packages']);
  });

  test('anything that is not a success is null, so the page shows the general sketch', () => {
    for (const bad of [null, undefined, 'ok', [], {}, { ok: false, reason: 'rate_limited' }, { ok: 'true', industry: 'beauty' }, { reply: 'Szia!' }]) {
      expect(parseConfiguratorResponse(bad)).toBeNull();
    }
    expect(OTHER_RESULT.packages).toEqual(['base', 'care']);
  });

  test('the "Main feature" line names what the offer contains, not the industry sample text', () => {
    // a guesthouse that asked for a card deposit: the offer has booking, deposit and voucher
    expect(featureSummary(['base', 'booking', 'deposit', 'voucher', 'care'], 'en')).toBe('online booking + card deposit + gift voucher');
    expect(featureSummary(['base', 'booking', 'deposit', 'care'], 'hu')).toBe('online időpontfoglalás + bankkártyás előleg');
    expect(featureSummary(['base', 'booking', 'care'], 'de')).toBe('Online-Terminbuchung');
    // no add-on: the base package's quote form
    expect(featureSummary(OTHER_RESULT.packages, 'hu')).toBe('ajánlatkérő űrlap');
  });

  test('every package has a price in every language, and the base price is the one on the price card', () => {
    for (const lang of ['hu', 'en', 'de'] as const) {
      expect(packagePrice('base', lang)).toContain(BASE_PRICE[lang]);
      for (const k of PACKAGES) expect(packagePrice(k, lang).length).toBeGreaterThan(3);
    }
  });
});

test.describe('configurator on the homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
  });

  test('a sample builds the sketch and the offer; the button prefills the contact form', async ({ page }) => {
    // the real endpoint: without a model key it answers from its own keyword rules (source "keywords")
    await page.goto('/');
    const box = page.getByTestId('configurator');
    await box.getByRole('button', { name: 'Kozmetika' }).click();
    const offer = page.getByTestId('configurator-offer');
    await expect(offer).toBeVisible({ timeout: 10_000 });
    await expect(offer).toContainText(BASE_PRICE.hu);
    await expect(offer).toContainText('Bővítmény: bankkártyás előleg');
    await expect(box.locator('[aria-live="polite"]')).toContainText('kozmetikai szalon');

    await offer.getByRole('button', { name: 'Kérem a látványtervet' }).click();
    await expect(page.locator('#home-contact-challenge')).toHaveValue('lead');
    await expect(page.locator('#home-contact-business')).toHaveValue(/bankkártyás előleget.*\n\nJavasolt csomag:\n- Alapcsomag/s);
    await expect(page.locator('#home-contact-name')).toBeFocused();
    // the button keeps the promise the visitor just clicked on
    await expect(page.locator('#contact-form button[type="submit"]')).toHaveText('Kérem a látványtervet');
  });

  test('without the configurator the home form keeps its own button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#contact-form button[type="submit"]')).toHaveText('Kérek ingyenes konzultációt');
  });

  test('a schema answer from the endpoint wins over the keywords; a price in it never shows', async ({ page }) => {
    await page.route('**/api/chat', (route) =>
      route.fulfill({ json: { ok: true, industry: 'carpentry', features: ['quote'], price: '9 Ft', name: 'HACK' } })
    );
    await page.goto('/');
    await page.locator('#configurator-text').fill('Fodrászszalonom van.');
    await page.getByTestId('configurator').getByRole('button', { name: 'Mutassa' }).click();
    const offer = page.getByTestId('configurator-offer');
    await expect(offer).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('configurator')).toContainText('asztalosműhely');
    await expect(page.getByTestId('configurator')).not.toContainText('9 Ft');
    await expect(page.getByTestId('configurator')).not.toContainText('HACK');
  });

  test('a refused request (403) shows the general sketch with the base package only', async ({ page }) => {
    await page.route('**/api/chat', (route) => route.fulfill({ status: 403, json: { error: 'Forbidden' } }));
    await page.goto('/');
    await page.getByTestId('configurator').getByRole('button', { name: 'Fodrász' }).click();
    const offer = page.getByTestId('configurator-offer');
    await expect(offer).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('configurator')).toContainText('helyi szolgáltató');
    await expect(offer).not.toContainText('Bővítmény');
  });

  test('English free text with a card deposit: the summary says so, as the offer does', async ({ page }) => {
    // keyword rules (no model key): a guesthouse defaults to booking + voucher, the text adds the deposit
    await page.goto('/en');
    await page.locator('#configurator-text').fill('I run a guesthouse and want online booking with a card deposit.');
    await page.getByTestId('configurator').getByRole('button', { name: 'Show me' }).click();
    await expect(page.getByTestId('configurator-offer')).toContainText('Add-on: card deposit', { timeout: 10_000 });
    await expect(page.getByTestId('configurator').locator('[aria-live="polite"]')).toContainText('card deposit');
  });

  test('the offer rows line up in two columns; the mock phone button is one whole word', async ({ browser }) => {
    // Lumen 5718: at 1024 px the price column started at 491/279/268/559 px (flex rows), and the phone
    // showed the first word of the CTA ("KEZELÉST"). Now a grid column, and Foglalás / Ajánlat.
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
    await p.goto('/');
    await p.locator('#configurator-text').fill('Kozmetikus vagyok, foglalást, bankkártyás előleget és ajándékutalványt szeretnék.');
    await p.getByTestId('configurator').getByRole('button', { name: 'Mutassa' }).click();
    const offer = p.getByTestId('configurator-offer');
    await expect(offer.locator('li')).toHaveCount(5, { timeout: 10_000 });
    const xs = await offer.locator('li strong').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().left)));
    expect(new Set(xs).size).toBe(1);
    await expect(p.locator('.cfg-p-btn')).toHaveText('Foglalás');
    await p.getByTestId('configurator').getByRole('button', { name: 'Asztalos' }).click();
    await expect(p.locator('.cfg-p-btn')).toHaveText('Ajánlat', { timeout: 10_000 });
    await ctx.close();
  });

  test('English page, reduced motion: the whole sketch shows at once', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
    await p.goto('/en');
    await p.getByTestId('configurator').getByRole('button', { name: 'Guesthouse' }).click();
    await expect(p.getByTestId('configurator-offer')).toContainText(BASE_PRICE.en, { timeout: 10_000 });
    expect(await p.locator('.cfg-layer.is-on').count()).toBe(await p.locator('.cfg-layer').count());
    await ctx.close();
  });
});
