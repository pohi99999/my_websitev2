// The /labor 3D scene (card 0c1060b6): four procedural modules, one per service line, wired to a
// central AI core. Plain three.js, no model files: every shape is built here from primitives and a
// few small shaders, so the page downloads no geometry. The page drives it with setProgress(t),
// t = 0 (overview) … 5 (outro); the camera eases between fixed viewpoints, it never takes over the
// scroll. Loaded only by LaborScene, only on capable desktops, after the page's load event.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  EdgesGeometry,
  FogExp2,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  BoxGeometry,
  ACESFilmicToneMapping,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const CYAN = new Color('#00e5ff');
const DEEP = new Color('#0b3d4c');

export type LaborScene = {
  setProgress: (t: number) => void;
  setPointer: (x: number, y: number) => void;
  resize: (width: number, height: number) => void;
  /** Renders one frame; the caller owns the loop (so it can pause it). Returns the frame time in ms. */
  frame: (now: number) => number;
  dispose: () => void;
};

// ---------------------------------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------------------------------

/** Glass: nearly transparent in the middle, bright at grazing angles (fresnel). */
function glassMaterial(opacity = 1) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: CYAN.clone() }, uOpacity: { value: opacity } },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uOpacity; varying vec3 vN; varying vec3 vV;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
        gl_FragColor = vec4(uColor * (0.35 + 1.4 * f), (0.035 + 0.55 * f) * uOpacity);
      }`,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
  });
}

/** Light pulses running along a tube (uv.x is the length). */
function pulseMaterial(speed: number, density: number) {
  return new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: CYAN.clone() }, uSpeed: { value: speed }, uDensity: { value: density } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uColor; uniform float uSpeed; uniform float uDensity; varying vec2 vUv;
      void main() {
        float p = fract(vUv.x * uDensity - uTime * uSpeed);
        float pulse = smoothstep(0.0, 0.06, p) * (1.0 - smoothstep(0.06, 0.22, p));
        float base = 0.10;
        gl_FragColor = vec4(uColor * (base + 2.2 * pulse), base + pulse);
      }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

const edgeMaterial = (opacity: number) => new LineBasicMaterial({ color: CYAN, transparent: true, opacity, blending: AdditiveBlending, depthWrite: false });

function outline(geometry: BufferGeometry, opacity = 0.9, threshold = 20) {
  return new LineSegments(new EdgesGeometry(geometry, threshold), edgeMaterial(opacity));
}

/** Rectangles as one LineSegments: [x, y, w, h] in the panel's local units, z fixed. */
function rects(list: [number, number, number, number][], z: number, opacity: number) {
  const pts: number[] = [];
  for (const [x, y, w, h] of list) {
    const a = [x, y], b = [x + w, y], c = [x + w, y - h], d = [x, y - h];
    for (const [p, q] of [[a, b], [b, c], [c, d], [d, a]]) pts.push(p[0], p[1], z, q[0], q[1], z);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
  return new LineSegments(g, edgeMaterial(opacity));
}

// ---------------------------------------------------------------------------------------------------
// The four modules
// ---------------------------------------------------------------------------------------------------

/** 01 Website: three floating glass pages, the front one with a page layout drawn on it. */
function websiteModule() {
  const g = new Group();
  const layout: [number, number, number, number][] = [
    [-1.05, 0.68, 2.1, 0.16], // nav
    [-1.05, 0.42, 1.25, 0.5], // hero copy
    [0.32, 0.42, 0.73, 0.5], // hero image
    [-1.05, -0.2, 0.62, 0.42], [-0.31, -0.2, 0.62, 0.42], [0.43, -0.2, 0.62, 0.42], // cards
    [-1.05, -0.72, 0.5, 0.08], // button
  ];
  for (let i = 0; i < 3; i++) {
    const panel = new Group();
    const geo = new PlaneGeometry(2.3, 1.6);
    const glass = new Mesh(geo, glassMaterial(i === 0 ? 1 : 0.55));
    panel.add(glass, outline(geo, i === 0 ? 0.95 : 0.35));
    if (i === 0) panel.add(rects(layout, 0.002, 0.75));
    panel.position.set(i * 0.18, i * 0.12, -i * 0.42);
    panel.rotation.y = 0.05 * i;
    g.add(panel);
  }
  return g;
}

/** The edges of every instance of an InstancedMesh, merged into one LineSegments (cheap: one draw call). */
function outlineInstances(geometry: BufferGeometry, count: number, inst: InstancedMesh) {
  const edges = new EdgesGeometry(geometry, 20).attributes.position.array as Float32Array;
  const out = new Float32Array(edges.length * count);
  const m = new Object3D().matrix;
  const v = new Vector3();
  for (let i = 0; i < count; i++) {
    inst.getMatrixAt(i, m);
    for (let j = 0; j < edges.length; j += 3) {
      v.set(edges[j], edges[j + 1], edges[j + 2]).applyMatrix4(m);
      out.set([v.x, v.y, v.z], i * edges.length + j);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(out, 3));
  const lines = new LineSegments(g, edgeMaterial(0.5));
  // the merged lines are already in the gear's space: undo the parent instancing transform (identity)
  return lines;
}

/** 02 Automation: two meshing gears and a pipe with pulses running through them. */
function gear(radius: number, teeth: number, metal: MeshStandardMaterial) {
  const g = new Group();
  const ringGeo = new TorusGeometry(radius, radius * 0.07, 10, 72);
  g.add(new Mesh(ringGeo, metal), outline(ringGeo, 0.55, 40));
  const toothGeo = new BoxGeometry(radius * 0.16, radius * 0.2, radius * 0.12);
  const inst = new InstancedMesh(toothGeo, metal, teeth);
  const o = new Object3D();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    o.position.set(Math.cos(a) * radius * 1.1, Math.sin(a) * radius * 1.1, 0);
    o.rotation.z = a;
    o.updateMatrix();
    inst.setMatrixAt(i, o.matrix);
  }
  g.add(inst);
  const hubGeo = new TorusGeometry(radius * 0.28, radius * 0.05, 8, 36);
  g.add(new Mesh(hubGeo, metal), outline(hubGeo, 0.8, 40));
  // spokes
  const spokes: number[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    spokes.push(Math.cos(a) * radius * 0.28, Math.sin(a) * radius * 0.28, 0, Math.cos(a) * radius * 0.95, Math.sin(a) * radius * 0.95, 0);
  }
  const sg = new BufferGeometry();
  sg.setAttribute('position', new BufferAttribute(new Float32Array(spokes), 3));
  g.add(new LineSegments(sg, edgeMaterial(0.75)));
  inst.add(outlineInstances(toothGeo, teeth, inst));
  return g;
}

function automationModule(metal: MeshStandardMaterial, pulses: ShaderMaterial[]) {
  const g = new Group();
  const big = gear(0.85, 22, metal);
  const small = gear(0.5, 13, metal);
  small.position.set(1.32, 0.62, 0.05);
  big.userData.spin = 0.25;
  small.userData.spin = -0.25 * (22 / 13);
  g.add(big, small);
  const curve = new CatmullRomCurve3([
    new Vector3(-2.0, -0.9, 0.3), new Vector3(-1.1, -1.1, 0.35), new Vector3(0, -1.15, 0.4),
    new Vector3(1.0, -0.6, 0.35), new Vector3(1.9, 0.1, 0.3), new Vector3(2.3, 1.2, 0.2),
  ]);
  const mat = pulseMaterial(0.35, 3);
  pulses.push(mat);
  g.add(new Mesh(new TubeGeometry(curve, 120, 0.035, 8, false), mat));
  g.userData.gears = [big, small];
  return g;
}

/** 03 Apps: a phone with its interface layers lifted off the screen, a laptop frame behind. */
function appModule() {
  const g = new Group();
  const phoneGeo = new RoundedBoxGeometry(0.95, 1.9, 0.08, 4, 0.12);
  const phone = new Group();
  phone.add(new Mesh(phoneGeo, glassMaterial(0.8)), outline(phoneGeo, 0.9, 30));
  const layers: [number, number, number, number][][] = [
    [[-0.38, 0.8, 0.76, 0.12], [-0.38, 0.6, 0.76, 0.5]],
    [[-0.38, 0.0, 0.36, 0.36], [0.02, 0.0, 0.36, 0.36], [-0.38, -0.42, 0.76, 0.12]],
    [[-0.38, -0.66, 0.76, 0.14]],
  ];
  layers.forEach((l, i) => {
    const r = rects(l, 0.12 + i * 0.16, 0.85 - i * 0.15);
    phone.add(r);
  });
  phone.position.set(0.55, 0, 0.3);
  phone.rotation.y = -0.35;
  const laptop = new Group();
  const screenGeo = new PlaneGeometry(2.2, 1.35);
  const screen = new Group();
  screen.add(new Mesh(screenGeo, glassMaterial(0.45)), outline(screenGeo, 0.45));
  screen.add(rects([[-0.98, 0.56, 1.96, 0.1], [-0.98, 0.36, 0.55, 0.9], [-0.33, 0.36, 1.31, 0.42], [-0.33, -0.16, 1.31, 0.38]], 0.002, 0.4));
  screen.position.set(0, 0.68, 0);
  screen.rotation.x = -0.12;
  const baseGeo = new BoxGeometry(2.3, 0.05, 1.4);
  const base = outline(baseGeo, 0.4);
  base.position.set(0, 0, 0.62);
  laptop.add(screen, base);
  laptop.position.set(-0.5, -0.55, -0.7);
  laptop.rotation.y = 0.3;
  g.add(laptop, phone);
  return g;
}

/** 04 AI team: a core of points (a Fibonacci sphere), a wire icosahedron inside, agents orbiting. */
function coreModule() {
  const g = new Group();
  const n = 2200;
  const pos = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const rad = 1.15 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.06;
    pos.set([Math.cos(th) * r * rad, y * rad, Math.sin(th) * r * rad], i * 3);
    seed[i] = Math.abs(Math.sin(i * 78.233) * 9631.17) % 1;
  }
  const pg = new BufferGeometry();
  pg.setAttribute('position', new BufferAttribute(pos, 3));
  pg.setAttribute('aSeed', new BufferAttribute(seed, 1));
  const pm = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: CYAN.clone() }, uPixel: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uPixel; attribute float aSeed; varying float vA;
      void main() {
        vec3 p = position * (1.0 + 0.025 * sin(uTime * 1.4 + aSeed * 30.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vA = 0.35 + 0.65 * smoothstep(0.55, 1.0, sin(uTime * 2.0 + aSeed * 40.0) * 0.5 + 0.5);
        gl_PointSize = (2.2 + 2.0 * aSeed) * uPixel * (6.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; varying float vA;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(uColor * 1.6, a * vA);
      }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(pg, pm);
  g.add(points);
  const ico = outline(new IcosahedronGeometry(0.62, 1), 0.7, 1);
  g.add(ico);
  const inner = new Mesh(new IcosahedronGeometry(0.34, 2), glassMaterial(1.2));
  g.add(inner);
  // agents on tilted orbits
  const agents: Group[] = [];
  for (let i = 0; i < 4; i++) {
    const orbit = new Group();
    orbit.rotation.set(0.5 + i * 0.35, i * 0.9, 0.2 * i);
    const ringGeo = new TorusGeometry(1.75 + i * 0.12, 0.004, 4, 160);
    orbit.add(new Mesh(ringGeo, new ShaderMaterial({
      uniforms: { uColor: { value: CYAN.clone() } },
      vertexShader: 'void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; void main(){ gl_FragColor = vec4(uColor, 0.28); }',
      transparent: true, depthWrite: false, blending: AdditiveBlending,
    })));
    const agent = new Mesh(new SphereGeometry(0.045, 16, 16), new MeshStandardMaterial({ color: '#001418', emissive: CYAN, emissiveIntensity: 1.3 }));
    agent.position.x = 1.75 + i * 0.12;
    const pivot = new Group();
    pivot.add(agent);
    pivot.userData.speed = 0.35 + i * 0.12;
    pivot.rotation.z = i * 1.4;
    orbit.add(pivot);
    agents.push(pivot);
    g.add(orbit);
  }
  g.userData = { points: pm, ico, agents };
  return g;
}

// ---------------------------------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------------------------------

function floorGrid() {
  const m = new ShaderMaterial({
    uniforms: { uColor: { value: CYAN.clone() } },
    vertexShader: /* glsl */ `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; varying vec3 vW;
      void main() {
        vec2 c = vW.xz / 1.6;
        vec2 grid = abs(fract(c - 0.5) - 0.5) / fwidth(c);
        float line = 1.0 - min(min(grid.x, grid.y), 1.0);
        float fade = 1.0 - smoothstep(2.0, 11.0, length(vW.xz));
        gl_FragColor = vec4(uColor, line * fade * 0.06);
      }`,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new Mesh(new PlaneGeometry(60, 60, 1, 1), m);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -2.8;
  return mesh;
}

function dust() {
  const n = 700;
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) p.set([(Math.random() - 0.5) * 30, (Math.random() - 0.3) * 12, (Math.random() - 0.5) * 30], i * 3);
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(p, 3));
  const m = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixel: { value: 1 } },
    vertexShader: /* glsl */ `uniform float uTime; uniform float uPixel; void main(){ vec3 q = position; q.y += sin(uTime*0.2 + position.x)*0.15; vec4 mv = modelViewMatrix*vec4(q,1.0); gl_PointSize = 1.6*uPixel*(8.0/-mv.z); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: /* glsl */ `void main(){ float d = length(gl_PointCoord-0.5); gl_FragColor = vec4(0.55,0.9,1.0, smoothstep(0.5,0.0,d)*0.35); }`,
    transparent: true, depthWrite: false, blending: AdditiveBlending,
  });
  return new Points(g, m);
}

