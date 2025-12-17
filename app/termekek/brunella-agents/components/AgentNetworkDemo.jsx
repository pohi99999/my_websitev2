'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  Code2,
  Database,
  Image,
  Inbox,
  LineChart,
  Link2,
  Megaphone,
  Search,
  Shield,
  Wrench
} from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';

export default function AgentNetworkDemo() {
  const [hovered, setHovered] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const apply = () => setIsSmallScreen(media.matches);
    apply();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', apply);
      return () => media.removeEventListener('change', apply);
    }

    media.addListener(apply);
    return () => media.removeListener(apply);
  }, []);

  const agents = useMemo(
    () => [
      {
        id: 'researcher',
        name: 'Kutató Ügynök',
        icon: Search,
        tone: 'text-cyan-200',
        role: 'Piackutatás, versenytársfigyelés, források összegyűjtése.',
        angleDeg: -90
      },
      {
        id: 'selfHealing',
        name: 'Önjavító & Fejlesztő',
        icon: Wrench,
        tone: 'text-purple-200',
        role: 'Hibák észlelése, automatikus javítás, CI/monitoring visszacsatolás.',
        angleDeg: -50
      },
      {
        id: 'analyst',
        name: 'Elemző Ügynök',
        icon: LineChart,
        tone: 'text-emerald-200',
        role: 'Adattisztítás, trendek, KPI-k, döntéstámogató összegzések.',
        angleDeg: -10
      },
      {
        id: 'visual',
        name: 'Vizuális Elemző',
        icon: Image,
        tone: 'text-blue-200',
        role: 'Grafikonok, dashboardok, vizuális insightok és prezentációs elemek.',
        angleDeg: 30
      },
      {
        id: 'security',
        name: 'Biztonsági Protokoll',
        icon: Shield,
        tone: 'text-red-200',
        role: 'Policy ellenőrzés, PII védelem, jogosultságok, audit és megfelelés.',
        angleDeg: 70
      },
      {
        id: 'media',
        name: 'Média Kampányfelelős',
        icon: Megaphone,
        tone: 'text-pink-200',
        role: 'Kampánytervezés, csatorna-mix, kreatív irány és időzítés.',
        angleDeg: 110
      },
      {
        id: 'coder',
        name: 'Kódoló & Tartalomgyártó',
        icon: Code2,
        tone: 'text-indigo-200',
        role: 'Automatizmusok, integrációk, landing/microcopy, gyors prototípusok.',
        angleDeg: 150
      },
      {
        id: 'email',
        name: 'Email Rendszerező',
        icon: Inbox,
        tone: 'text-amber-200',
        role: 'Inbox triage, kategorizálás, follow-up, SLA és válaszsablonok.',
        angleDeg: 190
      },
      {
        id: 'storage',
        name: 'Dokumentum Rendszerező',
        icon: Database,
        tone: 'text-teal-200',
        role: 'Dokumentumtár, verziózás, metaadatok, visszakereshetőség.',
        angleDeg: 230
      }
    ],
    []
  );

  const radius = 36; // percent
  const positionedAgents = useMemo(() => {
    return agents.map((agent) => {
      const rad = (agent.angleDeg * Math.PI) / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = 50 + radius * Math.sin(rad);
      return { ...agent, x, y };
    });
  }, [agents]);

  const hoveredAgent = hovered ? positionedAgents.find((a) => a.id === hovered) : null;

  const tooltipStyle = useMemo(() => {
    if (!hoveredAgent) return undefined;
    if (isSmallScreen) {
      return { left: '50%', top: '84%' };
    }

    const clampedY = Math.max(12, Math.min(88, hoveredAgent.y - 10));
    const clampedX = Math.max(12, Math.min(88, hoveredAgent.x));
    return { left: `${clampedX}%`, top: `${clampedY}%` };
  }, [hoveredAgent, isSmallScreen]);

  return (
    <section className="py-24 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-blue-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Link2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Agent Network Graph</span>
            </div>
            <h2 className="section-title">A Brunella Ügynök Hálózat</h2>
            <p className="section-subtitle">Orchestrator központ + specialista csomópontok valós idejű adatáramlással</p>
          </div>
        </GsapFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <SpotlightCard className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-black/30 flex items-center justify-between">
              <div className="text-sm text-gray-200 font-semibold">brunella://agent-network</div>
              <div className="text-xs text-gray-400">Live packets • Hover nodes</div>
            </div>

            <div className="p-6 sm:p-8 bg-black/35">
              <div className="relative w-full aspect-square sm:aspect-[16/9] rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_40%_80%,rgba(34,211,238,0.12),transparent_55%)]" />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '42px 42px'
                  }}
                  animate={{ opacity: [0.1, 0.18, 0.1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="rgba(168,85,247,0.65)" />
                      <stop offset="1" stopColor="rgba(59,130,246,0.55)" />
                    </linearGradient>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="0.6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {positionedAgents.map((a, idx) => (
                    <g key={a.id}>
                      <motion.line
                        x1="50"
                        y1="50"
                        x2={a.x}
                        y2={a.y}
                        stroke="url(#edgeGlow)"
                        strokeWidth="0.35"
                        strokeDasharray="2 2"
                        filter="url(#softGlow)"
                        initial={{ pathLength: 0, opacity: 0.5 }}
                        animate={{ pathLength: 1, opacity: 0.95 }}
                        transition={{ duration: 0.9, delay: 0.1 + idx * 0.06 }}
                      />

                      <motion.circle
                        r="0.65"
                        fill="rgba(34,211,238,0.95)"
                        filter="url(#softGlow)"
                        animate={
                          shouldReduceMotion
                            ? { cx: String(a.x), cy: String(a.y), opacity: 0.7 }
                            : {
                                cx: ['50', String(a.x), '50'],
                                cy: ['50', String(a.y), '50'],
                                opacity: [0.35, 1, 0.35]
                              }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 2.8 + (idx % 3) * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: idx * 0.12
                              }
                        }
                      />
                    </g>
                  ))}
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-purple-400/40 bg-gradient-to-b from-white/10 to-black/30 backdrop-blur-md shadow-[0_0_34px_rgba(168,85,247,0.28)]"
                    animate={
                      shouldReduceMotion
                        ? { scale: 1, boxShadow: '0 0 34px rgba(168,85,247,0.28)' }
                        : {
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 0 34px rgba(168,85,247,0.28)',
                              '0 0 54px rgba(59,130,246,0.32)',
                              '0 0 34px rgba(168,85,247,0.28)'
                            ]
                          }
                    }
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(59,130,246,0.32),transparent_60%),radial-gradient(circle_at_60%_70%,rgba(168,85,247,0.24),transparent_62%)]" />
                    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-3">
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 border border-white/10">
                        <Bot className="w-5 h-5 text-purple-200" />
                      </div>
                      <div className="mt-2 text-sm font-extrabold text-white">Brunella</div>
                      <div className="text-[11px] text-gray-300">Orchestrator</div>
                    </div>
                  </motion.div>
                </div>

                {positionedAgents.map((a) => {
                  const Icon = a.icon;
                  const isHovered = hovered === a.id;
                  return (
                    <motion.button
                      key={a.id}
                      type="button"
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${a.x}%`, top: `${a.y}%` }}
                      onMouseEnter={() => setHovered(a.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(a.id)}
                      onBlur={() => setHovered(null)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      aria-label={`${a.name} – ${a.role}`}
                    >
                      <div
                        className={
                          `h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ` +
                          `shadow-[0_0_22px_rgba(59,130,246,0.12)] ` +
                          (isHovered ? 'bg-white/10 border-white/20' : '')
                        }
                      >
                        <div className="h-full w-full flex flex-col items-center justify-center text-center px-1">
                          <Icon className={`w-5 h-5 ${a.tone}`} />
                          <div className="mt-1 text-[10px] text-gray-200 font-semibold leading-tight">{a.name}</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                <AnimatePresence>
                  {hoveredAgent && (
                    <motion.div
                      key={hoveredAgent.id}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={tooltipStyle}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      role="tooltip"
                    >
                      <div className="max-w-[260px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-md px-4 py-3 shadow-[0_0_28px_rgba(168,85,247,0.14)]">
                        <div className="text-xs text-gray-300">{hoveredAgent.name}</div>
                        <div className="mt-1 text-sm text-white font-semibold">Szerep</div>
                        <div className="mt-1 text-xs text-gray-200 leading-relaxed">{hoveredAgent.role}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { k: 'Csomópontok', v: String(1 + agents.length) },
                  { k: 'Kapcsolatok', v: String(agents.length) },
                  { k: 'Kommunikáció', v: 'valós idejű' }
                ].map((stat) => (
                  <div key={stat.k} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs text-gray-400">{stat.k}</div>
                    <div className="text-lg font-bold gradient-text">{stat.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
