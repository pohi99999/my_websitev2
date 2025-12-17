'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';

// Valós Blog Tartalmak
const blogPosts = {
  'fekete-doboz-vege-glass-box': {
    title: 'A "Fekete Doboz" Korszak Vége: Miért az Átláthatóság (Glass Box) a Jövő?',
    date: '2025. Január 15.',
    author: 'Pohánka József Péter',
    readTime: '6 perc',
    category: 'Filozófia & Tech',
    image: '🔮',
    videoId: 'IbPvzLXlO6Y',
    excerpt:
      'Miért félünk az AI-tól? Mert nem értjük. A "Glass Box" megközelítésünk lényege, hogy a rendszer ne csak döntsön, hanem meg is mutassa, HOGYAN döntött.',
    content: `
      A mesterséges intelligencia fejlesztésének legnagyobb gátja ma nem a technológia, hanem a **bizalom**. A hagyományos AI modellek úgynevezett "Black Box" (Fekete Doboz) rendszerként működnek: betápláljuk az adatot, és kijön az eredmény. De mi történt közben? Senki sem tudja pontosan.

      ## A "Fekete Doboz" Probléma

      Üzleti környezetben a "mert az AI ezt mondta" nem elfogadható érv. Ha egy AI döntést hoz egy hitelkérelemről, egy gyártási folyamatról vagy egy marketing stratégiáról, a vezetőknek érteniük kell az okokat.

      - **Ellenőrizhetetlenség:** Ha hiba történik, nem tudjuk visszakövetni az okát.
      - **Bizalmatlanság:** Az emberek nem bíznak abban, amit nem látnak át.
      - **Jogi kockázatok:** A GDPR és az új AI szabályozások megkövetelik a magyarázhatóságot.

      ## A Megoldás: Glass Box (Üvegdoboz)

      A **Brunella Agent System (BAS)** fejlesztésekor a legfontosabb alapelvünk az átláthatóság volt. Mi nem csak egy eredményt adunk. Mi egy ablakot nyitunk a "gépházra".

      ### Mit jelent ez a gyakorlatban?

      1. **Valós idejű vizualizáció:** A BOV (Brunella Operations Visualizer) segítségével Ön élőben látja, ahogy az ügynökök "gondolkodnak", kutatnak és kommunikálnak egymással.
      2. **Visszakövethetőség:** Minden döntési pont, minden logikai lépés rögzítésre kerül. Bármikor "visszatekerheti az időt" (Time Travel), hogy megnézze, miért döntött így a rendszer.
      3. **Ember-Gép Együttműködés:** Nem helyettesíteni akarjuk az embert, hanem szuperképességekkel felruházni. Ön a Kapitány, az AI pedig a legjobb Navigátor.

      A jövő nem a titokzatos algoritmusoké, hanem az átlátható, elszámoltatható és etikus rendszereké. Ez a **Glass Box** forradalom.
    `,
    relatedPosts: [
      { slug: 'az-ido-a-legertekesebb-valuta', title: 'Az IDŐ: A Legértékesebb Valuta' },
      { slug: 'brunella-agent-system-mukodese', title: 'Így működik a BAS' },
    ],
  },
  'az-ido-a-legertekesebb-valuta': {
    title: 'Az IDŐ: A Legértékesebb Valuta az Üzleti Életben',
    date: '2025. Január 10.',
    author: 'Pohánka József Péter',
    readTime: '4 perc',
    category: 'Vízió',
    image: '⏳',
    videoId: '9h0tFmAlnIQ',
    excerpt: 'Nem pénzből van kevés, hanem időből. Hogyan adhat vissza az AI a legfontosabb erőforrásunkból?',
    content: `
      Képzelje el, mennyire felgyorsult körülöttünk a világ. Mindenki rohan. Az információ sebessége manapság nem csak előny, hanem a túlélés záloga.

      ## A Sebesség Kényszere

      Igaz ez az üzleti élet minden területére:
      - Ki tudja előbb megszerezni a piacot?
      - Ki tudja vírusként elterjeszteni a terméket?
      - Ki látja meg először a pályázati lehetőséget?
      - Ki reagál leggyorsabban az árfolyamváltozásra?

      A hagyományos módszerekkel egyszerűen lehetetlen lépést tartani ezzel a tempóval. Itt jön képbe az **IDŐ**, mint tényező.

      ## Mit adunk mi valójában?

      Sokan azt hiszik, szoftvert fejlesztünk. Pedig valójában **IDŐT adunk el**.

      Amikor a **Pohi AI Pro** vagy a **Brunella Agent System** átvesz egy komplex kutatási feladatot, ami egy embernek 40 órába telne, és elvégzi 40 perc alatt, akkor mi nem csak hatékonyságot növeltünk.
      
      Mi ajándékoztunk Önnek **39 óra és 20 perc** szabadidőt. Időt, amit:
      - Stratégiai tervezéssel tölthet.
      - A családjára fordíthat.
      - Alkotásra használhat.

      A technológia az ecset, Te vagy a Művész, és a siker a Te Alkotásod. Mi csak biztosítjuk, hogy legyen időd megfesteni a mesterművet.
    `,
    relatedPosts: [
      { slug: 'fekete-doboz-vege-glass-box', title: 'A Glass Box Filozófia' },
      { slug: 'brunella-agent-system-mukodese', title: 'Technológiai Háttér' },
    ],
  },
  'brunella-agent-system-mukodese': {
    title: 'A "Motorháztető" Alatt: Hogyan Működik a Brunella Agent System?',
    date: '2025. Január 05.',
    category: 'Technológia',
    author: 'Fejlesztői Csapat',
    readTime: '8 perc',
    image: '🤖',
    videoId: 'VO4Wk68QKHE',
    excerpt: 'Multi-Agent architektúra, LangGraph és CrewAI. Egy technikai mélyfúrás a rendszer lelkébe.',
    content: `
      A Brunella Agent System (BAS) nem egy egyszerű chatbot. Ez egy hierarchikus, több-ügynökös (Multi-Agent) rendszer, amelyet arra terveztünk, hogy komplex, többlépcsős feladatokat oldjon meg autonóm módon.

      ## Az Architektúra

      A rendszer lelke egy **Python alapú Backend**, amely a FastAPI és a LangGraph technológiákra épül.

      ### 1. The Orchestrator (A Karmester)
      A középpontban a "Brunella" főügynök áll. Ő nem végez el minden apró feladatot. Az ő dolga a megértés és a delegálás. Elemzi a felhasználó kérését, és eldönti, melyik specialista ügynökre van szükség.

      ### 2. Specialista Ügynökök
      A rendszer moduláris. Külön "szakértőink" vannak:
      - **Research Agent:** Képes az interneten kutatni, forrásokat elemezni és összefoglalni.
      - **Coder Agent:** Kódot ír, tesztel és debuggol.
      - **Analyst Agent:** Adatokat elemez és trendeket figyel.

      ## Intelligens Technikák

      Nem csak "promptolunk". A rendszer fejlett kognitív architektúrákat használ:
      - **ReAct (Reasoning + Acting):** Az ügynök először gondolkodik ("Mit kell tennem?"), majd cselekszik, végül értékeli az eredményt.
      - **Reflexion:** Ha egy ügynök hibázik, képes "reflektálni" rá, és kijavítani önmagát a következő próbálkozásnál.
      - **Tree-of-Thought:** Komplex problémáknál több lehetséges megoldási útvonalat is megvizsgál párhuzamosan.

      Ez a struktúra teszi lehetővé, hogy a BAS olyan feladatokat is megoldjon, amelyekbe a hagyományos nyelvi modellek (LLM-ek) beletörnének.
    `,
    relatedPosts: [
      { slug: 'fekete-doboz-vege-glass-box', title: 'Átláthatóság az AI-ban' },
      { slug: 'az-ido-a-legertekesebb-valuta', title: 'Hatékonyság és Idő' },
    ],
  },
};

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">404 - Poszt Nem Található</h1>
          <p className="text-gray-300 mb-8">Sajnos nem találjuk ezt a blog bejegyzést.</p>
          <Link href="/blog" className="btn-primary inline-block">
            Vissza a Bloghoz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative py-12 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a Bloghoz
            </Link>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400 mb-8 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{post.readTime} olvasás</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                <span>{post.author}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {post.category}
              </span>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Featured Video or Image */}
      <section className="py-0 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-2 overflow-hidden bg-black/40 backdrop-blur-sm border-white/10">
              {post.videoId ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${post.videoId}?rel=0&modestbranding=1`}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="py-20 text-center text-8xl">{post.image}</div>
              )}
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.3}>
            <div className="glass-panel p-8 sm:p-12 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
              <div
                className="text-gray-300 leading-relaxed space-y-6 text-lg blog-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split('\n\n')
                    .map((paragraph) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return '';
                      if (trimmed.startsWith('## ')) {
                        return `<h2 class="text-3xl font-bold mt-12 mb-6 text-white border-l-4 border-blue-500 pl-4">${trimmed.replace('## ', '')}</h2>`;
                      }
                      if (trimmed.startsWith('### ')) {
                        return `<h3 class="text-2xl font-bold mt-8 mb-4 text-blue-200">${trimmed.replace('### ', '')}</h3>`;
                      }
                      if (trimmed.startsWith('- ')) {
                        const items = trimmed
                          .split('\n')
                          .map((item) =>
                            item.trim().startsWith('- ')
                              ? `<li class="ml-4 mb-2 pl-2 border-l border-gray-600">${item.replace('- ', '')}</li>`
                              : item
                          )
                          .join('');
                        return `<ul class="list-none space-y-2 my-6">${items}</ul>`;
                      }
                      const formattedText = trimmed.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-white font-semibold">$1</strong>'
                      );
                      return `<p class="mb-4 text-justify">${formattedText}</p>`;
                    })
                    .join(''),
                }}
              />
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
              <span className="text-xl font-semibold text-white mb-4 sm:mb-0">
                Tetszett a cikk? Ossza meg másokkal is!
              </span>
              <button className="btn-primary flex items-center gap-2 px-6 py-3">
                <Share2 className="w-5 h-5" />
                Megosztás
              </button>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Kapcsolódó Cikkek</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {post.relatedPosts.map((relatedPost, idx) => (
              <GsapFadeIn key={idx} delay={0.5 + idx * 0.1}>
                <SpotlightCard className="p-8 h-full flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-bold mb-4">{relatedPost.title}</h3>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group"
                  >
                    Olvassa el{' '}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}