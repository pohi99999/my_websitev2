# Kommunikációs napló (utóbbi ~8 óra)

Cél: a háttérvideók javítása és a kért szövegfrissítések élesítése úgy, hogy minden a GitHub `main` ágról menjen Vercel deployra.

## 1) Kért módosítások (3 komponens)

### 1.1 Hero – háttérkép helyett videó + pontos headline
Fájl: `app/components/Hero.tsx`

- A háttérképes `div` lecserélve full-screen háttérvideóra: `/home.mp4`
- Videó attribútumok: `autoPlay`, `loop`, `muted`, `playsInline`, `object-cover`
- Olvashatóság miatt sötét overlay: `bg-black/60`
- Kritikus szöveg pontosítva:
  - H1 1. sor: `A Jövő Elkezdődött.`
  - H1 2. sor (gradient): `Innováció és Mesterséges Intelligencia`
  - Alcím (P): `az ember kapcsolata az elkövetkező időszak kulcsa a sikerhez.`

### 1.2 Portfolio – háttérvideó a teljes szekció mögé (Lightbox marad)
Fájl: `app/components/Portfolio.tsx`

- Háttérvideó hozzáadva a section mögé: `/portfolio.mp4` (muted/autoplay/loop/playsInline)
- Overlay hozzáadva: `bg-black/60`
- Lightbox (kattintható badge + modal) változatlan
- „Pohi AI Pro” kártyaszöveg változatlan (nem lett visszaállítva)

### 1.3 About – háttérvideó a teljes szekció mögé (accordion szöveg marad)
Fájl: `app/components/About.tsx`

- Háttérvideó hozzáadva: `/contact.mp4` (muted/autoplay/loop/playsInline)
- Overlay hozzáadva: `bg-black/60`
- Accordion szövegek nem változtak

## 2) Build/Lint ellenőrzések

- `npm run lint` és `npm run build` futtatva; build sikeres.
- Ismert (nem blokkoló) figyelmeztetések:
  - Next ESLint javaslat: `<img>` helyett `next/image` használata (teljesítmény/LCP)
  - TypeScript verzió figyelmeztetés az `@typescript-eslint` támogatási tartomány miatt

## 3) Miért nem indult a portfolio.mp4 a /portfolio oldalon?

Tünet: a `portfolio.mp4` a Portfolió oldalon nem indult, miközben a többi videó rendben volt.

Diagnózis:
- A live oldalon a `GET /portfolio.mp4` **404** volt.
- Kiderült, hogy a repo `.gitignore` tiltja a `*.mp4` fájlokat, ezért a `public/portfolio.mp4` **nem volt Git-ben**, így a Vercel buildből is kimaradt.

## 4) Javítás (asset bekerült a main-be és Vercelre)

### 4.1 Gyors fix: portfolio.mp4 verziókezelésbe
- A `public/portfolio.mp4` bekerült a repository `main` ágába.
- Vercel deploy ellenőrzés: GitHub commit status → **success (Deployment has completed)**
- Live ellenőrzés: `https://mywebsitev2.vercel.app/portfolio.mp4` → **HTTP 200**

### 4.2 „Bebiztosítás”: minden public/*.mp4 trackelve
- Ellenőrzés történt, hogy a `public/` alatti videók közül melyek vannak Git-ben.
- Jelenleg a következők trackeltek és elérhetők a Vercelen is:
  - `public/home.mp4`
  - `public/portfolio.mp4`
  - `public/contact.mp4`
  - `public/blog.mp4`
  - `public/products.mp4`
  - `public/services.mp4`
  - `public/about.mp4`

## 5) GitHub main és Vercel állapot

- Minden változás a `main` főágon van.
- A Vercel deploy a `main` ágról történik.
- Commit státusz ellenőrzésekkel több körben validálva: **success**.

## 6) Gemini kérés – „force add” workflow

Felmerült igény: ne módosítsuk a `.gitignore`-t, hanem `git add --force`-szal „áttörve” kerüljön be a 3 videó.

- A `.gitignore` végül **vissza lett állítva** (a `*.mp4` tiltás marad).
- A 3 videó **továbbra is** a repo része és a Vercelen elérhető, mert már bekerültek trackelve a Git-be korábban.
- A Vercel státusz újra ellenőrizve a legfrissebb `main` commiton: **Deployment has completed**.

## 7) 2025-12-17 – Hero szöveg frissülés/stabilitás javítás

Tünet:
- A Kezdőoldal Hero főcímében a frissített szöveg betöltéskor röviden megjelent, majd eltűnt.
  Ez a gyakorlatban úgy hatott, mintha a régebbi verzió „visszajönne”.

### 7.1 Layout SSR/hydration stabilizálás
Fájl: `app/layout.tsx`

- Korábban a `LenisProvider` dinamikus importtal volt betöltve `ssr: false`-szal.
  Ez a teljes fa renderelését könnyen CSR irányba tolhatta (bailout/hydration anomália).
- Javítás: a `LenisProvider` közvetlen importtal lett használva a layoutban.
- Eredmény: stabilabb első render és eltűnt a „Bailout to client-side rendering” jellegű kimenet.

### 7.2 Gradiens sor „eltűnésének” kivédése
Fájl: `app/components/Hero.tsx`

- A gradiens szöveg (`bg-clip-text` + `text-transparent`) bizonyos környezetben láthatatlanná válhat.
- Javítás: a gradiens szöveg alá került egy fehér fallback réteg ugyanazzal a szöveggel.
  Így ha a gradiens renderelés hibázik, a sor akkor is olvasható marad.
- Plusz: a háttérvideó kapott `tabIndex={-1}`-et, hogy `aria-hidden="true"` mellett se legyen fókuszolható (a11y).

Állapot:
- A javítások a GitHub `main` ágon vannak, és Vercelre ki vannak deployolva.

## 8) Quick ellenőrzőlista (ha bármi furcsaság van)

- Hard refresh: `Ctrl+Shift+R`
- Video URL teszt:
  - `/home.mp4`, `/portfolio.mp4`, `/contact.mp4` → 200 + `video/mp4`
- Ha mobil Safari-n autoplay gond van: `muted` + `playsInline` már be van állítva (ez volt a fontos rész).

## 9) 2025-12-17 – Brunella Agents: YouTube háttér (full-screen iframe)

Fájl: `app/termekek/brunella-agents/page.jsx`

