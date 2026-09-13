import type { Metadata } from 'next';
import CookieSettingsButton from '../components/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Adatvédelmi tájékoztató',
  description:
    'A Pohánka és Társa Könyvelő Iroda Kft. weboldalának adatkezelési tájékoztatója: kezelt adatok, célok, jogalapok, megőrzési idők, adatfeldolgozók, sütik és érintetti jogok.',
  alternates: {
    canonical: '/adatvedelmi-nyilatkozat',
  },
};

const LAST_UPDATED = '2026. szeptember 13.';

const CONTACT_EMAIL = 'peterpohankapersonal@gmail.com';
const CONTACT_PHONE = '+36 30 429 1227';

type Row = { label: string; value: React.ReactNode };

function DefinitionTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full border-collapse text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/10 align-top">
              <th scope="row" className="w-44 py-3 pr-4 text-left font-semibold text-white">
                {row.label}
              </th>
              <td className="py-3 text-gray-300">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Processing = {
  name: string;
  data: string;
  purpose: string;
  legalBasis: string;
  retention: string;
  processors: string;
};

const PROCESSINGS: Processing[] = [
  {
    name: 'Kapcsolatfelvétel az űrlapokon vagy e-mailben',
    data: 'Név, e-mail cím, az üzenet tartalma, a főoldali gyors kapcsolatfelvételnél a választott téma; minden további adat, amit Ön önként megad.',
    purpose: 'A megkeresés megválaszolása, ajánlat készítése, a szerződéskötés előkészítése.',
    legalBasis:
      'GDPR 6. cikk (1) b) pont (az Ön kérésére tett, szerződést megelőző lépések), egyéb kérdéseknél 6. cikk (1) f) pont (jogos érdekünk a megkeresések megválaszolása).',
    retention:
      'Ha nem jön létre szerződés: az utolsó kapcsolatfelvételt követő 2 év. Ha szerződés jön létre: a szerződés megszűnését követő 5 év (Ptk. szerinti általános elévülés), a számviteli bizonylatok 8 év (Számviteli tv. 169. §).',
    processors: 'Vercel Inc. (tárhely), Google LLC (levelezés), Upstash Inc. (visszaélés-védelem).',
  },
  {
    name: 'Ingyenes hatékonysági audit kérése',
    data: 'Iparág, cégméret, a megjelölt problémák és célok, név, e-mail cím.',
    purpose: 'A kért audit-anyag elkészítése és megküldése, majd kapcsolatfelvétel a lehetséges együttműködésről.',
    legalBasis: 'GDPR 6. cikk (1) b) pont (az Ön kérésére tett, szerződést megelőző lépések).',
    retention: 'Az utolsó kapcsolatfelvételt követő 2 év, szerződés esetén a fenti szabályok szerint.',
    processors: 'Vercel Inc. (tárhely), saját üzemeltetésű n8n automatizálási rendszer, Google LLC (levelezés).',
  },
  {
    name: 'Brunella asszisztens (webes csevegő)',
    data: 'A csevegőbe beírt üzenetek. Kérjük, ne adjon meg személyes vagy bizalmas adatot a csevegőben.',
    purpose: 'Általános tájékoztatás a szolgáltatásainkról, a kérdések azonnali megválaszolása.',
    legalBasis: 'GDPR 6. cikk (1) f) pont (jogos érdekünk a látogatók tájékoztatása); a csevegő használata önkéntes.',
    retention:
      'A beszélgetést nem tároljuk a saját rendszereinkben; a válasz előállításához az üzenetet a Microsoft Azure AI szolgáltatása dolgozza fel, amely azt a saját szabályzata szerint, legfeljebb a visszaélés-szűréshez szükséges ideig őrzi.',
    processors: 'Vercel Inc. (tárhely), Microsoft Corporation (GitHub Models, Azure AI inference).',
  },
  {
    name: 'Visszaélés- és spam-védelem',
    data: 'IP-cím, a kérés időpontja, a beküldések száma.',
    purpose: 'Az űrlapok tömeges vagy automatizált beküldésének megakadályozása (percenkénti és napi korlát).',
    legalBasis: 'GDPR 6. cikk (1) f) pont (jogos érdekünk a szolgáltatás biztonságos működtetése).',
    retention: 'A korlát-számlálók 2 perc, illetve 24 óra után automatikusan törlődnek.',
    processors: 'Upstash Inc. (Redis), Vercel Inc.',
  },
  {
    name: 'Webanalitika (Google Analytics 4)',
    data: 'Online azonosító (süti), az eszköz és a böngésző adatai, a megtekintett oldalak, közelítő földrajzi hely (az IP-címet a Google már a gyűjtéskor rövidíti).',
    purpose: 'A weboldal látogatottságának mérése és a tartalom javítása.',
    legalBasis: 'GDPR 6. cikk (1) a) pont (az Ön hozzájárulása, amelyet a süti-sávon ad meg, és bármikor visszavonhat).',
    retention: 'A sütik 2 évig maradnak a böngészőben; az analitikai adatok a Google Analytics fiókban legfeljebb 14 hónapig.',
    processors: 'Google Ireland Ltd. / Google LLC.',
  },
  {
    name: 'Technikai naplózás és teljesítménymérés',
    data: 'A tárhelyszolgáltató szerver-naplói (IP-cím, kérés időpontja, kért oldal), valamint a Vercel Web Analytics sütimentes, összesített oldalletöltés-statisztikája.',
    purpose: 'A weboldal biztonságos és stabil üzemeltetése, hibakeresés.',
    legalBasis: 'GDPR 6. cikk (1) f) pont (jogos érdekünk a szolgáltatás üzemeltetése).',
    retention: 'A szolgáltató rövid, biztonsági célú naplómegőrzési idejéig; a Vercel Web Analytics nem tárol személyes adatot.',
    processors: 'Vercel Inc.',
  },
];

