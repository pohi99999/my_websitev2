import VideoBackground from "../components/VideoBackground";

export default function RolunkPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Itt hívjuk meg a Rólunk oldal SPECIFIKUS videóját */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765516842/3_vk14r3.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Rólunk
        </h1>
        
        <div className="prose prose-lg prose-invert max-w-3xl glass-panel p-8 rounded-2xl">
          <p className="text-xl leading-relaxed">
            Itt lesz a bemutatkozó szöveged. (A régi blogbejegyzésekből majd ide emeljük át a sztorikat).
            A háttérben pedig a futurisztikus videód fut.
          </p>
        </div>
      </div>
    </main>
  );
}
'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../components/GsapFadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { Target, Lightbulb, Users, Award, Code, Zap } from 'lucide-react';

export default function RolunkPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Minőség',
      description: 'Magas minőségi standardok betartása minden projektben, a koncepcióktól a megvalósításig.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innováció',
      description: 'A legújabb technológiákat és legjobb gyakorlatokat alkalmazva folyamatosan fejlődünk.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Partneri Hozzáállás',
      description: 'Az ügyfeleink sikere az mi siker. Hosszú távú partnerségeket építünk.',
    },
  ];

  const team = [
    { role: 'Vezetőség', count: '3+' },
    { role: 'Senior Fejlesztő', count: '8+' },
    { role: 'Data Scientist', count: '4+' },
    { role: 'AI Szakértő', count: '6+' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              Rólunk
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A Pohánka És Társa Kft. egy innovatív szoftverfejlesztési cég, amely a legmodernebb technológiákat és AI megoldásokat használja az ügyfeleink digitális kihívásainak megoldásához.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <GsapFadeIn>
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Akik Vagyunk
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Csapatunk a legjobb és legokosabb fejlesztőkből, AI szakértőkből és projektmenedzserekből áll, akik szenvedélyesen hisznek az innovációban és a technológia erejében.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                Több mint 15 év tapasztalattal rendelkezünk a szoftveriparban, és számos sikeres projekttel büszkélkedhetünk.
              </p>
              <p className="text-lg text-gray-300">
                Célunk, hogy olyan megoldásokat hozzunk létre, amelyek valóban megváltoztatják az üzleteket és az emberek életét.
              </p>
            </GsapFadeIn>

            <GsapFadeIn delay={0.2}>
              <SpotlightCard
                className="p-12"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg aspect-square flex items-center justify-center mb-6">
                  <span className="text-6xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Innováció Központban</h3>
                <p className="text-gray-300">
                  Élvonalbeli AI és szoftverfejlesztési technológiákat alkalmazunk az iparban.
                </p>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Értékeink</h2>
              <p className="section-subtitle">
                Az alábbi értékek vezetik napi munkánkat és döntéseinket
              </p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard
                  className="p-8 h-full"
                >
                  <div className="text-blue-400 mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Csapatunk</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard
                  className="p-6 text-center"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {member.count}
                  </div>
                  <p className="text-gray-300">{member.role}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Sikeresen Befejezett Projektek', value: '50+' },
              { label: 'Elégedett Ügyfelek', value: '40+' },
              { label: 'Év Tapasztalat', value: '15+' },
              { label: 'Csapattagok', value: '21+' },
            ].map((stat, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.2}>
                <SpotlightCard className="p-8 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-12">
              <h2 className="section-title">Technológiáink</h2>
            </div>
          </GsapFadeIn>

          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {['Next.js', 'React', 'Python', 'Cloud', 'AI/ML', 'DevOps', 'Docker', 'Kubernetes', 'AWS'].map((tech, i) => (
                  <div key={i} className="text-center py-4">
                    <span className="px-4 py-2 bg-blue-500/20 rounded-lg text-blue-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Készen áll az Együttműködésre?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Lépjen velünk kapcsolatba, és beszéljünk az Ön projektjéről.
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Lépjen Velünk Kapcsolatba
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}
