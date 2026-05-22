import LeadListaClient from './LeadListaClient';

import { headers } from 'next/headers';
export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Dental Lead List 2.0 | Pohánka AI',
          description: 'AI-optimized list of 410 Hungarian dental clinics with segmented growth opportunities.',
          canonical: '/en/fogaszati-lead-lista',
        }
      : language === 'de'
      ? {
          title: 'Dental Lead Liste 2.0 | Pohánka AI',
          description: 'KI-optimierte Liste mit 410 ungarischen Zahnkliniken und segmentierten Wachstumschancen.',
          canonical: '/de/fogaszati-lead-lista',
        }
      : {
          title: 'Fogászati Lead Lista 2.0 | Pohánka AI',
          description: '410 magyarországi fogászat, AI-optimalizált lead lista, 47.490 Ft értékben csak 9.990 Ft-ért.',
          canonical: '/fogaszati-lead-lista',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/fogaszati-lead-lista',
        en: '/en/fogaszati-lead-lista',
        de: '/de/fogaszati-lead-lista',
      },
    },
  };
}

export default function FogaszatiLeadListaPage() {
  return <LeadListaClient />;
}
