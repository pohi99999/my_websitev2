import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { Layers, Activity, TrendingUp, FileText, Globe, Building2 } from 'lucide-react';

export default function RoadmapSection() {
  return (
    <section className="px-6 py-16 bg-white/5">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            A jövő útiterve
          </h2>
          <p className="text-gray-400 mb-8 text-sm">Erőteljes prototípusból globálisan skálázható platformmá</p>
        </GsapFadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Layers,    color: 'text-blue-400',   title: 'Teljes körű backend',    desc: 'localStorage → Node.js/Express + PostgreSQL vagy Firebase, többfelhasználós hitelesítéssel' },
            { icon: Activity,  color: 'text-green-400',  title: 'Valós idejű funkciók',   desc: 'WebSockets: valós idejű csevegés, üzletkötési tárgyalások, azonnali riasztások' },
            { icon: TrendingUp,color: 'text-purple-400', title: 'Prediktív analitika',    desc: 'Piaci áringadozás előrejelzés, jövőbeli keresleti gócpontok, ellátási lánc szűk keresztmetszetei' },
            { icon: FileText,  color: 'text-orange-400', title: 'Multimodális bemenetek', desc: 'Fuvarlevelek és tanúsítványok feltöltése — Gemini automatikusan kinyeri és ellenőrzi az adatokat' },
            { icon: Globe,     color: 'text-cyan-400',   title: 'Mobilalkalmazás',        desc: 'Natív app: üzenetek, üzletkötési értesítések, valós idejű szállítmánykövetés' },
            { icon: Building2, color: 'text-pink-400',   title: 'Ipari általánosítás',    desc: 'Nyersanyag-logika adaptálása mezőgazdaságra, fémpiacra, textiliparra' },
          ].map((item, i) => {
            const I = item.icon;
            return (
              <GsapFadeIn key={item.title} delay={0.08 * i}>
                <SpotlightCard className="p-6">
                  <I className={`w-5 h-5 mb-3 ${item.color}`} />
                  <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              </GsapFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
