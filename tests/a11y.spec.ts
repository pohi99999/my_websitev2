import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Automated accessibility check (axe-core) on the main entry pages. Fails only on
// serious and critical violations; moderate/minor ones are logged, not enforced.
const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'weboldal-ai-kkv landing', path: '/weboldal-ai-kkv' },
  { name: 'blog index', path: '/blog' },
];

const BLOCKING = new Set(['serious', 'critical']);

for (const { name, path } of PAGES) {
  test(`a11y: ${name} (${path}) has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    const summary = results.violations.map((v) => ({
      rule: v.id,
      impact: v.impact,
      count: v.nodes.length,
      targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
    }));
    if (summary.length) console.log(`axe ${path}:`, JSON.stringify(summary, null, 2));

    const blocking = summary.filter((v) => v.impact && BLOCKING.has(v.impact));
    expect(blocking, `serious/critical axe violations on ${path}`).toEqual([]);
  });
}
