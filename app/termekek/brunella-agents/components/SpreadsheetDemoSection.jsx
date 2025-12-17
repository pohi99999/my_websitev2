'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertCircle, Table, TrendingUp } from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { useLanguage } from '../../../context/LanguageContext';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function statusClass(status) {
  switch (status) {
    case 'positive':
      return 'text-emerald-300';
    case 'negative':
      return 'text-rose-300';
    case 'neutral':
      return 'text-gray-200';
    case 'generating':
      return 'text-cyan-200';
    default:
      return 'text-gray-500';
  }
}

export default function SpreadsheetDemoSection() {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  const rows = useMemo(
    () => [
      {
        name: language === 'en' ? 'Brunella BAS – Setup Pack' : 'Brunella BAS – Bevezető csomag',
        q3: '€42,300',
        q4: '€48,750',
        finalText: language === 'en' ? '+15% Growth' : '+15% növekedés',
        status: 'positive'
      },
      {
        name: language === 'en' ? 'Pohi AI Pro – License' : 'Pohi AI Pro – Licenc',
        q3: '€19,800',
        q4: '€19,600',
        finalText: language === 'en' ? 'Stable' : 'Stabil',
        status: 'neutral'
      },
      {
        name: language === 'en' ? 'Automation Consulting (SME)' : 'Automatizálási tanácsadás (KKV)',
        q3: '€31,400',
        q4: '€29,800',
        finalText: language === 'en' ? '-5% Decline' : '-5% csökkenés',
        status: 'negative'
      }
    ],
    [language]
  );

  const [runState, setRunState] = useState('idle'); // idle | running | done
  const [activeRow, setActiveRow] = useState(-1);
  const [predictions, setPredictions] = useState(() => rows.map(() => ({ text: '', status: 'idle' })));

  useEffect(() => {
    let cancelled = false;

    async function typeIntoRow(rowIndex, fullText, status) {
      for (let i = 1; i <= fullText.length; i += 1) {
        if (cancelled) return;
        setPredictions((prev) => {
          const next = [...prev];
          next[rowIndex] = { text: fullText.slice(0, i), status };
          return next;
        });
        // Slightly jittery typing feels more “real”
        await delay(18 + (i % 3) * 8);
      }
    }

    async function run() {
      if (!inView) return;

      setRunState('running');
      setPredictions(rows.map(() => ({ text: '', status: 'idle' })));

      for (let i = 0; i < rows.length; i += 1) {
        if (cancelled) return;
        setActiveRow(i);

        if (prefersReducedMotion) {
          setPredictions((prev) => {
            const next = [...prev];
            next[i] = { text: rows[i].finalText, status: rows[i].status };
            return next;
          });
          continue;
        }

        await typeIntoRow(i, t('brunellaAgents.spreadsheetDemo.generating'), 'generating');
        await delay(250);

        setPredictions((prev) => {
          const next = [...prev];
          next[i] = { text: '', status: rows[i].status };
          return next;
        });

        await typeIntoRow(i, rows[i].finalText, rows[i].status);
        await delay(380);
      }

      setActiveRow(-1);
      setRunState('done');
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [inView, prefersReducedMotion, rows, t]);

  const showBadge = runState === 'running' && activeRow >= 0;

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Table className="w-4 h-4" />
              <span className="text-sm font-semibold">{t('brunellaAgents.spreadsheetDemo.badge')}</span>
            </div>
            <h2 className="section-title">{t('brunellaAgents.spreadsheetDemo.title')}</h2>
            <p className="section-subtitle">{t('brunellaAgents.spreadsheetDemo.subtitle')}</p>
          </div>
        </GsapFadeIn>

        <SpotlightCard className="p-0 overflow-hidden">
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="text-sm text-gray-300">Q4_forecast.sheet</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <TrendingUp className="w-4 h-4" /> {t('brunellaAgents.spreadsheetDemo.aiFill')}
              </div>
            </div>

            <div className="relative p-6 sm:p-8 bg-black/35">
              <AnimatePresence>
                {showBadge && !prefersReducedMotion && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.15)]"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                    </span>
                    {t('brunellaAgents.spreadsheetDemo.connected')}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 overflow-hidden">
                <div className="grid grid-cols-4 gap-3 px-4 py-3 text-[11px] uppercase tracking-widest text-gray-300 bg-black/25 border-b border-white/10">
                  <div className="truncate">{t('brunellaAgents.spreadsheetDemo.columns.product')}</div>
                  <div className="text-right">{t('brunellaAgents.spreadsheetDemo.columns.q3')}</div>
                  <div className="text-right">{t('brunellaAgents.spreadsheetDemo.columns.q4')}</div>
                  <div className="text-right">{t('brunellaAgents.spreadsheetDemo.columns.prediction')}</div>
                </div>

                <div className="divide-y divide-white/10">
                  {rows.map((row, idx) => {
                    const isActive = idx === activeRow && runState === 'running';
                    const cell = predictions[idx];

                    return (
                      <motion.div
                        key={row.name}
                        className={`relative grid grid-cols-4 gap-3 px-4 py-4 items-center ${
                          isActive ? 'bg-white/5' : 'bg-transparent'
                        }`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.06 }}
                      >
                        <AnimatePresence>
                          {runState === 'running' && !prefersReducedMotion && (
                            <motion.div
                              key="scan"
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0.0 }}
                              animate={{ opacity: isActive ? 0.22 : 0.12 }}
                              exit={{ opacity: 0.0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <motion.div
                                className="absolute inset-y-0 -left-1/2 w-[60%] bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
                                animate={{ x: ['-40%', '160%'] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.12 }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="relative z-10 text-sm text-gray-200 font-semibold truncate">
                          {row.name}
                        </div>
                        <div className="relative z-10 text-sm text-gray-200 text-right tabular-nums">{row.q3}</div>
                        <div className="relative z-10 text-sm text-gray-200 text-right tabular-nums">{row.q4}</div>

                        <div className="relative z-10 text-right">
                          <div className="relative inline-flex items-center justify-end min-h-[24px]">
                            <AnimatePresence>
                              {isActive && !prefersReducedMotion && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.18 }}
                                  className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]"
                                  aria-hidden="true"
                                />
                              )}
                            </AnimatePresence>

                            <span className={`text-sm font-bold ${statusClass(cell.status)}`}>
                              {cell.text || (runState === 'idle' ? '' : '—')}
                              {isActive && !prefersReducedMotion && cell.status === 'generating' && (
                                <motion.span
                                  className="inline-block w-[10px] ml-1 text-cyan-200"
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.85, repeat: Infinity }}
                                >
                                  ▍
                                </motion.span>
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <AlertCircle className="w-4 h-4 text-purple-200" />
                  <span>{t('brunellaAgents.spreadsheetDemo.note')}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {runState === 'done'
                    ? t('brunellaAgents.spreadsheetDemo.state.done')
                    : runState === 'running'
                      ? t('brunellaAgents.spreadsheetDemo.state.running')
                      : t('brunellaAgents.spreadsheetDemo.state.idle')}
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
