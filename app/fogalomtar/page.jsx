import GlossaryClient from './GlossaryClient';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'AI Glossary | Pohánka AI',
          description: 'Essential AI and technology concepts explained in clear business language.',
          canonical: '/en/fogalomtar',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'KI-Glossar | Pohánka AI',
          description: 'Wichtige KI- und Technologiebegriffe klar und verständlich erklärt.',
          canonical: '/de/fogalomtar',
          locale: 'de_DE',
        }
      : {
          title: 'AI Fogalomtár | Pohánka AI',
          description: 'A modern AI és technológiai fogalmak közérthetően magyarázva, a Brunella rendszer szemléletével.',
          canonical: '/fogalomtar',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/fogalomtar',
        en: '/en/fogalomtar',
        de: '/de/fogalomtar',
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
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function GlossaryPage() {
  return <GlossaryClient />;
}
