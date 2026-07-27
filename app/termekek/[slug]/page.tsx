import React, { cache } from 'react';
import { Bot, Zap, Clock, ShieldCheck, Target, MessageSquare, Calendar, Search, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import productData from '../../../lib/data/dynamic_products.json';

const getProduct = cache((slug: string) => productData.find(p => p.slug === slug));

const iconMap: Record<string, any> = {
  Clock: Clock,
  Bot: Bot,
  ShieldCheck: ShieldCheck,
  Target: Target,
  MessageSquare: MessageSquare,
  Calendar: Calendar,
  Zap: Zap,
  Search: Search,
  TrendingUp: TrendingUp
};

export async function generateStaticParams() {
  return productData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Termék nem található' };

  return {
    title: `${product.title} - Pohánka & Társa`,
    description: product.description,
  };
}

export default function DynamicProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white">Termék nem található.</div>;
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
            <Zap size={14} className="animate-pulse" />
            {product.tag}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-syne mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {product.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            {product.hero_text}
          </p>
          <div className="text-2xl font-bold text-emerald-400 mb-10">
            {product.price}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kapcsolat" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Kérem az ajánlatot
            </Link>
            <Link href="/kapcsolat" className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-lg transition-all">
              Kérdésem van
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {product.features.map((feature, i) => {
            const IconComponent = iconMap[feature.icon] || Bot;
            return (
              <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-colors">
                <IconComponent className="text-emerald-500 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA / Purchase Section */}
        <div id="vasarlas" className="mt-32 text-center bg-gradient-to-b from-emerald-500/10 to-transparent p-16 rounded-3xl border border-emerald-500/20">
          <h2 className="text-4xl font-bold mb-6">Indítsuk el a fejlődést!</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            A kapcsolatfelvétel után 24 órán belül egyeztetjük a részleteket. Nincs rejtett költség, csak tiszta eredmény.
          </p>
          <Link href="/kapcsolat" className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-full transition-all">
            Kérem a csomagot <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
