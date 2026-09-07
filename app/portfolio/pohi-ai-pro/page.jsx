import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GsapFadeIn from '../../components/GsapFadeIn';
import ImageLightboxGallery from '../../components/ImageLightboxGallery';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap, Brain, Globe,
  Shield, Users, BarChart3, Cpu, Code2, Truck, Package,
  TrendingUp, Map, FileText, Star, Layers, Activity,
  Building2, ShoppingCart, LayoutDashboard, Bot, Award
} from 'lucide-react';

import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import IntroSection from './components/IntroSection';
import ExecutiveSummarySection from './components/ExecutiveSummarySection';
import RolesSection from './components/RolesSection';
import InteractiveDemoSection from './components/InteractiveDemoSection';
import LogisticsSection from './components/LogisticsSection';
import ScreenshotsSection from './components/ScreenshotsSection';
import ChallengesSection from './components/ChallengesSection';
import ResultsSection from './components/ResultsSection';
import RoadmapSection from './components/RoadmapSection';
import TechStackSection from './components/TechStackSection';
import CTASection from './components/CTASection';


export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Pohi AI Pro | Portfolio | Pohánka AI',
          description:
            'B2B raw-material trading platform with AI-driven logistics planning, map intelligence and role-based operations.',
          canonical: '/en/portfolio/pohi-ai-pro',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Pohi AI Pro | Portfolio | Pohánka AI',
          description:
            'B2B-Rohstoffhandelsplattform mit KI-gestützter Logistikplanung, Kartenintelligenz und rollenbasiertem Betrieb.',
          canonical: '/de/portfolio/pohi-ai-pro',
          locale: 'de_DE',
        }
      : {
          title: 'Pohi AI Pro | Portfólió | Pohánka AI',
          description:
            'B2B nyersanyag-kereskedési platform Gemini AI-val. Automatikus logisztikai tervezés, interaktív térkép, 3 felhasználói szerepkör.',
          canonical: '/portfolio/pohi-ai-pro',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/pohi-ai-pro',
        en: '/en/portfolio/pohi-ai-pro',
        de: '/de/portfolio/pohi-ai-pro',
        'x-default': '/portfolio/pohi-ai-pro',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'article',
      locale: meta.locale,
      images: [{ url: '/images/pohi-ai-pro/pro-01.jpg', alt: 'Pohi AI Pro' }],
    },
  };
}





// ─── Tri-lingual Executive Narrative ───────────────────────────────────────

// ─── Screenshots ─────────────────────────────────────────────────────────────


export default async function PohiAIProPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            title: 'Pohi AI Pro',
            subtitle:
              'A custom B2B operations platform connecting customers, manufacturers and logistics with AI assistance.',
            cards: [
              'Role-based operations for customer, supplier and admin workflows',
              'AI-supported logistics planning and process automation',
              'Interactive mapping and workflow visibility in one portal',
            ],
            cta: 'Request product consultation',
          }
        : {
            back: 'Zurück zum Portfolio',
            title: 'Pohi AI Pro',
            subtitle:
              'Eine individuelle B2B-Operationsplattform, die Kunden, Hersteller und Logistik mit KI-Unterstützung verbindet.',
            cards: [
              'Rollenbasierte Abläufe für Kunde, Lieferant und Administration',
              'KI-gestützte Logistikplanung und Prozessautomatisierung',
              'Interaktive Karten und Prozesssichtbarkeit in einem Portal',
            ],
            cta: 'Produktberatung anfragen',
          };

    return (
      <div className="min-h-screen text-white">
        <section className="relative px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {ui.back}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.cards.map((item, i) => (
              <GsapFadeIn key={item} delay={0.1 * i}>
                <SpotlightCard className="p-7 h-full">
                  <CheckCircle className="w-6 h-6 mb-4 text-purple-300" />
                  <p className="text-gray-200 text-sm leading-relaxed">{item}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <SpotlightCard className="p-10 text-center">
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
                  {ui.cta}
                </Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <StatsSection />
      <IntroSection />
      <ExecutiveSummarySection />
      <RolesSection />
      <InteractiveDemoSection />
      <LogisticsSection />
      <ScreenshotsSection />
      <ChallengesSection />
      <ResultsSection />
      <RoadmapSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
}
