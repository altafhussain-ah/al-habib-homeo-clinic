import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero, VisitInfo } from "@/components/sections";
import { mapEmbedUrl } from "@/data/clinic";
import { fill } from "@/i18n";
import { contentFor, pageMeta, type LangParams } from "@/lib/meta";
import { container } from "@/lib/styles";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const c = await contentFor(params);
  const t = c.t.contact;
  return pageMeta(c.lang, "/contact", t.metaTitle, fill(t.metaDescription, { name: c.name, address: c.fullAddress, phone: c.phone, hours: c.hours }));
}

export default async function ContactPage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.contact;
  const street = c.lang === "en" ? c.street.charAt(0).toLowerCase() + c.street.slice(1) : c.street;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={fill(t.text, { street, area: c.area, city: c.city })} />
      <section className={`${container} grid gap-6 py-14 sm:py-20 lg:grid-cols-2`}>
        <Reveal>
          <VisitInfo c={c} heading="h2" />
        </Reveal>
        <Reveal delay={0.1} className="min-h-96 overflow-hidden rounded-3xl border border-navy/10 shadow-sm">
          <iframe
            src={`${mapEmbedUrl}&hl=${c.lang}`}
            title={fill(c.t.mapTitle, { name: c.name })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-96 border-0"
          />
        </Reveal>
      </section>
    </>
  );
}
