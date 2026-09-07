import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import FlowCard from './FlowCard';

const StepDataProcessing = ({ phase, dataPoints }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: 0.05 }}
    >
      <FlowCard step={2} title="Data Processing (Feldolgozás)" icon={FileText} tone="from-cyan-500/20 to-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">Merging signals</div>
          <div className="text-xs text-gray-400">Analysis pipeline</div>
        </div>

        <div className="relative h-[200px] rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.16),transparent_60%)]" />

          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.div
                key="waiting"
                className="absolute inset-0 flex items-center justify-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Waiting for data…
              </motion.div>
            ) : (
              <motion.div
                key="merging"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {dataPoints.map((p, idx) => (
                  <motion.div
                    key={p.label}
                    className="absolute"
                    style={{ top: p.top, left: p.left }}
                    animate={{ top: '50%', left: '50%', x: '-50%', y: '-50%', opacity: [1, 0.35, 0.9] }}
                    transition={{ duration: 1.15, delay: idx * 0.09, ease: 'easeInOut' }}
                  >
                    <div className="px-2.5 py-1 rounded-full border border-white/10 bg-black/35 backdrop-blur text-[11px] text-cyan-100 whitespace-nowrap shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                      {p.label}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-gray-400">Summary</div>
                    <div className="text-lg font-bold text-white">Piaci lehetőség Q3-ban</div>
                    <div className="text-sm text-gray-300 mt-1">Összegzés: versenytárs árak ~-5%, kereslet magas</div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          Feldolgozás: <span className="text-cyan-200 font-semibold">összegzés kész</span>
        </div>
      </FlowCard>
    </motion.div>
  );
};

export default StepDataProcessing;
