'use client';

import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, CheckCircle, BarChart3, Users, ArrowRight, Star } from 'lucide-react';

const projects = {
  1: {
    title: 'E-commerce AI Személyesítési Platform',
    client: 'TechRetail Hungary',
    industry: 'E-commerce',
    image: '🛍️',
    date: '2024. március - május',
    description: 'Képi felismerésre és gépi tanulásra alapuló ajánlási motor, amely az e-kereskedelmi platform konverziós rátáját 35%-kal növelte.',
    challenge: `
      Az ügyfelünk kihívása az volt, hogy a nagy termékkatalógusban az ügyfelek nem találták meg az ideális termékeket. Az átlagos konverziós ráta csak 2% volt, és a kosár elhagyási ráta 70%. Az ügyfél egy olyan rendszerre volt szüksége, amely személyre szabott ajánlásokat tud adni valós időben.
    `,
    solution: `
      Egy AI-alapú személyesítési platformot hoztunk létre, amely:
      
      1. **Képi Felismerés**: Összetett CNNs hálózattal a termékképek alapján hasonló termékeket talál.
      
      2. **Felhasználói Viselkedés Analitika**: Machine learning modellek, amelyek az ügyfél viselkedésén alapulnak megjósolják az ideális ajánlásokat.
      
      3. **Real-time Personalizáció**: A Next.js és React-alapú felületen a felhasználó minden kattintása után frissülő ajánlások.
      
      4. **A/B Tesztelés**: Integrált tesztelési rendszer az ajánlások optimalizálásához.
    `,
    results: [
      { metric: 'Konverziós Ráta', improvement: '+35%', value: '2% → 2.7%' },
      { metric: 'Kosár Érték', improvement: '+28%', value: 'Átlag $45 → $58' },
      { metric: 'Kosár Elhagyás', improvement: '-18%', value: '70% → 57%' },
      { metric: 'Ügyfélelégedettség', improvement: '+42%', value: '3.2★ → 4.5★' },
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'React', 'Next.js', 'Node.js', 'AWS', 'PostgreSQL', 'Redis'],
    testimonial: {
      text: 'A Pohánka csapat lenyűgöző work ethic-et mutatott. Az AI rendszer implementálása felülmúlta az elvárásainkat. Az eredmények azonnal látszódtak az első hétben.',
      author: 'Viktor Sándor',
      role: 'CTO, TechRetail Hungary',
      avatar: '👨‍💼',
    },
    relatedProjects: [
      { id: 3, title: 'AI Chatbot Platform' },
      { id: 9, title: 'Real-time Analytics Dashboard' },
    ],
  },
  2: {
    title: 'Felhő Migrációs Projekt',
    client: 'Finance Corp',
    industry: 'Pénzügyek',
    image: '☁️',
    date: '2024. január - február',
    description: 'Teljes infrastruktúra migrálás on-premise szervereikről az AWS-re, nulla downtime-mel és 40% költségmegtakarítással.',
    challenge: `
      Finance Corp egy legacy infrastruktúrán futó pénzügyi szoftvereket használt, amelyek nem voltak skálázhatók és magas karbantartási költségeket okoztak. Az on-premise szerverek napi 12 óra downtime-ot okoztak az adatközpont-kezelési munkák során.
    `,
    solution: `
      Egy felhő-alapú infrastruktúrát hoztunk létre:
      
      1. **AWS Architecture**: Multi-AZ deployment, RDS PostgreSQL, ElastiCache, Application Load Balancer.
      
      2. **Containerization**: Docker containerek a teljes alkalmazás stackhez, Kubernetes az orchestration-hoz.
      
      3. **Zero-Downtime Migration**: Kétfázisú migrálás, ahol az alkalmazások párhuzamosan futottak az átmenet alatt.
      
      4. **Monitoring & Automation**: CloudWatch, Lambda functions az automatikus scaling-hoz, Infrastructure as Code (Terraform).
    `,
    results: [
      { metric: 'Költségmegtakarítás', improvement: '-40%', value: '$200K → $120K/év' },
      { metric: 'Uptime', improvement: '+99.99%', value: '98% → 99.99%' },
      { metric: 'Performance', improvement: '+60%', value: 'Load time redukálva' },
      { metric: 'Deployment Idő', improvement: '-70%', value: '2 óra → 18 perc' },
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Redis', 'CloudWatch', 'S3', 'VPC'],
    testimonial: {
      text: 'A migráció teljesen zökkenőmentes volt. Nem volt egyetlen másodperc sem downtime sem, és az infrastruktúra költségek azonnal csökkentek. Ajánlom a Pohánka csapatot minden vállalat számára, aki a felhőbe szeretne költözni.',
      author: 'Dr. Kovácsné Magyaráti Erzsébet',
      role: 'CIO, Finance Corp',
      avatar: '👩‍💼',
    },
    relatedProjects: [
      { id: 6, title: 'Data Warehouse Megoldás' },
      { id: 9, title: 'Real-time Analytics Dashboard' },
    ],
  },
  3: {
    title: 'AI Chatbot Platform',
    client: 'Customer Support Inc',
    industry: 'Ügyfélszolgálat',
    image: '🤖',
    date: '2024. június - szeptember',
    description: 'Multilingvális AI chatbot 24/7 támogatáshoz, amely 60% csökkentést eredményezett az ügyfélszolgálati költségekben.',
    challenge: `
      Customer Support Inc-nek több millió ügyfele van világszerte. Az ügyfélszolgálati csapat 24/7-ben kellett volna elérhető, de a költségek túl magasak voltak. Az ügyfelek 2-3 napos válaszidőre vártak.
    `,
    solution: `
      Egy AI chatbot platformot fejlesztettünk:
      
      1. **NLP Model**: BERT-alapú modell, amely természetes nyelvűi megérti az ügyfélkérdéseket.
      
      2. **Multi-language Support**: 15 nyelvű támogatás a transzlációs API-kkal.
      
      3. **Human Handoff**: Intelligens rendszer, amely összetett kérdéseket átadja az emberi csapatnak.
      
      4. **Learning System**: A chatbot tanul az egyes interakciókból, és folyamatosan javul.
    `,
    results: [
      { metric: 'Ügyfélszolgálati Költség', improvement: '-60%', value: '$500K → $200K/év' },
      { metric: 'Válaszidő', improvement: '-90%', value: '2-3 nap → 2 perc' },
      { metric: 'Ügyfél Elégedettség', improvement: '+45%', value: '3.1★ → 4.5★' },
      { metric: 'Kezelési Mérték', improvement: '+87%', value: 'Az esetek 87%-a megoldva' },
    ],
    technologies: ['Python', 'NLP', 'BERT', 'React', 'Node.js', 'MongoDB', 'Socket.io', 'TensorFlow'],
    testimonial: {
      text: 'A chatbot platform forradalmasította az ügyfélszolgálatunkat. Az ügyfelek már nem kell heteket várniuk a válaszra. Azt is jó, hogy az AI tanul az minden nap.',
      author: 'Szabó Zsolt',
      role: 'ügyfélszolgálat Igazgató, Customer Support Inc',
      avatar: '👨‍💼',
    },
    relatedProjects: [
      { id: 1, title: 'E-commerce AI Platform' },
      { id: 5, title: 'Mobilalkalmazás Fejlesztés' },
    ],
  },
};

export default function ProjectDetailPage({ params }) {
  const project = projects[params.id];

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-dark-light to-dark text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">404 - Projekt Nem Található</h1>
          <p className="text-gray-300 mb-8">Sajnos nem találjuk ezt a projektet.</p>
          <Link href="/portfolio" className="btn-primary inline-block">
            Vissza a Portfólióhoz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero */}
      <section className="relative py-12 px-6 pt-24">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Vissza a Portfólióhoz
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <div className="text-7xl">{project.image}</div>
              <div>
                <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 inline-block mb-4">
                  {project.industry}
                </span>
                <h1 className="text-5xl font-bold gradient-text mb-3">{project.title}</h1>
                <p className="text-gray-400">
                  Ügyfél: <span className="text-gray-200 font-semibold">{project.client}</span> | {project.date}
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenge */}
            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-8">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Kihívás</h2>
                <div
                  className="text-gray-300 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: project.challenge
                      .split('\n')
                      .filter(line => line.trim())
                      .join('</p><p>'),
                  }}
                />
              </SpotlightCard>
            </GsapFadeIn>

            {/* Solution */}
            <GsapFadeIn delay={0.3}>
              <SpotlightCard className="p-8">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Megoldás</h2>
                <div
                  className="text-gray-300 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: project.solution
                      .split('\n')
                      .filter(line => line.trim())
                      .map(line => {
                        if (line.match(/^\d+\./)) {
                          const parts = line.split('**');
                          if (parts.length > 1) {
                            return `<p><strong class="text-blue-300">${parts[1]}:</strong> ${parts[2]}</p>`;
                          }
                        }
                        return `<p>${line}</p>`;
                      })
                      .join(''),
                  }}
                />
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Eredmények</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Az implementáció után elért kézzelfogható eredmények
              </p>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result, idx) => (
              <GsapFadeIn key={idx} delay={0.4 + idx * 0.1}>
                <SpotlightCard className="p-8 text-center">
                  <div className="inline-block mb-4 p-3 bg-blue-500/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-300" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{result.metric}</p>
                  <p className="text-3xl font-bold gradient-text mb-2">{result.improvement}</p>
                  <p className="text-sm text-gray-500">{result.value}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.6}>
            <SpotlightCard className="p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-xl text-gray-200 mb-8 text-center italic">
                "{project.testimonial.text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">{project.testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-white">{project.testimonial.author}</p>
                  <p className="text-gray-400">{project.testimonial.role}</p>
                </div>
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-12 gradient-text">Alkalmazott Technológiák</h2>
          </GsapFadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {project.technologies.map((tech, idx) => (
              <GsapFadeIn key={tech} delay={0.7 + idx * 0.05}>
                <SpotlightCard className="p-6 text-center">
                  <p className="font-semibold text-blue-300">{tech}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-12 gradient-text">Hasonló Projektek</h2>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.relatedProjects.map((relatedProject, idx) => (
              <GsapFadeIn key={relatedProject.id} delay={0.8 + idx * 0.1}>
                <SpotlightCard className="p-8">
                  <h3 className="text-xl font-bold mb-4">{relatedProject.title}</h3>
                  <Link
                    href={`/portfolio/${relatedProject.id}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    Megtekintés <ArrowRight className="w-4 h-4" />
                  </Link>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.9}>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Szeretne Hasonló Projektben Dolgozni?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Keresse meg csapatunkat az Ön ötletéről. Szívesen segítünk!
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Felvesz Kapcsolatot
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}