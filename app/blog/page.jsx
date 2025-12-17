import React from 'react';
import Link from 'next/link';
import VideoBackground from '../components/VideoBackground';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Blog & Tudástár',
  description: 'Cikkek és white paper anyagok AI ügynökökről, automatizálásról, technológiáról és a Brunella Agent System működéséről.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'Blog & Tudástár | Pohánka AI',
    description:
      'Cikkek és white paper anyagok AI ügynökökről, automatizálásról, technológiáról és a Brunella Agent System működéséről.',
    url: '/blog',
    type: 'website',
    locale: 'hu_HU'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Tudástár | Pohánka AI',
    description:
      'Cikkek és white paper anyagok AI ügynökökről, automatizálásról, technológiáról és a Brunella Agent System működéséről.'
  }
};

const posts = [
  {
    slug: 'brunella-strategiai-white-paper',
    date: '2025. Feb. 10.',
    readTime: '20 perc',
    title: 'A Brunella-Dosszié (White Paper)',
    excerpt: 'A teljes stratégiai dokumentáció. Projektből termék, TRL 4 prototípus és az AI Ügynökök forradalma.',
    category: 'White Paper',
  },
  {
    slug: 'bevezeto-a-mesterseges-intelligencia-vilagaba',
    date: '2025. Feb. 01.',
    readTime: '10 perc',
    title: 'Bevezető az MI Világába',
    excerpt:
      'Neurális hálók, Prompt Engineering és a jövő partnersége. Hogyan működik a gép, és hogyan irányítsd profin?',
    category: 'Oktatás',
  },
  {
    slug: 'digitalis-lenyomat-anatomiaja',
    date: '2025. Jan. 25.',
    readTime: '15 perc',
    title: 'A Digitális Lenye-mat',
    excerpt:
      'Hogyan látja az MI a felhasználóját? Egy strukturált "Digitális Iker" anatómiája és a Pohánka-Protokoll.',
    category: 'Tech Report',
  },
  {
    slug: 'brunella-mi-csapatvezeto',
    date: '2025. Jan. 20.',
    readTime: '12 perc',
    title: 'Brunella: Az MI csapatvezető és a jövő szervezete',
    excerpt:
      'Felejtse el a reaktív asszisztenseket! A Brunella egy paradigmaváltás: belső monológ, önkorrekció és "Gondolatfa" alapú döntéshozatal a Google Gemini 2.5 erejével.',
    category: 'Esettanulmány',
  },
  {
    slug: 'fekete-doboz-vege-glass-box',
    date: '2025. Jan. 15.',
    readTime: '6 perc',
    title: 'A "Fekete Doboz" Korszak Vége',
    excerpt:
      'Miért az Átláthatóság (Glass Box) a mesterséges intelligencia jövője? Hogyan építünk bizalmat a BAS rendszerrel.',
    category: 'Filozófia',
  },
  {
    slug: 'az-ido-a-legertekesebb-valuta',
    date: '2025. Jan. 10.',
    readTime: '4 perc',
    title: 'Az IDŐ: A Legértékesebb Valuta',
    excerpt: 'Nem pénzből van kevés, hanem időből. Hogyan adhat vissza az AI a legfontosabb erőforrásunkból?',
    category: 'Vízió',
  },
  {
    slug: 'brunella-agent-system-mukodese',
    date: '2025. Jan. 05.',
    readTime: '8 perc',
    title: 'Hogyan Működik a BAS?',
    excerpt: 'Bepillantás a motorháztető alá: Multi-Agent architektúra, LangGraph és a jövő technológiája.',
    category: 'Technológia',
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <VideoBackground videoSrc="/blog.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-24 text-white flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Blog &amp; Tudástár
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Gondolatok a jövőről, a technológiáról és az ember szerepéről az AI korszakban.
            <br />Nem csak hírek – filozófia és gyakorlat.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="h-full glass-panel p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-blue-300 border border-white/10 font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 mb-8 flex-grow leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center text-sm font-bold text-white uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  Olvass tovább{' '}
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
