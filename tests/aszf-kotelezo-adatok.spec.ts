import { test, expect, type APIRequestContext } from '@playwright/test';
import { createHash } from 'node:crypto';
import { ASZF } from '../app/aszf/content';

// The approved ÁSZF and the mandatory company data (card 0c1060b6, Marveen 5829, Péter's approval:
// Telegram 12456).

// The approved texts with only their effective-date line filled in (2026-11-01, Péter GO 12491); the
// approved files themselves: hu 85590ed5... (Telegram 12456), en cee4784f..., de 53421b06... (Aura, Marveen
// 5832). A one-line diff each, in Aura's folder as ASZF-*-20261101.md.
const APPROVED_SHA256 = {
  hu: '6e03f2ac0fadb94709471f8557c229662636412763f1d3b37175c94396eef553',
  en: '7acbe54a54ac390f7bb73291ff6db994327fe6fb3e94401a3fe921a8e91315b8',
  de: '7e7c45225171a9034beb6ea74e7d1c6d861e67de09efcb752bd89fcbdcbcb277',
} as const;
const GMAIL = 'peterpohankapersonal@gmail.com';
const LEGAL = ['/impresszum', '/adatvedelmi-nyilatkozat', '/aszf'].flatMap((p) => [p, `/en${p}`, `/de${p}`]);
// The P-Search app's privacy policy names its developer as a private person; its contact address is a
// separate decision (reported with this PR), so those pages are not part of this check.
const EXEMPT = /^\/(en\/|de\/)?p-search\//;

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

test('no page, and no script a page loads, shows the gmail address', async ({ request }) => {
  test.setTimeout(180_000);
  const bad: string[] = [];
  const scripts = new Set<string>();
  for (const path of [...new Set([...(await sitemapPaths(request)), ...LEGAL])].filter((p) => !EXEMPT.test(p))) {
    const html = await (await request.get(path)).text();
    if (html.includes(GMAIL)) bad.push(path);
    for (const m of html.matchAll(/\/_next\/static\/[^"'\\\s]+?\.js/g)) scripts.add(m[0]);
  }
  for (const src of scripts) if ((await (await request.get(src)).text()).includes(GMAIL)) bad.push(src);
  expect(bad).toEqual([]);
});

for (const lang of ['hu', 'en', 'de'] as const) {
  test(`the ${lang} ÁSZF is the approved text, byte for byte`, async () => {
    const doc = ASZF[lang]!;
    expect(doc.sha256).toBe(APPROVED_SHA256[lang]);
    expect(createHash('sha256').update(doc.markdown, 'utf8').digest('hex')).toBe(APPROVED_SHA256[lang]);
  });
}

/** The words of a markdown text as a reader sees them: markdown syntax out, whitespace collapsed. */
function markdownWords(md: string) {
  return md
    .split('\n')
    .filter((l) => !/^\s*\|?\s*-{3,}/.test(l) && !/^\s*-{3,}\s*$/.test(l)) // table separator rows, rules
    .map((l) => l.replace(/^\s*>\s?/, '').replace(/^\s*#+\s*/, '').replace(/^\s*[-*]\s+/, '').replace(/\|/g, ' '))
    .join(' ')
    .replace(/\*\*|\*/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

for (const [path, lang] of [['/aszf', 'hu'], ['/en/aszf', 'en'], ['/de/aszf', 'de']] as const) {
test(`${path} draws exactly the words of the approved ${lang} text`, async ({ page }) => {
  await page.goto(path);
  await expect(page.getByTestId('aszf-doc')).toHaveAttribute('lang', lang);
  const shown = (await page.getByTestId('aszf-doc').innerText()).split(/\s+/).filter(Boolean);
  const source = markdownWords(ASZF[lang]!.markdown);
  // first difference, for a readable failure
  const at = shown.findIndex((w, i) => w !== source[i]);
  expect(at === -1 ? null : { at, shown: shown.slice(Math.max(0, at - 5), at + 5).join(' '), source: source.slice(Math.max(0, at - 5), at + 5).join(' ') }).toBeNull();
  expect(shown.length).toBe(source.length);
});
}

for (const [path, labels] of [
  ['/impresszum', ['Teljes cégnév', 'Ügyvezetők', 'Tárhelyszolgáltató', 'Békéltető testület']],
  ['/en/impresszum', ['Full company name', 'Managing directors', 'Hosting provider', 'Consumer conciliation body']],
  ['/de/impresszum', ['Vollständiger Firmenname', 'Geschäftsführer', 'Hosting-Anbieter', 'Verbraucherschlichtungsstelle']],
] as const) {
  test(`${path}: the full name, the managing directors, the host and the conciliation body`, async ({ page }) => {
    await page.goto(path);
    const main = page.locator('#main-content');
    for (const t of [...labels, 'Pohánka és Társa Könyvelő Iroda Korlátolt Felelősségű Társaság', 'Pohánka Józsefné, Pohánka József', 'Vercel Inc.', 'Győr-Moson-Sopron Vármegyei Békéltető Testület', 'bekelteto.testulet@gymsmkik.hu', 'info@pohankaestarsa.com']) {
      await expect(main).toContainText(t);
    }
  });
}

test('the cart-abandonment demo is gone: privacy notice, and /szolgaltatasok HTML and scripts', async ({ page, request }) => {
  // Peter, Telegram 12485: the demo never worked live (its n8n workflow is inactive) and was taken out
  await page.goto('/adatvedelmi-nyilatkozat');
  await expect(page.locator('#main-content')).not.toContainText('Kosárelhagyás');
  const bad: string[] = [];
  for (const path of ['/szolgaltatasok', '/en/szolgaltatasok', '/de/szolgaltatasok']) {
    const html = await (await request.get(path)).text();
    if (html.includes('abandoned-cart')) bad.push(`${path} html`);
    for (const src of new Set([...html.matchAll(/\/_next\/static\/[^"'\\\s]+?\.js/g)].map((m) => m[0]))) {
      if ((await (await request.get(src)).text()).includes('abandoned-cart')) bad.push(`${path} ${src}`);
    }
  }
  expect(bad).toEqual([]);
});