const PROCESSORS = [
  {
    name: 'Vercel Inc.',
    role: 'Tárhely, tartalomkiszolgálás, szerver-naplók, sütimentes webanalitika',
    location: '440 N Barranca Ave #4133, Covina, CA 91723, USA; az oldal az EU-régióban fut. Adattovábbítás: EU-USA Adatvédelmi Keretrendszer (DPF) és általános szerződési feltételek (SCC).',
  },
  {
    name: 'Google Ireland Ltd. / Google LLC',
    role: 'Google Analytics 4 (csak hozzájárulással), levelezés (Gmail)',
    location: 'Gordon House, Barrow Street, Dublin 4, Írország. Adattovábbítás az USA-ba: DPF és SCC.',
  },
  {
    name: 'Upstash Inc.',
    role: 'Az űrlapok beküldési korlátjának nyilvántartása (Redis)',
    location: 'USA; a felhasznált adatbázis EU-régióban. Adattovábbítás: SCC.',
  },
  {
    name: 'Microsoft Corporation',
    role: 'A Brunella csevegő válaszainak előállítása (GitHub Models, Azure AI inference)',
    location: 'One Microsoft Way, Redmond, WA 98052, USA. Adattovábbítás: DPF és SCC.',
  },
  {
    name: 'Saját üzemeltetésű n8n automatizálás',
    role: 'Az audit-kérések feldolgozása és továbbítása a munkatársainknak',
    location: 'Az adatkezelő saját infrastruktúráján, az Európai Unión belül.',
  },
];

