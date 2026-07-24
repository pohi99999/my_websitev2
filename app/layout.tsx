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
    default: 'Pohánka és Társa - Professzionális Ügynöki Képviselet, AI Rendszerek és Termékvédelem'
  },
  description:
    'Pohánka & Társa: Professzionális ügynöki képviselet, Brunella AI ügynökök, termékvédelem és AI-vezérelt folyamatautomatizálás magyar KKV-k számára azonnali ROI-val.',
  keywords: 'Brunella agents, professzionális ügynöki képviselet, termékvédelem, AI rendszerek vállalkozásoknak, mesterséges intelligencia vállalkozások számára, AI automatizálás, intelligens döntéstámogatás, egyedi AI rendszerfejlesztés, AI ügynökök és automatizálás, vállalati AI megoldások, weboldal fejlesztés, SEO optimalizálás',
  creator: "Pohánka Péter",
  publisher: "Pohánka és Társa Kft.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Pohánka és Társa - Professzionális Ügynöki Képviselet és Termékvédelem',
    description:
      'Professzionális ügynöki képviselet, Brunella AI ügynökök, termékvédelem és AI-vezérelt folyamatautomatizálás magyar vállalkozásoknak.',
    type: 'website',
    siteName: 'Pohánka és Társa',
    locale: 'hu_HU',
    url: 'https://www.pohankaestarsa.com',
    images: [{
      url: '/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'Pohánka és Társa Kft. – Professzionális Ügynöki Képviselet és AI Rendszerek'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pohánka és Társa - Professzionális Ügynöki Képviselet és Termékvédelem',
    description: 'Professzionális ügynöki képviselet, Brunella AI ügynökök, termékvédelem és AI-vezérelt folyamatautomatizálás.',
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
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pohánka és Társa',
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
  description: 'Professzionális ügynöki képviselet, Brunella AI ügynökök, termékvédelem és AI-vezérelt folyamatautomatizálás magyar KKV-k számára.',
  telephone: '+36304291227',
  email: 'peterpohankapersonal@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zalaegerszeg',
    addressLocality: 'Zalaegerszeg',
    postalCode: '8900',
    addressCountry: 'HU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '46.8417',
    longitude: '16.8416',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.linkedin.com/in/pohi99999/',
    'https://www.facebook.com/profile.php?id=61576881120445',
    'https://github.com/pohi99999',
    'https://x.com/pohanka_peter',
    'https://www.youtube.com/@J%C3%B3zsefP%C3%A9terPoh%C3%A1nka',
    'https://g.dev/PohankaPeter',
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
          name: 'Professzionális Ügynöki Képviselet és Termékvédelem',
          description: 'Cégek és márkák professzionális ügynöki képviselete és védelme.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brunella AI Ügynökök',
          description: 'Autonóm AI ügynökök vállalati folyamatok automatizálására.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Egyedi AI Rendszerek és Weboldal Fejlesztés',
          description: 'Mérhető ROI-val rendelkező AI alapú weboldalak és automatizációk.',
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-BZQL39E3RD';

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
        </LanguageProvider>
        {shouldLoadVercelAnalytics ? <Analytics /> : null}
        {/* Service Worker regisztráció */}
        <Script id="sw-register" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {});
              });
            }` }} />
        {tawkEmbedUrl ? (
          <Script id="tawkto" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='${ tawkEmbedUrl }';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();` }} />
        ) : null}
      </body>
    </html>
  );
}

