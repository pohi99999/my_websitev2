import * as THREE from 'three';
// 1. GLTFLoader importálása a megfelelő útvonalról
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Alap Three.js Jelenet Beállítása ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10); // Kamera pozíciójának beállítása

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fények
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- GLTF Betöltő Függvény ---

/**
 * Aszinkron módon betölt egy GLTF modellt és hozzáadja a jelenethez.
 * @param {string} modelPath - A 3D modell útvonala.
 * @param {THREE.Scene} scene - A Three.js jelenet, ahová a modellt hozzáadjuk.
 */
async function loadGLTFModel(modelPath, scene) {
  // 2. GLTFLoader példányosítása
  const loader = new GLTFLoader();

  console.log("Modell betöltésének megkezdése...");

  // 7. Hiba- és betöltéskezelés try-catch és await segítségével
  try {
    // 6. Betöltési folyamat (progress) callback implementálása
    const onProgress = (xhr) => {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(`Betöltés: ${Math.round(percentComplete, 2)}%`);
    };

    // A modell aszinkron betöltése az `await` kulcsszóval
    const gltf = await loader.loadAsync(modelPath, onProgress);

    console.log("Modell sikeresen betöltve!");

    // A betöltött modell a gltf.scene alatt érhető el
    const model = gltf.scene;

    // 5. A modell kezdeti értékeinek beállítása
    model.scale.set(1.5, 1.5, 1.5);       // Méret
    model.position.set(0, 0, 0);         // Pozíció
    model.rotation.y = Math.PI * 0.25;   // Forgatás a Y tengely körül

    // 4. A modell hozzáadása a jelenethez
    scene.add(model);

  } catch (error) {
    console.error("Hiba történt a modell betöltése közben:", error);
  }
}

// A függvény meghívása a modell útvonalával és a jelenettel
// FONTOS: A `/models/model.gltf` útvonalnak léteznie kell a `public` mappában,
// hogy a böngésző elérje.
loadGLTFModel('/models/model.gltf', scene);


// --- Általános Működéshez Szükséges Kód ---

// Animációs ciklus
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Ablak átméretezésének kezelése
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// A kód használatához szükséges egy egyszerű HTML struktúra és a modell fájl.
// Például:
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GLTF Loader Példa</title>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <!-- A Three.js import map-et használ a modulok feloldásához -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.165.0/build/three.module.js",
        "three/examples/jsm/": "https://unpkg.com/three@0.165.0/examples/jsm/"
      }
    }
  </script>
  <script type="module" src="gltfLoader.js"></script>
</body>
</html>

// A `/models/model.gltf` fájlt a `public/models/` mappába kell helyezni a Next.js projektben.
*/
