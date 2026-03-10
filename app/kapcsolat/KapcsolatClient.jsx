"use client";

import VideoBackground from "../components/VideoBackground";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { trackFormSubmit } from "../lib/analytics";

export default function KapcsolatClient() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const ui =
    language === "en"
      ? {
          title: "Get in Touch",
          contactTitle: "Contact Details",
          formTitle: "Send Message",
          name: "Name",
          email: "Email",
          location: "Location",
          phone: "Phone",
          message: "Message",
          namePlaceholder: "Enter your name",
          emailPlaceholder: "Enter your email address",
          messagePlaceholder: "Tell us how we can help...",
          sending: "Sending in progress…",
          sendingBtn: "Sending...",
          submitBtn: "Send Message",
          success: "Thank you! Your message has been sent.",
          fail: "Sending failed. Please email us directly: peterpohankapersonal@gmail.com (or try again in a few minutes).",
          country: "Hungary",
        }
      : language === "de"
        ? {
            title: "Kontakt aufnehmen",
            contactTitle: "Kontaktinformationen",
            formTitle: "Nachricht senden",
            name: "Name",
            email: "E-Mail",
            location: "Standort",
            phone: "Telefon",
            message: "Nachricht",
            namePlaceholder: "Geben Sie Ihren Namen ein",
            emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
            messagePlaceholder: "Beschreiben Sie kurz, wobei wir helfen können...",
            sending: "Wird gesendet…",
            sendingBtn: "Senden...",
            submitBtn: "Nachricht senden",
            success: "Danke! Ihre Nachricht wurde gesendet.",
            fail: "Senden fehlgeschlagen. Schreiben Sie direkt an: peterpohankapersonal@gmail.com (oder versuchen Sie es in ein paar Minuten erneut).",
            country: "Ungarn",
          }
        : {
            title: "Lépj Velünk Kapcsolatba",
            contactTitle: "Elérhetőségek",
            formTitle: "Üzenet Küldése",
            name: "Név",
            email: "Email",
            location: "Helyszín",
            phone: "Telefon",
            message: "Üzenet",
            namePlaceholder: "Add meg a neved",
            emailPlaceholder: "Add meg az email címed",
            messagePlaceholder: "Írd le, miben segíthetünk...",
            sending: "Küldés folyamatban…",
            sendingBtn: "Küldés...",
            submitBtn: "Üzenet Küldése",
            success: "Köszönjük! Az üzenet elküldve.",
            fail: "Nem sikerült elküldeni. Írj közvetlenül: peterpohankapersonal@gmail.com (vagy próbáld újra pár perc múlva).",
            country: "Magyarország",
          };

  const isSending = status.state === "sending";

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", message: ui.sending });

    try {
      // Default: same-origin Next API route (works on Netlify too)
      // Optional override: external backend base URL (without trailing slash)
      const externalApiBase = process.env.NEXT_PUBLIC_API_ENDPOINT?.trim();
      const contactUrl = externalApiBase
        ? `${externalApiBase.replace(/\/$/, "")}/api/contact`
        : "/api/contact";

      const res = await fetch(contactUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        trackFormSubmit({ form: "contact_main", status: "error_response", language, page: "contact" });
        throw new Error(data?.error || ui.fail);
      }

      setStatus({ state: "success", message: ui.success });
      trackFormSubmit({ form: "contact_main", status: "success", language, page: "contact" });
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      trackFormSubmit({ form: "contact_main", status: "error_exception", language, page: "contact" });
      setStatus({
        state: "error",
        message:
            ui.fail
      });
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/contact.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {ui.title}
        </h1>

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
                  <p className="font-semibold">peterpohankapersonal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{ui.phone}</p>
                  <p className="font-semibold">+36 30 244 6779</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{ui.location}</p>
                  <p className="font-semibold">8900 Zalaegerszeg, {ui.country}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">{ui.formTitle}</h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">{ui.name}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-blue-500/50 focus:outline-none"
                  placeholder={ui.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">{ui.email}</label>
                <input
                  type="email"
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
                <label className="block text-gray-300 mb-2">{ui.message}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none resize-none"
                  placeholder={ui.messagePlaceholder}
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
    </main>
  );
}
