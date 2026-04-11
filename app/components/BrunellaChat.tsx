'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Lang = 'hu' | 'en' | 'de';

const LABELS: Record<Lang, {
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  welcome: string;
  error: string;
  thinking: string;
}> = {
  hu: {
    title: 'Brunella AI',
    subtitle: 'Pohánka & Társa asszisztens',
    placeholder: 'Írja be kérdését...',
    send: 'Küldés',
    welcome: 'Szia! 👋 Brunella vagyok, a Pohánka és Társa Kft. AI asszisztense.\n\nKérdezzen bátran a Brunella rendszerről, automatizálási megoldásainkról, vagy foglaljon ingyenes konzultációt!',
    error: 'Sajnálom, hiba történt. Kérjük, próbálja újra.',
    thinking: 'Brunella gondolkodik…',
  },
  en: {
    title: 'Brunella AI',
    subtitle: 'Pohánka & Társa assistant',
    placeholder: 'Type your question…',
    send: 'Send',
    welcome: 'Hello! 👋 I\'m Brunella, the AI assistant for Pohánka és Társa Kft.\n\nFeel free to ask about the Brunella system, our automation solutions, or book a free consultation!',
    error: 'Sorry, an error occurred. Please try again.',
    thinking: 'Brunella is thinking…',
  },
  de: {
    title: 'Brunella AI',
    subtitle: 'Pohánka & Társa Assistent',
    placeholder: 'Stellen Sie Ihre Frage…',
    send: 'Senden',
    welcome: 'Hallo! 👋 Ich bin Brunella, der KI-Assistent von Pohánka és Társa Kft.\n\nFragen Sie gerne nach dem Brunella-System, unseren Automatisierungslösungen oder buchen Sie eine kostenlose Beratung!',
    error: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    thinking: 'Brunella denkt nach…',
  },
};

// HUD corner bracket positions
const CORNER_STYLES: React.CSSProperties[] = [
  { top: 8, left: 8, borderTop: '1.5px solid #00e5ff', borderLeft: '1.5px solid #00e5ff' },
  { top: 8, right: 8, borderTop: '1.5px solid #00e5ff', borderRight: '1.5px solid #00e5ff' },
  { bottom: 8, left: 8, borderBottom: '1.5px solid #00e5ff', borderLeft: '1.5px solid #00e5ff' },
  { bottom: 8, right: 8, borderBottom: '1.5px solid #00e5ff', borderRight: '1.5px solid #00e5ff' },
];

export default function BrunellaChat() {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' || language === 'de' ? language : 'hu';
  const L = LABELS[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Show welcome message on first open
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true);
      setMessages([{ role: 'assistant', content: L.welcome }]);
    }
  }, [open, initialized, L.welcome]);

  // Update welcome message if language changes before any user interaction
  useEffect(() => {
    if (initialized && messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: L.welcome }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, [messages, loading, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok || !data.content) throw new Error(data.error ?? 'Unknown error');
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: L.error }]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading, L.error]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  return (
    <>
      {/* ── Floating toggle button ───────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center focus:outline-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,10,15,0.95))',
          border: '1px solid rgba(0,229,255,0.45)',
          boxShadow: open ? '0 0 24px rgba(0,229,255,0.35)' : '0 0 16px rgba(0,229,255,0.15)',
        }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 28px rgba(0,229,255,0.4)' }}
        whileTap={{ scale: 0.94 }}
        aria-label="Brunella AI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} color="#00e5ff" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              <MessageSquare size={22} color="#00e5ff" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-[9997] flex flex-col"
            style={{
              width: 360,
              maxWidth: 'calc(100vw - 1.5rem)',
              height: 500,
              background: '#040d0d',
              border: '1px solid rgba(0,229,255,0.2)',
              borderRadius: 14,
              boxShadow: '0 0 50px rgba(0,229,255,0.08), 0 24px 64px rgba(0,0,0,0.85)',
            }}
          >
            {/* HUD corner brackets */}
            {CORNER_STYLES.map((style, i) => (
              <div key={i} className="absolute w-3 h-3" style={style} />
            ))}

            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(0,229,255,0.14)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}
              >
                <Bot size={16} color="#00e5ff" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight" style={{ color: '#00e5ff' }}>
                  {L.title}
                </div>
                <div className="text-xs leading-tight truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {L.subtitle}
                </div>
              </div>
              {/* Online pulse */}
              <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00e5ff' }} />
              </div>
            </div>

            {/* Message list */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,229,255,0.15) transparent' }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(0,229,255,0.08))',
                            border: '1px solid rgba(0,229,255,0.35)',
                            color: '#e0f7fa',
                          }
                        : {
                            background: '#0d1a1a',
                            border: '1px solid rgba(0,229,255,0.12)',
                            color: '#b2dfdb',
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-3 py-2 rounded-xl text-xs flex items-center gap-2"
                    style={{
                      background: '#0d1a1a',
                      border: '1px solid rgba(0,229,255,0.12)',
                      color: 'rgba(0,229,255,0.6)',
                    }}
                  >
                    <Loader2 size={12} className="animate-spin" />
                    {L.thinking}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="px-4 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(0,229,255,0.14)' }}
            >
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={L.placeholder}
                  rows={1}
                  disabled={loading}
                  className="flex-1 resize-none rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  style={{
                    background: '#0a1515',
                    border: '1px solid rgba(0,229,255,0.25)',
                    minHeight: 40,
                    maxHeight: 100,
                    lineHeight: '1.5',
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = '1px solid rgba(0,229,255,0.55)')
                  }
                  onBlur={(e) =>
                    (e.target.style.border = '1px solid rgba(0,229,255,0.25)')
                  }
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                  style={{
                    background: 'rgba(0,229,255,0.15)',
                    border: '1px solid rgba(0,229,255,0.4)',
                  }}
                  aria-label={L.send}
                >
                  <Send size={16} color="#00e5ff" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
