'use client';

import React, { useState } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

export default function InstantResponderDemo() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setReply(null);

    try {
      const res = await fetch('/api/instant-responder/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (data.ok) {
        setReply(data.reply);
      } else {
        setReply('Sajnálom, hiba történt a generálás közben. Kérlek próbáld újra!');
      }
    } catch (err) {
      console.error(err);
      setReply('Hálózati hiba történt. Kérlek ellenőrizd a kapcsolatod!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Interactive Sandbox</div>
      </div>

      <div className="p-8 space-y-8">
        {/* User Input Area */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <User size={16} />
            Ügyfél üzenete:
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 transition-all resize-none"
              rows={3}
              placeholder="Pl. Érdekelne a napelem rendszer telepítés, tudnátok küldeni egy árlistát?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="absolute bottom-4 right-4 p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
        </div>

        {/* AI Reply Area */}
        {(reply || loading) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <Bot size={16} />
              MI Válaszadó:
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              {loading ? (
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <p className="text-slate-200 leading-relaxed italic">
                  &ldquo;{reply}&rdquo;
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-slate-950/50 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center">
        <span>Powered by n8n & Gemini 2.0 Flash</span>
        <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            LATENCY: {loading ? '...' : reply ? '~1.2s' : 'READY'}
        </span>
      </div>
    </div>
  );
}
