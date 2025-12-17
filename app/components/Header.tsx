'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const withLang = (href: string) => {
    if (language !== 'en') return href;
    if (href === '/') return '/en';
    return href.startsWith('/') ? `/en${href}` : href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">

          {/* Logo (image) */}
          <Link href="/" className="flex items-center group relative z-50">
            <Image
              src="/images/logo.png"
              alt="Pohánka és Társa Logo"
              width={240}
              height={96}
              priority
              className="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {item.label}
                  </span>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100" />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href={withLang('/kapcsolat')}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-green/20 to-electric-blue/20 border border-neon-green/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                <span className="relative flex items-center space-x-2 text-sm font-bold text-neon-green group-hover:text-white transition-colors duration-300">
                  <span>{t('navbar.contact')}</span>
                  <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-white hover:text-neon-green transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="pb-4">
                <LanguageSwitcher />
              </div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl font-bold py-4 border-b border-white/10 ${pathname === item.href ? 'text-neon-green' : 'text-white/60'
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <Link
                  href={withLang('/kapcsolat')}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-neon-green to-electric-blue text-black font-bold text-center text-lg"
                >
                  {t('navbar.contact')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
