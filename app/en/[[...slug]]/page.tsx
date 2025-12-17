import React from 'react';
import type { Metadata } from 'next';
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

const SITE_URL = 'https://pohanka.vercel.app';

type MetaSpec = {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
};

function toPath(slug: string[]) {
  return slug.length ? `/${slug.join('/')}` : '/';
}

function enMetaForSlug(slug: string[]): MetaSpec | null {
  if (slug.length === 0) {
    return {
      title: 'Pohánka AI | AI Agency & Software Development',
      description:
        'AI solutions, Brunella Agent System, and custom software development for SMEs. Automate your workflows with a secure, ROI-focused approach.',
      ogType: 'website',
    };
  }

  if (slug.length === 1) {
    switch (slug[0]) {
      case 'termekek':
        return {
          title: 'Products | Pohánka AI',
          description:
            'Brunella Agent System (BAS), Pohi AI Pro, and additional AI solutions — products and platforms for SMEs.',
          ogType: 'website',
        };
      case 'szolgaltatasok':
        return {
          title: 'Services | Pohánka AI',
          description:
            'AI automation, custom software development, and consulting — delivered with security and measurable ROI in mind.',
          ogType: 'website',
        };
      case 'portfolio':
        return {
          title: 'Portfolio | Pohánka AI',
          description:
            'Selected projects and case studies — practical AI and software solutions for real business outcomes.',
          ogType: 'website',
        };
      case 'blog':
        return {
          title: 'Blog | Pohánka AI',
          description:
            'Articles about AI, automation, and building reliable agentic systems — with practical examples and engineering perspective.',
          ogType: 'website',
        };
      case 'rolunk':
        return {
          title: 'About | Pohánka AI',
          description:
            'Learn about Pohánka & Társa — our approach to AI, automation, and building robust software systems.',
          ogType: 'website',
        };
      case 'kapcsolat':
        return {
          title: 'Contact | Pohánka AI',
          description:
            'Tell us about your workflows and goals — we’ll propose a concrete AI automation plan with fast ROI and safe rollout.',
          ogType: 'website',
        };
      case 'fogalomtar':
        return {
          title: 'Glossary | Pohánka AI',
          description:
            'A practical glossary of AI and software terms — explained clearly for business and engineering.',
          ogType: 'website',
        };
      case 'adatvedelmi-nyilatkozat':
        return {
          title: 'Privacy Policy | Pohánka AI',
          description: 'Privacy policy and data processing information.',
          ogType: 'website',
        };
      case 'impresszum':
        return {
          title: 'Imprint | Pohánka AI',
          description: 'Company information and legal notice.',
          ogType: 'website',
        };
      case 'aszf':
        return {
          title: 'Terms (ÁSZF) | Pohánka AI',
          description: 'General terms and conditions (ÁSZF).',
          ogType: 'website',
        };
      default:
        return null;
    }
  }

  // Nested: /en/termekek/*
  if (slug[0] === 'termekek' && slug.length === 2) {
    if (slug[1] === 'brunella-agents') {
      return {
        title: 'Brunella Agent System | Pohánka AI',
        description:
          'A practical agentic system for business automation — orchestrated workflows, tool use, and secure-by-design deployment.',
        ogType: 'website',
      };
    }
    if (slug[1] === 'pohi-ai-pro') {
      return {
        title: 'Pohi AI Pro | Pohánka AI',
        description:
          'A custom-built portal system integrating customer and inventory data — designed for automation and operational clarity.',
        ogType: 'website',
      };
    }
  }

  // Dynamic: /en/blog/:slug
  if (slug[0] === 'blog' && slug.length === 2) {
    return {
      title: 'Blog Post | Pohánka AI',
      description: 'Insights on AI, automation, and building reliable systems.',
      ogType: 'article',
    };
  }

  // Dynamic: /en/portfolio/:id
  if (slug[0] === 'portfolio' && slug.length === 2) {
    return {
      title: 'Portfolio Project | Pohánka AI',
      description: 'Project details and outcomes.',
      ogType: 'website',
    };
  }

  return null;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const slug = params?.slug ?? [];
  const spec = enMetaForSlug(slug);

  const huPath = toPath(slug);
  const enPath = `/en${huPath === '/' ? '' : huPath}`;

  if (!spec) {
    return {
      title: 'Not Found | Pohánka AI',
      robots: { index: false, follow: false },
      alternates: {
        canonical: huPath,
        languages: {
          hu: huPath,
          en: enPath,
        },
      },
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: spec.title,
    description: spec.description,
    alternates: {
      canonical: enPath,
      languages: {
        hu: huPath,
        en: enPath,
      },
    },
    openGraph: {
      title: spec.title,
      description: spec.description,
      type: spec.ogType ?? 'website',
      locale: 'en_US',
      url: enPath,
      images: [
        {
          url: '/images/logo.png',
          alt: 'Pohánka AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: spec.title,
      description: spec.description,
    },
  };
}

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
