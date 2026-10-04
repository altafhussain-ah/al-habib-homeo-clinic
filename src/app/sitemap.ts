import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/data/clinic";
import { localePath, locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/services", "/appointment", "/faq", "/contact"];
  const servicePages = services.map((service) => `/services/${service.slug}`);
  // The home page URL has no trailing slash: "https://site" and "https://site/ur".
  const url = (lang: (typeof locales)[number], path: string) => {
    const localPath = localePath(lang, path);
    return siteUrl + (localPath === "/" ? "" : localPath);
  };

  return [...pages, ...servicePages].flatMap((path) =>
    locales.map((lang) => ({
      url: url(lang, path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: { en: url("en", path), ur: url("ur", path) } },
    })),
  );
}
