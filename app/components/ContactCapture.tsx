'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import
{
  CTA_LOCATIONS,
  FORM_STATUSES,
  FORMS,
  PAGE_NAMES,
  trackCtaClick,
  trackFormSubmit,
} from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

type StatusState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactCapture ()
{
  const { language } = useLanguage();
  const [name, setName] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [challenge, setChallenge] = useState( 'lead' );
  const [status, setStatus] = useState<{ state: StatusState; message: string }>( {
    state: 'idle',
    message: '',
  } );

  const ui = useMemo( () =>
  {
    if ( language === 'en' )
    {
      return {
        badge: 'AI system review',
        title: 'Tell us the biggest bottleneck in your business workflow',
        subtitle:
          'Leave your details and we will come back with a concrete AI system idea tailored to your workflow.',
        name: 'Name',
        email: 'Email',
        challenge: 'Main challenge',
        submit: 'Request AI system review',
        sending: 'Sending...',
        success: 'Thank you! We saved your request and will get back to you shortly.',
        error:
          'We could not send your request right now. Please email us directly at peterpohankapersonal@gmail.com.',
        whatsapp: 'Write on WhatsApp',
        reassurance: 'Business-first AI systems • transparent rollout • measured ROI',
        options: {
          lead: 'Automation',
          accounting: 'Decision support',
          support: 'Integrations',
          other: 'Other',
        },
      };
    }

    if ( language === 'de' )
    {
      return {
        badge: 'KI-Systemprüfung',
        title: 'Was bremst Ihren Geschäftsablauf aktuell am stärksten?',
        subtitle:
          'Hinterlassen Sie Ihre Daten und wir melden uns mit einem konkreten KI-Systemansatz für Ihren Workflow.',
        name: 'Name',
        email: 'E-Mail',
        challenge: 'Größte Herausforderung',
        submit: 'KI-Systemprüfung anfragen',
        sending: 'Wird gesendet...',
        success: 'Danke! Ihre Anfrage wurde gespeichert und wir melden uns in Kürze.',
        error:
          'Ihre Anfrage konnte gerade nicht gesendet werden. Schreiben Sie bitte direkt an peterpohankapersonal@gmail.com.',
        whatsapp: 'Per WhatsApp schreiben',
        reassurance: 'Business-first KI-Systeme • transparenter Rollout • messbarer ROI',
        options: {
          lead: 'Automatisierung',
          accounting: 'Entscheidungsunterstützung',
          support: 'Integrationen',
          other: 'Sonstiges',
        },
      };
    }

    return {
      badge: 'AI rendszerfelmérés',
      title: 'Mi a legnagyobb szűk keresztmetszet a működésetekben?',
      subtitle:
        'Hagyd itt az elérhetőségedet, és visszajelzünk egy konkrét AI rendszerötlettel a folyamataidra szabva.',
      name: 'Név',
      email: 'Email',
      challenge: 'Fő kihívás',
      submit: 'Kérek AI rendszerfelmérést',
      sending: 'Küldés...',
      success: 'Köszönjük! Elmentettük az érdeklődést, hamarosan jelentkezünk.',
      error:
        'Most nem sikerült elküldeni az érdeklődést. Írj közvetlenül: peterpohankapersonal@gmail.com.',
      whatsapp: 'Írok WhatsAppon',
      reassurance: 'Vállalati fókusz • transzparens bevezetés • mérhető ROI',
      options: {
        lead: 'Automatizálás',
        accounting: 'Döntéstámogatás',
        support: 'Integrációk',
        other: 'Egyéb',
      },
    };
  }, [language] );

  const isSending = status.state === 'sending';
  const whatsappHref =
    'https://wa.me/36304291227?text=' +
    encodeURIComponent(
      language === 'en'
        ? 'Hi! I would like an AI system review for my business.'
        : language === 'de'
          ? 'Hallo! Ich möchte eine KI-Systemprüfung für mein Unternehmen anfragen.'
          : 'Szia! Szeretnék AI rendszerfelmérést kérni a vállalkozásomhoz.'
    );

  async function handleSubmit ( event: React.FormEvent<HTMLFormElement> )
  {
    event.preventDefault();
    setStatus( { state: 'sending', message: ui.sending } );

    const challengeLabel = ui.options[challenge as keyof typeof ui.options] ?? ui.options.other;
    const message =
      language === 'en'
        ? `Homepage inquiry for an AI system review\nMain challenge: ${ challengeLabel }\nPreferred contact: ${ email }`
        : language === 'de'
          ? `Homepage-Anfrage für eine KI-Systemprüfung\nGrößte Herausforderung: ${ challengeLabel }\nBevorzugter Kontakt: ${ email }`
          : `Főoldali érdeklődés AI rendszerfelméréshez\nFő kihívás: ${ challengeLabel }\nKapcsolati email: ${ email }`;

    try
    {
      const response = await fetch( '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { name, email, message, website: '' } ),
      } );

      const data = await response.json().catch( () => ( {} ) );
      if ( !response.ok || !data?.ok )
      {
        trackFormSubmit( {
          form: FORMS.ContactHomeQuick,
          status: FORM_STATUSES.ErrorResponse,
          language,
          page: PAGE_NAMES.Home,
        } );
        setStatus( { state: 'error', message: ui.error } );
        return;
      }

      try
      {
        window.localStorage.setItem(
          'home-quick-contact-last',
          JSON.stringify( {
            name,
            email,
            challenge: challengeLabel,
            submittedAt: new Date().toISOString(),
          } )
        );
      } catch
      {
        // Local persistence is best-effort only.
      }

      setStatus( { state: 'success', message: ui.success } );
      trackFormSubmit( {
        form: FORMS.ContactHomeQuick,
        status: FORM_STATUSES.Success,
        language,
        page: PAGE_NAMES.Home,
      } );
      setName( '' );
      setEmail( '' );
      setChallenge( 'lead' );
    } catch
    {
      setStatus( { state: 'error', message: ui.error } );
      trackFormSubmit( {
        form: FORMS.ContactHomeQuick,
        status: FORM_STATUSES.ErrorException,
        language,
        page: PAGE_NAMES.Home,
      } );
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-1 px-6 py-24" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-[#00e5ff]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel-elevated flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="hud-badge mb-6 text-xs font-mono">{ui.badge}</div>
            <h2 className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl">{ui.title}</h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-400">{ui.subtitle}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <Mail className="h-5 w-5 text-[#00e5ff]" />
              <span className="text-sm text-white">peterpohankapersonal@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span className="text-sm text-white/80">{ui.reassurance}</span>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#04140b] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.35)]"
              onClick={() =>
                trackCtaClick( {
                  location: CTA_LOCATIONS.HomepageContactWhatsapp,
                  language,
                  target: whatsappHref,
                  page: PAGE_NAMES.Home,
                } )
              }
            >
              <MessageCircle className="h-5 w-5" />
              {ui.whatsapp}
            </a>
          </div>
        </div>

        <div className="surface-panel-premium p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="home-contact-name" className="mb-2 block text-sm text-gray-300">
                  {ui.name}
                </label>
                <input
                  id="home-contact-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={( event ) => setName( event.target.value )}
                  autoComplete="name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#00e5ff]/50 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.2)]"
                />
              </div>

              <div>
                <label htmlFor="home-contact-email" className="mb-2 block text-sm text-gray-300">
                  {ui.email}
                </label>
                <input
                  id="home-contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={( event ) => setEmail( event.target.value )}
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#00e5ff]/50 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.2)]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="home-contact-challenge" className="mb-2 block text-sm text-gray-300">
                {ui.challenge}
              </label>
              <select
                id="home-contact-challenge"
                value={challenge}
                onChange={( event ) => setChallenge( event.target.value )}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#00e5ff]/50 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.2)]"
              >
                <option value="lead">{ui.options.lead}</option>
                <option value="accounting">{ui.options.accounting}</option>
                <option value="support">{ui.options.support}</option>
                <option value="other">{ui.options.other}</option>
              </select>
            </div>

            {status.state !== 'idle' ? (
              <div
                aria-live={status.state === 'error' ? 'assertive' : 'polite'}
                role={status.state === 'error' ? 'alert' : 'status'}
                className={`rounded-2xl border px-4 py-3 text-sm ${ status.state === 'success'
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                  : status.state === 'error'
                    ? 'border-rose-400/30 bg-rose-400/10 text-rose-200'
                    : 'border-white/10 bg-white/5 text-gray-300'
                  }`}
              >
                {status.message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSending}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#00e5ff] transition duration-300 hover:scale-[1.02] hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 hover:shadow-[0_0_35px_rgba(0,229,255,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? ui.sending : ui.submit}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
