/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp', 'image/avif'],
  }
};

module.exports = nextConfig;
