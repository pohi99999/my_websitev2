# Security audit: pohankaestarsa.com (my_websitev2)

**Date:** 2026-10-15  **Scope:** this repository at `main` (`353b4c7`) plus its full git history (573 commits, including `refs/pull/*`).
**Method:** code review of every route handler and the middleware, the client components that submit data, `next.config.js`, consent and analytics loading, a secrets/PII scan of the working tree and all history, and `npm audit --omit=dev`.
**Not tested live.** Production could not be reached from the audit sandbox (the outbound proxy returned 403), so the live response headers, the Cloudflare/Vercel IP headers and the n8n instance were **not observed**. Findings that depend on them say so.

Secret values are named by variable only. None appear in this report.

## Summary

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | **High** | Chat: cross-site POSTs could run paid Claude calls from visitors' browsers | **Fixed** (`8a270ae`) |
| 2 | **High** | Chat: no site-wide spending ceiling on Claude calls (denial of wallet) | **Fixed** (`350021a`) |
| 3 | Medium | n8n webhooks are called straight from the browser; server-side limits can be bypassed | Recommendation |
| 4 | Medium | Lead-magnet form can make our automation send "audit PDF" e-mails to any address | Recommendation |
| 5 | Medium | Contact form: a global cap of 10 e-mails/day lets one person block all leads for 24 h | Recommendation |
| 6 | Medium | Rate-limit keys use `x-real-ip`/`x-forwarded-for`; behind Cloudflare these may be edge IPs | Recommendation (verify) |
| 7 | Medium | Tawk.to chat script loads before any consent | Recommendation (if `NEXT_PUBLIC_TAWK_EMBED_URL` is set) |
| 8 | Medium | Old lead list: named dental clinics plus a public Google Sheet link remain in git history | Recommendation |
| 9 | Low | No Content-Security-Policy | Recommendation |
| 10 | Low | `/admin/crm*` is not behind the admin token | Fixed: pages deleted |
| 11 | Low | Admin token handling: the cookie holds the raw token, the compare is not constant-time, the token is accepted in the URL | Recommendation |
| 12 | Low | `instant-responder/demo` has no Origin check, posts to the bare n8n base URL, and falls back to `localhost` | Recommendation |
| 13 | Low | Minor input-handling and information leaks in the API routes | Recommendation |
| 14 | Low | Dependency advisories: none has a reachable exploit path | Recommendation |
| 15 | Info | Repo hygiene: `.gitignore` gaps and junk files at the repo root | Recommendation |

**Secrets:** none found in HEAD or in history. The only env file ever committed is `.env.example`, which holds placeholders. **No credential needs rotating** on the evidence in the repo.

---

## Fixed in this PR

### 1. High: cross-site requests to `/api/chat` (fixed)
- **Where:** `app/api/chat/route.ts`, at the top of `POST`.
- **Issue:** `req.json()` parses any body, including `Content-Type: text/plain`. That means a POST from another website is a "simple" CORS request with no preflight, and the browser sends it. The response cannot be read cross-origin, but the Claude call has already been made and billed.
- **Exploit:** a hostile or compromised page (or an ad) runs a loop of `fetch('https://www.pohankaestarsa.com/api/chat', {method:'POST', body: JSON.stringify({messages:[…10 × 2000 chars…]})})`. Every visitor's browser has its own IP, so the per-IP 20/min limit never triggers, and each request can bill up to 8000 output tokens.
- **Fix:** the contact form's Origin allow-list moves to `app/lib/allowedOrigin.ts` (same behavior: the production hosts, this deployment's own `VERCEL_*` hosts, `CONTACT_ALLOWED_ORIGINS`, and localhost only off Vercel) and now also guards `/api/chat`. A foreign `Origin` gets 403 before any work. A request with no `Origin` (curl) passes as before; finding 2 covers that case.
- **Tests:** `tests/api-chat-route.spec.ts` checks that a foreign Origin gets 403 with no fetch, and that the site's own Origin passes.

