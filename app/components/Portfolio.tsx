"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, TrendingUp, X, Bot, FileSearch, PenTool, ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

const Portfolio = () =>
{
  const [selectedImage, setSelectedImage] = useState<string | null>( null );
  const { language } = useLanguage();
  const withLang = ( href: string ) => ( language === 'hu' ? href : href === '/' ? `/${ language }` : `/${ language }${ href }` );

  const ui =
    language === 'en'
      ? {
        title: 'Featured Projects',
        subtitle: 'Where technology meets business efficiency.',
        details: 'Details',
        detailsPricing: 'Details & Pricing',
        servicesTitle: 'Our Services',
        servicesSubtitle: 'Ready-to-use AI solutions — available as subscription services.',
        new: 'NEW',
        webRefsTitle: 'Website References',
        webRefsSubtitle: 'Live websites designed and developed by our team.',
        view: 'View',
        certTitle: 'Certifications & Results',
        certSubtitle: 'We continuously evolve our expertise to deliver the most up-to-date technology.',
        companyRating: 'Top Company Rating',
        turnover: 'Verified previous turnover',
        close: 'Close',
        certLarge: 'Certificate enlarged',
      }
      : language === 'de'
        ? {
          title: 'Ausgewählte Projekte',
          subtitle: 'Wo Technologie auf Geschäftseffizienz trifft.',
          details: 'Details',
          detailsPricing: 'Details & Preise',
          servicesTitle: 'Unsere Services',
          servicesSubtitle: 'Schlüsselfertige KI-Lösungen als sofort nutzbare Services.',
          new: 'NEU',
          webRefsTitle: 'Webseiten-Referenzen',
          webRefsSubtitle: 'Live-Webseiten, die wir konzipiert und entwickelt haben.',
          view: 'Ansehen',
          certTitle: 'Zertifizierungen & Ergebnisse',
          certSubtitle: 'Wir entwickeln uns kontinuierlich weiter, um modernste Technologie zu liefern.',
          companyRating: 'Top-Unternehmensbewertung',
          turnover: 'Verifizierter früherer Umsatz',
          close: 'Schließen',
          certLarge: 'Zertifikat vergrößert',
        }
        : {
          title: 'Kiemelt Projektjeink',
          subtitle: 'Ahol a technológia találkozik az üzleti hatékonysággal.',
          details: 'Részletek',
          detailsPricing: 'Részletek & Árak',
          servicesTitle: 'Szolgáltatásaink',
          servicesSubtitle: 'Kulcsrakész AI megoldások — azonnal elérhető, havidíjas szolgáltatások.',
          new: 'ÚJ',
          webRefsTitle: 'Weboldal Referenciák',
          webRefsSubtitle: 'Élő, működő weboldalak — melyeket mi terveztünk és fejlesztettünk.',
          view: 'Megtekintés',
          certTitle: 'Minősítéseink és Eredményeink',
          certSubtitle: 'Folyamatosan képezzük magunkat és rendszereinket, hogy a legfrissebb technológiát nyújthassuk.',
          companyRating: 'Kiemelt Cégminősítés',
          turnover: 'Igazolt korábbi forgalom',
          close: 'Bezárás',
          certLarge: 'Tanúsítvány nagyítva',
        };

  const badges = Array.from( { length: 12 }, ( _, i ) => ( {
    id: i + 1,
    src: `/images/google-dev-badge${ i + 1 }.png`,
    alt: `Google Developer Certification ${ i + 1 }`
  } ) );

  return (
    <section id="portfolio" className="py-24 bg-black relative overflow-hidden">
      {/* Background video */ }
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/portfolio.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */ }
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#00e5ff]">
            { ui.title }
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            { ui.subtitle }
          </p>
        </div>

        {/* Projekt Kártyák */ }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* 1. BAS */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">BAS</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Brunella Agent System</h3>
              <p className="text-gray-400 mb-6">
                Az első valódi AI Operációs Rendszer vállalkozásoknak. Nem csak egy chatbot, hanem egy
                57 ügynökből álló, öngyógyító digitális munkaerő, ami lát, hall és cselekszik helyetted.
              </p>
              <Link
                href={ withLang( '/portfolio/brunella-bas' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioFeaturedBrunella, language, target: '/portfolio/brunella-bas', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors"
              >
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Pohi AI Pro */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30 flex items-center">
              <Award className="w-3 h-3 mr-1" /> WINNER
            </div>
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Pohi AI Pro</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pohi AI Pro</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Egyedi fejlesztésű B2B kereskedési platform — vevői adatbázis, gyártói készlet és fuvarszervezés
                egy helyen, Gemini AI-val és Google Maps logisztikai tervezéssel.
                <br /><br />
                <span className="text-[#00e5ff]/70 font-medium">Fejlesztés alatt:</span> backend integráció,
                valós idejű értesítések, prediktív analitika.
              </p>
              <Link
                href={ withLang( '/portfolio/pohi-ai-pro' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioFeaturedPohi, language, target: '/portfolio/pohi-ai-pro', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors"
              >
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. Üzleti Automatizálás */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-[#00e5ff]" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Üzleti Folyamatok</h3>
              <p className="text-gray-400 mb-6">
                Üzleti folyamatok teljes körű automatizálása a BAS rendszer segítségével.
                A repetitív feladatok kiváltása intelligens ügynökökkel.
              </p>
              <a href="#" className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors">
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* === 4 ÚJ ALKALMAZÁS KÁRTYÁK === */ }
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00e5ff]">
              Új Alkalmazásaink
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Frissen érkező, specialiálisan fejlesztett AI megoldások vállalkozásod minden területére.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Könyvelési Automatizálás */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">ÚJ</div>
              <div className="p-6 pt-14">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 w-fit mb-4"><TrendingUp className="w-6 h-6 text-[#00e5ff]" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Könyvelési Automatizálás</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Automatikus számla-feldolgozás, bank-egyeztetés és NAV-ellenőrzés valós idejű irányítópulttal.</p>
                <ul className="space-y-1.5 mb-5">
                  { ["OCR alapú számlakezelés", "Bank-egyeztetés & NAV-ellenőrzés", "Anomália detektálás"].map( b => (
                    <li key={ b } className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />{ b }
                    </li>
                  ) ) }
                </ul>
              </div>
            </div>
            {/* Nova AI Asszisztens */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">ÚJ</div>
              <div className="p-6 pt-14">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 w-fit mb-4"><Bot className="w-6 h-6 text-[#00e5ff]" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Nova — AI Asszisztens</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Vállalkozásodat megismerő, tanuló napi társ — hangalapú kommunikációval és 24/7 elérhetőséggel.</p>
                <ul className="space-y-1.5 mb-5">
                  { ["Vállalkozás-specifikus tanulás", "Hangalapú kommunikáció", "24/7 operatív segítség"].map( b => (
                    <li key={ b } className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />{ b }
                    </li>
                  ) ) }
                </ul>
              </div>
            </div>
            {/* P-Sales */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">ÚJ</div>
              <div className="p-6 pt-14">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 w-fit mb-4"><FileSearch className="w-6 h-6 text-[#00e5ff]" /></div>
                <h3 className="text-lg font-bold text-white mb-2">P-Sales — Ingatlan Értékesítő</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Dokumentumfelmérés, piackutatás és egyedi értékesítési stratégia ügynöki megoldással.</p>
                <ul className="space-y-1.5 mb-5">
                  { ["Felmérő & kutató ügynök", "Piaci árelemzés & stratégia", "Jóváhagyás utáni végrehajtás"].map( b => (
                    <li key={ b } className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />{ b }
                    </li>
                  ) ) }
                </ul>
              </div>
            </div>
            {/* P-Search */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">ÚJ</div>
              <div className="p-6 pt-14">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 w-fit mb-4"><PenTool className="w-6 h-6 text-[#00e5ff]" /></div>
                <h3 className="text-lg font-bold text-white mb-2">P-Search — Pályázat & Hitelkereső</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Folyamatos EU/HU pályázat- és hitelfigyelem személyre szabott találatokkal és Kanban követéssel.</p>
                <ul className="space-y-1.5 mb-5">
                  { ["Folyamatos pályázatfigyelem", "Személyre szabott találatok", "Határidő értesítők"].map( b => (
                    <li key={ b } className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />{ b }
                    </li>
                  ) ) }
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* === ÚJ SZEKCIÓ: Szolgáltatásaink === */ }
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00e5ff]">
            { ui.servicesTitle }
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            { ui.servicesSubtitle }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* 4. Web Robotpilóta */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <Bot className="w-16 h-16 text-[#00e5ff]" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Web Robotpilóta</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                AI-vezérelt böngésző automatizáció. Adatgyűjtés, form kitöltés, versenytárs monitoring —
                emberi felügyelet nélkül, 0-24-ben.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">14.990 Ft/hó-tól</span>
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Első feladat INGYEN</span>
              </div>
              <Link
                href={ withLang( '/portfolio/web-robotpilota' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceRobotpilot, language, target: '/portfolio/web-robotpilota', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 5. Pályázat Radar */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <FileSearch className="w-16 h-16 text-[#00e5ff]" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pályázat Radar</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Soha többé ne maradj le pályázatról. Automatikusan figyeljük az EU/HU pályázatokat
                és jogszabály-változásokat — heti riport emailben.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">9.990 Ft/hó-tól</span>
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">2 hét INGYEN próba</span>
              </div>
              <Link
                href={ withLang( '/portfolio/palyazat-radar' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceRadar, language, target: '/portfolio/palyazat-radar', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 6. Tartalom Gyártás */ }
          <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-[#00e5ff]/10 text-[#00e5ff] px-3 py-1 rounded-full text-xs font-bold border border-[#00e5ff]/20">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-[#00e5ff]/10 to-black/60 flex items-center justify-center">
              <PenTool className="w-16 h-16 text-[#00e5ff]" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">AI Tartalom Gyártás</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Havi social media posztok, blog cikkek és email kampányok — AI-val generálva,
                a te iparágadra és hangnemedre szabva.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">9.990 Ft/hó-tól</span>
                <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">5 minta poszt INGYEN</span>
              </div>
              <Link
                href={ withLang( '/portfolio/tartalom-gyartas' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceContent, language, target: '/portfolio/tartalom-gyartas', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* === WEBOLDAL REFERENCIÁK === */ }
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#00e5ff]">
              { ui.webRefsTitle }
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              { ui.webRefsSubtitle }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cimbi Weboldal */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/cimbi.jpg" alt="Cimbi Weboldal" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Cimbi Weboldal</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Modern, letisztult arculati weboldal — reszponzív dizájn, gyors betöltés és
                  mobilbarát megjelenés az első naptól fogva.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Reszponzív</span>
                </div>
                <a href="https://czimber-tibor.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://czimber-tibor.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Ecomud */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/edmund.jpg" alt="Ecomud" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Ecomud</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Prémium termék-bemutatkozó oldal — konverzióra optimalizált landing page,
                  képgaléria és integrált kapcsolatfelvételi form.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">SEO optimalizált</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Mobil-first</span>
                </div>
                <a href="https://ecomud-eu.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://ecomud-eu.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Aronia */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/aaronia.jpg" alt="Aronia" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Aronia</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Elegáns termékbemutató oldal természetes termékekhez — vizuális storytelling,
                  igényes UI dizájn és gördülékeny felhasználói élmény.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Animációk</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">UI/UX design</span>
                </div>
                <a href="https://aronia-chi.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://aronia-chi.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lumen Limited Series */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/lumen.jpg" alt="Lumen Limited Series" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Lumen Limited Series</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Exkluzív borászati bemutatkozó oldal — sorszámozott kollekcióhoz digitális
                  hitelesítéssel, QR-kód alapú nyomonkövetéssel és elegáns vizuális identitással.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Luxury design</span>
                  <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/20">QR hitelesítés</span>
                </div>
                <a href="https://www.lumenlimitedseries.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Könyvelőiroda Weboldal */ }
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/konyveloiroda.jpg" alt="Könyvelőiroda Weboldal" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Könyvelőiroda Weboldal</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Modern, letisztult könyvelőirodai weboldal — bizalomgerjesztő dizájn, átlátható szolgáltatások és
                  egyszerű kapcsolatfelvétel a leendő ügyfelek számára.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Reszponzív</span>
                </div>
                <a href="https://weboldal-konyveles.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://weboldal-konyveles.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hetényi Renáta Kozmetikus */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/refreni.jpg" alt="Hetényi Renáta Kozmetikus" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Hetényi Renáta Kozmetikus</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Prémium kozmetikai szolgáltató weboldala — elegáns, nőies dizájn, részletes szolgáltatásismertetők
                  és integrált online időpontfoglalási rendszer a zökkenőmentes vendégélményért.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Időpontfoglaló</span>
                </div>
                <a href="https://hetenyirenata.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://hetenyirenata.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* HomolaMentor KFT */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/homola.jpg" alt="HomolaMentor KFT" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">HomolaMentor KFT</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Professzionális mentori és tanácsadói bemutatkozó oldal — bizalomépítő arculat, letisztult
                  szolgáltatásbemutatás és közvetlen kapcsolatfelvételi lehetőség az ügyfelek számára.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Reszponzív</span>
                </div>
                <a href="https://homolamentor.vercel.app/hu" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://homolamentor.vercel.app/hu', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Cars99 */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/cars99.jpg" alt="Cars99" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Cars99</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Modern, prémium autókereskedés weboldal – letisztult járműkínálat-megjelenítéssel, interaktív szűrőkkel és rendkívül gyors, reszponzív felülettel a zökkenőmentes böngészésért.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Interaktív</span>
                </div>
                <a href="https://cars-sr99.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://cars-sr99.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Némethy Roland */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/roland.jpg" alt="Némethy Roland" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Némethy Roland</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Professzionális közúti teherszállítási és logisztikai bemutatóoldal – bizalomgerjesztő, letisztult arculattal, átlátható szolgáltatásismertetéssel és azonnali kapcsolatfelvételi lehetőséggel.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Tailwind CSS</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Logisztika</span>
                </div>
                <a href="https://nemethy-roland.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://nemethy-roland.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* P-BAG Csomagmegőrző Platform */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/p-bag.jpg" alt="P-BAG Csomagmegőrző Platform" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">P-BAG — Csomagmegőrző Platform</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Utazóknak szóló csomagmegőrző-foglalási platform — interaktív térkép a legközelebbi partner kávézókhoz
                  és üzletekhez, biztonságos online fizetés és azonnali QR-kódos check-in a csomagleadáshoz.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Interaktív térkép</span>
                  <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/20">QR-kódos foglalás</span>
                </div>
                <a href="https://csomagmegorzo-projekt.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://csomagmegorzo-projekt.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Cimbi Szakrajz és Modellező Program */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image src="/szakrajz.jpg" alt="Cimbi Szakrajz és Modellező Program" fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Szakrajz & Modellező Program</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Egyedi bútorgyártáshoz fejlesztett AI-alapú tervező eszköz — kézi vázlatból vagy helyszíni fotóból Vision AI
                  ismeri fel a méreteket, majd valós idejű 3D modellt és nyomtatható szakrajzot generál az árajánlattal együtt.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Next.js</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">Vision AI</span>
                  <span className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs px-2 py-1 rounded border border-[#00e5ff]/20">3D modellezés</span>
                </div>
                <a href="https://szakrajz-s-modellez-program.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://szakrajz-s-modellez-program.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-[#00e5ff] hover:text-white font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Eredmények és Tanúsítványok */ }
        <div className="border-t border-white/[0.08] pt-16">
          <h3 className="text-center text-2xl font-bold text-[#00e5ff] mb-4">{ ui.certTitle }</h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            { ui.certSubtitle }
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            { badges.map( ( badge ) => (
              <div
                key={ badge.id }
                onClick={ () => setSelectedImage( badge.src ) }
                className="cursor-pointer p-4 bg-white/[0.02] rounded-xl hover:bg-[#00e5ff]/5 transition-all duration-300 group flex items-center justify-center h-32 border border-transparent hover:border-[#00e5ff]/20"
              >
                <Image
                  src={ badge.src }
                  alt={ badge.alt }
                  width={ 220 }
                  height={ 140 }
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 12vw"
                  className="max-h-20 w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ) ) }
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.08] text-center">
              <div className="text-3xl font-bold text-[#00e5ff] mb-2">A+</div>
              <div className="text-white font-medium">{ ui.companyRating }</div>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.08] text-center">
              <div className="text-3xl font-bold text-[#00e5ff] mb-2">3.2 Mrd Ft</div>
              <div className="text-white font-medium">{ ui.turnover }</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */ }
      { selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={ () => setSelectedImage( null ) }
        >
          <button
            aria-label={ ui.close }
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={ () => setSelectedImage( null ) }
          >
            <X size={ 48 } />
          </button>
          <Image
            src={ selectedImage }
            alt={ ui.certLarge }
            width={ 1600 }
            height={ 1100 }
            sizes="90vw"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={ ( e ) => e.stopPropagation() }
          />
        </div>
      ) }
    </section>
  );
};

export default Portfolio;
