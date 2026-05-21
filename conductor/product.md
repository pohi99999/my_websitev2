# Initial Concept
A weboldalamat kellene fejlesztenünk annyival hogy egy új oldalt készítünk hozzá bővítésnek ezek alapján: "Weboldal + AI KKV-knak" landing page.

# Product Guide: Weboldal + AI KKV-knak

## 1. Project Goal
Egy új, konverzió-optimalizált, magyar nyelvű landing oldal létrehozása a meglévő `my_websitev2` (Next.js) projektben `/weboldal-ai-kkv` útvonalon, amely a magyar kis- és középvállalkozások (KKV-k) számára kínál "Weboldal + AI" integrált szolgáltatásokat. A cél a leadek generálása és a szolgáltatás bemutatása 3 különböző csomagban.

## 2. Target Audience
Olyan magyar KKV-k (szolgáltató cégek, egészségügy/szépségipar, irodai szolgáltatók, kereskedők), akiknek már van forgalmuk, de a weboldaluk elavult vagy nincs, és szeretnék az online jelenlétüket érdeklődő-generáló, automatizált rendszerré alakítani.

## 3. Key Features
- **Hero Section:** Erős értékajánlat, egyértelmű CTA gombokkal ("Ingyenes 15 perces konzultációt kérek").
- **Kinek szól? (Célközönség azonosítás):** Iparág-specifikus példákkal.
- **Mit kapsz konkrétan? (Értékajánlat):** 3 fő pillér: Professzionális weboldal, Beépített AI folyamatok, Mérhető rendszer.
- **Csomagok (Árazás/Szintek):** Starter, Growth, és System csomagok részletes bemutatása.
- **Folyamat (Hogyan dolgozunk együtt):** 3 egyszerű lépés a konzultációtól az átadásig.
- **Referenciák / Bizalom:** Valós, iparágspecifikus példák (ipari, kreatív, könyvelő).
- **FAQ:** A 4 leggyakoribb kérdés és válasz (időkeret, bonyolultság, bővíthetőség, ár).
- **Záró CTA:** Erős felhívás konzultáció foglalására.
- **Globális Navigáció Integráció:** Az új oldal bekötése a meglévő főmenübe (asztali és mobil).

## 4. Non-Functional Requirements
- **Responsive Design:** Tökéletes megjelenés és használhatóság mobilon és asztali gépen, a meglévő design systemhez (színek, tipográfia, layout) igazodva.
- **Test Coverage:** Új e2e Playwright tesztek a landing oldal reszponzivitásának és interakcióinak ellenőrzésére.
- **Performance & SEO:** Gyors betöltődés és alapvető technikai SEO biztosítása (a meglévő Next.js best practice-ek alapján).
- **Integration:** Folyamatos CI/CD integráció a GitHub -> Vercel pipeline-on keresztül.