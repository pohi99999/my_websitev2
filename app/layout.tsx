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
    template: '%s | Pohánka AI',
    default: 'AI rendszerek és folyamatautomatizálás | Pohánka AI'
  },
  description:
    'Pohánka & Társa: AI-vezérelt folyamatautomatizálás és modern, lead-generáló weboldalak fejlesztése magyar KKV-k számára. Átlátható (Glass Box) AI megoldások azonnali ROI-val.',
  keywords: 'AI rendszerek vállalkozásoknak, mesterséges intelligencia vállalkozások számára, AI automatizálás, intelligens döntéstámogatás, egyedi AI rendszerfejlesztés, AI ügynökök és automatizálás, vállalati AI megoldások, weboldal fejlesztés, SEO optimalizálás',
  creator: "Pohánka Péter",
  publisher: "Pohánka és Társa Kft.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'AI rendszerek vállalkozásoknak | Pohánka AI',
    description:
      'Vállalkozásokra szabott AI rendszerek, automatizálás és intelligens döntéstámogatás magyar vállalkozásoknak.',
    type: 'website',
    siteName: 'Pohánka és Társa',
    locale: 'hu_HU',
    url: 'https://www.pohankaestarsa.com',
    images: [{
      url: '/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'Pohánka és Társa Kft. – AI Ügynökség'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI rendszerek és automatizálás | Pohánka AI',
    description: 'Vállalkozásokra szabott AI rendszerek, automatizálás and intelligens döntéstámogatás.',
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
    title: 'Pohánka AI',
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

  return (
    <html lang={initialLanguage} className="scroll-smooth">
      <body className={`${ inter.variable } ${ syne.variable } ${ inter.className } bg-black text-white antialiased`}>
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
