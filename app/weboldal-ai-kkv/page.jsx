import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Hero from './components/Hero';
import KinekSzol from './components/KinekSzol';
import MitKapsz from './components/MitKapsz';
import Csomagok from './components/Csomagok';
import HogyanDolgozunk from './components/HogyanDolgozunk';
import Referenciak from './components/Referenciak';
import FAQ from './components/FAQ';
import ZaroCTA from './components/ZaroCTA';

export const dynamic = 'force-dynamic';

export default function WeboldalAiKkvPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main id="main-content" className="pt-20">
        <Hero />
        <KinekSzol />
        <MitKapsz />
        <Csomagok />
        <HogyanDolgozunk />
        <Referenciak />
        <FAQ />
        <ZaroCTA />
      </main>
      <Footer />
    </div>
  );
}
