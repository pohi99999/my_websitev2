'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Brain, Zap, Gauge, Link2, Bot, BarChart3, Scan, Terminal, FileText } from 'lucide-react';

function useLoopingTypewriter({ text, speedMs = 16, pauseMs = 900, enabled = true }) {
  const [value, setValue] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setValue('');
      indexRef.current = 0;
      return;
    }

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const nextIndex = indexRef.current + 1;
      indexRef.current = nextIndex;
      setValue(text.slice(0, nextIndex));

      if (nextIndex >= text.length) {
        timeoutRef.current = setTimeout(() => {
          indexRef.current = 0;
          setValue('');
          timeoutRef.current = setTimeout(tick, 250);
        }, pauseMs);
        return;
      }

      timeoutRef.current = setTimeout(tick, speedMs);
    };

    timeoutRef.current = setTimeout(tick, 250);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, pauseMs, speedMs, text]);

  return value;
}

function AgentTerminalSection() {
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

function OCRDemoSection() {
  const jsonText = useMemo(
    () =>
      JSON.stringify(
        {
          invoiceId: 'INV-2025-0917',
          date: '2025-09-17',
          vendor: 'Pohánka & Társa Kft.',
          totalAmount: '1,249,000 HUF'
        },
        null,
        2
      ),
    []
  );

  const typedJson = useLoopingTypewriter({ text: jsonText, speedMs: 12, pauseMs: 1200, enabled: true });

  return (
    <section className="py-20 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-blue-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Scan className="w-4 h-4" />
              <span className="text-sm font-semibold">OCR Demo</span>
            </div>
            <h2 className="section-title">Dokumentum Feldolgozás (OCR)</h2>
            <p className="section-subtitle">Szkennelt számlából strukturált adat néhány másodperc alatt</p>
          </div>
        </GsapFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold">Invoice / Contract</div>
                  <div className="text-sm text-gray-400">CSS-only dokumentum + scanner animáció</div>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.25),transparent_50%)]" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-300">Invoice</div>
                      <div className="text-2xl font-extrabold text-white">INV-2025-0917</div>
                      <div className="text-sm text-gray-300 mt-1">Date: 2025-09-17</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300">Vendor</div>
                      <div className="font-semibold text-white">Pohánka &amp; Társa Kft.</div>
                      <div className="text-xs text-gray-400">Zalaegerszeg, HU</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((row) => (
                      <div key={row} className="flex items-center justify-between">
                        <div className="h-3 w-2/3 rounded bg-white/10" />
                        <div className="h-3 w-16 rounded bg-white/10" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-300">Total Amount</div>
                      <div className="text-xl font-bold text-white">1,249,000 HUF</div>
                    </div>
                    <div className="text-xs text-gray-400">Terms: Net 14</div>
                  </div>
                </div>

                {/* Scanner line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.55)]"
                  animate={{ y: ['10%', '86%', '10%'], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0.08, 0.16, 0.08] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.14), transparent 40%, rgba(34,211,238,0.14))' }}
                />
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <SpotlightCard className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="text-sm text-gray-300">extract.json</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Scan className="w-4 h-4" /> Structured output
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-black/35">
                <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <div className="text-xs text-gray-400">OCR → JSON</div>
                    <motion.div
                      className="h-1 w-28 rounded-full bg-white/10 overflow-hidden"
                      initial={false}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
                        animate={{ x: ['-100%', '0%', '100%'] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ width: '100%' }}
                      />
                    </motion.div>
                  </div>
                  <pre className="p-4 text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap min-h-[260px]">
                    {typedJson}
                    <motion.span
                      className="inline-block w-[10px] ml-1 text-cyan-200"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.85, repeat: Infinity }}
                    >
                      ▍
                    </motion.span>
                  </pre>
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[{ k: 'Invoice ID', v: 'INV-2025-0917' }, { k: 'Date', v: '2025-09-17' }, { k: 'Vendor', v: 'Pohánka & Társa' }, { k: 'Total', v: '1,249,000 HUF' }].map(
                    (chip) => (
                      <div
                        key={chip.k}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <div className="text-[11px] text-gray-400">{chip.k}</div>
                        <div className="text-xs text-gray-200 font-semibold truncate">{chip.v}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BrunellaAgentsPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Autonóm Ágensek',
      description: 'Önállóan működő mesterséges intelligencia ügynökök.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Valós Idejű Döntéshozatal',
      description: 'Azonnali reagálás és intelligens válaszadás.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: 'Teljesítményelemzés',
      description: 'Részletes elemzés és hatékonyság nyomon követése.',
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: 'API Integráció',
      description: 'Zökkenőmentes csatlakozás külső rendszerekhez.',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Ügynök Framework',
      description: 'Fejlesztőbarát framework az egyéni ágensek kódolásához.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Monitorozás & Analytics',
      description: 'Teljes ellenőrzés és adatelemzés a felhőben.',
    },
  ];

  const useCases = [
    {
      title: 'Üzleti Folyamatok Automatizálása',
      description: 'Böngészést, adatgyűjtést és műveletek automatizálása végig a munkafolyamatokon.',
    },
    {
      title: 'Ügyfélszolgálat Automatizáció',
      description: 'Intelligens chatbotok, amely képes összetett feladatok megoldására.',
    },
    {
      title: 'Adatgyűjtés és Keresés',
      description: 'Webes adatgyűjtés, versenytárs monitorozás és piacelemzés.',
    },
    {
      title: 'Prediktív Karbantartás',
      description: 'Gépipar és logisztika: előrejelzések alapján karbantartási ütemezés.',
    },
    {
      title: 'Személyre Szabott Marketing',
      description: 'Ügyfélsegmentáció és kampányoptimalizálás automatikusan.',
    },
    {
      title: 'Kutatás és Fejlesztés',
      description: 'Automatikus kutatás, adatbázis-keresés és dokumentumfeldolgozás.',
    },
  ];

  const plans = [
    {
      name: 'Team',
      price: '$299',
      period: '/hó',
      description: 'Kis csapatoknak és startupoknak',
      features: [
        '5 egyéni ágensek',
        'Korlátlan API hívások',
        'Email és chat támogatás',
        'Alapvető analytics',
        'Közösségi fórum hozzáférés',
      ],
    },
    {
      name: 'Business',
      price: '$999',
      period: '/hó',
      description: 'Középnagy vállalatok',
      features: [
        '50+ ügynökök',
        'Korlátlan API hívások',
        'Prioritás támogatás',
        'Fejlett analytics és reporting',
        'Testreszabott ágensek fejlesztése',
        'Dedikált account manager',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Egyedi',
      period: '',
      description: 'Nagyvállalati megoldások',
      features: [
        'Korlátlan ügynökök',
        'Dedikált szerver/felhő',
        '24/7 telefonos támogatás',
        'On-premise lehetőség',
        'Custom AI modellek',
        'SLA garancia',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      {/* YouTube background (true full-bleed cover) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[56.25vw] w-[177.78vh] h-[100vh]"
          src="https://www.youtube.com/embed/9h0tFmAlnIQ?autoplay=1&mute=1&controls=0&loop=1&playlist=9h0tFmAlnIQ&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Brunella Agent System Background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          tabIndex={-1}
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/70" aria-hidden="true" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Link
              href="/termekek"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a termékekhez
            </Link>

            <GsapFadeIn>
              <div className="text-6xl mb-6">🦾</div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">Brunella Agent System</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Autonóm AI ügynökök, amelyek a legbonyolultabb üzleti feladatokat végzik el. Takarítsa meg az idő
                80%-át, fokozza a termelékenységet, csökkentse a költségeket.
              </p>
              <Link href="/kapcsolat" className="btn-primary">
                Demó Kérése
              </Link>
            </GsapFadeIn>
          </div>
        </section>

        {/* Interactive Demos (below Hero, before Features) */}
        <OCRDemoSection />
        <AgentTerminalSection />

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Fő Jellemzők</h2>
                <p className="section-subtitle">Mindaz, amit az értelmes automatizáláshoz szükséges</p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.1}>
                  <SpotlightCard className="p-6">
                    <div className="text-purple-400 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Alkalmazási Esetek</h2>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.1}>
                  <SpotlightCard className="p-6">
                    <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                    <p className="text-gray-300">{useCase.description}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Felhasználók', value: '10K+' },
                { label: 'Telepített Ügynökök', value: '50K+' },
                { label: 'Automatizált Feladatok', value: '100M+' },
                { label: 'Évente Megtakarított Óra', value: '5M+' },
              ].map((stat, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard className="p-8 text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <p className="text-gray-300">{stat.label}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Árazási Csomagok</h2>
                <p className="section-subtitle">Rugalmas árazás az Ön igényeihez</p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard
                    className={`p-8 flex flex-col h-full ${plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''}`}
                  >
                    {plan.popular && (
                      <div className="mb-4 inline-block">
                        <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-300 text-xs font-bold">
                          AJÁNLOTT
                        </span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-300 mb-4">{plan.description}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>

                    <button className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} mb-6`}>
                      {plan.popular ? 'Kezdje el Most' : 'Válassza ezt'}
                    </button>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Hogyan Működik?</h2>
              </div>
            </GsapFadeIn>

            <div className="space-y-8">
              {[
                { step: 1, title: 'Létrehozás', desc: 'Definiálja az ügynök céljait és viselkedési szabályait' },
                { step: 2, title: 'Tanítás', desc: 'Az ügynök tanulja a specifikus feladatokat és munkafolyamatokat' },
                { step: 3, title: 'Telepítés', desc: 'Élesítse az ügynököt a termelési környezetben' },
                { step: 4, title: 'Monitorozás', desc: 'Valós idejű analytics és teljesítményelemzés' },
              ].map((item, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Mit Mondanak az Ügyfeleink</h2>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Dr. Nagy László',
                  role: 'CTO, Tech Corp',
                  quote: 'Az ügynökök feltöltötték a termelékenység 60%-ával.',
                },
                {
                  name: 'Kovács Zsuzsanna',
                  role: 'Operations Manager',
                  quote: 'A 80%-ával csökkent az adminisztratív munka, sokkal több idő jut a stratégiára.',
                },
              ].map((testimonial, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <SpotlightCard className="p-12 sm:p-16 text-center">
                <h2 className="text-4xl font-bold mb-6 gradient-text">Készüljön a következő szintre</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Egyedi Brunella Agents demó és konzultáció az Ön szükségleteire.
                </p>
                <Link href="/kapcsolat" className="btn-primary text-lg">
                  Demó Kérése Most
                </Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}