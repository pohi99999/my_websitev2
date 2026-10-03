/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  }
];

if (isProd) {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  });
}

const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // P-Search privacy notice: the language switcher builds /en/<hu-slug> and /de/<slug>, so the
  // other spellings are sent to the real page. There is no German version: /de goes to English.
  async redirects() {
    return [
      { source: '/p-search/privacy', destination: '/p-search/adatvedelem', permanent: true },
      { source: '/en/p-search/adatvedelem', destination: '/en/p-search/privacy', permanent: true },
      { source: '/de/p-search/:path*', destination: '/en/p-search/privacy', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

module.exports = nextConfig;