const COOKIES = [
  {
    name: 'pt-cookie-consent',
    provider: 'Pohánka és Társa (saját)',
    purpose: 'Az Ön süti-döntésének megjegyzése (localStorage).',
    retention: 'A böngésző tárhelyéből való törlésig',
    category: 'Szükséges',
  },
  {
    name: 'site-language',
    provider: 'Pohánka és Társa (saját)',
    purpose: 'A választott nyelv megjegyzése (localStorage).',
    retention: 'A böngésző tárhelyéből való törlésig',
    category: 'Szükséges',
  },
  {
    name: 'home-quick-contact-last',
    provider: 'Pohánka és Társa (saját)',
    purpose: 'A főoldali gyors kapcsolatfelvétel utolsó beküldésének megjegyzése, hogy ne kérjük ismét ugyanazt (localStorage, csak az Ön böngészőjében).',
    retention: 'A böngésző tárhelyéből való törlésig',
    category: 'Szükséges',
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'A látogató megkülönböztetése az oldalletöltések összesítéséhez.',
    retention: '2 év',
    category: 'Statisztikai (hozzájárulással)',
  },
  {
    name: '_ga_G-BZQL39E3RD',
    provider: 'Google Analytics',
    purpose: 'A munkamenet állapotának megőrzése.',
    retention: '2 év',
    category: 'Statisztikai (hozzájárulással)',
  },
];

const RIGHTS = [
  ['Hozzáférés', 'Tájékoztatást kérhet arról, hogy kezeljük-e személyes adatát, és másolatot kérhet róla.'],
  ['Helyesbítés', 'Kérheti a pontatlan adat kijavítását vagy a hiányos adat kiegészítését.'],
  ['Törlés', 'Kérheti adatai törlését, ha azokra már nincs szükség, visszavonta hozzájárulását, vagy tiltakozott a kezelés ellen.'],
  ['Korlátozás', 'Kérheti, hogy adatait a tárolás kivételével ne kezeljük, amíg egy vitás kérdés tisztázódik.'],
  ['Adathordozhatóság', 'A hozzájáruláson vagy szerződésen alapuló, automatizáltan kezelt adatait géppel olvasható formában megkaphatja.'],
  ['Tiltakozás', 'A jogos érdeken alapuló adatkezelés ellen a saját helyzetével kapcsolatos okból tiltakozhat.'],
  ['Hozzájárulás visszavonása', 'A statisztikai sütikhez adott hozzájárulását a lap alján bármikor visszavonhatja; ez a visszavonás előtti adatkezelés jogszerűségét nem érinti.'],
];

