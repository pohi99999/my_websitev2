'use client';

// Closing "book a demo" form of the Brunella page. Uses the existing /api/contact endpoint (name,
// email, message, website honeypot): company, team size and the task go into the message with a
// prefix, so no new backend is needed. Texts come from brunellaPageContent (final.form).
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const inputClass = 'w-full rounded-lg border border-white/10 bg-slate-900/80 p-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none';

export default function BrunellaDemoForm({ t, privacyHref }) {
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k) => String(f.get(k) || '').trim();
    const message = [
      t.messagePrefix,
      `${t.company}: ${get('company') || '-'}`,
      `${t.size}: ${get('size') || '-'}`,
      `${t.task}: ${get('task') || '-'}`,
    ].join('\n');
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: get('name'), email: get('email'), message, website: get('website') }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return <p className="text-lg text-green-300" role="status">{t.success}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-left md:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm text-gray-300">{t.name}</span>
        <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-gray-300">{t.email}</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-gray-300">{t.company}</span>
        <input name="company" maxLength={120} autoComplete="organization" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-gray-300">{t.size}</span>
        <select name="size" defaultValue="" className={inputClass}>
          <option value="">-</option>
          {t.sizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="block md:col-span-2">
        <span className="mb-1 block text-sm text-gray-300">{t.task}</span>
        <textarea name="task" rows={3} maxLength={2000} className={inputClass} />
      </label>
      {/* honeypot: hidden from people, bots fill it; /api/contact then answers ok without sending */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="md:col-span-2 flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-60"
        >
          {t.submit} <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <p className="text-sm text-gray-400">
          {t.privacy} <Link href={privacyHref} className="text-blue-400 underline hover:text-blue-300">{t.privacyLink}</Link>
        </p>
        {status === 'error' ? <p className="text-red-300" role="alert">{t.error}</p> : null}
      </div>
    </form>
  );
}
