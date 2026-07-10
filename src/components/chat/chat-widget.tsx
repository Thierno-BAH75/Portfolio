"use client";

import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

export function ChatWidget() {
  const { t, locale } = useI18n();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Message d'accueil injecté à la première ouverture, dans la langue active
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t.chat.welcome }]);
    }
  }, [open, messages.length, t.chat.welcome]);

  // Échap pour fermer + focus initial sur l'input
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Scroll en bas à chaque nouveau message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, 500);
      if (!trimmed || loading) return;

      const userMessage: ChatMessage = { role: "user", content: trimmed };
      // Les bulles d'erreur locales ne font pas partie de la conversation envoyée
      const history = [...messages.filter((m) => !m.isError), userMessage];
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
            locale,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.reply) throw new Error();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t.chat.error, isError: true },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, locale, t.chat.error]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Chips visibles tant que le visiteur n'a rien envoyé
  const showQuickQuestions = messages.every((m) => m.role === "assistant") && !loading;

  return (
    <>
      {/* Bulle flottante */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.chat.closeLabel : t.chat.openLabel}
        aria-expanded={open}
        aria-haspopup="dialog"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25"
      >
        {/* Halo pulsant discret (désactivé si prefers-reduced-motion) */}
        {!reduceMotion && !open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 animate-ping opacity-20"
          />
        )}
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Panneau de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label={t.chat.title}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[91] flex flex-col overflow-hidden bg-card border border-border/60 shadow-2xl",
              // Mobile : plein écran · Desktop : panneau ancré au-dessus de la bulle
              "inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[540px] sm:max-h-[calc(100dvh-7rem)] sm:w-[380px] sm:rounded-2xl"
            )}
          >
            {/* En-tête */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-gradient-to-r from-violet-600/15 to-cyan-500/15">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-white shrink-0">
                <MessageCircle size={17} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-tight">{t.chat.title}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    {!reduceMotion && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    )}
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  {t.chat.online}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.chat.closeLabel}
                className="ml-auto p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "bg-gradient-to-br from-violet-600 to-cyan-600 text-white rounded-br-md"
                        : m.isError
                          ? "bg-red-500/10 border border-red-500/30 text-red-400 rounded-bl-md"
                          : "bg-muted/70 text-foreground rounded-bl-md"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Indicateur « écrit... » */}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted/70 px-3.5 py-2.5 text-sm text-muted-foreground">
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70"
                          animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        />
                      ))}
                    </span>
                    {t.chat.typing}
                  </div>
                </div>
              )}

              {/* Questions rapides */}
              {showQuickQuestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.chat.quickQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saisie */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border/60 px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat.placeholder}
                maxLength={500}
                aria-label={t.chat.placeholder}
                className="flex-1 rounded-lg border border-border/60 bg-background/70 px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label={t.chat.send}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white disabled:opacity-50 hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
