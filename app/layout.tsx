import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SequentialVideoBackground from './components/SequentialVideoBackground';
import LenisProvider from './components/LenisProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
    locale: 'hu_HU'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00ff9d" />
        <link rel="canonical" href="https://pohanka.company" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pohánka és Társa Kft.",
              description: "Szoftverfejlesztés és AI megoldások",
              url: "https://pohanka.company",
              logo: "https://pohanka.company/logo.png",
              contact: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+36-1-xxx-xxxx",
                email: "info@pohanka.company"
              },
              sameAs: [
                "https://www.facebook.com/pohanka",
                "https://www.linkedin.com/company/pohanka",
                "https://twitter.com/pohanka"
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "HU",
                addressLocality: "Budapest",
                streetAddress: "Pohánka utca 1."
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
              image: "https://pohanka.company/logo.png",
              telephone: "+36-1-xxx-xxxx",
              address: {
                "@type": "PostalAddress",
                addressCountry: "HU",
                addressLocality: "Budapest"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <SequentialVideoBackground />
        <LenisProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}