'use client';

import { useEffect, useState } from 'react';
import styles from './labor.module.css';

// The /labor poster (card 0c1060b6): stills rendered from the 3D scene, one per step, portrait for
// phones and landscape for everything else. This is what phones, tablets in portrait, weak devices and
// reduced-motion visitors see instead of the live scene, and what everyone sees until the scene fades
// in over it. Only the first still is in the server HTML (preloaded); the others load lazily and
// cross-fade as the visitor scrolls past the steps ([data-labor-step]); with reduced motion they swap
// without a fade.

export const POSTER_STEPS = 6;

const src = (step: number, shape: 'p' | 'l') => `/labor/poster-${step}-${shape}.avif`;

export default function LaborPoster() {
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-labor-step]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const n = Number((e.target as HTMLElement).dataset.laborStep);
          setStep(n);
          // the live scene covers the poster: no more stills to download
          if (document.querySelector<HTMLElement>('[data-testid="labor-canvas"]')?.dataset.live === 'true') continue;
          // the next still too, so it is there before the visitor reaches it
          setLoaded((prev) => (prev.has(n) && prev.has(n + 1) ? prev : new Set([...prev, n, Math.min(n + 1, POSTER_STEPS - 1)])));
        }
      },
      // a step is "current" while it covers the middle of the screen
      { rootMargin: '-50% 0px -50% 0px' },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className={styles.poster}>
      {Array.from({ length: POSTER_STEPS }, (_, i) =>
        loaded.has(i) ? (
          <picture key={i}>
            <source media="(orientation: portrait)" srcSet={src(i, 'p')} type="image/avif" />
            <img
              src={src(i, 'l')}
              alt=""
              decoding="async"
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`${styles.still} ${i === step ? styles.stillOn : ''}`}
            />
          </picture>
        ) : null,
      )}
    </div>
  );
}
