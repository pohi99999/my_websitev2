import { test, expect, type Page, type Route } from '@playwright/test';

// Every real lead form reports exactly one `form_submit` gtag event per submit, and `success`
// only after the server answered ok. `generate_lead` is derived in GA from form_submit+success,
// so the code must never send it itself (it would double the conversions).
// The demo forms (AbandonedCartDemo, InstantResponderDemo, BrunellaDemoForm) are not leads.

type GtagCall = unknown[];

async function recordGtag(page: Page) {
  // GA itself only loads on the production host after consent; on localhost window.gtag is ours.
  await page.addInitScript(() => {
    const w = window as unknown as { __gtagCalls: unknown[][]; gtag: (...args: unknown[]) => void };
    w.__gtagCalls = [];
    w.gtag = (...args: unknown[]) => { w.__gtagCalls.push(args); };
  });
}

async function events(page: Page): Promise<GtagCall[]> {
  return page.evaluate(() =>
    ((window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls || []).filter((c) => c[0] === 'event')
  );
}

// Holds the request until release(), so the test can see that nothing was reported before the answer.
function gatedRoute(fulfill: (route: Route) => Promise<void>) {
  let release!: () => void;
  const gate = new Promise<void>((r) => { release = r; });
  return { handler: async (route: Route) => { await gate; await fulfill(route); }, release };
}

type FormCase = {
  name: string;
  path: string;
  endpoint: string;
  form: string;
  page: string;
  okBody: string;
  fill: (page: Page) => Promise<void>;
  submit: string;
};

const CASES: FormCase[] = [
  {
    name: 'contact page form',
    path: '/kapcsolat',
    endpoint: '**/api/contact',
    form: 'contact_main',
    page: 'contact',
    okBody: JSON.stringify({ ok: true }),
    fill: async (page) => {
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('textarea[name="message"]', 'Test message');
    },
    submit: 'form button[type="submit"]',
  },
  {
    name: 'smart contact form',
    path: '/szolgaltatasok',
    endpoint: '**/webhook/lead-form',
    form: 'smart_contact',
    page: 'services',
    okBody: 'ok',
    fill: async (page) => {
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('textarea[name="project_description"]', 'Test project description');
      await page.selectOption('select[name="budget"]', '100.000 - 300.000 Ft');
    },
    submit: 'button[type="submit"]:has-text("Ajánlatkérés elküldése")',
  },
  {
    name: 'lead magnet form',
    path: '/hatekonysagi-audit',
    endpoint: '**/api/lead-magnet-audit',
    form: 'lead_magnet',
    page: 'efficiency_audit',
    okBody: JSON.stringify({ ok: true }),
    fill: async (page) => {
      await page.selectOption('select[name="industry"]', 'E-kereskedelem');
      await page.check('input[name="size"][value="1-5 fő"]');
      await page.click('button[type="submit"]:has-text("Tovább")');
      await page.selectOption('select[name="pain_points"]', 'Ajánlatadás és számlázás');
      await page.check('input[name="goals"][value="Költségek optimalizálása"]');
      await page.click('button[type="submit"]:has-text("Tovább")');
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
    },
    submit: 'button[type="submit"]:has-text("Audit Kérése")',
  },
];

for (const c of CASES) {
  test.describe(`form_submit tracking: ${c.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await recordGtag(page);
      await page.goto(c.path);
    });

    test('success is reported once, and only after the server answered ok', async ({ page }) => {
      const language = await page.evaluate(() => document.documentElement.lang);
      const gated = gatedRoute((route) => route.fulfill({ status: 200, contentType: 'application/json', body: c.okBody }));
      await page.route(c.endpoint, gated.handler);
      await c.fill(page);

      await Promise.all([page.waitForRequest((r) => r.url().includes(c.endpoint.replace('**', ''))), page.click(c.submit)]);
      expect(await events(page)).toEqual([]);

      gated.release();
      await expect.poll(() => events(page)).toEqual([
        ['event', 'form_submit', { form: c.form, status: 'success', language, page: c.page }],
      ]);
      await page.waitForTimeout(300);
      const all = await events(page);
      expect(all).toHaveLength(1);
      expect(all.some((e) => e[1] === 'generate_lead')).toBe(false);
    });

    test('a server error is reported once as error_response', async ({ page }) => {
      await page.route(c.endpoint, (route) =>
        route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ ok: false }) })
      );
      await c.fill(page);
      await page.click(c.submit);

      await expect.poll(async () => (await events(page)).length).toBeGreaterThan(0);
      await page.waitForTimeout(300);
      const all = await events(page);
      expect(all.map((e) => (e[2] as { status: string }).status)).toEqual(['error_response']);
      expect((all[0][2] as { form: string }).form).toBe(c.form);
    });

    test('a network failure is reported once as error_exception', async ({ page }) => {
      await page.route(c.endpoint, (route) => route.abort('failed'));
      await c.fill(page);
      await page.click(c.submit);

      await expect.poll(async () => (await events(page)).length).toBeGreaterThan(0);
      await page.waitForTimeout(300);
      const all = await events(page);
      expect(all.map((e) => (e[2] as { status: string }).status)).toEqual(['error_exception']);
    });
  });
}

test('a filled honeypot on the contact page is not counted as a lead', async ({ page }) => {
  await recordGtag(page);
  await page.goto('/kapcsolat');
  // The API answers ok to a filled honeypot on purpose (the bot must not learn it was caught).
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
  );
  await page.fill('input[name="name"]', 'Bot');
  await page.fill('input[name="email"]', 'bot@example.com');
  await page.fill('textarea[name="message"]', 'spam');
  // The field is display:none, so fill it the way a bot script does (Playwright's fill skips hidden inputs).
  await page.evaluate(() => {
    const el = document.querySelector('input[name="website"]') as HTMLInputElement;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(el, 'http://spam.example');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const [request] = await Promise.all([page.waitForRequest('**/api/contact'), page.click('form button[type="submit"]')]);
  expect(request.postDataJSON().website).toBe('http://spam.example');
  await page.waitForTimeout(500);
  expect(await events(page)).toEqual([]);
});
