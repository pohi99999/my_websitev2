# Weboldal V5 - WebGL Particle Effect Implementáció
## Gemini CLI Utasítások és Technikai Ajánlások

### PROJEKT: Website Particle Effect - Three.js + GLSL Shaders
**Cél:** A wXXuGpOaSeE YouTube videóban látható futurisztikus particle hatás implementálása
**Eszközök:** Three.js, GLSL Shaders, TypeScript, Vite, dat.GUI, GSAP
**Prioritás:** Website V5 finalizálása az éles kiadáshoz

---

## 1. VERTEX SHADER - Részecskék Pozicionálása

```glsl
uniform float uTime;
uniform float uSize;
uniform float uProgress;
varying float vDistance;

void main() {
  vec3 pos = position;
  
  // Időalapú mozgás
  pos.x += sin(uTime * 0.5 + pos.y * 0.1) * 0.5;
  pos.y += cos(uTime * 0.3 + pos.x * 0.1) * 0.5;
  pos.z += sin(uTime * 0.7 + pos.z * 0.1) * 0.3;
  
  // Progress kontroll
  pos *= mix(0.5, 1.0, uProgress);
  
  vDistance = distance(pos, vec3(0.0));
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * (1.0 / length(pos));
}
```

## 2. FRAGMENT SHADER - Részecskék Megjelenítése

```glsl
varying float vDistance;
uniform float uAlpha;

void main() {
  // Pont alakú szín gradiens
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  
  if(dist > 0.5) discard;
  
  // Sugárzó hatás
  float alpha = (1.0 - dist) * (1.0 - dist) * uAlpha;
  
  // Szín: Távolság alapú gradiens
  vec3 color = mix(
    vec3(0.2, 0.8, 1.0),  // Cián közel
    vec3(1.0, 0.2, 0.8),  // Magenta távol
    vDistance / 100.0
  );
  
  gl_FragColor = vec4(color, alpha);
}
```

## 3. TypeScript Implementáció (Vite projekt)

### 3.1 ParticleScene osztály

```typescript
import * as THREE from 'three';
import GUI from 'dat.gui';
import gsap from 'gsap';

export class ParticleScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles: THREE.Points | null = null;
  private uniforms = {
    uTime: { value: 0 },
    uSize: { value: 2.0 },
    uProgress: { value: 0 },
    uAlpha: { value: 1.0 }
  };

  constructor(canvas: HTMLCanvasElement) {
    // Scene beállítás
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 100;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    this.initParticles();
    this.setupGUI();
    this.setupAnimation();
    this.animate();
    
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private initParticles() {
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Shader Material (szükséges: vertexShader és fragmentShader import)
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private setupGUI() {
    const gui = new GUI();
    gui.add(this.uniforms.uSize, 'value', 0.1, 10.0).name('Particle Size');
    gui.add(this.uniforms.uAlpha, 'value', 0.0, 1.0).name('Opacity');
  }

  private setupAnimation() {
    gsap.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: 'power2.inOut'
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    
    this.uniforms.uTime.value += 0.01;
    
    if(this.particles) {
      this.particles.rotation.x += 0.0002;
      this.particles.rotation.y += 0.0003;
    }
    
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private getVertexShader(): string {
    return `
      uniform float uTime;
      uniform float uSize;
      uniform float uProgress;
      varying float vDistance;

      void main() {
        vec3 pos = position;
        
        pos.x += sin(uTime * 0.5 + pos.y * 0.1) * 0.5;
        pos.y += cos(uTime * 0.3 + pos.x * 0.1) * 0.5;
        pos.z += sin(uTime * 0.7 + pos.z * 0.1) * 0.3;
        
        pos *= mix(0.5, 1.0, uProgress);
        
        vDistance = distance(pos, vec3(0.0));
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uSize * (1.0 / length(pos));
      }
    `;
  }

  private getFragmentShader(): string {
    return `
      varying float vDistance;
      uniform float uAlpha;

      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        
        if(dist > 0.5) discard;
        
        float alpha = (1.0 - dist) * (1.0 - dist) * uAlpha;
        
        vec3 color = mix(
          vec3(0.2, 0.8, 1.0),
          vec3(1.0, 0.2, 0.8),
          vDistance / 100.0
        );
        
        gl_FragColor = vec4(color, alpha);
      }
    `;
  }
}
```

---

## 4. GEMINI CLI PARANCSOK - Lépésről Lépésre

### Lépés 1: Shader kód generálása
```
gemini --model gemini-2.5-flash
"Írj GLSL vertex és fragment shader kódot egy animált particle rendszerhez,
amely időalapú mozgást és távolság-alapú színátmeneteket használ. 
Az utasítások már adottak, csak optimalizáld és javítsd ki az értékeket."
```

### Lépés 2: TypeScript komponens létrehozása
```
gemini "Módosítsd a TypeScript kódot, hogy a particle-ek 
rádiuszvonala körül mozognak az oldal betöltése után, 
és adjál hozzá egér-követés funkcionalitást."
```

### Lépés 3: HTML integráció
```
gemini "Generálj egy HTML canvast a Three.js scene-nek, 
és helyezd el úgy, hogy fullscreen legyen. 
Adj hozzá responsive behavior-t."
```

### Lépés 4: Performancia optimalizálás
```
gemini "Optimalizáld a shader kódot a jobb performanciához:
- LOD (Level of Detail) rendszer
- Frustum culling
- Texture cache"
```

---

## 5. VITE CONFIG MÓDOSÍTÁSOK

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', 'dat.gui', 'gsap']
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap']
        }
      }
    }
  }
})
```

---

## 6. PACKAGE.JSON FÜGGŐSÉGEK

```json
{
  "dependencies": {
    "three": "^r128",
    "dat.gui": "^0.7.9",
    "gsap": "^3.12.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@types/three": "^r128"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 7. NETLIFY DEPLOYMENT

```toml
# netlify.toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "max-age=3600"
```

---

## 8. DOCKER / TÁRHELY PROBLÉMA MEGOLDÁS

### Azonnali megoldás:
```bash
# Docker rendszer takarítás
docker system prune --all --volumes -f

# Naplófájlok törlése
docker system prune --volumes
```

### Tartós megoldás (Windows + WSL2):
```bash
# Docker Desktop Settings megnyitása
# Resources → Advanced → szerkesztés

# WSL2 virtual disk áthelyezése D: meghajtóra
wsl --export Ubuntu-22.04 D:\wsl\Ubuntu-22.04.tar
wsl --unregister Ubuntu-22.04
wsl --import Ubuntu-22.04 D:\wsl D:\wsl\Ubuntu-22.04.tar
```

---

## 9. RENDSZERGAZDAI ELLENŐRZŐLISTA

- [ ] Docker takarítás elvégzése
- [ ] Three.js + Shader implementáció elkészítve
- [ ] Gemini CLI tesztelve és az összes prompt végrehajtva
- [ ] Performancia teszt (60 FPS @ 1080p)
- [ ] Responsive design tesztelve (mobil + desktop)
- [ ] Netlify deployment beállítva
- [ ] EIC pályázat dokumentáció frissítve

---

## 10. HASZNOS LINKEK ÉS REFERENCIÁK

- Three.js Dokumentáció: https://threejs.org/docs/
- GLSL Shader Tutorial: https://learnopengl.com/
- Gemini CLI Guide: https://geminicli.com/
- WebGL Performance: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
