"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Brain, Bot, BarChart3, Mail, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Target,
    color: 'text-blue-400',
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/30',
    title: 'Intelligens Lead Generálás',
    desc: 'Az AI naponta kiszűri azokat a vállalkozásokat, akiknek a legnagyobb szükségük van a te szolgáltatásodra. Heti 100–200 előminősített kontakt, automatikusan — te csak tárgyalsz.',
    bullets: ['Fájdalompontszám alapú priorizálás', 'Automatikus digitális állapotjelentés', 'Iparág-specifikus célzás'],
  },
  {
    icon: Mail,
    color: 'text-purple-400',
    bg: 'bg-purple-900/30',
    border: 'border-purple-500/30',
    title: 'Automatikus Outreach Kampányok',
    desc: 'Személyre szabott emailek, automatikus kiküldés, follow-up emlékeztetők — minden a rendszer csinálja. Nem tömeges spam, hanem célzott, egyedi megkeresés.',
    bullets: ['Ütemezett kiküldés csúcsidőben', 'Automatikus 5 napos follow-up', 'Google Sheets státuszkövetés'],
  },
  {
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-500/30',
    title: 'Üzleti Folyamatok Automatizálása',
    desc: 'Amit ma kézzel csinálsz — holnaptól csinálja helyetted a rendszer. Számlafeldolgozás, adatbevitel, riportok, email triage — mind automatikusan.',
    bullets: ['OCR számlafeldolgozás', 'Automatikus riport generálás', 'Email osztályozás és válaszolás'],
  },
  {
    icon: Brain,
    color: 'text-cyan-400',
    bg: 'bg-cyan-900/30',
    border: 'border-cyan-500/30',
    title: 'AI Ügynökök Telepítése',
    desc: 'A Brunella Agent System 57 ügynöke közül kiválasztjuk a vállalkozásodhoz illőket. Kutatás, tartalom, ügyfélszolgálat, logisztika — mind egy AI-csapat végzi.',
    bullets: ['Phoenix Protocol öngyógyítás', 'RAG memória: tanul a korábbi feladatokból', '24/7 felügyelet nélkül'],
  },
  {
    icon: BarChart3,
    color: 'text-green-400',
    bg: 'bg-green-900/30',
    border: 'border-green-500/30',
    title: 'Piackutatás & Versenytárs Elemzés',
    desc: 'Az AI folyamatosan figyeli az iparágadat: versenytársak, árak, trendek, pályázati lehetőségek. Minden reggel friss intelligencia — emberi munka nélkül.',
    bullets: ['Napi piaci hírlevél', 'Automatikus pályázatfigyelés', 'Versenytárs ár- és eseménykövetés'],
  },
  {
    icon: TrendingUp,
    color: 'text-pink-400',
    bg: 'bg-pink-900/30',
    border: 'border-pink-500/30',
    title: 'Marketing & Tartalom Automatizálás',
    desc: 'SEO cikkek, közösségi média posztok, hirdetésszövegek — az AI gyártja, a stratégiát te határozod meg. Több tartalom, kevesebb idő, mérhetően jobb elérés.',
    bullets: ['SEO-optimalizált cikk generálás', 'Közösségi média ütemező', 'A/B teszt hirdetésszövegek'],
  },
];

export default function AIFolyamatok() {
  return (
    <section id="ai-folyamatok" className="py-24 px-6 relative bg-slate-950">
      {/* Subtle gradient háttér */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Fejléc */}
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

        {/* Számok */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '250+', label: 'Napi friss lead', color: 'text-blue-400' },
            { value: '57',   label: 'Bevetett AI ügynök', color: 'text-purple-400' },
            { value: '80%',  label: 'Időmegtakarítás', color: 'text-green-400' },
            { value: '24/7', label: 'Emberi beavatkozás nélkül', color: 'text-orange-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors">
              <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Szolgáltatás kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`${s.bg} border ${s.border} rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl bg-black/20`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="font-bold text-white text-base">{s.title}</h3>
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

        {/* CTA sáv */}
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
              href="/szolgaltatasok"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
            >
              Összes szolgáltatás <ArrowRight size={18} />
            </Link>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-blue-400/50 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Ingyenes konzultáció <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
