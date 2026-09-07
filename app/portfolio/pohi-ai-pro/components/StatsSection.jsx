import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { Users, Brain, Globe, CheckCircle } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { value: '3',       label: 'Felhasználói szerepkör', icon: Users,       color: 'text-blue-400'   },
    { value: 'Gemini',  label: 'AI motor',               icon: Brain,       color: 'text-purple-400' },
    { value: '100%',    label: 'Frontend alapú',         icon: Globe,       color: 'text-cyan-400'   },
    { value: 'Teljes',  label: 'Interaktív prototípus',  icon: CheckCircle, color: 'text-green-400'  },
  ];

  return (
    <section className="px-6 pb-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <GsapFadeIn key={s.label} delay={0.1 * i}>
              <SpotlightCard className="p-6 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </SpotlightCard>
            </GsapFadeIn>
          );
        })}
      </div>
    </section>
  );
}