- A Brunella Agents oldal háttérvideója lecserélve full-screen YouTube embedre (ID: `9h0tFmAlnIQ`).
- Követelmények szerint:
  - `iframe` full-screen: `absolute inset-0 w-full h-full object-cover pointer-events-none`
  - URL paraméterek: `autoplay=1&mute=1&controls=0&loop=1&playlist=9h0tFmAlnIQ&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`
  - Sötét overlay: `bg-black/70`
  - Tartalom a videó felett: `relative z-10`
- Build ellenőrzés: `npm run build` → sikeres.
- Commit: `7ca3f5a` (main)

### 9.1 Kiegészítő korrekció (scroll közben végig látszódjon)

- Probléma: a háttér csak a lap egy részén volt „jól látható”, felül túl sötét/fekete hatású volt.
- Javítás: a háttér `iframe` + overlay pozíciója `absolute` helyett `fixed inset-0` lett, így a videó a teljes oldal görgetése alatt végig a viewport mögött marad.
- Commit: `7065745` (main)

### 9.2 „Teljes kitöltés” (black frame/border eltüntetése)

- Probléma: YouTube `iframe` esetén a sima `w-full h-full` gyakran letterbox-ot (fekete keretet) eredményez, mert az `iframe` nem ugyanúgy kezeli az `object-fit: cover`-t, mint egy natív `<video>`.
- Javítás: 16:9 „cover” technika oversized, középre igazított `iframe`-fel:
  - Wrapper: `fixed inset-0 overflow-hidden pointer-events-none`
  - Iframe (középre + túlméretezve): `min-w-[100vw] min-h-[56.25vw] w-[177.78vh] h-[100vh]`
  - Overlay: `fixed inset-0 bg-black/70` a videó felett, a tartalom alatt
- Commit: `2006c5b` (main)

Live ellenőrzés:
- A Vercel által kiszolgált HTML már tartalmazza a „full-bleed” classokat, tehát a legfrissebb verzió kint van.

## 10) 2025-12-17 – Pohi AI Pro: YouTube háttér (full-screen iframe)

Fájl: `app/termekek/pohi-ai-pro/page.jsx`

- A Pohi AI Pro oldal háttere lecserélve full-screen YouTube embedre (ID: `7sI8Y_TYnGw`).
- Követelmények szerint:
  - `iframe` class: `absolute inset-0 w-full h-full object-cover pointer-events-none`
  - URL paraméterek: `autoplay=1&mute=1&controls=0&loop=1&playlist=7sI8Y_TYnGw&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`
  - Sötét overlay: `bg-black/70`
  - Tartalom a videó felett: `relative z-10` wrapperben, a meglévő szöveg változatlanul megtartva.
- Build ellenőrzés: `npm run build` → sikeres.

### 10.1 Kiegészítő korrekció (scroll közben végig látszódjon)

- Probléma: a háttér videó csak a lap elején volt látható, görgetésnél a többi rész fekete maradt.
- Javítás: a háttér `iframe` + overlay `fixed inset-0` lett, és a Brunella-mintára „full-bleed cover” technikát kapott:
  - Wrapper: `fixed inset-0 overflow-hidden pointer-events-none`
  - Iframe (középre + túlméretezve): `min-w-[100vw] min-h-[56.25vw] w-[177.78vh] h-[100vh]`
  - Overlay: `fixed inset-0 bg-black/70`

## 11) 2025-12-17 – Kapcsolat + Footer: valós elérhetőségek és social linkek

Fájlok:
- `app/kapcsolat/page.jsx`
- `app/components/Footer.tsx`

- Kapcsolat oldalon a placeholder adatok lecserélve a valós adatokra:
  - Email: `peterpohankapersonal@gmail.com`
  - Telefon: `+36 30 429 1227`
  - Cím: `8900 Zalaegerszeg, Magyarország`
- Footer „Vezetés” rész bővítve 6 social ikonnal + valós linkekkel:
  - Facebook, LinkedIn, GitHub, X (Twitter), Google Developer (`Code2`), YouTube
  - `lucide-react` ikon importok kiegészítve: `Github`, `Twitter`, `Youtube`, `Code2`

## 12) 2025-12-17 – Blog: valós tartalom + dinamikus lista

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/blog/page.jsx`

- A Blog rész „dummy” posztjai lecserélve 3 valós BAS / Glass Box témájú cikkre:
  - `fekete-doboz-vege-glass-box`
  - `az-ido-a-legertekesebb-valuta`
  - `brunella-agent-system-mukodese`
- A részletes cikk oldalon (`/blog/[slug]`) bekerült a feltételes YouTube embed:
  - ha van `videoId`, akkor a „Featured Video” szekcióban `iframe` jelenik meg.
- A blog lista oldal (`/blog`) refaktorálva: `posts` tömb + `.map()` renderelés a kártyákhoz.
- Build ellenőrzés: `npm run build` → sikeres.

## 13) 2025-12-17 – Blog: YouTube videók finomhangolása (2 poszt)

Fájl:
- `app/blog/[slug]/page.jsx`

- `fekete-doboz-vege-glass-box` videó cserélve: `IbPvzLXlO6Y` (Glass Box magyarázó)
- `brunella-agent-system-mukodese` videó cserélve: `VO4Wk68QKHE` (Under the Hood deep dive)
- `az-ido-a-legertekesebb-valuta` maradt: `9h0tFmAlnIQ`

## 14) 2025-12-17 – Blog: új 4. cikk (Brunella MI csapatvezető)

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/blog/page.jsx`

- Új poszt hozzáadva: `brunella-mi-csapatvezeto`
  - Cím: "Brunella: Az MI csapatvezető és a jövő szervezete"
  - YouTube: `VO4Wk68QKHE`
  - Kategória a részletes oldalon: `Esettanulmány & Tech`
- Blog lista (`/blog`) bővítve: új kártya a poszt számára
  - Dátum: `2025. Jan. 20.`
  - Kategória a listában: `Esettanulmány`
- Build ellenőrzés: `npm run build` → sikeres.

## 15) 2025-12-17 – Blog: új 5. cikk (Digitális Lenye-mat / Tech Report)

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/blog/page.jsx`

- Új poszt hozzáadva: `digitalis-lenyomat-anatomiaja`
  - Cím: "A Digitális Lenye-mat: Egy MI Partner Szemével"
  - Szerző: "Brunella (AI Assistant)"
  - Dátum: "2025. Január 25."
  - Kategória: "Tech Report"
  - YouTube: `VO4Wk68QKHE`
- Blog lista (`/blog`) bővítve: új kártya a poszt számára ("A Digitális Lenye-mat", 2025. Jan. 25.)
- Build ellenőrzés: `npm run build` → sikeres.

## 16) 2025-12-17 – Blog: új 6. cikk (Bevezető az MI-be / Prompt Engineering)

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/blog/page.jsx`

