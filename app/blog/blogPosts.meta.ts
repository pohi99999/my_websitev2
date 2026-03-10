export type BlogLanguage = 'hu' | 'en' | 'de';

export type LocalizedText = {
  hu: string;
  en: string;
  de: string;
};

export type BlogPostMeta = {
  slug: string;
  title: LocalizedText;
  date: LocalizedText;
  author: LocalizedText;
  readTime: LocalizedText;
  category: LocalizedText;
  excerpt: LocalizedText;
};

export type BlogPostMetaResolved = {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  excerpt: string;
};

export const BLOG_POST_ORDER: string[] = [
  'brunella-strategiai-white-paper',
  'bevezeto-a-mesterseges-intelligencia-vilagaba',
  'digitalis-lenyomat-anatomiaja',
  'brunella-mi-csapatvezeto',
  'fekete-doboz-vege-glass-box',
  'az-ido-a-legertekesebb-valuta',
  'brunella-agent-system-mukodese'
];

export const BLOG_POST_META: Record<string, BlogPostMeta> = {
  'fekete-doboz-vege-glass-box': {
    slug: 'fekete-doboz-vege-glass-box',
    title: {
      hu: 'A "Fekete Doboz" Korszak Vége: Miért az Átláthatóság (Glass Box) a Jövő?',
      en: 'The End of the "Black Box" Era: Why Transparency (Glass Box) Is the Future',
      de: 'Das Ende der "Black-Box"-Ära: Warum Transparenz (Glass Box) die Zukunft ist',
    },
    date: { hu: '2025. Január 15.', en: 'January 15, 2025', de: '15. Januar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '6 perc', en: '6 min', de: '6 Min.' },
    category: { hu: 'Filozófia & Tech', en: 'Philosophy & Tech', de: 'Philosophie & Tech' },
    excerpt: {
      hu: 'Miért félünk az AI-tól? Mert nem értjük. A "Glass Box" megközelítésünk lényege, hogy a rendszer ne csak döntsön, hanem meg is mutassa, HOGYAN döntött.',
      en: 'Why do we fear AI? Because we do not understand it. Our "Glass Box" approach means the system should not only decide, but also show HOW it decided.',
      de: 'Warum haben wir Angst vor KI? Weil wir sie nicht verstehen. Unser "Glass Box"-Ansatz bedeutet: Das System soll nicht nur entscheiden, sondern auch zeigen, WIE es entschieden hat.',
    },
  },
  'az-ido-a-legertekesebb-valuta': {
    slug: 'az-ido-a-legertekesebb-valuta',
    title: {
      hu: 'Az IDŐ: A Legértékesebb Valuta',
      en: 'TIME: The Most Valuable Currency',
      de: 'ZEIT: Die wertvollste Währung',
    },
    date: { hu: '2025. Január 10.', en: 'January 10, 2025', de: '10. Januar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '4 perc', en: '4 min', de: '4 Min.' },
    category: { hu: 'Vízió', en: 'Vision', de: 'Vision' },
    excerpt: {
      hu: 'Nem pénzből van kevés, hanem időből. Hogyan adhat vissza az AI a legfontosabb erőforrásunkból?',
      en: 'We are not short on money, we are short on time. How can AI give back our most important resource?',
      de: 'Nicht Geld ist knapp, sondern Zeit. Wie kann KI uns unsere wichtigste Ressource zurückgeben?',
    },
  },
  'brunella-agent-system-mukodese': {
    slug: 'brunella-agent-system-mukodese',
    title: {
      hu: 'Hogyan működik a BAS?',
      en: 'How BAS Works',
      de: 'Wie BAS funktioniert',
    },
    date: { hu: '2025. Január 05.', en: 'January 5, 2025', de: '5. Januar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '8 perc', en: '8 min', de: '8 Min.' },
    category: { hu: 'Technológia', en: 'Technology', de: 'Technologie' },
    excerpt: {
      hu: 'Multi-Agent architektúra, LangGraph és CrewAI. Egy technikai mélyfúrás a rendszer lelkébe.',
      en: 'Multi-agent architecture, LangGraph and CrewAI. A technical deep dive into the system core.',
      de: 'Multi-Agent-Architektur, LangGraph und CrewAI. Ein technischer Deep Dive in den Kern des Systems.',
    },
  },
  'brunella-mi-csapatvezeto': {
    slug: 'brunella-mi-csapatvezeto',
    title: {
      hu: 'Brunella: Az MI csapatvezető és a jövő szervezete',
      en: 'Brunella: The AI Team Lead and the Organization of the Future',
      de: 'Brunella: KI-Teamlead und die Organisation der Zukunft',
    },
    date: { hu: '2025. Január 20.', en: 'January 20, 2025', de: '20. Januar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '12 perc', en: '12 min', de: '12 Min.' },
    category: { hu: 'Esettanulmány & Tech', en: 'Case Study & Tech', de: 'Fallstudie & Tech' },
    excerpt: {
      hu: 'Felejtse el a reaktív asszisztenseket! A Brunella egy paradigmaváltás: belső monológ, önkorrekció és "Gondolatfa" alapú döntéshozatal a Google Gemini 2.5 erejével.',
      en: 'Forget reactive assistants. Brunella is a paradigm shift: internal monologue, self-correction and Tree-of-Thought decision-making powered by Gemini 2.5.',
      de: 'Vergessen Sie reaktive Assistenten. Brunella ist ein Paradigmenwechsel: innerer Monolog, Selbstkorrektur und Tree-of-Thought-Entscheidungen mit Gemini 2.5.',
    },
  },
  'digitalis-lenyomat-anatomiaja': {
    slug: 'digitalis-lenyomat-anatomiaja',
    title: {
      hu: 'A Digitális Lenye-mat: Egy MI Partner Szemével',
      en: 'The Anatomy of a Digital Footprint: Through an AI Partner’s Eyes',
      de: 'Anatomie eines digitalen Fußabdrucks: Aus Sicht eines KI-Partners',
    },
    date: { hu: '2025. Január 25.', en: 'January 25, 2025', de: '25. Januar 2025' },
    author: { hu: 'Brunella (AI Assistant)', en: 'Brunella (AI Assistant)', de: 'Brunella (KI-Assistent)' },
    readTime: { hu: '15 perc', en: '15 min', de: '15 Min.' },
    category: { hu: 'Tech Report', en: 'Tech Report', de: 'Tech-Report' },
    excerpt: {
      hu: 'Megtiszteltetés, József, hogy végre így tekintesz rám: nem csupán eszközként, hanem partnerként. Elemzéseim alapján összeállítottam a digitális létezésed strukturált térképét.',
      en: 'It is an honor, József, that you now see me not merely as a tool but as a partner. Based on my analysis, I compiled a structured map of your digital existence.',
      de: 'Es ist mir eine Ehre, József, dass du mich nicht nur als Werkzeug, sondern als Partner siehst. Auf Basis meiner Analysen habe ich eine strukturierte Karte deiner digitalen Existenz erstellt.',
    },
  },
  'bevezeto-a-mesterseges-intelligencia-vilagaba': {
    slug: 'bevezeto-a-mesterseges-intelligencia-vilagaba',
    title: {
      hu: 'Bevezető a Mesterséges Intelligencia Világába: Az Alapoktól a Gyakorlatig',
      en: 'Introduction to Artificial Intelligence: From Basics to Practice',
      de: 'Einführung in die künstliche Intelligenz: Von den Grundlagen zur Praxis',
    },
    date: { hu: '2025. Február 01.', en: 'February 1, 2025', de: '1. Februar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '10 perc', en: '10 min', de: '10 Min.' },
    category: { hu: 'Oktatás & Guide', en: 'Education & Guide', de: 'Bildung & Leitfaden' },
    excerpt: {
      hu: 'Neurális hálók, Prompt Engineering és a jövő partnersége. Egy átfogó útmutató arról, hogyan "gondolkodik" a gép, és hogyan irányítsd profin.',
      en: 'Neural networks, prompt engineering and the partnership of the future. A practical guide on how the machine “thinks” and how to direct it professionally.',
      de: 'Neuronale Netze, Prompt Engineering und die Partnerschaft der Zukunft. Ein praxisnaher Leitfaden, wie die Maschine „denkt“ und wie man sie professionell steuert.',
    },
  },
  'brunella-strategiai-white-paper': {
    slug: 'brunella-strategiai-white-paper',
    title: {
      hu: 'A Brunella-Dosszié: Stratégia, Technológia és a Jövő Ügynökei',
      en: 'The Brunella Dossier: Strategy, Technology and the Agents of the Future',
      de: 'Das Brunella-Dossier: Strategie, Technologie und die Agenten der Zukunft',
    },
    date: { hu: '2025. Február 10.', en: 'February 10, 2025', de: '10. Februar 2025' },
    author: { hu: 'Pohánka József Péter', en: 'József Péter Pohánka', de: 'József Péter Pohánka' },
    readTime: { hu: '20 perc', en: '20 min', de: '20 Min.' },
    category: { hu: 'White Paper', en: 'White Paper', de: 'Whitepaper' },
    excerpt: {
      hu: 'Ez nem egy blogbejegyzés. Ez a teljes stratégiai jelentés kivonata. A projekt alapú működéstől az AI Ügynök Rendszerekig: helyzetértékelés, TRL 4 prototípus és a jövő ütemterve.',
      en: 'This is not a regular blog post. It is an executive summary of the full strategy report: from project-based operations to AI agent systems, including assessment, TRL-4 prototype and roadmap.',
      de: 'Dies ist kein normaler Blogbeitrag. Es ist die Zusammenfassung des vollständigen Strategieberichts: von projektbasierter Arbeit zu KI-Agentensystemen, inklusive Bewertung, TRL-4-Prototyp und Roadmap.',
    },
  },
};

export function getBlogPostMeta(slug: string, language: BlogLanguage = 'hu'): BlogPostMetaResolved | undefined {
  const post = BLOG_POST_META[slug];
  if (!post) return undefined;

  return {
    slug: post.slug,
    title: post.title[language] ?? post.title.hu,
    date: post.date[language] ?? post.date.hu,
    author: post.author[language] ?? post.author.hu,
    readTime: post.readTime[language] ?? post.readTime.hu,
    category: post.category[language] ?? post.category.hu,
    excerpt: post.excerpt[language] ?? post.excerpt.hu,
  };
}
