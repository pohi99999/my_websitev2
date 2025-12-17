'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* LOGO CSERE */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Pohánka és Társa Logo"
              width={240}
              height={96}
              priority
              className="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#home">Főoldal</NavLink>
            <NavLink href="#portfolio">Portfólió</NavLink>
            <NavLink href="#about">Rólunk</NavLink>
            <NavLink href="#contact">Kapcsolat</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} type="button">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 shadow-xl">
            <div className="flex flex-col p-4 space-y-4">
              <MobileNavLink href="#home" onClick={() => setIsOpen(false)}>
                Főoldal
              </MobileNavLink>
              <MobileNavLink href="#portfolio" onClick={() => setIsOpen(false)}>
                Portfólió
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>
                Rólunk
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>
                Kapcsolat
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-slate-300 hover:text-white hover:text-blue-400 transition-colors font-medium text-sm tracking-wide">
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <a href={href} onClick={onClick} className="block text-slate-300 hover:text-white py-2">
    {children}
  </a>
);

export default Navbar;
