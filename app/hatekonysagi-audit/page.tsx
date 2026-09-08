import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import LeadMagnetForm from '../components/LeadMagnetForm';

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Digital Efficiency Audit',
          description:
            'Find out in 3 minutes where your company loses 100+ working hours a month on manual processes — and how AI can stop it.',
          canonical: '/en/hatekonysagi-audit',
        }
      : language === 'de'
        ? {
            title: 'Digitales Effizienz-Audit',
            description:
              'Finden Sie in 3 Minuten heraus, wo Ihr Unternehmen monatlich 100+ Arbeitsstunden durch manuelle Prozesse verliert — und wie KI das stoppt.',
            canonical: '/de/hatekonysagi-audit',
          }
        : {
            title: 'Digitális Hatékonysági Audit',
            description:
              'Tudd meg 3 perc alatt, hol veszít a cég havonta 100+ munkaórát a manuális folyamatokon – és hogyan állíthatod meg ezt az MI segítségével!',
            canonical: '/hatekonysagi-audit',
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/hatekonysagi-audit',
        en: '/en/hatekonysagi-audit',
        de: '/de/hatekonysagi-audit',
        'x-default': '/hatekonysagi-audit',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'website',
      images: [{ url: '/images/logo.png', alt: 'Pohánka és Társa Kft. – logó' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ff9d] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            Digitális Hatékonysági <span className="text-[#00ff9d]">Audit</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Tudd meg 3 perc alatt, hol veszít a cég havonta 100+ munkaórát a manuális folyamatokon – és hogyan állíthatod meg ezt az MI segítségével!
          </p>
        </div>

        <LeadMagnetForm />
      </div>
    </div>
  );
}