### 2. High: no site-wide spending ceiling on Claude (fixed)
- **Where:** `app/api/chat/route.ts` and `app/api/chat/rate-limiter.ts`. `MAX_TOKENS = 8000` is set in `app/api/chat/claude.ts:13`.
- **Issue:** the only limit was 20 requests/min per IP, held in one serverless instance's `Map`. Vercel runs many instances and an attacker can use many IPs, so the limit multiplies without bound. A `curl` loop from a few cloud IPs can spend the shared Anthropic credit. The code comments call it "the shared monthly credit", so running it out takes down the chat and anything else that draws on it.
- **Fix:** new `app/api/chat/budget.ts` sets a global cap of `DAILY_CHAT_MAX = 500` Claude calls per day. It uses Upstash (a counter shared by all instances) when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are set. Otherwise, or if Upstash errors, it uses a per-instance in-memory counter. Over the cap, the route returns the existing "busy" reply with contact links (HTTP 200) and logs `reason=daily_budget`. The cap does not depend on client IP, so finding 6 does not weaken it.
- **Worst case now:** about 500 × 8000 output tokens/day per counter. With Upstash configured that is one counter for the whole site; without it, one counter per warm instance.
- **Owner action (no code):** confirm whether the Upstash variables are set in Vercel Production; without them the cap is per instance. Also set a monthly spend limit on the Anthropic workspace that owns `ANTHROPIC_API_KEY`, and if possible give the website its own workspace or key so a drained budget cannot affect other products.
- **Tests:** `tests/chat-budget.spec.ts` checks that the cap allows 500 calls, refuses the 501st and resets after a day, and that over the cap the route makes no Claude call and returns `busy: true`.

---

## Recommendations (not changed in this PR)

### 3. Medium: n8n webhooks are exposed to the browser
- **Where:** `app/components/SmartContactForm.tsx:23` (→ `/webhook/lead-form`) and `app/components/AbandonedCartDemo.tsx:15` (→ `/webhook/abandoned-cart`), both rendered on `/szolgaltatasok`. The base URL is `NEXT_PUBLIC_N8N_WEBHOOK_URL`, the production n8n host (also shown in `.env.example:30`), so it is built into the public JavaScript.
- **Exploit:** anyone can read the host from the bundle and POST to `https://<n8n-host>/webhook/lead-form`, `/webhook/abandoned-cart`, or `/webhook/lead-magnet-audit-v2` directly. That skips every Next.js rate limit and validation step. Fake leads flood the CRM, any LLM nodes in those workflows spend money, and any e-mail nodes send mail (see finding 4).
- **Fix:**
  - Route both forms through Next.js API routes, with the same Origin check, rate limit and field allow-list as `/api/lead-magnet-audit`.
  - Set a server-only `N8N_WEBHOOK_URL` and stop using the `NEXT_PUBLIC_` variable.
  - Protect the n8n webhooks with n8n's Header Auth (a shared secret the API routes send).
  - Confirm that the n8n editor UI on that host requires login and is not open to the internet.

### 4. Medium: lead-magnet form can e-mail any address
- **Where:** `app/api/lead-magnet-audit/route.ts:41`. The form says "Hova küldjük a személyre szabott Audit PDF-et?" ("Where should we send your personalised audit PDF?"), so the n8n workflow e-mails the submitted address.
- **Exploit:** a script submits 20 requests/min per IP with victim addresses. Our mail identity sends unsolicited PDFs to third parties, which hurts sender reputation and risks spam-listing. Because of finding 3 it also works by calling n8n directly. The only check is that `email.includes('@')`.
- **Fix:**
  - Add Cloudflare Turnstile (the zone is already on Cloudflare) to this form and to the contact form, and verify the token server-side.
  - Add a per-recipient daily limit in the n8n workflow, or use double opt-in (send a confirmation link first).
  - Add an Origin check here, the same one used on the contact form and chat.

### 5. Medium: contact form can be blocked for the whole site
- **Where:** `app/api/contact/route.ts:35` (`DAILY_LIMIT_MAX = 10`, key `global`).
- **Exploit:** 10 valid submissions (one IP needs about 10 minutes at the 2-per-2-minutes burst limit) use up the day's quota, and every real prospect gets "Daily message limit reached" for 24 h. The form loses leads silently.
- **Fix:** keep a global ceiling but raise it (e.g. 100), add a per-IP daily limit (e.g. 5), and put Turnstile in front. The global cap then only matters during a real flood.

### 6. Medium (verify): client IP for rate limiting
- **Where:** `getClientIp` in `app/api/chat/route.ts:9`, `app/api/contact/route.ts:69`, `app/api/lead-magnet-audit/route.ts:5` and `app/api/instant-responder/demo/route.ts:5`. Each prefers `x-real-ip`, then the last `x-forwarded-for` entry.
- **Analysis:** on Vercel both headers are set by Vercel's edge and overwritten if the client sends them, so they **cannot be spoofed on Vercel**. They would be spoofable on any other host or proxy setup. The code comments show that **Cloudflare proxies the domain**. In that case Vercel sees Cloudflare's edge IP, so:
  - many real visitors share one rate-limit bucket (false 429s, and the contact burst limit of 2 per 2 minutes is shared);
  - limits are weak against one attacker who spreads requests over edge nodes;
  - anyone can skip Cloudflare by calling the `*.vercel.app` deployment directly.
