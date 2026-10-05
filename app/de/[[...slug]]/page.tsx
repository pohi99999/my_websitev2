import React from 'react';
import type { Metadata } from 'next';
import { localizedMetadata } from '../../lib/localizedRouteMeta';
import { notFound, redirect } from 'next/navigation';

import HomePage from '../../page';
import TermekekPage from '../../termekek/page';
import KapcsolatPage from '../../kapcsolat/page';
import SzolgaltatasokPage from '../../szolgaltatasok/page';
import PortfolioPage from '../../portfolio/page';
import PortfolioDetailPage from '../../portfolio/[id]/page';
import BlogPage from '../../blog/page';
import BlogPostPage from '../../blog/[slug]/page';
import RolunkPage from '../../rolunk/page';
import FogalomtarPage from '../../fogalomtar/page';
import AdatvedelemPage from '../../adatvedelmi-nyilatkozat/page';
import ImpresszumPage from '../../impresszum/page';
import AszfPage from '../../aszf/page';
import PohiAiProPage from '../../termekek/pohi-ai-pro/page';
import WeboldalAiKkvPage from '../../weboldal-ai-kkv/page';
import HatekonysagiAuditPage from '../../hatekonysagi-audit/page';
import BrunellaBasPage from '../../portfolio/brunella-bas/page';
import PortfolioPohiAiProPage from '../../portfolio/pohi-ai-pro/page';
import TartalomGyartasPage from '../../portfolio/tartalom-gyartas/page';
import WebRobotpilotaPage from '../../portfolio/web-robotpilota/page';
import PalyazatRadarPage from '../../portfolio/palyazat-radar/page';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.pohankaestarsa.com';

type MetaSpec = {
    title: string;
    description: string;
    ogType?: 'website' | 'article';
};

function toPath(slug: string[]) {
    return slug.length ? `/${slug.join('/')}` : '/';
}

function deMetaForSlug(slug: string[]): MetaSpec | null {
    if (slug.length === 0) {
        return {
            title: 'Webseiten, KI-Automatisierung und Agentensysteme',
            description:
                'Webseiten, KI-Automatisierung und KI-Agentensysteme für Unternehmen: wir entwickeln und führen sie ein. Pohánka és Társa, Zalaegerszeg, Ungarn.',
            ogType: 'website',
        };
    }

    if (slug.length === 1) {
        switch (slug[0]) {
            case 'termekek':
                return {
                    title: 'Produkte',
                    description:
                        'Brunella Agent System (BAS), Pohi AI Pro und weitere KI-Lösungen — Produkte und Plattformen für KMU.',
                    ogType: 'website',
                };
            case 'szolgaltatasok':
                return {
                    title: 'Dienstleistungen',
                    description:
                        'KI-Automatisierung, individuelle Softwareentwicklung und Beratung — mit Fokus auf Sicherheit und messbaren ROI.',
                    ogType: 'website',
                };
            case 'portfolio':
                return {
                    title: 'Portfolio',
                    description:
                        'Ausgewählte Projekte und Fallstudien — praxisnahe KI- und Softwarelösungen für echte Geschäftsergebnisse.',
                    ogType: 'website',
                };
            case 'blog':
                return {
                    title: 'Blog',
                    description:
                        'Artikel über KI, Automatisierung und den Aufbau zuverlässiger agentischer Systeme — mit Praxisbeispielen und technischer Perspektive.',
                    ogType: 'website',
                };
            case 'rolunk':
                return {
                    title: 'Über uns',
                    description:
                        'Lernen Sie Pohánka & Társa kennen — unseren Ansatz für KI, Automatisierung und robuste Softwaresysteme.',
                    ogType: 'website',
                };
            case 'kapcsolat':
                return {
                    title: 'Kontakt',
                    description:
                        'Erzählen Sie uns von Ihren Abläufen und Zielen — wir schlagen einen konkreten KI-Automatisierungsplan mit schneller ROI vor.',
                    ogType: 'website',
                };
            case 'fogalomtar':
                return {
                    title: 'Glossar',
                    description:
                        'Ein praktisches Glossar zu KI- und Softwarebegriffen — klar für Business und Engineering erklärt.',
                    ogType: 'website',
                };
            case 'adatvedelmi-nyilatkozat':
                return {
                    title: 'Datenschutzerklärung',
                    description: 'Datenschutzerklärung und Informationen zur Datenverarbeitung.',
                    ogType: 'website',
                };
            case 'impresszum':
                return {
                    title: 'Impressum',
                    description: 'Unternehmensinformationen und rechtlicher Hinweis.',
                    ogType: 'website',
                };
            case 'aszf':
                return {
                    title: 'AGB',
                    description: 'Allgemeine Geschäftsbedingungen.',
                    ogType: 'website',
                };
            case 'weboldal-ai-kkv':
                return {
                    title: 'Website + KI für KMU',
                    description:
                        'Moderne, leadgenerierende Websites kombiniert mit KI-gestützter Automatisierung für ungarische KMU.',
                    ogType: 'website',
                };
            case 'hatekonysagi-audit':
                return {
                    title: 'Digitaler Effizienz-Audit',
                    description:
                        'Finden Sie in 3 Minuten heraus, wo Ihr Unternehmen monatlich 100+ Arbeitsstunden durch manuelle Prozesse verliert — und wie KI das stoppen kann.',
                    ogType: 'website',
                };
            default:
                return null;
        }
    }

    if (slug[0] === 'termekek' && slug.length === 2) {
        if (slug[1] === 'brunella-agents') {
            return {
                title: 'Brunella Agent System',
                description:
                    'Ein praxisnahes agentisches System für Geschäftsautomatisierung — orchestrierte Workflows, Tool-Nutzung und sichere Bereitstellung.',
                ogType: 'website',
            };
        }
        if (slug[1] === 'pohi-ai-pro') {
            return {
                title: 'Pohi AI Pro',
                description:
                    'Ein individuell entwickeltes Portalsystem, das Kundendaten und Lagerdaten integriert — für Automatisierung und operative Klarheit.',
                ogType: 'website',
            };
        }
    }

    if (slug[0] === 'blog' && slug.length === 2) {
        return {
            title: 'Blogbeitrag',
            description: 'Einblicke zu KI, Automatisierung und dem Aufbau zuverlässiger Systeme.',
            ogType: 'article',
        };
    }

    if (slug[0] === 'portfolio' && slug.length === 2) {
        return {
            title: 'Portfolio-Projekt',
            description: 'Projektinformationen und Ergebnisse.',
            ogType: 'website',
        };
    }

    return null;
}

