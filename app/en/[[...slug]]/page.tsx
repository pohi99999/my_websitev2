import React from 'react';
import { notFound } from 'next/navigation';

import HomePage from '../../page';
import TermekekPage from '../../termekek/page';
import KapcsolatPage from '../../kapcsolat/page';
import SzolgaltatasokPage from '../../szolgaltatasok/page';
import PortfolioPage from '../../portfolio/page';
import PortfolioDetailPage from '../../portfolio/[id]/page';
import BlogPage from '../../blog/page';
import BlogPostPage from '../../blog/[slug]/page';
import RolunkPage from '../../rolunk/page';
import FogalomtarPage from '../../fogalomtar/page';
import AdatvedelemPage from '../../adatvedelmi-nyilatkozat/page';
import ImpresszumPage from '../../impresszum/page';
import AszfPage from '../../aszf/page';
import BrunellaAgentsPage from '../../termekek/brunella-agents/page';
import PohiAiProPage from '../../termekek/pohi-ai-pro/page';

export const dynamic = 'force-static';

type Params = {
  slug?: string[];
};

export default function EnCatchAllPage({ params }: { params: Params }) {
  const slug = params?.slug ?? [];

  // /en
  if (slug.length === 0) return <HomePage />;

  // Simple static routes
  if (slug.length === 1) {
    switch (slug[0]) {
      case 'termekek':
        return <TermekekPage />;
      case 'kapcsolat':
        return <KapcsolatPage />;
      case 'szolgaltatasok':
        return <SzolgaltatasokPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'blog':
        return <BlogPage />;
      case 'rolunk':
        return <RolunkPage />;
      case 'fogalomtar':
        return <FogalomtarPage />;
      case 'adatvedelmi-nyilatkozat':
        return <AdatvedelemPage />;
      case 'impresszum':
        return <ImpresszumPage />;
      case 'aszf':
        return <AszfPage />;
      default:
        return notFound();
    }
  }

  // Nested: /en/termekek/*
  if (slug[0] === 'termekek' && slug.length === 2) {
    if (slug[1] === 'brunella-agents') return <BrunellaAgentsPage />;
    if (slug[1] === 'pohi-ai-pro') return <PohiAiProPage />;
  }

  // Dynamic content: /en/blog/:slug
  if (slug[0] === 'blog' && slug.length === 2) {
    return <BlogPostPage params={{ slug: slug[1] }} />;
  }

  // Dynamic content: /en/portfolio/:id
  if (slug[0] === 'portfolio' && slug.length === 2) {
    return <PortfolioDetailPage params={{ id: slug[1] }} />;
  }

  return notFound();
}
