'use client';

import React, { useState } from 'react';

export default function LeadMagnetForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    size: '',
    pain_points: '',
    goals: '',
    name: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // POST to n8n webhook
      const res = await fetch('http://localhost:5678/webhook/lead-magnet-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputClass = "w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00ff9d] transition-colors";
  const btnClass = "px-6 py-3 bg-[#00ff9d] text-black font-bold rounded-lg hover:bg-[#00cc7d] transition-colors";
  const btnSecondaryClass = "px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors";

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-black/50 border border-[#00ff9d]/30 rounded-2xl text-center backdrop-blur-sm">
        <h2 className="text-3xl font-syne font-bold text-[#00ff9d] mb-4">Sikerült! 🎉</h2>
        <p className="text-lg text-gray-300">
          Az adataidat megkaptuk, a BAS MI ügynökeink már dolgoznak a személyre szabott Digitális Hatékonysági Auditodon. 
          Hamarosan elküldjük a <b>{formData.email}</b> címre!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-black/50 border border-gray-800 rounded-2xl backdrop-blur-sm shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-syne font-bold text-white">
          Digitális Hatékonysági Audit <span className="text-[#00ff9d]">Lépés {step}/3</span>
        </h2>
        <div className="w-1/3 bg-gray-800 h-2 rounded-full overflow-hidden">
          <div className="bg-[#00ff9d] h-full transition-all duration-300" style={{ width: \`\${(step / 3) * 100}%\` }}></div>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 font-medium">1. Melyik iparágban tevékenykedtek?</label>
              <select 
                name="industry" 
                value={formData.industry} 
                onChange={handleChange} 
                required
                className={inputClass}
              >
                <option value="" disabled>Válassz iparágat...</option>
                <option value="E-kereskedelem">E-kereskedelem (Webshop)</option>
                <option value="Szolgáltatás">Szolgáltató szektor</option>
                <option value="Logisztika">Logisztika & Szállítmányozás</option>
                <option value="Gyártás">Gyártás & Termelés</option>
                <option value="Egyéb">Egyéb</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2 font-medium">2. Mekkora a cég létszáma?</label>
              <div className="grid grid-cols-2 gap-4">
                {['1-5 fő', '6-20 fő', '21-50 fő', '50+ fő'].map(size => (
                  <label key={size} className={\`border p-4 rounded-lg cursor-pointer transition-colors flex items-center \${formData.size === size ? 'border-[#00ff9d] bg-[#00ff9d]/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}\`}>
                    <input 
                      type="radio" 
                      name="size" 
                      value={size} 
                      onChange={handleChange} 
                      className="hidden" 
                      required
                    />
                    <span className="text-white">{size}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button type="submit" className={btnClass}>Tovább</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 font-medium">3. Melyik terület veszi el a legtöbb időt a felesleges adminisztrációval?</label>
              <select 
                name="pain_points" 
                value={formData.pain_points} 
                onChange={handleChange} 
                required
                className={inputClass}
              >
                <option value="" disabled>Válassz egyet...</option>
                <option value="Ajánlatadás és számlázás">Ajánlatadás és számlázás</option>
                <option value="Ügyfélszolgálat és GYIK">Ügyfélszolgálat és GYIK</option>
                <option value="Adatrögzítés (pl. CRM, táblázatok)">Manuális adatrögzítés</option>
                <option value="Marketing és posztolás">Marketing és posztolás</option>
                <option value="Mindenből egy kicsi">Mindenből egy kicsi</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">4. Mi a legfőbb üzleti célod a következő 6 hónapban?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Költségek optimalizálása', 
                  'Cég skálázása (növekedés)', 
                  'Vezetői idő felszabadítása', 
                  'Versenyelőny megszerzése'
                ].map(goal => (
                  <label key={goal} className={\`border p-4 rounded-lg cursor-pointer transition-colors flex items-center \${formData.goals === goal ? 'border-[#00ff9d] bg-[#00ff9d]/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}\`}>
                    <input 
                      type="radio" 
                      name="goals" 
                      value={goal} 
                      onChange={handleChange} 
                      className="hidden" 
                      required
                    />
                    <span className="text-white text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className={btnSecondaryClass}>Vissza</button>
              <button type="submit" className={btnClass}>Tovább</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 font-medium">5. Hogy szólíthatunk?</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Pl. Nagy Péter"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">6. Hova küldjük a személyre szabott Audit PDF-et?</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="ceges.email@vallalkozas.hu"
                required
                className={inputClass}
              />
            </div>
            
            {status === 'error' && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                Hiba történt a küldés során. Kérjük, próbáld újra később, vagy keress minket az elérhetőségeinken!
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className={btnSecondaryClass}>Vissza</button>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className={\`\${btnClass} \${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}\`}
              >
                {status === 'submitting' ? 'Generálás és küldés...' : 'Audit Kérése'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
