'use client';

import { useEffect, useRef, useState } from 'react';
import type { LaborScene as Scene } from './scene/createLaborScene';
import styles from './labor.module.css';

// The /labor 3D layer (card 0c1060b6). The page is complete without it: this only adds a fixed,
// aria-hidden canvas behind the text. It loads after the page's load event, in an idle callback, and
// only where it can run smoothly; everywhere else (phones, tablets in portrait, weak devices, Save-Data,
// reduced motion, no WebGL2) the static poster stays. A frame-time guard falls back to the poster if the
// device cannot keep up. The scroll is never taken over: the scene follows the scroll position.

function capable(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4 || (nav.hardwareConcurrency ?? 8) < 4) return false;
  if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024) return false;
  try {
    if (!document.createElement('canvas').getContext('webgl2')) return false;
  } catch {
    return false;
  }
  return true;
}

/** Scroll progress 0 … 5 from the page's steps ([data-labor-step]): a step counts as reached when its middle passes the screen's middle. */
function readProgress(steps: HTMLElement[]): number {
  const mid = window.innerHeight / 2;
  let t = 0;
  for (let i = 1; i < steps.length; i++) {
    const prev = steps[i - 1].getBoundingClientRect();
    const cur = steps[i].getBoundingClientRect();
    const a = prev.top + prev.height / 2;
    const b = cur.top + cur.height / 2;
    if (mid >= b) t = i;
    else if (mid > a) t = i - 1 + (mid - a) / (b - a);
  }
  return t;
}

export default function LaborScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let scene: Scene | null = null;
    let raf = 0;
    let disposed = false;
    let visible = true;
    const slow: number[] = [];
    const cleanups: (() => void)[] = [];

    const start = async () => {
      if (disposed || !capable() || !canvasRef.current) return;
      const { createLaborScene } = await import('./scene/createLaborScene');
      if (disposed || !canvasRef.current) return;
      const canvas = canvasRef.current;
      scene = createLaborScene(canvas, { pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5) });
      const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-labor-step]'));
      const onResize = () => scene?.resize(window.innerWidth, window.innerHeight);
      const onPointer = (e: PointerEvent) => scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      const onVisibility = () => {
        visible = document.visibilityState === 'visible';
        if (visible && !raf) raf = requestAnimationFrame(loop);
      };
      onResize();
      window.addEventListener('resize', onResize);
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      cleanups.push(() => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVisibility);
      });

      const started = performance.now();
      let prev = 0;
      function loop(now: number) {
        raf = 0;
        if (!scene || disposed || !visible) return;
        scene.setProgress(readProgress(steps));
        scene.frame(now);
        // guard: the time between frames (CPU and GPU together, unlike the render call's own time);
        // after a 0.5 s warm-up (shader compilation), if most frames of the next 2 s come over 24 ms
        // apart, the device cannot keep up: back to the poster
        const gap = prev ? now - prev : 0;
        prev = now;
        if (now - started < 500) {
          // warm-up
        } else if (now - started < 2500) {
          slow.push(gap);
        } else if (slow.length) {
          const over = slow.filter((x) => x > 24).length / slow.length;
          slow.length = 0;
          if (over > 0.5) {
            scene.dispose();
            scene = null;
            setLive(false);
            return;
          }
        }
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      setLive(true);
    };

    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(() => void start(), { timeout: 2000 });
      else setTimeout(() => void start(), 300);
    };
    if (document.readyState === 'complete') schedule();
    else {
      window.addEventListener('load', schedule, { once: true });
      cleanups.push(() => window.removeEventListener('load', schedule));
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
      scene?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      data-testid="labor-canvas"
      data-live={live ? 'true' : 'false'}
      className={`${styles.canvas} ${live ? styles.canvasOn : ''}`}
    />
  );
}
