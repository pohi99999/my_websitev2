'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WorldQuantButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const WorldQuantButton: React.FC<WorldQuantButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 rounded-lg group cursor-pointer inline-flex items-center justify-center';
  
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-green to-electric-blue text-black border-0',
    secondary: 'bg-transparent border-2 border-neon-green text-neon-green hover:text-black',
    ghost: 'bg-transparent border border-white/20 text-white hover:border-neon-green hover:text-neon-green',
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background animation layers */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-neon-green"
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.7 }}
        />
      )}

      {variant === 'ghost' && (
        <motion.div
          className="absolute inset-0 bg-neon-green/10"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ boxShadow: '0 0 0 rgba(0, 255, 157, 0)' }}
        whileHover={{ 
          boxShadow: variant === 'primary' 
            ? '0 0 30px rgba(0, 255, 157, 0.6), 0 0 60px rgba(0, 191, 255, 0.3)'
            : '0 0 20px rgba(0, 255, 157, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
};

export default WorldQuantButton;