"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqData = {
    hu: [
        {
            q: 'Mi az a Brunella Agent System?',
            a: 'A Brunella Agent System egy AI multi-ügynök rendszer, amely 95+ specializált ügynökkel automatizálja az üzleti folyamatokat — lead generálástól a könyvelésen át a piackutatásig. Az ügynökök 24/7 dolgoznak, emberi felügyelet nélkül.',
        },
        {
            q: 'Mennyi idő alatt látok eredményt?',
            a: 'A legtöbb ügyfelünknél 2-4 héten belül már működik az első automatizáció. A teljes ROI általában 3 hónapon belül megmutatkozik, átlagosan 80%-os időmegtakarítással.',
        },
        {
            q: 'Kell hozzá programozási tudás?',
            a: 'Nem. A rendszert úgy terveztük, hogy nem-technikai felhasználók is kényelmesen használhassák. A beállítást és a testreszabást mi végezzük, az üzemeltetés pedig teljesen automatikus.',
        },
        {
            q: 'Hogyan kezeli az adataimat a rendszer?',
            a: 'Az adataid az EU-ban maradnak, GDPR-kompatibilis infrastruktúrán. Lehetőség van helyi (on-premise) telepítésre is, így az adatok soha nem hagyják el a céges hálózatot.',
        },
        {
            q: 'Milyen vállalkozásoknak ajánlott?',
            a: 'Elsősorban KKV-knak, amelyek havi 20+ órát töltenek ismétlődő feladatokkal: lead keresés, email kezelés, könyvelési előkészítés, riportkészítés, piackutatás.',
        },
        {
            q: 'Mi történik, ha elakad az AI?',
            a: 'A Brunella Phoenix Protocol automatikus öngyógyító mechanizmussal rendelkezik: ha egy ügynök hibába fut, a rendszer automatikusan újrapróbálja a feladatot, naplózza a hibát és szükség esetén értesíti a csapatot.',
        },
    ],
    en: [
        {
            q: 'What is the Brunella Agent System?',
            a: 'The Brunella Agent System is an AI multi-agent platform with 95+ specialized agents that automate business processes — from lead generation through accounting to market research. Agents work 24/7 without human supervision.',
        },
        {
            q: 'How quickly will I see results?',
            a: 'Most clients have their first automation running within 2-4 weeks. Full ROI typically shows within 3 months, with an average 80% time savings.',
        },
        {
            q: 'Do I need programming skills?',
            a: 'No. The system is designed for non-technical users. We handle setup and customization, and operation is fully automatic.',
        },
        {
            q: 'How does the system handle my data?',
            a: 'Your data stays in the EU on GDPR-compliant infrastructure. On-premise deployment is also available, keeping data entirely within your network.',
        },
        {
            q: 'Which businesses is this for?',
            a: 'Primarily SMEs spending 20+ hours per month on repetitive tasks: lead search, email management, accounting prep, reporting, market research.',
        },
        {
            q: 'What happens if the AI gets stuck?',
            a: 'The Brunella Phoenix Protocol includes automatic self-healing: if an agent encounters an error, the system retries automatically, logs the issue, and notifies the team if needed.',
        },
    ],
    de: [
        {
            q: 'Was ist das Brunella Agent System?',
            a: 'Das Brunella Agent System ist eine KI-Multi-Agenten-Plattform mit über 95 spezialisierten Agenten, die Geschäftsprozesse automatisieren — von Lead-Generierung über Buchhaltung bis zur Marktforschung. Agenten arbeiten 24/7 ohne menschliche Aufsicht.',
        },
        {
            q: 'Wie schnell sehe ich Ergebnisse?',
            a: 'Bei den meisten Kunden läuft die erste Automatisierung innerhalb von 2-4 Wochen. Der volle ROI zeigt sich typischerweise innerhalb von 3 Monaten, mit durchschnittlich 80% Zeitersparnis.',
        },
        {
            q: 'Brauche ich Programmierkenntnisse?',
            a: 'Nein. Das System ist für nicht-technische Benutzer konzipiert. Wir übernehmen Einrichtung und Anpassung, der Betrieb läuft vollautomatisch.',
        },
        {
            q: 'Wie werden meine Daten behandelt?',
            a: 'Ihre Daten bleiben in der EU auf DSGVO-konformer Infrastruktur. On-Premise-Bereitstellung ist ebenfalls verfügbar.',
        },
        {
            q: 'Für welche Unternehmen ist das geeignet?',
            a: 'Hauptsächlich für KMU, die 20+ Stunden pro Monat für repetitive Aufgaben aufwenden: Lead-Suche, E-Mail-Verwaltung, Buchhaltungsvorbereitung, Berichterstellung.',
        },
        {
            q: 'Was passiert, wenn die KI stecken bleibt?',
            a: 'Das Brunella Phoenix Protocol beinhaltet automatische Selbstheilung: Bei Fehlern versucht das System automatisch erneut, protokolliert das Problem und benachrichtigt das Team bei Bedarf.',
        },
    ],
};

const sectionTitles = {
    hu: { heading: 'Gyakran Ismételt Kérdések', sub: 'Ami a legtöbb ügyfelünket érdekli az AI automatizálásról.' },
    en: { heading: 'Frequently Asked Questions', sub: 'What most of our clients want to know about AI automation.' },
    de: { heading: 'Häufig Gestellte Fragen', sub: 'Was die meisten unserer Kunden über KI-Automatisierung wissen möchten.' },
};

function FAQItem ( { question, answer }: { question: string; answer: string } )
{
    const [open, setOpen] = useState( false );

    return (
        <div className="border-b border-white/5 last:border-b-0">
            <button
                onClick={ () => setOpen( !open ) }
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={ open }
            >
                <span className="text-white font-medium pr-4 group-hover:text-[#00e5ff] transition-colors duration-200">
                    { question }
                </span>
                <ChevronDown
                    className={ `w-5 h-5 text-[#00e5ff]/60 shrink-0 transition-transform duration-300 ${ open ? 'rotate-180' : ''
                        }` }
                    aria-hidden="true"
                />
            </button>
            <div
                className={ `overflow-hidden transition-all duration-300 ${ open ? 'max-h-96 pb-5' : 'max-h-0'
                    }` }
            >
                <p className="text-gray-400 leading-relaxed text-sm">{ answer }</p>
            </div>
        </div>
    );
}

export default function HomepageFAQ ()
{
    const { language } = useLanguage();
    const lang = ( language as 'hu' | 'en' | 'de' ) in faqData ? ( language as 'hu' | 'en' | 'de' ) : 'hu';
    const items = faqData[lang];
    const { heading, sub } = sectionTitles[lang];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map( ( item ) => ( {
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        } ) ),
    };

    return (
        <section id="faq" className="py-24 px-6 bg-black">
            {/* FAQPage structured data for SEO */ }
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ { __html: JSON.stringify( faqSchema ) } }
            />

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-syne">
                        { heading }
                    </h2>
                    <p className="text-gray-400">{ sub }</p>
                </div>

                <div className="bg-[#060608] border border-white/5 p-6 md:p-8">
                    { items.map( ( item, idx ) => (
                        <FAQItem key={ idx } question={ item.q } answer={ item.a } />
                    ) ) }
                </div>
            </div>
        </section>
    );
}
