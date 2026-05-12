import React from 'react';

export default function Csomagok() {
  const packages = [
    {
      title: "Starter Web + AI",
      desc: "Azoknak, akiknek nincs vagy nagyon elavult a weboldaluk.",
      features: [
        "1 oldalas, profi bemutatkozó weboldal",
        "Ajánlatkérő / kapcsolatfelvételi űrlap",
        "Automatikus visszaigazoló e-mail",
        "Alap analitika beállítás"
      ]
    },
    {
      title: "Growth Web + AI",
      desc: "Olyan KKV-knak, akik már működnek, de szeretnének több érdeklődőt.",
      features: [
        "3–5 oldalas weboldal",
        "1–2 AI-alapú folyamat (ajánlatkérés-flow, FAQ-bot)",
        "Alap szövegírás és finomítás",
        "Jobb konverziós struktúra"
      ]
    },
    {
      title: "System Web + AI",
      desc: "Azoknak a cégeknek, akik nem csak honlapot, hanem rendszert szeretnének.",
      features: [
        "Összetett weboldal (blog, tudásbázis)",
        "Több AI-folyamat (előszűrés, riportálás)",
        "Integrációk (CRM, táblázatok)",
        "Egyedi konzultáció és folyamattervezés"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Három szint, attól függően, hol tart a vállalkozásod</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Nem egyforma egy induló vállalkozás és egy több telephelyes cég igénye, ezért három csomagban gondolkodunk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="p-8 border border-white/10 rounded-2xl bg-black/60 flex flex-col hover:border-[#00e5ff]/50 transition">
              <h3 className="text-2xl font-bold mb-4 text-[#00e5ff]">{pkg.title}</h3>
              <p className="text-gray-300 text-sm mb-6 flex-grow">{pkg.desc}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-200">
                    <span className="text-[#00e5ff] mr-2">✓</span> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition font-bold">
                Részletek
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
