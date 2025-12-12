'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, CheckCircle, Brain, Zap, Gauge, Link2, Bot, BarChart3 } from 'lucide-react';

export default function BrunellaAgentsPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Autonóm Ágensek',
      description: 'Önállóan működő mesterséges intelligencia ügynökök.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Valós Idejű Döntéshozatal',
      description: 'Azonnali reagálás és intelligens válaszadás.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: 'Teljesítményelemzés',
      description: 'Részletes elemzés és hatékonyság nyomon követése.',
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: 'API Integráció',
      description: 'Zökkenőmentes csatlakozás külső rendszerekhez.',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Ügynök Framework',
      description: 'Fejlesztőbarát framework az egyéni ágensek kódolásához.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Monitorozás & Analytics',
      description: 'Teljes ellenőrzés és adatelemzés a felhőben.',
    },
  ];

  const useCases = [
    {
      title: 'Üzleti Folyamatok Automatizálása',
      description: 'Böngészést, adatgyűjtést és műveletek automatizálása végig a munkafolyamatokon.',
    },
    {
      title: 'Ügyfélszolgálat Automatizáció',
      description: 'Intelligens chatbotok, amely képes összetett feladatok megoldására.',
    },
    {
      title: 'Adatgyűjtés és Keresés',
      description: 'Webes adatgyűjtés, versenytárs monitorozás és piacelemzés.',
    },
    {
      title: 'Prediktív Karbantartás',
      description: 'Gépipar és logisztika: előrejelzések alapján karbantartási ütemezés.',
    },
    {
      title: 'Személyre Szabott Marketing',
      description: 'Ügyfélsegmentáció és kampányoptimalizálás automatikusan.',
    },
    {
      title: 'Kutatás és Fejlesztés',
      description: 'Automatikus kutatás, adatbázis-keresés és dokumentumfeldolgozás.',
    },
  ];

  const plans = [
    {
      name: 'Team',
      price: '$299',
      period: '/hó',
      description: 'Kis csapatoknak és startupoknak',
      features: [
        '5 egyéni ágensek',
        'Korlátlan API hívások',
        'Email és chat támogatás',
        'Alapvető analytics',
        'Közösségi fórum hozzáférés',
      ],
    },
    {
      name: 'Business',
      price: '$999',
      period: '/hó',
      description: 'Középnagy vállalatok',
      features: [
        '50+ ügynökök',
        'Korlátlan API hívások',
        'Prioritás támogatás',
        'Fejlett analytics és reporting',
        'Testreszabott ágensek fejlesztése',
        'Dedikált account manager',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Egyedi',
      period: '',
      description: 'Nagyvállalati megoldások',
      features: [
        'Korlátlan ügynökök',
        'Dedikált szerver/felhő',
        '24/7 telefonos támogatás',
        'On-premise lehetőség',
        'Custom AI modellek',
        'SLA garancia',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link
            href="/termekek"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Vissza a termékekhez
          </Link>

          <GsapFadeIn>
            <div className="text-6xl mb-6">🦾</div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              Brunella Agents
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Autonóm AI ügynökök, amelyek a legbonyolultabb üzleti feladatokat végzik el.
              Takarítsa meg az idő 80%-át, fokozza a termelékenységet, csökkentse a költségeket.
            </p>
            <Link href="/kapcsolat" className="btn-primary">
              Demó Kérése
            </Link>
          </GsapFadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Fő Jellemzők</h2>
              <p className="section-subtitle">
                Mindaz, amit az értelmes automatizáláshoz szükséges
              </p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard
                  className="p-6"
                >
                  <div className="text-purple-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Alkalmazási Esetek</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard
                  className="p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-gray-300">{useCase.description}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Felhasználók', value: '10K+' },
              { label: 'Telepített Ügynökök', value: '50K+' },
              { label: 'Automatizált Feladatok', value: '100M+' },
              { label: 'Évente Megtakarított Óra', value: '5M+' },
            ].map((stat, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard className="p-8 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Árazási Csomagok</h2>
              <p className="section-subtitle">
                Rugalmas árazás az Ön igényeihez
              </p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard
                  className={`p-8 flex flex-col h-full ${
                    plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="mb-4 inline-block">
                      <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-300 text-xs font-bold">
                        AJÁNLOTT
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <button className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} mb-6`}>
                    {plan.popular ? 'Kezdje el Most' : 'Válassza ezt'}
                  </button>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Hogyan Működik?</h2>
            </div>
          </GsapFadeIn>

          <div className="space-y-8">
            {[
              { step: 1, title: 'Létrehozás', desc: 'Definiálja az ügynök céljait és viselkedési szabályait' },
              { step: 2, title: 'Tanítás', desc: 'Az ügynök tanulja a specifikus feladatokat és munkafolyamatokat' },
              { step: 3, title: 'Telepítés', desc: 'Élesítse az ügynököt a termelési környezetben' },
              { step: 4, title: 'Monitorozás', desc: 'Valós idejű analytics és teljesítményelemzés' },
            ].map((item, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Mit Mondanak az Ügyfeleink</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Dr. Nagy László', role: 'CTO, Tech Corp', quote: 'Az ügynökök feltöltötték a termelékenység 60%-ával.' },
              { name: 'Kovács Zsuzsanna', role: 'Operations Manager', quote: 'A 80%-ával csökkent az adminisztratív munka, sokkal több idő jut a stratégiára.' },
            ].map((testimonial, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Készüljön a következő szintre
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Egyedi Brunella Agents demó és konzultáció az Ön szükségleteire.
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Demó Kérése Most
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}