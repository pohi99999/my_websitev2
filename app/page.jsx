import Hero from "./components/Hero";
import AIFolyamatok from "./components/AIFolyamatok";
import Testimonials from "./components/Testimonials";
import { headers } from "next/headers";

export const revalidate = 3600;

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'AI Agency & Software Development | Pohánka AI',
          description:
            'Innovative AI solutions, Brunella Agent System and custom software engineering for SMEs.',
          canonical: '/en',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'KI-Agentur & Softwareentwicklung | Pohánka AI',
          description:
            'Innovative KI-Lösungen, Brunella Agent System und individuelle Softwareentwicklung für KMU.',
          canonical: '/de',
          locale: 'de_DE',
        }
      : {
          title: 'AI Ügynökség & Szoftverfejlesztés | Pohánka AI',
          description:
            'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
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
    <main>
      <Hero />
      <AIFolyamatok />
      <Testimonials />
    </main>
  );
}
