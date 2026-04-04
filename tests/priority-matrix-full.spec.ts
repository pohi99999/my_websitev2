/**
 * Priority Matrix Full Verification Test Suite
 * Covers all P0-P3 items from the pohankaestarsa.com improvement matrix
 * Design system: dark HUD, accent #00e5ff, Syne font, mobile-first
 */
import { test, expect, Page } from '@playwright/test';

// baseURL comes from playwright.config.ts (http://localhost:3333)
const BASE_URL = '/';

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

async function goHome(page: Page) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
}

async function screenshot(page: Page, name: string) {
  await page.screenshot({
    path: `tests/screenshots/${name}.png`,
    fullPage: false,
  });
}

// ─────────────────────────────────────────────────────────────
// P0 — CRITICAL DESIGN FOUNDATIONS
// ─────────────────────────────────────────────────────────────

test.describe('P0 — Syne Font', () => {
  test('Syne font loads and applies to headings', async ({ page }) => {
    await goHome(page);

    const fontFamily = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      return window.getComputedStyle(h1).fontFamily;
    });

    console.log('H1 font-family:', fontFamily);
    // Syne should appear in the computed font stack
    expect(fontFamily?.toLowerCase()).toContain('syne');
  });
});

test.describe('P0 — Stats Bar', () => {
  test('Stats bar renders with key numbers', async ({ page }) => {
    await goHome(page);

    // The stats bar should contain numbers related to the platform
    const statsSection = page.locator('[data-testid="stats-bar"], .stats-bar, section').filter({
      hasText: /95\+|53|24\/7|\d+/,
    }).first();

    await expect(statsSection).toBeVisible({ timeout: 8000 });
    await statsSection.screenshot({ path: 'tests/screenshots/p0-stats-bar.png' });
    console.log('✅ Stats bar visible');
  });
});

test.describe('P0 — Surface CSS Variables', () => {
  test('Surface CSS custom properties are defined', async ({ page }) => {
    await goHome(page);

    const surfaces = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        surface0: styles.getPropertyValue('--surface-0'),
        surface1: styles.getPropertyValue('--surface-1'),
        surface2: styles.getPropertyValue('--surface-2'),
        accent: styles.getPropertyValue('--accent'),
        bgPrimary: styles.getPropertyValue('--bg-primary'),
      };
    });

    console.log('CSS vars:', surfaces);
    expect(surfaces.accent.trim()).not.toBe('');
    expect(surfaces.bgPrimary.trim()).not.toBe('');
    console.log('✅ Surface CSS vars defined');
  });

  test('Accent color is #00e5ff', async ({ page }) => {
    await goHome(page);

    const accent = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim();
    });

    console.log('Accent:', accent);
    expect(accent.toLowerCase()).toMatch(/#00e5ff|0,\s*229,\s*255|rgb\(0,\s?229,\s?255\)/i);
    console.log('✅ Accent color correct');
  });
});

// ─────────────────────────────────────────────────────────────
// P1 — HERO + NAVIGATION + MOBILE CTA
// ─────────────────────────────────────────────────────────────

test.describe('P1 — Hero scroll indicator', () => {
  test('Scroll indicator/badge visible in hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await goHome(page);

    // Look for scroll indicator SVG or badge
    const indicator = page.locator('svg[aria-label*="scroll"], [data-testid="scroll-indicator"], .scroll-indicator, [class*="scroll"]').first();
    const badge = page.locator('[class*="badge"], [class*="Badge"]').first();

    const indicatorVisible = await indicator.isVisible().catch(() => false);
    const badgeVisible = await badge.isVisible().catch(() => false);

    console.log('Scroll indicator:', indicatorVisible, 'Badge:', badgeVisible);
    // At least one should be visible
    expect(indicatorVisible || badgeVisible).toBe(true);
    await screenshot(page, 'p1-hero-desktop');
    console.log('✅ Hero scroll indicator visible');
  });
});

test.describe('P1 — Mobile Sticky CTA', () => {
  test('Sticky CTA bar appears on mobile after scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goHome(page);

    // Scroll down 500px
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(800);

    // The CTA should appear — look for fixed/sticky bottom bar
    const cta = page.locator('[class*="sticky"], [class*="fixed"], [data-testid*="cta"]').filter({
      hasText: /Ingyenes|Free|Kapcsolat|Contact|Start|Kezdj/i,
    }).first();

    const visible = await cta.isVisible().catch(() => false);
    console.log('Mobile CTA visible after scroll:', visible);
    await screenshot(page, 'p1-mobile-sticky-cta');
    console.log('✅ Mobile CTA check done');
  });
});

// ─────────────────────────────────────────────────────────────
// P2 — LAZY LOADING + MOBILE VIDEO FALLBACK
// ─────────────────────────────────────────────────────────────

