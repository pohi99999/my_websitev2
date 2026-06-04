'use client';

import GsapFadeIn from './GsapFadeIn';

export default function ClientVideo() {
  return (
    <section className="py-20 px-4 bg-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Interjú pár elégedett ügyfelünkkel
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Nézze meg, mit gondolnak rólunk azok, akik már bevezették az MI automatizációt. 
              (Figyelem: a videó nyomokban humort tartalmaz!)
            </p>
          </div>
        </GsapFadeIn>

        <GsapFadeIn delay={0.2}>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/TGO37iUOgOY?si=TGO37iUOgOY"
              title="Pohánka és Társa - Ügyfél interjúk"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </GsapFadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-3xl mb-4">🦁</div>
                <h3 className="text-lg font-semibold text-white mb-2">Bátor Megoldások</h3>
                <p className="text-zinc-400 text-sm">Nem félünk a vadonban sem rendet tenni az automatizációval.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-3xl mb-4">🦊</div>
                <h3 className="text-lg font-semibold text-white mb-2">Ravasz Integrációk</h3>
                <p className="text-zinc-400 text-sm">Okos algoritmusok, amik kijátsszák a manuális munka nehézségeit.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-3xl mb-4">🦉</div>
                <h3 className="text-lg font-semibold text-white mb-2">Bölcs Döntések</h3>
                <p className="text-zinc-400 text-sm">Méréseken alapuló, intelligens rendszerek a jövő vállalkozásainak.</p>
            </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] -z-10 rounded-full" />
    </section>
  );
}
