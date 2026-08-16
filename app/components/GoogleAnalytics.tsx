'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  if (!GA_MEASUREMENT_ID) return null;

  // XSS Mitigation: Validate GA_MEASUREMENT_ID format
  if (!/^G-[a-zA-Z0-9]+$/.test(GA_MEASUREMENT_ID)) {
    console.error('Invalid Google Analytics Measurement ID format.');
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        data-measurement-id={GA_MEASUREMENT_ID}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            var measurementId = document.getElementById('google-analytics').getAttribute('data-measurement-id');
            gtag('config', measurementId, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
