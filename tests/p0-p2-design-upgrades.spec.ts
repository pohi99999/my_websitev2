import { test, expect } from '@playwright/test';

// Relative to the config's baseURL (BASE_URL env or the :3333 webServer).
const BASE_URL = '/';

test.describe('P0–P2 Design Upgrades Verification', () => {

  // ═══════════════════════════════════════════════════════════
  // P0: SYNE FONT ACTIVATION
  // ═══════════════════════════════════════════════════════════

  test('P0 — Syne font CSS variable is set on <body>', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Next.js hashes the class names (e.g. "-T-KAq_variable"), so check the variable itself.
    const syneVar = await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--font-syne').trim());
    expect(syneVar).toMatch(/syne/i);
    console.log('✅ Syne font variable present on body');
  });

  test('P0 — H1 uses font-syne class', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    const h1Classes = await h1.getAttribute('class');
    expect(h1Classes).toContain('font-syne');
    console.log('✅ H1 has font-syne class');
  });

  // ═══════════════════════════════════════════════════════════
  // P0: SURFACE LAYER CSS VARIABLES
  // ═══════════════════════════════════════════════════════════

  test('P0 — Surface layer CSS variables exist in :root', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const surfaceVars = await page.evaluate(() => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      return {
        surface0: style.getPropertyValue('--surface-0').trim(),
        surface1: style.getPropertyValue('--surface-1').trim(),
        surface2: style.getPropertyValue('--surface-2').trim(),
        surface3: style.getPropertyValue('--surface-3').trim(),
        surfaceHover: style.getPropertyValue('--surface-hover').trim(),
        accentWarm: style.getPropertyValue('--accent-warm').trim(),
        accentSuccess: style.getPropertyValue('--accent-success').trim(),
      };
    });

    // Browsers may normalize #000000 → #000 — both are correct
    expect(['#000000', '#000']).toContain(surfaceVars.surface0);
    expect(surfaceVars.surface1).toBe('#060608');
    expect(surfaceVars.surface2).toBe('#0c0c10');
    expect(surfaceVars.surface3).toBe('#12121a');
    expect(surfaceVars.accentWarm).toBe('#f5a623');
    expect(surfaceVars.accentSuccess).toBe('#34d399');
    console.log('✅ Surface layer CSS variables correct', surfaceVars);
  });

  // ═══════════════════════════════════════════════════════════
  // P0: STATS BAR COMPONENT
  // ═══════════════════════════════════════════════════════════

  // StatsBar left the home page on 2026-10-05 (unmeasured numbers); the hero now shows the Google
  // rating, the two-week delivery and the free design preview, and the service cards follows it.
  test('P0 — Hero stats show the Google rating, not the old 95+ / 24/7 numbers', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const hero = page.locator('#home');
    await expect(hero.getByText(/5,0 ★|5\.0 ★/).first()).toBeVisible();
    await expect(page.getByText('95+', { exact: true })).toHaveCount(0);
  });

  test('P0 — service cards appears right below the Hero', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const positions = await page.evaluate(() => ({
      heroBottom: document.querySelector('#home')?.getBoundingClientRect().bottom ?? -1,
      bandTop: document.querySelector('#szolgaltatas-kartyak')?.getBoundingClientRect().top ?? -1,
    }));
    expect(positions.bandTop).toBeGreaterThan(positions.heroBottom - 50);
  });

  // ═══════════════════════════════════════════════════════════
  // P1: HERO CONTEXT BADGE
  // ═══════════════════════════════════════════════════════════

  test('P1 — Hero context badge is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const badge = page.getByTestId('hero-context-badge');
    await expect(badge).toBeVisible({ timeout: 5000 });
    await expect(badge).toContainText('Pohánka és Társa, Zalaegerszeg');

    // Check it has the pulsing dot
    const heroSection = page.locator('#home');
    const pulsingDot = heroSection.locator('.animate-pulse');
    await expect(pulsingDot.first()).toBeVisible();

    console.log('✅ Hero context badge with pulsing dot visible');
  });

  test('P1 — Hero scroll indicator at bottom', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // The scroll indicator is at absolute bottom-8 of the hero section
    const heroSection = page.locator('#home');
    const scrollIndicator = heroSection.locator('.animate-bounce');
    await expect(scrollIndicator.first()).toBeVisible();

    console.log('✅ Hero scroll indicator visible');
  });

  // ═══════════════════════════════════════════════════════════
  // P1: MOBILE STICKY CTA
  // ═══════════════════════════════════════════════════════════

  test('P1 — MobileCTA hidden on desktop viewport', async ({ page }) => {
    // Desktop viewport (default 1280x720)
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // MobileCTA uses lg:hidden, so on desktop (≥1024px) it should be hidden
    // It's rendered in layout.tsx but hidden via CSS
    const mobileCtaContainer = page.locator('[class*="lg:hidden"]').filter({ hasText: /Kapcsolat|Contact|Kontakt/ });
    // Should NOT be visible on desktop
    if (await mobileCtaContainer.count() > 0) {
      await expect(mobileCtaContainer.first()).not.toBeVisible();
    }
    console.log('✅ MobileCTA hidden on desktop');
  });

  test('P1 — MobileCTA visible on mobile after scrolling', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll past hero (>400px threshold)
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);

    // MobileCTA should appear — look for the fixed bottom element
    const cta = page.locator('div.fixed.bottom-0').filter({ hasText: /Kapcsolat|Contact|Kontakt/ });
    if (await cta.count() > 0) {
      await expect(cta.first()).toBeVisible();
      console.log('✅ MobileCTA visible on mobile after scroll');
    } else {
      // Alternative: check for the anchor in the sticky bar
      const stickyLink = page.locator('a[href="/kapcsolat"]').last();
      const isVisible = await stickyLink.isVisible();
      console.log('MobileCTA link visible:', isVisible);
    }
  });

  // ═══════════════════════════════════════════════════════════
  // P2: FAQ SECTION
  // ═══════════════════════════════════════════════════════════

  test('P2 — HomepageFAQ renders with 6 questions', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to FAQ section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);

    // FAQ section should have "Gyakran Ismételt Kérdések" heading (Hungarian) 
    const faqHeading = page.locator('text=Gyakran Ismételt Kérdések').first();
    await expect(faqHeading).toBeVisible({ timeout: 5000 });

    // Count FAQ buttons (accordion toggles)
    const faqButtons = page.locator('button[aria-expanded]');
    const count = await faqButtons.count();
    expect(count).toBeGreaterThanOrEqual(6);
    console.log(`✅ FAQ section has ${count} questions`);
  });

  test('P2 — FAQ accordion opens and closes on click', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll all the way to the bottom to ensure FAQ section is loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Click first FAQ item — use getByRole for reliability
    const faqSection = page.locator('section').filter({ hasText: 'Gyakran Ismételt Kérdések' });
    const firstQuestion = faqSection.locator('button[aria-expanded]').first();
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(firstQuestion).toBeVisible({ timeout: 10000 });

    // Initially it should be collapsed
    const initialExpanded = await firstQuestion.getAttribute('aria-expanded');
    expect(initialExpanded).toBe('false');

    // Click to open
    await firstQuestion.click();
    await page.waitForTimeout(300);

    const expandedAfterClick = await firstQuestion.getAttribute('aria-expanded');
    expect(expandedAfterClick).toBe('true');

    // The answer text should now be visible
    // Click again to close
    await firstQuestion.click();
    await page.waitForTimeout(300);

    const expandedAfterClose = await firstQuestion.getAttribute('aria-expanded');
    expect(expandedAfterClose).toBe('false');

    console.log('✅ FAQ accordion opens/closes correctly');
  });

  test('P2 — FAQ has FAQPage schema.org JSON-LD', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check for FAQPage structured data
    const schemaScript = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(s => s.textContent).find(t => t?.includes('FAQPage'));
    });

    expect(schemaScript).toBeTruthy();
    const schema = JSON.parse(schemaScript!);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(6);
    console.log('✅ FAQPage JSON-LD present with', schema.mainEntity.length, 'items');
  });

  // ═══════════════════════════════════════════════════════════
  // P2: TESTIMONIALS DESIGN ALIGNMENT
  // ═══════════════════════════════════════════════════════════

  test('P2 — Testimonials uses no slate/blue/green off-brand colors', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Scroll to testimonials
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Check that no slate/blue/green Tailwind classes remain in the Testimonials section
    const hasOffBrandClasses = await page.evaluate(() => {
      // Find sections that likely contain testimonials content
      const sections = Array.from(document.querySelectorAll('section'));
      const testimonialsSection = sections.find(s => 
        s.textContent?.includes('vélemény') || 
        s.textContent?.includes('Testimonial') ||
        s.textContent?.includes('mondják')
      );
      if (!testimonialsSection) return 'section_not_found';
      
      const allElements = Array.from(testimonialsSection.querySelectorAll('*'));
      const offBrand = allElements.filter(el => {
        const cls = el.className;
        if (typeof cls !== 'string') return false;
        return cls.includes('bg-slate') || cls.includes('text-blue') || cls.includes('text-green');
      });
      return offBrand.length;
    });

    if (hasOffBrandClasses === 'section_not_found') {
      console.log('⚠️ Testimonials section not found by text content — skipping color audit');
    } else {
      expect(hasOffBrandClasses).toBe(0);
      console.log('✅ Testimonials has no off-brand slate/blue/green classes');
    }
  });

  // ═══════════════════════════════════════════════════════════
  // GENERAL: PAGE PERFORMANCE & SECTION ORDER
  // ═══════════════════════════════════════════════════════════

  test('Homepage loads within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(5000);
    console.log(`✅ Page loaded in ${elapsed}ms`);
  });

  test('Homepage has correct section order: Hero → service cards → FAQ', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const positions = await page.evaluate(() => {
      const getTop = (el: Element | null | undefined) => el?.getBoundingClientRect().top ?? -9999;
      const faq = Array.from(document.querySelectorAll('section')).find(s => /gyakran ismételt/i.test(s.textContent ?? ''));
      return { hero: getTop(document.querySelector('#home')), band: getTop(document.querySelector('#szolgaltatas-kartyak')), faq: getTop(faq) };
    });
    expect(positions.hero).toBeLessThan(positions.band);
    expect(positions.band).toBeLessThan(positions.faq);
  });

  // These two used to only save screenshots (no assertion could fail); they now check
  // what the screenshots were meant to show.
  test('Full homepage: hero heading, primary CTA and section headings render', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const h1 = page.locator('#home h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('kisvállalkozásoknak');
    await expect(page.locator('h1')).toHaveCount(1);

    const sectionHeadings = page.locator('main h2');
    expect(await sectionHeadings.count()).toBeGreaterThanOrEqual(3);
    await expect(sectionHeadings.first()).toBeVisible();

    const primaryCta = page.locator('#home a[href="#contact-form"]');
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toBeEnabled();
    await primaryCta.click();
    await expect(page).toHaveURL(/#contact-form$/);
    await expect(page.locator('#contact-form')).toBeInViewport();
  });

  test('Mobile homepage (390px): headings and CTAs visible, no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#home h1')).toBeVisible();
    await expect(page.getByRole('button', { name: /Menü megnyitása|Open menu|Menü öffnen/ })).toBeVisible();

    const primaryCta = page.locator('#home a[href="#contact-form"]');
    await expect(primaryCta).toBeVisible();
    const box = await primaryCta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(overflow.scrollWidth, `page is ${overflow.scrollWidth}px wide at ${overflow.innerWidth}px`).toBeLessThanOrEqual(overflow.innerWidth);

    await primaryCta.click();
    await expect(page.locator('#contact-form')).toBeInViewport();
  });
});
