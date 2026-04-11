import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import AIFolyamatok from "./components/AIFolyamatok";
import RoiCalculator from "./components/RoiCalculator";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import ContactCapture from "./components/ContactCapture";
import HomepageFAQ from "./components/HomepageFAQ";
import { headers } from "next/headers";

export const revalidate = 3600;

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Brunella AI Automation | SME Digitalization | pohankaestarsa.com',
          description:
            'AI agent system for SMEs. 95+ specialized AI agents, automated lead generation, accounting, and customer support with measurable time savings.',
          canonical: '/en',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Brunella KI-Automatisierung | KMU-Digitalisierung | pohankaestarsa.com',
          description:
            'KI-Agentensystem für KMU. 95+ spezialisierte KI-Agenten, automatisierte Lead-Generierung, Buchhaltung und Support mit messbarer Zeitersparnis.',
          canonical: '/de',
          locale: 'de_DE',
        }
      : {
          title: 'Brunella AI Automatizálás | KKV Digitalizáció | pohankaestarsa.com',
          description:
            'AI ügynök rendszer KKV-knak. 95+ specializált AI ügynök, automatizált lead generálás, könyvelés, ügyfélszolgálat. 80% időmegtakarítás. Ingyenes konzultáció.',
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
      <Hero />
      <StatsBar />
      <AIFolyamatok />
      <RoiCalculator />
      <HowItWorks />
      <Testimonials />
      <ContactCapture />
      <HomepageFAQ />
    </>
  );
}
