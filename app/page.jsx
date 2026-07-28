import Hero from "./components/Hero";
import AIFolyamatok from "./components/AIFolyamatok";
import StatsBar from "./components/StatsBar";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
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
          title: 'Pohánka & Co. - Professional Agency Representation & Product Protection',
          description:
            'Professional agency representation, Brunella AI agents, product protection, and business process automation for growing enterprises.',
          canonical: 'https://www.pohankaestarsa.com/en',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Pohánka & Co. - Professionelle Vertretung & Produktschutz',
          description:
            'Professionelle Vertretung, Brunella KI-Agenten, Produktschutz und KI-Prozessautomatisierung mit messbarem ROI.',
          canonical: 'https://www.pohankaestarsa.com/de',
          locale: 'de_DE',
        }
      : {
          title: 'Pohánka és Társa - Professzionális Ügynöki Képviselet, Brunella AI és Termékvédelem',
          description:
            'Pohánka és Társa: Professzionális ügynöki képviselet, Brunella AI ügynökök, termékvédelem és AI-vezérelt folyamatautomatizálás magyar KKV-k számára azonnali ROI-val.',
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
      <HowItWorks />
      <Testimonials />
      <ClientVideo />
      <BemutatkozoVideo />
      <ContactCapture />
      <HomepageFAQ />
    </>
  );
}
