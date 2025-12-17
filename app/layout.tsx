import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SequentialVideoBackground from './components/SequentialVideoBackground';
import LenisProvider from './components/LenisProvider';
import { LanguageProvider } from './context/LanguageContext';
import { cookies, headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://pohanka.vercel.app'),
  title: {
    template: '%s | Pohánka AI',
    default: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés'
  },
  description:
    'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
  keywords: "szoftverfejlesztés, AI, mesterséges intelligencia, felhő, cloud, webfejlesztés, Budapest",
  creator: "Pohánka Péter",
  publisher: "Pohánka és Társa Kft.",
  openGraph: {
    title: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés',
    description:
      'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
    type: 'website',
    locale: 'hu_HU',
    url: 'https://pohanka.vercel.app',
    images: [
      {
        url: '/images/logo.png',
        alt: 'Pohánka és Társa Kft. – logó'
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const langCookie = cookieStore.get('site-language')?.value;
  const headerLang = headers().get('x-site-language');
  const initialLanguage = headerLang === 'en' || langCookie === 'en' ? 'en' : 'hu';

  return (
    <html lang={initialLanguage}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00ff9d" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pohánka és Társa Kft.",
              description: "Szoftverfejlesztés és AI megoldások",
              url: "https://pohanka.vercel.app",
              logo: "https://pohanka.vercel.app/images/logo.png",
              contact: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+36 30 244 6779",
                email: "peterpohankapersonal@gmail.com"
              },
              sameAs: [
                "https://www.linkedin.com/in/pohi99999/",
                "https://www.facebook.com/profile.php?id=61576881120445",
                "https://github.com/pohi99999",
                "https://x.com/pohanka_peter",
                "https://g.dev/PohankaPeter",
                "https://www.youtube.com/@J%C3%B3zsefP%C3%A9terPoh%C3%A1nka"
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "HU",
                addressLocality: "Zalaegerszeg"
              }
            })
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Pohánka és Társa Kft.",
              image: "https://pohanka.vercel.app/images/logo.png",
              telephone: "+36 30 244 6779",
              address: {
                "@type": "PostalAddress",
                addressCountry: "HU",
                addressLocality: "Zalaegerszeg"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className} bg-black text-white`}>
        <SequentialVideoBackground />
        <LanguageProvider initialLanguage={initialLanguage}>
          <LenisProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}