- Új poszt hozzáadva: `bevezeto-a-mesterseges-intelligencia-vilagaba`
  - Cím: "Bevezető a Mesterséges Intelligencia Világába: Az Alapoktól a Gyakorlatig"
  - Dátum: "2025. Február 01."
  - Kategória (poszt): "Oktatás & Guide"
  - Video: `null` (jelenleg emoji cover: 🎓)
- Blog lista (`/blog`) bővítve: új kártya ("Bevezető az MI Világába", 2025. Feb. 01., kategória: "Oktatás")
- Build ellenőrzés: `npm run build` → sikeres.

## 17) 2025-12-17 – Blog: „Crown Jewel” White Paper (Brunella-Dosszié)

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/blog/page.jsx`

- Új poszt hozzáadva: `brunella-strategiai-white-paper`
  - Cím: "A Brunella-Dosszié: Stratégia, Technológia és a Jövő Ügynökei"
  - Dátum: "2025. Február 10."
  - Kategória: "White Paper"
  - Olvasási idő: "20 perc"
  - YouTube: `VO4Wk68QKHE`
- Blog lista (`/blog`) bővítve: új kártya ("A Brunella-Dosszié (White Paper)", 2025. Feb. 10.)
- Build ellenőrzés: `npm run build` → sikeres.

## 18) 2025-12-17 – Új oldal: Fogalomtár (kereshető glossary)

Fájl:
- `app/fogalomtar/page.jsx`

- Új Glossary/Fogalomtár oldal létrehozva a Blog sötét, modern (glassmorphism) stílusában.
- Keresőmező a tetején: azonnali szűrés a fogalmak és definíciók között.
- Reszponzív grid (1 oszlop mobilon, 2 oszlop desktopon) kártyákkal: fogalom + definíció.
- Használt ikonok: `lucide-react` (`Search`, `BookOpen`, `ArrowLeft`).

### 18.1 Repo „tisztítás” (helyi, nem kívánt módosítások eldobása)

- A munkakönyvtárban maradt, véletlenül módosult oldalak vissza lettek állítva (`git restore`), így a `main` ág tiszta állapotban maradt.
- Lint futtatva: `npm run lint` → nem volt blokkoló hiba (csak meglévő warningok).

## 19) 2025-12-17 – Brunella Agents: interaktív demók (OCR + Agent Collaboration)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- Két új, látványos demó szekció hozzáadva a Hero alá, a Features rész elé.
- Megtartva a globális YouTube háttér (full-bleed iframe) és az overlay réteg.

### 19.1 OCRDemoSection (szkennelt dokumentum → JSON)

- Split-screen felépítés:
  - Bal oldalon: CSS-only „Invoice/Contract” dokumentum kártya.
  - Animált „scanner line” (framer-motion) fel-le mozgással + glow.
  - Jobb oldalon: code-window stílusú JSON kimenet typewriter effekttel, plusz apró summary chipek.

### 19.2 AgentTerminalSection (3 ügynök együttműködés)

- Glassmorphism „Terminal” ablak, amelyben 3 agent (Orchestrator/Researcher/Analyst) üzenetei typewriter effekttel jelennek meg.
- Lucide ikonok használata: `Scan`, `Bot`, `Terminal`, `FileText`.
- Automatikus loop újraindulással, hogy mindig „élőnek” hasson.

Ellenőrzés:
- `npm run lint` → csak meglévő warningok
- `npm run build` → sikeres

## 32) 2025-12-19 – Brunella Agents: mobilos "ugrálás" megszüntetése az agent terminálnál

Fájl:
- `app/termekek/brunella-agents/components/AgentTerminalSection.jsx`

- A `brunella://agent-terminal` demó résznél a gépelés közben változó magasság mobilon fel-le ugráltatta az alatta levő szekciókat.
- Javítás: stabil `min-height` a terminál log területére (mobilon nagyobb), és reszponzív (mobilon keskenyebb) agent-oszlop, hogy csökkenjen a tördelésből adódó layout shift.
- Ellenőrzés:
  - `npm run lint` → OK
  - `npm run build` → sikeres

## 33) 2025-12-19 – Termékek: YouTube showcase embed javítás + kulturált fallback

Fájl:
- `app/termekek/components/VideoShowcase.jsx`

- A 3 beágyazott YouTube videó "A videó nem áll rendelkezésre" hibát mutatott (a használt video ID-k nem publikusak / 404).
- Javítások:
  - YouTube embed átállítva privacy-enhanced domainre (`youtube-nocookie`) + autoplay/mute/loop paraméterek.
  - oEmbed alapú elérhetőség-ellenőrzés: csak akkor renderel iframe-et, ha a videó valóban beágyazható; különben kulturált fallback + "Megnyitás YouTube-on" link.
- Ellenőrzés:
  - `npm run lint` → OK
  - `npm run build` → sikeres

## 34) 2025-12-19 – Termékek: új showcase tartalom (2 YouTube + 1 X)

Fájl:
- `app/termekek/components/VideoShowcase.jsx`

- A Termékek oldal alján lévő showcase frissítve a megadott linkekre:
  - YouTube: `b7vWOfSKy_0`
  - YouTube: `mbasMhYMwbk`
  - X (tweet embed): `https://x.com/antigravity/status/1990813606217236828`
- A YouTube elérhetőség-ellenőrzés csak a YouTube videókra fut; az X külön embedként renderelődik.
- Ellenőrzés:
  - `npm run lint` → OK
  - `npm run build` → sikeres

## 35) 2025-12-19 – Termékek: 3. showcase videó stabil MP4 loop (X helyett)

Fájl:
- `app/termekek/components/VideoShowcase.jsx`

- A 3. (korábban X.com) videó embed mobilon nem garantálható autoplay/loop miatt.
- Javítás: a 3. kártya natív MP4 lejátszóra állítva (`/showcase/automation-loop.mp4`), `autoPlay/muted/loop/playsInline` beállításokkal.
- Ha a fájl hiányzik vagy 404, kulturált fallback jelenik meg az X posztra mutató linkkel.
- Ellenőrzés:
  - `npm run lint` → OK
  - `npm run build` → sikeres

## 39) 2025-12-19 – Pre-Launch Cleanup: SEO metadata finomhangolás (Brunella + Szolgáltatások + Kapcsolat)

Fájlok:
- `app/termekek/brunella-agents/page.jsx`
- `app/szolgaltatasok/page.jsx`
- `app/kapcsolat/page.jsx`

