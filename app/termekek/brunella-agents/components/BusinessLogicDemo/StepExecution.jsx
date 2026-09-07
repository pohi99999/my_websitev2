import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import FlowCard from './FlowCard';

const StepExecution = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <FlowCard step={4} title="Execution (Végrehajtás)" icon={Terminal} tone="from-pink-500/18 to-purple-500/18">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="text-sm text-gray-200 font-semibold">Generated Artifact</div>
          <div className="text-xs text-gray-400 mt-1">Real-time előnézet modálban (typewriter)</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-400">Status</div>
            <div className="text-xs font-semibold text-emerald-200">Ready</div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-300 via-blue-400 to-purple-400"
              animate={{ x: ['-100%', '0%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            />
          </div>
          <div className="mt-4 text-xs text-gray-400">Válassz opciót a Step 3-ban a részletekhez.</div>
        </div>
      </FlowCard>
    </motion.div>
  );
};

export default StepExecution;
