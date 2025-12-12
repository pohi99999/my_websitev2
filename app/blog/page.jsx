'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GsapFadeIn from '../components/GsapFadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Összes');

  const blogPosts = [
    {
      id: 1,
      title: 'Az AI Revolució az Üzleti Világban',
      excerpt: 'Hogyan változtatja meg a mesterséges intelligencia az üzleti folyamatokat és miért fontosak az AI megoldások a jövőben.',
      date: '2024. január 15.',
      category: 'Technológia',
      readTime: '5 perc',
      icon: '🤖',
    },
    {
      id: 2,
      title: 'Felhő Alapú Infrastruktúra: Előnyök és Lehetőségek',
      excerpt: 'Fedezze fel a modern felhő infrastruktúra nyújtotta lehetőségeket és hogyan segíthet az Ön üzletének.',
      date: '2024. január 10.',
      category: 'Cloud Computing',
      readTime: '7 perc',
      icon: '☁️',
    },
    {
      id: 3,
      title: 'Digitális Transzformáció: Első Lépések',
      excerpt: 'Útmutató a digitális transzformációhoz: mit kell tudni és hogyan kezdjen hozzá az átalakuláshoz.',
      date: '2024. január 5.',
      category: 'Stratégia',
      readTime: '6 perc',
      icon: '💡',
    },
    {
      id: 4,
      title: 'Machine Learning Models Best Practices',
      excerpt: 'Tanuljon meg az ML modellek optimalizálásáról és a production-ready kódról.',
      date: '2024. január 1.',
      category: 'AI & Machine Learning',
      readTime: '8 perc',
      icon: '📊',
    },
  ];

  const categories = ['Összes', 'Technológia', 'Cloud Computing', 'Stratégia', 'AI & Machine Learning', 'DevOps'];

  const filteredPosts = selectedCategory === 'Összes' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-400/20 blur-3xl"
            style={{ top: '10%', left: '10%' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              Blog
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Olvassa el cikkeink a technológia, innováció és üzleti fejlődés világából. Friss insights és hasznos tanácsok az Ön sikeres digitális átalakításához.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'glass-card text-gray-300 hover:text-blue-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <GsapFadeIn key={post.id} delay={index * 0.1}>
                <SpotlightCard
                  className="p-8 h-full flex flex-col group cursor-pointer"
                >
                  <div className="text-5xl mb-4">{post.icon}</div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors h-14 overflow-hidden">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 flex-grow text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <time className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </time>
                    <span className="text-blue-400 group-hover:translate-x-2 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <GsapFadeIn>
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg">Nincs bejegyzés ebben a kategóriában.</p>
              </div>
            </GsapFadeIn>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Maradjon Kapcsolatban
              </h2>
              <p className="text-gray-300 mb-8">
                Iratkozzon fel hírlevelünkre, és kapja meg a legfrissebb cikkeket közvetlenül az inbox-ában.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Az Ön e-mail címe"
                  className="form-input flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Feliratkozás
                </button>
              </form>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}