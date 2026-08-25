import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, CheckCircle, Zap, Layers, Code, Database, Shield, Cpu } from 'lucide-react';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Pohi AI Pro | Pohánka AI',
          description:
            'Custom AI portal system for customer records, orders, inventory and logistics optimization.',
          canonical: '/en/termekek/pohi-ai-pro',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Pohi AI Pro | Pohánka AI',
          description:
            'Individuelles KI-Portalsystem für Kundendaten, Bestellungen, Lagerbestand und Logistikoptimierung.',
          canonical: '/de/termekek/pohi-ai-pro',
          locale: 'de_DE',
        }
      : {
          title: 'Pohi AI Pro | Pohánka AI',
          description:
            'Pohi AI Pro: egyedi, fejlett portál és automatizációs rendszer – vevői adatbázis, rendelésállomány és készletkezelés összefésülése AI támogatással.',
          canonical: '/termekek/pohi-ai-pro',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/termekek/pohi-ai-pro',
        en: '/en/termekek/pohi-ai-pro',
        de: '/de/termekek/pohi-ai-pro',
        'x-default': '/termekek/pohi-ai-pro',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      locale: meta.locale,
      images: [{ url: '/images/logo.png', alt: 'Pohánka és Társa Kft. – logó' }],
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function PohiAIProPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to products',
            title: 'Pohi AI Pro',
            desc: 'A custom AI-enabled operations portal for customer data, orders, inventory and logistics coordination.',
            cta: 'Start free trial',
            sectionTitle: 'Core capabilities',
            sectionSubtitle: 'Designed for practical deployment and measurable business impact.',
            bullets: [
              'Unified customer/order/inventory layer',
              'Process automation with AI agents',
              'Scalable integration-first architecture',
              'Secure governance and operational transparency',
            ],
          }
        : {
            back: 'Zurück zu Produkten',
            title: 'Pohi AI Pro',
            desc: 'Ein individuelles KI-Portal für Kundendaten, Bestellungen, Lagerbestände und Logistikkoordination.',
            cta: 'Kostenlos testen',
            sectionTitle: 'Kernfunktionen',
            sectionSubtitle: 'Für produktive Einführung und messbaren geschäftlichen Nutzen konzipiert.',
            bullets: [
              'Vereinheitlichte Kunden-/Bestell-/Lager-Schicht',
              'Prozessautomatisierung mit KI-Agenten',
              'Skalierbare, integrationsorientierte Architektur',
              'Sichere Governance und transparente Abläufe',
            ],
          };

    return (
      <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
        <div className="fixed inset-0 z-[1] bg-black/70" aria-hidden="true" />
        <div className="relative z-10">
          <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <Link href={withLang('/termekek')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
                <ArrowLeft className="w-4 h-4" />
                {ui.back}
              </Link>
              <GsapFadeIn>
                <div className="text-6xl mb-6">🤖</div>
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">{ui.title}</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{ui.desc}</p>
                <Link href={withLang('/kapcsolat')} className="btn-primary">{ui.cta}</Link>
              </GsapFadeIn>
            </div>
          </section>

          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <SpotlightCard className="p-8">
                <h2 className="section-title mb-4">{ui.sectionTitle}</h2>
                <p className="section-subtitle mb-6">{ui.sectionSubtitle}</p>
                <ul className="space-y-3 text-left">
                  {ui.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Valós Idejű Feldolgozás',
      description: 'Azonnali válaszidő milliszekundum szintű latenciával.',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Testreszabható Modellek',
      description: 'Válasszon előre betanított modellek közül vagy készítse el a sajátat.',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'API Integráció',
      description: 'Egyszerű REST API és Python/JavaScript SDK-k.',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Adatkezelés',
      description: 'Biztonságos, titkosított adattárolás és feldolgozás.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Vállalati Biztonság',
      description: 'ISO 27001, SOC 2 compliance és GDPR megfelelőség.',
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Skálázhatóság',
      description: 'Automatikus skálázás az igények szerint 0-ról millió requestre.',
    },
  ];

  const useCases = [
    {
      title: 'E-commerce Personalizáció',
      description: 'Ajánlásrendszerek és dinamikus ár optimalizálás AI-val.',
    },
    {
      title: 'Ügyfélszolgálat Chatbotok',
      description: 'Automatizált támogatás 24/7 természetes nyelvfeldolgozással.',
    },
    {
      title: 'Adatelemzés és Insights',
      description: 'Valós idejű adatelemzés és üzleti intelligencia.',
    },
    {
      title: 'Dokumentum Feldolgozás',
      description: 'Automatikus szöveg- és dokumentum-felismerés.',
    },
    {
      title: 'Képfeldolgozás',
      description: 'Objektumfelismerés, szegmentáció és klasszifikáció.',
    },
    {
      title: 'Prediktív Analitika',
      description: 'Előrejelzések és trend analízis gépi tanulással.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/hó',
      description: 'Kis projektekhez és fejlesztéshez',
      features: [
        '10,000 API hívás/hó',
        '3 egyéni modell',
        'Email támogatás',
        'Szokásos támogatás órák',
      ],
    },
    {
      name: 'Professional',
      price: '$499',
      period: '/hó',
      description: 'Termelési használatra',
      features: [
        '100,000 API hívás/hó',
        'Korlátlan modellek',
        'Prioritás email + chat',
        '24/5 támogatás',
        'API monitoring',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Egyedi',
      period: '',
      description: 'Nagyvállalati megoldás',
      features: [
        'Korlátlan API hívások',
        'Dedikált infrastruktúra',
        '24/7 telefonos támogatás',
        'SLA garancia',
        'On-premise opció',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      {/* YouTube background (fixed + full-bleed cover) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[56.25vw] w-[177.78vh] h-[100vh]"
          src="https://www.youtube.com/embed/7sI8Y_TYnGw?autoplay=1&mute=1&controls=0&loop=1&playlist=7sI8Y_TYnGw&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Pohi AI Pro Background"
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
            <Link
              href="/termekek"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a termékekhez
            </Link>

            <GsapFadeIn>
              <div className="text-6xl mb-6">🤖</div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
                Pohi AI Pro
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Professzionális AI asszisztens, amely valódi üzleti értéket hoz. 
                Fejlesztőknek, adattudomány szakértőknek és vállalkozásoknak.
              </p>
              <Link href="/kapcsolat" className="btn-primary">
                Ingyenes Próba Indítása
              </Link>
            </GsapFadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Jellemzők</h2>
                <p className="section-subtitle">
                  Mindez egy modern, skálázható platformban
                </p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.1}>
                  <SpotlightCard
                    className="p-6"
                  >
                    <div className="text-blue-400 mb-4">{feature.icon}</div>
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
                <h2 className="section-title">Alkalmazási Területek</h2>
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

        {/* Pricing Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <GsapFadeIn>
              <div className="text-center mb-16">
                <h2 className="section-title">Árazás</h2>
                <p className="section-subtitle">
                  Válassza ki a legjobban megfelelő tervet
                </p>
              </div>
            </GsapFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard
                    className={`p-8 flex flex-col h-full ${
                      plan.popular ? 'ring-2 ring-blue-400 scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="mb-4 inline-block">
                        <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-bold">
                          NÉPSZERŰ
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
                      Válassza ezt a tervet
                    </button>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
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

        {/* Integration Section */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <div className="text-center">
                <h2 className="section-title">Integrációk</h2>
                <p className="section-subtitle">
                  Könnyűsen csatlakozik az Ön meglévő rendszereibe
                </p>
              </div>
            </GsapFadeIn>

            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-8 text-center mt-8">
                <p className="text-gray-300 mb-6">
                  REST API, Python SDK, JavaScript SDK, Node.js, React, Vue, Angular integráció
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Python', 'JavaScript', 'Node.js', 'React', 'API', 'Zapier'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-500/20 rounded-lg text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <SpotlightCard className="p-12 sm:p-16 text-center">
                <h2 className="text-4xl font-bold mb-6 gradient-text">
                  Kezdje el ma ingyen!
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Próbálja ki a Pohi AI Pro-t 14 napig díjmentesen. Nincs szükség bankkártyára.
                </p>
                <Link
                  href="/kapcsolat"
                  className="btn-primary text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 h-auto whitespace-normal text-center leading-tight"
                >
                  Ingyenes Próba Indítása
                </Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}