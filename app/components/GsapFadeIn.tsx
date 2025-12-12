'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const element = el.current;
    if (!element) return;

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
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      animation.kill();
      gsap.getTweensOf(element).forEach(tween => tween.kill());
    };
  }, [delay, duration, start]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default GsapFadeIn;
