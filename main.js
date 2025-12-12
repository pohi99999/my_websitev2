import * as THREE from 'three';

// 1. Scene, Camera és Renderer létrehozása
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // Látószög (FOV)
  window.innerWidth / window.innerHeight, // Képarány
  0.1, // Közeli vágósík
  1000 // Távoli vágósík
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 2. Világítás beállítása
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 3. Egyszerű kocka geometria létrehozása
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff9d });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 4. Reszponzív canvas méretezés
const handleResize = () => {
  // Kamera képarányának frissítése
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Renderer méretének frissítése
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener('resize', handleResize);

// 5. Animációs ciklus
const animate = () => {
  requestAnimationFrame(animate);

  // Animációs logika itt (pl. a kocka forgatása)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Jelenet renderelése a kamerával
  renderer.render(scene, camera);
};

// Az animáció elindítása
animate();
