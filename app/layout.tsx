import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeferredLayoutEnhancements from './components/DeferredLayoutEnhancements';
import LenisProvider from './components/LenisProvider';
import { LanguageProvider } from './context/LanguageContext';
import { cookies, headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import BrunellaChat from './components/BrunellaChat';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookieConsent from './components/CookieConsent';

const inter = Inter( { subsets: ['latin'], display: 'swap', variable: '--font-inter' } );
const syne = Syne( { subsets: ['latin'], display: 'swap', variable: '--font-syne', weight: ['600', '700', '800'] } );

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL( 'https://www.pohankaestarsa.com' ),
  title: {
    template: '%s | Pohánka és Társa',
    default: 'Pohánka és Társa - Weboldal, automatizálás és AI-rendszerek vállalkozásoknak'
  },
  description:
    'Időpontfoglaló és ajánlatkérő weboldal, webáruház, web- és mobilalkalmazás, automatizálás és AI-rendszerek vállalkozásoknak. Pohánka és Társa, Zalaegerszeg.',
  keywords: 'weboldal készítés Zalaegerszeg, időpontfoglaló weboldal, ajánlatkérő weboldal, foglalási rendszer, webáruház készítés, portál fejlesztés, mobilalkalmazás fejlesztés, automatizálás vállalkozásoknak, AI rendszerek vállalkozásoknak, Brunella AI ügynökrendszer',
  creator: "Pohánka Péter",
  publisher: "Pohánka és Társa Kft.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Pohánka és Társa - Weboldal, automatizálás és AI-rendszerek',
    description:
      'Időpontfoglaló és ajánlatkérő weboldal két hét alatt, fix áron, valamint automatizálás és AI-rendszerek vállalkozásoknak.',
    type: 'website',
    siteName: 'Pohánka és Társa',
    locale: 'hu_HU',
    url: 'https://www.pohankaestarsa.com',
    images: [{
      url: '/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'Pohánka és Társa Kft.: weboldal, automatizálás és AI-rendszerek'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pohánka és Társa - Weboldal, automatizálás és AI-rendszerek',
    description: 'Időpontfoglaló és ajánlatkérő weboldal két hét alatt, fix áron, valamint automatizálás és AI-rendszerek vállalkozásoknak.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.pohankaestarsa.com',
    languages: {
      'hu': 'https://www.pohankaestarsa.com/',
      'en': 'https://www.pohankaestarsa.com/en',
      'de': 'https://www.pohankaestarsa.com/de',
      'x-default': 'https://www.pohankaestarsa.com/',
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pohánka és Társa',
  },
  other: {
    'p:domain_verify': '90d4274ae6a50195179afc7d5e1ad5d3',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://www.pohankaestarsa.com/#organization',
  name: 'Pohánka és Társa',
  legalName: 'Pohánka és Társa Kft.',
  url: 'https://www.pohankaestarsa.com',
  logo: 'https://www.pohankaestarsa.com/images/logo.png',
  image: 'https://www.pohankaestarsa.com/images/logo.png',
  description: 'Weboldal (időpontfoglalással vagy ajánlatkéréssel), webáruház, web- és mobilalkalmazás, automatizálás és AI-rendszerek vállalkozásoknak, Zalaegerszegről.',
  telephone: '+36304291227',
  email: 'peterpohankapersonal@gmail.com',
  address: {
    '@type': 'PostalAddress',
    // Irodai cím, betűre a Google Cégprofilon állóval (NAP-egyezés, helyi SEO). A székhely
    // (Berek utca 38.) az impresszumba és az adatvédelmi tájékoztatóba tartozik.
    streetAddress: 'Kossuth Lajos u. 39',
    addressLocality: 'Zalaegerszeg',
    postalCode: '8900',
    addressCountry: 'HU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // A Google Cégprofil place-koordinátája (Maps), Brunella mérése 2026-09-23.
    latitude: '46.8392833',
    longitude: '16.8454274',
  },
  // Nyitvatartás a Google Cégprofil szerint (NAP-egyezés); vasárnap zárva.
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '11:30',
    },
  ],
  sameAs: [
    'https://www.google.com/maps?cid=12905258183432338232',
    'https://www.linkedin.com/in/pohi99999/',
    'https://www.facebook.com/profile.php?id=61576881120445',
    'https://github.com/pohi99999',
    'https://x.com/pohanka_peter',
    'https://www.youtube.com/@J%C3%B3zsefP%C3%A9terPoh%C3%A1nka',
    'https://g.dev/PohankaPeter',
  ],
  areaServed: [
    { '@type': 'City', name: 'Zalaegerszeg' },
    { '@type': 'AdministrativeArea', name: 'Zala megye' },
  ],
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Szolgáltatások és Termékek',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Weboldal készítés',
          description: 'Funkciógazdag weboldal időpontfoglalással vagy ajánlatkérő űrlappal, két hét alatt, fix áron.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automatizálás',
          description: 'Az ajánlatkérés, a nyilvántartás, a válaszlevél és a számla közti kézi lépések automatizálása.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Webáruház, portál, web- és mobilalkalmazás',
          description: 'Egyedi fejlesztés projektalapon.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brunella AI ügynökrendszer',
          description: 'A cég saját gépén futó AI-csapat a napi adminisztrációra, emberi jóváhagyással.',
        },
      },
    ],
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
  const skipLinkLabel =
    initialLanguage === 'de'
      ? 'Zum Hauptinhalt springen'
      : initialLanguage === 'en'
        ? 'Skip to main content'
        : 'Ugrás a fő tartalomhoz';
  const shouldLoadVercelAnalytics = process.env.VERCEL === '1';
  const tawkEmbedUrl = process.env.NEXT_PUBLIC_TAWK_EMBED_URL?.trim();
  const requestHost = headerStore.get('host') ?? '';
  const isProductionHost = requestHost === 'www.pohankaestarsa.com' || requestHost === 'pohankaestarsa.com';
  const gaId = isProductionHost ? (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-BZQL39E3RD') : undefined;

  return (
    <html lang={initialLanguage} className="scroll-smooth">
      <head>
        <script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify( organizationSchema ) }}
        />
      </head>
      <body className={`${ inter.variable } ${ syne.variable } ${ inter.className } bg-black text-white antialiased`}>
        {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}
        {/* Skip navigation – akadálymentesítés */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#00e5ff] focus:text-black focus:rounded-lg focus:text-sm focus:font-bold"
        >
          {skipLinkLabel}
        </a>
        <LanguageProvider initialLanguage={initialLanguage}>
          <LenisProvider>
            <DeferredLayoutEnhancements />
            <Header />
            <main id="main-content" className="pt-20">
              {children}
            </main>
            <Footer />
          </LenisProvider>
          <BrunellaChat />
          <CookieConsent />
        </LanguageProvider>
        {shouldLoadVercelAnalytics ? <Analytics /> : null}
        {/* Service Worker regisztráció */}
        <Script id="sw-register" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) { console.error('Service Worker registration failed:', err); });
              });
            }` }} />
        {tawkEmbedUrl ? (
          <>
            <Script id="tawkto-setup" strategy="lazyOnload">
              {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();`}
            </Script>
            <Script
              id="tawkto"
              strategy="lazyOnload"
              src={tawkEmbedUrl}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
      </body>
    </html>
  );
}

