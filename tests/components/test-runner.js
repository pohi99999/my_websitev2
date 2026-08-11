require('@babel/register').default({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx']
});
require('./language-context.test.ts');