// ---------------------------------------------------------------------------------------------------
// Assembly and camera path
// ---------------------------------------------------------------------------------------------------

/** Where the modules sit around the core (index 0-2), the core is at the origin. */
const MODULE_POS = [new Vector3(-2.9, 0.5, 1.3), new Vector3(2.3, -0.5, 1.4), new Vector3(0.5, 1.7, -3.0)];

/** Camera viewpoints for t = 0 … 5: overview, the three modules, the core, the outro. */
const VIEWS: { pos: Vector3; look: Vector3 }[] = [
  { pos: new Vector3(1.6, 2.4, 15.0), look: new Vector3(-3.6, 0.4, -0.2) },
  { pos: new Vector3(0.6, 1.1, 5.6), look: new Vector3(-2.2, 0.5, 1.2) },
  { pos: new Vector3(5.2, 0.8, 5.9), look: new Vector3(1.4, -0.4, 1.2) },
  { pos: new Vector3(3.6, 2.2, 0.4), look: new Vector3(0.2, 1.6, -3.0) },
  { pos: new Vector3(-1.2, 0.9, 4.6), look: new Vector3(-1.5, 0.15, 0) },
  { pos: new Vector3(0, 4.6, 12.5), look: new Vector3(0, 1.4, 0) },
];

/**
 * Portrait screens (phones, the poster): the text sits in the lower part of the screen, so every view
 * looks a little below its subject, which puts the subject in the upper half; the overview is centred.
 */
