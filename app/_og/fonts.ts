const fontCache = new Map<string, ArrayBuffer>();

async function fetchGoogleFontWoff(family: string, weight: number) {
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
  const match = css.match(/src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff)\)\s*format\('woff'\)/);

  if (!match?.[1]) {
    throw new Error(`Could not find woff font URL in Google Fonts CSS (${family} ${weight})`);
  }

  const fontResponse = await fetch(match[1]);
  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch font file (${family} ${weight}): ${fontResponse.status}`);
  }

  const data = await fontResponse.arrayBuffer();
  fontCache.set(cacheKey, data);
  return data;
}

export async function getInterFont(weight: 500 | 700 | 800) {
  return fetchGoogleFontWoff('Inter', weight);
}
