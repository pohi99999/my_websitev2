import React from 'react';
import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';
import FlowCard from './FlowCard';

const dotPositions = [
  { top: '22%', left: '28%' },
  { top: '38%', left: '64%' },
  { top: '58%', left: '44%' },
  { top: '70%', left: '30%' },
  { top: '30%', left: '54%' }
];

const StepMarketResearch = ({ dataPoints }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <FlowCard step={1} title="Market Research (Kutatás)" icon={Scan} tone="from-emerald-500/25 to-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">Market Data Points</div>
          <div className="text-xs text-gray-400">Live scan</div>
        </div>

        <div className="relative h-[200px] rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.25),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.18),transparent_55%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[160px] h-[160px] rounded-full border border-white/10">
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />

              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 90deg, rgba(16,185,129,0.00), rgba(16,185,129,0.45), rgba(16,185,129,0.00))'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {dotPositions.map((p, idx) => (
            <motion.div
              key={idx}
              className="absolute w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.7)]"
              style={{ top: p.top, left: p.left }}
              animate={{ opacity: [0.1, 1, 0.3, 1], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.15 }}
            />
          ))}

          {dataPoints.map((p, idx) => (
            <motion.div
              key={p.label}
              className="absolute"
              style={{ top: p.top, left: p.left }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0.2, 1, 0.6, 1], y: [6, 0, 2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 0.2 + idx * 0.18, ease: 'easeInOut' }}
            >
              <div className="px-2.5 py-1 rounded-full border border-white/10 bg-black/35 backdrop-blur text-[11px] text-emerald-100 whitespace-nowrap">
                {p.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-400">
          Talált pontok: <span className="text-emerald-200 font-semibold">{dataPoints.length}</span>
        </div>
      </FlowCard>
    </motion.div>
  );
};

export default StepMarketResearch;
