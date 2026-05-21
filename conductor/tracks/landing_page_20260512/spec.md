# Specification: Weboldal + AI KKV-knak landing oldal

## 1. Overview
Egy új landing oldal létrehozása a `/weboldal-ai-kkv` útvonalon a meglévő Next.js projektben. Az oldal célja a KKV-knak szóló "Weboldal + AI" szolgáltatás bemutatása és konverzió generálása.

## 2. Functional Requirements
- **Hero Section:** Főcím, alcím, bulletpontok, és két CTA gomb ("Ingyenes 15 perces konzultációt kérek", "Referenciák és csomagok megtekintése").
- **Kinek szól? Section:** Iparág-specifikus példák bemutatása (szolgáltatók, egészségügy, iroda, kereskedők).
- **Mit kapsz konkrétan? Section:** 3 fő értékblokk részletes szöveggel.
- **Csomagok Section:** 3 szint (Starter, Growth, System) részletezése és árazási elvek.
- **Folyamat Section:** 3 lépéses együttműködési folyamat bemutatása.
- **Referenciák Section:** 3 valós projektpélda bemutatása.
- **FAQ Section:** 4 gyakori kérdés-válasz blokk.
- **Záró CTA Section:** Felhívás konzultációra és e-mail ajánlatkérés link.
- **Navigáció:** Link hozzáadása a főmenühöz és a mobil menühöz.

## 3. Non-Functional Requirements
- **Responsiveness:** Teljes körű mobil és desktop támogatás.
- **Design Consistency:** Illeszkedés a meglévő design systemhez.
- **Quality:** Playwright tesztek az útvonal, a reszponzivitás és a CTA-k ellenőrzésére.

## 4. Acceptance Criteria
- [ ] Az oldal elérhető a `/weboldal-ai-kkv` útvonalon.
- [ ] Minden szekció tartalmazza a specifikált magyar nyelvű szövegeket.
- [ ] A design megegyezik a projekt stílusával.
- [ ] Az oldal reszponzív (nincs horizontal scroll, olvasható mobilon).
- [ ] A menüben megjelenik az új link.
- [ ] A Playwright tesztek sikeresen lefutnak.
- [ ] A változtatások pusholva vannak a GitHub main ágára.