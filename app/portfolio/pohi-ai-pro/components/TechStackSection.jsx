import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { techStack } from './data';

export default function TechStackSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Alkalmazott Technológiák
          </h2>
        </GsapFadeIn>
        <div className="flex flex-wrap gap-3">
          {techStack.map(t => (
            <GsapFadeIn key={t.name}>
              <SpotlightCard className="px-4 py-2">
                <span className={`text-sm font-medium ${t.color}`}>{t.name}</span>
              </SpotlightCard>
            </GsapFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
