'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Termékek',
      links: [
        { label: 'Pohi AI Pro', href: '/termekek/pohi-ai-pro' },
        { label: 'Brunella Agents', href: '/termekek/brunella-agents' },
        { label: 'Összes termék', href: '/termekek' },
      ],
    },
    {
      title: 'Szolgáltatások',
      links: [
        { label: 'Szoftverfejlesztés', href: '/szolgaltatasok#szoftver' },
        { label: 'Mesterséges Intelligencia', href: '/szolgaltatasok#ai' },
        { label: 'Felhő Infrastruktúra', href: '/szolgaltatasok#cloud' },
      ],
    },
    {
      title: 'Vállalat',
      links: [
        { label: 'Rólunk', href: '/rolunk' },
        { label: 'Blog', href: '/blog' },
        { label: 'Kapcsolat', href: '/kapcsolat' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/profile.php?id=61576881120445', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: 'https://x.com/pohanka_peter', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/j%C3%B3zsef-p%C3%A9ter-poh%C3%A1nka-402423184/', label: 'LinkedIn' },
    { icon: <Github size={20} />, href: 'https://github.com/pohi99999', label: 'GitHub' },
  ];

  return (
    <footer className="bg-dark/50 backdrop-blur-md border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Innovatív szoftverfejlesztés és AI megoldások a jövő vállalkozásai számára.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-white/20 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 pb-12 border-b border-white/10">
          <div className="space-y-6">
            <h3 className="font-bold text-white text-xl mb-6">Elérhetőségek</h3>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Telefon</p>
                <a href="tel:+36304291227" className="text-white hover:text-blue-400 transition-colors block font-medium">
                  +36 30 429 1227
                </a>
                <a href="tel:+36302446779" className="text-white hover:text-blue-400 transition-colors block font-medium">
                  +36 30 244 6779
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">E-mail</p>
                <a href="mailto:peter@pohanka.company" className="text-white hover:text-blue-400 transition-colors block font-medium">
                  peter@pohanka.company
                </a>
                <a href="mailto:support@pohanka.company" className="text-white hover:text-blue-400 transition-colors block font-medium">
                  support@pohanka.company
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Cím</p>
                <p className="text-white font-medium">8900 Zalaegerszeg, Berek utca 38, Hungary</p>
                <p className="text-gray-400 text-sm mt-2">Iroda: 8900 Zalaegerszeg, Kossuth Lajos utca 39</p>
                <p className="text-gray-400 text-sm">Adószám: 14728864-2-20</p>
              </div>
            </div>
          </div>

          <div className="h-64 lg:h-auto rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2728.674977467894!2d16.8384!3d46.8417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47692e7c0c0c0c0d%3A0x0!2sZalaegerszeg%2C%20Berek%20u.%2038%2C%208900!5e0!3m2!1sen!2shu!4v1620000000000!5m2!1sen!2shu"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pohánka és Társa Kft. Térkép"
            ></iframe>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Pohánka és Társa Kft. Minden jog fenntartva.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Adatvédelmi Szabályzat
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Felhasználási Feltételek
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookie Tájékoztatás
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
