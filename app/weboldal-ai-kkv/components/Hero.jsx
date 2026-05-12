import React from 'react';

export default function Hero() {
  return (
    <section className="relative py-20 px-6 container mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-[#00e5ff]">
        Weboldal + AI-automatizálás magyar KKV-knak
      </h1>
      <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-10">
        Olyan honlapot készítünk, ami nem csak szép, hanem automatizálja az ajánlatkérést, az érdeklődők kezelését és időt spórol a csapatodnak.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
        <ul className="space-y-3 text-gray-200">
          <li className="flex items-center gap-2">
            <span className="text-[#00e5ff]">✔</span> Modern, reszponzív weboldal, ami mobilon is tökéletesen működik.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00e5ff]">✔</span> Beépített AI-alapú folyamatok: ajánlatkérés, érdeklődő-kezelés.
          </li>
        </ul>
        <ul className="space-y-3 text-gray-200">
          <li className="flex items-center gap-2">
            <span className="text-[#00e5ff]">✔</span> Gyors kivitelezés – hetek helyett napok alatt indulhat.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00e5ff]">✔</span> Magyar KKV-kra szabott megoldás, átlátható költségekkel.
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#00e5ff] text-black font-bold py-4 px-10 rounded-lg hover:bg-[#00e5ff]/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
          Ingyenes 15 perces konzultációt kérek
        </button>
        <button className="border border-white/20 py-4 px-10 rounded-lg hover:bg-white/5 transition">
          Referenciák és csomagok megtekintése
        </button>
      </div>
    </section>
  );
}
