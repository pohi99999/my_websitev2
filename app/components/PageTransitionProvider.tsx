'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

/**
 * Provides animated page transitions using Framer Motion's AnimatePresence.
 * This component wraps the main content and applies entry and exit animations
 * based on the current Next.js route.
 *
 * @param {PageTransitionProps} props - The component props.
 * @param {React.ReactNode} props.children - The child components (pages) that will be animated during transitions.
 * @returns {JSX.Element} The rendered component with page transition animations.
 */
const PageTransitionProvider: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionProvider;
