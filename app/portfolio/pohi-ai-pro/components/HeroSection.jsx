import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../../components/GsapFadeIn';
import { ArrowLeft } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <span className="text-white font-black text-lg leading-tight text-center">Pohi<br/>AI Pro</span>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30">B2B Platform</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30">Saját fejlesztés</span>
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/30">Frontend Prototípus</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Pohi AI Pro
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            Egy teljes körű <span className="text-white font-semibold">B2B nyersanyag-kereskedési platform</span>, amely összekapcsolja a vevőket, gyártókat és logisztikát — Gemini AI-val, interaktív Google Maps alapú szállítástervezéssel, és automatikus dokumentumgenerálással.
          </p>
        </GsapFadeIn>
      </div>
    </section>
  );
}
