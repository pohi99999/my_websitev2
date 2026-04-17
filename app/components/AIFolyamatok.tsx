"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Brain, Bot, BarChart3, Mail, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';
import Card from './Card';

export default function AIFolyamatok ()
{
  const { language } = useLanguage();
  const withLang = ( href: string ) =>
  {
    if ( language === 'hu' ) return href;
    if ( href === '/' ) return `/${ language }`;
    return href.startsWith( '/' ) ? `/${ language }${ href }` : href;
  };

  if ( language !== 'hu' )
  {
    const ui =
      language === 'en'
        ? {
          title: 'AI systems built around your business',
          subtitle: 'We turn operational bottlenecks into practical AI systems with measurable business impact.',
          phases: [
            'Automation: remove repetitive work and accelerate workflows',
            'Decision support: reports, insights and AI-generated recommendations',
            'Cost-effective rollout: pilot, measure, tune and scale',
          ],
          details: 'View services',
          contact: 'Request AI system review',
        }
        : {
          title: 'KI-Systeme, die zu Ihrem Unternehmen passen',
          subtitle: 'Wir verwandeln operative Engpässe in praxisnahe KI-Systeme mit messbarem Geschäftsnutzen.',
          phases: [
            'Automatisierung: wiederkehrende Arbeit reduzieren und Abläufe beschleunigen',
            'Entscheidungsunterstützung: Reports, Erkenntnisse und KI-Empfehlungen',
            'Kosteneffizienter Rollout: Pilot, Messen, Feinabstimmung, Skalierung',
          ],
          details: 'Services ansehen',
          contact: 'KI-Systemprüfung anfragen',
        };

    return (
      <section className="py-24 px-6 bg-surface-0 text-white" style={{ background: 'rgba(0,0,0,0.82)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="heading-display text-4xl md:text-5xl font-bold mb-5 text-[#00e5ff]">
              {ui.title}
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{ui.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ui.phases.map( ( phase ) => (
              <Card
                key={phase}
                variant="highlight"
                className="h-full p-7"
              >
                <Sparkles className="w-5 h-5 text-[#00e5ff] mb-3" />
                <p className="text-gray-300 leading-relaxed">{phase}</p>
              </Card>
            ) )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Secondary: minimal underline */}
            <Link
              href={withLang( '/szolgaltatasok' )}
              className="group inline-flex flex-col items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-widest"
              onClick={() =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.AiWorkflowServices,
                  language,
                  target: '/szolgaltatasok',
                  page: PAGE_NAMES.Home,
                } )
              }
            >
              <span className="flex items-center gap-2">
                {ui.details}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span
                className="block h-px bg-[#00e5ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"
                aria-hidden="true"
              />
            </Link>

            {/* Primary: HUD octagon */}
            <Link
              href={withLang( '/kapcsolat' )}
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all duration-300"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
              onClick={() =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.AiWorkflowContact,
                  language,
                  target: '/kapcsolat',
                  page: PAGE_NAMES.Home,
                } )
              }
            >
              {ui.contact}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const services = [
    {
      icon: Brain,
      title: 'AI rendszerek tervezése és kiépítése',
      desc: 'Egyedi AI rendszerek, automatizálások és intelligens döntéstámogatás vállalkozások számára — az üzleti célokhoz igazítva.',
      bullets: [
        'Folyamatautomatizálás és workflow optimalizálás',
        'AI komponensek és üzleti folyamatok összekapcsolása',
        'Pilot, mérés, finomhangolás, skálázás',
      ],
    },
    {
      icon: Zap,
      title: 'Folyamatautomatizálás és workflow optimalizálás',
      desc: 'A kézi adminisztrációt és ismétlődő lépéseket olyan automatizmusokkal váltjuk ki, amelyek gyorsítják a napi működést.',
      bullets: ['Ismétlődő munkafolyamatok kiváltása', 'Gyorsabb átfutási idők', 'Kevesebb manuális hiba'],
    },
    {
      icon: BarChart3,
      title: 'Intelligens döntéstámogatás és riporting',
      desc: 'Adatelemzésekből, riportokból és AI-alapú javaslatokból érthető, vezetői döntéstámogatást építünk.',
      bullets: ['Adatok, riportok és összefoglalók', 'AI-alapú javaslatok', 'Vezetői áttekinthetőség'],
    },
    {
      icon: Mail,
      title: 'CRM, email, ügyfélszolgálat és admin integráció',
      desc: 'Összekötjük a napi üzleti rendszereket, hogy a csapatod egy egységes, automatizált működésben dolgozhasson.',
      bullets: ['CRM és belső rendszerek', 'Email és ügyfélszolgálat', 'Admin és dokumentumfolyamatok'],
    },
    {
      icon: Target,
      title: 'Pilot, mérés, finomhangolás, skálázás',
      desc: 'Kis kockázatú bevezetéssel indulunk, mérjük az eredményeket, majd fokozatosan skálázzuk a megoldást.',
      bullets: ['Gyors pilot', 'KPI-alapú mérés', 'Biztonságos skálázás'],
    },
    {
      icon: Shield,
      title: 'Brunella / BAS bizonyíték',
      desc: 'Saját, élesben futó rendszerünkön bizonyítjuk, hogyan néz ki a valódi AI-orchestration és vállalati bevezetés.',
      bullets: ['Valós orchestration tapasztalat', 'Működésközpontú szemlélet', 'Testreszabható bevezetés'],
      refs: [{ text: 'Brunella / BAS rendszer', url: withLang( '/termekek/brunella-agents' ) }],
    },
  ];

  return (
    <section id="ai-folyamatok" className="py-24 px-6 relative bg-surface-0" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="hud-badge text-sm font-medium mb-6">
            <Bot className="w-4 h-4" /> Vállalkozásra szabott AI rendszerek
          </div>
          <h2
            className="heading-display text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{
              color: '#00e5ff',
              textShadow: '0 0 40px rgba(0, 229, 255, 0.25)',
            }}
          >
            AI rendszer, ami a vállalkozásodra van szabva
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Olyan AI rendszereket építünk vállalkozásoknak, amelyek nem különálló eszközök,
            hanem a napi működésbe integrált, mérhető üzleti értéket termelő megoldások.
          </p>
        </div>

        {/* Top business pillars + proof */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <Card variant="highlight" className="h-full lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <Zap className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">PILLÉR 1</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Automatizálás</h3>
            <ul className="space-y-1.5">
              {['Ismétlődő folyamatok kiváltása', 'Workflow optimalizálás', 'Admin terhelés csökkentése'].map( ( b ) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  {b}
                </li>
              ) )}
            </ul>
          </Card>

          <Card variant="highlight" className="h-full lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <BarChart3 className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">PILLÉR 2</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Intelligens döntéstámogatás</h3>
            <ul className="space-y-1.5">
              {['Riportok, elemzések és összefoglalók', 'AI-alapú javaslatok', 'Gyorsabb vezetői döntések'].map( ( b ) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  {b}
                </li>
              ) )}
            </ul>
          </Card>

          <Card variant="highlight" className="h-full lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <Target className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">PILLÉR 3</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Költséghatékony bevezetés</h3>
            <ul className="space-y-1.5">
              {['A cég méretéhez illesztett megoldás', 'Mérhető pilot és tesztelés', 'Skálázható bevezetési terv'].map( ( b ) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  {b}
                </li>
              ) )}
            </ul>
          </Card>

          <Card variant="premium" className="h-full lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <Shield className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">PROOF</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Brunella / BAS bizonyíték</h3>
            <ul className="space-y-1.5 mb-4">
              {['Saját, élesben futó rendszer', 'Valós AI orchestration tapasztalat', 'Testreszabható vállalati bevezetés'].map( ( b ) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  {b}
                </li>
              ) )}
            </ul>
            <Link
              href={withLang( '/termekek/brunella-agents' )}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#00e5ff] hover:text-white transition-colors"
            >
              Brunella / BAS rendszer
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map( ( s, index ) =>
          {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                variant={index === 0 ? 'premium' : 'highlight'}
                className="h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                    <Icon className="w-6 h-6 text-[#00e5ff]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.bullets.map( ( b ) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-[#00e5ff] shrink-0 font-bold">→</span>
                      {b}
                    </li>
                  ) )}
                </ul>
              </Card>
            );
          } )}
        </div>

        {/* Bottom CTA */}
        <div className="surface-panel-premium p-10 text-center">
          {/* HUD corner brackets on CTA box */}
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00e5ff] mx-auto mb-4" />
            <h3 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">
              Melyik üzleti folyamatból építsük meg az első AI rendszert?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Egy rövid felmérés során feltérképezzük, hol hozza a legnagyobb hatást az AI rendszer,
              és megmutatjuk, hogy néz ki az első 30 nap üzleti fókuszú bevezetése.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary: HUD octagon */}
              <Link
                href={withLang( '/kapcsolat' )}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
                onClick={() =>
                  trackCtaClick( {
                    location: CTA_LOCATIONS.AiWorkflowContactHu,
                    language,
                    target: '/kapcsolat',
                    page: PAGE_NAMES.Home,
                  } )
                }
              >
                Kérek AI rendszerfelmérést <ArrowRight size={18} />
              </Link>

              {/* Secondary: thin border */}
              <Link
                href={withLang( '/szolgaltatasok' )}
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-[#00e5ff]/40 text-gray-400 hover:text-white font-semibold px-8 py-4 transition-all duration-300 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackCtaClick( {
                    location: CTA_LOCATIONS.AiWorkflowServicesHu,
                    language,
                    target: '/szolgaltatasok',
                    page: PAGE_NAMES.Home,
                  } )
                }
              >
                Megnézem a szolgáltatásokat <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
