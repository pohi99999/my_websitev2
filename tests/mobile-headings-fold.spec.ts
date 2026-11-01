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

// Lumen 5758: with the keyboard, after the cookie choice, the configurator's sample buttons scrolled
// under the sticky call-to-action bar (up to 44 px, the focus ring hidden too).
for (const path of ['/', '/en', '/de']) {
  test(`keyboard focus on the sample buttons stays above the bottom bar, with its ring: ${path} at 375 px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
    await page.goto(path);
    const samples = page.locator('[role="group"][aria-labelledby="configurator-samples-label"] button');
    const count = await samples.count();
    expect(count).toBe(5);
    const covered: string[] = [];
    let seen = 0;
    for (let i = 0; i < 80 && seen < count; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(async () => {
        const a = document.activeElement as HTMLElement | null;
        if (!a || !a.closest('[aria-labelledby="configurator-samples-label"]')) return null;
        // the focus scroll is animated (scroll-behavior: smooth, Lenis 1.2 s): measure once it has
        // been still for 400 ms
        let last = scrollY;
        for (let still = 0, t = 0; still < 400 && t < 3000; t += 50) {
          await new Promise((res) => setTimeout(res, 50));
          still = scrollY === last ? still + 50 : 0;
          last = scrollY;
        }
        const bar = [...document.querySelectorAll('body *')].find((e) => {
          const b = e.getBoundingClientRect();
          return getComputedStyle(e).position === 'fixed' && b.bottom >= innerHeight - 1 && b.height < 200 && b.width > innerWidth * 0.8;
        });
        const barTop = bar ? bar.getBoundingClientRect().top : innerHeight;
        // the ring: 2 px offset + 2 px ring outside the box
        return { text: a.textContent?.trim(), overlap: Math.max(0, Math.round(a.getBoundingClientRect().bottom + 4 - barTop)) };
      });
      if (!r) continue;
      seen++;
      if (r.overlap > 0) covered.push(`${r.text}: ${r.overlap} px under the bar`);
    }
    expect(seen).toBe(count);
    expect(covered).toEqual([]);
    await ctx.close();
  });
}

test('on a phone the keyboard reaches the skip link and the header before the sticky bar', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => window.localStorage.setItem('pt-cookie-consent', 'necessary'));
  await page.goto('/');
  // the bar is a client-only dynamic import: wait until it is in the page, or the order is not tested
  await page.getByTestId('mobile-sticky-cta').waitFor();
  const where: string[] = [];
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab');
    where.push(await page.evaluate(() => {
      const a = document.activeElement as HTMLElement;
      if (a.closest('header')) return 'header';
      if (a.matches('a[href="#main-content"]')) return 'skip';
      const fixed = (e: Element | null): boolean => !!e && (getComputedStyle(e).position === 'fixed' || fixed(e.parentElement));
      return fixed(a) ? 'fixed-bar' : 'other';
    }));
  }
  expect(where[0]).toBe('skip');
  expect(where.slice(1)).toEqual(['header', 'header']);
  await ctx.close();
});

test('the hero intro paragraph holds no link or button (nothing focusable), in every language', async ({ page }) => {
  for (const path of ['/', '/en', '/de']) {
    await page.goto(path);
    const n = await page.locator('#home h1 ~ p').evaluate((p) => p.querySelectorAll('a, button, input, select, textarea, [tabindex]').length);
    expect(n, path).toBe(0);
  }
});

// Marveen 5766: on a first visit the cookie banner must leave the hero title and the configurator
// button visible on a phone, and its two choices must be equal (size and emphasis, GDPR / NMHH), each
// a 44 px touch target, with the privacy notice still linked.
const bannerCheck = () => {
  const card = document.querySelector('#cookie-consent')!.firstElementChild as HTMLElement;
  const btns = [...card.querySelectorAll('button')].map((b) => {
    const r = b.getBoundingClientRect();
    const cs = getComputedStyle(b);
    return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), look: [cs.backgroundColor, cs.color, cs.fontWeight, cs.fontSize, cs.borderTopColor, cs.borderTopWidth].join(' ') };
  });
  const link = card.querySelector('a');
  return {
    top: Math.round(card.getBoundingClientRect().top),
    title: Math.round(document.querySelector('#home h1')!.getBoundingClientRect().bottom),
    button: Math.round(document.querySelector('[data-testid="configurator"] button[type="submit"]')!.getBoundingClientRect().bottom),
    btns,
    link: link ? { href: link.getAttribute('href'), visible: link.getBoundingClientRect().height > 0 } : null,
  };
};

for (const width of [360, 375, 390, 412]) {
  test(`first visit at ${width} px: the hero title and the button are above the cookie banner, its choices equal`, async ({ browser }) => {
    for (const path of ['/', '/en', '/de']) {
      const ctx = await browser.newContext({ viewport: { width, height: 812 } });
      const page = await ctx.newPage();
      await page.goto(path);
      await expect(page.locator('#cookie-consent')).toBeVisible();
      const m = await page.evaluate(bannerCheck);
      expect(m.title, `${path} title`).toBeLessThanOrEqual(m.top);
      expect(m.button, `${path} button`).toBeLessThanOrEqual(m.top);
      expect(m.btns, `${path} two choices`).toHaveLength(2);
      const [a, b] = m.btns;
      expect([b.w, b.h, b.top, b.look], `${path} equal, one row`).toEqual([a.w, a.h, a.top, a.look]);
      expect(a.h, `${path} touch target`).toBeGreaterThanOrEqual(44);
      expect(m.link?.visible, `${path} privacy link`).toBe(true);
      expect(m.link?.href, `${path} privacy link`).toMatch(/adatvedelmi-nyilatkozat$/);
      await ctx.close();
    }
  });
}

test('on a wide screen the cookie choices are equal too', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('/de');
  const [a, b] = (await page.evaluate(bannerCheck)).btns;
  expect([b.w, b.h, b.top, b.look]).toEqual([a.w, a.h, a.top, a.look]);
  expect(a.h).toBeGreaterThanOrEqual(44);
  await ctx.close();
});
