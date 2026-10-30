'use client';

// The homepage configurator (card ff1d7435): one sentence about the business, and a sketch of the
// visitor's own website builds up layer by layer, with the suggested package from the fixed price
// table. The /api/chat "configurator" mode (Kenshin, PR #163) answers with keys only; on 200 it always
// has an answer (its own keyword rules when the model cannot), and on 403/429 or a network failure
// the hero shows the general sketch. The sketch is CSS 3D, no WebGL, and it loads with the hero, so
// the h1 stays the LCP element.

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { CTA_LOCATIONS, PAGE_NAMES, trackConfiguratorStart, trackCtaClick } from '../lib/analytics';
import { MAX_TEXT, PACKAGE_LABEL, offerTitle, packagePrice, type ConfiguratorLang } from '../lib/configurator';
import {
  CONFIGURATOR_PREFILL_EVENT,
  OTHER_RESULT,
  contactNeedFor,
  parseConfiguratorResponse,
  profileFor,
  type ConfiguratorPrefill,
  type ConfiguratorResult,
} from '../lib/configuratorUi';

const UI: Record<ConfiguratorLang, {
  label: string; placeholder: string; submit: string; samplesLabel: string; samples: [ string, string ][];
  privacy: string; stage: string; industry: string; feature: string; sketch: string; sketchQuote: string;
  sketchBooking: string; packageLine: string; offerTitle: string; source: string; offerCta: string;
  packagePrefix: string;
}> = {
  hu: {
    label: 'Írja le egy mondatban, mivel foglalkozik, és megmutatjuk a weboldalát',
    placeholder: 'Például: fodrászszalonom van, és online foglalást szeretnék.',
    submit: 'Mutassa',
    samplesLabel: 'Vagy válasszon egy mintát:',
    samples: [
      [ 'Fodrász', 'Fodrászszalonom van Zalaegerszegen, és online időpontfoglalást szeretnék.' ],
      [ 'Autószerviz', 'Autószervizem van, az ügyfelek árajánlatot kérnének javítás előtt.' ],
      [ 'Vendégház', 'Vendégházat üzemeltetek a Balatonnál, szobafoglalás és ajándékutalvány kellene.' ],
      [ 'Kozmetika', 'Kozmetikus vagyok, foglalást és bankkártyás előleget szeretnék.' ],
      [ 'Asztalos', 'Asztalos vagyok, egyedi bútorokra kérnék ajánlatot fotóval.' ],
    ],
    privacy: 'Amit ide ír, azt egy MI-modell dolgozza fel a szolgáltatójánál. Személyes adatot ne írjon bele.',
    stage: 'A weboldala vázlata',
    industry: 'Iparág',
    feature: 'Fő funkció',
    sketch: 'Vázlat',
    sketchQuote: 'fejléc, nyitókép, ajánlatkérő blokk, mobilnézet',
    sketchBooking: 'fejléc, nyitókép, foglalási blokk, mobilnézet',
    packageLine: 'Csomag',
    offerTitle: 'Javasolt csomag',
    source: 'Az árak a weboldal árlistájából jönnek, nem az MI-től.',
    offerCta: 'Kérem a látványtervet',
    packagePrefix: 'Javasolt csomag',
  },
  en: {
    label: 'Describe your business in one sentence, and we show you your website',
    placeholder: 'For example: I run a hair salon and want online booking.',
    submit: 'Show me',
    samplesLabel: 'Or pick a sample:',
    samples: [
      [ 'Hair salon', 'I run a hair salon and want online booking.' ],
      [ 'Car service', 'I run a car service, and customers would like a quote before a repair.' ],
      [ 'Guesthouse', 'I run a guesthouse at Lake Balaton and need room booking and gift vouchers.' ],
      [ 'Beauty', 'I am a beautician and want booking with a card deposit.' ],
      [ 'Carpenter', 'I am a carpenter and would like quote requests for custom furniture with a photo.' ],
    ],
    privacy: 'What you type here is processed by an AI model at its provider. Please do not include personal data.',
    stage: 'A sketch of your website',
    industry: 'Industry',
    feature: 'Main feature',
    sketch: 'Sketch',
    sketchQuote: 'header, hero image, quote request block, mobile view',
    sketchBooking: 'header, hero image, booking block, mobile view',
    packageLine: 'Package',
    offerTitle: 'Suggested package',
    source: 'The prices come from our price list, not from the AI.',
    offerCta: 'Request the design preview',
    packagePrefix: 'Suggested package',
  },
  de: {
    label: 'Beschreiben Sie Ihr Unternehmen in einem Satz, und wir zeigen Ihnen Ihre Website',
    placeholder: 'Zum Beispiel: Ich habe einen Friseursalon und möchte Online-Buchung.',
    submit: 'Zeigen',
    samplesLabel: 'Oder wählen Sie ein Beispiel:',
    samples: [
      [ 'Friseur', 'Ich habe einen Friseursalon und möchte Online-Terminbuchung.' ],
      [ 'Autowerkstatt', 'Ich habe eine Autowerkstatt, die Kunden möchten vor der Reparatur ein Angebot.' ],
      [ 'Gästehaus', 'Ich betreibe ein Gästehaus am Balaton und brauche Zimmerbuchung und Gutscheine.' ],
      [ 'Kosmetik', 'Ich bin Kosmetikerin und möchte Buchung mit Anzahlung per Karte.' ],
      [ 'Tischler', 'Ich bin Tischler und möchte Anfragen für Möbel nach Maß mit Foto.' ],
    ],
    privacy: 'Ihre Eingabe wird von einem KI-Modell bei dessen Anbieter verarbeitet. Bitte keine personenbezogenen Daten eingeben.',
    stage: 'Entwurf Ihrer Website',
    industry: 'Branche',
    feature: 'Hauptfunktion',
    sketch: 'Entwurf',
    sketchQuote: 'Kopfzeile, Titelbild, Anfrageblock, Mobilansicht',
    sketchBooking: 'Kopfzeile, Titelbild, Buchungsblock, Mobilansicht',
    packageLine: 'Paket',
    offerTitle: 'Empfohlenes Paket',
    source: 'Die Preise stammen aus unserer Preisliste, nicht von der KI.',
    offerCta: 'Entwurf anfordern',
    packagePrefix: 'Empfohlenes Paket',
  },
};

