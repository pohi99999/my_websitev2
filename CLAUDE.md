# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router) + React 19 + TypeScript company website for **Pohánka és Társa Kft.**, deployed to production at https://www.pohankaestarsa.com/ via **Vercel**, auto-deploying from the `main` branch of https://github.com/pohi99999/my_websitev2.git. Package manager is npm (`package-lock.json`). The owner is a non-programmer who works through AI agents (Claude Code, plus a "Jules" AI — see commit history for `jules-*` commits).

## Commands

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # next lint
```

**There is no `npm test` script.** Tests are Playwright specs under `tests/*.spec.ts`, run directly:
```bash
npx playwright test
```
`playwright.config.ts` starts its server with `npm run start -- -p 3333` (i.e. `next start`, not `next build`) — run `npm run build` first or the webServer will fail to boot against a stale/missing `.next` build.

## Known gotchas

- **Two ESLint configs coexist**: legacy `.eslintrc.json` and flat `eslint.config.mjs`. Also note version skew: `eslint-config-next` is pinned to `15.0.0` and `eslint` to `^8` while `next` is `^16.2.6`; `@types/react`/`@types/react-dom` are pinned to `^18` while `react`/`react-dom` are `^19.2.6`. Keep this in mind when lint/type errors look version-related rather than code-related.
- **Duplicate `lib/` directories**: root `lib/` (`markdown.ts`, `data/`) and `app/lib/` (`analytics.ts`, `analyticsSchema.ts`) are both live and unrelated — check which one a file actually imports from.
- **Root `components/` is empty** — real page components live in `app/components/`. Don't be misled by the empty root folder.
- **SEO files are static, not generated**: `public/robots.txt` and `public/sitemap.xml` are plain files, not `app/robots.ts`/`app/sitemap.ts`. They must be manually updated whenever routes change.
- **Locale routing is custom**, not Next.js i18n routing: `middleware.ts` detects `en`/`de`/`hu` via a `site-language` cookie/header, and 308-redirects `/hu` → root. `app/de/` and `app/en/` are route folders, not an i18n plugin.
- `middleware.ts` gates `/admin/analytics` behind `ADMIN_ANALYTICS_TOKEN`: fails secure (401) in production if unset, but is open in non-production if unset.
- `netlify.toml`, `vite.config.js`, and `deploy-build.sh` at the repo root are leftovers from earlier/alternate deploy setups — the real deploy path is Vercel + `next build`, not these.
- `AGENTS.md` at the repo root is **not** general agent guidance — it's an auto-generated n8n-as-code bootstrap file about n8n workflow sync commands and explicitly says it isn't a source of truth. `README.md` and `docs/GEMINI.md` also contain stale/aspirational info (e.g. reference `npm run test`/`npm run test:e2e`/`npm run ux:check` scripts that don't exist) — verify against actual code before trusting them.

## Contact form / email

`app/api/contact/route.ts` sends mail via **nodemailer over SMTP** (not Resend/SendGrid). Rate-limited via `@upstash/ratelimit` + `@upstash/redis` when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are set, otherwise falls back to in-memory limiting. Relevant env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` (default `peterpohankapersonal@gmail.com`), `CONTACT_FROM`.

Other env vars referenced in code: `GITHUB_TOKEN` (chat route, GitHub Models API), `N8N_WEBHOOK_URL` / `NEXT_PUBLIC_N8N_WEBHOOK_URL` (lead/instant-responder forms), `ADMIN_ANALYTICS_TOKEN`, `ANALYTICS_KPI_SNAPSHOT_JSON`, `NEXT_PUBLIC_TAWK_EMBED_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. `.env.example` does not list `ADMIN_ANALYTICS_TOKEN` or `NEXT_PUBLIC_TAWK_EMBED_URL` even though code uses them.

## Commit style

Recent history mixes emoji-tagged commits (`🔒` security, `⚡` performance, `🧪` testing, `🧹 [Code Health]`) with conventional-commit prefixes (`feat(...)`, `fix(...)`, `chore(...)`). Follow whichever pattern fits the change.

There is no CI (`.github/workflows/` doesn't exist) — Vercel builds directly from pushes to `main`, so a passing `npm run build` locally is the only pre-push safety net.
