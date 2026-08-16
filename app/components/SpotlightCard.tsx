'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { TargetAndTransition, VariantLabels } from 'framer-motion';

const SpotlightCardMotion = dynamic(() => import('./SpotlightCardMotion'), { ssr: false });

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: TargetAndTransition | VariantLabels;
  whileTap?: TargetAndTransition | VariantLabels;
  delay?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className, whileHover, whileTap, delay = 0 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (!prefersReducedMotion) {
    return (
      <SpotlightCardMotion
        className={className}
        whileHover={whileHover}
        whileTap={whileTap}
        delay={delay}
      >
        {children}
      </SpotlightCardMotion>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative glass-card overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border Beam Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow w-[200%] h-[200%] left-[-50%] top-[-50%]" />
      </div>
      
      {/* Inner Background to cover the center of the beam */}
      <div className="absolute inset-[1px] bg-black/90 rounded-[inherit] z-0" />

      {isHovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 255, 0.15), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
