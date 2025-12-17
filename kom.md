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
  - Telefon: `+36 30 244 6779`
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
