import { ArrowLeft, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { CtaButtons, FinalCta, ServiceCard } from "@/components/sections";
import { services } from "@/data/clinic";
import { fill } from "@/i18n";
import { contentFor, pageMeta } from "@/lib/meta";
import { container } from "@/lib/styles";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await contentFor(params);
  const service = c.services.find((item) => item.slug === slug);
  if (!service) return {};
  const comma = c.lang === "ur" ? "، " : ", ";
  return pageMeta(
    c.lang,
    `/services/${slug}`,
    fill(c.t.service.metaTitle, { title: service.title }),
    `${service.summary} ${[c.name, c.area, c.city].join(comma)}`,
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const c = await contentFor(params);
  const t = c.t.service;
  const service = c.services.find((item) => item.slug === slug);
  if (!service) notFound();

  const others = c.services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-mist">
        <div aria-hidden="true" className="blob-drift absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(127,196,204,0.5),transparent)]" />
        <div className={`${container} relative py-12 sm:py-16`}>
          <Link
            href={c.href("/services")}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            {t.allServices}
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white text-navy shadow-sm">
              <ServiceIcon name={service.icon} className="size-8" />
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">{service.title}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{service.summary}</p>
        </div>
      </section>

      <section className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr]`}>
        <div className="space-y-10">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{t.approach}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{service.intro}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{t.visitFor}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.conditions.map((condition) => (
                <li key={condition.english} className="rounded-full border border-navy/15 bg-white px-4 py-2 text-[15px] text-ink">
                  {condition.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.notListed}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{t.expect}</h2>
            <ol className="mt-5 space-y-4">
              {c.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-latin grid size-10 shrink-0 place-items-center rounded-full bg-navy font-semibold text-paper">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="flex gap-4 rounded-3xl border border-teal/30 bg-teal/5 p-6">
            <TriangleAlert className="mt-0.5 size-6 shrink-0 text-teal-deep" aria-hidden="true" />
            <p className="leading-relaxed text-ink">{t.warning}</p>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-navy">{t.bookTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted">{fill(t.bookText, { hours: c.hours })}</p>
            <CtaButtons c={c} className="mt-6 sm:flex-col" />
          </Reveal>
        </aside>
      </section>

      <section className="bg-mist">
        <div className={`${container} py-16`}>
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{t.others}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <ServiceCard key={item.slug} c={c} service={item} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta c={c} />
    </>
  );
}
