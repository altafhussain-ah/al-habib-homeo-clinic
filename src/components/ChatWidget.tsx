"use client";

import { MessageCircleQuestion, Send, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Ui } from "@/data/ui";
import type { Locale } from "@/i18n";
import type { Reply } from "@/lib/assistant";

type ChatMessage = { role: "user"; text: string } | ({ role: "assistant" } & Reply);

const MAX_CHARS = 300;

export function ChatWidget({ lang, t, whatsappHref }: { lang: Locale; t: Ui["chat"]; whatsappHref: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const send = async (text: string) => {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question) return;
    setInput("");
    inputRef.current?.focus();
    // The answering logic is loaded only when someone first asks a question, keeping pages light.
    const { answer } = await import("@/lib/assistant");
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", ...answer(question, lang) }]);
  };

  const linkClass =
    "inline-flex min-h-11 items-center rounded-full bg-teal-soft px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-teal hover:text-white";
  const bubble = "w-fit max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="fixed bottom-20 right-4 z-30 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-navy font-semibold text-paper shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl md:bottom-6 md:left-6 md:right-auto md:size-auto md:min-h-12 md:px-5 md:py-3"
        >
          <MessageCircleQuestion className="size-6 md:size-5" aria-hidden="true" />
          {/* On phones the button is a round icon so it does not cover the page; the label is still read out. */}
          <span className="sr-only md:not-sr-only">{t.open}</span>
        </button>
      )}

      {open && (
        <section
          role="dialog"
          aria-label={t.title}
          className="fade-up fixed inset-x-3 bottom-20 z-40 flex max-h-[min(34rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-navy/15 bg-white shadow-2xl sm:left-auto sm:right-4 sm:w-96 md:bottom-6 md:left-6 md:right-auto"
        >
          <header className="on-dark flex items-center justify-between gap-3 bg-navy px-5 py-3 text-paper">
            <div>
              <h2 className="font-display text-lg font-semibold">{t.title}</h2>
              <p className="text-sm text-paper/80">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-paper/15"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
            <p className={`${bubble} rounded-ss-sm bg-white text-ink shadow-sm`}>{t.welcome}</p>

            {messages.map((message, index) =>
              message.role === "user" ? (
                <p key={index} dir="auto" className={`${bubble} ms-auto whitespace-pre-wrap rounded-se-sm bg-teal text-white`}>
                  {message.text}
                </p>
              ) : (
                <div key={index} dir="auto" className={`${bubble} rounded-ss-sm bg-white text-ink shadow-sm`}>
                  <p>{message.text}</p>
                  {message.links && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <li key={link.href}>
                          {link.href.startsWith("/") ? (
                            <Link href={link.href} onClick={() => setOpen(false)} className={linkClass}>
                              {link.label}
                            </Link>
                          ) : (
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            )}

            {messages.length === 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {t.suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="min-h-11 rounded-full border border-navy/20 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-teal hover:text-teal-deep"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-navy/10 bg-white p-3">
            <label htmlFor="chat-input" className="sr-only">
              {t.inputLabel}
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_CHARS}
              dir="auto"
              autoComplete="off"
              placeholder={t.placeholder}
              className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-navy/20 bg-white px-4 text-base text-ink placeholder:text-muted/70"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t.send}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-teal text-white transition duration-200 hover:bg-teal-deep disabled:opacity-50"
            >
              <Send className="size-5 rtl:-scale-x-100" aria-hidden="true" />
            </button>
          </form>
          <p className="bg-white px-4 pb-3 text-xs leading-relaxed text-muted">
            {t.personal}{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-deep underline underline-offset-2">
              {t.personalLink}
            </a>
          </p>
        </section>
      )}
    </>
  );
}
