import React from 'react';
import { motion } from 'framer-motion';

const ArrowConnector = ({ direction = 'right' }) => {
  const isDown = direction === 'down';
  return (
    <div className={`flex items-center justify-center ${isDown ? 'h-10' : 'w-10'}`} aria-hidden="true">
      <svg
        width={isDown ? 10 : 40}
        height={isDown ? 40 : 10}
        viewBox={isDown ? '0 0 10 40' : '0 0 40 10'}
        fill="none"
      >
        <defs>
          <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.55)" />
          </marker>
        </defs>
        <motion.path
          d={isDown ? 'M5 0 L5 34' : 'M0 5 L34 5'}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2"
          strokeDasharray="6 6"
          markerEnd="url(#arrowHead)"
          initial={{ pathLength: 0, opacity: 0.7 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
};

export default ArrowConnector;
