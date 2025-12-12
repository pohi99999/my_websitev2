"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NeonText from "./components/NeonText";
import HeroParticles from "./components/HeroParticles";
import { ChevronDown, Zap, Brain, Code, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroSectionRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroParagraphRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroChevronRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const serviceCardsRef = useRef([]);

  useEffect(() => {
    // Hero Section Animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Removed SplitText to fix production error
    heroTl.from(heroTitleRef.current.querySelector("h1"), {
      opacity: 0,
      y: 50,
      ease: "back.out",
      duration: 1,
    });

    heroTl.fromTo(
      heroSubtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    heroTl.fromTo(
      heroParagraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
    heroTl.fromTo(
      heroButtonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
    heroTl.fromTo(
      heroChevronRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Services Section Animations
    gsap.fromTo(
      servicesSectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 80%", // Amikor a szekció 80%-a látható
          end: "top 20%",
          scrub: true,
        },
      }
    );

    serviceCardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Amikor a kártya 90%-a látható
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative">
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center justify-center px-6 z-10 overflow-hidden"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 z-0">
          <HeroParticles />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div ref={heroTitleRef}>
            <NeonText size="2xl" color="electric-blue" glow className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Pohánka és Társa,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  a Jövő elkezdődött!
                </span>
              </h1>
            </NeonText>
          </div>

          <div ref={heroSubtitleRef}>
            <NeonText size="lg" color="vibrant-purple" className="mb-8">
              <h2 className="text-xl md:text-2xl font-light tracking-wide">
                INNOVÁCIÓ • MESTERSÉGES INTELLIGENCIA • MEGBÍZHATÓSÁG
              </h2>
            </NeonText>
          </div>

          <p
            ref={heroParagraphRef}
            className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto"
          >
            Építjük a holnapot, ma. Csatlakozzon hozzánk a digitális
            forradalomban.
          </p>

          <div
            ref={heroButtonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/szolgaltatasok" className="group">
              <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
                <span className="relative z-10 text-white font-semibold flex items-center gap-2">
                  Szolgáltatásaink{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href="/kapcsolat" className="group">
              <div className="px-8 py-4 border-2 border-blue-500 rounded-lg hover:bg-blue-500/10 transition-all duration-300">
                <span className="text-blue-400 font-semibold">
                  Lépjen Kapcsolatba
                </span>
              </div>
            </Link>
          </div>

          <div ref={heroChevronRef} className="mt-16">
            <ChevronDown className="w-8 h-8 mx-auto text-blue-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section
        id="services-section"
        ref={servicesSectionRef}
        className="py-24 px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <NeonText size="xl" color="electric-blue" glow className="mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                SZOLGÁLTATÁSAINK
              </h2>
            </NeonText>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Komplex megoldások a digitális transzformációhoz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-12 h-12" />,
                title: "Egyedi Szoftverfejlesztés",
                description:
                  "Testreszabott alkalmazások, amelyek tökéletesen illeszkednek az üzleti folyamataihoz.",
              },
              {
                icon: <Brain className="w-12 h-12" />,
                title: "AI & Adattudomány",
                description:
                  "Adatvezérelt döntéshozatal és intelligens automatizáció gépi tanulási modellekkel.",
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Felhő Infrastruktúra",
                description:
                  "Skálázható, biztonságos és költséghatékony felhő architektúrák tervezése és üzemeltetése.",
              },
            ].map((service, index) => (
              <div
                key={index}
                ref={(el) => (serviceCardsRef.current[index] = el)}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-blue-400 mb-4 group-hover:text-purple-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
