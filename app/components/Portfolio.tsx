"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Award, TrendingUp, X } from 'lucide-react';

const Portfolio = () => {
  // Állapot a kiválasztott kép tárolására (Lightboxhoz)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const badges = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/google-dev-badge${i + 1}.png`,
    alt: `Google Developer Certification ${i + 1}`
  }));

  return (
    <section id="portfolio" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/portfolio.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Kiemelt Projektjeink
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ahol a technológia találkozik az üzleti hatékonysággal.
          </p>
        </div>

        {/* Projekt Kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* 1. BAS */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-blue-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">BAS</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Brunella Agent System</h3>
              <p className="text-slate-400 mb-6">
                Az első valódi AI Operációs Rendszer vállalkozásoknak. Nem csak egy chatbot, hanem egy teljes digitális munkaerő, ami lát, hall és cselekszik helyetted.
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Pohi AI Pro (FRISSÍTETT SZÖVEG) */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30 flex items-center">
              <Award className="w-3 h-3 mr-1" /> WINNER
            </div>
            <div className="h-48 bg-gradient-to-br from-purple-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Pohi AI Pro</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pohi AI Pro</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Egyedi fejlesztésű, teljes portál rendszer amely egy vevői adatbázis és annak rendelés állományát valamint a gyártok készletnyilvántartását összefésüli és kezeli a vevői igényekkel, fuvarszervezéssel egybe hangolva.
                <br /><br />
                <span className="text-purple-400 font-medium">Még fejlesztés alatt:</span> tesztelés a Mesterséges Intelligencia által vezérelt automatizálása bevezetése a gyorsabb és átláthatóbb nyilvántartás érdekében.
              </p>
              <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. Üzleti Automatizálás */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-emerald-900/50 to-slate-900/50 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-emerald-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Üzleti Folyamatok</h3>
              <p className="text-slate-400 mb-6">
                Üzleti folyamatok teljes körű automatizálása a BAS rendszer segítségével. A repetitív feladatok kiváltása intelligens ügynökökkel.
              </p>
              <a href="#" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Eredmények és Tanúsítványok (Kattintható Badge-ek) */}
        <div className="border-t border-slate-800 pt-16">
          <h3 className="text-center text-2xl font-bold text-white mb-4">Minősítéseink és Eredményeink</h3>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Folyamatosan képezzük magunkat és rendszereinket, hogy a legfrissebb technológiát nyújthassuk.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedImage(badge.src)}
                className="cursor-pointer p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/60 transition-all duration-300 group flex items-center justify-center h-32 border border-transparent hover:border-slate-700"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={220}
                  height={140}
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 12vw"
                  className="max-h-20 w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">A+</div>
              <div className="text-white font-medium">Kiemelt Cégminősítés</div>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">3.2 Mrd Ft</div>
              <div className="text-white font-medium">Igazolt korábbi forgalom</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={48} />
          </button>
          <Image
            src={selectedImage}
            alt="Tanúsítvány nagyítva"
            width={1600}
            height={1100}
            sizes="90vw"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Portfolio;
