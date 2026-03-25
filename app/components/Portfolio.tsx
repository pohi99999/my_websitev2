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
    <section id="portfolio" className="py-24 bg-slate-900 relative overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            { ui.title }
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            { ui.subtitle }
          </p>
        </div>

        {/* Projekt Kártyák */ }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* 1. BAS */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-blue-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">BAS</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Brunella Agent System</h3>
              <p className="text-slate-400 mb-6">
                Az első valódi AI Operációs Rendszer vállalkozásoknak. Nem csak egy chatbot, hanem egy
                57 ügynökből álló, öngyógyító digitális munkaerő, ami lát, hall és cselekszik helyetted.
              </p>
              <Link
                href={ withLang( '/portfolio/brunella-bas' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioFeaturedBrunella, language, target: '/portfolio/brunella-bas', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Pohi AI Pro */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30 flex items-center">
              <Award className="w-3 h-3 mr-1" /> WINNER
            </div>
            <div className="h-48 bg-gradient-to-br from-purple-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Pohi AI Pro</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pohi AI Pro</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Egyedi fejlesztésű B2B kereskedési platform — vevői adatbázis, gyártói készlet és fuvarszervezés
                egy helyen, Gemini AI-val és Google Maps logisztikai tervezéssel.
                <br /><br />
                <span className="text-purple-400 font-medium">Fejlesztés alatt:</span> backend integráció,
                valós idejű értesítések, prediktív analitika.
              </p>
              <Link
                href={ withLang( '/portfolio/pohi-ai-pro' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioFeaturedPohi, language, target: '/portfolio/pohi-ai-pro', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. Üzleti Automatizálás */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-emerald-900/50 to-slate-900/50 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-emerald-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Üzleti Folyamatok</h3>
              <p className="text-slate-400 mb-6">
                Üzleti folyamatok teljes körű automatizálása a BAS rendszer segítségével.
                A repetitív feladatok kiváltása intelligens ügynökökkel.
              </p>
              <a href="#" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                { ui.details } <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* === ÚJ SZEKCIÓ: Szolgáltatásaink === */ }
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            { ui.servicesTitle }
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            { ui.servicesSubtitle }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* 4. Web Robotpilóta */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-cyan-900/50 to-slate-900/50 flex items-center justify-center">
              <Bot className="w-16 h-16 text-cyan-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Web Robotpilóta</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                AI-vezérelt böngésző automatizáció. Adatgyűjtés, form kitöltés, versenytárs monitoring —
                emberi felügyelet nélkül, 0-24-ben.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/20">14.990 Ft/hó-tól</span>
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">Első feladat INGYEN</span>
              </div>
              <Link
                href={ withLang( '/portfolio/web-robotpilota' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceRobotpilot, language, target: '/portfolio/web-robotpilota', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 5. Pályázat Radar */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-amber-900/50 to-slate-900/50 flex items-center justify-center">
              <FileSearch className="w-16 h-16 text-amber-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pályázat Radar</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Soha többé ne maradj le pályázatról. Automatikusan figyeljük az EU/HU pályázatokat
                és jogszabály-változásokat — heti riport emailben.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/20">9.990 Ft/hó-tól</span>
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">2 hét INGYEN próba</span>
              </div>
              <Link
                href={ withLang( '/portfolio/palyazat-radar' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceRadar, language, target: '/portfolio/palyazat-radar', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 6. Tartalom Gyártás */ }
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 right-4 bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-bold border border-pink-500/30">
              { ui.new }
            </div>
            <div className="h-48 bg-gradient-to-br from-pink-900/50 to-slate-900/50 flex items-center justify-center">
              <PenTool className="w-16 h-16 text-pink-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">AI Tartalom Gyártás</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Havi social media posztok, blog cikkek és email kampányok — AI-val generálva,
                a te iparágadra és hangnemedre szabva.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-pink-500/10 text-pink-400 text-xs px-2 py-1 rounded border border-pink-500/20">9.990 Ft/hó-tól</span>
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">5 minta poszt INGYEN</span>
              </div>
              <Link
                href={ withLang( '/portfolio/tartalom-gyartas' ) }
                onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioServiceContent, language, target: '/portfolio/tartalom-gyartas', page: PAGE_NAMES.Home } ) }
                className="inline-flex items-center text-pink-400 hover:text-pink-300 font-medium transition-colors"
              >
                { ui.detailsPricing } <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* === WEBOLDAL REFERENCIÁK === */ }
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              { ui.webRefsTitle }
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              { ui.webRefsSubtitle }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Cimbi Weboldal */ }
            <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-700/40 to-violet-800/40 flex flex-col items-center justify-center">
                <Globe className="w-10 h-10 text-cyan-400 mb-2" />
                <span className="text-base font-bold text-white">cimbi-weboldal.vercel.app</span>
                <span className="text-xs text-slate-400 mt-1">Arculati bemutatkozó oldal</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Cimbi Weboldal</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Modern, letisztult arculati weboldal — reszponzív dizájn, gyors betöltés és
                  mobilbarát megjelenés az első naptól fogva.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/20">Next.js</span>
                  <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/20">Tailwind CSS</span>
                  <span className="bg-violet-500/10 text-violet-400 text-xs px-2 py-1 rounded border border-violet-500/20">Reszponzív</span>
                </div>
                <a href="https://cimbi-weboldal.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://cimbi-weboldal.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Ecomud */ }
            <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-emerald-700/40 to-green-900/40 flex flex-col items-center justify-center">
                <Globe className="w-10 h-10 text-emerald-400 mb-2" />
                <span className="text-base font-bold text-white">ecomud-eu.vercel.app</span>
                <span className="text-xs text-slate-400 mt-1">Prémium termékbemutató</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Ecomud</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Prémium termék-bemutatkozó oldal — konverzióra optimalizált landing page,
                  képgaléria és integrált kapcsolatfelvételi form.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/20">Next.js</span>
                  <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">SEO optimalizált</span>
                  <span className="bg-teal-500/10 text-teal-400 text-xs px-2 py-1 rounded border border-teal-500/20">Mobil-first</span>
                </div>
                <a href="https://ecomud-eu.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://ecomud-eu.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Aronia */ }
            <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-fuchsia-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-violet-700/40 to-fuchsia-900/40 flex flex-col items-center justify-center">
                <Globe className="w-10 h-10 text-fuchsia-400 mb-2" />
                <span className="text-base font-bold text-white">aronia-chi.vercel.app</span>
                <span className="text-xs text-slate-400 mt-1">Természetes termékoldal</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Aronia</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Elegáns termékbemutató oldal természetes termékekhez — vizuális storytelling,
                  igényes UI dizájn és gördülékeny felhasználói élmény.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-violet-500/10 text-violet-400 text-xs px-2 py-1 rounded border border-violet-500/20">Next.js</span>
                  <span className="bg-fuchsia-500/10 text-fuchsia-400 text-xs px-2 py-1 rounded border border-fuchsia-500/20">Animációk</span>
                  <span className="bg-pink-500/10 text-pink-400 text-xs px-2 py-1 rounded border border-pink-500/20">UI/UX design</span>
                </div>
                <a href="https://aronia-chi.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://aronia-chi.vercel.app/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lumen Limited Series */ }
            <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-amber-700/40 to-orange-900/40 flex flex-col items-center justify-center">
                <Globe className="w-10 h-10 text-amber-400 mb-2" />
                <span className="text-base font-bold text-white text-center px-4">lumenlimitedseries.com</span>
                <span className="text-xs text-slate-400 mt-1">Prémium lifestyle márkaoldal</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Lumen Limited Series</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Modern, vizuálisan erős márkaweboldal — prémium megjelenéssel,
                  gyors teljesítménnyel és konverzióbarát struktúrával.
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/20">Brand-first</span>
                  <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded border border-orange-500/20">Prémium UX</span>
                  <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/20">Mobilbarát</span>
                </div>
                <a href="https://www.lumenlimitedseries.com/" target="_blank" rel="noopener noreferrer" onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.PortfolioReferenceExternal, language, target: 'https://www.lumenlimitedseries.com/', page: PAGE_NAMES.Home } ) } className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors text-sm">
                  { ui.view } <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/40">
              <Image
                src="/images/biz-automation/munkaugyi-nyilvantarto-ai.jpg"
                alt="AI vezérelt munkaügyi nyilvántartó rendszer"
                width={ 1200 }
                height={ 800 }
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-white font-semibold">AI-vezérelt munkaügyi nyilvántartás</p>
                <p className="text-slate-400 text-sm mt-1">Jelenlét, dokumentumok és riportok automatizált kezelése.</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/40">
              <Image
                src="/images/biz-automation/okos-ajanlatado.jpg"
                alt="AI okos ajánlatadó és értékesítési előkészítő"
                width={ 1200 }
                height={ 800 }
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-white font-semibold">Okos ajánlatadó workflow</p>
                <p className="text-slate-400 text-sm mt-1">Gyors ajánlatkészítés, dokumentumgenerálás és követés egy rendszerben.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eredmények és Tanúsítványok */ }
        <div className="border-t border-slate-800 pt-16">
          <h3 className="text-center text-2xl font-bold text-white mb-4">{ ui.certTitle }</h3>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            { ui.certSubtitle }
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            { badges.map( ( badge ) => (
              <div
                key={ badge.id }
                onClick={ () => setSelectedImage( badge.src ) }
                className="cursor-pointer p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/60 transition-all duration-300 group flex items-center justify-center h-32 border border-transparent hover:border-slate-700"
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
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">A+</div>
              <div className="text-white font-medium">{ ui.companyRating }</div>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">3.2 Mrd Ft</div>
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
