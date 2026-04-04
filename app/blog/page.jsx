import React from 'react';
import Link from 'next/link';
import VideoBackground from '../components/VideoBackground';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POST_ORDER, getBlogPostMeta } from './blogPosts.meta';
import { headers } from 'next/headers';

export const revalidate = 3600;

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Blog & Knowledge Hub',
          description:
            'Articles and white papers about AI agents, automation, technology and practical implementation. Stay ahead with Pohánka AI insights.',
          canonical: '/en/blog',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Blog & Wissenszentrum',
          description:
            'Artikel und Whitepaper zu KI-Agenten, Automatisierung, Technologie und praxisnaher Umsetzung. Bleiben Sie mit Pohánka AI informiert.',
          canonical: '/de/blog',
          locale: 'de_DE',
        }
      : {
          title: 'Blog & Tudástár',
          description:
            'Cikkek és white paper anyagok AI ügynökökről, automatizálásról, technológiáról és a Brunella Agent System működéséről. Friss tartalmak!',
          canonical: '/blog',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/blog',
        en: '/en/blog',
        de: '/de/blog',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'website',
      locale: meta.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function BlogPage() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const prefix = language === 'hu' ? '' : `/${language}`;
  const ui =
    language === 'en'
      ? {
          title: 'Blog & Knowledge Hub',
          subtitle1: 'Thoughts on the future, technology and the human role in the AI era.',
          subtitle2: 'Not just news — philosophy and practice.',
          readMore: 'Read more',
        }
      : language === 'de'
      ? {
          title: 'Blog & Wissenszentrum',
          subtitle1: 'Gedanken über Zukunft, Technologie und die Rolle des Menschen im KI-Zeitalter.',
          subtitle2: 'Nicht nur News — Philosophie und Praxis.',
          readMore: 'Weiterlesen',
        }
      : {
          title: 'Blog & Tudástár',
          subtitle1: 'Gondolatok a jövőről, a technológiáról és az ember szerepéről az AI korszakban.',
          subtitle2: 'Nem csak hírek – filozófia és gyakorlat.',
          readMore: 'Olvass tovább',
        };

  const posts = BLOG_POST_ORDER.map((slug) => getBlogPostMeta(slug, language)).filter((post) => Boolean(post));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://www.pohankaestarsa.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.pohankaestarsa.com/blog" }
          ]
        })}}
      />
      <VideoBackground videoSrc="/blog.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#00e5ff]">
            {ui.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {ui.subtitle1}
            <br />{ui.subtitle2}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} href={`${prefix}/blog/${post.slug}`} className="group">
              <div className="h-full glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#00e5ff]/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00e5ff]/10">
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="px-3 py-1 rounded-full bg-[#00e5ff]/5 text-[#00e5ff]/70 border border-white/10 font-medium">
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

                <h2 className="text-2xl font-bold mb-4 group-hover:text-[#00e5ff] transition-colors leading-tight">{post.title}</h2>

                <p className="text-gray-400 mb-8 flex-grow leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#00e5ff] transition-colors">
                  {ui.readMore}{' '}
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
