"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Brain, Bot, BarChart3, Mail, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

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
          title: 'How We Build AI Workflows',
          subtitle: 'From process diagnosis to deployment-ready automation in clear, measurable phases.',
          phases: [
            'Process mapping and bottleneck discovery',
            'Solution architecture and AI integration design',
            'Implementation, testing and operational rollout',
          ],
          details: 'View services',
          contact: 'Request consultation',
        }
        : {
          title: 'So bauen wir KI-Workflows',
          subtitle: 'Von der Prozessdiagnose bis zur produktiven Automatisierung in klaren, messbaren Phasen.',
          phases: [
            'Prozessanalyse und Engpass-Erkennung',
            'Lösungsarchitektur und KI-Integrationsdesign',
            'Implementierung, Tests und operativer Rollout',
          ],
          details: 'Services ansehen',
          contact: 'Beratung anfragen',
        };

    return (
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-[#00e5ff]">
              { ui.title }
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{ ui.subtitle }</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            { ui.phases.map( ( phase ) => (
              <div
                key={ phase }
                className="bg-white/3 border border-white/8 p-7 hover:border-[#00e5ff]/30 transition-colors duration-200"
              >
                <Sparkles className="w-5 h-5 text-[#00e5ff] mb-3" />
                <p className="text-gray-300 leading-relaxed">{ phase }</p>
              </div>
            ) ) }
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Secondary: minimal underline */ }
            <Link
              href={ withLang( '/szolgaltatasok' ) }
              className="group inline-flex flex-col items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-widest"
              onClick={ () =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.AiWorkflowServices,
                  language,
                  target: '/szolgaltatasok',
                  page: PAGE_NAMES.Home,
                } )
              }
            >
              <span className="flex items-center gap-2">
                { ui.details }
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span
                className="block h-px bg-[#00e5ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"
                aria-hidden="true"
              />
            </Link>

            {/* Primary: HUD octagon */ }
            <Link
              href={ withLang( '/kapcsolat' ) }
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all duration-300"
              style={ {
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              } }
              onClick={ () =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.AiWorkflowContact,
                  language,
                  target: '/kapcsolat',
                  page: PAGE_NAMES.Home,
                } )
              }
            >
              { ui.contact }
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const services = [
    {
      icon: Target,
      title: 'Intelligens Lead Generálás',
      desc: 'Az AI naponta kiszűri azokat a vállalkozásokat, akiknek a legnagyobb szükségük van a te szolgáltatásodra.',
      bullets: ['Fájdalompontszám alapú priorizálás', 'Automatikus digitális állapotjelentés', 'Iparág-specifikus célzás'],
    },
    {
      icon: Mail,
      title: 'Automatikus Outreach Kampányok',
      desc: 'Személyre szabott emailek, automatikus kiküldés, follow-up emlékeztetők — minden a rendszer csinálja.',
      bullets: ['Ütemezett kiküldés', 'Automatikus follow-up', 'Státuszkövetés'],
    },
    {
      icon: Zap,
      title: 'Üzleti Folyamatok Automatizálása',
      desc: 'Amit ma kézzel csinálsz — holnaptól csinálja helyetted a rendszer.',
      bullets: ['OCR feldolgozás', 'Automatikus riportok', 'Email osztályozás'],
    },
    {
      icon: Brain,
      title: 'AI Ügynökök Telepítése',
      desc: 'A Brunella Agent System ügynökei valódi üzleti feladatokat végeznek.',
      bullets: ['Öngyógyító működés', 'RAG memória', '24/7 futás'],
    },
    {
      icon: BarChart3,
      title: 'Piackutatás & Versenytárs Elemzés',
      desc: 'Folyamatos iparági monitoring versenytársakra, trendekre és lehetőségekre.',
      bullets: ['Napi összefoglaló', 'Pályázatfigyelés', 'Árkövetés'],
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Tartalom Automatizálás',
      desc: 'SEO cikkek, social posztok és hirdetésszövegek AI-val gyorsítva.',
      bullets: ['SEO tartalom', 'Közösségi ütemezés', 'A/B kreatívok'],
    },
  ];

  return (
    <section id="ai-folyamatok" className="py-24 px-6 relative bg-black">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */ }
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00e5ff]/20 bg-[#00e5ff]/5 text-[#00e5ff] text-sm font-medium mb-6">
            <Bot className="w-4 h-4" /> AI ügynökök · 24/7 · Emberi felügyelet nélkül
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={ {
              color: '#00e5ff',
              textShadow: '0 0 40px rgba(0, 229, 255, 0.25)',
            } }
          >
            Automatizált és AI Ügynöki<br className="hidden md:block" /> Folyamatok
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Nem chatbotok, nem egyszerű szkriptek — hanem gondolkodó AI ügynökök, amelyek
            valódi üzleti feladatokat látnak el. Lead szerzés, marketing, adminisztráció,
            piackutatás: mind automatikusan, miközben te a fontos dolgokra figyelsz.
          </p>
        </div>

        {/* Top 4 product cards */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {/* Könyvelési Automatizálás */ }
          <div className="bg-[#00e5ff]/3 border border-[#00e5ff]/20 p-6 hover:border-[#00e5ff]/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <BarChart3 className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">ÚJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Könyvelési Automatizálás</h3>
            <ul className="space-y-1.5">
              { ['Automatikus számla-feldolgozás OCR-rel', 'Bank-egyeztetés & NAV-ellenőrzés', 'Valós idejű pénzügyi irányítópult'].map( ( b ) => (
                <li key={ b } className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  { b }
                </li>
              ) ) }
            </ul>
          </div>

          {/* Nova AI Asszisztens */ }
          <div className="bg-[#00e5ff]/3 border border-[#00e5ff]/20 p-6 hover:border-[#00e5ff]/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <Brain className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">ÚJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Nova — AI Asszisztens</h3>
            <ul className="space-y-1.5">
              { ['Megismeri a vállalkozásodat, egyre okosabb', 'Napi operatív segítség hangalapú kommunikációval', '24/7 elérhető vállalkozói társ'].map( ( b ) => (
                <li key={ b } className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  { b }
                </li>
              ) ) }
            </ul>
          </div>

          {/* P-Sales */ }
          <div className="bg-[#00e5ff]/3 border border-[#00e5ff]/20 p-6 hover:border-[#00e5ff]/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <TrendingUp className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">ÚJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">P-Sales — Ingatlan Értékesítő</h3>
            <ul className="space-y-1.5">
              { ['Dokumentumfelmérés & piackutatás ügynökökkel', 'Egyedi értékesítési stratégia és akcióterv', 'Jóváhagyás után automatikus végrehajtás'].map( ( b ) => (
                <li key={ b } className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  { b }
                </li>
              ) ) }
            </ul>
          </div>

          {/* P-Search */ }
          <div className="bg-[#00e5ff]/3 border border-[#00e5ff]/20 p-6 hover:border-[#00e5ff]/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                <Target className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <span className="text-xs font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5">ÚJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">P-Search — Pályázat & Hitelkereső</h3>
            <ul className="space-y-1.5">
              { ['Folyamatos EU/HU pályázat- és hitelfigyelm', 'Személyre szabott találatok összefoglalóval', 'Kanban követés & határidő értesítők'].map( ( b ) => (
                <li key={ b } className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="text-[#00e5ff] shrink-0 font-bold mt-[1px]">■</span>
                  { b }
                </li>
              ) ) }
            </ul>
          </div>
        </div>

        {/* Services grid */ }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          { services.map( ( s ) =>
          {
            const Icon = s.icon;
            return (
              <div
                key={ s.title }
                className="bg-white/3 border border-white/8 p-6 hover:border-[#00e5ff]/40 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00e5ff]/5 border border-[#00e5ff]/15">
                    <Icon className="w-6 h-6 text-[#00e5ff]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{ s.title }</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{ s.desc }</p>
                <ul className="space-y-1.5">
                  { s.bullets.map( ( b ) => (
                    <li key={ b } className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-[#00e5ff] shrink-0 font-bold">→</span>
                      { b }
                    </li>
                  ) ) }
                </ul>
              </div>
            );
          } ) }
        </div>

        {/* Bottom CTA */ }
        <div className="border border-[#00e5ff]/20 bg-[#00e5ff]/3 p-10 text-center">
          {/* HUD corner brackets on CTA box */ }
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00e5ff] mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Melyik folyamatot automatizáljuk elsőként?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Egy ingyenes konzultáción felmérjük, hol lehet a legnagyobb hatása az AI bevezetésének
              a vállalkozásodban — és megmutatjuk, hogy néz ki az első 30 nap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary: HUD octagon */ }
              <Link
                href={ withLang( '/szolgaltatasok' ) }
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all duration-300"
                style={ {
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                } }
                onClick={ () =>
                  trackCtaClick( {
                    location: CTA_LOCATIONS.AiWorkflowServicesHu,
                    language,
                    target: '/szolgaltatasok',
                    page: PAGE_NAMES.Home,
                  } )
                }
              >
                Összes szolgáltatás <ArrowRight size={ 18 } />
              </Link>

              {/* Secondary: thin border */ }
              <Link
                href={ withLang( '/kapcsolat' ) }
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-[#00e5ff]/40 text-gray-400 hover:text-white font-semibold px-8 py-4 transition-all duration-300 text-sm uppercase tracking-widest"
                onClick={ () =>
                  trackCtaClick( {
                    location: CTA_LOCATIONS.AiWorkflowContactHu,
                    language,
                    target: '/kapcsolat',
                    page: PAGE_NAMES.Home,
                  } )
                }
              >
                Ingyenes konzultáció <ArrowRight size={ 18 } />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
