"use client";

import { Languages, Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, stripLocale, type Locale } from "@/i18n";
import { btnPrimary, container } from "@/lib/styles";

type Props = {
  lang: Locale;
  name: string;
  nav: { href: string; label: string }[];
  labels: { book: string; openMenu: string; closeMenu: string; switchTo: string; switchLabel: string };
};

export function Header({ lang, name, nav, labels }: Props) {
  // The page's path without its language, e.g. "/about" on both "/about" and "/ur/about".
  const path = stripLocale(usePathname());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const home = localePath(lang, "/");
  const isActive = (href: string) => {
    const target = stripLocale(href);
    return target === "/" ? path === "/" : path.startsWith(target);
  };

  // The same page in the other language.
  const other: Locale = lang === "en" ? "ur" : "en";
  const switchHref = localePath(other, path);
  const languageLink = (className: string) => (
    <Link
      href={switchHref}
      hrefLang={other}
      lang={other}
      aria-label={labels.switchLabel}
      onClick={() => setOpen(false)}
      // On English pages the word "اردو" uses the device's own font, so the large Urdu font is not downloaded there.
      className={`${className} ${other === "en" ? "font-latin" : ""}`}
    >
      <Languages className="size-5 shrink-0" aria-hidden="true" />
      {labels.switchTo}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-paper/90 backdrop-blur-md">
      <div className={`${container} flex h-18 items-center justify-between gap-3`}>
        <Link href={home} onClick={() => setOpen(false)} className="flex min-h-12 shrink-0 items-center">
          <Image src="/logo.png" alt={name} width={493} height={176} preload className="h-11 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-teal-soft ${
                isActive(link.href) ? "bg-teal-soft text-navy" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {languageLink("ms-1 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-navy/20 px-4 py-2 text-[15px] font-semibold text-navy transition-colors hover:bg-teal-soft")}
          <Link href={localePath(lang, "/appointment")} className={`${btnPrimary} ms-2`}>
            {labels.book}
          </Link>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          {languageLink("inline-flex min-h-11 items-center gap-1.5 rounded-full border border-navy/20 px-3 py-2 text-sm font-semibold text-navy")}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="grid size-12 place-items-center rounded-full text-navy transition-colors hover:bg-teal-soft"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-navy/10 bg-paper shadow-lg lg:hidden"
          >
            <ul className={`${container} flex flex-col gap-1 py-4`}>
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-xl px-4 text-lg font-medium ${
                      isActive(link.href) ? "bg-teal-soft text-navy" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href={localePath(lang, "/appointment")} onClick={() => setOpen(false)} className={`${btnPrimary} w-full`}>
                  {labels.book}
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
