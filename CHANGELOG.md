# Changelog

Notable changes to the Pohánka és Társa Kft. website. Not auto-generated — kept manually, in reverse-chronological order.

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
