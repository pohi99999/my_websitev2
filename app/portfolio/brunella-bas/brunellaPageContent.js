// Content of the rewritten /portfolio/brunella-bas page, one object per locale with the SAME shape, so
// the page renders hu, en and de from one layout. Text: Stratéga's draft (Obsidian, "Brunella Agents
// System - weboldal átírás (2026-10-02)"), structure: Lumen's design plan (same folder, "design-terv").
// No prices on the page (Péter, Telegram 5752). Icons are lucide-react names; the page maps them.
// Images refer to the beta gallery (public/images/brunella-system-beta/NN.png) by index. Only published
// images may be used: 05, 08, 10, 11, 12 and 13 were taken off on 2026-10-02 (Péter, Telegram 5795); the
// blurred 08 comes back here only after his yes.

// FAQ items waiting for a decision stay in the data but are not rendered while their flag is false.
// elofizetes: waits for the lawyer's answer on the subscription model (Stratéga, chapter 3).
export const brunellaFaqShow = { elofizetes: false };

export const brunellaPageContent = {
  hu: {
    meta: {
      title: 'Brunella: AI-csapat, ami a cégeden belül dolgozik | Pohánka AI',
      description: 'Telegramon beszélsz vele. Elvégzi a napi, ismétlődő információs munkát, és amit a cégen kívülre küldene, azt előbb te hagyod jóvá.',
    },
    back: 'Vissza a portfólióhoz',
    status: 'Nálunk élesben, ügyfélnél pilot',
    title: 'Brunella: AI-csapat, ami a cégeden belül dolgozik',
    subtitle: 'Telegramon beszélsz vele. Elvégzi a napi, ismétlődő információs munkát, és amit a cégen kívülre küldene, azt előbb te hagyod jóvá.',
    ctaPrimary: 'Kérek egy 30 perces bemutatót',
    ctaSecondary: 'Így dolgozik nálunk',
    heroImage: { index: 1, alt: 'A Brunella irányítópultja: a csapat, a feladatok és az aktivitás egy nézetben', caption: 'A saját irányítópultunk' },
    day: {
      title: 'Egy napunk Brunellával',
      intro: 'Nem kitalált demó. Így dolgozik a saját csapatunk minden nap, ügyféladat nélkül.',
      steps: [
        { time: 'Reggel', icon: 'Sun', text: 'Egy üzenetben megjön a nap: fontos levelek, naptár, és a rendszer javaslatai.' },
        { time: 'Napközben', icon: 'Mail', text: 'Megkereső levelek készülnek piszkozatként. Elküldeni mi küldjük, nem a gép.' },
        { time: 'Négyóránként', icon: 'LayoutGrid', text: 'A feladattábla átnézése. Ha valami beragadt, a rendszer szól, és megmondja, kinek kell döntenie.' },
        { time: 'Éjjel', icon: 'Moon', text: 'A nap anyagából 4 javaslat készül reggelre.' },
      ],
      images: [
        { index: 2, alt: 'Telefon képernyője a Telegram-beszélgetéssel Brunellával', caption: 'A kezelőfelület: egy Telegram-beszélgetés' },
        { index: 9, alt: 'Az ütemezett feladatok listája, időzítésekkel', caption: 'Napi és heti körök' },
      ],
    },
    team: {
      title: 'A csapat',
      note: 'Ügyfélnél a csapat összetételét a cég munkájához igazítjuk.',
      reserveLabel: 'tartalék',
      members: [
        { name: 'Brunella', icon: 'Bot', role: 'Fő ügynök: fogadja a kéréseket, szétosztja a munkát, és összefoglal.' },
        { name: 'Kenshin', icon: 'Code2', role: 'Szoftverfejlesztés, hibajavítás, verziókezelés.' },
        { name: 'Lumen', icon: 'Palette', role: 'Weboldalak, felületek, frontend.' },
        { name: 'Aura', icon: 'Search', role: 'Piackutatás, források felkutatása és ellenőrzése.' },
        { name: 'Irisz', icon: 'BarChart3', role: 'Adatelemzés és riportok.' },
        { name: 'Nyomozó', icon: 'FileSearch', role: 'Korábbi döntések és előzmények visszakeresése.' },
        { name: 'Zeph', icon: 'Compass', role: 'Új eszközök és képességek felderítése.' },
        { name: 'Stratéga', icon: 'Target', role: 'Növekedési és marketingstratégia.' },
        { name: 'Agy', icon: 'Cpu', role: 'Tartalék motor, ha a fő AI-motor nem érhető el.', reserve: true },
        { name: 'Pilot', icon: 'Cpu', role: 'Tartalék motor, ha a fő AI-motor nem érhető el.', reserve: true },
      ],
    },
    scope: {
      title: 'Mit csinál, és mit nem',
      does: { title: 'Csinálja', icon: 'CheckCircle', items: ['levelek átnézése és piszkozatok', 'ajánlatok követése', 'napi összefoglaló', 'riport', 'kutatás és jegyzetelés', 'feladatok szétosztása'] },
      needsApproval: { title: 'Engedély nélkül nem csinálja', icon: 'ShieldCheck', items: ['levél kiküldése', 'adat törlése', 'fizetés', 'nyilvános közzététel'], note: 'Alapbeállításként ezeket előkészíti, a gombot ember nyomja meg.' },
      remembers: { title: 'Emlékszik', icon: 'Brain', text: 'A korábbi döntésekre és a cég saját jegyzeteire, amelyeket ember is el tud olvasni.' },
    },
    start: {
      title: 'Hogyan indul',
      steps: [
        { title: '30 perces bemutató', text: 'Megmutatjuk a saját rendszerünket élőben.' },
        { title: 'Felmérés', text: 'Kiválasztunk 2-3 ismétlődő munkát, amivel kezdünk.' },
        { title: 'Telepítés és beállítás', text: 'A cég gépén (macOS vagy Linux).' },
        { title: 'Karbantartás', text: 'Frissítések, a bevált receptek, hibajelzés.' },
      ],
    },
    faq: {
      title: 'Gyakori kérdések',
      items: [
        { id: 'elofizetes', q: 'Kinek a nevén van az AI-előfizetés?', a: 'A cégén. Az AI-szolgáltatást a cég a saját nevén fizeti és használja, mi nem adjuk tovább és nem közvetítjük.' },
        { id: 'adatok', q: 'Hol vannak az adataink?', a: 'A cég gépén: a memória, a jegyzetek és a feladattábla ott tárolódik. A szöveg feldolgozását viszont az AI-modell a szolgáltató felhőjében végzi, ezért amit a rendszer feldolgoz, az oda is eljut. Az adatkezelést külön szerződésben rögzítjük.' },
        { id: 'leallas', q: 'Mi történik, ha leáll?', a: 'Állapotfigyelő jelzi a hibát. Az éjjeli kiesést reggel állítjuk helyre, nem éjjel.' },
        { id: 'feltetelek', q: 'Mi kell hozzá a cégtől?', a: 'Egy gép (macOS vagy Linux), egy Telegram-fiók, egy napi kapcsolattartó és a saját AI-előfizetés.' },
        { id: 'kiprobalas', q: 'Kipróbálhatom?', a: 'Igen: a bemutatón élőben megmutatjuk a saját rendszerünket.' },
      ],
    },
    resources: {
      title: 'Hasznos anyagok',
      items: [
        { label: 'A rendszer képekben (béta-bemutató)', href: '#brunella-beta' },
        { label: 'Adatkezelési nyilatkozat', href: '/adatvedelmi-nyilatkozat' },
      ],
    },
    final: {
      title: 'Nézd meg élőben, hogyan dolgozik nálunk.',
      form: {
        name: 'Név', email: 'E-mail-cím', company: 'Cég', size: 'Létszám',
        sizeOptions: ['1-5 fő', '6-20 fő', '21-50 fő', '50 fő fölött'],
        task: 'Melyik napi munkát adnád le?',
        submit: 'Kérek egy bemutatót',
        privacy: 'Az adataidat csak a bemutató egyeztetéséhez használjuk.',
        privacyLink: 'Adatkezelési nyilatkozat',
        messagePrefix: '[Brunella bemutató]',
        success: 'Köszönjük, hamarosan jelentkezünk az időponttal.',
        error: 'Nem sikerült elküldeni. Írj nekünk a kapcsolat oldalon.',
      },
    },
  },

  en: {
    meta: {
      title: 'Brunella: an AI team that works inside your company | Pohánka AI',
      description: 'You talk to it on Telegram. It handles the daily, repetitive information work, and anything it would send outside the company, you approve first.',
    },
    back: 'Back to Portfolio',
    status: 'Live in our own company, pilot with clients',
    title: 'Brunella: an AI team that works inside your company',
    subtitle: 'You talk to it on Telegram. It handles the daily, repetitive information work, and anything it would send outside the company, you approve first.',
    ctaPrimary: 'Book a 30-minute demo',
    ctaSecondary: 'See how we work with it',
    heroImage: { index: 1, alt: "Brunella's dashboard: the team, the tasks and the activity in one view", caption: 'Our own dashboard' },
    day: {
      title: 'A day with Brunella',
      intro: 'Not a made-up demo. This is how our own team works every day, without client data.',
      steps: [
        { time: 'Morning', icon: 'Sun', text: "One message with the day ahead: important emails, calendar, and the system's suggestions." },
        { time: 'During the day', icon: 'Mail', text: 'Outreach emails are prepared as drafts. We send them, not the machine.' },
        { time: 'Every four hours', icon: 'LayoutGrid', text: 'A review of the task board. If something is stuck, the system says so and names who has to decide.' },
        { time: 'At night', icon: 'Moon', text: "Four suggestions for the next morning, drawn from the day's work." },
      ],
      images: [
        { index: 2, alt: 'Phone screen with the Telegram conversation with Brunella', caption: 'The interface: one Telegram conversation' },
        { index: 9, alt: 'The list of scheduled tasks, with their timing', caption: 'Daily and weekly cycles' },
      ],
    },
    team: {
      title: 'The team',
      note: "With a client, we shape the team around the company's work.",
      reserveLabel: 'backup',
      members: [
        { name: 'Brunella', icon: 'Bot', role: 'Lead agent: takes the requests, hands out the work and sums up.' },
        { name: 'Kenshin', icon: 'Code2', role: 'Software development, bug fixing, version control.' },
        { name: 'Lumen', icon: 'Palette', role: 'Websites, interfaces, frontend.' },
        { name: 'Aura', icon: 'Search', role: 'Market research, finding and checking sources.' },
        { name: 'Irisz', icon: 'BarChart3', role: 'Data analysis and reports.' },
        { name: 'Nyomozó', icon: 'FileSearch', role: 'Looks up earlier decisions and history.' },
        { name: 'Zeph', icon: 'Compass', role: 'Scouts new tools and capabilities.' },
        { name: 'Stratéga', icon: 'Target', role: 'Growth and marketing strategy.' },
        { name: 'Agy', icon: 'Cpu', role: 'Backup engine when the main AI engine is unavailable.', reserve: true },
        { name: 'Pilot', icon: 'Cpu', role: 'Backup engine when the main AI engine is unavailable.', reserve: true },
      ],
    },
    scope: {
      title: "What it does, and what it doesn't",
      does: { title: 'Does', icon: 'CheckCircle', items: ['reviews email and prepares drafts', 'follows up quotes', 'daily summary', 'reports', 'research and notes', 'splits up tasks'] },
      needsApproval: { title: 'Does not do without approval', icon: 'ShieldCheck', items: ['send an email', 'delete data', 'make a payment', 'publish anything'], note: 'By default it prepares these; a person presses the button.' },
      remembers: { title: 'Remembers', icon: 'Brain', text: "Earlier decisions and the company's own notes, which people can read too." },
    },
    start: {
      title: 'How it starts',
      steps: [
        { title: '30-minute demo', text: 'We show our own system live.' },
        { title: 'Assessment', text: 'We pick 2-3 repetitive jobs to start with.' },
        { title: 'Installation and setup', text: "On the company's computer (macOS or Linux)." },
        { title: 'Maintenance', text: 'Updates, proven recipes, error alerts.' },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        // the subscription answer is written after the lawyer's reply (brunellaFaqShow.elofizetes)
        { id: 'elofizetes', q: 'Whose name is the AI subscription in?', a: null },
        { id: 'adatok', q: 'Where is our data?', a: "On the company's computer: memory, notes and the task board are stored there. The text itself is processed by the AI model in the provider's cloud, so whatever the system processes also goes there. Data processing is set out in a separate contract." },
        { id: 'leallas', q: 'What happens if it stops?', a: 'A health check reports the error. An outage at night is fixed in the morning, not at night.' },
        { id: 'feltetelek', q: 'What does the company need?', a: 'A computer (macOS or Linux), a Telegram account, a daily contact person and its own AI subscription.' },
        { id: 'kiprobalas', q: 'Can I try it?', a: 'Yes: at the demo we show you our own system live.' },
      ],
    },
    resources: {
      title: 'Useful material',
      items: [
        { label: 'The system in pictures (beta walkthrough)', href: '#brunella-beta' },
        { label: 'Privacy notice', href: '/adatvedelmi-nyilatkozat' },
      ],
    },
    final: {
      title: 'See live how it works for us.',
      form: {
        name: 'Name', email: 'Email', company: 'Company', size: 'Team size',
        sizeOptions: ['1-5 people', '6-20 people', '21-50 people', 'over 50 people'],
        task: 'Which daily task would you hand over?',
        submit: 'Book a demo',
        privacy: 'We only use your details to arrange the demo.',
        privacyLink: 'Privacy notice',
        messagePrefix: '[Brunella demo]',
        success: "Thank you, we'll be in touch with a time shortly.",
        error: "It couldn't be sent. Please write to us on the contact page.",
      },
    },
  },

  de: {
    meta: {
      title: 'Brunella: ein KI-Team, das in Ihrem Unternehmen arbeitet | Pohánka AI',
      description: 'Sie sprechen mit ihm über Telegram. Es erledigt die tägliche, wiederkehrende Informationsarbeit, und was es nach außen senden würde, geben Sie zuerst frei.',
    },
    back: 'Zurück zum Portfolio',
    status: 'Bei uns im Einsatz, bei Kunden als Pilot',
    title: 'Brunella: ein KI-Team, das in Ihrem Unternehmen arbeitet',
    subtitle: 'Sie sprechen mit ihm über Telegram. Es erledigt die tägliche, wiederkehrende Informationsarbeit, und was es nach außen senden würde, geben Sie zuerst frei.',
    ctaPrimary: '30-minütige Vorführung anfragen',
    ctaSecondary: 'So arbeiten wir damit',
    heroImage: { index: 1, alt: 'Das Dashboard von Brunella: Team, Aufgaben und Aktivität in einer Ansicht', caption: 'Unser eigenes Dashboard' },
    day: {
      title: 'Ein Tag mit Brunella',
      intro: 'Keine erfundene Demo. So arbeitet unser eigenes Team jeden Tag, ohne Kundendaten.',
      steps: [
        { time: 'Morgens', icon: 'Sun', text: 'Eine Nachricht mit dem Tag: wichtige E-Mails, Kalender und die Vorschläge des Systems.' },
        { time: 'Tagsüber', icon: 'Mail', text: 'Akquise-E-Mails entstehen als Entwürfe. Abschicken tun wir, nicht die Maschine.' },
        { time: 'Alle vier Stunden', icon: 'LayoutGrid', text: 'Ein Blick auf die Aufgabentafel. Hängt etwas fest, meldet das System es und sagt, wer entscheiden muss.' },
        { time: 'Nachts', icon: 'Moon', text: 'Aus dem Material des Tages entstehen vier Vorschläge für den Morgen.' },
      ],
      images: [
        { index: 2, alt: 'Handybildschirm mit dem Telegram-Gespräch mit Brunella', caption: 'Die Oberfläche: ein Telegram-Gespräch' },
        { index: 9, alt: 'Die Liste der geplanten Aufgaben mit ihren Zeiten', caption: 'Tägliche und wöchentliche Runden' },
      ],
    },
    team: {
      title: 'Das Team',
      note: 'Beim Kunden passen wir das Team an die Arbeit des Unternehmens an.',
      reserveLabel: 'Reserve',
      members: [
        { name: 'Brunella', icon: 'Bot', role: 'Hauptagentin: nimmt Anfragen an, verteilt die Arbeit und fasst zusammen.' },
        { name: 'Kenshin', icon: 'Code2', role: 'Softwareentwicklung, Fehlerbehebung, Versionsverwaltung.' },
        { name: 'Lumen', icon: 'Palette', role: 'Websites, Oberflächen, Frontend.' },
        { name: 'Aura', icon: 'Search', role: 'Marktforschung, Quellen finden und prüfen.' },
        { name: 'Irisz', icon: 'BarChart3', role: 'Datenanalyse und Berichte.' },
        { name: 'Nyomozó', icon: 'FileSearch', role: 'Sucht frühere Entscheidungen und Verläufe heraus.' },
        { name: 'Zeph', icon: 'Compass', role: 'Erkundet neue Werkzeuge und Fähigkeiten.' },
        { name: 'Stratéga', icon: 'Target', role: 'Wachstums- und Marketingstrategie.' },
        { name: 'Agy', icon: 'Cpu', role: 'Reserve-Engine, wenn die Haupt-KI nicht verfügbar ist.', reserve: true },
        { name: 'Pilot', icon: 'Cpu', role: 'Reserve-Engine, wenn die Haupt-KI nicht verfügbar ist.', reserve: true },
      ],
    },
    scope: {
      title: 'Was es tut, und was nicht',
      does: { title: 'Tut es', icon: 'CheckCircle', items: ['E-Mails sichten und Entwürfe vorbereiten', 'Angebote nachverfolgen', 'Tagesübersicht', 'Berichte', 'Recherche und Notizen', 'Aufgaben verteilen'] },
      needsApproval: { title: 'Tut es nicht ohne Freigabe', icon: 'ShieldCheck', items: ['E-Mails versenden', 'Daten löschen', 'zahlen', 'etwas veröffentlichen'], note: 'Standardmäßig bereitet es das vor; den Knopf drückt ein Mensch.' },
      remembers: { title: 'Erinnert sich', icon: 'Brain', text: 'An frühere Entscheidungen und an die eigenen Notizen des Unternehmens, die auch Menschen lesen können.' },
    },
    start: {
      title: 'So beginnt es',
      steps: [
        { title: '30-minütige Vorführung', text: 'Wir zeigen unser eigenes System live.' },
        { title: 'Analyse', text: 'Wir wählen 2-3 wiederkehrende Aufgaben für den Start.' },
        { title: 'Installation und Einrichtung', text: 'Auf dem Rechner des Unternehmens (macOS oder Linux).' },
        { title: 'Wartung', text: 'Updates, bewährte Rezepte, Fehlermeldungen.' },
      ],
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        { id: 'elofizetes', q: 'Auf wessen Namen läuft das KI-Abonnement?', a: null },
        { id: 'adatok', q: 'Wo sind unsere Daten?', a: 'Auf dem Rechner des Unternehmens: Gedächtnis, Notizen und Aufgabentafel werden dort gespeichert. Den Text selbst verarbeitet das KI-Modell in der Cloud des Anbieters, daher gelangt auch dorthin, was das System verarbeitet. Die Datenverarbeitung regeln wir in einem eigenen Vertrag.' },
        { id: 'leallas', q: 'Was passiert bei einem Ausfall?', a: 'Eine Statusüberwachung meldet den Fehler. Ein nächtlicher Ausfall wird am Morgen behoben, nicht in der Nacht.' },
        { id: 'feltetelek', q: 'Was braucht das Unternehmen?', a: 'Einen Rechner (macOS oder Linux), ein Telegram-Konto, eine tägliche Ansprechperson und ein eigenes KI-Abonnement.' },
        { id: 'kiprobalas', q: 'Kann ich es ausprobieren?', a: 'Ja: bei der Vorführung zeigen wir unser eigenes System live.' },
      ],
    },
    resources: {
      title: 'Nützliches Material',
      items: [
        { label: 'Das System in Bildern (Beta-Rundgang)', href: '#brunella-beta' },
        { label: 'Datenschutzerklärung', href: '/adatvedelmi-nyilatkozat' },
      ],
    },
    final: {
      title: 'Sehen Sie live, wie es bei uns arbeitet.',
      form: {
        name: 'Name', email: 'E-Mail', company: 'Firma', size: 'Teamgröße',
        sizeOptions: ['1-5 Personen', '6-20 Personen', '21-50 Personen', 'über 50 Personen'],
        task: 'Welche tägliche Aufgabe würden Sie abgeben?',
        submit: 'Vorführung anfragen',
        privacy: 'Wir nutzen Ihre Angaben nur, um die Vorführung zu vereinbaren.',
        privacyLink: 'Datenschutzerklärung',
        messagePrefix: '[Brunella Vorführung]',
        success: 'Danke, wir melden uns in Kürze mit einem Termin.',
        error: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns über die Kontaktseite.',
      },
    },
  },
};
