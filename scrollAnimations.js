// 1. GSAP és a ScrollTrigger plugin importálása
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 2. A ScrollTrigger plugin regisztrálása
gsap.registerPlugin(ScrollTrigger);

// 3. ScrollTrigger instance létrehozása a megadott beállításokkal
// Ez a kód feltételezi, hogy az oldalon létezik egy elem a ".scroll-section" class-szal.
// Az animációt ehhez az elemhez fogja kötni.

// Létrehozhatunk egy inicializáló függvényt, amit máshol meghívhatunk
export function initScrollAnimations() {
  gsap.to(".scroll-section", { // Példa animáció, pl. a szekció elhalványítása
    opacity: 0.2,
    scrollTrigger: {
      trigger: ".scroll-section", // Az elem, ami aktiválja az animációt
      start: "top top",          // Az animáció akkor indul, amikor a trigger teteje eléri a viewport tetejét
      end: "+=500vh",            // Az animáció 500 viewport magasságnyi görgetés után ér véget
      scrub: 1,                  // Simítja az animációt a görgetéshez (1 másodperces késleltetéssel)
      pin: true,                 // "Odaragasztja" a trigger elemet a görgetés idejére
      markers: true,             // Vizuális jelzők a hibakereséshez (éles környezetben kapcsold ki)
    },
  });

  // Itt további ScrollTrigger-alapú animációkat is definiálhatsz
  // Például:
  // gsap.to(".another-element", { ... });
}
