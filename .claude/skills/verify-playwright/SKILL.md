---
name: verify-playwright
description: Correctly build and run the Playwright test suite for this repo (there is no npm test script). Use when asked to run tests, verify changes, or check that the site still works before committing.
---

This repo has **no `npm test` script**. `playwright.config.ts` starts its webServer with `npm run start -- -p 3333` (`next start`), which requires an existing production build — it does NOT run `next build` itself.

Run tests in this order:

```bash
npm run build
npx playwright test
```

Notes:
- Tests live in `tests/*.spec.ts` (not `__tests__/`, which only contains an orphaned snapshot folder).
- Config: `chromium` (Desktop Chrome) and `mobile-chrome` (Pixel 5) projects, baseURL `http://localhost:3333`.
- To run a single spec: `npx playwright test tests/contact-api.spec.ts`
- To see the HTML report after a run: `npx playwright show-report`
- If `npm run build` fails, do not attempt to run Playwright against a stale `.next` — fix the build first.
