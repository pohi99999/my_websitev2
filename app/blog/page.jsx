import React from 'react';
import Link from 'next/link';
import VideoBackground from '../components/VideoBackground';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POST_META, BLOG_POST_ORDER } from './blogPosts.meta';

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

export default function BlogPage() {
  const posts = BLOG_POST_ORDER.map((slug) => BLOG_POST_META[slug]).filter((post) => Boolean(post));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/blog.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <div className="text-center mb-16">
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

                <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h2>

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
