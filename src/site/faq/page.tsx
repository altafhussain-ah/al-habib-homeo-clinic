import type { Metadata } from "next";
import { FaqList, FinalCta, JsonLd, PageHero } from "@/components/sections";
import { fill } from "@/i18n";
import { contentFor, pageMeta, type LangParams } from "@/lib/meta";
import { container } from "@/lib/styles";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const c = await contentFor(params);
  return pageMeta(c.lang, "/faq", c.t.faq.metaTitle, fill(c.t.faq.metaDescription, { name: c.name, city: c.city }));
}

export default async function FaqPage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.faq;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: c.lang,
    mainEntity: c.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className={`${container} py-14 sm:py-20`}>
        <div className="mx-auto max-w-3xl">
          <FaqList c={c} />
        </div>
      </section>
      <FinalCta c={c}>{t.ctaText}</FinalCta>
      <JsonLd data={faqSchema} />
    </>
  );
}
