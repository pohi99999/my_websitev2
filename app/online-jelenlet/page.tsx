import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import { BASE_PRICE, NBSP } from '../lib/basePrice';
import styles from './online-jelenlet.module.css';

// metadata in its own module (no client imports), so localizedRouteMeta can hand it to the share-image route
export { metadata } from './meta';

// The "Online jelenlét induló csomag" page (Péter 13785/13787). Hungarian only for now. The copy is part A
// of Stratéga's ONLINE-JELENLET-EGYOLDALAS.md word for word, except the sample's state (Péter 13854: its
// Business Profile is not verified yet) and the first step (13856: the contact form takes no photos); the price and the 5 working days are Péter's decisions (13779,
// 13783), the sample is named with the client's consent (13781). The reviews are the
// homepage's block: the texts live in googleReviews.ts only. Its own route, not a case of the [[...slug]]
// catch-all, and its styling in a CSS module: nothing of this page reaches the /en and /de homepage JS or
// the shared stylesheet.

const SETUP_PRICE = `30${NBSP}000${NBSP}Ft`;
const SAMPLE_URL = 'https://hari-attila-web.vercel.app/';

const WHAT_YOU_GET = [
  {
    title: 'Céges weboldal.',
    body: 'Bemutatja, mit csinál, miben dolgozott már, és hol dolgozik. Az ajánlatkérő űrlapon a megrendelő fotót is csatolhat a munkaterületről, így Ön már az első üzenetből látja, miről van szó.',
  },
  {
    title: 'Google Cégprofil.',
    body: 'Ez jelenik meg, amikor valaki a térképen vagy a keresőben a szakmáját és a települését írja be. Cím, nyitvatartás, szolgáltatások, fotók, weboldal.',
  },
  {
    title: 'Facebook céges oldal.',
    body: 'Rendezett nyitóképpel, bemutatkozással és a munkáiból összeállított albumokkal.',
  },
  {
    title: 'Összekapcsolva.',
    body: 'A weboldalról a Cégprofilra és a Facebook-oldalra, onnan vissza a weboldal ajánlatkérőjére mutat minden link, hogy a megrendelő ne akadjon el.',
  },
];

export default function OnlineJelenletPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <p className={`hud-badge ${styles.kicker}`}>Pohánka és Társa Kft., Zalaegerszeg</p>
          <h1 className={`heading-display ${styles.title}`}>
            Online jelenlét induló csomag <span className={styles.accent}>kisvállalkozóknak</span>
          </h1>
          <h2 className={styles.leadTitle}>Kinek szól?</h2>
          <p className={styles.lead}>
            Térkövező, klímaszerelő, burkoló, villanyszerelő, asztalos és más helyi vállalkozónak, akit ma csak telefonon
            vagy ismerősön keresztül találnak meg.
          </p>
          <Link href="/kapcsolat" className={styles.cta}>
            Ajánlatkérés <ArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        </header>

        <section aria-labelledby="mit-kap" className={styles.section}>
          <h2 id="mit-kap" className={`heading-display ${styles.sectionTitle}`}>Mit kap?</h2>
          <ol className={styles.cards}>
            {WHAT_YOU_GET.map((item, i) => (
              <li key={item.title} className={styles.card}>
                <p className={styles.index} aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="minta" className={`${styles.section} ${styles.sample}`}>
          <div className={styles.sampleText}>
            <h2 id="minta" className={`heading-display ${styles.sectionTitle}`}>Minta</h2>
            <p className={styles.body}>
              Egy zalai térkő-, aszfalt- és támfalépítő vállalkozásnak ezt a csomagot készítjük: elkészült a weboldal
              ajánlatkérővel és a Facebook-oldal öt munkatípus szerinti albummal, a Google Cégprofil igazolása
              folyamatban. A weboldal itt megnézhető:{' '}
              <a href={SAMPLE_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                hari-attila-web.vercel.app
                <ExternalLink className={styles.linkIcon} aria-hidden="true" />
              </a>{' '}
              (a megrendelő hozzájárulásával).
            </p>
          </div>
          <Image
            src="/hari-attila.webp"
            alt="Hári Attila térkő- és aszfaltozó vállalkozás weboldalának nyitóképe"
            width={1600}
            height={692}
            sizes="(min-width: 768px) 28rem, calc(100vw - 2.5rem)"
            className={styles.sampleImage}
          />
        </section>

        <section aria-labelledby="ara" className={styles.section}>
          <h2 id="ara" className={`heading-display ${styles.sectionTitle}`}>Ára</h2>
          <ul className={styles.prices}>
            <li className={styles.price}>
              <span className={styles.priceName}>Weboldal:</span>
              <span className={styles.priceValue}>
                <b>{BASE_PRICE.hu} + áfa</b>, egyszeri díj.
              </span>
            </li>
            <li className={styles.price}>
              <span className={styles.priceName}>Google Cégprofil és Facebook-oldal beállítása:</span>
              <span className={styles.priceValue}>
                <b>{SETUP_PRICE} + áfa</b>, egyszeri díj.
              </span>
            </li>
          </ul>
          <p className={styles.body}>
            Havi díj nincs. Ami a csomagon túl kell (például árkalkulátor), azt külön ajánlatban kapja meg.
          </p>
        </section>

        <section aria-labelledby="hogyan-megy" className={styles.section}>
          <h2 id="hogyan-megy" className={`heading-display ${styles.sectionTitle}`}>Hogyan megy?</h2>
          <ol className={styles.steps}>
            <li className={styles.step}>
              Ön kitölti az ajánlatkérőt, és az első egyeztetésen megbeszéljük, hogyan küldje el a fotókat.
            </li>
            <li className={styles.step}>
              Egyeztetjük, mit szeretne a weboldalon látni. Az első verziót az anyagok megérkezése után 5 munkanapon belül
              megmutatjuk. Az anyagot (szöveg, képek) Ön hagyja jóvá, mielőtt bármi kikerül.
            </li>
            <li className={styles.step}>
              A Cégprofil és a Facebook-oldal az <b>Ön saját fiókjában</b> jön létre, Ön a tulajdonos, mi szerkesztőként
              segítünk. A Google a Cégprofilt ellenőrzéshez kötheti (például videós vagy telefonos igazolás); ennek az
              ideje a Google-től függ, nem tőlünk, ezért az 5 munkanapba nem számít bele.
            </li>
            <li className={styles.step}>A weboldal élesedik, és átadjuk a hozzáféréseket.</li>
          </ol>
        </section>

      </div>

      <div className={styles.reviews}>
        <Testimonials />
      </div>

      <div className={styles.wrap}>
        <section aria-labelledby="mit-kerunk" className={`${styles.section} ${styles.closing}`}>
          <h2 id="mit-kerunk" className={`heading-display ${styles.sectionTitle}`}>Mit kérünk Öntől?</h2>
          <p className={styles.body}>
            Alapadatok (név, cím, adószám, elérhetőség), 10-20 fotó a munkáiról, és a hozzájárulását ahhoz, hogy a képei
            megjelenjenek.
          </p>
          <Link href="/kapcsolat" className={styles.cta}>
            Ajánlatkérés <ArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
