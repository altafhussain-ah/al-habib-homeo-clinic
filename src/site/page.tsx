import { CheckCircle2, Clock, Leaf, MapPin, Quote } from "lucide-react";
import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import {
  CtaButtons,
  DoctorCard,
  FaqList,
  FinalCta,
  OutlineLink,
  SectionHeading,
  ServiceCard,
  VisitInfo,
} from "@/components/sections";
import { mapEmbedUrl } from "@/data/clinic";
import type { Content } from "@/data/content";
import { fill } from "@/i18n";
import { contentFor, type LangParams } from "@/lib/meta";
import { container } from "@/lib/styles";

function Hero({ c }: { c: Content }) {
  const words = c.tagline.split(" ");
  const leaves = [
    { className: "left-[3%] top-[3%] size-8", rotate: "-20deg", delay: "0s" },
    { className: "right-[6%] top-[4%] size-9", rotate: "35deg", delay: "1.5s" },
    { className: "left-[46%] bottom-[6%] size-7 hidden lg:block", rotate: "80deg", delay: "3s" },
    { className: "right-[4%] bottom-[24%] size-9 hidden sm:block", rotate: "-50deg", delay: "2.2s" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-paper">
      <div aria-hidden="true" className="blob-drift absolute -left-32 -top-32 size-96 rounded-full bg-[radial-gradient(closest-side,rgba(127,196,204,0.5),transparent)]" />
      <div aria-hidden="true" className="blob-drift absolute -right-24 top-40 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(1,131,146,0.18),transparent)]" />
      {leaves.map((leaf) => (
        <Leaf
          key={leaf.className}
          aria-hidden="true"
          className={`leaf-float absolute text-teal-light/70 ${leaf.className}`}
          style={{ "--leaf-rotate": leaf.rotate, animationDelay: leaf.delay } as CSSProperties}
        />
      ))}

      <div className={`${container} relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28`}>
        <div>
          <p className="fade-up inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-navy shadow-sm">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {c.area}
            {c.lang === "ur" ? "، " : ", "}
            {c.city}
          </p>
          <h1
            className={`mt-5 font-display font-semibold leading-[1.08] text-navy ${c.lang === "ur" ? "text-[2.1rem] sm:text-5xl" : "text-[2.6rem] sm:text-6xl"}`}
          >
            {words.map((word, index) => (
              <Fragment key={index}>
                <span className="word-rise" style={{ animationDelay: `${0.05 + index * 0.05}s` }}>
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "0.3s" }}>
            {fill(c.t.home.heroText, { doctors: c.doctorNames })}
          </p>
          <div className="fade-up" style={{ animationDelay: "0.4s" }}>
            <CtaButtons c={c} className="mt-8" />
          </div>
          <p className="fade-up mt-6 flex items-center gap-2 font-medium text-ink" style={{ animationDelay: "0.5s" }}>
            <Clock className="size-5 shrink-0 text-navy" aria-hidden="true" />
            {fill(c.t.home.openEveryDay, { hours: c.hours })}
          </p>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-md" style={{ animationDelay: "0.2s" }}>
          <HeroArt alt={fill(c.t.home.logoAlt, { name: c.name })} />
          <div className="absolute -bottom-5 start-2 rounded-2xl bg-white px-5 py-4 shadow-lg sm:-start-6">
            <p className="text-sm font-semibold text-muted">{c.t.home.careFor}</p>
            <p className="font-display text-xl font-semibold text-navy">{c.t.home.allAges}</p>
          </div>
          <div className="absolute -top-4 end-2 rounded-2xl bg-navy px-5 py-4 text-paper shadow-lg sm:-end-4">
            <p className="text-sm font-semibold text-paper/80">{c.t.home.servingSince}</p>
            <p className="font-latin text-xl font-semibold">{c.founded}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The bottle from the clinic's logo, resting on a soft background shape. */
function HeroArt({ alt }: { alt: string }) {
  return (
    <div className="relative grid aspect-square w-full place-items-center">
      <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 size-full">
        <path
          fill="#d9eef0"
          d="M329 87c39 44 55 112 34 168s-80 100-145 108S82 339 50 285 18 152 62 100s128-76 180-66c33 6 62 25 87 53z"
        />
      </svg>
      <Image
        src="/logo-mark.png"
        alt={alt}
        width={364}
        height={560}
        preload
        sizes="(min-width: 1024px) 230px, 45vw"
        className="gentle-bob relative h-[62%] w-auto drop-shadow-xl"
      />
    </div>
  );
}

export default async function HomePage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.home;

  return (
    <>
      <Hero c={c} />

      <section aria-label={t.glance} className="border-y border-navy/10 bg-white">
        <dl className={`${container} grid grid-cols-3 gap-4 py-10 text-center`}>
          {c.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm font-medium text-muted sm:text-base">{stat.label}</dt>
              <dd dir="ltr" className="font-latin-display text-4xl font-semibold text-navy sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${container} py-16 sm:py-24`}>
        <SectionHeading
          eyebrow={t.aboutEyebrow}
          title={fill(t.aboutTitle, { year: c.founded })}
          text={fill(t.aboutText, { name: c.name, area: c.area })}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.doctors.map((doctor, index) => (
            <Reveal key={doctor.name} delay={index * 0.1}>
              <DoctorCard c={c} doctor={doctor} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <OutlineLink href={c.href("/about")}>{t.moreAbout}</OutlineLink>
        </Reveal>
      </section>

      <section className="bg-mist">
        <div className={`${container} py-16 sm:py-24`}>
          <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 4) * 0.07} className="h-full">
                <ServiceCard c={c} service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-24`}>
        <SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {c.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 2) * 0.1} className="h-full">
              <div className="flex h-full gap-4 rounded-3xl border border-navy/10 bg-white p-6 shadow-sm">
                <CheckCircle2 className="mt-0.5 size-7 shrink-0 text-navy" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy">{reason.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{reason.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark bg-navy text-paper">
        <div className={`${container} py-16 sm:py-24`}>
          <Reveal className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-light">{t.howEyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{t.howTitle}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.1} className="h-full rounded-3xl bg-paper/10 p-6">
                  <span className="font-latin grid size-12 place-items-center rounded-full bg-paper text-xl font-semibold text-navy">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/85">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {c.testimonials.length > 0 && (
        <section className={`${container} py-16 sm:py-24`}>
          <SectionHeading eyebrow={t.testimonialsEyebrow} title={t.testimonialsTitle} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.testimonials.map((item, index) => (
              <Reveal key={index} delay={index * 0.1} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-sm">
                  <Quote className="size-8 text-teal-light" aria-hidden="true" />
                  <blockquote dir="auto" className="mt-4 flex-1 text-lg leading-relaxed text-ink">
                    {item.quote}
                  </blockquote>
                  <figcaption dir="auto" className="mt-5 font-semibold text-navy">
                    {item.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="bg-mist">
        <div className={`${container} py-16 sm:py-24`}>
          <SectionHeading eyebrow={t.visitEyebrow} title={t.visitTitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <VisitInfo c={c} />
            </Reveal>
            <Reveal delay={0.1} className="min-h-80 overflow-hidden rounded-3xl border border-navy/10 shadow-sm">
              <iframe
                src={`${mapEmbedUrl}&hl=${c.lang}`}
                title={fill(c.t.mapTitle, { name: c.name })}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full min-h-80 border-0"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-24`}>
        <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} center />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList c={c} limit={4} />
          <Reveal className="mt-8 text-center">
            <OutlineLink href={c.href("/faq")}>{t.seeAllQuestions}</OutlineLink>
          </Reveal>
        </div>
      </section>

      <FinalCta c={c} />
    </>
  );
}
