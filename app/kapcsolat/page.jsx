import VideoBackground from "../components/VideoBackground";
import { Mail, Phone, MapPin } from "lucide-react"; // Ikonok importálása (ha nincs lucide, akkor csak sima szöveg lesz)

export default function KapcsolatPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Kapcsolat oldal Videója */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765517272/6_u1dbi6.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Lépj Velünk Kapcsolatba
        </h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Bal oldal: Infók */}
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Elérhetőségek</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-semibold">hello@pohanka.company</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telefon</p>
                  <p className="text-lg font-semibold">+36 30 123 4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-500/20 rounded-full text-pink-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Iroda</p>
                  <p className="text-lg font-semibold">Zalaegerszeg, Hungary</p>
                </div>
              </div>
            </div>
          </div>

          {/* Jobb oldal: Űrlap (Csak design, funkció később) */}
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Írj nekünk</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Név</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Az Ön neve" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="email@cim.hu" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Üzenet</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors h-32" placeholder="Miben segíthetünk?"></textarea>
              </div>
              <button type="button" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                Üzenet Küldése
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import GsapFadeIn from "../components/GsapFadeIn";
import SpotlightCard from "../components/SpotlightCard";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function KapcsolatPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefon",
      value: "+36 30 429 1227",
      href: "tel:+36304291227",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "E-mail",
      value: "peter@pohanka.company",
      href: "mailto:peter@pohanka.company",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Cím",
      value: "8900 Zalaegerszeg, Berek utca 38",
      href: "https://maps.google.com/?q=8900+Zalaegerszeg,+Berek+utca+38",
    },
  ];

  const hours = [
    { day: "Hétköznap", time: "9:00 - 17:00", subtitle: "Hétfőtől péntekig" },
    { day: "Hétvégén", time: "Zárva", subtitle: "Szombat és vasárnap" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/30 to-pink-400/20 blur-3xl"
            style={{ bottom: "10%", left: "5%" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GsapFadeIn>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
              Lépjen Velünk Kapcsolatba
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Készen állunk arra, hogy megismerkedjünk az Ön projektjével.
              Kérjen ajánlatot vagy tegyen fel kérdéseket.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <GsapFadeIn key={idx} delay={idx * 0.1}>
                <SpotlightCard className="p-8 text-center h-full group cursor-pointer">
                  <a
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <div className="text-blue-400 mb-4 flex justify-center group-hover:text-blue-300 transition-colors">
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                      {method.value}
                    </p>
                  </a>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold mb-2 gradient-text mb-2">
                Üzenet Küldése
              </h2>
              <p className="text-gray-300 mb-8">
                Töltse ki az alábbi formot, és csapatunk hamarosan felveszi
                Önnel a kapcsolatot.
              </p>

              {submitted ? (
                <div className="glass-card p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Köszönjük!</h3>
                  <p className="text-gray-300">
                    Üzenetét sikeresen elküldtük. Hamarosan felvesszük Önnel a
                    kapcsolatot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Név *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Tárgy *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Üzenet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="form-input w-full resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-5 h-5 rounded mt-1 cursor-pointer accent-blue-400"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="ml-3 text-sm text-gray-300"
                    >
                      Elfogadom az adatvédelmi szabályzatot és a cookie
                      politikát *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Üzenet Küldése
                  </button>
                </form>
              )}
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Office Hours Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Munkaórák</h2>
              <p className="section-subtitle">
                Szívesen beszélgetünk az Ön projektjéről
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {hours.map((hour, idx) => (
                <GsapFadeIn key={idx} delay={idx * 0.2}>
                  <SpotlightCard className="p-8 text-center">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-4">{hour.day}</h3>
                    <p className="text-3xl font-bold gradient-text mb-2">
                      {hour.time}
                    </p>
                    <p className="text-sm text-gray-400">{hour.subtitle}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <SpotlightCard className="p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Más kérdések?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Tekintse meg a Rólunk oldalunkat vagy olvassa el a blogunk
                cikkeit.
              </p>
              <Link href="/rolunk" className="btn-primary inline-block">
                Tudjon Meg Többet Rólunk
              </Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}