export default function AdatvedelmiPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold gradient-text">Adatvédelmi tájékoztató</h1>
        <p className="mt-3 text-sm text-gray-400">Hatályos: {LAST_UPDATED}</p>
        <p className="mt-6 text-gray-300 leading-relaxed">
          Ez a tájékoztató a <strong className="text-white">www.pohankaestarsa.com</strong> weboldal látogatóinak és a
          rajta keresztül velünk kapcsolatba lépő személyeknek szól. Leírja, milyen személyes adatot kezelünk, milyen
          célból és jogalapon, meddig őrizzük meg, kinek adjuk át, és Önnek milyen jogai vannak. Az adatkezelésre az
          Európai Unió általános adatvédelmi rendelete (2016/679/EU, GDPR) és az információs önrendelkezési jogról
          szóló 2011. évi CXII. törvény (Infotv.) az irányadó.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          This notice is provided in Hungarian, the language of the data controller. If you need an English or German
          summary of how we process your data, write to us at {CONTACT_EMAIL}.
        </p>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">1. Az adatkezelő</h2>
          <DefinitionTable
            rows={[
              { label: 'Név', value: 'Pohánka és Társa Könyvelő Iroda Kft. (rövidített név: Pohánka és Társa Kft.)' },
              { label: 'Székhely', value: '8900 Zalaegerszeg, Berek utca 38.' },
              { label: 'Cégjegyzékszám', value: '20-09-069482 (Zala Vármegyei Törvényszék Cégbírósága)' },
              { label: 'Adószám', value: '14728864-2-20' },
              { label: 'Képviseli', value: 'Pohánka Józsefné és Pohánka József ügyvezetők' },
              {
                label: 'Adatvédelmi kapcsolattartó',
                value: (
                  <>
                    Pohánka Péter, AI-fejlesztési vezető<br />
                    E-mail: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#00e5ff] hover:underline">{CONTACT_EMAIL}</a>
                    <br />
                    Telefon: <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-[#00e5ff] hover:underline">{CONTACT_PHONE}</a>
                  </>
                ),
              },
            ]}
          />
          <p className="mt-4 text-sm text-gray-400">
            Adatvédelmi tisztviselő kijelölésére a GDPR 37. cikke alapján nem vagyunk kötelesek; adatvédelmi kérdésével a
            fenti kapcsolattartóhoz fordulhat.
          </p>
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">2. Milyen adatot, milyen célból és meddig kezelünk</h2>
          <p className="mt-3">
            Az alábbi táblázat adatkezelésenként mutatja be a kezelt adatok körét, a célt, a jogalapot, a megőrzési időt
            és az igénybe vett adatfeldolgozókat. A weboldal böngészése a kapcsolatfelvételi űrlapok és a csevegő
            használata nélkül személyes adat megadását nem igényli.
          </p>
          <div className="mt-6 space-y-6">
            {PROCESSINGS.map((item) => (
              <div key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-base font-bold text-white">{item.name}</h3>
                <DefinitionTable
                  rows={[
                    { label: 'Kezelt adatok', value: item.data },
                    { label: 'Cél', value: item.purpose },
                    { label: 'Jogalap', value: item.legalBasis },
                    { label: 'Megőrzési idő', value: item.retention },
                    { label: 'Adatfeldolgozók', value: item.processors },
                  ]}
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">
            A személyes adatok megadása egyik esetben sem jogszabályon alapuló kötelezettség; a kapcsolatfelvételhez
            azonban legalább egy elérhetőség (e-mail cím) szükséges, enélkül a megkeresést nem tudjuk megválaszolni.
          </p>
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">3. Adatfeldolgozók és adattovábbítás</h2>
          <p className="mt-3">
            A weboldal üzemeltetéséhez az alábbi adatfeldolgozókat vesszük igénybe. Személyes adatot rajtuk kívül más
            harmadik félnek nem adunk át, kivéve, ha erre jogszabály kötelez (például hatósági megkeresés esetén).
            Az Európai Gazdasági Térségen kívüli szolgáltatók esetében az adattovábbítás az EU-USA Adatvédelmi
            Keretrendszer (Data Privacy Framework) tanúsítása, illetve az Európai Bizottság által elfogadott általános
            szerződési feltételek (SCC) alapján történik.
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 text-left text-white">
                  <th className="py-2 pr-4">Adatfeldolgozó</th>
                  <th className="py-2 pr-4">Feladat</th>
                  <th className="py-2">Székhely, adattovábbítás</th>
                </tr>
              </thead>
              <tbody>
                {PROCESSORS.map((p) => (
                  <tr key={p.name} className="border-b border-white/10 align-top">
                    <td className="py-3 pr-4 font-semibold text-white">{p.name}</td>
                    <td className="py-3 pr-4 text-gray-300">{p.role}</td>
                    <td className="py-3 text-gray-300">{p.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">4. Sütik és böngészőoldali tárolás</h2>
          <p className="mt-3">
            A weboldal a működéshez szükséges adatokat a böngésző helyi tárolójában (localStorage) tartja; ezekhez nem
            kell hozzájárulás. Statisztikai sütit (Google Analytics) csak akkor helyezünk el, ha Ön a süti-sávon az
            „Elfogadom" lehetőséget választja. A „Csak a szükségesek" választásával a Google Analytics egyáltalán nem
            töltődik be. Döntését bármikor módosíthatja az alábbi gombbal vagy a böngésző tárhelyének törlésével.
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 text-left text-white">
                  <th className="py-2 pr-4">Név</th>
                  <th className="py-2 pr-4">Szolgáltató</th>
                  <th className="py-2 pr-4">Cél</th>
                  <th className="py-2 pr-4">Élettartam</th>
                  <th className="py-2">Típus</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name} className="border-b border-white/10 align-top">
                    <td className="py-3 pr-4 font-mono text-xs text-white">{c.name}</td>
                    <td className="py-3 pr-4 text-gray-300">{c.provider}</td>
                    <td className="py-3 pr-4 text-gray-300">{c.purpose}</td>
                    <td className="py-3 pr-4 text-gray-300">{c.retention}</td>
                    <td className="py-3 text-gray-300">{c.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CookieSettingsButton />
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">5. Az Ön jogai</h2>
          <p className="mt-3">
            A GDPR 15–21. cikke alapján az alábbi jogok illetik meg. Kérelmét a fenti e-mail címen vagy postai úton
            nyújthatja be; azt indokolatlan késedelem nélkül, legfeljebb egy hónapon belül teljesítjük, és ha ez nem
            lehetséges, a késedelem okáról tájékoztatjuk. A kérelem teljesítése előtt szükség esetén ellenőrizzük a
            kérelmező személyazonosságát.
          </p>
          <DefinitionTable rows={RIGHTS.map(([label, value]) => ({ label, value }))} />
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">6. Jogorvoslat</h2>
          <p className="mt-3">
            Ha úgy ítéli meg, hogy adatait nem a jogszabályoknak megfelelően kezeljük, kérjük, először hozzánk forduljon,
            hogy a problémát gyorsan orvosolhassuk. Emellett panaszt tehet a felügyeleti hatóságnál, vagy bírósághoz
            fordulhat.
          </p>
          <DefinitionTable
            rows={[
              {
                label: 'Felügyeleti hatóság',
                value: (
                  <>
                    Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />
                    1055 Budapest, Falk Miksa utca 9–11.; postacím: 1363 Budapest, Pf. 9.<br />
                    Telefon: +36 1 391 1400; e-mail: ugyfelszolgalat@naih.hu; web:{' '}
                    <a href="https://www.naih.hu" className="text-[#00e5ff] hover:underline" rel="noopener noreferrer" target="_blank">
                      naih.hu
                    </a>
                  </>
                ),
              },
              {
                label: 'Bíróság',
                value:
                  'A per az adatkezelő székhelye szerint illetékes törvényszék előtt, vagy az Ön választása szerint a lakóhelye vagy tartózkodási helye szerinti törvényszék előtt indítható.',
              },
            ]}
          />
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">7. Adatbiztonság</h2>
          <p className="mt-3">
            A weboldal kizárólag titkosított (HTTPS) kapcsolaton érhető el. A beérkező üzenetekhez csak az azok
            megválaszolásában részt vevő munkatársaink férnek hozzá, jelszóval és kétlépcsős azonosítással védett
            fiókokból. Az űrlapokat automatizált beküldés elleni védelemmel láttuk el. Adatvédelmi incidens esetén a
            GDPR 33–34. cikke szerint járunk el, és ha az incidens Önre nézve magas kockázattal jár, Önt is értesítjük.
          </p>
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">8. Automatizált döntéshozatal, profilalkotás, gyermekek adatai</h2>
          <p className="mt-3">
            Nem végzünk olyan, kizárólag automatizált adatkezelésen alapuló döntéshozatalt vagy profilalkotást, amely Önre
            nézve joghatással járna. A Brunella csevegő válaszait mesterséges intelligencia állítja elő, de az nem hoz
            Önre vonatkozó döntést. Szolgáltatásaink vállalkozásoknak szólnak; 16 éven aluli személyek adatait
            tudatosan nem kezeljük.
          </p>
        </section>

        <section className="mt-10 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">9. A tájékoztató módosítása</h2>
          <p className="mt-3">
            A tájékoztatót a jogszabályi környezet vagy a szolgáltatásaink változása esetén frissítjük; a mindenkor
            hatályos változat ezen az oldalon érhető el, a hatálybalépés dátumával. Jelentős változásról a weboldalon
            külön felhívással is tájékoztatunk.
          </p>
        </section>
      </div>
    </main>
  );
}