const STEP_MS = 520;
const REQUEST_TIMEOUT_MS = 8000;

async function askEndpoint ( text: string, lang: ConfiguratorLang ): Promise<ConfiguratorResult | null>
{
  const ctrl = new AbortController();
  const timer = setTimeout( () => ctrl.abort(), REQUEST_TIMEOUT_MS );
  try
  {
    const res = await fetch( '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { mode: 'configurator', text, lang } ),
      signal: ctrl.signal,
    } );
    if ( !res.ok ) return null;
    return parseConfiguratorResponse( await res.json().catch( () => null ) );
  } catch
  {
    return null;
  } finally
  {
    clearTimeout( timer );
  }
}

export default function ConfiguratorHero ()
{
  const { language } = useLanguage();
  const lang: ConfiguratorLang = language === 'en' || language === 'de' ? language : 'hu';
  const ui = UI[ lang ];
  const reduceMotion = usePrefersReducedMotion();
  const [ text, setText ] = useState( '' );
  const [ busy, setBusy ] = useState( false );
  const [ result, setResult ] = useState<ConfiguratorResult | null>( null );
  const [ step, setStep ] = useState( 0 );
  const runRef = useRef( 0 );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>( [] );
  const stageRef = useRef<HTMLDivElement>( null );

  useEffect( () => () => timersRef.current.forEach( clearTimeout ), [] );

  // On a phone the sketch is hidden until the first answer and sits below the form: bring it into
  // view once it has rendered.
  useEffect( () =>
  {
    if ( result && window.matchMedia( '(max-width: 1023px)' ).matches )
      stageRef.current?.scrollIntoView( { behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' } );
  }, [ result, reduceMotion ] );

  async function build ( sentence: string, source: 'typed' | 'sample' )
  {
    const clean = sentence.trim().slice( 0, MAX_TEXT );
    if ( clean.length < 3 || busy ) return;
    const run = ++runRef.current;
    timersRef.current.forEach( clearTimeout );
    timersRef.current = [];
    setBusy( true );
    setStep( 0 );
    trackConfiguratorStart( { language: lang, source, page: PAGE_NAMES.Home } );
    const answer = ( await askEndpoint( clean, lang ) ) ?? OTHER_RESULT;
    if ( run !== runRef.current ) return;
    setResult( answer );
    setBusy( false );
    if ( reduceMotion ) return setStep( 4 );
    for ( let i = 1; i <= 4; i++ ) timersRef.current.push( setTimeout( () => run === runRef.current && setStep( i ), STEP_MS * i ) );
  }

  const profile = profileFor( result?.industry ?? 'hair_salon', lang );
  const packages = result?.packages ?? [];
  const packageName = offerTitle( packages, lang );
  const logLines = result
    ? [
      [ ui.industry, profile.kind ],
      [ ui.feature, profile.why ],
      [ ui.sketch, packages.includes( 'booking' ) ? ui.sketchBooking : ui.sketchQuote ],
      [ ui.packageLine, packageName ],
    ]
    : [];

  function requestPreview ()
  {
    if ( !result ) return;
    const rows = result.packages.map( ( k ) => `- ${ PACKAGE_LABEL[ k ][ lang ] }: ${ packagePrice( k, lang ) }` ).join( '\n' );
    const detail: ConfiguratorPrefill = { need: contactNeedFor( result ), business: `${ text.trim() }\n\n${ ui.packagePrefix }:\n${ rows }`.slice( 0, 1000 ) };
    window.dispatchEvent( new CustomEvent( CONFIGURATOR_PREFILL_EVENT, { detail } ) );
    trackCtaClick( { location: CTA_LOCATIONS.HeroConfiguratorOffer, language: lang, target: '#contact-form', page: PAGE_NAMES.Home } );
    const form = document.getElementById( 'contact-form' );
    form?.scrollIntoView( { behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' } );
    document.getElementById( 'home-contact-name' )?.focus( { preventScroll: true } );
  }

  const on = ( n: number ) => ( result && step >= n ? ' is-on' : '' );
  // before the first answer the desktop shows the shapes only: faint sample text would fail contrast
  const txt = ( s: string ) => ( result ? s : null );

  return (
    <div className="cfg mx-auto mt-2 mb-12 w-full max-w-6xl text-left" data-testid="configurator">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <form
            className="grid gap-3"
            onSubmit={( e ) => { e.preventDefault(); build( text, 'typed' ); }}
          >
            <label htmlFor="configurator-text" className="text-sm font-medium uppercase tracking-[0.08em] text-gray-300">
              {ui.label}
            </label>
            <div className="cfg-field flex flex-col border border-[#00e5ff]/30 bg-black/60 sm:flex-row">
              <textarea
                id="configurator-text"
                name="configurator"
                rows={2}
                maxLength={MAX_TEXT}
                value={text}
                onChange={( e ) => setText( e.target.value )}
                onKeyDown={( e ) => { if ( e.key === 'Enter' && !e.shiftKey ) { e.preventDefault(); build( text, 'typed' ); } }}
                placeholder={ui.placeholder}
                className="min-h-14 min-w-0 flex-1 resize-none bg-transparent px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy}
                aria-busy={busy}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#00e5ff] px-6 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] disabled:opacity-60"
              >
                {ui.submit}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p id="configurator-samples-label" className="mt-1 text-sm text-gray-400">{ui.samplesLabel}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="configurator-samples-label">
              {ui.samples.map( ( [ chip, sentence ] ) => (
                <button
                  key={chip}
                  type="button"
                  disabled={busy}
                  onClick={() => { setText( sentence ); build( sentence, 'sample' ); }}
                  className="min-h-11 rounded-full border border-transparent bg-[#00e5ff]/15 px-4 text-sm font-medium text-[#00e5ff] transition hover:border-[#00e5ff]/40 disabled:opacity-60"
                >
                  {chip}
                </button>
              ) )}
            </div>
            <p className="text-sm text-gray-400">{ui.privacy}</p>
          </form>

          <div className={`cfg-log mt-5 grid gap-1.5 font-mono text-sm text-gray-400 lg:min-h-[6.5em]${ result ? ' min-h-[6.5em]' : '' }`} aria-live="polite">
            {logLines.slice( 0, step ).map( ( [ k, v ] ) => (
              <div key={k}>› {k}: <b className="font-medium text-[#00e5ff]">{v}</b></div>
            ) )}
          </div>
        </div>

        <div
          ref={stageRef}
          className={`cfg-stage scroll-mt-24${ result ? ' has-result' : '' }`}
          role="img"
          aria-label={result ? `${ ui.stage }: ${ profile.name }, ${ profile.why }` : ui.stage}
          style={{ '--cfg-brand': profile.color } as React.CSSProperties}
        >
          <span className="cfg-corner cfg-c1" /><span className="cfg-corner cfg-c2" /><span className="cfg-corner cfg-c3" /><span className="cfg-corner cfg-c4" />
          <div className="cfg-scene" aria-hidden="true">
            <div className="cfg-laptop"><div className="cfg-screen">
              <div className={`cfg-layer cfg-l-nav${ on( 1 ) }`}><span>{txt( profile.name )}</span><em>{txt( profile.nav )}</em></div>
              <div className={`cfg-layer cfg-l-hero${ on( 2 ) }`}><h4>{txt( profile.head )}</h4><p>{txt( profile.sub )}</p><span>{txt( profile.cta )}</span></div>
              <div className={`cfg-layer cfg-l-img${ on( 2 ) }`} />
              <div className={`cfg-layer cfg-l-book${ on( 3 ) }`}>
                {profile.slots.map( ( [ a, b ], i ) => <div key={a} className={i === 1 ? 'sel' : ''}><b>{txt( a )}</b>{txt( b )}</div> )}
              </div>
            </div></div>
            <div className="cfg-phone"><div className="cfg-screen">
              <div className={`cfg-layer cfg-p-top${ on( 1 ) }`}>{txt( profile.name )}</div>
              <div className={`cfg-layer cfg-p-img${ on( 2 ) }`} />
              <div className={`cfg-layer cfg-p-cal${ on( 3 ) }`}>{[ 0, 1, 2, 3, 4, 5, 6, 7 ].map( ( i ) => <i key={i} className={i === 2 ? 'sel' : ''} /> )}</div>
              <div className={`cfg-layer cfg-p-btn${ on( 4 ) }`}>{txt( profile.cta.split( ' ' )[ 0 ] )}</div>
            </div></div>
          </div>
        </div>
      </div>

      {result && step >= 4 ? (
        <div className="surface-panel-elevated mt-7 grid items-center gap-4 rounded-3xl border border-white/10 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6" data-testid="configurator-offer">
          <div>
            <h2 className="mb-2 text-lg font-bold text-white">{ui.offerTitle}: {packageName}</h2>
            <ul className="grid gap-1 text-sm text-gray-300">
              {packages.map( ( k ) => (
                <li key={k} className="flex flex-col gap-0.5 border-b border-dashed border-white/10 py-1 sm:flex-row sm:justify-between sm:gap-3">
                  <span>{PACKAGE_LABEL[ k ][ lang ]}</span>
                  <strong className="font-semibold text-white">{packagePrice( k, lang )}</strong>
                </li>
              ) )}
            </ul>
            <p className="mt-2 text-xs text-gray-400">{ui.source}</p>
          </div>
          <button
            type="button"
            onClick={requestPreview}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#00e5ff] px-6 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
          >
            {ui.offerCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
