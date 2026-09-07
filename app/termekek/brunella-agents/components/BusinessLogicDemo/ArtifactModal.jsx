import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SpotlightCard from '../../../../components/SpotlightCard';

const ArtifactModal = ({ open, setOpen, activeArtifact, choice, setChoice, setPhase, typedBody }) => {
  return (
    <AnimatePresence>
      {open && activeArtifact && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <SpotlightCard className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                <div>
                  <div className="text-sm font-bold text-white">{activeArtifact.title}</div>
                  <div className="text-xs text-gray-400">{activeArtifact.subtitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-gray-200" />
                </button>
              </div>

              <div className="p-6 sm:p-8 bg-black/35">
                {choice === 'email' ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
                      <div className="text-xs text-gray-300">Gmail • Compose</div>
                      <div className="text-[11px] text-gray-400">Draft</div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                          <div className="text-[11px] text-gray-400">To</div>
                          <div className="text-sm text-gray-200 font-medium">{activeArtifact.to}</div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                          <div className="text-[11px] text-gray-400">Subject</div>
                          <div className="text-sm text-gray-200 font-medium">{activeArtifact.subject}</div>
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 min-h-[260px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-200 leading-relaxed">
                          {typedBody}
                          <motion.span
                            className="inline-block w-[10px] ml-1 text-cyan-200"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.85, repeat: Infinity }}
                          >
                            ▍
                          </motion.span>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : choice === 'presentation' ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
                      <div className="text-xs text-gray-300">PowerPoint • Slide Preview</div>
                      <div className="text-[11px] text-gray-400">1 / 1</div>
                    </div>
                    <div className="p-5">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="aspect-[16/9] rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-black/20 p-5 overflow-hidden">
                          <div className="text-sm font-bold text-white mb-3">Q3 piaci lehetőség – javaslat</div>
                          <div className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {typedBody}
                            <motion.span
                              className="inline-block w-[10px] ml-1 text-cyan-200"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 0.85, repeat: Infinity }}
                            >
                              ▍
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
                      <div className="text-xs text-gray-300">LinkedIn • Post</div>
                      <div className="text-[11px] text-gray-400">Preview</div>
                    </div>
                    <div className="p-5">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400/60 to-purple-400/50 border border-white/10" />
                          <div>
                            <div className="text-sm font-semibold text-white">Brunella Agents</div>
                            <div className="text-[11px] text-gray-400">Sponsored • 1m</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed min-h-[260px]">
                          {typedBody}
                          <motion.span
                            className="inline-block w-[10px] ml-1 text-cyan-200"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.85, repeat: Infinity }}
                          >
                            ▍
                          </motion.span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                          <div>Like • Comment • Repost</div>
                          <div>Send</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-gray-400">Press ESC to close</div>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setChoice(null);
                      setPhase(1);
                    }}
                    className="btn-secondary"
                  >
                    Újraindítás
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtifactModal;