Változások:
- Brunella Agents oldal `metadata` frissítve a launch szövegekre:
  - Title: `Brunella Agent System | Autonóm AI Munkaerő`
  - Description: „AI ügynökök, amelyek automatizálják a repetitív irodai feladatokat 0-24 órában.”
- Szolgáltatások oldal `metadata` frissítve:
  - Title: `Szolgáltatásaink | Szoftverfejlesztés & AI`
  - Description: „Egyedi szoftverfejlesztés, AI integráció és felhő megoldások vállalkozások számára.”
- Kapcsolat oldal `metadata` frissítve:
  - Title: `Kapcsolat | Pohánka és Társa Kft.`
  - Description: „Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez.”

Megjegyzés:
- A layout JSON-LD telefonszám már helyes volt (`+36 30 429 1227`), ezért ott nem kellett módosítani.

Ellenőrzés:
- `npm run lint` → OK
- `npm run build` → sikeres

## 32) 2025-12-17 – Brunella Agents: Office Automation (Spreadsheet) interaktív demo

Fájlok:
- `app/termekek/brunella-agents/components/SpreadsheetDemoSection.jsx`
- `app/termekek/brunella-agents/page.jsx`

- Új „Spreadsheet” (Gemini-in-Sheets jellegű) demó szekció készült glassmorphism stílusban.
- Interaktív animáció: soronkénti „Scanning” shimmer + cellánkénti gépelés (`Generating...` → előrejelzés), `prefers-reduced-motion` kompatibilitással.
- Elhelyezés az oldalon: Hero után a demók sorrendje most `OCRDemoSection → SpreadsheetDemoSection → AgentTerminalSection → ...`.

Ellenőrzés:
- `npm run build` → sikeres

## 33) 2025-12-18 – Brunella Agents: Spreadsheet demo kétnyelvűsítés (HU/EN)

Fájlok:
- `app/termekek/brunella-agents/components/SpreadsheetDemoSection.jsx`
- `app/locales/hu.js`
- `app/locales/en.js`

- A Spreadsheet demo feliratai és státuszai `LanguageContext`-ből jönnek (`t(...)`), így a nyelvváltás automatikusan HU/EN.
- Új fordítási kulcsok: `brunellaAgents.spreadsheetDemo.*`.
- A demo sorok (terméknevek + előrejelzés szövegek) is nyelvfüggők.

Ellenőrzés:
- `npm run build` → sikeres

## 34) 2025-12-18 – Brunella Agents: Spreadsheet demo fájlnév + pénznem nyelvfüggően

Fájlok:
- `app/termekek/brunella-agents/components/SpreadsheetDemoSection.jsx`
- `app/locales/hu.js`
- `app/locales/en.js`

- A fejléc fájlnév felirat nyelvfüggő lett (`Q4_elorejelzes.sheet` / `Q4_forecast.sheet`).
- A Q3/Q4 értékek már számokból renderelődnek `Intl.NumberFormat`-tal:
  - HU: `HUF` formázás (pl. „42 300 Ft”)
  - EN: `EUR` formázás (pl. „€42,300”)

Ellenőrzés:
- `npm run build` → sikeres

## 32) 2025-12-17 – Brunella Agents: “Rendszer dokumentációja” letöltő kártya

Fájlok:
- `app/termekek/brunella-agents/components/DocumentationSection.jsx`
- `app/termekek/brunella-agents/page.jsx`

- Új, centered szekció került a Brunella Agents oldal legaljára: egy darab széles `SpotlightCard`.
- Tartalom:
  - Ikon: `FileText` (lucide-react)
  - Cím: “Rendszer dokumentációja”
  - Leírás: “Töltse le a részletes technikai specifikációt és a BAS működési kézikönyvét.”
  - Link: Google Drive dokumentum (új fülön nyílik, `target="_blank"` + `rel="noopener noreferrer"`)

Ellenőrzés:
- `npm run build` → sikeres

## 34) 2025-12-17 – i18n alap (HU/EN) + nyelvváltó

Fájlok:
- `app/locales/hu.js`
- `app/locales/en.js`
- `app/context/LanguageContext.jsx`
- `app/components/LanguageSwitcher.tsx`
- `app/layout.tsx`
- `app/components/Header.tsx`
- `app/components/Navbar.tsx`
- `app/components/Hero.tsx`

- Létrejött a fordítási infrastruktúra HU/EN támogatással.
- `LanguageContext` biztosítja: aktuális nyelv (`hu`/`en`), `t(key)` lookup, és localStorage perzisztencia (`site-language`).
- Új glassmorphism stílusú nyelvváltó gomb: `LanguageSwitcher` (lucide `Globe` ikon).
- Integráció:
  - Root layout a teljes appot `LanguageProvider`-be csomagolja.
  - Headerben a nyelvváltó a CTA mellett, mobil menüben is elérhető.
  - Hero demo: headline + subheadline (és CTA label-ek) `t()`-ről jönnek.

Ellenőrzés:
- `npm run lint` → sikeres
- `npm run build` → sikeres

## 35) 2025-12-17 – i18n bővítés: Footer + Termékek VideoShowcase

Fájlok:
- `app/locales/hu.js`
- `app/locales/en.js`
- `app/components/Footer.tsx`
- `app/components/Navbar.tsx`
- `app/termekek/components/VideoShowcase.jsx`

- Bővültek a fordítási kulcsok egységes struktúrával: `footer.*` és `products.videoShowcase.*`.
- A Footer szekciócímei, tagline és jogi linkek szövegei `t()`-ről jönnek (HU/EN).
- A Termékek oldali VideoShowcase szekció címe/leírása és kártya szövegei is fordíthatók.
- A (one-page) `Navbar` demo komponens linkjei is `t('navbar.*')` alapján jelennek meg.

Ellenőrzés:
- `npm run lint` → sikeres
- `npm run build` → sikeres

## 36) 2025-12-17 – Route alapú i18n: /en alútvonal + middleware

Fájlok:
- `middleware.ts`
- `app/en/[[...slug]]/page.tsx`
- `app/layout.tsx`
- `app/context/LanguageContext.jsx`
- `app/components/LanguageSwitcher.tsx`
- `app/components/Header.tsx`
- `app/components/Footer.tsx`

- Bevezetve a route-alapú angol (EN) útvonal: minden angol oldal `/en/...` alatt érhető el.
- `middleware.ts`:
  - `site-language` cookie állítása útvonal alapján (`/en` → `en`, egyéb → `hu`)
  - opcionális `/hu/...` útvonalak 308 redirectje a kanonikus HU URL-ekre (no-prefix)
