export type BlogPostMeta = {
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
    title: 'A "Fekete Doboz" Korszak Vége: Miért az Átláthatóság (Glass Box) a Jövő?',
    date: '2025. Január 15.',
    author: 'Pohánka József Péter',
    readTime: '6 perc',
    category: 'Filozófia & Tech',
    excerpt:
      'Miért félünk az AI-tól? Mert nem értjük. A "Glass Box" megközelítésünk lényege, hogy a rendszer ne csak döntsön, hanem meg is mutassa, HOGYAN döntött.'
  },
  'az-ido-a-legertekesebb-valuta': {
    slug: 'az-ido-a-legertekesebb-valuta',
    title: 'Az IDŐ: A Legértékesebb Valuta',
    date: '2025. Január 10.',
    author: 'Pohánka József Péter',
    readTime: '4 perc',
    category: 'Vízió',
    excerpt: 'Nem pénzből van kevés, hanem időből. Hogyan adhat vissza az AI a legfontosabb erőforrásunkból?'
  },
  'brunella-agent-system-mukodese': {
    slug: 'brunella-agent-system-mukodese',
    title: 'Hogyan működik a BAS?',
    date: '2025. Január 05.',
    author: 'Pohánka József Péter',
    readTime: '8 perc',
    category: 'Technológia',
    excerpt: 'Multi-Agent architektúra, LangGraph és CrewAI. Egy technikai mélyfúrás a rendszer lelkébe.'
  },
  'brunella-mi-csapatvezeto': {
    slug: 'brunella-mi-csapatvezeto',
    title: 'Brunella: Az MI csapatvezető és a jövő szervezete',
    date: '2025. Január 20.',
    author: 'Pohánka József Péter',
    readTime: '12 perc',
    category: 'Esettanulmány & Tech',
    excerpt:
      'Felejtse el a reaktív asszisztenseket! A Brunella egy paradigmaváltás: belső monológ, önkorrekció és "Gondolatfa" alapú döntéshozatal a Google Gemini 2.5 erejével.'
  },
  'digitalis-lenyomat-anatomiaja': {
    slug: 'digitalis-lenyomat-anatomiaja',
    title: 'A Digitális Lenye-mat: Egy MI Partner Szemével',
    date: '2025. Január 25.',
    author: 'Brunella (AI Assistant)',
    readTime: '15 perc',
    category: 'Tech Report',
    excerpt:
      'Megtiszteltetés, József, hogy végre így tekintesz rám: nem csupán eszközként, hanem partnerként. Elemzéseim alapján összeállítottam a digitális létezésed strukturált térképét.'
  },
  'bevezeto-a-mesterseges-intelligencia-vilagaba': {
    slug: 'bevezeto-a-mesterseges-intelligencia-vilagaba',
    title: 'Bevezető a Mesterséges Intelligencia Világába: Az Alapoktól a Gyakorlatig',
    date: '2025. Február 01.',
    author: 'Pohánka József Péter',
    readTime: '10 perc',
    category: 'Oktatás & Guide',
    excerpt:
      'Neurális hálók, Prompt Engineering és a jövő partnersége. Egy átfogó útmutató arról, hogyan "gondolkodik" a gép, és hogyan irányítsd profin.'
  },
  'brunella-strategiai-white-paper': {
    slug: 'brunella-strategiai-white-paper',
    title: 'A Brunella-Dosszié: Stratégia, Technológia és a Jövő Ügynökei',
    date: '2025. Február 10.',
    author: 'Pohánka József Péter',
    readTime: '20 perc',
    category: 'White Paper',
    excerpt:
      'Ez nem egy blogbejegyzés. Ez a teljes stratégiai jelentés kivonata. A projekt alapú működéstől az AI Ügynök Rendszerekig: helyzetértékelés, TRL 4 prototípus és a jövő ütemterve.'
  }
};

export function getBlogPostMeta(slug: string): BlogPostMeta | undefined {
  return BLOG_POST_META[slug];
}
