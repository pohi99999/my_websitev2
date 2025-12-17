"use client";

import VideoBackground from "../components/VideoBackground";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function KapcsolatClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const isSending = status.state === "sending";

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", message: "Küldés folyamatban…" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Nem sikerült elküldeni az üzenetet.");
      }

      setStatus({ state: "success", message: "Köszönjük! Az üzenet elküldve." });
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setStatus({
        state: "error",
        message:
          "Nem sikerült elküldeni. Írj közvetlenül: peterpohankapersonal@gmail.com (vagy próbáld újra pár perc múlva)."
      });
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/contact.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Lépj Velünk Kapcsolatba
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Elérhetőségek</h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">peterpohankapersonal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Telefon</p>
                  <p className="font-semibold">+36 30 244 6779</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Helyszín</p>
                  <p className="font-semibold">8900 Zalaegerszeg, Magyarország</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Üzenet Küldése</h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Név</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-blue-500/50 focus:outline-none"
                  placeholder="Add meg a neved"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                  placeholder="Add meg az email címed"
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
                <label className="block text-gray-300 mb-2">Üzenet</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none resize-none"
                  placeholder="Írd le, miben segíthetünk..."
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
                {isSending ? "Küldés..." : "Üzenet Küldése"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