- Root layout most cookie alapján állítja a HTML `lang` attribútumot és a `LanguageProvider initialLanguage` értékét.
- A `LanguageSwitcher` nyelvváltáskor nem csak a szöveget váltja, hanem az útvonalat is (HU no-prefix ↔ EN `/en`).
- Header + Footer linkek EN módban automatikusan `/en` prefixet kapnak, így a navigáció EN alatt is EN marad.

Ellenőrzés:
- `npm run lint` → sikeres
- `npm run build` → sikeres (middleware és `/en/[[...slug]]` route generálódik)

## 37) 2025-12-17 – /en SEO “profi”: metadata + canonical + hreflang

Fájl:
- `app/en/[[...slug]]/page.tsx`

- Bevezetve a `generateMetadata` az `/en/[[...slug]]` catch-all route-hoz.
- Oldalankénti (route-alapú) EN title/description mapping (pl. `/en`, `/en/termekek`, `/en/blog`, `/en/portfolio`, `/en/kapcsolat`, stb.).
- SEO:
  - `alternates.canonical`: EN oldalaknál a kanonikus URL `/en/...`
  - `alternates.languages`: `hu` (no-prefix) + `en` (`/en/...`) → hreflang támogatás
- Social preview:
  - OpenGraph + Twitter meta beállítva (title/description + `metadataBase`)
  - OG image: `public/images/logo.png`

- i18n hardening:
  - Middleware most `x-site-language` request headert is továbbít, amit a RootLayout preferál, így az `/en/...` oldalak **első betöltésre** is EN nyelvvel renderelnek (HTML `lang` + `LanguageProvider initialLanguage`).

Ellenőrzés:
- `npm run lint` → sikeres
- `npm run build` → sikeres

## 38) 2025-12-17 – /en SSR nyelv fix: statikus cache kikapcsolása (force-dynamic)

Fájl:
- `app/en/[[...slug]]/page.tsx`

Probléma (live validáció során):
- Az `/en/...` oldalak HTML-je első kérésre is `lang="hu"`-val érkezett, még akkor is, amikor a middleware már `site-language=en` cookie-t állított.
- A válaszfejlécek alapján ez **statikusan cache-elt** HTML volt (`X-Vercel-Cache: HIT`), így a request-alapú nyelvdetektálás (cookie/header) nem tudta befolyásolni az SSR-t.

Javítás:
- Az `/en` catch-all route kényszerített statikus renderje (`force-static`) átállítva **dinamikusra** (`force-dynamic`).
- Ezzel az `/en/...` SSR már request-alapú, így a middleware által beállított nyelv (cookie + `x-site-language` header) ténylegesen érvényesülhet az első rendernél is.

Ellenőrzés:
- `npm run build` → sikeres (az `/en/[[...slug]]` route `ƒ (Dynamic)`)

## 32) 2025-12-17 – OG képek brand template + Markdown render pipeline + Web Vitals (JS split)

Fájlok / újdonságok:
- `app/_og/brand.tsx`, `app/_og/fonts.ts`:
  - Egységes OG/Twitter kép template Inter betűtípussal (Edge `next/og`).
  - Theme-ek: `core`, `blog`, `portfolio`, `products`, `brunella`.
- OG/Twitter route-ok egységesítve a template-re:
  - `app/opengraph-image.tsx`, `app/twitter-image.tsx`
  - `app/blog/opengraph-image.tsx`, `app/blog/twitter-image.tsx`
  - `app/blog/[slug]/opengraph-image.tsx`, `app/blog/[slug]/twitter-image.tsx`
  - `app/portfolio/opengraph-image.tsx`, `app/portfolio/twitter-image.tsx`
  - `app/portfolio/[id]/opengraph-image.tsx`, `app/portfolio/[id]/twitter-image.tsx`
  - `app/termekek/opengraph-image.tsx`, `app/termekek/twitter-image.tsx`
  - `app/termekek/brunella-agents/opengraph-image.tsx`, `app/termekek/brunella-agents/twitter-image.tsx`

Markdown pipeline:
- `lib/markdown.ts`:
  - `remark/rehype` + `rehype-sanitize` + external link kezelés, cache-elt render.
- `app/blog/[slug]/page.jsx`:
  - A korábbi „string builder” HTML render lecserélve `renderMarkdownToHtml()`-ra.
- `app/globals.css`:
  - `.blog-content` tipográfia a markdown HTML-hez.

Web Vitals (code split):
- `app/components/GsapFadeIn.tsx`: GSAP/ScrollTrigger dinamikus import + reduced-motion guard.
- `app/components/SpotlightCard.tsx`: framer-motion verzió dinamikus import, reduced-motion fallback.
- `app/components/SpotlightCardMotion.tsx`, `app/hooks/usePrefersReducedMotion.ts`: új segédfájlok.

Font preload / stabil tipó:
- `app/layout.tsx`: Inter `next/font` változó (`--font-inter`) + `display: 'swap'`.
- `app/globals.css`: `font-family` átállítva `var(--font-inter)` használatra.

Ellenőrzés:
- `npm run lint` → sikeres (TS eslint figyelmeztetés: TS 5.9.x nem „officially supported” az eslint parser szerint)
- `npm run build` → sikeres

## 33) 2025-12-17 – Termékek oldal: Video Showcase (YouTube) szekció

Fájlok:
- `app/termekek/components/VideoShowcase.jsx`
- `app/termekek/page.jsx`

- Új szekció hozzáadva a Termékek oldalra: **„AI a Gyakorlatban”**.
- 3 db YouTube videó kártya responsive gridben (lazy iframe betöltéssel).
- Stílus: sötét / glassmorphism (SpotlightCard) egységes a site designnal.
- A Termék grid után került be, és a végére bekerült a hivatkozott CTA blokk: **„Nincs megfelelő megoldás?”** (kapcsolat oldalra mutató gombbal).

Ellenőrzés:
- `npm run lint` → sikeres
- `npm run build` → sikeres

## 32) 2025-12-17 – “Perfect site” alapcsomag #1: reduced-motion + security headerek + OG képek + schema

Fókusz: Web Vitals / UX alapok (reduced motion), biztonsági válaszheaderek, és “rich share”/schema alapok bővítése.

### 32.1 Reduced motion / perf UX

Fájlok:
- `app/components/LenisProvider.tsx`
- `app/components/VideoBackground.tsx`
- `app/globals.css`