const PORTRAIT_VIEWS: { pos: Vector3; look: Vector3 }[] = [
  { pos: new Vector3(0.6, 3.0, 19.5), look: new Vector3(0.1, -3.1, 0) },
  { pos: new Vector3(-1.4, 1.2, 8.4), look: new Vector3(-2.7, -1.0, 1.3) },
  { pos: new Vector3(3.9, 0.6, 8.2), look: new Vector3(2.5, -2.0, 1.4) },
  { pos: new Vector3(2.0, 2.8, 4.6), look: new Vector3(0.4, 0.3, -3.0) },
  { pos: new Vector3(-0.8, 0.9, 6.6), look: new Vector3(0, -1.5, 0) },
  { pos: new Vector3(0, 5.6, 20.5), look: new Vector3(0, -2.4, 0) },
];

const ease = (x: number) => x * x * (3 - 2 * x);

export function createLaborScene(canvas: HTMLCanvasElement, opts: { pixelRatio: number }): LaborScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(opts.pixelRatio);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor('#000000', 1);

  const scene = new Scene();
  scene.fog = new FogExp2('#010306', 0.045);
  const camera = new PerspectiveCamera(38, 1, 0.1, 120);

  scene.add(new HemisphereLight('#7fefff', '#000000', 0.35));
  const key = new PointLight(CYAN, 30, 18, 2);
  key.position.set(0, 2.5, 2.5);
  scene.add(key);
  const rim = new PointLight('#3b6cff', 18, 20, 2);
  rim.position.set(-5, 3, -6);
  scene.add(rim);

  const metal = new MeshStandardMaterial({ color: '#0a1418', metalness: 0.85, roughness: 0.3, emissive: DEEP, emissiveIntensity: 0.9 });
  const pulses: ShaderMaterial[] = [];

  const web = websiteModule();
  const auto = automationModule(metal, pulses);
  const app = appModule();
  const core = coreModule();
  [web, auto, app].forEach((m, i) => {
    m.position.copy(MODULE_POS[i]);
    m.lookAt(new Vector3(0, m.position.y, 0).add(new Vector3(0, 0, 6)));
    scene.add(m);
  });
  web.rotation.y = 0.55;
  auto.rotation.y = -0.6;
  app.rotation.y = 0.15;
  scene.add(core);

  // connectors: each module to the core, pulses flowing inward
  for (const p of MODULE_POS) {
    const mid = p.clone().multiplyScalar(0.5).add(new Vector3(0, 1.1, 0));
    const curve = new CatmullRomCurve3([p.clone().multiplyScalar(0.82), mid, new Vector3(0, 0.1, 0).add(p.clone().normalize().multiplyScalar(1.3))]);
    const mat = pulseMaterial(0.55, 2.5);
    pulses.push(mat);
    scene.add(new Mesh(new TubeGeometry(curve, 80, 0.018, 6, false), mat));
  }
  scene.add(floorGrid());
  const dustPts = dust();
  scene.add(dustPts);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new Vector2(1, 1), 0.7, 0.5, 0.14);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  let progress = 0;
  let shown = 0; // the eased progress the camera actually follows
  const pointer = new Vector2(0, 0);
  const smoothPointer = new Vector2(0, 0);
  const camPos = new Vector3();
  const camLook = new Vector3();
  const tmpA = new Vector3();
  const tmpB = new Vector3();
  let last = 0;

  const coreData = core.userData as { points: ShaderMaterial; ico: LineSegments; agents: Group[] };
  const gears = auto.userData.gears as Group[];

  function placeCamera(t: number) {
    const views = camera.aspect < 1 ? PORTRAIT_VIEWS : VIEWS;
    const i = Math.min(Math.floor(t), views.length - 2);
    const f = ease(Math.min(Math.max(t - i, 0), 1));
    camPos.lerpVectors(views[i].pos, views[i + 1].pos, f);
    camLook.lerpVectors(views[i].look, views[i + 1].look, f);
    tmpA.set(smoothPointer.x * 0.35, smoothPointer.y * 0.2, 0);
    camera.position.copy(camPos).add(tmpA);
    tmpB.copy(camLook);
    camera.lookAt(tmpB);
  }

  return {
    setProgress(t) {
      progress = Math.min(Math.max(t, 0), VIEWS.length - 1);
    },
    setPointer(x, y) {
      pointer.set(x, y);
    },
    resize(width, height) {
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      bloom.resolution.set(width, height);
      camera.aspect = width / height;
      // keep the composition on narrow (tall) screens: widen the field of view
      camera.fov = camera.aspect < 1 ? 52 : 38;
      camera.updateProjectionMatrix();
      const px = renderer.getPixelRatio();
      coreData.points.uniforms.uPixel.value = px;
      (dustPts.material as ShaderMaterial).uniforms.uPixel.value = px;
    },
    frame(now) {
      const t0 = performance.now();
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      const time = now / 1000;
      shown += (progress - shown) * Math.min(1, dt * 4);
      smoothPointer.lerp(pointer, Math.min(1, dt * 3));
      placeCamera(shown);
      for (const m of pulses) m.uniforms.uTime.value = time;
      coreData.points.uniforms.uTime.value = time;
      (dustPts.material as ShaderMaterial).uniforms.uTime.value = time;
      coreData.ico.rotation.y = time * 0.18;
      coreData.ico.rotation.x = time * 0.07;
      for (const a of coreData.agents) a.rotation.z += dt * a.userData.speed;
      for (const gr of gears) gr.rotation.z += dt * gr.userData.spin;
      web.position.y = MODULE_POS[0].y + Math.sin(time * 0.6) * 0.06;
      app.position.y = MODULE_POS[2].y + Math.sin(time * 0.5 + 1) * 0.06;
      composer.render();
      return performance.now() - t0;
    },
    dispose() {
      scene.traverse((o) => {
        const m = o as Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as { dispose?: () => void } | { dispose?: () => void }[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose?.());
        else mat?.dispose?.();
      });
      composer.dispose();
      renderer.dispose();
    },
  };
}
