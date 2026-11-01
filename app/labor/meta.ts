import { headers } from 'next/headers';
import { ogImageFor, ogLocale } from '../lib/ogImage';

// /labor metadata (title, description, canonical, hreflang, share image), kept apart from page.tsx: this
// module has no client imports, so localizedRouteMeta (used by the /en and /de catch-all) can import it
// without pulling the page's client components into the /en and /de homepage JS.

type Lang = 'hu' | 'en' | 'de';

const META: Record<Lang, { title: string; description: string }> = {
  hu: {
    title: 'Labor: négy modul, egy rendszer',
    description: 'Weboldal, automatizálás, alkalmazás és AI-csapat egy rendszerben, térbeli bemutatóban. Pohánka és Társa, Zalaegerszeg.',
  },
  en: {
    title: 'Lab: four modules, one system',
    description: 'Website, automation, apps and an AI team as one system, shown in 3D. Pohánka & Társa, Zalaegerszeg, Hungary.',
  },
  de: {
    title: 'Labor: vier Module, ein System',
    description: 'Website, Automatisierung, Apps und ein KI-Team als ein System, in 3D gezeigt. Pohánka & Társa, Zalaegerszeg, Ungarn.',
  },
};

export async function generateMetadata() {
  const h = (await headers()).get('x-site-language');
  const language: Lang = h === 'en' ? 'en' : h === 'de' ? 'de' : 'hu';
  const { title, description } = META[language];
  const canonical = language === 'hu' ? '/labor' : `/${language}/labor`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { hu: '/labor', en: '/en/labor', de: '/de/labor', 'x-default': '/labor' },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: ogLocale(language),
      images: [{ url: ogImageFor(language, '/labor'), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
