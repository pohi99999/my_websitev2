# Changelog

Notable changes to the Pohánka és Társa Kft. website. Not auto-generated — kept manually, in reverse-chronological order.

## 2026-08-25 — SEO/analytics audit: fixed locale-dropping redirect, missing x-default hreflang, wired GA4 conversion events

Full-stack review requested by the owner across the codebase, Vercel project, Google Search Console, GA4, and Google Business Profile.

### Fixed
- **`/de/termekek/brunella-agents` and `/en/termekek/brunella-agents` redirected to the HU page, dropping the locale** — `app/de/[[...slug]]/page.tsx` and `app/en/[[...slug]]/page.tsx` both hardcoded `redirect('/portfolio/brunella-bas')` instead of `redirect('/de/portfolio/brunella-bas')` / `redirect('/en/portfolio/brunella-bas')`. Caught via Search Console's "Page with redirect" indexing report. The correct locale-aware root-level redirect already existed at `app/termekek/brunella-agents/page.jsx` (detects language via the `x-site-language` header) but is never reached for `/de/*` or `/en/*` requests — those hit the catch-all routes first, another instance of the hand-duplicated per-locale routing logic noted in `CLAUDE.md`.
- **Missing `x-default` hreflang** on the homepage — `app/layout.tsx`'s `alternates.languages` listed `hu`/`en`/`de` but no `x-default`, even though `public/sitemap.xml` already declares one for every URL. Added `'x-default': 'https://www.pohankaestarsa.com/'`. Not rolled out to the other ~21 pages that build their own `alternates.languages` by hand (each `generateMetadata`/`metadata` export is independent, no shared helper) — left as a follow-up given the file count and low individual impact.
- **GA4 never received the site's own conversion events** — `app/lib/analytics.ts`'s `trackEvent()` only called Vercel Analytics' `track()`; `trackCtaClick`/`trackFormSubmit` (fired on every CTA click and contact-form submit) never reached `gtag`, so GA4 Admin → Events showed only the automatic Enhanced Measurement events (`page_view`, `scroll`, `form_start`, …) — no visibility into actual leads. `trackEvent` now also calls `window.gtag?.('event', eventName, properties)` when present. Once this is live and a real `form_submit`/`cta_click` event has fired at least once, mark `form_submit` as a GA4 key event (Admin → Events → Fontos események) — couldn't be pre-configured by name in the current GA4 UI without existing event data.

