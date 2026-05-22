'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Bot, Cpu, Megaphone, Search, FileText, BookOpen, Zap, BarChart3, Package, Code2, Brain, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

export default function Header ()
{
  const [isMenuOpen, setIsMenuOpen] = useState( false );
  const [scrolled, setScrolled] = useState( false );
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>( null );
  const headerRef = useRef<HTMLElement>( null );
  const mobileMenuRef = useRef<HTMLDivElement>( null );
  const mobileMenuButtonRef = useRef<HTMLButtonElement>( null );
  const wasMobileMenuOpenRef = useRef( false );
  const megaMenuButtonRefs = useRef<Record<'services' | 'products', HTMLButtonElement | null>>( {
    services: null,
    products: null,
  } );
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>( null );
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const withLang = ( href: string ) =>
  {
    if ( language === 'hu' ) return href;
    if ( href === '/' ) return `/${ language }`;
    return href.startsWith( '/' ) ? `/${ language }${ href }` : href;
  };

  const lang = ( ['hu', 'en', 'de'] as const ).includes( language as 'hu' | 'en' | 'de' ) ? ( language as 'hu' | 'en' | 'de' ) : ( 'hu' as const );
  const langRecord = {
    hu: {
      mainNav: 'Főmenü',
      openMenu: 'Menü megnyitása',
      closeMenu: 'Menü bezárása',
      mobileMenu: 'Mobil menü',
    },
    en: {
      mainNav: 'Main navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mobileMenu: 'Mobile navigation',
    },
    de: {
      mainNav: 'Hauptnavigation',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      mobileMenu: 'Mobile Navigation',
    },
  };
  const a11yLabels = langRecord[lang] || langRecord.hu;

  // Hover handlers with a small delay so accidental brief mouse-overs don't flash the menu
  const openMegaMenu = useCallback( ( key: string ) =>
  {
    if ( megaMenuTimerRef.current ) clearTimeout( megaMenuTimerRef.current );
    setMegaMenuOpen( key );
  }, [] );

  const closeMegaMenu = useCallback( () =>
  {
    megaMenuTimerRef.current = setTimeout( () => setMegaMenuOpen( null ), 120 );
  }, [] );

  const keepMegaMenuOpen = useCallback( () =>
  {
    if ( megaMenuTimerRef.current ) clearTimeout( megaMenuTimerRef.current );
  }, [] );

  const focusFirstMobileMenuItem = useCallback( () =>
  {
    requestAnimationFrame( () =>
    {
      mobileMenuRef.current?.querySelector<HTMLElement>( 'a[href], button:not([disabled])' )?.focus();
    } );
  }, [] );

  const closeMegaMenuImmediately = useCallback( () =>
  {
    if ( megaMenuTimerRef.current ) clearTimeout( megaMenuTimerRef.current );
    setMegaMenuOpen( null );
  }, [] );

  const focusFirstMegaMenuItem = useCallback( ( key: 'services' | 'products' ) =>
  {
    requestAnimationFrame( () =>
    {
      document.querySelector<HTMLElement>( `#mega-panel-${ key } [role="menuitem"]` )?.focus();
    } );
  }, [] );

  const handleMegaMenuButtonKeyDown = useCallback(
    ( event: React.KeyboardEvent<HTMLButtonElement>, key: 'services' | 'products' ) =>
    {
      if ( event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' )
      {
        event.preventDefault();
        openMegaMenu( key );
        focusFirstMegaMenuItem( key );
        return;
      }

      if ( event.key === 'Escape' )
      {
        event.preventDefault();
        closeMegaMenuImmediately();
        megaMenuButtonRefs.current[key]?.focus();
      }
    },
    [closeMegaMenuImmediately, focusFirstMegaMenuItem, openMegaMenu],
  );

  // Mega menu data — localised
  const megaMenuData = {
    products: {
      hu: {
        title: 'Termékek',
        cta: { label: 'Összes termék', href: withLang( '/termekek' ) },
        items: [
          { icon: Bot, label: 'Brunella / BAS rendszer', desc: 'Saját, élesben futó rendszerünk, amely valós vállalati AI bevezetéseket bizonyít.', href: withLang( '/termekek/brunella-agents' ) },
          { icon: Brain, label: 'Pohi AI Pro', desc: 'Személyes AI asszisztens csomag', href: withLang( '/termekek/pohi-ai-pro' ) },
          { icon: Code2, label: 'Egyedi fejlesztések', desc: 'Testreszabott szoftver és AI megoldások vállalkozásoknak', href: withLang( '/szolgaltatasok' ) },
          { icon: Package, label: 'AI Starter Pack', desc: 'Gyors bevezető csomag kis cégeknek', href: withLang( '/kapcsolat' ) },
        ],
      },
      en: {
        title: 'Products',
        cta: { label: 'All products', href: withLang( '/termekek' ) },
        items: [
          { icon: Bot, label: 'Brunella / BAS system', desc: 'Our in-house system that proves real business AI rollouts.', href: withLang( '/termekek/brunella-agents' ) },
          { icon: Brain, label: 'Pohi AI Pro', desc: 'Personal AI assistant package', href: withLang( '/termekek/pohi-ai-pro' ) },
          { icon: Code2, label: 'Custom Development', desc: 'Tailored software and AI solutions for companies', href: withLang( '/szolgaltatasok' ) },
          { icon: Package, label: 'AI Starter Pack', desc: 'Fast onboarding bundle for small teams', href: withLang( '/kapcsolat' ) },
        ],
      },
      de: {
        title: 'Produkte',
        cta: { label: 'Alle Produkte', href: withLang( '/termekek' ) },
        items: [
          { icon: Bot, label: 'Brunella / BAS-System', desc: 'Unser eigenes System für reale KI-Rollouts in Unternehmen.', href: withLang( '/termekek/brunella-agents' ) },
          { icon: Brain, label: 'Pohi AI Pro', desc: 'Persönliches KI-Assistenz-Paket', href: withLang( '/termekek/pohi-ai-pro' ) },
          { icon: Code2, label: 'Individuelle Entwicklung', desc: 'Maßgeschneiderte Software und KI-Lösungen für Unternehmen', href: withLang( '/szolgaltatasok' ) },
          { icon: Package, label: 'AI Starter Pack', desc: 'Schnelles Einführungspaket', href: withLang( '/kapcsolat' ) },
        ],
      },
    },
    services: {
      hu: {
        title: 'AI rendszerek',
        cta: { label: 'Összes szolgáltatás', href: withLang( '/szolgaltatasok' ) },
        items: [
          { icon: Brain, label: 'AI rendszerek tervezése és kiépítése', desc: 'Egyedi AI rendszerek, automatizálások és döntéstámogatás vállalkozásoknak.', href: withLang( '/szolgaltatasok' ) },
          { icon: Zap, label: 'Folyamatautomatizálás', desc: 'Ismétlődő munkafolyamatok gyorsítása és kiváltása.', href: withLang( '/szolgaltatasok' ) },
          { icon: BarChart3, label: 'Intelligens döntéstámogatás', desc: 'Riportok, elemzések és AI-alapú javaslatok.', href: withLang( '/szolgaltatasok' ) },
          { icon: Mail, label: 'CRM és integrációk', desc: 'Email, ügyfélszolgálat, admin és belső rendszerek összekötése.', href: withLang( '/szolgaltatasok' ) },
        ],
      },
      en: {
        title: 'AI Systems',
        cta: { label: 'All services', href: withLang( '/szolgaltatasok' ) },
        items: [
          { icon: Brain, label: 'AI system design and build', desc: 'Custom AI systems, automation and decision support for companies.', href: withLang( '/szolgaltatasok' ) },
          { icon: Zap, label: 'Workflow automation', desc: 'Remove repetitive work and speed up operations.', href: withLang( '/szolgaltatasok' ) },
          { icon: BarChart3, label: 'Decision support', desc: 'Reports, insights and AI-generated recommendations.', href: withLang( '/szolgaltatasok' ) },
          { icon: Mail, label: 'CRM and integrations', desc: 'Connect email, support, admin and internal systems.', href: withLang( '/szolgaltatasok' ) },
        ],
      },
      de: {
        title: 'KI-Systeme',
        cta: { label: 'Alle Leistungen', href: withLang( '/szolgaltatasok' ) },
        items: [
          { icon: Brain, label: 'KI-Systeme planen und aufbauen', desc: 'Individuelle KI-Systeme, Automatisierung und Entscheidungsunterstützung für Unternehmen.', href: withLang( '/szolgaltatasok' ) },
          { icon: Zap, label: 'Prozessautomatisierung', desc: 'Wiederkehrende Arbeit entfernen und Abläufe beschleunigen.', href: withLang( '/szolgaltatasok' ) },
          { icon: BarChart3, label: 'Entscheidungsunterstützung', desc: 'Reports, Analysen und KI-gestützte Empfehlungen.', href: withLang( '/szolgaltatasok' ) },
          { icon: Mail, label: 'CRM und Integrationen', desc: 'E-Mail, Support, Admin und interne Systeme verbinden.', href: withLang( '/szolgaltatasok' ) },
        ],
      },
    },
  };

  useEffect( () =>
  {
    const handleScroll = () =>
    {
      setScrolled( window.scrollY > 20 );
    };
    window.addEventListener( 'scroll', handleScroll );
    return () => window.removeEventListener( 'scroll', handleScroll );
  }, [] );

  // Clean up mega menu hover timer on unmount
  useEffect( () =>
  {
    return () =>
    {
      if ( megaMenuTimerRef.current ) clearTimeout( megaMenuTimerRef.current );
    };
  }, [] );

  // Lock body scroll when mobile menu is open
  useEffect( () =>
  {
    if ( isMenuOpen )
    {
      focusFirstMobileMenuItem();
    } else if ( wasMobileMenuOpenRef.current )
    {
      mobileMenuButtonRef.current?.focus();
    }

    wasMobileMenuOpenRef.current = isMenuOpen;

    if ( isMenuOpen )
    {
      document.body.style.overflow = 'hidden';
    } else
    {
      document.body.style.overflow = '';
    }
    return () =>
    {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen] );

  useEffect( () =>
  {
    const handleDocumentPointerDown = ( event: PointerEvent ) =>
    {
      if ( headerRef.current?.contains( event.target as Node ) ) return;
      closeMegaMenuImmediately();
    };

    const handleDocumentKeyDown = ( event: KeyboardEvent ) =>
    {
      if ( event.key !== 'Escape' ) return;
      closeMegaMenuImmediately();
      setIsMenuOpen( false );
    };

    document.addEventListener( 'pointerdown', handleDocumentPointerDown );
    document.addEventListener( 'keydown', handleDocumentKeyDown );

    return () =>
    {
      document.removeEventListener( 'pointerdown', handleDocumentPointerDown );
      document.removeEventListener( 'keydown', handleDocumentKeyDown );
    };
  }, [closeMegaMenuImmediately] );

  const handleMobileMenuKeyDown = useCallback( ( event: React.KeyboardEvent<HTMLDivElement> ) =>
  {
    if ( event.key === 'Escape' )
    {
      event.preventDefault();
      setIsMenuOpen( false );
      return;
    }

    if ( event.key !== 'Tab' ) return;

    const focusables = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>( 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])' ) ?? []
    );

    if ( focusables.length === 0 ) return;

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if ( event.shiftKey && document.activeElement === firstFocusable )
    {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if ( !event.shiftKey && document.activeElement === lastFocusable )
    {
      event.preventDefault();
      firstFocusable.focus();
    }
  }, [] );

  const navItems = [
    { label: t( 'navbar.home' ), href: withLang( '/' ) },
    { label: t( 'navbar.services' ), href: withLang( '/szolgaltatasok' ) },
    { label: t( 'navbar.products' ), href: withLang( '/termekek' ) },
    { label: 'Weboldal + AI KKV-knak', href: withLang( '/weboldal-ai-kkv' ) },
    { label: t( 'navbar.portfolio' ), href: withLang( '/portfolio' ) },
    { label: t( 'navbar.blog' ), href: withLang( '/blog' ) },
    { label: t( 'navbar.about' ), href: withLang( '/rolunk' ) },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER BAR
      ───────────────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${ scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.6)] py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href={withLang( '/' )} className="flex items-center relative z-50">
            <Image
              src="/images/logo.png"
              alt="Pohánka és Társa Logo"
              width={240}
              height={96}
              priority
              className="h-10 md:h-12 w-auto object-contain transition-opacity duration-200 hover:opacity-80"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-0" role="navigation" aria-label={a11yLabels.mainNav}>
            {navItems.map( ( item ) =>
            {
              const currentPath = pathname || '/';
              const isActive = currentPath === item.href || currentPath.startsWith( item.href + '/' );
              const megaKey: 'services' | 'products' | null =
                item.href === withLang( '/szolgaltatasok' ) ? 'services' :
                  item.href === withLang( '/termekek' ) ? 'products' : null;
              const hasMega = !!megaKey;
              const isExpanded = megaKey !== null && megaMenuOpen === megaKey;

              if ( hasMega && megaKey )
              {
                const menuData = megaMenuData[megaKey][lang];
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => openMegaMenu( megaKey )}
                    onMouseLeave={closeMegaMenu}
                    onBlur={( event ) =>
                    {
                      if ( !event.currentTarget.contains( event.relatedTarget as Node | null ) )
                      {
                        closeMegaMenuImmediately();
                      }
                    }}
                  >
                    <button
                      ref={( node ) =>
                      {
                        megaMenuButtonRefs.current[megaKey] = node;
                      }}
                      id={`mega-trigger-${ megaKey }`}
                      type="button"
                      className={`
                        relative px-4 py-6 text-sm font-medium tracking-widest uppercase
                        transition-colors duration-200 group flex items-center gap-1
                        ${ isActive || isExpanded ? 'text-[#00e5ff]' : 'text-gray-400 hover:text-white' }
                      `}
                      aria-expanded={isExpanded ? 'true' : 'false'}
                      aria-haspopup="menu"
                      aria-controls={`mega-panel-${ megaKey }`}
                      onClick={() => setMegaMenuOpen( isExpanded ? null : megaKey )}
                      onKeyDown={( event ) => handleMegaMenuButtonKeyDown( event, megaKey )}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${ megaMenuOpen === megaKey ? 'rotate-180 text-[#00e5ff]' : '' }`}
                      />
                      {/* Animated underline */}
                      <span
                        className={`
                          absolute bottom-4 left-4 right-4 h-px
                          bg-[#00e5ff] transition-all duration-300 origin-left
                          ${ isActive || megaMenuOpen === megaKey
                            ? 'scale-x-100 opacity-100 shadow-[0_0_8px_#00e5ff]'
                            : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                          }
                        `}
                      />
                    </button>

                    {/* ── Mega Menu Panel ── */}
                    <AnimatePresence>
                      {megaMenuOpen === megaKey && (
                        <motion.div
                          id={`mega-panel-${ megaKey }`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2"
                          onMouseEnter={keepMegaMenuOpen}
                          onMouseLeave={closeMegaMenu}
                          role="menu"
                          aria-labelledby={`mega-trigger-${ megaKey }`}
                          data-testid={`mega-menu-${ megaKey }`}
                          onKeyDown={( event ) =>
                          {
                            if ( event.key === 'Escape' )
                            {
                              event.preventDefault();
                              closeMegaMenuImmediately();
                              megaMenuButtonRefs.current[megaKey]?.focus();
                            }
                          }}
                        >
                          <div
                            className="surface-panel-elevated shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,229,255,0.06)] backdrop-blur-xl"
                            style={{ width: megaKey === 'services' ? '720px' : '520px' }}
                          >
                            {/* Top accent line */}
                            <div className="h-px bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" />

                            <div className="p-6">
                              {/* Grid of items */}
                              <div className={`grid gap-2 mb-5 ${ megaKey === 'services' ? 'grid-cols-2' : 'grid-cols-2' }`}>
                                {menuData.items.map( ( menuItem ) =>
                                {
                                  const Icon = menuItem.icon;
                                  return (
                                    <Link
                                      key={menuItem.href + menuItem.label}
                                      href={menuItem.href}
                                      role="menuitem"
                                      className="group/item flex items-start gap-3 p-3 hover:bg-[rgba(0,229,255,0.04)] border border-transparent hover:border-[rgba(0,229,255,0.12)] transition-all duration-150"
                                      onClick={() =>
                                      {
                                        setMegaMenuOpen( null );
                                        trackCtaClick( { location: CTA_LOCATIONS.HeaderNavDesktop, language, target: menuItem.href, page: PAGE_NAMES.Global } );
                                      }}
                                    >
                                      <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-white/8 group-hover/item:border-[#00e5ff]/30 transition-colors duration-150">
                                        <Icon size={14} className="text-[#00e5ff]/60 group-hover/item:text-[#00e5ff] transition-colors duration-150" />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-semibold text-white/90 uppercase tracking-wide group-hover/item:text-white transition-colors duration-150 truncate">
                                          {menuItem.label}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-snug group-hover/item:text-gray-400 transition-colors duration-150">
                                          {menuItem.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                } )}
                              </div>

                              {/* Bottom CTA bar */}
                              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <Link
                                  href={menuData.cta.href}
                                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00e5ff] hover:text-white transition-colors duration-200 group/cta"
                                  onClick={() => setMegaMenuOpen( null )}
                                >
                                  {menuData.cta.label}
                                  <span className="group-hover/cta:translate-x-1 transition-transform duration-200">→</span>
                                </Link>
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                  <span className="w-1 h-1 rounded-full bg-[#00e5ff]/40 animate-pulse" />
                                  LIVE
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    trackCtaClick( {
                      location: CTA_LOCATIONS.HeaderNavDesktop,
                      language,
                      target: item.href,
                      page: PAGE_NAMES.Global,
                    } )
                  }
                  className={`
                    relative px-4 py-6 text-sm font-medium tracking-widest uppercase
                    transition-colors duration-200 group
                    ${ isActive ? 'text-[#00e5ff]' : 'text-gray-400 hover:text-white' }
                  `}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={`
                      absolute bottom-4 left-4 right-4 h-px
                      bg-[#00e5ff] transition-all duration-300 origin-left
                      ${ isActive
                        ? 'scale-x-100 opacity-100 shadow-[0_0_8px_#00e5ff]'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                      }
                    `}
                  />
                </Link>
              );
            } )}
          </nav>

          {/* ── Right side: Language + CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={withLang( '/kapcsolat' )}
              onClick={() =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.HeaderContactDesktop,
                  language,
                  target: '/kapcsolat',
                  page: PAGE_NAMES.Global,
                } )
              }
              className="
                inline-flex px-5 py-2.5 text-xs font-bold uppercase tracking-widest
                text-[#00e5ff] border border-[#00e5ff]/40
                hover:border-[#00e5ff] hover:bg-[#00e5ff]/5 hover:scale-[1.03]
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]
              "
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              {t( 'navbar.contact' )}&nbsp;▶
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMenuOpen( !isMenuOpen )}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label={isMenuOpen ? a11yLabels.closeMenu : a11yLabels.openMenu}
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            className="lg:hidden relative z-50 p-2 text-white hover:text-[#00e5ff] transition-colors"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          MOBILE FULL-SCREEN OVERLAY
      ───────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-start px-6 py-24 sm:px-10 lg:hidden overflow-y-auto"
            style={{ background: 'rgba(0, 0, 0, 0.97)', backdropFilter: 'blur(24px)' }}
            role="dialog"
            aria-modal="true"
            aria-label={a11yLabels.mobileMenu}
            tabIndex={-1}
            onKeyDown={handleMobileMenuKeyDown}
          >
            <h2 id="mobile-menu-title" className="sr-only">{a11yLabels.mobileMenu}</h2>
            {/* ── HUD Corner Brackets ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="absolute top-6 left-6 w-10 h-10"
              style={{ borderTop: '1.5px solid #00e5ff', borderLeft: '1.5px solid #00e5ff' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="absolute top-6 right-6 w-10 h-10"
              style={{ borderTop: '1.5px solid #00e5ff', borderRight: '1.5px solid #00e5ff' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="absolute bottom-6 left-6 w-10 h-10"
              style={{ borderBottom: '1.5px solid #00e5ff', borderLeft: '1.5px solid #00e5ff' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="absolute bottom-6 right-6 w-10 h-10"
              style={{ borderBottom: '1.5px solid #00e5ff', borderRight: '1.5px solid #00e5ff' }}
            />

            {/* ── Scan-line sweep ── */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
              className="absolute left-0 right-0 top-1/2 h-px origin-left pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, #00e5ff 30%, #00e5ff 70%, transparent)',
              }}
            />

            {/* ── Nav Items ── */}
            <nav className="mt-2 space-y-1" aria-label={a11yLabels.mobileMenu}>
              {navItems.map( ( item, index ) =>
              {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.45,
                      ease: 'easeOut',
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() =>
                      {
                        trackCtaClick( {
                          location: CTA_LOCATIONS.HeaderNavMobile,
                          language,
                          target: item.href,
                          page: PAGE_NAMES.Global,
                        } );
                        setIsMenuOpen( false );
                      }}
                      className={`
                        flex items-baseline gap-4 group py-2.5
                        ${ isActive ? 'text-[#00e5ff]' : 'text-white/75 hover:text-white' }
                      `}
                    >
                      {/* Index number */}
                      <span
                        className="text-xs font-mono w-6 shrink-0"
                        style={{ color: isActive ? '#00e5ff' : 'rgba(0,229,255,0.35)' }}
                      >
                        {String( index + 1 ).padStart( 2, '0' )}.
                      </span>

                      {/* Label */}
                      <span
                        className="
                          text-3xl sm:text-4xl font-bold uppercase tracking-tight
                          transition-transform duration-200 group-hover:translate-x-2
                        "
                        style={
                          isActive
                            ? { textShadow: '0 0 24px rgba(0,229,255,0.5)' }
                            : undefined
                        }
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              } )}
            </nav>

            {/* ── Bottom Bar: Language + Contact ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.4 }}
              className="
                mt-10
                flex items-center justify-between
                border-t pt-5
              "
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <LanguageSwitcher />
              <Link
                href={withLang( '/kapcsolat' )}
                onClick={() =>
                {
                  trackCtaClick( {
                    location: CTA_LOCATIONS.HeaderContactMobile,
                    language,
                    target: '/kapcsolat',
                    page: PAGE_NAMES.Global,
                  } );
                  setIsMenuOpen( false );
                }}
                className="
                  text-xs font-mono uppercase tracking-widest
                  transition-colors duration-200
                  hover:text-[#00e5ff]
                "
                style={{ color: 'rgba(0,229,255,0.55)' }}
              >
                {t( 'navbar.contact' )} →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
