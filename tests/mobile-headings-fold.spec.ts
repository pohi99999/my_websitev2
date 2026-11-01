import { test, expect } from '@playwright/test';

// Phones (Marveen 5743, measured on all 82 sitemap URLs): headings are not hyphenated automatically
// any more, so a word that fits its line must never be split, and a word that cannot fit may break
// only at a hyphen (its own or a soft hyphen). And the homepage configurator's "Mutassa" button is on
// the first screen, above the sticky bottom bar.

const PAGES = ['/', '/szolgaltatasok', '/de/szolgaltatasok', '/de/blog', '/de/blog/folyamat-automatizalas-5-lepes', '/blog/brunella-strategiai-white-paper'];

for (const width of [360, 390]) {
  for (const path of PAGES) {
    test(`heading words break only where they must, at a hyphen: ${path} at ${width} px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 800 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
      await page.goto(path);
      const bad = await page.evaluate(() => {
        const out: string[] = [];
        for (const h of document.querySelectorAll('h1, h2, h3')) {
          if (!(h as HTMLElement).offsetParent) continue;
          const cs = getComputedStyle(h);
          const lineW = h.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
          for (let t = walker.nextNode(); t; t = walker.nextNode()) {
            const text = t.textContent ?? '';
            const re = /\S+/g;
            let m: RegExpExecArray | null;
            while ((m = re.exec(text))) {
              const word = m[0];
              const r = document.createRange();
              r.setStart(t, m.index);
              r.setEnd(t, m.index + word.length);
              const tops = [...new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)))];
              if (tops.length < 2) continue;
              // the character the first line ends with (a char right after a break can also report a
              // rect on the previous line, so each character's last rect counts)
              const first = Math.min(...tops);
              let before = '';
              for (let i = 1; i < word.length; i++) {
                const c = document.createRange();
                c.setStart(t, m.index + i);
                c.setEnd(t, m.index + i + 1);
                const rs = [...c.getClientRects()].filter((x) => x.width > 0);
                const last = rs[rs.length - 1];
                if (last && Math.round(last.top) !== first) { before = word[i - 1]; break; }
              }
              const probe = document.createElement('span');
              probe.textContent = word.replace(/­/g, '');
              probe.style.cssText = 'position:absolute;white-space:nowrap;visibility:hidden;font:inherit;letter-spacing:inherit;text-transform:inherit';
              h.appendChild(probe);
              const fits = probe.getBoundingClientRect().width <= lineW + 0.5;
              probe.remove();
              const atHyphen = before === '-' || before === '­';
              if (fits && before !== '-') out.push(`split although it fits: ${word}`);
              if (!fits && !atHyphen) out.push(`broken without a hyphen: ${word}`);
            }
          }
        }
        if (document.documentElement.scrollWidth > window.innerWidth) out.push(`page ${document.documentElement.scrollWidth} px wide`);
        return out;
      });
      expect(bad).toEqual([]);
      await ctx.close();
    });
  }
}

for (const width of [375, 390]) {
  for (const path of ['/', '/en', '/de']) {
    test(`the configurator button is on the first screen, above the bottom bar: ${path} at ${width} px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 812 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
      await page.goto(path);
      const m = await page.evaluate(() => {
        const btn = document.querySelector('[data-testid="configurator"] button[type="submit"]')!.getBoundingClientRect();
        const bar = [...document.querySelectorAll('body *')].find((e) => {
          const r = e.getBoundingClientRect();
          return getComputedStyle(e).position === 'fixed' && r.bottom >= innerHeight - 1 && r.height < 200 && r.width > innerWidth * 0.8;
        });
        return { btnBottom: btn.bottom + scrollY, visible: bar ? bar.getBoundingClientRect().top : innerHeight };
      });
      expect(m.btnBottom).toBeLessThanOrEqual(m.visible);
      await ctx.close();
    });
  }
}
