import { test, expect } from '@playwright/test';

// The homepage title on phones (Lumen 5728): with hyphens:auto it broke "auto-matizálás",
// "AI-csa-pat" and "kisvállalkozá-soknak." at 375 px. The size now follows the width so every word
// fits its line; no word of the title may run over two lines from 360 px up.
for (const width of [360, 375, 412]) {
  for (const path of ['/', '/en', '/de']) {
    test(`hero title words stay whole at ${width} px on ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 812 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
      await page.goto(path);
      const split = await page.locator('#home h1').evaluate((h) => {
        const out: string[] = [];
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        for (let t = walker.nextNode(); t; t = walker.nextNode()) {
          const re = /\S+/g;
          let m: RegExpExecArray | null;
          while ((m = re.exec(t.textContent ?? ''))) {
            const r = document.createRange();
            r.setStart(t, m.index);
            r.setEnd(t, m.index + m[0].length);
            const tops = new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)));
            if (tops.size > 1) out.push(m[0]);
          }
        }
        return out;
      });
      expect(split).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await ctx.close();
    });
  }
}