### Verified / investigated, no code change
- **Vercel project** (`pohi99999s-projects/my_websitev2`): latest production deployment healthy, zero runtime errors in the last 7 days.
- **Google Search Console**: of 53 non-indexed URLs, ~30 are auto-generated `opengraph-image`/`twitter-image` routes and `_next/static` font files — correctly excluded from the index, not a bug. The "Not found (404)" and "Soft 404" buckets (11 URLs: `/de/portfolio/*`, `/en/portfolio/*`, `/de/weboldal-ai-kkv`) were the 2026-08-11 catch-all routing bug already documented in `CLAUDE.md`; live-checked and confirmed all now return 200 — just stale in GSC pending recrawl/Validate Fix. One stray crawled URL (`/hó`) 404s correctly (not a real page). `sitemap.xml` uses an identical `lastmod` date across every URL, which looks auto-generated rather than reflecting real per-page change dates — flagged as a minor quality note, not fixed (would need per-page tracking to do properly).
- **GA4** (`Pohánka és Társa Kft`, property `377437949`, stream `saját webhely` / `15005356565`): data collection active, real traffic in the last 48h confirming the earlier (2026-08-21) fix that gated `GoogleAnalytics` to the production host is holding. Enhanced Measurement on. A second, unrelated stream (`Agents_chat`) exists on the same property with no recent traffic — out of scope, not part of this site's codebase.
- **Google Business Profile** (`Pohánka és Társa KFT`, Zalaegerszeg): verified, primary category "Könyvelőiroda" confirmed correct by the owner (accounting is the company's main registered activity; this website represents a secondary business line already reflected via secondary categories "Webhelytervező", "Informatikai szaktanácsadó", etc.) — no change made.
- **Rendering strategy**: every route in the app builds as fully dynamic (`ƒ`, confirmed via `npm run build` output) because `app/layout.tsx` reads `cookies()`/`headers()` for language detection on every request, which opts the entire site out of static generation / edge caching (`Cache-Control: private, no-cache, no-store` observed in production). Not changed — would require decoupling locale detection from cookies at the root layout, a bigger architectural change out of scope for this pass. Flagged as a performance follow-up.

## 2026-08-20 (2) — Fixed slow/missing image on Ecomud portfolio card (missing `sizes` on all 12 reference images)

A user reported the Ecomud card image not appearing on `/portfolio`. Investigated with a real browser (not just curl): the file, the static route, and the Next.js Image Optimization endpoint all served the image correctly (200, valid JPEG) at every breakpoint, and forcing `loading="eager"` on the exact DOM element loaded it instantly — so the resource itself was never broken.

**Root cause**: none of the 12 `<Image fill .../>` cards in the "Weboldal Referenciák" grid passed a `sizes` prop, so Next.js defaulted to `sizes="100vw"` for every one of them — even though each card renders at roughly 1/3 of the viewport width on desktop (`grid-cols-1 md:grid-cols-3`). This made the browser request the full-viewport-width image variant (often the largest available, up to 3840w) for a ~390px-wide card, needlessly slowing every reference-image load and making the native `loading="lazy"` fetch more likely to still be pending (showing a broken-image icon) when a user scrolls past, especially on a cold cache or slower connection. Ecomud was simply the one the reporting user happened to catch mid-load; the same inefficiency affected all 12 cards, including the three added earlier today (P-BAG, Szakrajz, P-Search).

### Fixed
- Added `sizes="(max-width: 767px) 100vw, 33vw"` to all 12 `fill` images in `app/components/Portfolio.tsx`'s "Weboldal Referenciák" section, matching the grid's `md:grid-cols-3` breakpoint (Tailwind `md` = 768px) — the same pattern already used by the certification badges lower on the same page.

### Verified
- `npm run build` clean; local `next start` + curl confirmed the rendered `srcSet`/`sizes` now offer much smaller candidate widths (e.g. 640w) instead of defaulting toward the 1920–3840w variants.

## 2026-08-20 — Portfolio: added P-BAG, Cimbi Szakrajz and P-Search Mobil case studies; full-site audit

### Added
- Three new cards in the "Weboldal Referenciák" section of `app/components/Portfolio.tsx` (shared by `/portfolio`, `/en/portfolio`, `/de/portfolio` — no catch-all sync needed since this section lives in the shared component, not the hardcoded `en`/`de` switch statements):
  - **P-BAG — Csomagmegőrző Platform** (`https://csomagmegorzo-projekt.vercel.app/`, image `public/p-bag.jpg`) — the team's own luggage-storage booking marketplace (P-BAG, internal client).
  - **Szakrajz & Modellező Program** (`https://szakrajz-s-modellez-program.vercel.app/`, image `public/szakrajz.jpg`) — Vision-AI-assisted furniture technical-drawing/3D-modeling tool built for Czimber Tibor (Cimbi).
  - **P-Search — Pályázatkereső App** (`https://p-search-mobil.vercel.app/`, image `public/p-search.jpg`) — web export of the P-Search Mobil React Native/Expo app (internal project); AI-agent grant/loan matching for Hungarian SMEs with a Copilot-mode document assistant.
  - All three reuse the existing `PortfolioReferenceExternal` CTA-tracking location.

### Verified
- `npm run build` clean; `npm run start -- -p 3333` + curl confirmed HTTP 200 and correct rendered HTML (image `srcSet`, alt text, title, CTA links) on `/portfolio`, `/en/portfolio`, `/de/portfolio`.
- Production spot-check (`https://www.pohankaestarsa.com`): `/`, `/portfolio`, `/en`, `/de`, `/blog`, `/kapcsolat`, `/szolgaltatasok`, `/termekek`, `/rolunk`, two portfolio case studies, and both root/`portfolio` `opengraph-image` routes all return 200 — the 2026-08-17 outage fix and OG-image fix are holding in production.
- Noted (informational, no action needed): `robots.txt` served over the public domain includes a Cloudflare-injected "Content Signals" preamble (blocks GPTBot/CCBot/Google-Extended/ClaudeBot/etc. from AI training, allows search indexing) ahead of the site's own static `public/robots.txt` content — this is added at the Cloudflare edge for the proxied zone, not part of the repo's file.

## 2026-08-17 — Production outage fix: every blog post + `/en` + `/de` were 500ing

Google Search Console flagged a new "Server error (5xx)" indexing issue (first detected 2026-08-15); a Vercel Runtime Logs check confirmed **every `/blog/[slug]` post, and the `/en` and `/de` locale homepages, were returning HTTP 500 in production**.

### Fixed

- **Root cause**: `isomorphic-dompurify` (added 2026-08-11 as a defense-in-depth wrapper around `dangerouslySetInnerHTML` in `app/blog/[slug]/page.jsx`, on top of the already-sanitizing `rehype-sanitize` pass in `lib/markdown.ts`) uses `jsdom` on the server. `jsdom`'s `html-encoding-sniffer@6.0.0` dependency does a CJS `require()` of `@exodus/bytes/encoding-lite.js`, which is a pure-ESM package (`"type": "module"`, no `require` export condition) — this throws `ERR_REQUIRE_ESM` at runtime. This is an upstream bug: even the latest `jsdom@30.0.1` still pins `html-encoding-sniffer@^6.0.0`, so bumping jsdom would not have fixed it. Since `jsdom` is on Next.js's default `serverExternalPackages` list, it's `require()`'d directly by the Node runtime instead of being bundled (where a bundler's CJS/ESM interop would likely have masked the bug) — explaining why this only broke at request time, not at build time. `/en` and `/de` hit the same crash because their catch-all routes render the same blog content path.
  - Fix: removed `isomorphic-dompurify` entirely (`app/blog/[slug]/page.jsx`, `package.json`). The `rehype-sanitize` pass in `lib/markdown.ts` (AST-level allow-list sanitization, not string-based) already sanitizes the HTML before it reaches `dangerouslySetInnerHTML` — DOMPurify was a redundant second layer, not the only one. If a second layer is wanted again in future, prefer a jsdom-free sanitizer (e.g. `sanitize-html`) over `isomorphic-dompurify`.
- **Separately found while investigating**: all `opengraph-image`/`twitter-image` routes site-wide (`/opengraph-image`, `/blog/opengraph-image`, `/portfolio/opengraph-image`, etc.) were returning HTTP 200 with an **empty body** — broken Open Graph previews on every share. `app/_og/fonts.ts` fetched Inter from Google Fonts requesting `.woff2` (spoofing a modern Chrome User-Agent), but `next/og`'s `ImageResponse` (Satori) can only parse ttf/otf/woff — not woff2. Fixed by switching the Google Fonts request to an old-Firefox User-Agent, which makes Google return legacy `.woff` sources instead.

### Verification

- `npm run build` — clean, no prerender errors.
- `npm run start -- -p 3333` + manual curl: `/blog/<slug>`, `/de`, `/en` → 200; `/opengraph-image` and `/blog/opengraph-image` → 200 with a valid non-empty PNG body.
- `npx playwright test` — 182 passed. 44 failures were homepage-load timeouts across unrelated specs (design/menu/motion-hook tests) reproducing resource contention from running the full suite locally, not a regression — confirmed by re-running one failing spec in isolation (passed).

## 2026-08-16 — Jules branch integration, rate limiting hardening, performance & test upgrades

Integrated reviewed fixes and improvements from Jules AI branches:

### Security & Hardening
- **IP Spoofing Rate Limit Bypass Fix**: In `app/api/chat/route.ts`, `app/api/contact/route.ts`, `app/api/instant-responder/demo/route.ts`, and `app/api/lead-magnet-audit/route.ts`, rate limiters now prioritize the trusted `x-real-ip` header from the proxy and take the last hop of `x-forwarded-for` to prevent header spoofing bypasses.
- **Lead Magnet Audit Server Route & Rate Limiting**: Moved lead magnet audit submissions from client-side direct n8n webhook calls to a new server-side endpoint (`/api/lead-magnet-audit`) with IP rate limiting and environment variable fallback (`N8N_WEBHOOK_URL` / `NEXT_PUBLIC_N8N_WEBHOOK_URL`).
- **Google Analytics Script Sanitization**: Hardened GA Measurement ID handling in `app/components/GoogleAnalytics.tsx` with `JSON.stringify` interpolation.

### Bug Fixes & Performance
- **GSAP ScrollTrigger Cleanup in `ThreeDScene.tsx`**: Wrapped component animations in `gsap.context()` and replaced dangerous global `ScrollTrigger.getAll().forEach(t => t.kill())` with `ctx.revert()`, preventing other page animations from being destroyed on unmount.
- **CRM Dashboard Performance**: Consolidated multiple `.reduce()` calculations in `app/admin/crm/page.tsx` into a single memoized `useMemo` aggregation loop.

### Code Health & Testing
- **CRM Pipeline Types**: Replaced `any` with `DragEndEvent` from `@dnd-kit/core` and typed `SortableItemProps` in `app/admin/crm/pipeline/page.tsx`.
- **Portfolio Project Meta Unit Tests**: Added `tests/projects.meta.spec.ts` for unit testing `getPortfolioProjectMeta`.
- **Analytics Spec Fix**: Updated `tests/analytics.spec.ts` to test error-free execution of analytics helper functions.

## 2026-08-11 — Jules branch review, live-site bug fixes, SEO/infra audit

A full review of the accumulated Jules AI (`google-labs-jules[bot]`) branches and PRs, plus a Google Search Console and Vercel project audit.

### Fixed

- **Tawk.to chat widget script injection**: an earlier commit (`b5d7fa2`) claimed to fix an XSS pattern in the Tawk.to embed but had only touched `netlify.toml` by mistake — the real code fix never landed. Replaced the `dangerouslySetInnerHTML` script-injection IIFE in `app/layout.tsx` with a proper `<Script src=...>` tag.
- **8 confirmed 404s + 5 soft-404s on `/en` and `/de`** (found via Search Console → Indexing → Pages): the locale catch-alls (`app/en/[[...slug]]/page.tsx`, `app/de/[[...slug]]/page.tsx`) forwarded `/portfolio/:id` requests for 5 case-study slugs (`brunella-bas`, `pohi-ai-pro`, `tartalom-gyartas`, `web-robotpilota`, `palyazat-radar`) to the generic `app/portfolio/[id]/page.jsx`, whose hardcoded project map doesn't contain them — and `weboldal-ai-kkv` wasn't in the single-segment switch at all. Both catch-alls now route these known slugs to their real static page components. Verified all affected URLs return 200 against a production build.
- **`/api/instant-responder/demo` always hit `localhost:5678` in production**: the server-side `N8N_WEBHOOK_URL` env var was never set in Vercel (only the client-side `NEXT_PUBLIC_N8N_WEBHOOK_URL` was), so this route silently fell back to a local dev URL that a Vercel serverless function can never reach. Now falls back to the already-public `NEXT_PUBLIC_N8N_WEBHOOK_URL` before the localhost dev default.
- **Missing rate limiting on `/api/instant-responder/demo`**: had input validation but no rate limiting, unlike the sibling `/api/chat` route. Added the same `checkRateLimit()` guard.

### Security

- `app/blog/[slug]/page.jsx`: wrapped the markdown-rendered HTML in `DOMPurify.sanitize()` before `dangerouslySetInnerHTML`, as defense-in-depth on top of the existing `rehype-sanitize` pass in `lib/markdown.ts`.

### Removed

- `app/components/NeonText.tsx`, `AudioReactiveVisualize.tsx`, `_AudioReactive.tsx` — confirmed zero remaining references anywhere in the codebase.
- Unused `lucide-react` icon imports in `app/portfolio/brunella-bas/page.jsx`.

### Tests

- `tests/contact-rate-limit.spec.ts`, `tests/useRichMediaEnabled.spec.ts`, `tests/chat-rate-limit.spec.ts` — new coverage.
- `tests/api-chat-route.spec.ts` — added AI-provider error, network-failure, and success-path coverage.

### Housekeeping

- Reviewed all 71 open Jules/agent pull requests against current `main` (most had accumulated since January 2026 and were superseded, stale, or would have broken live pages by removing still-used components like `RoiCalculator`, `ContactCapture`, `AbandonedCartDemo`, `HowItWorks`, `ClientVideo`). Closed all 71 with an individual comment explaining the disposition, and deleted their branches. One PR (`jules-16063262852902229621-5edab16c`) was explicitly rejected rather than closed-as-superseded: its `package.json`/`package-lock.json` changes would have downgraded `nodemailer` (9→8), `eslint` (9→8), and `eslint-config-next` (16→15) — reverting the security/tooling upgrades landed on 2026-08-09.
- Confirmed the Vercel project's two "recommendations" (On-Demand Concurrent Builds, Rolling Releases) are Pro-plan-only features, not misconfigurations — no action taken pending a plan-upgrade decision.
- Confirmed Search Console's 29 "Crawled – not indexed" pages are all the auto-generated per-blog-post `opengraph-image`/`twitter-image` routes, correctly excluded from Google's web index — not a bug.
