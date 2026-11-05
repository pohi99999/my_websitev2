'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FORM_STATUSES, FORMS, PAGE_NAMES, trackFormSubmit } from '../lib/analytics';

// What the visitor is told after submitting. It must match what actually happens:
// the lead is saved and we reply by hand; no automatic audit or PDF is sent.
const RESULT_TEXT = {
  hu: {
    title: 'Köszönjük!',
    success: 'Átnézzük az adatait, és 1 munkanapon belül visszaírunk.',
    error: 'Hiba történt a küldés során. Kérjük, próbálja újra később, vagy keressen minket az elérhetőségeinken!',
  },
  en: {
    title: 'Thank you!',
    success: 'We will review your details and reply within 1 working day.',
    error: 'Something went wrong while sending. Please try again later or reach us through our contact details.',
  },
  de: {
    title: 'Vielen Dank!',
    success: 'Wir prüfen Ihre Angaben und antworten innerhalb von 1 Arbeitstag.',
    error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns über unsere Kontaktdaten.',
  },
} as const;

// The option values stay Hungarian in every language: they go to the n8n workflow, which saves them as they are.
const INDUSTRIES = ['E-kereskedelem', 'Szolgáltatás', 'Logisztika', 'Gyártás', 'Egyéb'] as const;
const SIZES = ['1-5 fő', '6-20 fő', '21-50 fő', '50+ fő'] as const;
const PAIN_POINTS = ['Ajánlatadás és számlázás', 'Ügyfélszolgálat és GYIK', 'Adatrögzítés (pl. CRM, táblázatok)', 'Marketing és posztolás', 'Mindenből egy kicsi'] as const;
const GOALS = ['Költségek optimalizálása', 'Cég skálázása (növekedés)', 'Vezetői idő felszabadítása', 'Versenyelőny megszerzése'] as const;

const FORM_TEXT = {
  hu: {
    heading: 'Digitális Hatékonysági Audit',
    step: 'Lépés',
    industryQ: '1. Melyik iparágban tevékenykedik a cég?',
    industryPick: 'Válasszon iparágat...',
    industries: ['E-kereskedelem (Webshop)', 'Szolgáltató szektor', 'Logisztika & Szállítmányozás', 'Gyártás & Termelés', 'Egyéb'],
    sizeQ: '2. Mekkora a cég létszáma?',
    sizes: ['1-5 fő', '6-20 fő', '21-50 fő', '50+ fő'],
    painQ: '3. Melyik terület veszi el a legtöbb időt a felesleges adminisztrációval?',
    painPick: 'Válasszon egyet...',
    pains: ['Ajánlatadás és számlázás', 'Ügyfélszolgálat és GYIK', 'Manuális adatrögzítés', 'Marketing és posztolás', 'Mindenből egy kicsi'],
    goalQ: '4. Mi a legfőbb üzleti célja a következő 6 hónapban?',
    goals: ['Költségek optimalizálása', 'Cég skálázása (növekedés)', 'Vezetői idő felszabadítása', 'Versenyelőny megszerzése'],
    nameQ: '5. Hogyan szólíthatjuk?',
    namePh: 'Pl. Nagy Péter',
    emailQ: '6. Hova írjunk vissza?',
    emailPh: 'ceges.email@vallalkozas.hu',
    next: 'Tovább',
    back: 'Vissza',
    sending: 'Küldés...',
    submit: 'Audit Kérése',
  },
  en: {
    heading: 'Digital Efficiency Audit',
    step: 'Step',
    industryQ: '1. Which industry does the company work in?',
    industryPick: 'Choose an industry...',
    industries: ['E-commerce (online shop)', 'Services', 'Logistics & shipping', 'Manufacturing & production', 'Other'],
    sizeQ: '2. How many people work at the company?',
    sizes: ['1-5 people', '6-20 people', '21-50 people', '50+ people'],
    painQ: '3. Which area takes up the most time with unnecessary admin?',
    painPick: 'Choose one...',
    pains: ['Quoting and invoicing', 'Customer service and FAQ', 'Manual data entry', 'Marketing and posting', 'A little of everything'],
    goalQ: '4. What is your main business goal for the next 6 months?',
    goals: ['Optimising costs', 'Scaling the company (growth)', 'Freeing up management time', 'Gaining a competitive edge'],
    nameQ: '5. How should we address you?',
    namePh: 'E.g. Peter Nagy',
    emailQ: '6. Where should we reply?',
    emailPh: 'company.email@business.com',
    next: 'Next',
    back: 'Back',
    sending: 'Sending...',
    submit: 'Request the audit',
  },
  de: {
    heading: 'Digitales Effizienz-Audit',
    step: 'Schritt',
    industryQ: '1. In welcher Branche ist das Unternehmen tätig?',
    industryPick: 'Branche wählen...',
    industries: ['E-Commerce (Webshop)', 'Dienstleistungen', 'Logistik & Spedition', 'Fertigung & Produktion', 'Sonstiges'],
    sizeQ: '2. Wie viele Mitarbeitende hat das Unternehmen?',
    sizes: ['1-5 Personen', '6-20 Personen', '21-50 Personen', '50+ Personen'],
    painQ: '3. Welcher Bereich kostet die meiste Zeit mit unnötiger Verwaltung?',
    painPick: 'Bitte wählen...',
    pains: ['Angebote und Rechnungen', 'Kundenservice und FAQ', 'Manuelle Datenerfassung', 'Marketing und Posts', 'Von allem ein wenig'],
    goalQ: '4. Was ist Ihr wichtigstes Geschäftsziel für die nächsten 6 Monate?',
    goals: ['Kosten optimieren', 'Unternehmen skalieren (Wachstum)', 'Zeit der Führung freimachen', 'Wettbewerbsvorteil gewinnen'],
    nameQ: '5. Wie dürfen wir Sie ansprechen?',
    namePh: 'Z. B. Peter Nagy',
    emailQ: '6. Wohin dürfen wir antworten?',
    emailPh: 'firmen.email@unternehmen.de',
    next: 'Weiter',
    back: 'Zurück',
    sending: 'Wird gesendet...',
    submit: 'Audit anfordern',
  },
} as const;