async function fallbackMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug ?? [];
    const spec = deMetaForSlug(slug);

    const huPath = toPath(slug);
    const enPath = `/en${huPath === '/' ? '' : huPath}`;
    const dePath = `/de${huPath === '/' ? '' : huPath}`;

    if (!spec) {
        return {
            title: 'Nicht gefunden',
            robots: { index: false, follow: false },
            alternates: {
                canonical: huPath,
                languages: {
                    hu: huPath,
                    en: enPath,
                    de: dePath,
                },
            },
        };
    }

    return {
        metadataBase: new URL(SITE_URL),
        title: spec.title,
        description: spec.description,
        alternates: {
            canonical: dePath,
            languages: {
                hu: huPath,
                en: enPath,
                de: dePath,
                'x-default': huPath,
            },
        },
        openGraph: {
            title: spec.title,
            description: spec.description,
            type: spec.ogType ?? 'website',
            locale: 'de_DE',
            url: dePath,
        },
        twitter: {
            card: 'summary_large_image',
            title: spec.title,
            description: spec.description,
        },
    };
}

type Params = {
    slug?: string[];
};

export default async function DeCatchAllPage({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug ?? [];

    if (slug.length === 0) return <HomePage />;

    if (slug.length === 1) {
        switch (slug[0]) {
            case 'termekek':
                return <TermekekPage />;
            case 'kapcsolat':
                return <KapcsolatPage />;
            case 'szolgaltatasok':
                return <SzolgaltatasokPage />;
            case 'portfolio':
                return <PortfolioPage />;
            case 'blog':
                return <BlogPage />;
            case 'rolunk':
                return <RolunkPage />;
            case 'fogalomtar':
                return <FogalomtarPage />;
            case 'adatvedelmi-nyilatkozat':
                return <AdatvedelemPage />;
            case 'impresszum':
                return <ImpresszumPage />;
            case 'aszf':
                return <AszfPage />;
            case 'weboldal-ai-kkv':
                return <WeboldalAiKkvPage />;
            case 'hatekonysagi-audit':
                return <HatekonysagiAuditPage />;
            default:
                return notFound();
        }
    }

    if (slug[0] === 'termekek' && slug.length === 2) {
        if (slug[1] === 'brunella-agents') return redirect('/de/portfolio/brunella-bas');
        if (slug[1] === 'pohi-ai-pro') return <PohiAiProPage />;
    }

    if (slug[0] === 'blog' && slug.length === 2) {
        return <BlogPostPage params={{ slug: slug[1] }} />;
    }

    if (slug[0] === 'portfolio' && slug.length === 2) {
        switch (slug[1]) {
            case 'brunella-bas':
                return <BrunellaBasPage />;
            case 'pohi-ai-pro':
                return <PortfolioPohiAiProPage />;
            case 'tartalom-gyartas':
                return <TartalomGyartasPage />;
            case 'web-robotpilota':
                return <WebRobotpilotaPage />;
            case 'palyazat-radar':
                return <PalyazatRadarPage />;
            default:
                return <PortfolioDetailPage params={{ id: slug[1] }} />;
        }
    }

    return notFound();
}

// The target page's own localized metadata (title, description, canonical, hreflang); the map
// above is only the fallback for pages without it and for unknown URLs (noindex).
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const fallback = await fallbackMetadata({ params });
  const slug = (await params).slug ?? [];
  if (!deMetaForSlug(slug)) return fallback;
  return localizedMetadata(slug, 'de', fallback);
}
