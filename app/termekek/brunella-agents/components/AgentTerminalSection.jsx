'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, Scan, Terminal } from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';

export default function AgentTerminalSection() {
  const lines = useMemo(
    () => [
      {
        agent: 'Orchestrator (Brunella)',
        icon: Terminal,
        tone: 'text-purple-300',
        message: 'Received task: Analyze competitor pricing for Q3.'
      },
      {
        agent: 'Researcher',
        icon: Scan,
        tone: 'text-blue-300',
        message: 'Scraping top 5 competitor sites... [DONE]'
      },
      {
        agent: 'Analyst',
        icon: FileText,
        tone: 'text-emerald-300',
        message: 'Data processed. Trend detected: Prices dropped by 5%.'
      },
      {
        agent: 'Orchestrator (Brunella)',
        icon: Bot,
        tone: 'text-purple-300',
        message: 'Report generated. Sending to user.'
      }
    ],
    []
  );

  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typed, setTyped] = useState(() => lines.map(() => ''));

  useEffect(() => {
    let cancelled = false;
    let timeout;

    const reset = () => {
      setActiveLineIndex(0);
      setTyped(lines.map(() => ''));
    };

    const typeLine = (lineIndex, charIndex) => {
      if (cancelled) return;
      const full = lines[lineIndex].message;

      setTyped((prev) => {
        const next = [...prev];
        next[lineIndex] = full.slice(0, charIndex);
        return next;
      });

      if (charIndex >= full.length) {
        if (lineIndex < lines.length - 1) {
          timeout = setTimeout(() => {
            setActiveLineIndex(lineIndex + 1);
            typeLine(lineIndex + 1, 1);
          }, 500);
        } else {
          timeout = setTimeout(() => {
            reset();
            typeLine(0, 1);
          }, 1200);
        }
        return;
      }

      timeout = setTimeout(() => typeLine(lineIndex, charIndex + 1), 18);
    };

    typeLine(0, 1);

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [lines]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-semibold">Agent Collaboration Demo</span>
            </div>
            <h2 className="section-title">Ügynök Együttműködés</h2>
            <p className="section-subtitle">Három specializált ügynök, egy feladat, valós idejű koordináció</p>
          </div>
        </GsapFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <SpotlightCard className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="text-sm text-gray-300">brunella://agent-terminal</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Bot className="w-4 h-4" /> Live
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-black/35">
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                {lines.map((line, idx) => {
                  const Icon = line.icon;
                  const isActive = idx === activeLineIndex;
                  const showCursor = isActive && typed[idx].length < line.message.length;
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex items-center gap-2 min-w-[14rem]">
                        <Icon className={`w-4 h-4 ${line.tone}`} />
                        <span className={`text-xs ${line.tone}`}>{line.agent}</span>
                      </div>
                      <div className="flex-1 text-gray-200">
                        <span>{typed[idx]}</span>
                        {showCursor && (
                          <motion.span
                            className="inline-block w-[10px] ml-1 text-purple-200"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity }}
                          >
                            ▍
                          </motion.span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[{ k: 'Agents', v: '3' }, { k: 'Sites scanned', v: '5' }, { k: 'Detected change', v: '-5%' }].map(
                  (stat) => (
                    <div
                      key={stat.k}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                    >
                      <div className="text-xs text-gray-400">{stat.k}</div>
                      <div className="text-lg font-bold gradient-text">{stat.v}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
