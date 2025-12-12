'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';

const blogPosts = {
  'ai-revolucio-uzleti-vilagban': {
    title: 'Az AI Revolució az Üzleti Világban',
    date: '2024. január 15.',
    author: 'Dr. Nagy László',
    readTime: '5 perc',
    category: 'Technológia',
    image: '🤖',
    excerpt: 'Hogyan változtatja meg a mesterséges intelligencia az üzleti folyamatokat?',
    content: `
      A mesterséges intelligencia már nem csak a sci-fi filmekből ismert dolog. Az AI technológiák beépültek az üzleti világba, és radikálisan megváltoztatják a munka módját.

      ## Az AI Hatása az Üzletre

      Az elmúlt öt évben az AI adoption exponenciálisan nőtt. A vállalatok rájöttek, hogy az AI-alapú megoldások:
      
      - **Költségeket csökkentik**: Automatizáció révén 30-40% költségmegtakarítás érhető el
      - **Termelékenységet növelik**: Alkalmazottak több időt tölthetnek kreativ feladatokon
      - **Jobb döntéseket hoznak**: Adatelemzés alapján megalapozottabb stratégiák

      ## Gyakorlati Alkalmazások

      ### 1. Ügyfélszolgálat Automatizálása
      Chatbotok képesek 24/7 támogatást nyújtani, megválaszolva az ügyfelek 80%-ának kérdéseit anélkül, hogy emberi beavatkozásra lenne szükség.

      ### 2. Előrejelzések és Analitika
      Machine Learning modellek képesek megjósolni az ügyfelek viselkedését, piaci trendeket, és így segíthetnek jobb üzleti döntésekben.

      ### 3. Dokumentum Feldolgozás
      Az NLP technológiák automatikusan feldolgozhatnak szerződéseket, számlákat, és egyéb üzleti dokumentumokat.

      ## A Jövő

      Az AI nem az alkalmazottaknak az ellensége, hanem a partnere. A sikeres vállalatok azok lesznek, amelyek képesek az AI-t és az emberi kreativitást kombinálni.

      Az AI implementálásában a kulcs az, hogy szervezetiek legyenek a folyamatok, képezzük az alkalmazottakat, és fokozatosan vezetjük be az új technológiákat.
    `,
    relatedPosts: [
      { slug: 'felhoalapi-infrastruktura', title: 'Felhő Alapú Infrastruktúra' },
      { slug: 'digitalis-transzformacio-elso-lepesek', title: 'Digitális Transzformáció' },
    ],
  },
  'felhoalapi-infrastruktura': {
    title: 'Felhő Alapú Infrastruktúra: Előnyök és Lehetőségek',
    date: '2024. január 10.',
    author: 'Szákó Péter',
    readTime: '7 perc',
    category: 'Cloud Computing',
    image: '☁️',
    excerpt: 'Miért kell az Ön cégének felhő infrastruktúrára váltania?',
    content: `
      A felhő infrastruktúra már nem opcionális a modern vállalatok számára. Ez a technológia megváltoztatja az IT infrastruktúra működésének módját.

      ## Mit Jelent a Felhő?

      A felhő infrastruktúra azt jelenti, hogy az Ön adatai és alkalmazásai nem a saját szervereimen futnak, hanem egy megbízható szolgáltató (AWS, Azure, Google Cloud) infrastruktúráján.

      ## Fő Előnyei

      ### Költséghatékonyság
      - Nem kell saját szervert vásárolni és karbantartani
      - Pay-as-you-go modell: csak azt fizeti, amit használ
      - Teszthez sem kell külön hardver

      ### Skalázhatóság
      - Másodpercek alatt nőhet vagy csökkenhet az erőforrások
      - Automatikus terheléselosztás
      - Világszintű rendelkezésre állás

      ### Biztonság
      - Professzionális biztonságkezelés
      - Automatikus biztonsági mentések
      - ISO 27001, SOC 2 compliance

      ## Hogyan Kezdjen Hozzá?

      Az átmenet a helyi infrastruktúráról a felhőre fokozatosan történhet:
      
      1. Pilotprojekt indítása egy kisebb alkalmazással
      2. Csapatképzés a felhő szolgáltatások használatáról
      3. Fokozatos migrálás az összes alkalmazásra

      ## Konklúzió

      A felhő infrastruktúra nemcsak egy technológiai trend, hanem az üzleti siker kulcsa a digitális korban.
    `,
    relatedPosts: [
      { slug: 'ai-revolucio-uzleti-vilagban', title: 'Az AI Revolució' },
      { slug: 'digitalis-transzformacio-elso-lepesek', title: 'Digitális Transzformáció' },
    ],
  },
  'digitalis-transzformacio-elso-lepesek': {
    title: 'Digitális Transzformáció: Első Lépések',
    date: '2024. január 5.',
    category: 'Stratégia',
    image: '💡',
    author: 'Kovács Zsuzsanna',
    readTime: '6 perc',
    excerpt: 'Útmutató a digitális transzformációhoz: mit kell tudni és hogyan kezdjen hozzá?',
    content: `
      A digitális transzformáció már nem luxus, hanem szükségszerűség. De hogyan kezdjen hozzá?

      ## Mi a Digitális Transzformáció?

      A digitális transzformáció az üzleti folyamatok, kultúra és technológia alapvető átalakítása digitális technológiák alkalmazásával.

      ## Első Lépések

      ### 1. Felmérés és Tervezés
      - Mérje fel az Ön szervezet jelenlegi digitális érettségét
      - Szimmetrikus meg a célokat és KPI-ket
      - Külső tanácsadóktól kérjen segítséget

      ### 2. Szervezeti Kultúra
      - Legyen nyitott az innováció felé
      - Képezze a csapatot
      - Jutalmazzon digitális gondolkodásmódot

      ### 3. Technológiai Implementáció
      - Válassza ki a megfelelő eszközöket és platformokat
      - Kezdjen pilotprojekttel
      - Fokozatosan bővítsen

      ### 4. Folyamatos Fejlődés
      - Mérje a sikereket
      - Tanuljon a kudarcokból
      - Adaptálódjon az új körülményekhez

      ## Gyakori Hibák

      - Túl ambiciózus célok kitűzése
      - A szervezeti kultúra figyelmen kívül hagyása
      - Nem elegendő szervezeti támogatás
      - Gyors váltás technológiára

      ## Konklúzió

      A digitális transzformáció egy folyamat, nem egy projekt. Az a vállalat nyeri meg, amely rugalmas, tanul, és folyamatosan fejlődik.
    `,
    relatedPosts: [
      { slug: 'ai-revolucio-uzleti-vilagban', title: 'Az AI Revolució' },
      { slug: 'felhoalapi-infrastruktura', title: 'Felhő Infrastruktúra' },
    ],
  },
};

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-dark-light to-dark text-white flex items-center justify-center px-6">
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
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Vissza a Bloghoz
            </Link>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} olvasás</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                {post.category}
              </span>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-12 text-center">
              <div className="text-8xl">{post.image}</div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.3}>
            <SpotlightCard className="p-8 sm:p-12">
              <div
                className="text-gray-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split('\n\n')
                    .map((paragraph) => {
                      if (paragraph.startsWith('##')) {
                        return `<h2 class="text-3xl font-bold mt-8 mb-4 gradient-text">${paragraph.replace('## ', '')}</h2>`;
                      }
                      if (paragraph.startsWith('###')) {
                        return `<h3 class="text-2xl font-bold mt-6 mb-3">${paragraph.replace('### ', '')}</h3>`;
                      }
                      if (paragraph.startsWith('-')) {
                        const items = paragraph.split('\n').map(item => `<li class="ml-4">${item.replace('- ', '')}</li>`).join('');
                        return `<ul class="list-disc space-y-2">${items}</ul>`;
                      }
                      return `<p>${paragraph}</p>`;
                    })
                    .join(''),
                }}
              />
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.4}>
            <SpotlightCard className="p-8 flex items-center justify-between">
              <span className="text-gray-300">Szerette a cikket? Ossza meg:</span>
              <button className="btn-primary flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Megosztás
              </button>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Kapcsolódó Cikkek</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.relatedPosts.map((relatedPost, idx) => (
              <GsapFadeIn key={idx} delay={0.5 + idx * 0.1}>
                <SpotlightCard className="p-8 h-full">
                  <h3 className="text-xl font-bold mb-4">{relatedPost.title}</h3>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    Olvassa el <ArrowRight className="w-4 h-4" />
                  </Link>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Szeretne Többet Megtudni?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Keresse meg csapatunkat a projektekről vagy konzultációról.
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Lépjen Velünk Kapcsolatba
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}