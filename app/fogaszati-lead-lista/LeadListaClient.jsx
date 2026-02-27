"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle, ExternalLink, Download, MapPin, Star, Globe,
  Shield, AlertTriangle, TrendingUp, Users, Zap, ArrowRight,
  BarChart3, Lock, Mail, ChevronDown
} from 'lucide-react';

const SHEETS_URL =
  'https://docs.google.com/spreadsheets/d/1GCWVHcXmyHeytvI391pQSzltSmoW6RQU_4xY-IN9w-E/edit?usp=sharing';

const sampleData = [
  { nev: 'Budavári Fogászat',      pont: 78, weboldal: '✅ Van',  https: '❌ Nincs', ertekelesek: 12,  fajdalom: 'MAGAS'  },
  { nev: 'Smile Dental Center',    pont: 45, weboldal: '✅ Van',  https: '✅ Van',   ertekelesek: 8,   fajdalom: 'KÖZEPES'},
  { nev: 'Dr. Kovács Fogászat',    pont: 92, weboldal: '❌ Nincs',https: '❌ Nincs', ertekelesek: 3,   fajdalom: 'KRITIKUS'},
  { nev: 'Pest Dental Klinika',    pont: 34, weboldal: '✅ Van',  https: '✅ Van',   ertekelesek: 47,  fajdalom: 'ALACSONY'},
  { nev: 'Angyalföld Fogászat',    pont: 81, weboldal: '✅ Van',  https: '❌ Nincs', ertekelesek: 5,   fajdalom: 'MAGAS'  },
];

const fajdalomColor = {
  'KRITIKUS': 'text-red-400 bg-red-900/30 border-red-500/30',
  'MAGAS':    'text-orange-400 bg-orange-900/30 border-orange-500/30',
  'KÖZEPES':  'text-yellow-400 bg-yellow-900/30 border-yellow-500/30',
  'ALACSONY': 'text-green-400 bg-green-900/30 border-green-500/30',
};

