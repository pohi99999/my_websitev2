import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { Truck, Map, Bot, FileText, BarChart3, TrendingUp } from 'lucide-react';

export default function LogisticsSection() {
  return (
    <section className="px-6 py-16 bg-white/5">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-900/40 rounded-xl border border-blue-500/30">
              <Truck className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Logisztikai Irányítóközpont
              </h2>
              <p className="text-gray-400 text-sm">A platform zászlóshajó funkciója</p>
            </div>
          </div>
        </GsapFadeIn>
        <GsapFadeIn delay={0.1}>
          <SpotlightCard className="p-8">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Az adminisztrátor leghatékonyabb eszköze — egy interaktív, AI-vezérelt logisztikai tervező, amely egyetlen képernyőn hoz össze mindent.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Map,       color: 'text-blue-400',   text: 'Összes hozzá nem rendelt megrendelés és telephely interaktív térképen' },
                { icon: Bot,       color: 'text-purple-400', text: 'AI automatikusan feltölti a teherautókat — optimális kombináció térfogat és földrajzi közelség alapján' },
                { icon: Truck,     color: 'text-emerald-400',text: 'Teljes, optimalizált rakodási terv és többmegállós szállítási útvonal generálás' },
                { icon: FileText,  color: 'text-orange-400', text: 'AI-alapú szállítási dokumentumok (CMR, számla) automatikus generálása' },
                { icon: BarChart3, color: 'text-cyan-400',   text: 'Szállítási költségbecslés és fuvarszervezési optimalizálási tippek' },
                { icon: TrendingUp,color: 'text-pink-400',   text: 'Piaci kereslet-előrejelzés és anomália-detektálás Vertex AI-val' },
              ].map(item => {
                const I = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <I className={`w-5 h-5 shrink-0 mt-0.5 ${item.color}`} />
                    <p className="text-sm text-gray-300">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </SpotlightCard>
        </GsapFadeIn>
      </div>
    </section>
  );
}
