import { dirOf, fill, localePath, type Locale } from "@/i18n";
import {
  clinic,
  clinicStory,
  disclaimer,
  doctors,
  faqs,
  reasons,
  services,
  stats,
  steps,
  testimonials,
  whatsappLink,
} from "./clinic";
import { ui } from "./ui";
import { urClinic, urClinicStory, urConditions, urDisclaimer, urDoctors, urFaqs, urReasons, urServices, urStats, urSteps } from "./ur";

/**
 * Everything a page needs, in one language.
 * English comes from clinic.ts and services.ts; Urdu from ur.ts.
 */
export function getContent(lang: Locale) {
  const urdu = lang === "ur";
  const t = ui[lang];

  const name = urdu ? urClinic.name : clinic.name;
  const street = urdu ? urClinic.street : clinic.address.street;
  const area = urdu ? urClinic.area : clinic.address.area;
  const city = urdu ? urClinic.city : clinic.address.city;
  const comma = urdu ? "، " : ", ";

  const localServices = services.map((service) => ({
    slug: service.slug,
    icon: service.icon,
    title: urdu ? urServices[service.slug].title : service.title,
    summary: urdu ? urServices[service.slug].summary : service.summary,
    intro: urdu ? urServices[service.slug].intro : service.intro,
    conditions: service.conditions.map((english) => ({
      english,
      name: urdu ? (urConditions[english] ?? english) : english,
    })),
  }));

  return {
    lang,
    dir: dirOf(lang),
    t,
    name,
    tagline: urdu ? urClinic.tagline : clinic.tagline,
    description: urdu ? urClinic.description : clinic.description,
    street,
    area,
    city,
    fullAddress: [street, area, city].join(comma),
    hours: urdu ? urClinic.hoursDisplay : clinic.hours.display,
    days: urdu ? urClinic.hoursDays : clinic.hours.days,
    phone: clinic.phoneDisplay,
    founded: clinic.founded,
    doctors: doctors.map((doctor, index) => ({ ...doctor, ...(urdu ? urDoctors[index] : {}) })),
    doctorNames: doctors.map((doctor, index) => (urdu ? urDoctors[index].name : doctor.name)).join(urdu ? " اور " : " and "),
    stats: stats.map((stat, index) => ({ ...stat, label: urdu ? urStats[index] : stat.label })),
    reasons: urdu ? urReasons : reasons,
    steps: urdu ? urSteps : steps,
    faqs: urdu ? urFaqs : faqs,
    testimonials,
    story: urdu ? urClinicStory : clinicStory,
    disclaimer: urdu ? urDisclaimer : disclaimer,
    services: localServices,
    /** Every condition with its area, sorted for the A–Z list. */
    allConditions: localServices
      .flatMap((service) => service.conditions.map((condition) => ({ ...condition, slug: service.slug, area: service.title })))
      .sort((a, b) => a.name.localeCompare(b.name, lang)),
    nav: [
      { href: localePath(lang, "/"), label: t.nav.home },
      { href: localePath(lang, "/about"), label: t.nav.about },
      { href: localePath(lang, "/services"), label: t.nav.services },
      { href: localePath(lang, "/faq"), label: t.nav.faq },
      { href: localePath(lang, "/contact"), label: t.nav.contact },
    ],
    /** URL of a site page in this language. */
    href: (path: string) => localePath(lang, path),
    /** WhatsApp link with the standard greeting in this language. */
    whatsappHref: whatsappLink(fill(t.whatsappGreeting, { name })),
  };
}

export type Content = ReturnType<typeof getContent>;