- **Fix:**
  - Check in Vercel logs what `x-real-ip` holds for production traffic.
  - If it holds Cloudflare IPs, either stop proxying through Cloudflare (DNS only), or enable Vercel's trusted-proxy handling for Cloudflare and read the client IP from it.
  - Use one shared helper (e.g. `ipAddress()` from `@vercel/functions`) in place of four copies.
  - Never trust `cf-connecting-ip` unless the request is proven to have come through Cloudflare.

### 7. Medium (conditional): Tawk.to loads without consent
- **Where:** `app/layout.tsx:255`. When `NEXT_PUBLIC_TAWK_EMBED_URL` is set, the Tawk.to script loads `lazyOnload` for every visitor. It sets third-party cookies and sends the IP and browsing data to Tawk.to before any choice is made.
- **Context:** GA4 is correctly gated: `app/components/GoogleAnalytics.tsx` renders nothing until `readConsent() === 'all'`, and only on the production host. Vercel Analytics is cookieless.
- **Fix:** gate Tawk.to exactly like GA (render only when consent is `'all'`), or load it only after the visitor clicks a "chat" button. Mention it in the privacy notice.

### 8. Medium: third-party lead data in git history
- **Where:** history only.
  - The dental lead-list page contained **5 named dental clinics**, one of them a "Dr." personal name, with lead scores, review counts and a "pain level". It also linked a **Google Sheet shared as "anyone with the link"** (ID starts `1GCW…`) holding a 50-row lead list.
  - Added in `9331076` (2026-02-27), localized in `549991b`, removed from HEAD in `09880a6` (2026-10-05).
  - HEAD now uses invented sample names.
- **Exploit:** anyone with read access to the repo or its PR refs can recover the data, and anyone with the link can open the Sheet.
- **Fix:**
  - **First:** in Google Drive, set that Sheet to "Restricted". That matters more than the git history.
  - If the GitHub repo is public, consider a history rewrite (`git filter-repo`) and ask GitHub support to purge cached PR refs. Weigh this against the disruption, since many Jules branches exist.
  - Confirm that the Drive file linked from `app/termekek/brunella-agents/components/DocumentationSection.jsx:6` is meant to be public.

### 9. Low: no Content-Security-Policy
- **Where:** `next.config.js`. The site already sends HSTS, `X-Frame-Options: SAMEORIGIN`, `nosniff`, `Referrer-Policy` and `Permissions-Policy`, but no CSP.
- **Context:** no XSS sink fed by user input was found. Blog markdown is repo content, sanitized by `rehype-sanitize`. Every `dangerouslySetInnerHTML` is `JSON.stringify` of static JSON-LD or fixed inline script. The chat reply is rendered as text. So this is defence in depth only.
- **Fix:** start with `Content-Security-Policy-Report-Only` allowing `self`, `www.googletagmanager.com`, `*.google-analytics.com`, `va.vercel-scripts.com` and `embed.tawk.to`/`*.tawk.to`, plus `frame-ancestors 'self'`. Enforce it once no reports come in. Nonce-based CSP in Next.js needs dynamic rendering, so allow-list hosts first.

### 10. Low: `/admin/crm*` is not protected (fixed: the dead CRM pages were deleted)
- **Where:** `middleware.ts:5` guards only `/admin/analytics` and `/api/analytics`. `app/admin/crm/page.tsx` and `app/admin/crm/pipeline/page.tsx` are public. They fetch and PATCH `/api/v1/potential-clients`, which does not exist in this app, so nothing leaks today.
- **Risk:** the day someone adds that API, the CRM, with scraped names and phone numbers, would be public and editable.
- **Fix:** change the page guard to `pathname.startsWith('/admin')`, or delete the dead CRM pages. Any future `/api/v1/*` must sit behind the same token.

