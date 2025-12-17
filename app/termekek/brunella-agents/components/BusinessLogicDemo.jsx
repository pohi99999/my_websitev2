'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Bot, FileText, Mail, Rocket, Scan, Terminal, X } from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { useTypewriterOnce } from '../../../hooks/useTypewriter';

export default function BusinessLogicDemo() {
  const [phase, setPhase] = useState(1); // 1: research, 2: process, 3: decision
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(null);

  const dataPoints = useMemo(
    () => [
      { label: 'Competitor Price: €50', top: '20%', left: '26%' },
      { label: 'Trend: Rising', top: '34%', left: '62%' },
      { label: 'CPC: -12%', top: '56%', left: '46%' },
      { label: 'Segment: SMB', top: '70%', left: '30%' },
      { label: 'Demand: High', top: '28%', left: '52%' }
    ],
    []
  );

  const artifacts = useMemo(
    () => ({
      email: {
        title: 'Gmail – Új üzenet',
        subtitle: 'Kampány: Q3 • Hangnem: professzionális • CTA: demó időpont',
        to: '{Címzett}',
        subject: 'Q3 piaci jelzés: készen állsz egy gyors stratégiára?',
        body:
          'Szia {Keresztnév}!\n\nA Brunella Agents a Q3-as piaci adatokat elemezte (5 versenytárs, árak és ajánlatok). A rendszer egyértelmű jelzést talált: átlagosan ~5% árcsökkenés + erősödő csomagajánlatok.\n\nJavaslat (következő 14 nap):\n• Tartsd a listaárat, indíts limitált bundle kampányt\n• Üzenet: ROI + gyors bevezetés + átláthatóság\n• Ajánlat: onboarding bónusz hónap végéig\n\nHa szeretnéd, 15 perc alatt összeállítok egy célcsoport-specifikus playbookot és 3 kreatív variánst.\n\nÜdv,\nPohánka & Társa\n\nUi.: Válaszolj annyit: „Q3”, és küldöm a részletes riportot.'
      },
      presentation: {
        title: 'PowerPoint – Slide Preview',
        subtitle: '1 oldalas stratégiai összefoglaló • vezetői fókusz',
        body:
          'Cím: Q3 piaci lehetőség – gyors döntési javaslat\n\n1) Jelzés\n- Versenytársak: átlag -5% ármozgás\n- Csomagajánlatok és limitált akciók erősödnek\n\n2) Hatás\n- Inbound: árérzékenység nő\n- Churn kockázat: price-only szegmensek\n\n3) Ajánlott lépések (14 nap)\n- Bundle + onboarding bónusz\n- Üzenet: ROI, gyors bevezetés, „Glass Box” transzparencia\n- 3 kreatív A/B teszt LinkedIn-en\n\n4) Output\n- Kampány assetek + sales enablement összegzés\n- Heti monitorozás automatizálva'
      },
      linkedin: {
        title: 'LinkedIn – Poszt előnézet',
        subtitle: 'Cél: lead gen • Hook: piaci jelzés • CTA: komment + DM',
        body:
          'Q3 piaci jelzés: a top versenytársak átlagosan ~5%-kal csökkentettek árat.\n\nA kérdés nem az, hogy olcsóbb leszel-e — hanem hogy gyorsabban tudsz-e végrehajtani.\n\nA Brunella Agents ezt csinálja helyetted:\n✅ versenytárs ajánlatok scan\n✅ trendek és pozicionálás összegzés\n✅ kampány és üzenetek generálása\n\nKéred a Q3 ár-térképet + playbookot?\nKomment: „PLAYBOOK” és küldjük DM-ben.'
      }
    }),
    []
  );

  const activeArtifact = choice ? artifacts[choice] : null;
  const typedBody = useTypewriterOnce({ text: activeArtifact?.body ?? '', enabled: open });

  useEffect(() => {
    if (open) return;

    const t1 = setTimeout(() => setPhase(2), 2600);
    const t2 = setTimeout(() => setPhase(3), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const FlowCard = ({ step, title, icon: Icon, children, tone = 'from-blue-500/30 to-purple-500/20' }) => (
    <SpotlightCard className="p-0 overflow-hidden">
      <div className={`px-5 py-4 border-b border-white/10 bg-gradient-to-r ${tone}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 border border-white/10">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-300">Step {step}</div>
            <div className="font-bold text-white">{title}</div>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 bg-black/35">{children}</div>
    </SpotlightCard>
  );

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

  const dotPositions = useMemo(
    () => [
      { top: '22%', left: '28%' },
      { top: '38%', left: '64%' },
      { top: '58%', left: '44%' },
      { top: '70%', left: '30%' },
      { top: '30%', left: '54%' }
    ],
    []
  );

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-emerald-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-semibold">Business Workflow Demo</span>
            </div>
            <h2 className="section-title">Valós Üzleti Szituációk</h2>
            <p className="section-subtitle">Research → Analysis → Decision → Output egyetlen vizuális folyamatban</p>
          </div>
        </GsapFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
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

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

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

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

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

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

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
        </div>

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
      </div>
    </section>
  );
}