- `prefers-reduced-motion: reduce` és `save-data` esetén a Lenis smooth scroll nem indul el.
- A `VideoBackground` reduced motion esetén statikus háttérre esik vissza (nem autoplay-ol videót).
- Globális CSS reduced-motion szabály: kikapcsolja a `scroll-behavior: smooth`-ot és minimalizálja animáció/transition időket.

### 32.2 Security response headerek

Fájl:
- `next.config.js`

- `headers()` beállítva alap security headerekkel (`nosniff`, `referrer-policy`, `permissions-policy`, `x-frame-options`).
- `Strict-Transport-Security` csak production-ben.
- `poweredByHeader: false`.

### 32.3 OG/Twitter share képek (route-ok)

Fájlok:
- `app/opengraph-image.tsx`, `app/twitter-image.tsx`
- `app/blog/opengraph-image.tsx`, `app/blog/twitter-image.tsx`
- `app/portfolio/opengraph-image.tsx`, `app/portfolio/twitter-image.tsx`
- `app/termekek/opengraph-image.tsx`, `app/termekek/twitter-image.tsx`

- Kulcs oldalakra egységes, modern OG/Twitter preview képek kerültek.
- A listing oldalak metadata-jából kikerült a hardcoded logo `openGraph.images`, hogy a route alapú OG képek érvényesüljenek.

### 32.4 Structured data (JSON-LD)

Fájlok:
- `app/blog/[slug]/page.jsx`
- `app/portfolio/[id]/page.jsx`

- Blog poszt oldalon: `BlogPosting` + `BreadcrumbList`.
- Portfólió detail oldalon: `CaseStudy` + `BreadcrumbList`.
- A dinamikus oldalak `generateMetadata`-ja Twitteren `summary_large_image` kártyára váltott.

Ellenőrzés:
- `npm run lint` → OK (TypeScript verzió warning: `@typescript-eslint` támogatási tartomány)
- `npm run build` → sikeres (edge runtime figyelmeztetés: edge oldalak statikus generálást tiltják)

## 33) 2025-12-17 – OG/Twitter: dinamikus share képek + apró Web Vitals finomhangolás

### 33.1 Dinamikus OG/Twitter képek a detail oldalakra

Fájlok:
- `app/blog/[slug]/opengraph-image.tsx`
- `app/blog/[slug]/twitter-image.tsx`
- `app/portfolio/[id]/opengraph-image.tsx`
- `app/portfolio/[id]/twitter-image.tsx`

- Blog és portfólió részletes oldalak share preview-ja most már a konkrét cikk/projekt címével generálódik (Edge `ImageResponse`).

### 33.2 Web Vitals: embed optimalizáció

Fájl:
- `app/blog/[slug]/page.jsx`

- A beágyazott YouTube iframe `loading="lazy"`-t kapott (a hero után jön, így nem akadályozza az első render-t).

Ellenőrzés:
- `npm run lint` → OK (TypeScript verzió warning: `@typescript-eslint` támogatási tartomány)
- `npm run build` → sikeres

## 34) 2025-12-17 – OG/SEO karbantartás: meta kiszervezés (duplikáció megszüntetése)

Fókusz: a dinamikus OG képek és a blog lista ugyanabból a meta-forrásból dolgozzon (cím/dátum/kategória), ne legyen több helyen hardcode.

Fájlok:
- `app/blog/blogPosts.meta.ts`
- `app/portfolio/projects.meta.ts`
- `app/blog/[slug]/opengraph-image.tsx`
- `app/blog/[slug]/twitter-image.tsx`
- `app/portfolio/[id]/opengraph-image.tsx`
- `app/portfolio/[id]/twitter-image.tsx`
- `app/blog/page.jsx`

- A blog és portfólió detail OG/Twitter képek meta alapján renderelnek (cím + kiegészítő subtitle).
- A blog listing (`/blog`) posztlistája a `BLOG_POST_ORDER` + `BLOG_POST_META` alapján épül fel.

Ellenőrzés:
- `npm run lint` → OK (TypeScript verzió warning: `@typescript-eslint` támogatási tartomány)
- `npm run build` → sikeres

## 35) 2025-12-17 – Blog detail: shared meta használata (1 forrás mindenhol)

Fókusz: a blog részletes oldal (`/blog/[slug]`) se tartson duplikált title/dátum/kategória/author/readTime/excerpt adatot, hanem a közös meta modul legyen az egyetlen forrás.

Fájl:
- `app/blog/[slug]/page.jsx`

- A `generateMetadata` és az oldal UI + JSON-LD a `getBlogPostMeta(slug)` alapján tölti a meta mezőket.
- Kapcsolódó cikkek címében is a meta az elsődleges (fallback a korábbi title-re).

Ellenőrzés:
- `npm run lint` → OK
- `npm run build` → sikeres

## 36) 2025-12-17 – Blog: relatedPosts title duplikáció megszüntetése

Fókusz: a kapcsolódó cikkek listában ne legyen külön `title` hardcode-olva; a cím mindig a shared meta modulból jöjjön.

Fájl:
- `app/blog/[slug]/page.jsx`

- A `relatedPosts` elemekből kikerültek a `title` mezők (csak `slug` maradt).
- Renderelésnél a `getBlogPostMeta(slug)?.title` az elsődleges (fallback: korábbi title → slug).

Ellenőrzés:
- `npm run lint` → OK
- `npm run build` → sikeres

## 32) 2025-12-17 – Launch SEO/OG + sitemap/robots + jogi oldalak + 404 + `next/image`

Fájlok:
- `app/layout.tsx`
- `app/page.jsx`
- `app/fogalomtar/page.jsx`
- `app/fogalomtar/GlossaryClient.jsx`
- `app/not-found.tsx`
- `app/impresszum/page.tsx`
- `app/adatvedelmi-nyilatkozat/page.tsx`
- `app/aszf/page.tsx`
- `app/components/Footer.tsx`
- `app/components/Header.tsx`
- `app/components/Navbar.tsx`
- `app/components/Portfolio.tsx`
- `app/termekek/brunella-agents/components/AgentNetworkDemo.jsx`
- `public/robots.txt`
- `public/sitemap.xml`

### 32.1 Globális SEO/OG és schema rendbetétel
- `metadataBase` beállítva: `https://pohanka.vercel.app`
- Globális Open Graph kapott alap `images`-t (`/images/logo.png`) + `url`
- Canonical link frissítve: `https://pohanka.vercel.app`
- JSON-LD schema placeholder adatok cserélve valós elérhetőségre (telefon, email, social linkek, logo útvonal)

### 32.2 Per-page metadata: Home + Fogalomtár
- Home (`/`) kapott saját title/description/OG-t.
- Fogalomtár route szerver komponens lett (kliens UI külön `GlossaryClient.jsx`-ben), így per-page metadata exportolható.

