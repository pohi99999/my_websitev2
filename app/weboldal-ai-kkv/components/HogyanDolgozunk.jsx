import React from 'react';

export default function HogyanDolgozunk() {
  const steps = [
    {
      title: "Ingyenes online konzultáció",
      desc: "Megismerjük a vállalkozásod, céljaid, és kiválasztjuk a hozzád illő csomagot."
    },
    {
      title: "Tervezés és kivitelezés",
      desc: "Drótváz készítés, szövegírás, weboldal építés és AI folyamatok beállítása."
    },
    {
      title: "Átadás és finomhangolás",
      desc: "Betanítás, az oldal átadása és az első hetek közös optimalizálása."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-16 text-center">Hogyan néz ki az együttműködés?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-white/10 -z-10" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="w-16 h-16 bg-[#00e5ff] text-black font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
