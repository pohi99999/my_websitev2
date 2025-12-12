'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../components/GsapFadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { ArrowRight, Zap, Lock, Code, Layers } from 'lucide-react';

export default function TermekekPage() {
  const products = [
    {
      name: 'Pohi AI Pro',
      description: 'Professzionális AI asszisztens fejlesztőknek és vállalkozásoknak',
      longDescription: 'Pohi AI Pro a legmodernebb mesterséges intelligencia technológiákat integrálja egyetlen platformba. Valós idejű feldolgozás, testreszabható modellek és könnyű API integráció.',
      image: '🤖',
      href: '/termekek/pohi-ai-pro',
      features: [
        'Valós idejű feldolgozás',
        'Testreszabható modellek',
        'API integráció',
        'Multi-language támogatás',
        'Advanced analytics',
      ],
      price: 'Egyedi árajánlat',
      icon: <Zap className="w-12 h-12" />,
    },
    {
      name: 'Brunella Agents',
      description: 'Intelligens autonóm ágensek folyamatok automatizálásához',
      longDescription: 'Brunella Agents a mesterséges intelligencia és robotika kombinációja. Autonóm döntéshozatal, multi-agent szimulációk és vállalati szintű megbízhatóság.',
      image: '🦾',
      href: '/termekek/brunella-agents',
      features: [
        'Autonóm döntéshozatal',
        'Multi-agent szimulációk',
        'Enterprise ready',
        'Monitoring és Logging',
        'Skálázható infrastruktúra',
      ],
      price: 'Egyedi árajánlat',
      icon: <Layers className="w-12 h-12" />,
    },
  ];

  const testimonials = [
    {
      text: 'Pohi AI Pro teljesen megváltoztatta az AI fejlesztési munkafolyamatainkat. Gyorsabb, könnyebb és hatékonyabb.',
      author: 'Dr. Bodnár László',
      role: 'Lead Developer, Tech Corp',
    },
    {
      text: 'Brunella Agents automatizálta az összes ismétlődő feladatunkat. 60% költségcsökkentés az első hónapban.',
      author: 'Szákó Katalin',
      role: 'Operations Manager, Manufacturing Co.',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold mb-6 gradient-text">
              Termékek
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Innovatív szoftver megoldások az Ön üzleti kihívásaira. Valódi technológia, valódi eredmények.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard
                  className="p-8 h-full flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold">{product.name}</h3>
                      <p className="text-gray-400">{product.price}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-6">{product.longDescription}</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-white mb-3">Főbb Jellemzők:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-blue-400 mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={product.href}
                    className="btn-primary mt-auto w-full text-center flex items-center justify-center"
                  >
                    Tudjon meg többet <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </SpotlightCard>
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
              <h2 className="section-title">Mit Mondanak a Felhasználók?</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard
                  className="p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
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
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Szeretné megtapasztalni a lehetőségeket?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Kérjen ingyenes demót vagy konzultációt az Ön igényei megismeréséhez.
              </p>
              <Link href="/kapcsolat" className="btn-primary">
                Kapcsolatfelvétel
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}