### 32.3 Sitemap/robots frissítés (launch)
- `robots.txt` sitemap URL: `https://pohanka.vercel.app/sitemap.xml`
- `sitemap.xml` domain egységesítve `pohanka.vercel.app`-re
- Blog slugok frissítve a jelenlegi posztokra
- Hozzáadva: `/fogalomtar`, `/impresszum`, `/adatvedelmi-nyilatkozat`, `/aszf`

### 32.4 Jogi oldalak + egyedi 404
- Új oldalak: Impresszum, Adatvédelmi nyilatkozat, ÁSZF
- Új `app/not-found.tsx` egyedi 404 oldal
- Footer jogi linkek már nem `#`, hanem valós route-okra mutatnak

### 32.5 Teljesítmény + mobil
- `<img>` → `next/image`: Header + Navbar logó, Portfolio badge + lightbox
- Brunella Agent Network Graph: mobilon is visszafogott animáció (perf)

## 33) 2025-12-17 – Kapcsolat űrlap: tényleges küldés API-n keresztül

Fájlok:
- `app/kapcsolat/page.jsx`
- `app/api/contact/route.ts`

- A Kapcsolat oldali űrlap már nem csak UI: `POST /api/contact` hívással ténylegesen elküldi az üzenetet.
- Backend: Next.js Route Handler + Nodemailer SMTP-vel.
- Alap spam védelem: honeypot mező (`website`).

### Vercel Environment Variables (szükséges)
- `SMTP_HOST`
- `SMTP_PORT` (pl. 465 vagy 587)
- `SMTP_USER`
- `SMTP_PASS`
- (opcionális) `CONTACT_TO` (alapértelmezett: `peterpohankapersonal@gmail.com`)
- (opcionális) `CONTACT_FROM` (külön feladó cím, ha a szolgáltató megköveteli)

### 33.1 Extra védelem: rate limit (Gmail limit védelme)
- `POST /api/contact` kapott IP-alapú rate limitet (fix ablak): 2 kérés / 2 perc / IP.
- Túl sok kérés esetén `429` + `Retry-After` fejléc.

### 33.2 Globális (serverless-biztos) rate limit: Upstash Redis

- Az `/api/contact` rate limit Upstash Redis-szel is működik, így több Vercel instance között is egységes.
- Beállítás: **10 üzenet / nap (globális)** + **2 kérés / 2 perc / IP** (burst védelem).
- Ha nincs beállítva Upstash (hiányzó env), automatikusan visszaesik a korábbi in-memory limiterre (best-effort).

Vercel Environment Variables (Upstash):
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## 33.3 – SEO finomhangolás: canonical + Brunella OG/Twitter kép

- Javítás: a globális layoutban korábban fixen `https://pohanka.vercel.app/` volt beállítva canonical-ként minden oldalra, ez SEO szempontból hibás volt.
- Megoldás: a hardcoded canonical törölve a layoutból, és a fontos oldalak per-page canonical-t kaptak a Next.js `metadata`-n keresztül:
  - Home: `/`
  - Fogalomtár: `/fogalomtar`
  - Brunella Agents: `/termekek/brunella-agents`
- Brunella Agents kapott `twitter:card` beállítást és automatikus OG/Twitter preview képeket (Next.js `opengraph-image.tsx` / `twitter-image.tsx`).

## 33.4 – SEO “pro” csomag: canonical rollout + structured data

- Per-page canonical hozzáadva a fő oldalakhoz (`/kapcsolat`, `/termekek`, `/szolgaltatasok`, `/rolunk`, `/portfolio`, `/blog`) a Next.js `metadata.alternates.canonical` segítségével.
- Dinamikus oldalaknál is korrekt canonical:
  - Blog cikk: `/blog/[slug]` → `generateMetadata` alapján
  - Portfólió projekt: `/portfolio/[id]` → `generateMetadata` alapján
- SEO-blokkoló `use client` eltávolítva ahol nem volt rá szükség (Blog cikk, Portfólió részletező, Pohi AI Pro), így a metadata ismét biztosan működik.
- Kapcsolat oldal refaktor: a `page.jsx` szerver komponens lett metadata-val, a kliens űrlap logika külön `KapcsolatClient.jsx`-be került.
- Brunella Agents kapott JSON-LD sémát (Product + SoftwareApplication + BreadcrumbList) a jobb indexeléshez.

## 20) 2025-12-17 – Brunella Agents: 3. interaktív demó (Business Workflow)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- Új `BusinessLogicDemo` szekció hozzáadva az Agent Terminal alá (Features elé): "Valós Üzleti Szituációk".
- Flowchart jellegű vizuál: 4 lépés nyilakkal összekötve (Research → Process → Decision → Result).
- Step 1 (Research): radar/scan animáció, "Market Data Points" pontok pulzálással.
- Step 2 (Process): pontok összeolvadnak egy Summary Card-ba (AnimatePresence + motion animációk).
- Step 3 (Decision): 3 interaktív gomb (Email 📧 / LinkedIn 🚀 / Report 📊).
- Step 4 (Result): kattintásra "Generated Artifact" modal nyílik glassmorphism stílusban, a tartalom typewriter effekttel jelenik meg.

Ellenőrzés:
- `npm run lint` → csak meglévő warningok
- `npm run build` → sikeres

## 21) 2025-12-17 – Brunella Agents: Business Workflow demó finomhangolás (Valós Üzleti Szituációk)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- A demó lépései a specifikációhoz igazítva: "Market Research (Kutatás)" → "Data Processing (Feldolgozás)" → "Strategic Options (Brunella)" → "Execution (Végrehajtás)".
- Step 1-ben a radar mellé feliratozott, lebegő datapoint chipek kerültek (pl. "Competitor Price: €50", "Trend: Rising").
- Step 2-ben a datapointok animáltan összeolvadnak a központi Insight/Summary kártyába.
- Step 3 gombok magyar címkékkel:
  - "Email Kampány Indítása"
  - "Stratégiai Prezentáció"
  - "LinkedIn Poszt Generálás"
- Step 4 modál előnézet realisztikusabb megjelenéssel (Gmail compose / PowerPoint slide preview / LinkedIn poszt preview) és typewriter effekttel.
- Typewriter hook javítva: text váltáskor is korrektül újraindul a gépelés (choice csere esetén).

