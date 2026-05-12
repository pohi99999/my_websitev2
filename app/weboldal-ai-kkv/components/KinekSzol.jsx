import React from 'react';

export default function KinekSzol() {
  return (
    <section className="py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-10 text-center">Kiknek készült ez a megoldás?</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Olyan magyar kis- és középvállalkozásoknak, akiknek már van forgalmuk, de a weboldaluk vagy elavult, vagy egyáltalán nincs – és szeretnék, ha az online jelenlétük végre valóban új érdeklődőket és bevételt hozna, nem csak névjegykártya lenne a neten.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Szolgáltató cégek: autószerviz, építőipari vállalkozás, villanyszerelő, gépész stb.",
            "Egészségügyi / szépség: fogorvos, rendelő, kozmetika, fodrászat.",
            "Irodai szolgáltatók: könyvelőiroda, tanácsadó, tréner.",
            "Kereskedők, boltok, webáruházak, akiknek fontos a gyors vásárlási folyamat."
          ].map((item, index) => (
            <div key={index} className="p-6 bg-black border border-white/10 rounded-xl hover:border-[#00e5ff]/30 transition">
              <span className="text-[#00e5ff] mr-3">●</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
