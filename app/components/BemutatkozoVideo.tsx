'use client';

import GsapFadeIn from './GsapFadeIn';

export default function BemutatkozoVideo() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.82)' }}>
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#00e5ff]/5 blur-[120px] -z-10 rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/8 blur-[100px] -z-10 rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        <GsapFadeIn>
          <div className="text-center mb-10">
            {/* HUD badge */}
            <div className="hud-badge text-sm font-medium mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" aria-hidden="true" />
              Bemutató videó
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne tracking-tight">
              Pohánka és Társa <span style={{ color: '#00e5ff' }}>bemutató</span>
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Ismerje meg a Pohánka és Társa csapatát és megközelítésünket — hogyan tervezzük
              és valósítjuk meg az AI rendszereket vállalkozásoknak.
            </p>
          </div>
        </GsapFadeIn>

        <GsapFadeIn delay={0.2}>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#00e5ff]/20 shadow-[0_0_60px_rgba(0,229,255,0.08),0_24px_64px_rgba(0,0,0,0.7)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dZ3H49-OJfE"
              title="Pohánka és Társa bemutató"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </GsapFadeIn>
      </div>
    </section>
  );
}
