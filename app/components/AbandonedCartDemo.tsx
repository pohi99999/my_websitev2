'use client';

import React, { useState } from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export function AbandonedCartDemo() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!n8nWebhookUrl) {
        throw new Error('N8N_WEBHOOK_URL is not configured');
      }
      const response = await fetch(`${n8nWebhookUrl}/webhook/abandoned-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: 'Érdeklődő',
          customer_email: email,
          product_name: 'Próba Termék (Demó)',
        }),
      });

      if (!response.ok) {
        throw new Error('Hálózati hiba történt');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-black/40 to-blue-900/20 backdrop-blur-xl border border-[#00e5ff]/20 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#00e5ff]/10 rounded-full text-[#00e5ff]">
          <ShoppingCart size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">Próbáld ki: Kosárelhagyás Demó</h3>
      </div>
      
      <p className="text-sm text-gray-300 mb-6">
        Kíváncsi vagy, hogyan működik a gyakorlatban? Add meg az e-mail címed, és a rendszerünk automatikusan küld egy "kosárelhagyó" emlékeztetőt (egy kuponnal), mintha most hagytál volna félbe egy vásárlást.
      </p>

      {status === 'success' ? (
        <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
          <p className="font-semibold mb-1">A folyamat elindult!</p>
          <p>Ellenőrizd a beérkező leveleidet (kb. 2 óra múlva érkezne élesben, de most perceken belül megkapod, ha a webhook úgy van beállítva).</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff]/50 transition-all text-sm"
            placeholder="E-mail címed ide..."
          />
          {status === 'error' && (
            <p className="text-red-400 text-xs text-center">Hiba történt. Kérjük, próbáld újra.</p>
          )}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black bg-[#00e5ff] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'submitting' ? 'Indítás...' : 'Demó elindítása'}
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  );
}