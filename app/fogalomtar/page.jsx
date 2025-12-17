import GlossaryClient from './GlossaryClient';

export const metadata = {
  title: 'Fogalomtár (AI & Tech)',
  description:
    'Kereshető AI és technológiai fogalomtár a Brunella Agent System és a modern mesterséges intelligencia kulcsfogalmaival.',
  openGraph: {
    title: 'AI és Technológiai Fogalomtár | Pohánka AI',
    description:
      'Kereshető AI és technológiai fogalomtár a Brunella Agent System és a modern mesterséges intelligencia kulcsfogalmaival.',
    images: [{ url: '/images/logo.png', alt: 'Pohánka és Társa Kft. – logó' }]
  }
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
