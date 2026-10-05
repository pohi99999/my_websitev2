"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, MessageSquare, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';
import { CHAT_STATE_EVENT, CHAT_TOGGLE_EVENT } from './BrunellaChat';

export default function MobileCTA ()
{
    const { t, language } = useLanguage();
    const [chatOpen, setChatOpen] = useState( false );
    const bar = useRef<HTMLDivElement>( null );

    const withLang = ( href: string ) =>
    {
        if ( language === 'hu' ) return href;
        return href.startsWith( '/' ) ? `/${ language }${ href }` : href;
    };

    // The bar is always shown below lg (it carries the chat button too), so the page reserves its
    // height at the bottom (globals.css: body padding-bottom = --mobile-cta-h): nothing ends up under it.
    useEffect( () =>
    {
        const el = bar.current;
        if ( !el ) return;
        const root = document.documentElement;
        const sync = () => root.style.setProperty( '--mobile-cta-h', `${ el.offsetHeight }px` );
        sync();
        const ro = new ResizeObserver( sync );
        ro.observe( el );
        return () => { ro.disconnect(); root.style.removeProperty( '--mobile-cta-h' ); };
    }, [] );

    useEffect( () =>
    {
        const onState = ( e: Event ) => setChatOpen( Boolean( ( e as CustomEvent<{ open: boolean }> ).detail?.open ) );
        window.addEventListener( CHAT_STATE_EVENT, onState );
        return () => window.removeEventListener( CHAT_STATE_EVENT, onState );
    }, [] );

    // The label follows the page's own offer (Péter 2026-10-05, 6328): the website page offers the
    // design preview, every other page the free consultation.
    const pathname = usePathname() || '/';
    const websitePage = /\/weboldal-ai-kkv\/?$/.test( pathname );
    const label = language === 'en'
        ? ( websitePage ? 'Free design preview' : 'Free consultation' )
        : language === 'de'
            ? ( websitePage ? 'Kostenloser Entwurf' : 'Kostenlose Beratung' )
            : ( websitePage ? 'Ingyenes látványterv' : 'Ingyenes konzultáció' );

    const ctaLabel = language === 'en'
        ? 'Contact'
        : language === 'de'
            ? 'Kontakt'
            : 'Kapcsolat';

    const chatLabel = language === 'en'
        ? ( chatOpen ? 'Close Brunella AI chat' : 'Open Brunella AI chat' )
        : language === 'de'
            ? ( chatOpen ? 'Brunella-KI-Chat schließen' : 'Brunella-KI-Chat öffnen' )
            : ( chatOpen ? 'Brunella AI chat bezárása' : 'Brunella AI chat megnyitása' );

    return (
        <div
            ref={ bar }
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-1/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3"
            role="complementary"
            aria-label={ label }
            data-testid="mobile-sticky-cta"
        >
            <span className="flex-1 min-w-0 line-clamp-2 leading-tight text-sm text-gray-400 font-medium">{ label }</span>
            <button
                type="button"
                onClick={ () => window.dispatchEvent( new Event( CHAT_TOGGLE_EVENT ) ) }
                aria-label={ chatLabel }
                aria-expanded={ chatOpen }
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-[#00e5ff]/45 bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff]/20 transition-colors"
            >
                { chatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" /> }
            </button>
            <Link
                href={ withLang( '/kapcsolat' ) }
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00e5ff] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00e5ff]/90 transition-colors"
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
