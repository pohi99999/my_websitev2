# Three.js & GSAP Animációs Projekt

Ez a projekt egy modern webes animációs demó, amely a Three.js és a GSAP erejét használja ki lenyűgöző 3D és görgetés-vezérelt effektek létrehozására. Célja, hogy bemutassa a fejlett webes animációs technikákat, optimalizálási stratégiákat és a reszponzív design megközelítéseket.

## Főbb Jellemzők

*   **Interaktív 3D Jelenetek:** Three.js alapú, valós idejű 3D renderelés.
*   **Görgetés-vezérelt Animációk:** GSAP ScrollTrigger segítségével szinkronizált animációk a görgetési pozícióval.
*   **Multi-Layer Parallax Effekt:** Mélységérzetet keltő, többrétegű görgetési animáció.
*   **Karakter-szintű Szöveg Animáció:** Lépcsőzetesen megjelenő szöveg görgetés hatására.
*   **Adaptív és Reszponzív Design:** Optimalizált teljesítmény különböző eszközökön és képernyőméreteken.
*   **Fejlesztői Eszközök:** Beépített debug funkciók a gyorsabb fejlesztés érdekében.

## Használt Technológiák

*   **Vite:** Gyors fejlesztői környezet és build eszköz.
*   **Three.js:** A webes 3D grafika szabványos JavaScript könyvtára.
*   **GSAP (GreenSock Animation Platform):** Professzionális animációs könyvtár, különösen a `ScrollTrigger` plugin.
*   **JavaScript (ES6+):** Modern JavaScript szintaxis és funkciók.
*   **HTML5 & CSS3:** A webes tartalom és stílus alapjai.
*   **Stats.js:** FPS és teljesítmény monitoring.
*   **dat.GUI:** Valós idejű paraméter-állítás.
*   **OrbitControls:** Kamera vezérlés fejlesztés alatt.

## Telepítési Lépések

A projekt futtatásához kövesd az alábbi lépéseket:

1.  **Klonozd a repository-t (ha Git-ben van):**
    ```bash
    git clone [repository-url]
    cd [projekt-mappa]
    ```
2.  **Telepítsd a függőségeket:**
    ```bash
    npm install
    ```
3.  **Indítsd el a fejlesztői szervert:**
    ```bash
    npm run dev
    ```
    Ekkor a projekt a `http://localhost:3000` címen lesz elérhető.
4.  **Buildeld a production verziót:**
    ```bash
    npm run build
    ```
    Ez létrehozza az optimalizált fájlokat a `dist` mappában.
5.  **Tekintsd meg a production build-et (opcionális):**
    ```bash
    npm run preview
    ```

## Projekt Struktúra

```
.
├── public/                 # Statikus assetek (pl. 3D modellek, textúrák)
│   └── models/
│       └── model.gltf      # Példa 3D modell
├── src/                    # Fő forráskód mappa (ha van)
│   └── main.js             # Fő Three.js jelenet és animációs logika
│   └── gltfLoader.js       # GLTF modell betöltő függvény
│   └── scrollAnimations.js # GSAP ScrollTrigger beállítások
│   └── adaptiveAnimation.js# Adaptív animációs logika
│   └── debugTools.js       # Debug eszközök integrációja
├── index.html              # A fő HTML fájl
├── vite.config.js          # Vite konfiguráció
├── netlify.toml            # Netlify deployment konfiguráció
├── package.json            # Függőségek és scriptek
├── README_ThreeJS_Project.md # Ez a dokumentáció
└── ...
```
*Megjegyzés: A fenti struktúra feltételezi, hogy a JavaScript fájlok a `src/` mappában vannak. Ha a gyökérkönyvtárban vannak, akkor az útvonalak ennek megfelelően módosulnak.*

## API Dokumentáció (Főbb Függvények)

### `animate3DOnScroll(cube, camera)`

Ez a függvény a `three.js` objektumokat (kocka, kamera) köti össze a `GSAP ScrollTrigger` görgetés-vezérelt animációival.

*   **Paraméterek:**
    *   `cube` (`THREE.Mesh`): Az animálandó 3D kocka objektum.
    *   `camera` (`THREE.PerspectiveCamera`): Az animálandó kamera objektum.
*   **Leírás:** Létrehoz egy GSAP timeline-t, amely a görgetési pozíció alapján animálja a kocka forgását, pozícióját és méretét, valamint a kamera pozícióját és rotációját.

