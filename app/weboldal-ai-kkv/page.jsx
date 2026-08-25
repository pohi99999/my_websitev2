import React from 'react';
import { headers } from "next/headers";

import Hero from './components/Hero';
import KinekSzol from './components/KinekSzol';
import MitKapsz from './components/MitKapsz';
import Csomagok from './components/Csomagok';
import HogyanDolgozunk from './components/HogyanDolgozunk';
import Referenciak from './components/Referenciak';
import FAQ from './components/FAQ';
import ZaroCTA from './components/ZaroCTA';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Website + AI for SMEs | Pohánka AI',
          description:
            'Modern, lead-generating websites with built-in AI automation for Hungarian small and medium-sized businesses.',
          canonical: '/en/weboldal-ai-kkv',
        }
      : language === 'de'
      ? {
          title: 'Webseite + KI für KMU | Pohánka AI',
          description:
            'Moderne, Lead-generierende Webseiten mit integrierter KI-Automatisierung für ungarische KMU.',
          canonical: '/de/weboldal-ai-kkv',
        }
      : {
          title: 'Weboldal + AI-automatizálás magyar KKV-knak | Pohánka AI',
          description:
            'Modern, lead-generáló weboldalak és beépített AI folyamatautomatizálás magyar KKV-k számára. Időmegtakarítás és több vevő.',
          canonical: 'https://www.pohankaestarsa.com/weboldal-ai-kkv',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: 'https://www.pohankaestarsa.com/weboldal-ai-kkv',
        en: 'https://www.pohankaestarsa.com/en/weboldal-ai-kkv',
        de: 'https://www.pohankaestarsa.com/de/weboldal-ai-kkv',
        'x-default': 'https://www.pohankaestarsa.com/weboldal-ai-kkv',
      },
    },
  };
}

export default function WeboldalAiKkvPage() {
  return (
    <>
      <Hero />
      <KinekSzol />
      <MitKapsz />
      <Csomagok />
      <HogyanDolgozunk />
      <Referenciak />
      <FAQ />
      <ZaroCTA />
    </>
  );
}
