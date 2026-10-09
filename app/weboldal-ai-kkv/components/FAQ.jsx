import React from 'react';
import { BASE_PRICE } from '../../lib/basePrice';

export default function FAQ() {
  const faqs = [
    {
      q: "Mennyi idő alatt készül el egy ilyen weboldal + AI rendszer?",
      a: "Az alapcsomag szerinti weboldal két hét alatt elkészül. Nagyobb, egyedi rendszereknél az átfutást a felmérés után az ajánlatban rögzítjük."
    },
    {
      q: "Nem értek az AI-hoz – ez nekem nem bonyolult?",
      a: "Az a célunk, hogy a háttérben dolgozzon az AI, Önnek csak az eredményt kell látnia. Minden lépést érthető nyelven magyarázunk el."
    },
    {
      q: "Mi van, ha később bővíteni szeretném a rendszert?",
      a: "Kifejezetten úgy építjük fel az oldalt, hogy később új modulokat, AI-folyamatokat, CRM-kapcsolatot is könnyen rá lehessen építeni."
    },
    {
      q: "Mennyibe kerül egy ilyen megoldás?",
      // Péter, Telegram 6926 (2026-10-09, card 780eb834): the old "depends on the size of the business"
      // contradicted the fixed base package on the price card. The price comes from BASE_PRICE.
      a: `Az alapcsomag ára fix ${BASE_PRICE.hu} bruttó, egyszeri díj. Az online időpontfoglalásra és bankkártyás előlegre, illetve a nagyobb, egyedi rendszerekre ingyenes konzultáció után tételes, fix áras ajánlatot adunk, rejtett költségek nélkül.`
    }
  ];

  return (
    <section className="py-20 px-6 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold mb-16 text-center">Gyakori kérdések</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 border-b border-white/10">
              <h3 className="text-lg font-bold mb-3 text-[#00e5ff]">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