```javascript
// Példa használat
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ... three.js setup ...

function animate3DOnScroll(cube, camera) {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
  });

  tl.to(cube.rotation, { y: 2 * Math.PI, ease: "none" }, 0)
    .to(cube.position, { y: 4, ease: "power1.inOut" }, 0)
    .to(cube.scale, { x: 2, y: 2, z: 2, ease: "power1.inOut" }, 0)
    .to(camera.position, { z: 10, ease: "power2.inOut" }, 0)
    .to(camera.rotation, { x: 0.5, ease: "power2.inOut" }, 0);
}

// Meghívás
animate3DOnScroll(myCube, myCamera);
```

### `loadGLTFModel(modelPath, scene)`

Aszinkron módon betölt egy GLTF 3D modellt egy megadott útvonalról, és hozzáadja a `three.js` jelenethez.

*   **Paraméterek:**
    *   `modelPath` (`string`): A GLTF modell fájl útvonala (pl. `/models/model.gltf`).
    *   `scene` (`THREE.Scene`): A `three.js` jelenet, ahová a modellt hozzáadjuk.
*   **Leírás:** Használja a `GLTFLoader`-t, kezeli a betöltési folyamatot és az esetleges hibákat. Beállítja a modell kezdeti méretét, pozícióját és rotációját.

```javascript
// Példa használat
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// ... three.js setup ...

async function loadGLTFModel(modelPath, scene) {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync(modelPath, (xhr) => {
      console.log(`Betöltés: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
    });
    const model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);
  } catch (error) {
    console.error("Hiba a modell betöltése közben:", error);
  }
}

// Meghívás
loadGLTFModel('/models/model.gltf', myScene);
```

### `initScrollAnimations()`

Inicializálja a GSAP ScrollTrigger animációkat a `scrollAnimations.js` fájlban definiált módon.

*   **Paraméterek:** Nincs.
*   **Leírás:** Regisztrálja a ScrollTrigger plugint és létrehoz egy ScrollTrigger instance-t egy `.scroll-section` elemhez.

```javascript
// Példa használat
import { initScrollAnimations } from './scrollAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
```

## Teljesítmény Optimalizálás

A projekt a következő optimalizálási technikákat alkalmazza (vagy javasolja):

*   **Frustum Culling:** A `three.js` alapértelmezett funkciója, amely csak a kamera látóterében lévő objektumokat rendereli.
*   **Level of Detail (LOD):** Különböző részletességű modellek használata a kamera távolságától függően.
*   **GPU Instancing:** Azonos geometriájú objektumok hatékony renderelése nagy számban (`InstancedMesh`).
*   **Textúra Optimalizálás:** KTX2 tömörítés és mipmapping a VRAM használat csökkentésére.
*   **Geometria Optimalizálás:** Poligonszám csökkentése modellező szoftverekben.
*   **`requestAnimationFrame` Debouncing:** Az animációs ciklus szüneteltetése, ha az oldal nem látható.
*   **Tree Shaking:** Csak a használt `three.js` modulok importálása a végső bundle méretének csökkentésére.

## Böngésző Kompatibilitás

A projekt modern webes technológiákat használ, ezért a legújabb böngészőverziók (Chrome, Firefox, Edge, Safari) támogatása javasolt. Szükséges a WebGL 2.0 támogatás.

## Hibaelhárítás

*   **Modell betöltési hiba:** Ellenőrizd a modell útvonalát (`/public/models/model.gltf`), és győződj meg róla, hogy a fájl létezik és elérhető. CORS problémák esetén konfiguráld a szervert.
*   **Animáció nem indul:** Ellenőrizd a `ScrollTrigger` `trigger` elemének létezését és a `start`/`end` beállításokat. Használd a `markers: true` opciót a hibakereséshez.
*   **Teljesítmény problémák:** Használd a `Stats.js` eszközt az FPS monitorozására. Fontold meg az animációk komplexitásának csökkentését, különösen mobil eszközökön.
*   **`three.js` modul import hiba:** Győződj meg róla, hogy a `type="module"` és az `importmap` helyesen van beállítva, vagy használd a Vite build folyamatát.

## Hozzájárulási Irányelvek

Szeretettel várjuk a hozzájárulásokat! Kérjük, kövesd az alábbi irányelveket:

1.  Forkold a repository-t.
2.  Hozz létre egy új branch-et a funkcióhoz (`git checkout -b feature/amazing-feature`).
3.  Végezd el a változtatásokat és commitold (`git commit -m 'Add amazing feature'`).
4.  Pushold a branch-et (`git push origin feature/amazing-feature`).
5.  Nyiss egy Pull Request-et.

## Licenc

Ez a projekt az MIT licenc alatt áll. Részletekért lásd a `LICENSE` fájlt.
