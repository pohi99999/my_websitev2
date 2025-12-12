'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Provides smooth scrolling functionality to the entire application using the Lenis library.
 * This component initializes Lenis and manages its animation frame loop and cleanup.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will inherit the smooth scrolling.
 * @returns {JSX.Element} A React fragment containing the children, with Lenis smooth scrolling applied.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smooth effect
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
