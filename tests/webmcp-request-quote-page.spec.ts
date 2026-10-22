import { test, expect, type Page } from '@playwright/test';

// A kiserleti WebMCP request_quote eszkoz bongeszos tesztjei a fooldalon.
// A document.modelContext-et addInitScript-tel mockoljuk. Az /api/contact
// hivasokat page.route-tal elkapjuk, a szerverig SOHA nem jutnak el, igy
// valodi email nem mehet ki. Minden teszt-payload [TESZT] jelolesu.

const INPUT = {
  name: '[TESZT] WebMCP Teszt Elek',
  email: 'teszt@example.com',
  need: 'accounting',
  business: '[TESZT] automata teszt, ne valaszolj',
};

async function installModelContextMock(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __webmcpTools: unknown[]; __webmcpRegisterCalls: number };
    w.__webmcpTools = [];
    w.__webmcpRegisterCalls = 0;
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {
        registerTool(tool: unknown, options?: { signal?: AbortSignal }) {
          w.__webmcpRegisterCalls++;
          w.__webmcpTools.push(tool);
          options?.signal?.addEventListener('abort', () => {
            w.__webmcpTools = w.__webmcpTools.filter((t) => t !== tool);
          });
          return Promise.resolve();
        },
      },
    });
  });
}

async function captureContactRequests(page: Page) {
  const bodies: unknown[] = [];
  await page.route('**/api/contact', async (route) => {
    bodies.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });
  return bodies;
}

test.describe('WebMCP request_quote tool (page)', () => {
  test('(a) without document.modelContext nothing is registered and the form renders unchanged', async ({ page, browser }) => {
    await page.goto('/');
    await expect(page.locator('#contact-form form')).toBeVisible();
    expect(await page.evaluate(() => 'modelContext' in document)).toBe(false);
    await expect(page.locator('[data-webmcp-confirm]')).toHaveCount(0);
    const htmlWithout = await page.locator('#contact').innerHTML();

    // Ugyanaz az oldal mockolt API-val: amig nincs hivas, a DOM azonos.
    const context = await browser.newContext();
    const mocked = await context.newPage();
    await installModelContextMock(mocked);
    await mocked.goto('/');
    await expect(mocked.locator('#contact-form form')).toBeVisible();
    await expect.poll(() => mocked.evaluate(() => (window as any).__webmcpTools.length)).toBe(1);
    expect(await mocked.locator('#contact').innerHTML()).toBe(htmlWithout);
    await context.close();
  });

  test('(b) with a mocked document.modelContext exactly one tool is registered', async ({ page }) => {
    await installModelContextMock(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => (window as any).__webmcpTools.length)).toBe(1);
    const tool = await page.evaluate(() => {
      const t = (window as any).__webmcpTools[0];
      return { name: t.name, required: t.inputSchema.required, needs: t.inputSchema.properties.need.enum, calls: (window as any).__webmcpRegisterCalls };
    });
    expect(tool).toEqual({ name: 'request_quote', required: ['name', 'email', 'need'], needs: ['lead', 'accounting', 'support', 'other'], calls: 1 });
  });

  test('(c)+(d) the tool waits for on-page confirmation, then posts the same payload as the form', async ({ page }) => {
    await installModelContextMock(page);
    const bodies = await captureContactRequests(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => (window as any).__webmcpTools.length)).toBe(1);

    // Referencia: a valodi urlap payloadja ugyanazokkal az adatokkal.
    await page.fill('#home-contact-name', INPUT.name);
    await page.fill('#home-contact-email', INPUT.email);
    await page.selectOption('#home-contact-challenge', INPUT.need);
    await page.fill('#home-contact-business', INPUT.business);
    // requestSubmit: a mobil nezeten a cookie-banner eltakarhatja a gombot
    await page.locator('#contact-form form').evaluate((form: HTMLFormElement) => form.requestSubmit());
    await expect.poll(() => bodies.length).toBe(1);
    const formBody = bodies[0];

    // Az agens meghivja az eszkozt; meg semmi nem mehet ki.
    await page.evaluate((input) => {
      const w = window as any;
      w.__webmcpResult = null;
      w.__webmcpTools[0].execute(input, { signal: new AbortController().signal }).then((r: unknown) => { w.__webmcpResult = r; });
    }, INPUT);

    const dialog = page.getByRole('dialog', { name: 'Ajánlatkérés megerősítése' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(INPUT.name);
    await expect(dialog).toContainText(INPUT.email);
    await expect(dialog).toContainText('Ajánlatkérő weboldal');
    await expect(dialog).toContainText(INPUT.business);
    await page.waitForTimeout(300);
    expect(bodies).toHaveLength(1);

    await dialog.getByRole('button', { name: 'Igen, elküldöm' }).click();
    await expect.poll(() => bodies.length).toBe(2);
    expect(bodies[1]).toEqual(formBody);
    await expect(dialog).toHaveCount(0);
    const result = await page.evaluate(() => (window as any).__webmcpResult);
    expect(result.isError).toBeUndefined();
  });

  test('(c) invalid tool input is rejected without showing the dialog or sending anything', async ({ page }) => {
    await installModelContextMock(page);
    const bodies = await captureContactRequests(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => (window as any).__webmcpTools.length)).toBe(1);

    const result = await page.evaluate(() =>
      (window as any).__webmcpTools[0].execute({ name: '[TESZT]', email: 'nem-email', need: 'lead' }, { signal: new AbortController().signal })
    );
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('email:');
    await expect(page.getByRole('dialog', { name: 'Ajánlatkérés megerősítése' })).toHaveCount(0);
    expect(bodies).toHaveLength(0);
  });

  test('(d) cancelling the confirmation sends nothing', async ({ page }) => {
    await installModelContextMock(page);
    const bodies = await captureContactRequests(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => (window as any).__webmcpTools.length)).toBe(1);

    await page.evaluate((input) => {
      const w = window as any;
      w.__webmcpResult = null;
      w.__webmcpTools[0].execute(input, { signal: new AbortController().signal }).then((r: unknown) => { w.__webmcpResult = r; });
    }, INPUT);

    const dialog = page.getByRole('dialog', { name: 'Ajánlatkérés megerősítése' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Mégse' }).click();
    await expect(dialog).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => (window as any).__webmcpResult?.isError)).toBe(true);
    await page.waitForTimeout(300);
    expect(bodies).toHaveLength(0);
  });
});
