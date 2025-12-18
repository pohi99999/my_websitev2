import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft } from 'lucide-react';

import { CheckCircle, features, plans, useCases } from './brunella.data';

import AgentNetworkDemo from './components/AgentNetworkDemo';
import AgentTerminalSection from './components/AgentTerminalSection';
import BusinessLogicDemo from './components/BusinessLogicDemo';
import OCRDemoSection from './components/OCRDemoSection';
import SpreadsheetDemoSection from './components/SpreadsheetDemoSection';
import SafetyControlSection from './components/SafetyControlSection';
import DocumentationSection from './components/DocumentationSection';

export const metadata = {
  title: 'Brunella Agent System',
  description:
    'Brunella Agent System: autonóm AI ügynökök KKV-k számára. Automatizálás, monitorozás, üzleti workflow-k és human-in-the-loop kontroll egy rendszerben.',
  alternates: {
    canonical: '/termekek/brunella-agents'
  },
  openGraph: {
    title: 'Brunella Agent System',
    description:
      'Brunella Agent System: autonóm AI ügynökök KKV-k számára. Automatizálás, monitorozás, üzleti workflow-k és human-in-the-loop kontroll egy rendszerben.',
    url: '/termekek/brunella-agents',
    type: 'website',
    locale: 'hu_HU'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brunella Agent System',
    description:
      'Brunella Agent System: autonóm AI ügynökök KKV-k számára. Automatizálás, monitorozás, üzleti workflow-k és human-in-the-loop kontroll egy rendszerben.'
  }
};

export default function BrunellaAgentsPage() {
  const brunellaJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Brunella Agent System',
      description:
        'Autonóm AI ügynökök KKV-k számára. Automatizálás, monitorozás, üzleti workflow-k és human-in-the-loop kontroll egy rendszerben.',
      brand: {
        '@type': 'Organization',
        name: 'Pohánka és Társa Kft.'
      },
      url: 'https://pohanka.vercel.app/termekek/brunella-agents',
      offers: [
        {
          '@type': 'Offer',
          name: 'Team',
          price: '299',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '299',
            priceCurrency: 'USD',
            unitText: 'MONTH'
          },
          url: 'https://pohanka.vercel.app/kapcsolat',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Business',
          price: '999',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '999',
            priceCurrency: 'USD',
            unitText: 'MONTH'
          },
          url: 'https://pohanka.vercel.app/kapcsolat',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: '0',
          priceCurrency: 'USD',
          description: 'Egyedi árazás',
          url: 'https://pohanka.vercel.app/kapcsolat',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Brunella Agent System',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://pohanka.vercel.app/termekek/brunella-agents',
      description:
        'Autonóm AI ügynökök KKV-k számára. Automatizálás, monitorozás, üzleti workflow-k és human-in-the-loop kontroll egy rendszerben.',
      publisher: {
        '@type': 'Organization',
        name: 'Pohánka és Társa Kft.',
        url: 'https://pohanka.vercel.app'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Főoldal',
          item: 'https://pohanka.vercel.app/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Termékek',
          item: 'https://pohanka.vercel.app/termekek'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Brunella Agent System',
          item: 'https://pohanka.vercel.app/termekek/brunella-agents'
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brunellaJsonLd) }}
      />
      {/* YouTube background (true full-bleed cover) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[56.25vw] w-[177.78vh] h-[100vh]"
          src="https://www.youtube.com/embed/9h0tFmAlnIQ?autoplay=1&mute=1&controls=0&loop=1&playlist=9h0tFmAlnIQ&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Brunella Agent System Background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          tabIndex={-1}
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/70" aria-hidden="true" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Link href="/termekek" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Vissza a termékekhez
            </Link>

            <GsapFadeIn>
              <div className="text-6xl mb-6">🦾</div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">Brunella Agent System</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Autonóm AI ügynökök, amelyek a legbonyolultabb üzleti feladatokat végzik el. Takarítsa meg az idő
                80%-át, fokozza a termelékenységet, csökkentse a költségeket.
              </p>
              <Link href="/kapcsolat" className="btn-primary">
                Demó Kérése
              </Link>
            </GsapFadeIn>
          </div>
        </section>

        {/* Interactive Demos (below Hero, before Features) */}
        <OCRDemoSection />
        <SpreadsheetDemoSection />
        <AgentTerminalSection />
        <BusinessLogicDemo />
        <AgentNetworkDemo />
        <SafetyControlSection />

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Fő Jellemzők</h2>
                <p className="section-subtitle">Mindaz, amit az értelmes automatizáláshoz szükséges</p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.1}>
                  <SpotlightCard className="p-6">
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
                  <SpotlightCard className="p-6">
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
                { label: 'Évente Megtakarított Óra', value: '5M+' }
              ].map((stat, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard className="p-8 text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
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
                <p className="section-subtitle">Rugalmas árazás az Ön igényeihez</p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard
                    className={`p-8 flex flex-col h-full ${plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''}`}
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
                { step: 4, title: 'Monitorozás', desc: 'Valós idejű analytics és teljesítményelemzés' }
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
                {
                  name: 'Dr. Nagy László',
                  role: 'CTO, Tech Corp',
                  quote: 'Az ügynökök feltöltötték a termelékenység 60%-ával.'
                },
                {
                  name: 'Kovács Zsuzsanna',
                  role: 'Operations Manager',
                  quote: 'A 80%-ával csökkent az adminisztratív munka, sokkal több idő jut a stratégiára.'
                }
              ].map((testimonial, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
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
                <h2 className="text-4xl font-bold mb-6 gradient-text">Készüljön a következő szintre</h2>
                <p className="text-lg text-gray-300 mb-8">Egyedi Brunella Agents demó és konzultáció az Ön szükségleteire.</p>
                <Link
                  href="/kapcsolat"
                  className="btn-primary text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 h-auto whitespace-normal text-center leading-tight"
                >
                  Demó Kérése Most
                </Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>

        <DocumentationSection />
      </div>
    </div>
  );
}
