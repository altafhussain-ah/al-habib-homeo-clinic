/** The site's languages. English lives at "/", Urdu at "/ur". */
export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dirOf = (lang: Locale) => (lang === "ur" ? "rtl" : "ltr");

/** Turns a site path such as "/about" into the right URL for the language. */
export function localePath(lang: Locale, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/ur" : `/ur${path}`;
}

/** Removes the language prefix from a path: "/ur/about" becomes "/about". */
export function stripLocale(pathname: string) {
  if (pathname === "/ur") return "/";
  return pathname.startsWith("/ur/") ? pathname.slice(3) : pathname;
}

/** Replaces {name} placeholders in a string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