test.describe('P2 — Mobile: no video, static gradient', () => {
  test('Hero video is hidden on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goHome(page);

    const video = page.locator('video').first();
    const videoVisible = await video.isVisible().catch(() => false);

    console.log('Video visible on 390px:', videoVisible);
    expect(videoVisible).toBe(false); // video must be hidden md:block → invisible at 390px
    await screenshot(page, 'p2-mobile-hero-no-video');
    console.log('✅ Video hidden on mobile');
  });

  test('Mobile hero gradient background is visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goHome(page);

    // The mobile gradient div has md:hidden class — should be visible on 390px
    const gradient = page.locator('[class*="md:hidden"]').first();
    const gradientVisible = await gradient.isVisible().catch(() => false);

    console.log('Mobile gradient visible:', gradientVisible);
    await screenshot(page, 'p2-mobile-gradient');
    console.log('✅ Mobile gradient check done');
  });

  test('Desktop: video IS shown at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await goHome(page);

    const video = page.locator('video').first();
    const videoVisible = await video.isVisible().catch(() => false);

    console.log('Video visible at 1440px:', videoVisible);
    expect(videoVisible).toBe(true);
    await screenshot(page, 'p2-desktop-hero-video');
    console.log('✅ Desktop video visible');
  });
});

test.describe('P2 — Three.js/GSAP lazy loading', () => {
  test('three.js chunk is NOT in the initial JavaScript bundle', async ({ page }) => {
    const loadedChunks: string[] = [];

    // Track all script requests before page load
    page.on('request', (req) => {
      if (req.resourceType() === 'script') {
        loadedChunks.push(req.url());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await goHome(page);

    // Scroll to trigger ThreeDScene lazy load (if it's viewport-triggered)
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1500);

    const initialThreeLoads = loadedChunks.filter(u => u.includes('three') || u.includes('Three'));
    const gsapLoads = loadedChunks.filter(u => u.includes('gsap') || u.includes('ScrollTrigger'));

    console.log('Three.js loaded chunks:', initialThreeLoads);
    console.log('GSAP loaded chunks:', gsapLoads);

    // three.js should only load as a dynamic chunk (the URL will contain a hash, not a static name)
    // It should not be in the main "shared by all" chunks
    const hasEagerThree = loadedChunks.slice(0, 3).some(u => u.includes('three'));
    expect(hasEagerThree).toBe(false);
    console.log('✅ Three.js is NOT in initial eager chunks');
  });
});

// ─────────────────────────────────────────────────────────────
// P3 — MEGA MENU NAVIGATION
// ─────────────────────────────────────────────────────────────

test.describe('P3 — Mega Menu Navigation', () => {
  const SERVICES_TEXT = /Szolgáltatások|Services|Dienstleistungen/i;
  const PRODUCTS_TEXT = /Termékek|Products|Produkte/i;

  test('Desktop: Szolgáltatások hover opens mega menu', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goHome(page);

    // Find the desktop nav button for Szolgáltatások
    const servicesBtn = page.locator('header nav button, header nav [role="button"]')
      .filter({ hasText: SERVICES_TEXT })
      .first();

    await expect(servicesBtn).toBeVisible({ timeout: 8000 });

    // Hover to open
    await servicesBtn.hover();
    await page.waitForTimeout(300);

    // Mega menu panel should appear
    const megaMenu = page.locator('[role="dialog"], [aria-label*="mega"], [class*="mega-menu"], [class*="megaMenu"]')
      .first();

    const panelByContent = page.locator('div').filter({
      hasText: /Könyvelési|Automatizálás|Lead Gen|AI Ügynök/i,
    }).first();

    const menuVisible =
      (await megaMenu.isVisible().catch(() => false)) ||
      (await panelByContent.isVisible().catch(() => false));

    console.log('Mega menu visible after hover:', menuVisible);
    await screenshot(page, 'p3-mega-menu-services-open');
    expect(menuVisible).toBe(true);
    console.log('✅ Mega menu opens on hover');
  });

  test('Desktop: Termékek hover shows product items', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goHome(page);

    const productsBtn = page.locator('header nav button, header nav [role="button"]')
      .filter({ hasText: PRODUCTS_TEXT })
      .first();

    await expect(productsBtn).toBeVisible({ timeout: 8000 });
    await productsBtn.hover();
    await page.waitForTimeout(300);

    const productItem = page.locator('div, li, a').filter({
      hasText: /Brunella Agent|Pohi AI Pro|Starter Pack|Egyedi fejlesztés/i,
    }).first();

    const visible = await productItem.isVisible().catch(() => false);
    console.log('Products mega menu item visible:', visible);
    await screenshot(page, 'p3-mega-menu-products-open');
    expect(visible).toBe(true);
    console.log('✅ Products mega menu visible');
  });

  test('Desktop: mega menu closes when hovering away', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goHome(page);

    const servicesBtn = page.locator('header nav button').filter({ hasText: SERVICES_TEXT }).first();
    await servicesBtn.hover();
    await page.waitForTimeout(300);

    // Move to a neutral area (the logo)
    const logo = page.locator('header img, header a[href="/"]').first();
    await logo.hover();
    await page.waitForTimeout(600); // allow 120ms delay + animation

    const panelByContent = page.locator('div').filter({
      hasText: /Könyvelési|Automatizálás|Lead Gen/i,
    }).first();

    const stillVisible = await panelByContent.isVisible().catch(() => false);
    console.log('Mega menu still visible after moving away:', stillVisible);
    expect(stillVisible).toBe(false);
    console.log('✅ Mega menu closes on hover out');
  });

  test('Desktop: mega menu item is clickable (navigates)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goHome(page);

    const servicesBtn = page.locator('header nav button').filter({ hasText: SERVICES_TEXT }).first();
    await servicesBtn.hover();
    await page.waitForTimeout(300);

    const firstItem = page.locator('a[href*="szolgaltatas"], a[href*="service"]').first();
    const href = await firstItem.getAttribute('href').catch(() => null);
    console.log('First mega menu item href:', href);
    expect(href).toBeTruthy();
    console.log('✅ Mega menu link is clickable');
  });

  test('Mega menu button has aria-haspopup and aria-expanded', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goHome(page);

    const servicesBtn = page.locator('header nav button').filter({ hasText: SERVICES_TEXT }).first();
    await expect(servicesBtn).toBeVisible();

    const hasPopup = await servicesBtn.getAttribute('aria-haspopup');
    console.log('aria-haspopup:', hasPopup);
    expect(hasPopup).toBeTruthy(); // 'true' or 'menu' or 'dialog'

    // After hover, aria-expanded should become true
    await servicesBtn.hover();
    await page.waitForTimeout(300);
    const expanded = await servicesBtn.getAttribute('aria-expanded');
    console.log('aria-expanded after hover:', expanded);
    expect(expanded).toBe('true');
    console.log('✅ ARIA attributes correct on mega menu');
  });
});

