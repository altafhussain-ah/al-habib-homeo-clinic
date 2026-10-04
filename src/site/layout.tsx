import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Nastaliq_Urdu, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/sections";
import { clinic, mapDirectionsUrl, siteUrl } from "@/data/clinic";
import { fill, isLocale, localePath } from "@/i18n";
import { contentFor, type LangParams } from "@/lib/meta";
import "@/app/globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
// Urdu is set in Nastaliq, the script style Urdu readers expect. It downloads only when Urdu text is shown.
const nastaliq = Noto_Nastaliq_Urdu({ variable: "--font-nastaliq", subsets: ["arabic"], display: "swap", preload: false });

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = await contentFor(params);
  const title = fill(c.t.meta.homeTitle, { name: c.name });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${c.name}` },
    description: c.description,
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { en: "/", ur: "/ur", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: c.name,
      title,
      description: c.description,
      url: localePath(lang, "/"),
      locale: lang === "ur" ? "ur_PK" : "en_PK",
      images: [{ url: "/og-image", width: 1200, height: 630, alt: clinic.name }],
    },
    formatDetection: { telephone: true, address: true },
  };
}

export const viewport: Viewport = { themeColor: "#112e47" };

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: clinic.name,
  description: clinic.description,
  url: siteUrl,
  telephone: clinic.phoneTel,
  ...(clinic.email ? { email: clinic.email } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinic.address.street}, ${clinic.address.area}`,
    addressLocality: clinic.address.city,
    postalCode: clinic.address.postalCode,
    addressCountry: clinic.address.countryCode,
  },
  areaServed: "Islamabad",
  availableLanguage: ["English", "Urdu"],
  geo: { "@type": "GeoCoordinates", ...clinic.geo },
  hasMap: mapDirectionsUrl,
  ...(clinic.hours.schemaDays.length
    ? {
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: clinic.hours.schemaDays,
          opens: clinic.hours.opens,
          closes: clinic.hours.closes,
        },
      }
    : {}),
};

export default async function RootLayout({ children, params }: { children: ReactNode } & LangParams) {
  const c = await contentFor(params);

  return (
    <html lang={c.lang} dir={c.dir} className={`${fraunces.variable} ${jakarta.variable} ${nastaliq.variable} antialiased`}>
      <body className="flex min-h-screen flex-col pb-16 font-sans md:pb-0">
        {/* Without JavaScript the scroll-reveal never runs, so show that content straight away. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-paper"
        >
          {c.t.skip}
        </a>
        <Providers>
          <Header
            lang={c.lang}
            name={c.name}
            nav={c.nav}
            labels={{
              book: c.t.bookAppointment,
              openMenu: c.t.openMenu,
              closeMenu: c.t.closeMenu,
              switchTo: c.t.switchTo,
              switchLabel: c.t.switchLabel,
            }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer c={c} />
          <FloatingActions c={c} />
          <ChatWidget lang={c.lang} t={c.t.chat} whatsappHref={c.whatsappHref} />
        </Providers>
        <JsonLd data={clinicSchema} />
      </body>
    </html>
  );
}
