# Pohánka és Társa — weboldal

Next.js (App Router) weboldal a Pohánka és Társa Kft. számára: céges bemutatkozás, szolgáltatások/termékek (AI rendszerek, Brunella/BAS, Pohi AI Pro), blog, portfólió és kapcsolatfelvétel.

Éles oldal: **https://www.pohankaestarsa.com/**
Repó: https://github.com/pohi99999/my_websitev2

## Technológiák

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS**, **Framer Motion**, **GSAP** — animációk
- **nodemailer** (SMTP) — kapcsolati űrlap email küldése
- **@upstash/ratelimit** + **@upstash/redis** — rate limiting (opcionális, in-memory fallback-kel)
- **Playwright** — E2E tesztek

## Gyors indítás

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # production szerver indítása (build után)
npm run lint     # eslint
```

Nincs `npm test` script. A tesztek Playwright specek, futtatás:

```bash
npm run build
npx playwright test
```

(A Playwright config a saját szerverét `next start -p 3333`-mal indítja, ami feltételez egy előzetes `npm run build`-et.)

## Projekt struktúra (kivonat)

```
app/
├── page.jsx                 # Főoldal
├── layout.tsx                # Root layout, SEO metaadatok, JSON-LD
├── api/                      # Route handler-ek (contact, chat, analytics, ...)
├── components/                # Megosztott komponensek (Header, Footer, űrlapok, ...)
├── context/                  # LanguageContext (hu/en/de)
├── locales/                  # Fordítási kulcsok (hu.js, en.js, de.js)
├── szolgaltatasok/, termekek/, portfolio/, blog/, rolunk/, kapcsolat/
├── admin/                     # Admin oldalak (analytics, CRM) — tokennel védve
public/
├── sitemap.xml, robots.txt   # statikus fájlok, kézzel/scripttel karbantartva
tests/                        # Playwright specek
```

Megjegyzés: van egy üres gyökér-szintű `components/` mappa — a tényleges komponensek az `app/components/` alatt vannak.

## Környezeti változók

Lásd `.env.example`. A legfontosabbak:

| Változó | Cél |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Kapcsolati űrlap email küldése (nodemailer) |
| `CONTACT_TO`, `CONTACT_FROM` | Opcionális, van fallback |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Opcionális rate limit backend |
| `GITHUB_TOKEN` | A Brunella chat route-hoz (GitHub Models API) |
| `ADMIN_ANALYTICS_TOKEN` | Az `/admin/analytics` oldal védelme |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Lead capture / instant responder formok |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics (van hardcoded fallback) |
| `NEXT_PUBLIC_TAWK_EMBED_URL` | Tawk.to chat widget (opcionális, a Brunella chat enélkül is működik) |

## Deployment

A projekt **Vercel**-ről deployol automatikusan a `main` branch-re történő push-kor. Nincs CI (`.github/workflows/` nem létezik), tehát `npm run build` lokális sikeressége az egyetlen push előtti védőháló.

## Kapcsolat

- Email: peterpohankapersonal@gmail.com
- Telefon: +36 30 429 1227
- Pohánka József Péter — CEO & Lead Developer
