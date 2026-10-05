import React from 'react';
import Link from 'next/link';

export default function ZaroCTA() {
  return (
    <section className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="p-12 border border-[#00e5ff]/20 rounded-3xl bg-gradient-to-b from-[#00e5ff]/5 to-transparent text-center">
          <h2 className="text-4xl font-bold mb-6">Vigyük a következő szintre vállalkozása online jelenlétét</h2>
          <p className="text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Ha olyan weboldalt szeretne, amely nem csak szép, hanem valóban dolgozik is Ön helyett,
            akkor beszéljünk egy rövid, kötetlen online konzultáción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kapcsolat" className="bg-[#00e5ff] text-black font-bold py-4 px-10 rounded-lg hover:bg-[#00e5ff]/90 transition">
              Ingyenes konzultációt kérek
            </Link>
            {/* the contact page instead of a personal mailbox (Péter 2026-10-05, 6328) */}
            <Link href="/kapcsolat" className="border border-white/20 py-4 px-10 rounded-lg hover:bg-white/5 transition">
              Kérjen írásban ajánlatot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
