'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: any;
  whileTap?: any;
  delay?: number;
}

const SpotlightCardMotion: React.FC<SpotlightCardProps> = ({ children, className, whileHover, whileTap, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative glass-card overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow w-[200%] h-[200%] left-[-50%] top-[-50%]" />
      </div>

      <div className="absolute inset-[1px] bg-black/90 rounded-[inherit] z-0" />

      {isHovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 255, 0.15), transparent 80%)`
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

export default SpotlightCardMotion;