export default function LeadListaClient() {
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !cegnev) return;
    setSubmitted(true);
    // Itt lehetne egy API hívás — egyelőre a Sheets linket nyitjuk meg
    window.open(SHEETS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen text-white bg-slate-950">

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-emerald-950/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" /> AI-alapú lead intelligencia — ingyenes minta
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              50 Budapesti Fogorvos
            </span>
            <br />
            <span className="text-white">akiknek segítségre van szükségük</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
            AI rendszerünk végigvizsgálta mind az 50 rendelőt. Minden céghez kapod:
            weboldal állapot, HTTPS, Google értékelések száma és egy{' '}
            <span className="text-white font-semibold">digitális fájdalompontszám</span> —
            minél magasabb, annál valószínűbb, hogy azonnal igénybe veszi a szolgáltatásod.
          </p>
          <p className="text-slate-400 text-sm">
            <MapPin className="w-4 h-4 inline mr-1" />Budapest · Fogászati rendelők · 2026. február
          </p>
        </div>
      </section>

      {/* Statisztikák */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '50',   label: 'Vizsgált rendelő',        color: 'text-blue-400',    icon: Users      },
            { value: '23',   label: 'Nincs HTTPS',             color: 'text-orange-400',  icon: AlertTriangle },
            { value: '8',    label: 'Weboldal nélkül',         color: 'text-red-400',     icon: Globe      },
            { value: '100%', label: 'Ingyenes most',           color: 'text-emerald-400', icon: Download   },
          ].map(s => {
            const I = s.icon;
            return (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <I className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
                <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Minta táblázat */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowTable(v => !v)}
            className="w-full flex items-center justify-between bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-2xl p-5 transition-colors mb-1"
          >
            <span className="font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Minta — 5 rendelő az 50-ből (a teljes lista kérhető)
            </span>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showTable ? 'rotate-180' : ''}`} />
          </button>

          {showTable && (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wide">
                    <th className="text-left p-4">Rendelő neve</th>
                    <th className="text-center p-4">Weboldal</th>
                    <th className="text-center p-4">HTTPS</th>
                    <th className="text-center p-4">Értékelések</th>
                    <th className="text-center p-4">Fájdalomszint</th>
                    <th className="text-center p-4">Pont</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="p-4 font-medium text-white">{row.nev}</td>
                      <td className="p-4 text-center">{row.weboldal}</td>
                      <td className="p-4 text-center">{row.https}</td>
                      <td className="p-4 text-center text-slate-300">{row.ertekelesek} db</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${fajdalomColor[row.fajdalom]}`}>
                          {row.fajdalom}
                        </span>
                      </td>
                      <td className="p-4 text-center font-black text-blue-400">{row.pont}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500 text-xs italic">
                      + 45 további rendelő a teljes listában...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Hogyan épült */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-7">
            <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" /> Hogyan készült ez a lista?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-300">
              {[
                { step: '1', title: 'Google Places API', desc: 'AI rendszerünk automatikusan lekérdezte a budapesti fogászati rendelőket — cím, telefonszám, értékelések.' },
                { step: '2', title: 'Digitális állapotfelmérés', desc: 'Minden rendelőnél ellenőriztük: van-e weboldal, fut-e HTTPS, hány Google értékelése van — mind automatikusan.' },
                { step: '3', title: 'Fájdalompontszám', desc: 'Saját algoritmusunk 0–100 pontot ad minden cégnek. Minél magasabb, annál több digitális problémája van — annál jobb ügyféljelölt.' },
              ].map(s => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-sm">{s.step}</div>
                  <div>
                    <p className="text-white font-semibold mb-1">{s.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead form vagy sikeres visszajelzés */}
      <section className="px-6 pb-24">
        <div className="max-w-xl mx-auto">
          {!submitted ? (
            <div className="bg-gradient-to-br from-slate-900 to-blue-950/30 border border-blue-500/20 rounded-3xl p-10">
              <div className="text-center mb-8">
                <Lock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Kérem a teljes listát ingyen
                </h2>
                <p className="text-slate-400 text-sm">
                  Add meg a cégnevet és email-ed — azonnal megnyílik a teljes 50 soros táblázat. Semmi spam, egyszer írok ha heti frissített listát szeretnél.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Cég / Ügynökség neve *</label>
                  <input
                    type="text"
                    value={cegnev}
                    onChange={e => setCegnev(e.target.value)}
                    placeholder="pl. Minta Marketing Kft."
                    required
                    className="w-full bg-white/5 border border-white/15 hover:border-blue-500/40 focus:border-blue-500/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Munkahelyi email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="pl. te@ugynokseg.hu"
                    required
                    className="w-full bg-white/5 border border-white/15 hover:border-blue-500/40 focus:border-blue-500/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                >
                  <Download className="w-5 h-5" /> Megnyitom a teljes listát
                </button>
                <p className="text-center text-slate-600 text-xs">
                  Kattintás után megnyílik a Google táblázat új lapon.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-10 text-center">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Köszönöm, {cegnev}!</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                A lista megnyílt egy új lapon. Ha nem nyílt meg automatikusan, kattints ide:
              </p>
              <a
                href={SHEETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 mb-8"
              >
                <ExternalLink className="w-5 h-5" /> Megnyitom a listát
              </a>
              <div className="border-t border-white/10 pt-6">
                <p className="text-slate-400 text-sm mb-4">
                  Érdekli a heti automatikus frissített lead lista más iparágakra is?
                </p>
                <Link
                  href="/kapcsolat"
                  className="inline-flex items-center gap-2 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Egyeztetek Péterrel <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto pt-12">
          <p className="text-center text-slate-500 text-sm mb-8">Ez a lista egy nagyobb rendszer mintája</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { icon: TrendingUp, color: 'text-blue-400',   title: 'Heti frissítés',      desc: 'Kozmetikusok, ügyvédek, ingatlanosok, könyvelők — bármely iparágra futtatható.' },
              { icon: Zap,        color: 'text-purple-400', title: '100-200 lead / hét',   desc: 'Minden lead előminősített fájdalompontszámmal — nincs kézzel szűrés.' },
              { icon: Star,       color: 'text-yellow-400', title: 'Azonnal hasznosítható',desc: 'Nem nyers adatbázis — hanem konkrét potenciális ügyfelek, rangsorolva.' },
            ].map(item => {
              const I = item.icon;
              return (
                <div key={item.title} className="bg-white/3 border border-white/8 rounded-2xl p-6">
                  <I className={`w-6 h-6 mx-auto mb-3 ${item.color}`} />
                  <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
