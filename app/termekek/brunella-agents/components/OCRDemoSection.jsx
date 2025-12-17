'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scan } from 'lucide-react';

import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { useLoopingTypewriter } from '../../../hooks/useTypewriter';

export default function OCRDemoSection() {
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
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(34,211,238,0.14), transparent 40%, rgba(34,211,238,0.14))'
                  }}
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
                    <motion.div className="h-1 w-28 rounded-full bg-white/10 overflow-hidden" initial={false}>
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
                  {[
                    { k: 'Invoice ID', v: 'INV-2025-0917' },
                    { k: 'Date', v: '2025-09-17' },
                    { k: 'Vendor', v: 'Pohánka & Társa' },
                    { k: 'Total', v: '1,249,000 HUF' }
                  ].map((chip) => (
                    <div key={chip.k} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <div className="text-[11px] text-gray-400">{chip.k}</div>
                      <div className="text-xs text-gray-200 font-semibold truncate">{chip.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
