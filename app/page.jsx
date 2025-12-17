import Hero from "./components/Hero";

export const metadata = {
  title: 'AI Ügynökség & Szoftverfejlesztés',
  description:
    'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés',
    description:
      'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
    url: '/',
    type: 'website',
    locale: 'hu_HU'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés',
    description:
      'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.'
  }
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
