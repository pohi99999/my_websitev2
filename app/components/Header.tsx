'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const withLang = (href: string) => {
    if (language === 'hu') return href;
    if (href === '/') return `/${language}`;
    return href.startsWith('/') ? `/${language}${href}` : href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: t('navbar.home'), href: withLang('/') },
    { label: t('navbar.services'), href: withLang('/szolgaltatasok') },
    { label: t('navbar.products'), href: withLang('/termekek') },
    { label: t('navbar.portfolio'), href: withLang('/portfolio') },
    { label: t('navbar.blog'), href: withLang('/blog') },
    { label: t('navbar.about'), href: withLang('/rolunk') },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER BAR
      ───────────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.6)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href={withLang('/')} className="flex items-center relative z-50">
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
          <nav className="hidden lg:flex items-center gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    trackCtaClick({
                      location: CTA_LOCATIONS.HeaderNavDesktop,
                      language,
                      target: item.href,
                      page: PAGE_NAMES.Global,
                    })
                  }
                  className={`
                    relative px-4 py-6 text-sm font-medium tracking-widest uppercase
                    transition-colors duration-200 group
                    ${isActive ? 'text-[#00e5ff]' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={`
                      absolute bottom-4 left-4 right-4 h-px
                      bg-[#00e5ff] transition-all duration-300 origin-left
                      ${
                        isActive
                          ? 'scale-x-100 opacity-100 shadow-[0_0_8px_#00e5ff]'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right side: Language + CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={withLang('/kapcsolat')}
              onClick={() =>
                trackCtaClick({
                  location: CTA_LOCATIONS.HeaderContactDesktop,
                  language,
                  target: '/kapcsolat',
                  page: PAGE_NAMES.Global,
                })
              }
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="
                  px-5 py-2.5 text-xs font-bold uppercase tracking-widest
                  text-[#00e5ff] border border-[#00e5ff]/40
                  hover:border-[#00e5ff] hover:bg-[#00e5ff]/5
                  transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]
                "
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                {t('navbar.contact')}&nbsp;▶
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label={isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            aria-expanded={isMenuOpen}
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
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-10 lg:hidden overflow-hidden"
            style={{ background: 'rgba(0, 0, 0, 0.97)', backdropFilter: 'blur(24px)' }}
          >
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
            <nav className="space-y-1">
              {navItems.map((item, index) => {
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
                      onClick={() => {
                        trackCtaClick({
                          location: CTA_LOCATIONS.HeaderNavMobile,
                          language,
                          target: item.href,
                          page: PAGE_NAMES.Global,
                        });
                        setIsMenuOpen(false);
                      }}
                      className={`
                        flex items-baseline gap-4 group py-2.5
                        ${isActive ? 'text-[#00e5ff]' : 'text-white/75 hover:text-white'}
                      `}
                    >
                      {/* Index number */}
                      <span
                        className="text-xs font-mono w-6 shrink-0"
                        style={{ color: isActive ? '#00e5ff' : 'rgba(0,229,255,0.35)' }}
                      >
                        {String(index + 1).padStart(2, '0')}.
                      </span>

                      {/* Label */}
                      <span
                        className="
                          text-4xl sm:text-5xl font-bold uppercase tracking-tight
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
              })}
            </nav>

            {/* ── Bottom Bar: Language + Contact ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.4 }}
              className="
                absolute bottom-10 left-10 right-10
                flex items-center justify-between
                border-t pt-5
              "
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <LanguageSwitcher />
              <Link
                href={withLang('/kapcsolat')}
                onClick={() => {
                  trackCtaClick({
                    location: CTA_LOCATIONS.HeaderContactMobile,
                    language,
                    target: '/kapcsolat',
                    page: PAGE_NAMES.Global,
                  });
                  setIsMenuOpen(false);
                }}
                className="
                  text-xs font-mono uppercase tracking-widest
                  transition-colors duration-200
                  hover:text-[#00e5ff]
                "
                style={{ color: 'rgba(0,229,255,0.55)' }}
              >
                {t('navbar.contact')} →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
