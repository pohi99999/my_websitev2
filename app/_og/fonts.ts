const fontCache = new Map<string, ArrayBuffer>();

async function fetchGoogleFontWoff2(family: string, weight: number) {
  const cacheKey = `${family}-${weight}`;
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;

  const cssResponse = await fetch(cssUrl, {
    headers: {
      // Ensures Google Fonts returns woff2 sources consistently.
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!cssResponse.ok) {
    throw new Error(`Failed to fetch Google Fonts CSS (${family} ${weight}): ${cssResponse.status}`);
  }

  const css = await cssResponse.text();
  const match = css.match(/src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)\s*format\('woff2'\)/);

  if (!match?.[1]) {
    throw new Error(`Could not find woff2 font URL in Google Fonts CSS (${family} ${weight})`);
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
  return fetchGoogleFontWoff2('Inter', weight);
}
