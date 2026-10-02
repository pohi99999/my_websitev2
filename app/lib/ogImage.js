// Share-image path for one page in one language, served by the og routes
// (app/og/[...slug] for Hungarian, app/en/og/[...slug] and app/de/og/[...slug]). They draw the
// page's own title in that language; "index" stands for the home page.
export function ogImageFor(language, huPath) {
  const tail = huPath === '/' || !huPath ? 'index' : huPath.replace(/^\//, '');
  return language === 'hu' ? `/og/${tail}` : `/${language}/og/${tail}`;
}

export function ogLocale(language) {
  return language === 'en' ? 'en_US' : language === 'de' ? 'de_DE' : 'hu_HU';
}
