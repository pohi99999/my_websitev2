import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { challenges } from './data';

export default function ChallengesSection() {
  return (
    <section className="px-6 py-16 bg-white/5">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Kihívások & Megoldások
          </h2>
          <p className="text-gray-400 mb-10 text-sm">Amit megtanultunk az építés során</p>
        </GsapFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, i) => {
            const I = c.icon;
            return (
              <GsapFadeIn key={c.title} delay={0.1 * i}>
                <SpotlightCard className="p-7">
                  <div className="flex items-start gap-4">
                    <I className={`w-6 h-6 shrink-0 mt-0.5 ${c.color}`} />
                    <div>
                      <h3 className="font-bold text-white mb-2">{c.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{c.desc}</p>
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
