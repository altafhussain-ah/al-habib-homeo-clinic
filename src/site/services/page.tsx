import type { Metadata } from "next";
import { ConditionSearch } from "@/components/ConditionSearch";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero, SectionHeading, ServiceCard } from "@/components/sections";
import { fill } from "@/i18n";
import { contentFor, pageMeta, type LangParams } from "@/lib/meta";
import { container } from "@/lib/styles";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const c = await contentFor(params);
  return pageMeta(c.lang, "/services", c.t.services.metaTitle, fill(c.t.services.metaDescription, { name: c.name }));
}

export default async function ServicesPage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.services;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className={`${container} py-16 sm:py-24`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 4) * 0.07} className="h-full">
              <ServiceCard c={c} service={service} heading="h2" />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="a-z" className="bg-mist">
        <div className={`${container} py-16 sm:py-24`}>
          <SectionHeading eyebrow={t.azEyebrow} title={t.azTitle} text={t.azText} />
          <div className="mt-10">
            <ConditionSearch
              conditions={c.allConditions}
              basePath={c.href("/services")}
              labels={{
                label: t.searchLabel,
                placeholder: t.searchPlaceholder,
                none: t.searchNone,
                count: t.searchCount,
                letters: t.lettersLabel,
              }}
            />
          </div>
          <p className="mt-10 rounded-3xl bg-white p-6 leading-relaxed text-muted">
            <strong className="font-semibold text-ink">{t.pleaseNote}</strong> {c.disclaimer}
          </p>
        </div>
      </section>
      <FinalCta c={c}>{t.ctaText}</FinalCta>
    </>
  );
}
