'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  type: 'circle' | 'triangle' | 'square' | 'hexagon';
  size: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  opacity: number;
}

const ShapeComponent = ({ shape }: { shape: Shape }) => {
  const shapeVariants = {
    animate: {
      x: [shape.x, shape.x + Math.random() * 200 - 100],
      y: [shape.y, shape.y + Math.random() * 200 - 100],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      opacity: [shape.opacity, shape.opacity * 0.7, shape.opacity],
    }
  };

  const renderShape = () => {
    const commonProps = {
      width: shape.size,
      height: shape.size,
      style: { fill: shape.color }
    };

    switch (shape.type) {
      case 'circle':
        return (
          <svg {...commonProps} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" />
          </svg>
        );
      case 'triangle':
        return (
          <svg {...commonProps} viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" />
          </svg>
        );
      case 'square':
        return (
          <svg {...commonProps} viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" />
          </svg>
        );
      case 'hexagon':
        return (
          <svg {...commonProps} viewBox="0 0 100 100">
            <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: shape.x,
        top: shape.y,
      }}
      variants={shapeVariants}
      animate="animate"
      transition={{
        duration: Math.random() * 20 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export default function GeometricAnimation() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      const shapeTypes: Shape['type'][] = ['circle', 'triangle', 'square', 'hexagon'];
      const colors = [
        'rgba(0, 255, 255, 0.3)', // Cyan
        'rgba(255, 0, 255, 0.3)', // Magenta  
        'rgba(0, 255, 127, 0.3)', // Spring green
        'rgba(255, 127, 0, 0.3)', // Orange
        'rgba(127, 0, 255, 0.3)', // Purple
      ];

      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          size: Math.random() * 60 + 20,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2
        });
      }

      setShapes(newShapes);
    };

    generateShapes();

    const handleResize = () => {
      generateShapes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {shapes.map(shape => (
        <ShapeComponent key={shape.id} shape={shape} />
      ))}
    </div>
  );
}