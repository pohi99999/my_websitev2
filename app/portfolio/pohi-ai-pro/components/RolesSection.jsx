import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { CheckCircle } from 'lucide-react';
import { roles } from './data';

export default function RolesSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            3 Felhasználói Szerepkör
          </h2>
          <p className="text-gray-400 mb-10 text-sm">Mindenki megkapja, amire szüksége van — egy platformon belül</p>
        </GsapFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <GsapFadeIn key={role.title} delay={0.15 * i}>
                <SpotlightCard className={`p-7 h-full ${role.bg} border ${role.border}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${role.color}`} />
                    <h3 className={`text-xl font-bold ${role.color}`}>{role.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {role.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${role.color}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </GsapFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
