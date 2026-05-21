import React from 'react';
import { Bot, Zap, Clock, ShieldCheck, ArrowRight, MessageSquare, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import InstantResponderDemo from './InstantResponderDemo';

export const metadata = {
  title: 'Azonnali MI Válaszadó | 0-24 Ügyfélszolgálat Automatizálva',
  description: 'Ne várakoztasd az ügyfeleid! Az MI Válaszadó 60 másodpercen belül professzionális, személyre szabott választ ad minden megkeresésre n8n és Gemini alapokon.',
};

export default function InstantResponderPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-white pt-32 pb-24">
      {/* ... Hero Section remains the same ... */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
            <Zap size={14} className="animate-pulse" />
            AUTOMATION-AS-A-SERVICE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-syne mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Azonnali MI Válaszadó
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Az érdeklődők 50%-a annál vásárol, aki **először** válaszol. <br className="hidden md:block" /> 
            Digitális munkatársunk 60 másodpercen belül reagál, mialatt Te éppen pihensz.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#demo" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Kipróbálom a demót
            </a>
            <Link href="/kapcsolat" className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-lg transition-all">
              Ajánlatot kérek
            </Link>
          </div>
        </div>

        {/* ... Benefits Grid ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-colors">
            <Clock className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">60 másodperces válasz</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nincs többé órákig (vagy napokig) tartó várakozás. Az MI azonnal feldolgozza az igényt és választ küld.
            </p>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-colors">
            <Bot className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Emberi tónus</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nem sablonokat használunk. Az MI értelmezi a kérdést és a Te céged stílusában fogalmazza meg a választ.
            </p>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-colors">
            <ShieldCheck className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Mérhető eredmény</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A válaszok azonnal rögzítésre kerülnek a CRM rendszeredben, így mindenről pontos képed van.
            </p>
          </div>
        </div>

        {/* ... How it works ... */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-10 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-syne mb-8 text-emerald-400">Hogyan működik?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <p className="font-bold mb-1">Érkezik az üzenet</p>
                    <p className="text-slate-400 text-sm">Lehet weboldali űrlap, e-mail vagy akár Facebook üzenet.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-bold mb-1">Az n8n motor munkába áll</p>
                    <p className="text-slate-400 text-sm">Biztonságos automatizációs rendszerünk (n8n) továbbítja az adatokat az MI-nek.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <p className="font-bold mb-1">Gemini AI elemzés</p>
                    <p className="text-slate-400 text-sm">A legmodernebb nyelvi modell elemzi a kontextust és megírja a választ.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <p className="font-bold mb-1">Véglegesítés</p>
                    <p className="text-slate-400 text-sm">A válasz kimegy az ügyfélnek, Te pedig kapsz egy értesítést a telefonodra.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
                <div className="aspect-video bg-black/50 border border-slate-700 rounded-xl overflow-hidden flex items-center justify-center group">
                    <div className="text-center">
                        <MessageSquare size={48} className="text-slate-700 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                        <p className="text-xs font-mono text-slate-600">n8n_master_workflow_preview.png</p>
                    </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-4 rounded-lg shadow-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-tighter">Éles üzemmód aktív</p>
                </div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <section id="demo" className="text-center py-20 border-t border-slate-900">
           <h2 className="text-3xl font-bold font-syne mb-4">Próbáld ki élesben!</h2>
           <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
             Írd be az üzenetet, amit egy képzeletbeli ügyfél küldene Neked, és nézd meg, mit válaszolna az MI 60 másodpercen belül.
           </p>
           <InstantResponderDemo />
        </section>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-b from-emerald-500/10 to-transparent p-16 rounded-3xl border border-emerald-500/20">
          <h2 className="text-4xl font-bold mb-6">Készen állsz az automatizálásra?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Telepítjük, beállítjuk és karbantartjuk. Neked csak az új ügyfelekkel kell foglalkoznod.
          </p>
          <Link href="/kapcsolat" className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-full transition-all">
            Kérem a bemutatót <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
