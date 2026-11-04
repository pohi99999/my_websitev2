'use client';

import React, { useState } from 'react';
import { FORM_STATUSES, FORMS, PAGE_NAMES, trackFormSubmit } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

// The "Projekt Egyeztetés" form on /szolgaltatasok. It sends through the site's own /api/contact (SMTP: the
// same recipient, rate limit and honeypot as the /kapcsolat form; Marveen 5871). Until 11-01 it posted to the
// n8n 'lead-form' webhook, whose workflow scored the lead and kept nothing, while the webhook's instant 200
// showed the visitor a success. Success is shown only when the server says the mail went out.
export function SmartContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_description: '',
    budget: ''
  });
  const [website, setWebsite] = useState(''); // honeypot, as on /kapcsolat
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // the same endpoint as KapcsolatClient (optionally an external backend base)
      const externalApiBase = process.env.NEXT_PUBLIC_API_ENDPOINT?.trim();
      const contactUrl = externalApiBase ? `${externalApiBase.replace(/\/$/, '')}/api/contact` : '/api/contact';
      // /api/contact takes name, email and message: the budget and the description go into the message
      const message = [
        'Projekt Egyeztetés (Szolgáltatások oldal)',
        `Tervezett büdzsé: ${formData.budget}`,
        '',
        formData.project_description,
      ].join('\n');
      const response = await fetch(contactUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.name, email: formData.email, message, website }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        trackFormSubmit({ form: FORMS.SmartContact, status: FORM_STATUSES.ErrorResponse, language, page: PAGE_NAMES.Services });
        setStatus('error');
        return;
      }

      setStatus('success');
      // the API answers ok to a filled honeypot on purpose; that is a bot, not a lead
      if (!website) {
        trackFormSubmit({ form: FORMS.SmartContact, status: FORM_STATUSES.Success, language, page: PAGE_NAMES.Services });
      }
      setFormData({ name: '', email: '', project_description: '', budget: '' });
    } catch (error) {
      console.error('Submission error:', error);
      trackFormSubmit({ form: FORMS.SmartContact, status: FORM_STATUSES.ErrorException, language, page: PAGE_NAMES.Services });
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* no visible title of its own: the section's <h2> "Projekt egyeztetés" on /szolgaltatasok already names
          it (the card's <h3> repeated it word for word); the form keeps its accessible name via aria-label */}
      {status === 'success' ? (
        <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-200">
          <p className="font-semibold text-lg">Köszönjük a megkeresést!</p>
          <p>Munkatársunk (vagy MI asszisztensünk) hamarosan felveszi Önnel a kapcsolatot.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-label="Projekt egyeztetés" className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Név</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Kovács Péter"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail cím</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="peter@ceged.hu"
            />
          </div>

          <div>
            <label htmlFor="project_description" className="block text-sm font-medium text-gray-300 mb-1">Projekt leírása / Igények</label>
            <textarea
              id="project_description"
              name="project_description"
              required
              rows={4}
              value={formData.project_description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Miben segíthetünk? (pl. Weboldal készítés, MI automatizáció...)"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">Tervezett büdzsé</label>
            <select
              id="budget"
              name="budget"
              required
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [&>option]:bg-gray-900"
            >
              <option value="" disabled>Válasszon...</option>
              <option value="Azonnali demó (Ingyenes)">Azonnali demó (Ingyenes)</option>
              <option value="100.000 - 300.000 Ft">100.000 - 300.000 Ft (Alap)</option>
              <option value="300.000 - 1.000.000 Ft">300.000 - 1.000.000 Ft (Komplex)</option>
              <option value="1.000.000 Ft felett">1.000.000 Ft felett (Vállalati)</option>
            </select>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="smart-honeypot-website">Website</label>
            <input
              id="smart-honeypot-website"
              name="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm">Hiba történt az elküldés során. Kérjük, próbálja újra.</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
          >
            {status === 'submitting' ? 'Küldés folyamatban...' : 'Ajánlatkérés elküldése'}
          </button>
        </form>
      )}
    </div>
  );
}