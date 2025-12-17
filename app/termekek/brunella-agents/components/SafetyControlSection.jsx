'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EyeOff, Scale, Shield, UserCheck } from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';

export default function SafetyControlSection() {
  const shouldReduceMotion = useReducedMotion();

  const pillars = useMemo(
    () => [
      {
        icon: UserCheck,
        title: 'Ember a Hurokban',
        desc: 'Kritikus döntéseket (pl. utalás, publikálás) soha nem hoz meg az AI jóváhagyás nélkül.',
        tone: 'from-cyan-500/20 to-blue-500/10',
        iconTone: 'text-cyan-200',
        badge: 'Human-in-the-loop'
      },
      {
        icon: EyeOff,
        title: 'Adatvédelem',
        desc: 'Érzékeny adatok (PII, kulcsok) automatikus maszkolása és elkülönített kezelése.',
        tone: 'from-blue-500/20 to-indigo-500/10',
        iconTone: 'text-blue-200',
        badge: 'Masked: ***'
      },
      {
        icon: Scale,
        title: 'Alkotmányos AI',
        desc: 'Beépített etikai kódex, ami garantálja a biztonságos és segítőkész működést.',
        tone: 'from-indigo-500/20 to-purple-500/10',
        iconTone: 'text-indigo-200',
        badge: 'Ethical guardrails'
      }
    ],
    []
  );

  const PillarCard = ({ icon: Icon, title, desc, tone, iconTone, badge }) => (
    <SpotlightCard className="p-0 overflow-hidden h-full">
      <div className={`px-5 py-4 border-b border-white/10 bg-gradient-to-r ${tone}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 border border-white/10">
              <Icon className={`w-5 h-5 ${iconTone}`} />
            </div>
            <div>
              <div className="text-[11px] text-gray-300">Pillér</div>
              <div className="text-white font-extrabold">{title}</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-300 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 whitespace-nowrap">
            {badge}
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 bg-black/35">
        <p className="text-sm text-gray-200 leading-relaxed">{desc}</p>
      </div>
    </SpotlightCard>
  );

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Biztonság &amp; Kontroll</span>
            </div>
            <h2 className="section-title">Maximális Biztonság, Teljes Kontroll</h2>
            <p className="section-subtitle">A Human-in-the-loop garancia: Az AI a motor, de Ön fogja a kormányt.</p>
          </div>
        </GsapFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-start-2 lg:row-start-2">
              <SpotlightCard className="p-0 overflow-hidden h-full">
                <div className="relative p-8 sm:p-10 bg-black/35 min-h-[240px] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.16),transparent_60%),radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.10),transparent_65%)]" />

                  <motion.div
                    className="relative"
                    animate={
                      shouldReduceMotion
                        ? { scale: 1 }
                        : {
                            scale: [1, 1.05, 1],
                            filter: [
                              'drop-shadow(0 0 22px rgba(34,211,238,0.25))',
                              'drop-shadow(0 0 34px rgba(59,130,246,0.30))',
                              'drop-shadow(0 0 22px rgba(34,211,238,0.25))'
                            ]
                          }
                    }
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full border border-cyan-400/35 bg-gradient-to-b from-white/10 to-black/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_44px_rgba(34,211,238,0.14)]">
                      <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                        <Shield className="w-11 h-11 text-cyan-200" />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <div className="text-sm text-gray-300">Központi védelem</div>
                      <div className="text-lg font-extrabold text-white">Biztonsági pajzs</div>
                      <div className="text-xs text-gray-400 mt-1">Jóváhagyás • Maszkolás • Etikus keretek</div>
                    </div>
                  </motion.div>
                </div>
              </SpotlightCard>
            </div>

            <div className="lg:col-start-2 lg:row-start-1">
              <PillarCard {...pillars[0]} />
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <PillarCard {...pillars[1]} />
            </div>

            <div className="lg:col-start-3 lg:row-start-2">
              <PillarCard {...pillars[2]} />
            </div>

            <div className="hidden lg:block lg:col-start-2 lg:row-start-3" aria-hidden="true" />
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { k: 'Jóváhagyás', v: 'minden kritikus lépésnél' },
            { k: 'Maszkolás', v: 'PII / kulcsok: ***' },
            { k: 'Keretek', v: 'etikus szabályrendszer' }
          ].map((stat) => (
            <div key={stat.k} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs text-gray-400">{stat.k}</div>
              <div className="text-lg font-bold gradient-text">{stat.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
