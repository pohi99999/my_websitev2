'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, BrainCircuit, ClipboardList, PlugZap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function HowItWorks ()
{
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>( null );
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState( false );

  useEffect( () =>
  {
    if ( prefersReducedMotion )
    {
      setIsVisible( true );
      return;
    }

    const node = sectionRef.current;
    if ( !node ) return;

    const observer = new IntersectionObserver(
      ( entries ) =>
      {
        if ( !entries[0]?.isIntersecting ) return;
        setIsVisible( true );
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe( node );

    return () => observer.disconnect();
  }, [prefersReducedMotion] );

  const content = useMemo( () =>
  {
    if ( language === 'en' )
    {
      return {
        badge: 'How it works',
        title: 'From discovery to always-on AI systems in four clear steps',
        subtitle:
          'A simple process: assessment, plan, rollout, handover.',
        steps: [
          {
            icon: ClipboardList,
            title: '1. Discovery',
            description:
              'We map where most of the time goes and which workflow is worth starting with.',
          },
          {
            icon: BrainCircuit,
            title: '2. AI System Design',
            description:
              'We configure the right AI components, prompts and business rules for your exact process.',
          },
          {
            icon: PlugZap,
            title: '3. Integration',
            description:
              'Your tools, inboxes and documents get connected safely so the automation can operate end-to-end.',
          },
          {
            icon: Activity,
            title: '4. Handover and operation',
            description:
              'We hand over the system, show you how to use it, and check that it works as agreed.',
          },
        ],
      };
    }

    if ( language === 'de' )
    {
      return {
        badge: 'So funktioniert es',
        title: 'Von der Bedarfsklärung zu laufenden KI-Systemen in vier klaren Schritten',
        subtitle:
          'Ein einfacher Ablauf: Erstgespräch, Plan, Einführung, Übergabe.',
        steps: [
          {
            icon: ClipboardList,
            title: '1. Bedarfsklärung',
            description:
              'Wir ermitteln, wo die meiste Zeit verloren geht und mit welchem Ablauf sich der Start lohnt.',
          },
          {
            icon: BrainCircuit,
            title: '2. KI-Systemdesign',
            description:
              'Wir konfigurieren die passenden KI-Komponenten, Regeln und Prompts für Ihren Prozess.',
          },
          {
            icon: PlugZap,
            title: '3. Integration',
            description:
              'Ihre Tools, Postfächer und Dokumente werden sicher verbunden, damit die Automatisierung durchgängig läuft.',
          },
          {
            icon: Activity,
            title: '4. Übergabe und Betrieb',
            description:
              'Wir übergeben das System, zeigen Ihnen die Bedienung und prüfen, ob es wie vereinbart läuft.',
          },
        ],
      };
    }

    return {
      badge: 'Hogyan működik',
      title: 'Négy lépésben jutunk el az igényfelméréstől a futó AI rendszerekig',
      subtitle:
        'Egyszerű folyamat: felmérés, terv, bevezetés, átadás.',
      steps: [
        {
          icon: ClipboardList,
          title: '1. Igényfelmérés',
          description:
            'Feltérképezzük, hol megy el a legtöbb idő, és melyik folyamattal érdemes kezdeni.',
        },
        {
          icon: BrainCircuit,
          title: '2. AI rendszertervezés',
          description:
            'Az AI komponenseket, promptokat és szabályokat a vállalkozása valós működéséhez hangoljuk.',
        },
        {
          icon: PlugZap,
          title: '3. Integráció',
          description:
            'Összekötjük az e-mailjeit, dokumentumait és rendszereit, hogy az automatizálás végig tudja vinni a munkát.',
        },
        {
          icon: Activity,
          title: '4. Átadás és működés',
          description:
            'Átadjuk a rendszert, megmutatjuk a használatát, és figyeljük, hogy úgy működik-e, ahogy megbeszéltük.',
        },
      ],
    };
  }, [language] );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-0 px-6 py-24"
      style={{ background: 'rgba(0,0,0,0.82)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-10 top-12 h-36 w-36 rounded-full bg-[#00e5ff]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="hud-badge mb-5 text-xs font-mono">{content.badge}</div>
          <h2 className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl">{content.title}</h2>
          <p className="text-lg leading-relaxed text-gray-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.steps.map( ( step, index ) =>
          {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className={`surface-panel-elevated min-h-[240px] p-7 ${ prefersReducedMotion ? '' : 'transition-all duration-700'
                  } ${ isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${ index * 140 }ms` }}
              >
                <div className="mb-5 inline-flex rounded-2xl border border-[#00e5ff]/20 bg-[#00e5ff]/10 p-3 text-[#00e5ff]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-7 text-gray-400">{step.description}</p>
              </article>
            );
          } )}
        </div>
      </div>
    </section>
  );
}
