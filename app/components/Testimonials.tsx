"use client";

import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { googleReviews, GOOGLE_RATING, type GoogleReview } from './googleReviews';

/*
 * Google-vélemények (2026-09-23). A korábbi szekció kitalált ajánlásokat és igazolatlan
 * számokat mutatott ("40+ elégedett ügyfél", "4.9/5"); helyette a valódi, nyilvános
 * Google-vélemények állnak itt, szó szerint (googleReviews.ts). A vélemények magyarul
 * íródtak, ezért angol és német nézetben is az eredeti szöveg látszik, jelölve.
 */
type Lang = 'hu' | 'en' | 'de';

const copy: Record<Lang, { heading: string; count: string; original?: string; stars: string }> = {
  hu: { heading: 'Google-vélemények', count: `${ GOOGLE_RATING.count } vélemény a Google Cégprofilunkon`, stars: '5 csillag az 5-ből' },
  en: { heading: 'Google reviews', count: `${ GOOGLE_RATING.count } reviews on our Google Business Profile`, original: 'Original reviews, in Hungarian.', stars: '5 out of 5 stars' },
  de: { heading: 'Google-Bewertungen', count: `${ GOOGLE_RATING.count } Bewertungen in unserem Google-Unternehmensprofil`, original: 'Originalbewertungen auf Ungarisch.', stars: '5 von 5 Sternen' },
};

const average: Record<Lang, string> = { hu: '5,0', en: '5.0', de: '5,0' };

function Stars ( { label, size = 'w-4 h-4' }: { label: string; size?: string } )
{
  return (
    <div className="flex gap-1" role="img" aria-label={label}>
      {Array.from( { length: 5 } ).map( ( _, i ) => (
        <Star key={i} className={`${ size } fill-yellow-400 text-yellow-400`} aria-hidden="true" />
      ) )}
    </div>
  );
}

function Author ( { review }: { review: GoogleReview } )
{
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-11 h-11 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-[#00e5ff]"
        aria-hidden="true"
      >
        {review.name.charAt( 0 )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-white text-sm">{review.name}</p>
        {review.role && <p className="text-gray-400 text-xs">{review.role}</p>}
        {review.url && (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#00e5ff] text-xs hover:underline"
          >
            {review.urlLabel ?? review.url}
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

/* A vélemény szövege a forrás bekezdéseivel; a magyar idézőjelet a megjelenítés teszi köré. */
function Body ( { review, className }: { review: GoogleReview; className: string } )
{
  const last = review.paragraphs.length - 1;
  return (
    <div lang="hu" className={className}>
      {review.paragraphs.map( ( p, i ) => (
        <p key={i}>
          {i === 0 ? '„' : ''}{p}{i === last ? '”' : ''}
        </p>
      ) )}
    </div>
  );
}

export default function Testimonials ()
{
  const { language } = useLanguage();
  const lang: Lang = language === 'en' || language === 'de' ? language : 'hu';
  const t = copy[lang];
  const featured = googleReviews.find( ( r ) => r.featured );
  const rest = googleReviews.filter( ( r ) => !r.featured );

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 bg-[#060608] relative overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.82)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00e5ff]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-bold text-white mb-5 font-syne">
            {t.heading}
          </h2>
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-white/10 bg-white/5 px-5 py-2">
            <span className="text-2xl font-bold text-white font-syne tabular-nums">{average[lang]}</span>
            <Stars label={t.stars} size="w-5 h-5" />
            <span className="text-gray-300 text-sm">{t.count}</span>
          </div>
          {t.original && <p className="text-gray-500 text-sm mt-3">{t.original}</p>}
        </div>

        {featured && (
          <article className="relative max-w-4xl mx-auto mb-6 border border-[#00e5ff]/25 bg-[#0c0c10] p-6 md:p-10">
            <Quote className="w-10 h-10 text-[#00e5ff]/40 mb-4" aria-hidden="true" />
            <Stars label={t.stars} />
            <Body review={featured} className="mt-5 space-y-4 text-gray-200 text-base md:text-lg leading-relaxed" />
            <div className="mt-8">
              <Author review={featured} />
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {rest.map( ( review ) => (
            <article
              key={review.name}
              className="relative flex flex-col bg-[#0c0c10] border border-white/5 p-6 hover:border-[#00e5ff]/30 transition-colors duration-300"
            >
              <Stars label={t.stars} />
              <Body review={review} className="mt-4 mb-6 space-y-3 text-gray-300 text-sm leading-relaxed" />
              <div className="mt-auto">
                <Author review={review} />
              </div>
            </article>
          ) )}
        </div>
      </div>
    </section>
  );
}
