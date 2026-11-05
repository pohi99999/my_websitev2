"use client";

import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { CTA_LOCATIONS, FORM_STATUSES, FORMS, PAGE_NAMES, trackCtaClick, trackFormSubmit } from "../lib/analytics";
import { buildQuoteMessage, QUOTE_LIMITS, QUOTE_NEED_LABELS, whatsappHref } from "../lib/quoteRequest";

export default function KapcsolatClient() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("lead");
  const [business, setBusiness] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const ui =
    language === "en"
      ? {
          title: "Request a free design preview or consultation",
          subtitle: "Tell us in one sentence what your business does. No obligation.",
          whatsapp: "Write on WhatsApp",
          contactTitle: "Contact Details",
          formTitle: "Request the design preview",
          name: "Name",
          email: "Email",
          location: "Office",
          phone: "Phone",
          need: "What do you need?",
          business: "What does your business do? (optional)",
          namePlaceholder: "Enter your name",
          emailPlaceholder: "Enter your email address",
          sending: "Sending in progress…",
          sendingBtn: "Sending...",
          submitBtn: "Request the design preview",
          success: "Thank you! Your message has been sent.",
          fail: "Sending failed. Please email us directly: info@pohankaestarsa.com (or try again in a few minutes).",
          country: "Hungary",
        }
      : language === "de"
        ? {
            title: "Fordern Sie einen kostenlosen Entwurf oder eine Beratung an",
            subtitle: "Schreiben Sie uns in einem Satz, womit sich Ihr Unternehmen beschäftigt. Unverbindlich.",
            whatsapp: "Per WhatsApp schreiben",
            contactTitle: "Kontaktinformationen",
            formTitle: "Entwurf anfordern",
            name: "Name",
            email: "E-Mail",
            location: "Büro",
            phone: "Telefon",
            need: "Was brauchen Sie?",
            business: "Womit beschäftigt sich Ihr Unternehmen? (optional)",
            namePlaceholder: "Geben Sie Ihren Namen ein",
            emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
            sending: "Wird gesendet…",
            sendingBtn: "Senden...",
            submitBtn: "Entwurf anfordern",
            success: "Danke! Ihre Nachricht wurde gesendet.",
            fail: "Senden fehlgeschlagen. Schreiben Sie direkt an: info@pohankaestarsa.com (oder versuchen Sie es in ein paar Minuten erneut).",
            country: "Ungarn",
          }
        : {
            title: "Kérjen ingyenes látványtervet vagy konzultációt",
            subtitle: "Írja le egy mondatban, mivel foglalkozik. Kötelezettség nélkül.",
            whatsapp: "Írok WhatsAppon",
            contactTitle: "Elérhetőségek",
            formTitle: "Kérem a látványtervet",
            name: "Név",
            email: "Email",
            location: "Iroda",
            phone: "Telefon",
            need: "Mire van szüksége?",
            business: "Mivel foglalkozik a vállalkozása? (nem kötelező)",
            namePlaceholder: "Az Ön neve",
            emailPlaceholder: "Az Ön e-mail-címe",
            sending: "Küldés folyamatban…",
            sendingBtn: "Küldés...",
            submitBtn: "Kérem a látványtervet",
            success: "Köszönjük! Az üzenet elküldve.",
            fail: "Nem sikerült elküldeni. Írjon közvetlenül: info@pohankaestarsa.com (vagy próbálja újra pár perc múlva).",
            country: "Magyarország",
          };

  const isSending = status.state === "sending";
  const needLabels = QUOTE_NEED_LABELS[language] ?? QUOTE_NEED_LABELS.hu;
  const whatsapp = whatsappHref(language);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", message: ui.sending });

    try {
      // Default: same-origin Next API route (Vercel deployment)
      // Optional override: external backend base URL (without trailing slash)
      const externalApiBase = process.env.NEXT_PUBLIC_API_ENDPOINT?.trim();
      const contactUrl = externalApiBase
        ? `${externalApiBase.replace(/\/$/, "")}/api/contact`
        : "/api/contact";

      const message = buildQuoteMessage(language, needLabels[need], business, email, "contact");
      const res = await fetch(contactUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        // Reported here only; returning (not throwing) keeps it from also counting as error_exception.
        trackFormSubmit({ form: FORMS.ContactMain, status: FORM_STATUSES.ErrorResponse, language, page: PAGE_NAMES.Contact });
        setStatus({ state: "error", message: ui.fail });
        return;
      }

      setStatus({ state: "success", message: ui.success });
      // The API answers ok to a filled honeypot on purpose; that is a bot, not a lead.
      if (!website) {
        trackFormSubmit({ form: FORMS.ContactMain, status: FORM_STATUSES.Success, language, page: PAGE_NAMES.Contact });
      }
      setName("");
      setEmail("");
      setNeed("lead");
      setBusiness("");
      setWebsite("");
    } catch (err) {
      trackFormSubmit({ form: FORMS.ContactMain, status: FORM_STATUSES.ErrorException, language, page: PAGE_NAMES.Contact });
      setStatus({
        state: "error",
        message:
            ui.fail
      });
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {ui.title}
        </h1>
        <p className="mb-12 text-center text-lg text-gray-300">{ui.subtitle}</p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">{ui.contactTitle}</h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{ui.email}</p>
                  {/* break-all: the address has no break point and widened the 360 px layout to 392 px */}
                  <a href="mailto:info@pohankaestarsa.com" className="font-semibold break-all hover:underline">info@pohankaestarsa.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{ui.phone}</p>
                  <a href="tel:+36304291227" className="font-semibold hover:underline">+36 30 429 1227</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{ui.location}</p>
                  <p className="font-semibold">Zalaegerszeg, Kossuth Lajos u. 39, 8900</p>
                </div>
              </div>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-semibold text-black"
                onClick={() =>
                  trackCtaClick({ location: CTA_LOCATIONS.ContactPageWhatsapp, language, target: whatsapp, page: PAGE_NAMES.Contact })
                }
              >
                <MessageCircle size={20} />
                {ui.whatsapp}
              </a>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">{ui.formTitle}</h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-gray-300 mb-2">{ui.name}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-blue-500/50 focus:outline-none"
                  placeholder={ui.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-gray-300 mb-2">{ui.email}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                  placeholder={ui.emailPlaceholder}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label className="block text-gray-300 mb-2">Website</label>
                <input
                  id="honeypot-website"
                  name="website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white"
                  placeholder=""
                />
              </div>

              <div>
                <label htmlFor="contact-need" className="block text-gray-300 mb-2">{ui.need}</label>
                <select
                  id="contact-need"
                  name="need"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                >
                  {Object.entries(needLabels).map(([value, label]) => (
                    <option key={value} value={value} className="bg-slate-900">{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-business" className="block text-gray-300 mb-2">{ui.business}</label>
                <textarea
                  id="contact-business"
                  name="business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  rows={3}
                  maxLength={QUOTE_LIMITS.businessMax}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                />
              </div>

              {status.state !== "idle" && (
                <div
                  className={
                    status.state === "success"
                      ? "text-emerald-300"
                      : status.state === "error"
                        ? "text-rose-300"
                        : "text-gray-300"
                  }
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="btn-primary w-full text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? ui.sendingBtn : ui.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
