'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Provides smooth scrolling functionality to the entire application using the Lenis library.
 * This component initializes Lenis and manages its animation frame loop and cleanup.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will inherit the smooth scrolling.
 * @returns {JSX.Element} A React fragment containing the children, with Lenis smooth scrolling applied.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ raf: (time: DOMHighResTimeStamp) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    let disposed = false;
    let rafId = 0;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const saveData = (navigator as any)?.connection?.saveData === true;

    if (prefersReducedMotion || saveData) {
      return;
    }

    void import('lenis').then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time: DOMHighResTimeStamp) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
