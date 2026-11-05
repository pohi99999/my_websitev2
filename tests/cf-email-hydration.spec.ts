import { test, expect, type Page } from '@playwright/test';

// 2026-11-05 live audit: Cloudflare's Email Address Obfuscation rewrites every e-mail address in the HTML, and its
// decoder puts each one back as a text node of its own. An address inside a longer text then splits that text,
// React finds a different DOM than it rendered and throws #418 (measured live on /impresszum and
// /adatvedelmi-nyilatkozat). Cloudflare is not in front of the test server, so this spec does the same rewrite.

const EMAIL = /[\w.-]+@[\w.-]+\.\w+/g;

function asCloudflareDoes(html: string): string {
  const rewritten = html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/)
    .map((part, i) => (i % 2 === 1 ? part : part.replace(EMAIL, (e) => `<span class="__cf_email__" data-e="${e}">[email protected]</span>`)))
    .join('');
  const decoder =
    `<script>document.querySelectorAll('.__cf_email__').forEach(function (s) { s.replaceWith(document.createTextNode(s.dataset.e)); });</script>`;
  return rewritten.replace('</body>', `${decoder}</body>`);
}

async function hydrationErrors(page: Page, path: string): Promise<string[]> {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route(path, async (route) => {
    const response = await route.fetch();
    await route.fulfill({ response, body: asCloudflareDoes(await response.text()) });
  });
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  return errors.filter((m) => /#41[0-9]|#42[0-9]|hydrat/i.test(m));
}

for (const path of ['/impresszum', '/en/impresszum', '/de/impresszum', '/adatvedelmi-nyilatkozat', '/en/adatvedelmi-nyilatkozat', '/kapcsolat', '/aszf']) {
  test(`${path} hydrates with the addresses rewritten`, async ({ page }) => {
    expect(await hydrationErrors(page, path)).toEqual([]);
    await expect(page.locator('body')).toContainText('info@pohankaestarsa.com');
    await expect(page.locator('.__cf_email__')).toHaveCount(0);
  });
}
