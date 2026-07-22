import nextConfig from 'eslint-config-next'

export default [
  ...nextConfig,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]