export default function LeadMagnetForm() {
  const { language } = useLanguage();
  const resultText = RESULT_TEXT[language as keyof typeof RESULT_TEXT] ?? RESULT_TEXT.hu;
  const t = FORM_TEXT[language as keyof typeof FORM_TEXT] ?? FORM_TEXT.hu;
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
      // POST to local API route for rate-limiting
      const res = await fetch('/api/lead-magnet-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        trackFormSubmit({ form: FORMS.LeadMagnet, status: FORM_STATUSES.Success, language, page: PAGE_NAMES.EfficiencyAudit });
      } else {
        trackFormSubmit({ form: FORMS.LeadMagnet, status: FORM_STATUSES.ErrorResponse, language, page: PAGE_NAMES.EfficiencyAudit });
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      trackFormSubmit({ form: FORMS.LeadMagnet, status: FORM_STATUSES.ErrorException, language, page: PAGE_NAMES.EfficiencyAudit });
      setStatus('error');
    }
  };

  const inputClass = "w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00ff9d] transition-colors";
  const btnClass = "px-6 py-3 bg-[#00ff9d] text-black font-bold rounded-lg hover:bg-[#00cc7d] transition-colors";
  const btnSecondaryClass = "px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors";

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-black/50 border border-[#00ff9d]/30 rounded-2xl text-center backdrop-blur-sm">
        <h2 className="text-3xl font-syne font-bold text-[#00ff9d] mb-4">{resultText.title}</h2>
        <p className="text-lg text-gray-300">{resultText.success}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-black/50 border border-gray-800 rounded-2xl backdrop-blur-sm shadow-2xl" role="region" aria-labelledby="form-title">
      <div className="flex justify-between items-center mb-8">
        <h2 id="form-title" className="text-2xl font-syne font-bold text-white">
          {t.heading} <span className="text-[#00ff9d]" aria-live="polite">{t.step} {step}/3</span>
        </h2>
        <div className="w-1/3 bg-gray-800 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(step/3)*100} aria-valuemin={0} aria-valuemax={100}>
          <div className="bg-[#00ff9d] h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="industry" className="block text-gray-400 mb-2 font-medium">{t.industryQ}</label>
              <select 
                id="industry"
                name="industry" 
                value={formData.industry} 
                onChange={handleChange} 
                required
                className={inputClass}
              >
                <option value="" disabled>{t.industryPick}</option>
                {INDUSTRIES.map((value, i) => <option key={value} value={value}>{t.industries[i]}</option>)}
              </select>
            </div>
            
            <fieldset>
              <legend className="block text-gray-400 mb-2 font-medium">{t.sizeQ}</legend>
              <div className="grid grid-cols-2 gap-4">
                {SIZES.map((size, i) => (
                  <label key={size} className={`border p-4 rounded-lg cursor-pointer transition-colors flex items-center ${formData.size === size ? 'border-[#00ff9d] bg-[#00ff9d]/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}`}>
                    <input 
                      type="radio" 
                      name="size" 
                      value={size} 
                      onChange={handleChange} 
                      className="mr-3 accent-[#00ff9d]" 
                      required
                      checked={formData.size === size}
                    />
                    <span className="text-white">{t.sizes[i]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            <div className="flex justify-end pt-4">
              <button type="submit" className={btnClass}>{t.next}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="pain_points" className="block text-gray-400 mb-2 font-medium">{t.painQ}</label>
              <select 
                id="pain_points"
                name="pain_points" 
                value={formData.pain_points} 
                onChange={handleChange} 
                required
                className={inputClass}
              >
                <option value="" disabled>{t.painPick}</option>
                {PAIN_POINTS.map((value, i) => <option key={value} value={value}>{t.pains[i]}</option>)}
              </select>
            </div>

            <fieldset>
              <legend className="block text-gray-400 mb-2 font-medium">{t.goalQ}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GOALS.map((goal, i) => (
                  <label key={goal} className={`border p-4 rounded-lg cursor-pointer transition-colors flex items-center ${formData.goals === goal ? 'border-[#00ff9d] bg-[#00ff9d]/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}`}>
                    <input 
                      type="radio" 
                      name="goals" 
                      value={goal} 
                      onChange={handleChange} 
                      className="mr-3 accent-[#00ff9d]" 
                      required
                      checked={formData.goals === goal}
                    />
                    <span className="text-white text-sm">{t.goals[i]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className={btnSecondaryClass}>{t.back}</button>
              <button type="submit" className={btnClass}>{t.next}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-400 mb-2 font-medium">{t.nameQ}</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder={t.namePh}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 mb-2 font-medium">{t.emailQ}</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder={t.emailPh}
                required
                className={inputClass}
              />
            </div>
            
            {status === 'error' && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200" role="alert">
                {resultText.error}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className={btnSecondaryClass}>{t.back}</button>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className={`${btnClass} ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'submitting' ? t.sending : t.submit}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
