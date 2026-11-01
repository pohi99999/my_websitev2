const fontCache = new Map<string, ArrayBuffer[]>();

// Google Fonts answers with one @font-face per unicode subset, each behind a /* subset */ comment, and
// cyrillic-ext comes first. Taking the first .woff loaded a cyrillic subset, so the Latin text fell back
// to another font at normal weight and only a few glyphs (the "A" of "AI") came out in Inter 800.
// Hungarian needs latin (a, é, á...) and latin-ext (ő, ű).
const SUBSETS = ['latin', 'latin-ext'];

async function fetchGoogleFontWoffs(family: string, weight: number) {
  const cacheKey = `${family}-${weight}`;
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;

  const cssResponse = await fetch(cssUrl, {
    headers: {
      // An old UA makes Google Fonts return legacy .woff sources instead of
      // .woff2 — next/og's Satori renderer can only parse ttf/otf/woff, not woff2.
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0'
    }
  });

  if (!cssResponse.ok) {
    throw new Error(`Failed to fetch Google Fonts CSS (${family} ${weight}): ${cssResponse.status}`);
  }

  const css = await cssResponse.text();
  const woffUrl = /src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff)\)\s*format\('woff'\)/;
  const bySubset = new Map<string, string>();
  for (const block of css.split('/*').slice(1)) {
    const name = block.slice(0, block.indexOf('*/')).trim();
    const url = block.match(woffUrl)?.[1];
    if (url) bySubset.set(name, url);
  }
  // without subset comments the answer is a single, complete font
  const urls = bySubset.size
    ? SUBSETS.map((s) => bySubset.get(s)).filter((u): u is string => !!u)
    : [css.match(woffUrl)?.[1]].filter((u): u is string => !!u);

  if (!urls.length) {
    throw new Error(`Could not find a latin woff font URL in Google Fonts CSS (${family} ${weight})`);
  }

  const data = await Promise.all(
    urls.map(async (url) => {
      const fontResponse = await fetch(url);
      if (!fontResponse.ok) {
        throw new Error(`Failed to fetch font file (${family} ${weight}): ${fontResponse.status}`);
      }
      return fontResponse.arrayBuffer();
    })
  );
  fontCache.set(cacheKey, data);
  return data;
}

export async function getInterFont(weight: 500 | 700 | 800) {
  return fetchGoogleFontWoffs('Inter', weight);
}