### 11. Low: admin token handling
- **Where:** `middleware.ts:57`, `:61` and `:73`.
- **Issues:**
  - The cookie stores the raw `ADMIN_ANALYTICS_TOKEN`, so the cookie *is* the long-lived secret.
  - `===` comparison is not constant-time. Timing attacks over the network are impractical here.
  - The `?token=` login puts the token in the URL. The redirect removes it, but it can still reach browser history and logs.
  - The service worker caches HTML pages network-first, including `/admin/analytics`, which matters on shared devices.
- **Fix:** store an HMAC or random session ID in the cookie, not the token. Compare with a constant-time function. Exclude `/admin` from the service worker cache.

### 12. Low: `/api/instant-responder/demo`
- **Where:** `app/api/instant-responder/demo/route.ts:47-49`.
- **Issues:**
  - No Origin check, so cross-site POSTs (as in finding 1) can trigger the LLM call inside n8n.
  - In production, `N8N_WEBHOOK_URL` is not set, so it posts to the **bare** public n8n base URL with no `/webhook/...` path. The demo is probably broken, which is a bug rather than a vulnerability.
  - The last fallback is `http://localhost:5678`.
- **Fix:** add the Origin check, fail fast when no server-side URL is set, and build the path explicitly as `/webhook/instant-responder`.

### 13. Low: minor input handling and information leaks
- **`app/api/chat/route.ts:63`:** a `null` entry in `messages` makes `m.role` throw, which returns an unhandled 500. Validate each element is an object with a string `content`.
- **`app/api/contact/route.ts:199`:** the 500 response names the expected SMTP variables to anyone. Log that server-side and return a generic error.
- **`app/api/lead-magnet-audit/route.ts:51`:** passes the upstream n8n status straight to the client. Map it to 502.
- **Contact e-mail:** `replyTo` is the visitor's unvalidated e-mail. Nodemailer encodes headers, so there is no header injection and recipients are fixed, so this is not an open relay. Still, validate the address format.
- **Prompt injection / system-prompt leak:** `app/api/chat/system-prompt.ts` contains only public marketing facts and the public contact details. No tools, no internal data, no secrets. Leaking it is harmless. Client-supplied `assistant` turns allow "prefill" steering, which only affects the attacker's own conversation. Keep it that way: never put internal data, keys or tool access into this prompt.

### 14. Low: dependencies (`npm audit --omit=dev`)
- **`nodemailer` ≤10.0.5 (high):**
  - The addressparser O(n²) DoS cannot be exploited here: `replyTo` is capped at 200 characters.
  - The `resolveContent` and IDN allow-list advisories concern features not used here.
  - Upgrade at the next maintenance window. It is a major version bump, so test the contact form.
- **`browserslist`, `source-map-js` (high) and `baseline-browser-mapping` (moderate):** build-time tooling with no runtime input path. Update with `npm audit fix`.
- **`next` 16.3.x:** no open advisories reported.

### 15. Info: repo hygiene
- **`.gitignore`** ignores only `.env` and `.env.local`. Add `.env*` (with `!.env.example`), `*.log`, `.vercel/` and `playwright-report/`. A Playwright report and logs have already been committed once.
- **Root junk files:** `data-202511735220.json` (5 MB public Vertex AI description), `out.html`, `push.log` (leaks a local Windows path), `status.log`, the `brunella_*.py`/`.json` files, `ppp*.jpg` and `qrcode_*.png`. They are **not** served by the site (they are not in `public/`), but they are visible to anyone who can read the repo. Remove them.
- **`.env.example`:** the comment about `ANTHROPIC_API_KEY` is stale (it still mentions a GitHub PAT), and `ADMIN_ANALYTICS_TOKEN` and `NEXT_PUBLIC_TAWK_EMBED_URL` are missing.

---

## Checked and found OK
- **Open redirects:** every `redirect()` and `next.config.js` redirect has a fixed or locale-derived target. None takes user input.
- **SSRF:** no route fetches a user-supplied URL. The n8n and Claude URLs come from env vars or constants. The OG image routes render from the site's own metadata only.
- **Analytics API:** `/api/analytics/*` and `/admin/analytics` fail closed in production without `ADMIN_ANALYTICS_TOKEN`.
- **CORS:** `/api/contact` echoes only allow-listed origins. No other route sends CORS headers.
- **Cookies:** the admin cookie is `HttpOnly`, `Secure` (prod) and `SameSite=Lax`. `site-language` is a non-sensitive preference cookie.
- **Secrets:** nothing in HEAD or history. The only browser-exposed `NEXT_PUBLIC_*` value of concern is the n8n host (finding 3).
- **Payment and database migration files:** none exist in this repo, so none were touched.
