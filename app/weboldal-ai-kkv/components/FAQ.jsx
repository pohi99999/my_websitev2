"use client";

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FAQ_COPY } from './faqCopy';

// hu/en/de (card 780eb834): until 2026-10-09 the FAQ was Hungarian only, also on /en and /de.
export default function FAQ() {
  const { language } = useLanguage();
  const lang = language === 'en' || language === 'de' ? language : 'hu';
  const { heading, items } = FAQ_COPY[lang];

  return (
    <section className="py-20 px-6 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold mb-16 text-center">{heading}</h2>
        <div className="space-y-6">
          {items.map((faq, i) => (
            <div key={i} className="p-6 border-b border-white/10">
              <h3 className="text-lg font-bold mb-3 text-[#00e5ff]">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
