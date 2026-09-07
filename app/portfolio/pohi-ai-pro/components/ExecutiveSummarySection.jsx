import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { CheckCircle } from 'lucide-react';
import { pohiNarrative } from './data';

export default function ExecutiveSummarySection() {
  return (
    <>
      {/* ── Executive Summary (EN) ── */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30 mb-4">
              {pohiNarrative.en.badge}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{pohiNarrative.en.tagline}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{pohiNarrative.en.headline}</h2>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8 mb-8">
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{pohiNarrative.en.body}</p>
            </SpotlightCard>
          </GsapFadeIn>
          {/* EN pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {pohiNarrative.en.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <GsapFadeIn key={p.title} delay={0.1 * i}>
                  <SpotlightCard className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 shrink-0 ${p.color}`} />
                      <h3 className={`font-semibold text-sm ${p.color}`}>{p.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.body}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
          {/* EN roadmap */}
          <GsapFadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {pohiNarrative.en.roadmap.map((stage, i) => (
                <SpotlightCard key={stage.phase} className={`p-5 ${i === 0 ? 'border border-purple-500/40' : i === 1 ? 'border border-blue-500/30' : 'border border-gray-500/20'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-purple-400' : i === 1 ? 'text-blue-400' : 'text-gray-400'}`}>{stage.phase}</p>
                  <ul className="space-y-1">
                    {stage.items.map(item => (
                      <li key={item} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <CheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${i === 0 ? 'text-purple-400' : i === 1 ? 'text-blue-400' : 'text-gray-500'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* ── Executive Summary (DE) ── */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs border border-cyan-500/30 mb-4">
              🇩🇪 {pohiNarrative.de.badge}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{pohiNarrative.de.tagline}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{pohiNarrative.de.headline}</h2>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8 mb-8">
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{pohiNarrative.de.body}</p>
            </SpotlightCard>
          </GsapFadeIn>
          {/* DE pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {pohiNarrative.de.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <GsapFadeIn key={p.title} delay={0.1 * i}>
                  <SpotlightCard className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 shrink-0 ${p.color}`} />
                      <h3 className={`font-semibold text-sm ${p.color}`}>{p.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.body}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
          {/* DE roadmap */}
          <GsapFadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {pohiNarrative.de.roadmap.map((stage, i) => (
                <SpotlightCard key={stage.phase} className={`p-5 ${i === 0 ? 'border border-cyan-500/40' : i === 1 ? 'border border-blue-500/30' : 'border border-gray-500/20'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-cyan-400' : i === 1 ? 'text-blue-400' : 'text-gray-400'}`}>{stage.phase}</p>
                  <ul className="space-y-1">
                    {stage.items.map(item => (
                      <li key={item} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <CheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${i === 0 ? 'text-cyan-400' : i === 1 ? 'text-blue-400' : 'text-gray-500'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>
          </GsapFadeIn>
        </div>
      </section>
    </>
  );
}
