'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_EVENT, CONSENT_RESET_EVENT, readConsent } from './CookieConsent';

/**
 * Google Analytics 4 loader, gated by the cookie-consent banner.
 * The gtag script is only injected after the visitor chose "Elfogadom" (consent === 'all');
 * "Csak a szükségesek" or no choice keeps the page free of GA cookies.
 */
export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent() === 'all');
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener(CONSENT_RESET_EVENT, sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener(CONSENT_RESET_EVENT, sync);
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  // XSS Mitigation: Validate GA_MEASUREMENT_ID format
  if (!/^G-[a-zA-Z0-9]+$/.test(GA_MEASUREMENT_ID)) {
    console.error('Invalid Google Analytics Measurement ID format.');
    return null;
  }

  if (!allowed) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