## 22) 2025-12-17 – Brunella Agents: 4. demó (Agent Network Graph)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- Új `AgentNetworkDemo` szekció hozzáadva a `BusinessLogicDemo` alá, a Features rész elé: "A Brunella Ügynök Hálózat".
- Star-topology vizualizáció:
  - Középen: "Brunella (Orchestrator)" nagy, pulzáló csomópont neon (purple/blue) stílusban.
  - Körben: 9 specialista ügynök (Kutató, Önjavító, Elemző, Vizuális, Biztonság, Média, Kódoló, Email, Dokumentum).
- Framer Motion animációk:
  - Kapcsolati vonalak "kirajzolása" (motion line).
  - "Data packet" pontok oda-vissza mozgással a vonalakon, valós idejű kommunikáció érzetéhez.
- Hover/focus tooltip: csomópontra állva megjelenik az adott ügynök szerep-leírása.

Ellenőrzés:
- `npm run lint` → csak meglévő warningok
- `npm run build` → sikeres

## 23) 2025-12-17 – Home Hero CTA: Brunella Agents link

Fájl:
- `app/components/Hero.tsx`

- A fő Hero CTA gomb célja átállítva a Brunella termékoldalra: `/termekek/brunella-agents`.
- A gomb szövege: "Brunella Agent System" (nyíl ikon megtartva).

## 24) 2025-12-17 – Finomhangolás: deploy check + Link + mobil/perf

Fájlok:
- `app/components/Hero.tsx`
- `app/termekek/brunella-agents/page.jsx`

- Vercel deploy státusz ellenőrzés GitHub commit status alapján: **success** ("Deployment has completed").
- Home Hero CTA átállítva `next/link` használatára (SPA navigáció) a Brunella Agents oldalra.
- Agent Network Graph demó finomítva:
  - Mobilon négyzetes vászon (`aspect-square`), kevesebb torzítás.
  - Tooltip pozíció clampelve nagy képernyőn, mobilon fixebb elhelyezés.
  - `prefers-reduced-motion` támogatás: folyamatos animációk visszafogása, ha a felhasználó ezt kéri.

## 25) 2025-12-17 – Brunella Agents: Biztonság & Kontroll (Human-in-the-loop)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- Új `SafetyControlSection` szekció hozzáadva a demók után (`AgentNetworkDemo` alá), a Features rész elé.
- Cél: “megnyugtató” bizalmi blokk – az AI nem nyomja meg a „piros gombot” a felhasználó nélkül.
- Dizájn: sötét, megbízható (cyan/kék) hangulat, középen pajzs vizuállal, körülötte 3 pillér kártyával:
  - **Ember a Hurokban** (`UserCheck`): kritikus döntések csak jóváhagyással.
  - **Adatvédelem** (`EyeOff`): érzékeny adatok maszkolása (***), elkülönített kezelés.
  - **Alkotmányos AI** (`Scale`): beépített etikai keretek.
- A11y/perf: `prefers-reduced-motion` figyelembe véve a középső animációnál.

## 26) 2025-12-17 – Refaktor: Brunella Agents demók kiszervezése + közös typewriter hook

Fájlok:
- `app/hooks/useTypewriter.js`
- `app/termekek/brunella-agents/page.jsx`
- `app/termekek/brunella-agents/components/AgentTerminalSection.jsx`
- `app/termekek/brunella-agents/components/OCRDemoSection.jsx`
- `app/termekek/brunella-agents/components/BusinessLogicDemo.jsx`
- `app/termekek/brunella-agents/components/AgentNetworkDemo.jsx`
- `app/termekek/brunella-agents/components/SafetyControlSection.jsx`

- A túl nagy `page.jsx` karbantarthatósága miatt a demó szekciók külön komponens fájlokba lettek bontva.
- Új közös hook fájl készült: `useLoopingTypewriter` és `useTypewriterOnce` exporttal.
- A `page.jsx` most már csak importokat + a render sorrendet tartalmazza (Hero után: OCR → Terminal → Business → Network → Safety → Features).

## 27) 2025-12-17 – Hotfix: Brunella Agents `page.jsx` duplikált tartalom törlése

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- Javítva a lintet blokkoló hiba: a fájl alján véletlenül benne maradt a régi oldal egy teljes, duplikált blokkja (második `'use client'` + importok + komponens definíciók).
- A duplikált rész eltávolítva, a `page.jsx` ismét tiszta „import + layout + render” fájl.

## 28) 2025-12-17 – Hotfix: Brunella Agents `page.jsx` végleges tisztítás (2. return törlése)

Fájl:
- `app/termekek/brunella-agents/page.jsx`

- A komponens lezárása után beragadt egy teljes, duplikált „régi oldal” blokk (ismételt `features/useCases/plans` + második `return`).
- A duplikált rész teljesen eltávolítva; megszűnt a `return outside of function` parsing error.
- Ellenőrzés:
  - `npm run lint` → csak meglévő `<img>` warningok
  - `npm run build` → sikeres

## 29) 2025-12-17 – Fogalomtár: "Al" → "AI" elírás javítása

Fájl:
- `app/fogalomtar/page.jsx`

- A fejléc címében az "Al" (téves) szöveg "AI"-ra javítva.
- Ellenőrzés:
  - `npx next lint --file app/fogalomtar/page.jsx` → OK
  - `npm run build` → sikeres (csak meglévő `<img>` warningok)

## 30) 2025-12-17 – Brunella Agents: statikus adatok kiszervezése külön fájlba

Fájlok:
- `app/termekek/brunella-agents/brunella.data.jsx`
- `app/termekek/brunella-agents/page.jsx`

- A `features`, `useCases`, `plans` tömbök kikerültek a `page.jsx`-ből egy külön `brunella.data.jsx` fájlba (named exportokkal).
- A data fájl tartalmazza a szükséges `lucide-react` ikon importokat (JSX ikonokhoz), így a page komponens tisztább és rövidebb lett.
- Ellenőrzés:
  - `npm run lint` → csak meglévő `<img>` warningok
  - `npm run build` → sikeres

## 31) 2025-12-17 – SEO: globális metadata + Brunella Agents oldal metadata

Fájlok:
- `app/layout.tsx`
- `app/termekek/brunella-agents/page.jsx`

- Globális metadata frissítve a launch szövegekre:
  - Title: `template: '%s | Pohánka AI'`, default: `Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés`
  - Description: KKV-k fókusz, Brunella Agent System + automatizálás
  - Open Graph: title/description + `type: website`, `locale: hu_HU`
- Brunella Agents oldal kivezetve `use client`-ből (outer page szerver komponens), így külön `metadata` exportot kapott.

Ellenőrzés:
- `npm run lint` → csak meglévő warningok
- `npm run build` → sikeres
