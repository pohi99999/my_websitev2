import { headers } from 'next/headers';
import { ogImageFor } from '../app/lib/ogImage';

export async function generatePortfolioMetadata({ id, translations, imageSrc }) {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta = translations[language] || translations['hu'];

  const metadata = {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: `/portfolio/${id}`,
        en: `/en/portfolio/${id}`,
        de: `/de/portfolio/${id}`,
        'x-default': `/portfolio/${id}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'article',
      locale: meta.locale,
    }
  };

  // Without a page image, the generated share image with the page's own title (not the layout logo).
  metadata.openGraph.images = [{ url: imageSrc || ogImageFor(language, `/portfolio/${id}`), width: 1200, height: 630, alt: meta.title }];

  return metadata;
}
