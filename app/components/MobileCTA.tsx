"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

export default function MobileCTA ()
{
    const { t, language } = useLanguage();
    const [visible, setVisible] = useState( false );

    const withLang = ( href: string ) =>
    {
        if ( language === 'hu' ) return href;
        return href.startsWith( '/' ) ? `/${ language }${ href }` : href;
    };

    useEffect( () =>
    {
        const handleScroll = () =>
        {
            // Show after scrolling past the hero (400px)
            setVisible( window.scrollY > 400 );
        };
        window.addEventListener( 'scroll', handleScroll, { passive: true } );
        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [] );

    const label = language === 'en'
        ? 'Free Consultation'
        : language === 'de'
            ? 'Kostenlose Beratung'
            : 'Ingyenes Konzultáció';

    const ctaLabel = language === 'en'
        ? 'Contact'
        : language === 'de'
            ? 'Kontakt'
            : 'Kapcsolat';

    if ( !visible ) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-between"
            role="complementary"
            aria-label={ label }
        >
            <span className="text-sm text-gray-400 font-medium">{ label }</span>
            <Link
                href={ withLang( '/kapcsolat' ) }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00e5ff] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00e5ff]/90 transition-colors"
                onClick={ () =>
                    trackCtaClick( {
                        location: CTA_LOCATIONS.HeaderContactMobile,
                        language,
                        target: '/kapcsolat',
                        page: PAGE_NAMES.Global,
                    } )
                }
            >
                { ctaLabel }
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </div>
    );
}
