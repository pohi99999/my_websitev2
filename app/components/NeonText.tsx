'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonTextProps {
  children: ReactNode;
  color?: 'electric-blue' | 'vibrant-purple';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  glow?: boolean;
  flicker?: boolean;
  className?: string;
}

/**
 * Renders text with a neon glow and optional flicker effect, using a predefined futuristic color palette.
 * This component leverages Framer Motion for dynamic visual effects.
 *
 * @param {NeonTextProps} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the neon text (e.g., a string, an <h1> tag).
 * @param {'electric-blue' | 'vibrant-purple'} [props.color='electric-blue'] - The primary color for the neon effect. Choose from 'electric-blue' or 'vibrant-purple'.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [props.size='md'] - The size of the text, corresponding to Tailwind CSS text sizes.
 * @param {boolean} [props.glow=true] - If true, applies a continuous glow animation. Overridden by `flicker` if both are true.
 * @param {boolean} [props.flicker=false] - If true, applies a flickering neon animation. Takes precedence over `glow`.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes to apply to the component.
 * @returns {JSX.Element} The rendered neon text component with applied effects.
 */
export default function NeonText({ 
  children, 
  color = 'electric-blue',
  size = 'md',
  glow = true,
  flicker = false,
  className = ''
}: NeonTextProps) {
  const colorMap = {
    'electric-blue': {
      text: 'text-electric-blue',
      shadow: 'drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]',
      border: 'text-stroke-electric-blue'
    },
    'vibrant-purple': {
      text: 'text-vibrant-purple',
      shadow: 'drop-shadow-[0_0_10px_rgba(157,0,255,0.8)]',
      border: 'text-stroke-vibrant-purple'
    }
  };

  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const selectedColor = colorMap[color];
  const selectedSize = sizeMap[size];

  const flickerVariants = {
    animate: {
      opacity: [1, 0.5, 1, 0.8, 1],
      textShadow: [
        `0 0 10px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 20px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 10px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 15px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 10px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`
      ]
    }
  };

  const glowVariants = {
    animate: {
      textShadow: [
        `0 0 10px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 20px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`,
        `0 0 10px ${color === 'electric-blue' ? '#00FFFF' : '#9D00FF'}`
      ]
    }
  };

  const baseClasses = [
    'font-bold',
    selectedColor.text,
    selectedSize,
    glow ? selectedColor.shadow : '',
    className
  ].filter(Boolean).join(' ');

  if (flicker) {
    return (
      <motion.span
        className={baseClasses}
        variants={flickerVariants}
        animate="animate"
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.2, 0.4, 0.6, 1]
        }}
      >
        {children}
      </motion.span>
    );
  }

  if (glow) {
    return (
      <motion.span
        className={baseClasses}
        variants={glowVariants}
        animate="animate"
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={baseClasses}>
      {children}
    </span>
  );
}