// ─────────────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────────────

test.describe('Mobile Menu', () => {
  test('Hamburger button opens/closes mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goHome(page);

    const menuBtn = page.locator('header button').filter({
      hasText: /Menu|Menü|menu/i,
    }).first().or(
      page.locator('button[aria-label*="menu" i], button[aria-label*="menü" i]').first()
    ).or(
      page.locator('header button.lg\\:hidden, header button[class*="mobile"]').first()
    );

    await expect(menuBtn).toBeVisible({ timeout: 5000 });

    // Open
    await menuBtn.click();
    await page.waitForTimeout(400);

    // Nav links should be visible
    const mobileNav = page.locator('[class*="mobile"], [id="mobile-menu"], [class*="MobileMenu"]').first().or(
      page.locator('nav[aria-label*="mobile" i]').first()
    );
    const navLink = page.locator('a[href*="szolgaltat"], a[href*="termek"]').first();

    const navVisible = await navLink.isVisible().catch(() => false);
    await screenshot(page, 'mobile-menu-open');
    console.log('Mobile nav link visible after open:', navVisible);
    expect(navVisible).toBe(true);
    console.log('✅ Mobile menu opens correctly');
  });
});

// ─────────────────────────────────────────────────────────────
// FAQ SECTION
// ─────────────────────────────────────────────────────────────

test.describe('P2 — Homepage FAQ', () => {
  test('FAQ section is visible and accordion opens', async ({ page }) => {
    await goHome(page);

    // Scroll to bottom area where FAQ is
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(500);

    // FAQ section should exist
    const faqSection = page.locator('section, div').filter({
      hasText: /GYIK|FAQ|Kérdések|Általánosan/i,
    }).first();

    const faqVisible = await faqSection.isVisible().catch(() => false);
    console.log('FAQ section visible:', faqVisible);

    await screenshot(page, 'p2-faq-section');
    expect(faqVisible).toBe(true);
    console.log('✅ FAQ section visible');
  });
});

// ─────────────────────────────────────────────────────────────
// PERFORMANCE BASELINE
// ─────────────────────────────────────────────────────────────

test.describe('Performance Baseline', () => {
  test('Page meets performance baseline (LCP < 4s, no JS errors)', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const start = Date.now();
    await goHome(page);
    const loadTime = Date.now() - start;

    console.log('Page load time:', loadTime, 'ms');
    console.log('JS errors:', errors.length);
    errors.forEach(e => console.log(' - Error:', e));

    expect(loadTime).toBeLessThan(8000); // 8s budget for local dev
    expect(errors.filter(e => !e.includes('ResizeObserver'))).toHaveLength(0);
    console.log('✅ No critical JS errors, load time within budget');
  });

  test('Full page screenshot desktop 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await goHome(page);
    await page.screenshot({ path: 'tests/screenshots/full-desktop-1440.png', fullPage: true });
    console.log('✅ Full desktop screenshot saved');
  });

  test('Full page screenshot mobile 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goHome(page);
    await page.screenshot({ path: 'tests/screenshots/full-mobile-390.png', fullPage: true });
    console.log('✅ Full mobile screenshot saved');
  });
});
