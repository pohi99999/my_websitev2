import React from 'react';

export default function Referenciak() {
  const cases = [
    {
      title: "Ipari szolgáltató cég",
      desc: "Automatizált adatgyűjtés és riportálás, kevesebb adminisztráció, gyorsabb döntéselőkészítés."
    },
    {
      title: "Kreatív projekt / márka",
      desc: "Vizuálisan erős, narratívára épülő weboldal, több megkeresés a célcsoporttól."
    },
    {
      title: "Könyvelő / admin cég",
      desc: "AI-alapú folyamat, amely e-mailekből és dokumentumokból dolgozik, időmegtakarítás."
    }
  ];

  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">Valós projektek, valós eredmények</h2>
        <p className="text-gray-400 text-center mb-16">
          Nem elméleti rendszereket építünk, hanem olyan megoldásokat, amelyek mögött éles, működő projektek állnak.
        </p>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <div key={i} className="p-6 border-l-4 border-[#00e5ff] bg-white/5 rounded-r-xl">
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-gray-300 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
