const fs = require('fs');
const files = [
  'app/portfolio/opengraph-image.tsx',
  'app/portfolio/[id]/opengraph-image.tsx',
  'app/portfolio/[id]/twitter-image.tsx',
  'app/portfolio/twitter-image.tsx',
  'app/blog/opengraph-image.tsx',
  'app/blog/[slug]/opengraph-image.tsx',
  'app/blog/[slug]/twitter-image.tsx',
  'app/blog/twitter-image.tsx',
  'app/termekek/brunella-agents/opengraph-image.tsx',
  'app/termekek/brunella-agents/twitter-image.tsx',
  'app/termekek/opengraph-image.tsx',
  'app/termekek/twitter-image.tsx',
  'app/opengraph-image.tsx',
  'app/twitter-image.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/export const runtime = 'edge';\n/g, '');
    content = content.replace(/export const runtime = 'edge';/g, '');
    fs.writeFileSync(file, content);
  }
});
