// Which Origin headers may call our own POST endpoints (contact form, Brunella chat).
// Az urlapok es a chat csak a sajat oldalainkrol kuldheto be. Az ellenorzes
// szandekosan NEM egy fix domain-lista: a Vercel-elonezetek hosztneve minden
// deploynal mas, es egy fix lista miatt az urlap az elonezeteken 403-at kapna.
// Ezert a sajat kiszolgalo deployment hosztneveit a Vercel rendszer-valtozoibol
// vesszuk, ami pontosan a sajat elonezeteinket engedi at, es NEM a teljes
// *.vercel.app nevteret (ott barki deployolhat).
const PRODUCTION_ORIGINS = [
  'https://www.pohankaestarsa.com',
  'https://pohankaestarsa.com'
];

function allowedHosts(): string[] {
  const hosts: string[] = [];
  for (const origin of PRODUCTION_ORIGINS) {
    hosts.push(new URL(origin).host);
  }
  // A kiszolgalo deployment sajat hosztnevei (scheme nelkul erkeznek).
  for (const envHost of [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ]) {
    if (envHost) hosts.push(envHost);
  }
  // Kezi bovites kod-valtoztatas nelkul, vesszovel elvalasztva.
  const extra = process.env.CONTACT_ALLOWED_ORIGINS;
  if (extra) {
    for (const item of extra.split(',')) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      try {
        hosts.push(new URL(trimmed).host);
      } catch {
        hosts.push(trimmed);
      }
    }
  }
  return hosts;
}

export function isAllowedOrigin(origin: string): boolean {
  // Origin fejlec nelkuli keres nem bongeszobol jon (curl, szerver-szerver);
  // a bongeszo POST-nal MINDIG kuld Origin-t, tehat a CSRF-eset le van fedve.
  if (!origin) return true;

  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }

  // Helyi fejlesztes, barmilyen porton -- csak ha nem Vercelen futunk.
  if (!process.env.VERCEL_ENV && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
    return true;
  }

  return allowedHosts().includes(url.host);
}
