import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- GSAP ScrollTrigger Plugin Regisztrálása ---
gsap.registerPlugin(ScrollTrigger);

// --- Three.js Jelenet Beállítása ---

// 1. Alapvető beállítások
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  canvas: document.querySelector('#three-canvas'), // HTML-ben lévő canvas elem kiválasztása
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 2. Világítás
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 3. Kocka létrehozása
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff9d });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// --- GSAP és Three.js Összekötése ---

/**
 * Ez a függvény összeköti a Three.js objektumokat a GSAP ScrollTrigger-rel.
 * @param {THREE.Mesh} cube - Az animálandó kocka objektum.
 * @param {THREE.PerspectiveCamera} camera - Az animálandó kamera objektum.
 */
function animate3DOnScroll(cube, camera) {
  // 4. GSAP Timeline létrehozása
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
  });

  // A kamera alapértelmezetten a jelenet közepére néz.
  // Ha a GSAP-pal animáljuk a rotációt, ezt a beállítást nem szabad
  // az animációs cikluson (animate loop) belül minden képkockánál újra meghívni,
  // mert felülírná a GSAP animációt.
  camera.lookAt(scene.position);

  // 5. Animációk hozzáadása a timeline-hoz

  // -- Kocka animációk --
  tl.to(cube.rotation, { y: 2 * Math.PI, ease: "none" }, 0)
    .to(cube.position, { y: 4, ease: "power1.inOut" }, 0)
    .to(cube.scale, { x: 2, y: 2, z: 2, ease: "power1.inOut" }, 0);

  // -- Kamera animációk --
  // A kamera Z pozíciójának (mélység) animálása 5-től 10-ig.
  tl.to(camera.position, {
    z: 10,
    ease: "power2.inOut",
  }, 0);

  // A kamera X rotációjának animálása 0-tól 0.5-ig (lefelé billenés).
  tl.to(camera.rotation, {
    x: 0.5,
    ease: "power2.inOut",
  }, 0);
}

// A függvény meghívása a létrehozott kockával és kamerával
animate3DOnScroll(cube, camera);


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

// A kód használatához szükséges egy egyszerű HTML struktúra is.
// Például:
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Three.js + GSAP ScrollTrigger</title>
  <style>
    body { margin: 0; background-color: #111; color: white; }
    canvas { position: fixed; top: 0; left: 0; z-index: -1; }
    .section { height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 3rem; font-family: sans-serif; }
    .scroll-section { height: 200vh; /* Extra magasság a görgetéshez */ }
  </style>
</head>
<body>
  <canvas id="three-canvas"></canvas>
  <div class="section">Görgess lefelé!</div>
  <div class="scroll-section"></div>
  <div class="section">Animáció vége</div>
  <script type="module" src="mainWithScroll.js"></script>
</body>
</html>
*/
