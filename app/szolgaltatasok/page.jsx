'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../components/GsapFadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { Code, Brain, Cloud, CheckCircle, Zap, Database, Users, Gauge } from 'lucide-react';

export default function SzolgaltatasokPage() {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Egyedi Szoftverfejlesztés',
      description: 'Testreszabott szoftvermegoldások, amelyek tökéletesen illeszkednek vállalkozása egyedi igényeihez.',
      features: ['Teljes körű fejlesztés', 'Modern technológiák', 'Agile módszertan', 'Folyamatos támogatás'],
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Mesterséges Intelligencia',
      description: 'AI-alapú automatizáció és adatelemzés az ügyfeleink üzleti hatékonysága növelésére.',
      features: ['Machine Learning modellek', 'Adatanalitika', 'NLP megoldások', 'Prediktív modellek'],
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: 'Felhő Infrastruktúra',
      description: 'Skálázható és megbízható felhőalapú rendszerek tervezése és implementálása.',
      features: ['AWS integráció', 'Google Cloud Platform', 'Azure services', 'DevOps megoldások'],
    },
  ];

  const process = [
    { step: 1, title: 'Konzultáció', description: 'Megismerjük az Ön igényeit és céljait' },
    { step: 2, title: 'Tervezés', description: 'Részletes terv és ütemterv elkészítése' },
    { step: 3, title: 'Fejlesztés', description: 'Iteratív fejlesztés és tesztelés' },
    { step: 4, title: 'Támogatás', description: 'Folyamatos támogatás és karbantartás' },
  ];

  const capabilities = [
    { icon: <Zap className="w-8 h-8" />, label: 'Gyors Fejlesztés' },
    { icon: <Database className="w-8 h-8" />, label: 'Adatkezelés' },
    { icon: <Users className="w-8 h-8" />, label: 'Csapatmunka' },
    { icon: <Gauge className="w-8 h-8" />, label: 'Teljesítmény' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              Szolgáltatásaink
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professzionális megoldásokat kínálunk a digitális világ minden kihívására. Csapatunk a legmodernebb technológiákat alkalmazza, hogy az Ön vállalkozása elérje céljait.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard className="p-8 h-full flex flex-col">
                  <div className="text-blue-400 mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Képességeink</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard className="p-6 text-center">
                  <div className="text-blue-400 flex justify-center mb-3">{cap.icon}</div>
                  <p className="text-gray-300 text-sm font-medium">{cap.label}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Megvalósítási Folyamatunk</h2>
              <p className="section-subtitle">Hogyan dolgozunk az Ön projektjén</p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, idx) => (
              <GsapFadeIn key={item.step} delay={idx * 0.1}>
                <SpotlightCard className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-12">
              <h2 className="section-title">Technológiai Stack</h2>
            </div>
          </GsapFadeIn>

          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['Python', 'Next.js', 'React', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Node.js'].map((tech, i) => (
                  <div key={i} className="text-center py-4">
                    <span className="px-4 py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm font-medium">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Miért Mi?</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tapasztalat', desc: '15+ év az iparban' },
              { title: 'Csapat', desc: '21+ dedikált szakember' },
              { title: 'Projektek', desc: '50+ sikeres projekt' },
            ].map((item, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard className="p-8 text-center">
                  <h3 className="text-2xl font-bold gradient-text mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Készen Vagyunk az Indulásra
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Keresse meg csapatunkat, és kezdjünk el egy új projekttel.
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Lépjen Velünk Kapcsolatba
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}