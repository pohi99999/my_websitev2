import { ogImageFor, ogLocale } from '../lib/ogImage';
import React from 'react';
import { headers } from "next/headers";

import Hero from './components/Hero';
import KinekSzol from './components/KinekSzol';
import MitKapsz from './components/MitKapsz';
import Modulok from './components/Modulok';
import Arcsomag from '../components/Arcsomag';
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
          title: 'Website with booking or quote requests',
          description:
            'Websites with online booking or a quote request form for small businesses, ready in two weeks at a fixed price. We start with a free design preview.',
          canonical: '/en/weboldal-ai-kkv',
        }
      : language === 'de'
      ? {
          title: 'Website mit Buchung oder Anfrage',
          description:
            'Websites mit Online-Buchung oder Anfrageformular für kleine Firmen, in zwei Wochen zum Festpreis. Wir starten mit einem kostenlosen Entwurf.',
          canonical: '/de/weboldal-ai-kkv',
        }
      : {
          title: 'Időpontfoglaló és ajánlatkérő weboldal',
          description:
            'Weboldal időpontfoglalással vagy ajánlatkérő űrlappal kisvállalkozásoknak, két hét alatt, fix áron. Ingyenes, kötelezettségmentes látványtervvel kezdünk.',
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
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'website',
      locale: ogLocale(language),
      images: [{ url: ogImageFor(language, '/weboldal-ai-kkv'), width: 1200, height: 630, alt: meta.title }],
    },
    // the same image on X (it was the layout logo)
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: [ogImageFor(language, '/weboldal-ai-kkv')] },
  };
}

// Under the price block, Hungarian only: the package page exists in Hungarian alone (Péter 13860). A server
// component with the classes the price block already uses, so nothing reaches the client JS or the shared CSS.
async function OnlineJelenletLink() {
  const lang = (await headers()).get('x-site-language');
  if (lang === 'en' || lang === 'de') return null;
  return (
    <p
      className="text-center text-gray-400 text-sm"
      style={{ position: 'relative', margin: '-3rem 0 0', padding: '0 1rem 3rem', background: 'rgba(0,0,0,0.82)' }}
    >
      Google Cégprofil és Facebook-oldal is kell a weboldal mellé?{' '}
      <a href="/online-jelenlet" className="text-[#00e5ff] hover:underline">
        Online jelenlét induló csomag
      </a>
    </p>
  );
}

export default function WeboldalAiKkvPage() {
  return (
    <>
      <Hero />
      <KinekSzol />
      <MitKapsz />
      <Modulok />
      {/* the home page's price block, the single source (Péter 6312), in HU/EN/DE */}
      <Arcsomag contactHref="/kapcsolat" />
      <OnlineJelenletLink />
      <HogyanDolgozunk />
      <Referenciak />
      <FAQ />
      <ZaroCTA />
    </>
  );
}
