# Product Guidelines: Weboldal + AI KKV-knak

## 1. Design & Visual Identity
- **Meglévő Design System:** Az új landing oldalnak szigorúan illeszkednie kell a meglévő `my_websitev2` design rendszeréhez.
- **Konzisztencia:** Használjuk a meglévő színeket, tipográfiát, gombstílusokat (CTA) és layout konvenciókat.
- **Stílus:** Modern, letisztult, "glassmorphism" elemekkel (ha a főoldalon ez jellemző), gradient hátterekkel és sima animációkkal (pl. Framer Motion/GSAP), amelyek nem mennek a teljesítmény rovására.

## 2. User Experience (UX) & Responsiveness
- **Mobile-First Megközelítés:** Az oldalnak mobilon (pl. 375x812 viewport) tökéletesen kell működnie: megfelelő margók, egymás alatti (stack-elt) elrendezés.
- **Desktop Optimalizálás:** Asztali nézetben szélesebb elrendezés, jól tagolt oszlopok és átlátható információ-hierarchia.
- **Kattinthatóság:** A CTA gomboknak jól láthatónak, egyértelműnek és azonnal cselekvésre ösztönzőnek kell lenniük. Nincs vízszintes görgetés (horizontal scroll).

## 3. Tartalom és Kommunikáció (Copywriting)
- **Nyelvezet:** Kizárólag magyar nyelvű, érthető, KKV-k (kis- és középvállalkozások) számára releváns, üzleti, de közvetlen hangvétel. "Lorem Ipsum" használata szigorúan tilos. A megadott brief pontos szövegeit (vagy nagyon szoros variációit) kell alkalmazni.
- **Fókusz:** A probléma-megoldás és az eredmények kommunikációja (nem csak tech zsargon, hanem üzleti érték: pl. időmegtakarítás, több érdeklődő).

## 4. Minőségbiztosítás
- **Tesztelés:** Playwright e2e tesztek írása kötelező az asztali és mobil viewportokra (megjelenés, görgetés, CTA kattintás ellenőrzése).
- **Meglévő Funkciók:** A módosítások és az új oldal hozzáadása nem törheti meg a weboldal meglévő funkcióit és útvonalait.