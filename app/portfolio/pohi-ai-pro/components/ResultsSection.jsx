import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { results } from './data';

export default function ResultsSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Amire büszkék vagyunk
          </h2>
        </GsapFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((r, i) => {
            const I = r.icon;
            return (
              <GsapFadeIn key={r.title} delay={0.1 * i}>
                <SpotlightCard className="p-7">
                  <div className="flex items-start gap-4">
                    <I className={`w-6 h-6 shrink-0 mt-0.5 ${r.color}`} />
                    <div>
                      <h3 className="font-bold text-white mb-2">{r.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </GsapFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
