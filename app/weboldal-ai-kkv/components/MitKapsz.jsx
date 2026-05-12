import React from 'react';

export default function MitKapsz() {
  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">Mit kapsz egy „Weboldal + AI” projekttől?</h2>
        <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Nem csak egy sablon honlapot adunk át, hanem egy mini rendszert, ami segít abban, hogy kevesebb manuális munkával több megkeresést kezelj.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Professzionális weboldal", text: "Egyedi dizájn, átlátható szerkezet, gyors betöltés és alap technikai SEO." },
            { title: "AI-alapú folyamatok", text: "Automatikus adatgyűjtés, azonnali visszaigazoló üzenetek és választható mini chatbot." },
            { title: "Mérhető rendszer", text: "Analitika, követhető konverziók, és könnyen bővíthető, hosszú távú alapok." }
          ].map((item, index) => (
            <div key={index} className="p-8 border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent hover:border-[#00e5ff]/30 transition">
              <h3 className="text-2xl font-bold mb-4 text-[#00e5ff]">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
