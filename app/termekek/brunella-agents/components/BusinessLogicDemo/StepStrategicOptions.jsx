import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mail, BarChart3, Rocket } from 'lucide-react';
import FlowCard from './FlowCard';

const StepStrategicOptions = ({ phase, setChoice, setOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <FlowCard step={3} title="Strategic Options (Brunella)" icon={Bot} tone="from-purple-500/22 to-pink-500/18">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">Brunella ajánlás</div>
          <div className="text-xs text-gray-400">Choose output</div>
        </div>

        <AnimatePresence mode="wait">
          {phase < 3 ? (
            <motion.div
              key="locked"
              className="rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-gray-400"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              Brunella előkészíti a döntési opciókat…
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 flex items-center justify-between"
                  onClick={() => {
                    setChoice('email');
                    setOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-200" />
                    <span className="font-semibold text-white">Email Kampány Indítása</span>
                  </div>
                  <span className="text-xs text-gray-400">Generate</span>
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 flex items-center justify-between"
                  onClick={() => {
                    setChoice('presentation');
                    setOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-200" />
                    <span className="font-semibold text-white">Stratégiai Prezentáció</span>
                  </div>
                  <span className="text-xs text-gray-400">Generate</span>
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 flex items-center justify-between"
                  onClick={() => {
                    setChoice('linkedin');
                    setOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-purple-200" />
                    <span className="font-semibold text-white">LinkedIn Poszt Generálás</span>
                  </div>
                  <span className="text-xs text-gray-400">Generate</span>
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-400">Tipp: kattints egy outputra, és nézd a generált anyagot.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </FlowCard>
    </motion.div>
  );
};

export default StepStrategicOptions;
