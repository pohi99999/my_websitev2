import GlobalVideoBackground from "./components/GlobalVideoBackground";
import Hero from "./components/Hero";
import AIFolyamatok from "./components/AIFolyamatok";
import StatsBar from "./components/StatsBar";
import RoiCalculator from "./components/RoiCalculator";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
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
          title: 'Business AI Systems | Pohánka AI',
          description:
            'Business-ready AI systems designed for companies. Automation, decision support, and custom integrations with measurable results.',
          canonical: '/en',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'KI-Systeme für Unternehmen | Pohánka AI',
          description:
            'Unternehmensnahe KI-Systeme für Automatisierung, Entscheidungshilfe und Integrationen mit messbaren Ergebnissen.',
          canonical: '/de',
          locale: 'de_DE',
        }
      : {
          title: 'Mesterséges intelligencia és AI rendszerek vállalkozásoknak | Pohánka AI',
          description:
          'Vállalkozásokra szabott AI rendszerek tervezése, fejlesztése és bevezetése. Automatizálás, intelligens döntéstámogatás és üzleti integrációk mérhető eredménnyel.',
          canonical: '/',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/',
        en: '/en',
        de: '/de',
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
      <GlobalVideoBackground />
      <Hero />
      <AIFolyamatok />
      <StatsBar />
      <RoiCalculator />
      <HowItWorks />
      <Testimonials />
      <ContactCapture />
      <HomepageFAQ />
    </>
  );
}
