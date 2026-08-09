import nextConfig from 'eslint-config-next'

const config = [
  ...nextConfig,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      // Discouraged-but-common pattern (syncing state from a prop/browser API on
      // mount); not a correctness bug, keep visible without failing `npm run lint`.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // Confirmed-unreferenced legacy/orphaned files (not imported by any live route) —
    // excluded rather than "fixed" since nothing renders them.
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'mainWithScroll.js',
      'app/components/_AudioReactive.tsx',
      'app/components/AudioReactiveVisualize.tsx',
      'app/termekek/brunella-agents/components/**',
    ],
  },
]

export default config

