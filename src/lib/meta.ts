import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/data/content";
import { isLocale, localePath } from "@/i18n";

export type LangParams = { params: Promise<{ lang: string }> };

/** Reads the language from the URL and returns that language's content. */
export async function contentFor(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return getContent(lang);
}

/** Title, description, and the links that tell search engines about the other language. */
export function pageMeta(lang: string, path: string, title: string, description: string): Metadata {
  if (!isLocale(lang)) return {};
  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { en: localePath("en", path), ur: localePath("ur", path), "x-default": localePath("en", path) },
    },
    // A page's openGraph settings replace the layout's, so the shared image is repeated here.
    openGraph: { title, description, url: localePath(lang, path), images: [{ url: "/og-image", width: 1200, height: 630 }] },
  };
}
