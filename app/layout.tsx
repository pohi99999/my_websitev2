import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileCTA from './components/MobileCTA';
import SequentialVideoBackground from './components/SequentialVideoBackground';
import LenisProvider from './components/LenisProvider';
import { LanguageProvider } from './context/LanguageContext';
import { cookies, headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

const inter = Inter( { subsets: ['latin'], display: 'swap', variable: '--font-inter' } );
const syne = Syne( { subsets: ['latin'], display: 'swap', variable: '--font-syne', weight: ['600', '700', '800'] } );

export const metadata: Metadata = {
  metadataBase: new URL( 'https://www.pohankaestarsa.com' ),
  title: {
    template: '%s | Pohánka AI',
    default: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés'
  },
  description:
    'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
  keywords: "szoftverfejlesztés, AI, mesterséges intelligencia, felhő, cloud, webfejlesztés, Budapest",
  creator: "Pohánka Péter",
  publisher: "Pohánka és Társa Kft.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Pohánka és Társa Kft. | AI Ügynökség & Szoftverfejlesztés',
    description:
      'Innovatív AI megoldások, Brunella Agent System és egyedi szoftverfejlesztés KKV-k számára. Automatizálja üzleti folyamatait velünk.',
    type: 'website',
    locale: 'hu_HU',
    url: 'https://www.pohankaestarsa.com',
    images: [
      {
        url: '/images/logo.png',
        alt: 'Pohánka és Társa Kft. – logó'
      }
    ]
  },
};

export default async function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  const cookieStore = await cookies();
  const langCookie = cookieStore.get( 'site-language' )?.value;
  const headerStore = await headers();
  const headerLang = headerStore.get( 'x-site-language' );
  const initialLanguage =
    headerLang === 'de' || langCookie === 'de'
      ? 'de'
      : headerLang === 'en' || langCookie === 'en'
        ? 'en'
        : 'hu';

  return (
    <html lang={ initialLanguage }>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        {/* PWA manifest */ }
        <link rel="manifest" href="/manifest.json" />
        {/* theme-color: Chrome, Safari, Edge (dark/light variants) */ }
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#00ff9d" />
        {/* Apple PWA */ }
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pohánka AI" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        {/* Global hreflang fallback */ }
        <link rel="alternate" hrefLang="hu" href="https://www.pohankaestarsa.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.pohankaestarsa.com/en/" />
        <link rel="alternate" hrefLang="de" href="https://www.pohankaestarsa.com/de/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pohankaestarsa.com/" />

        {/* Organization Schema */ }
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ {
            __html: JSON.stringify( {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pohánka és Társa Kft.",
              description: "Szoftverfejlesztés és AI megoldások",
              url: "https://www.pohankaestarsa.com",
              logo: "https://www.pohankaestarsa.com/images/logo.png",
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
            } )
          } }
        />

        {/* LocalBusiness Schema */ }
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ {
            __html: JSON.stringify( {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Pohánka és Társa Kft.",
              image: "https://www.pohankaestarsa.com/images/logo.png",
              telephone: "+36 30 244 6779",
              address: {
                "@type": "PostalAddress",
                addressCountry: "HU",
                addressLocality: "Zalaegerszeg"
              }
            } )
          } }
        />
      </head>
      <body className={ `${ inter.variable } ${ syne.variable } ${ inter.className } bg-black text-white` }>
        {/* Skip navigation – akadálymentesítés */ }
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Ugrás a fő tartalomhoz
        </a>
        <SequentialVideoBackground />
        <LanguageProvider initialLanguage={ initialLanguage }>
          <LenisProvider>
            <Header />
            <main id="main-content" className="pt-20">
              { children }
            </main>
            <Footer />
            <MobileCTA />
          </LenisProvider>
        </LanguageProvider>
        <Analytics />
        {/* Service Worker regisztráció */ }
        <Script id="sw-register" strategy="afterInteractive">
          { `if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {});
              });
            }`}
        </Script>
        {/* Tawk.to Live Chat */ }
        <Script id="tawkto" strategy="lazyOnload">
          { `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6847f8b0258d2119151c5e2f/1it9k7a72';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();`}
        </Script>
      </body>
    </html>
  );
}