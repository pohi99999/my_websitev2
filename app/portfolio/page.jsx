import VideoBackground from "../components/VideoBackground";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Portfólió oldal Videója */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765517024/4_sucbhe.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Portfólió
        </h1>
        
        {/* Itt lesznek a kártyák (HerWinner, BAS, stb.) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Minta Kártya 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
            <h3 className="text-2xl font-bold mb-2">HerWinner App</h3>
            <p className="text-gray-300">A befektetői projekt. Hamarosan...</p>
          </div>

          {/* Minta Kártya 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
            <h3 className="text-2xl font-bold mb-2">BAS System</h3>
            <p className="text-gray-300">Brunella Agent System operációs rendszer.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GsapFadeIn from '../components/GsapFadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { Search, ArrowRight, Code, Brain, Cloud, Database, Zap } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-commerce AI Személyesítési Platform',
    client: 'TechRetail Hungary',
    industry: 'E-commerce',
    technologies: ['Python', 'TensorFlow', 'React', 'Next.js', 'AWS'],
    description: 'Képi felismerésre és ML-re alapuló ajánlási motor',
    image: '🛍️',
    results: { users: '250K+', revenue: '$2.5M+', conversion: '+35%' },
  },
  {
    id: 2,
    title: 'Felhő Migrációs Projekt',
    client: 'Finance Corp',
    industry: 'Pénzügyek',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
    description: 'Teljes infrastruktúra migrálás on-premise-ből AWS-re',
    image: '☁️',
    results: { downtime: '0 perc', cost: '-40%', performance: '+60%' },
  },
  {
    id: 3,
    title: 'AI Chatbot Platform',
    client: 'Customer Support Inc',
    industry: 'Ügyfélszolgálat',
    technologies: ['Python', 'NLP', 'React', 'Node.js', 'MongoDB'],
    description: 'Multilingvális AI chatbot 24/7 támogatáshoz',
    image: '🤖',
    results: { tickets: '-60%', satisfaction: '+45%', time: '-50%' },
  },
  {
    id: 4,
    title: 'Előrejelzés Rendszer',
    client: 'Manufacturing Co',
    industry: 'Gyártás',
    technologies: ['Python', 'TensorFlow', 'Data Analysis', 'AWS', 'Grafana'],
    description: 'Prediktív karbantartási rendszer IoT szenzorokkal',
    image: '📊',
    results: { downtime: '-75%', maintenance: '-45%', saving: '$5M+' },
  },
  {
    id: 5,
    title: 'Mobilalkalmazás Fejlesztés',
    client: 'HealthTech Startup',
    industry: 'Egészségügy',
    technologies: ['React Native', 'Node.js', 'Firebase', 'Python'],
    description: 'Telemedicina platform iOS és Android-ra',
    image: '📱',
    results: { downloads: '100K+', rating: '4.8★', users: '50K+' },
  },
  {
    id: 6,
    title: 'Data Warehouse Megoldás',
    client: 'Analytics Group',
    industry: 'Adatelemzés',
    technologies: ['Data Warehouse', 'BigQuery', 'Python', 'Tableau'],
    description: 'Enterprise-szintű adattárház és BI megoldás',
    image: '📈',
    results: { data: '100GB+', query: '-80%', users: '500+' },
  },
  {
    id: 7,
    title: 'Blockchain Alkalmazás',
    client: 'FinTech Innovators',
    industry: 'Kriptovaluta',
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'Node.js'],
    description: 'Decentralizált finanszírozási platform',
    image: '⛓️',
    results: { transactions: '10M+', tvl: '$500M+', users: '75K+' },
  },
  {
    id: 8,
    title: 'Machine Learning Könyvtár',
    client: 'Tech Institute',
    industry: 'Oktatás',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'GitHub'],
    description: 'Open-source ML library 10K+ felhasználóval',
    image: '📚',
    results: { downloads: '2M+', stars: '5K+', contributors: '200+' },
  },
  {
    id: 9,
    title: 'Real-time Analitikai Dashboard',
    client: 'Marketing Agency',
    industry: 'Marketing',
    technologies: ['React', 'Next.js', 'Socket.io', 'MongoDB', 'Python'],
    description: 'Valós idejű marketing metrikák és riportok',
    image: '📊',
    results: { campaigns: '500+', roi: '+120%', clients: '100+' },
  },
];

const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies)));
const allIndustries = Array.from(new Set(projects.map(p => p.industry)));

export default function PortfolioPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('Összes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchIndustry = selectedIndustry === 'Összes' || project.industry === selectedIndustry;
    const matchSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchIndustry && matchSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero */}
      <section className="relative py-24 px-6 pt-32 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 gradient-text">
              Portfólió
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              50+ teljesített projekt, 100+ elégedett ügyfél, 15 év tapasztalat. Tekintse meg, milyen megoldásokat építettünk az Ön iparághoz.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Keresés projekt, ügyfél vagy technológia szerint..."
                  className="form-input pl-12 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Industry Filter */}
              <div>
                <select
                  className="form-input w-full"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option>Összes Iparág</option>
                  {allIndustries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-400 mb-8">
              {filteredProjects.length} projekt találva
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                              <GsapFadeIn key={project.id} delay={0.1 + idx * 0.05}>
                                <SpotlightCard
                                  className="p-8 flex flex-col h-full"
                                >
                                  <div className="text-6xl mb-4">{project.image}</div>
                
                                  <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                                      {project.industry}
                                    </span>
                                  </div>
                
                                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                                    {project.description}
                                  </p>
                                  <p className="text-gray-500 text-sm mb-4">
                                    Ügyfél: <span className="text-gray-300">{project.client}</span>
                                  </p>
                
                                  <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-gray-300"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                      <span className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-gray-300">
                                        +{project.technologies.length - 3}
                                      </span>
                                    )}
                                  </div>
                
                                  <Link
                                    href={`/portfolio/${project.id}`}
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
                                  >
                                    Részletek <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </SpotlightCard>
                              </GsapFadeIn>              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">
                  Nincs projekt a kiválasztott szűrők alapján.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Által Elvégzett Munka</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Teljesített Projekt' },
              { value: '100+', label: 'Elégedett Ügyfél' },
              { value: '15+', label: 'Év Tapasztalat' },
              { value: '25+', label: 'Technológia' },
            ].map((stat, idx) => (
              <GsapFadeIn key={idx} delay={0.3 + idx * 0.1}>
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

      {/* Technologies Used */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Technológiai Stack</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Az ipar legmodernebb technológiáit használjuk minden projektben.
              </p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {allTechnologies.slice(0, 15).map((tech, idx) => (
              <GsapFadeIn key={tech} delay={0.4 + idx * 0.05}>
                <SpotlightCard
                  className="p-6 text-center"
                >
                  <p className="font-semibold text-gray-200">{tech}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Szeretne Hasonló Projektben Dolgozni?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Keresse meg csapatunkat az Ön ötletéről vagy projektjéről. Szívesen segítünk az Ön üzletét növekedésre segíteni.
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
