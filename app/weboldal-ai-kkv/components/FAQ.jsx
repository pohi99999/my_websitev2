import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "Mennyi idő alatt készül el egy ilyen weboldal + AI rendszer?",
      a: "A kisebb, „Starter” szintű projektek általában 1–2 hét alatt elkészülnek. A nagyobb, egyedi „System” megoldásoknál 3–6 hét átfutási idővel érdemes számolni."
    },
    {
      q: "Nem értek az AI-hoz – ez nekem nem bonyolult?",
      a: "Az a célunk, hogy a háttérben dolgozzon az AI, neked csak az eredményt kell látnod. Minden lépést érthető nyelven magyarázunk el."
    },
    {
      q: "Mi van, ha később bővíteni szeretném a rendszert?",
      a: "Kifejezetten úgy építjük fel az oldalt, hogy később új modulokat, AI-folyamatokat, CRM-kapcsolatot is könnyen rá lehessen építeni."
    },
    {
      q: "Mennyibe kerül egy ilyen megoldás?",
      a: "Az ár függ a vállalkozás méretétől. Ingyenes konzultáció után átlátható, tételes ajánlatot adunk, rejtett költségek nélkül."
    }
  ];

  return (
    <section className="py-20 px-6 bg-black">
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
