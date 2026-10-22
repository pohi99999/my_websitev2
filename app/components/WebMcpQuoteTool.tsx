'use client';

// KISERLETI: a fooldali ajanlatkero urlap WebMCP-eszkozkent (request_quote).
// Ha a bongeszoben nincs document.modelContext, ez a komponens semmit nem
// regisztral es semmit nem renderel. Lasd docs/webmcp.md.

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { QUOTE_NEED_LABELS, type QuoteInput, type QuoteLanguage } from '../lib/quoteRequest';
import { registerRequestQuoteTool } from '../lib/webmcp/requestQuoteTool';

type Pending = { data: QuoteInput; resolve: ( confirmed: boolean ) => void };

const UI: Record<QuoteLanguage, {
  title: string;
  intro: string;
  name: string;
  email: string;
  need: string;
  business: string;
  confirm: string;
  cancel: string;
}> = {
  hu: {
    title: 'Ajánlatkérés megerősítése',
    intro: 'Egy AI-asszisztens az alábbi ajánlatkérést szeretné elküldeni az Ön nevében. Csak akkor küldjük el, ha jóváhagyja.',
    name: 'Név',
    email: 'E-mail',
    need: 'Igény',
    business: 'Vállalkozás',
    confirm: 'Igen, elküldöm',
    cancel: 'Mégse',
  },
  en: {
    title: 'Confirm quote request',
    intro: 'An AI assistant wants to send the following quote request on your behalf. It is only sent if you approve it.',
    name: 'Name',
    email: 'Email',
    need: 'Need',
    business: 'Business',
    confirm: 'Yes, send it',
    cancel: 'Cancel',
  },
  de: {
    title: 'Anfrage bestätigen',
    intro: 'Ein KI-Assistent möchte die folgende Anfrage in Ihrem Namen senden. Sie wird nur gesendet, wenn Sie zustimmen.',
    name: 'Name',
    email: 'E-Mail',
    need: 'Bedarf',
    business: 'Unternehmen',
    confirm: 'Ja, senden',
    cancel: 'Abbrechen',
  },
};

function toQuoteLanguage ( language: unknown ): QuoteLanguage
{
  return language === 'en' || language === 'de' ? language : 'hu';
}

export default function WebMcpQuoteTool ()
{
  const { language } = useLanguage();
  const lang = toQuoteLanguage( language );
  const languageRef = useRef<QuoteLanguage>( lang );
  const [pending, setPending] = useState<Pending | null>( null );
  // A fokusz a Megse gombra kerul, hogy egy veletlen Enter ne kuldje el.
  const cancelButtonRef = useRef<HTMLButtonElement>( null );

  useEffect( () =>
  {
    const unregister = registerRequestQuoteTool( {
      getLanguage: () => languageRef.current,
      confirm: ( data, signal ) =>
        new Promise<boolean>( ( resolve ) =>
        {
          if ( signal.aborted ) return resolve( false );
          const settle = ( confirmed: boolean ) =>
          {
            signal.removeEventListener( 'abort', onAbort );
            setPending( null );
            resolve( confirmed );
          };
          const onAbort = () => settle( false );
          signal.addEventListener( 'abort', onAbort );
          setPending( { data, resolve: settle } );
        } ),
    } );
    return () => unregister?.();
  }, [] );

  useEffect( () =>
  {
    languageRef.current = lang;
  }, [lang] );

  useEffect( () =>
  {
    if ( pending ) cancelButtonRef.current?.focus();
  }, [pending] );

  if ( !pending ) return null;

  const ui = UI[lang];
  const rows: [string, string][] = [
    [ui.name, pending.data.name],
    [ui.email, pending.data.email],
    [ui.need, QUOTE_NEED_LABELS[lang][pending.data.need]],
  ];
  if ( pending.data.business ) rows.push( [ui.business, pending.data.business] );

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 px-4" data-webmcp-confirm>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="webmcp-quote-title"
        className="surface-panel-premium w-full max-w-lg p-6 md:p-8"
        onKeyDown={( event ) =>
        {
          if ( event.key === 'Escape' ) pending.resolve( false );
        }}
      >
        <h2 id="webmcp-quote-title" className="mb-3 text-2xl font-bold text-white">{ui.title}</h2>
        <p className="mb-5 text-sm text-gray-300">{ui.intro}</p>
        <dl className="mb-6 space-y-3">
          {rows.map( ( [label, value] ) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-wider text-gray-400">{label}</dt>
              <dd className="whitespace-pre-wrap break-words text-white">{value}</dd>
            </div>
          ) )}
        </dl>
        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => pending.resolve( true )}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 px-6 py-3 text-sm font-bold text-[#00e5ff] hover:border-[#00e5ff] hover:bg-[#00e5ff]/15"
          >
            {ui.confirm}
          </button>
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={() => pending.resolve( false )}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-gray-200 hover:border-white/40"
          >
            {ui.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
