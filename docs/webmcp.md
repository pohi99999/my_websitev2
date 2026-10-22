# WebMCP: `request_quote` (kísérleti / experimental)

## Mit csinál? / What it does

A főoldali ajánlat-/konzultációkérő űrlapot (`app/components/ContactCapture.tsx`, `#contact-form`) egy
**WebMCP-eszközként** is elérhetővé teszi a böngészőben futó AI-agensek számára, a
[`document.modelContext`](https://developer.chrome.com/docs/ai/webmcp) API-n át.

- Egyetlen eszköz: **`request_quote`**, bemenet: `name` (1–120 karakter), `email` (érvényes e-mail, ≤ 200),
  `need` (`lead` | `accounting` | `support` | `other`, ugyanaz, mint az űrlap legördülője), `business`
  (nem kötelező, ≤ 1000). Ezek ugyanazok a szabályok, mint az űrlapon és az `/api/contact` route-ban.
- Ha az agens meghívja az eszközt, az oldalon **megerősítő ablak** jelenik meg a kitöltött adatokkal.
  Csak az **„Igen, elküldöm”** gomb megnyomása után megy ki a kérés. A „Mégse”, az Esc, vagy ha az agens
  megszakítja a hívást, azt jelenti, hogy semmi nem kerül elküldésre.
- Megerősítés után a beküldés **ugyanazt az `/api/contact` route-ot** hívja, **pontosan ugyanazzal a
  payloaddal**, mint az űrlap (a közös logika az `app/lib/quoteRequest.ts`-ben van). Az Origin-ellenőrzés,
  a rate limit és a szerveroldali validáció változatlanul érvényes; a szerver hibáit az eszköz visszaadja
  az agensnek.

**Progresszív bővítés:** ha a böngészőben nincs `document.modelContext`, a komponens semmit nem regisztrál
és semmit nem renderel, az oldal pontosan ugyanaz, mint eddig.

Fájlok:

| Fájl | Szerep |
| --- | --- |
| `app/lib/webmcp/requestQuoteTool.ts` | eszköz-definíció (név, leírás HU/EN, JSON-séma), validálás, regisztrálás |
| `app/components/WebMcpQuoteTool.tsx` | kliens komponens: regisztrál, ha van API, és megjeleníti a megerősítő ablakot |
| `app/lib/quoteRequest.ts` | az űrlap és az eszköz közös mezői, szabályai és üzenet-összeállítása |
| `tests/webmcp-request-quote.spec.ts` | egységtesztek (mockolt `modelContext`, valódi route Origin/rate limit) |
| `tests/webmcp-request-quote-page.spec.ts` | böngészős tesztek a főoldalon (az `/api/contact` el van kapva, e-mail nem megy ki) |

A típusokat a `webmcp-types` devDependency adja (csak `.d.ts`, futásidőben nem kerül be semmi).

## Kipróbálás Chrome-ban / How to try it

1. Olyan Chrome kell, amelyben a WebMCP elérhető (a cikk írásakor korai előzetesként, kísérleti
   flaggel: `chrome://flags` → keress rá a **WebMCP**-re → *Enabled* → újraindítás). A pontos lépések a
   [Chrome WebMCP dokumentációban](https://developer.chrome.com/docs/ai/webmcp) vannak, mert ezek változhatnak.
2. Nyisd meg a főoldalt (élesben vagy helyben: `npm run build && npm run start`).
3. DevTools konzolban ellenőrizd: `await document.modelContext.getTools()` → benne kell lennie a
   `request_quote`-nak.
4. Hívd meg egy WebMCP-képes agensből (vagy a WebMCP inspector/agent felületről). Az oldalon megjelenik a
   megerősítő ablak; csak jóváhagyás után megy ki a kérés.
   Ha élesben próbálod, valódi e-mail érkezik, tehát a névbe írd be, hogy `[TESZT]`.

## Mi NEM változott? / What is NOT changed

- Nincs új szerver-végpont; az `/api/contact` route kódja érintetlen (Origin-ellenőrzés, rate limit,
  validáció, SMTP).
- Nem változott környezeti változó, Vercel- vagy deploy-beállítás.
- Az űrlap kinézete, mezői és beküldése ugyanaz (a `ContactCapture` csak a közös modulból veszi a
  legördülő feliratait és az üzenetszöveget; a kimenet bájtra azonos).
- Nincs böngészőbővítmény vagy agens-csomag a futásidőben; az egyetlen új csomag a `webmcp-types`
  (devDependency, csak típusok).

## Eltávolítás / How to remove it

1. Töröld a `<WebMcpQuoteTool />` sort és az importját az `app/components/ContactCapture.tsx`-ből.
2. Töröld: `app/components/WebMcpQuoteTool.tsx`, `app/lib/webmcp/`, a két `tests/webmcp-request-quote*.spec.ts`
   fájlt és ezt a dokumentumot.
3. `npm uninstall webmcp-types`
4. Az `app/lib/quoteRequest.ts` maradhat (az űrlap használja); ha azt is el akarod távolítani, előbb tedd
   vissza a feliratokat és az üzenetszöveget a `ContactCapture`-be.
5. `npm run build`, utána push.
