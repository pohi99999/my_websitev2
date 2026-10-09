// /weboldal-ai-kkv FAQ in hu/en/de (card 780eb834, Marveen 3252, 2026-10-09). Hungarian is the source;
// en/de are faithful, formal translations of it. The price comes from BASE_PRICE, never typed in.
import { BASE_PRICE } from '../../lib/basePrice';

export type FaqLang = 'hu' | 'en' | 'de';
export interface FaqCopy { heading: string; items: { q: string; a: string }[] }

export const FAQ_COPY: Record<FaqLang, FaqCopy> = {
  hu: {
    heading: 'Gyakori kérdések',
    items: [
      {
        q: 'Mennyi idő alatt készül el egy ilyen weboldal + AI rendszer?',
        a: 'Az alapcsomag szerinti weboldal két hét alatt elkészül. Nagyobb, egyedi rendszereknél az átfutást a felmérés után az ajánlatban rögzítjük.',
      },
      {
        q: 'Nem értek az AI-hoz – ez nekem nem bonyolult?',
        a: 'Az a célunk, hogy a háttérben dolgozzon az AI, Önnek csak az eredményt kell látnia. Minden lépést érthető nyelven magyarázunk el.',
      },
      {
        q: 'Mi van, ha később bővíteni szeretném a rendszert?',
        a: 'Kifejezetten úgy építjük fel az oldalt, hogy később új modulokat, AI-folyamatokat, CRM-kapcsolatot is könnyen rá lehessen építeni.',
      },
      {
        // Péter, Telegram 6926: the fixed base price, not "depends on the size of the business"
        q: 'Mennyibe kerül egy ilyen megoldás?',
        a: `Az alapcsomag ára fix ${BASE_PRICE.hu} bruttó, egyszeri díj. Az online időpontfoglalásra és bankkártyás előlegre, illetve a nagyobb, egyedi rendszerekre ingyenes konzultáció után tételes, fix áras ajánlatot adunk, rejtett költségek nélkül.`,
      },
    ],
  },
  en: {
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'How long does it take to build a website + AI system like this?',
        a: 'A website in the base package is ready in two weeks. For larger, custom systems, we set the timeline in the quote after the assessment.',
      },
      {
        q: 'I don’t know much about AI. Won’t this be complicated for me?',
        a: 'Our aim is for the AI to work in the background, so that you only need to see the results. We explain every step in plain language.',
      },
      {
        q: 'What if I want to extend the system later?',
        a: 'We deliberately build the site so that new modules, AI workflows or a CRM connection can easily be added later.',
      },
      {
        q: 'How much does a solution like this cost?',
        a: `The base package has a fixed price of ${BASE_PRICE.en} incl. VAT, as a one-off payment. For online booking with a card deposit, and for larger, custom systems, we give you an itemised, fixed-price quote after a free consultation, with no hidden costs.`,
      },
    ],
  },
  de: {
    heading: 'Häufige Fragen',
    items: [
      {
        q: 'Wie lange dauert die Umsetzung einer solchen Website mit KI-System?',
        a: 'Eine Website im Basispaket ist in zwei Wochen fertig. Bei größeren, individuellen Systemen legen wir die Umsetzungsdauer nach der Bedarfsanalyse im Angebot fest.',
      },
      {
        q: 'Ich kenne mich mit KI nicht aus. Ist das für mich nicht zu kompliziert?',
        a: 'Unser Ziel ist, dass die KI im Hintergrund arbeitet und Sie nur das Ergebnis sehen. Jeden Schritt erklären wir Ihnen in verständlicher Sprache.',
      },
      {
        q: 'Was ist, wenn ich das System später erweitern möchte?',
        a: 'Wir bauen die Website gezielt so auf, dass sich später neue Module, KI-Abläufe oder eine CRM-Anbindung leicht ergänzen lassen.',
      },
      {
        q: 'Was kostet eine solche Lösung?',
        a: `Das Basispaket kostet fest ${BASE_PRICE.de} inkl. MwSt., als Einmalzahlung. Für die Online-Terminbuchung mit Anzahlung per Karte sowie für größere, individuelle Systeme erstellen wir nach einer kostenlosen Beratung ein detailliertes Festpreisangebot, ohne versteckte Kosten.`,
      },
    ],
  },
};
