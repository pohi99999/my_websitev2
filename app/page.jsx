import Hero from "./components/Hero";
import AIFolyamatok from "./components/AIFolyamatok";
import StatsBar from "./components/StatsBar";
import RoiCalculator from "./components/RoiCalculator";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Arcsomag from "./components/Arcsomag";
import ClientVideo from "./components/ClientVideo";
import BemutatkozoVideo from "./components/BemutatkozoVideo";
import ContactCapture from "./components/ContactCapture";
import HomepageFAQ from "./components/HomepageFAQ";
import { headers } from "next/headers";

export const revalidate = 3600;

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Websites, AI Automation and Agent Systems | Zalaegerszeg',
          description:
            'Websites, AI automation and AI agent systems for businesses: we build and deploy them. Pohánka és Társa, Zalaegerszeg, Hungary.',
          canonical: 'https://www.pohankaestarsa.com/en',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Webseiten, KI-Automatisierung und Agentensysteme | Zalaegerszeg',
          description:
            'Webseiten, KI-Automatisierung und KI-Agentensysteme für Unternehmen: wir entwickeln und führen sie ein. Pohánka és Társa, Zalaegerszeg, Ungarn.',
          canonical: 'https://www.pohankaestarsa.com/de',
          locale: 'de_DE',
        }
      : {
          // A három szolgáltatás + Zalaegerszeg; márkanévvel együtt már nem fér a találati
          // lista ~600 px-es sorába (mérve Arial-metrikával: így 554 px, márkával 622+ px).
          // A márkát az og:site_name viszi.
          title: 'Weboldal, AI automatizálás és ügynökrendszer | Zalaegerszeg',
          description:
            'Weboldal készítés Zalaegerszegen és Zala megyében (alapcsomag 150 000 Ft), AI automatizálás és AI ügynökrendszerek létrehozása, telepítése cégeknek.',
          canonical: 'https://www.pohankaestarsa.com/',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: 'https://www.pohankaestarsa.com/',
        en: 'https://www.pohankaestarsa.com/en',
        de: 'https://www.pohankaestarsa.com/de',
        'x-default': 'https://www.pohankaestarsa.com/',
      },
    },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: meta.canonical,
        type: 'website',
        locale: meta.locale,
        siteName: 'Pohánka és Társa',
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AIFolyamatok />
      <StatsBar />
      <RoiCalculator />
      <HowItWorks />
      <Testimonials />
      <Arcsomag />
      <ClientVideo />
      <BemutatkozoVideo />
      <ContactCapture />
      <HomepageFAQ />
    </>
  );
}
