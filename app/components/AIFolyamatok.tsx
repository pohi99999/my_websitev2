"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Brain, Bot, BarChart3, Mail, Shield, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

export default function AIFolyamatok() {
  const { language } = useLanguage();
  const withLang = (href: string) => {
    if (language === 'hu') return href;
    if (href === '/') return `/${language}`;
    return href.startsWith('/') ? `/${language}${href}` : href;
  };

  if (language !== 'hu') {
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
      <section className="py-24 px-6 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {ui.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{ui.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ui.phases.map((phase) => (
              <div key={phase} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <Sparkles className="w-5 h-5 text-cyan-300 mb-3" />
                <p className="text-gray-200 leading-relaxed">{phase}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={withLang('/szolgaltatasok')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-cyan-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 transition-colors"
              onClick={() => trackCtaClick({ location: CTA_LOCATIONS.AiWorkflowServices, language, target: '/szolgaltatasok', page: PAGE_NAMES.Home })}
            >
              {ui.details} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={withLang('/kapcsolat')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors"
              onClick={() => trackCtaClick({ location: CTA_LOCATIONS.AiWorkflowContact, language, target: '/kapcsolat', page: PAGE_NAMES.Home })}
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
      icon: Target,
      color: 'text-blue-400',
      title: 'Intelligens Lead Generálás',
      desc: 'Az AI naponta kiszűri azokat a vállalkozásokat, akiknek a legnagyobb szükségük van a te szolgáltatásodra.',
      bullets: ['Fájdalompontszám alapú priorizálás', 'Automatikus digitális állapotjelentés', 'Iparág-specifikus célzás'],
    },
    {
      icon: Mail,
      color: 'text-purple-400',
      title: 'Automatikus Outreach Kampányok',
      desc: 'Személyre szabott emailek, automatikus kiküldés, follow-up emlékeztetők — minden a rendszer csinálja.',
      bullets: ['Ütemezett kiküldés', 'Automatikus follow-up', 'Státuszkövetés'],
    },
    {
      icon: Zap,
      color: 'text-yellow-400',
      title: 'Üzleti Folyamatok Automatizálása',
      desc: 'Amit ma kézzel csinálsz — holnaptól csinálja helyetted a rendszer.',
      bullets: ['OCR feldolgozás', 'Automatikus riportok', 'Email osztályozás'],
    },
    {
      icon: Brain,
      color: 'text-cyan-400',
      title: 'AI Ügynökök Telepítése',
      desc: 'A Brunella Agent System ügynökei valódi üzleti feladatokat végeznek.',
      bullets: ['Öngyógyító működés', 'RAG memória', '24/7 futás'],
    },
    {
      icon: BarChart3,
      color: 'text-green-400',
      title: 'Piackutatás & Versenytárs Elemzés',
      desc: 'Folyamatos iparági monitoring versenytársakra, trendekre és lehetőségekre.',
      bullets: ['Napi összefoglaló', 'Pályázatfigyelés', 'Árkövetés'],
    },
    {
      icon: TrendingUp,
      color: 'text-pink-400',
      title: 'Marketing & Tartalom Automatizálás',
      desc: 'SEO cikkek, social posztok és hirdetésszövegek AI-val gyorsítva.',
      bullets: ['SEO tartalom', 'Közösségi ütemezés', 'A/B kreatívok'],
    },
  ];

  return (
    <section id="ai-folyamatok" className="py-24 px-6 relative bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            <Bot className="w-4 h-4" /> AI ügynökök · 24/7 · Emberi felügyelet nélkül
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Automatizált és AI Ügynöki<br className="hidden md:block" /> Folyamatok
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Nem chatbotok, nem egyszerű szkriptek — hanem gondolkodó AI ügynökök, amelyek
            valódi üzleti feladatokat látnak el. Lead szerzés, marketing, adminisztráció,
            piackutatás: mind automatikusan, miközben te a fontos dolgokra figyelsz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {/* Konyvelesi Automatizalas */}
          <div className="bg-white/5 border border-teal-500/20 rounded-2xl p-6 hover:border-teal-400/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-teal-500/10"><BarChart3 className="w-5 h-5 text-teal-400" /></div>
              <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">UJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Konyvelesi Automatizalas</h3>
            <ul className="space-y-1.5">
              {["Automatikus szamla-feldolgozas OCR-rel", "Bank-egyeztetes & NAV-ellenorzes", "Valos ideju penzugyi iranyitopult"].map(b => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-slate-400"><CheckCircle className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          </div>
          {/* Nova AI Asszisztens */}
          <div className="bg-white/5 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-400/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-violet-500/10"><Brain className="w-5 h-5 text-violet-400" /></div>
              <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">UJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Nova — AI Asszisztens</h3>
            <ul className="space-y-1.5">
              {["Megismeri a vallalkozasodat, egyre okosabb", "Napi operativ segitseg hangalapu kommunikacioval", "24/7 elerheto vallalkozoi tars"].map(b => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-slate-400"><CheckCircle className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          </div>
          {/* P-Sales */}
          <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-400/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-orange-500/10"><TrendingUp className="w-5 h-5 text-orange-400" /></div>
              <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">UJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">P-Sales — Ingatlan Ertekesito</h3>
            <ul className="space-y-1.5">
              {["Dokumentumfelmerés & piackutatas ugynokkkel", "Egyedi ertekesitesi strategia es akcioterv", "Jovahagyas utan automatikus vegrehajtas"].map(b => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-slate-400"><CheckCircle className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          </div>
          {/* P-Search */}
          <div className="bg-white/5 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/50 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-blue-500/10"><Target className="w-5 h-5 text-blue-400" /></div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">UJ</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">P-Search — Palyazat & Hitelkereső</h3>
            <ul className="space-y-1.5">
              {["Folyamatos EU/HU palyazat- es hitelfigyelem", "Szemelyre szabott talalatok osszefoglaloval", "Kanban kovetes & hatarido ertesitok"].map(b => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-slate-400"><CheckCircle className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl bg-black/20`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="text-white font-semibold">{s.title}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${s.color}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-blue-900/40 border border-blue-500/20 rounded-3xl p-10 text-center">
          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Melyik folyamatot automatizáljuk elsőként?
          </h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Egy ingyenes konzultáción felmérjük, hol lehet a legnagyobb hatása az AI bevezetésének
            a vállalkozásodban — és megmutatjuk, hogy néz ki az első 30 nap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={withLang('/szolgaltatasok')}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              onClick={() => trackCtaClick({ location: CTA_LOCATIONS.AiWorkflowServicesHu, language, target: '/szolgaltatasok', page: PAGE_NAMES.Home })}
            >
              Összes szolgáltatás <ArrowRight size={18} />
            </Link>
            <Link
              href={withLang('/kapcsolat')}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-blue-400/50 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              onClick={() => trackCtaClick({ location: CTA_LOCATIONS.AiWorkflowContactHu, language, target: '/kapcsolat', page: PAGE_NAMES.Home })}
            >
              Ingyenes konzultáció <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
