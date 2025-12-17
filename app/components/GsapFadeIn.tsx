'use client';

import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface GsapFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
}

const GsapFadeIn: React.FC<GsapFadeInProps> = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.8,
  start = "top 85%" 
}) => {
  const el = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = el.current;
    if (!element) return;

    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      if (isCancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const animation = gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );

      cleanup = () => {
        animation.kill();
        gsap.getTweensOf(element).forEach((tween) => tween.kill());
      };
    })();

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, [delay, duration, start, prefersReducedMotion]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default GsapFadeIn;
