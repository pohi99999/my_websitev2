import Hero from "./components/Hero";

export const metadata = {
  title: 'AI Ügynökség & Szoftverfejlesztés',
  description:
    'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
  openGraph: {
    title: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés',
    description:
      'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
    images: [{ url: '/images/logo.png', alt: 'Pohánka és Társa Kft. – logó' }]
  }
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
