import { ArrowRight, CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic, mapDirectionsUrl, telLink } from "@/data/clinic";
import type { Content } from "@/data/content";
import { fill } from "@/i18n";
import { btnLight, btnOutline, btnPrimary, btnWhatsApp, container } from "@/lib/styles";
import { ServiceIcon, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";

/** Arrows point the reading direction: right in English, left in Urdu. */
const arrow = "rtl:rotate-180";

export function CtaButtons({ c, className = "" }: { c: Content; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link href={c.href("/appointment")} className={btnPrimary}>
        <CalendarCheck className="size-5" aria-hidden="true" />
        {c.t.bookAppointment}
      </Link>
      <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
        <WhatsAppIcon className="size-5" />
        {c.t.chatWhatsApp}
      </a>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-widest text-teal-deep">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </Reveal>
  );
}

/** Banner at the top of every inner page. */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div aria-hidden="true" className="blob-drift absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(127,196,204,0.5),transparent)]" />
      <div className={`${container} relative py-14 sm:py-20`}>
        <p className="text-sm font-bold uppercase tracking-widest text-teal-deep">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>
      </div>
    </section>
  );
}

/** `heading` sets the heading level so cards fit the page outline wherever they are used. */
export function ServiceCard({
  c,
  service,
  heading: Heading = "h3",
}: {
  c: Content;
  service: Content["services"][number];
  heading?: "h2" | "h3";
}) {
  return (
    <Link
      href={c.href(`/services/${service.slug}`)}
      className="group flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-teal-soft text-navy transition-transform duration-300 group-hover:scale-110">
        <ServiceIcon name={service.icon} className="size-7" />
      </span>
      <Heading className="mt-5 font-display text-xl font-semibold text-navy">{service.title}</Heading>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-teal-deep">
        {c.t.learnMore}
        <ArrowRight className={`size-4 ${arrow}`} aria-hidden="true" />
      </span>
    </Link>
  );
}

export function DoctorCard({ c, doctor }: { c: Content; doctor: Content["doctors"][number] }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-5">
        {doctor.photo ? (
          <Image
            src={doctor.photo}
            alt={fill(c.t.doctor.portrait, { name: doctor.name })}
            width={96}
            height={96}
            className="size-24 rounded-full object-cover"
          />
        ) : (
          <span
            role="img"
            aria-label={fill(c.t.doctor.photoPending, { name: doctor.name })}
            className="font-latin grid size-24 shrink-0 place-items-center rounded-full bg-navy text-3xl font-semibold text-paper"
          >
            {doctor.initials}
          </span>
        )}
        <div>
          <h3 className="font-display text-2xl font-semibold text-navy">{doctor.name}</h3>
          <p className="font-medium text-teal-deep">{doctor.role}</p>
        </div>
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-paper p-4">
          <dt className="text-sm font-semibold text-muted">{c.t.doctor.qualification}</dt>
          <dd className="mt-1 font-medium text-ink">{doctor.qualification}</dd>
        </div>
        <div className="rounded-2xl bg-paper p-4">
          <dt className="text-sm font-semibold text-muted">{c.t.doctor.experience}</dt>
          <dd className="mt-1 font-medium text-ink">{doctor.experience}</dd>
        </div>
      </dl>
      <p className="mt-5 leading-relaxed text-muted">{doctor.bio}</p>
    </article>
  );
}

/** Timings, address, and contact in one card. Used on Home and Contact. */
export function VisitInfo({ c, heading: Heading = "h3" }: { c: Content; heading?: "h2" | "h3" }) {
  const row = "flex items-start gap-4";
  const iconWrap = "grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-soft text-navy";

  return (
    <div className="space-y-6 rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
      <div className={row}>
        <span className={iconWrap}>
          <Clock className="size-6" aria-hidden="true" />
        </span>
        <div>
          <Heading className="font-display text-lg font-semibold text-navy">{c.t.visit.timings}</Heading>
          <p className="text-lg text-ink">{c.hours}</p>
          <p className="text-muted">{c.days}</p>
        </div>
      </div>
      <div className={row}>
        <span className={iconWrap}>
          <MapPin className="size-6" aria-hidden="true" />
        </span>
        <div>
          <Heading className="font-display text-lg font-semibold text-navy">{c.t.visit.address}</Heading>
          <address className="text-lg not-italic text-ink">{c.fullAddress}</address>
          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fill(c.t.visit.directionsLabel, { address: c.fullAddress })}
            className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-teal-deep underline-offset-4 hover:underline"
          >
            {c.t.getDirections}
            <ArrowRight className={`size-4 ${arrow}`} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className={row}>
        <span className={iconWrap}>
          <Phone className="size-6" aria-hidden="true" />
        </span>
        <div>
          <Heading className="font-display text-lg font-semibold text-navy">{c.t.visit.phone}</Heading>
          <a href={telLink} dir="ltr" className="font-latin inline-flex min-h-11 items-center text-lg font-semibold text-ink underline-offset-4 hover:underline">
            {c.phone}
          </a>
          {clinic.email && (
            <a href={`mailto:${clinic.email}`} dir="ltr" className="font-latin flex min-h-11 items-center text-ink underline-offset-4 hover:underline">
              {clinic.email}
            </a>
          )}
        </div>
      </div>
      <CtaButtons c={c} />
    </div>
  );
}

export function FaqList({ c, limit }: { c: Content; limit?: number }) {
  const items = limit ? c.faqs.slice(0, limit) : c.faqs;
  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <Reveal key={faq.question} delay={Math.min(index, 4) * 0.05}>
          <details name="faq" className="group rounded-2xl border border-navy/10 bg-white shadow-sm open:shadow-md">
            <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-lg font-semibold text-navy sm:px-6">
              {faq.question}
              <span
                aria-hidden="true"
                className="font-latin grid size-9 shrink-0 place-items-center rounded-full bg-teal-soft text-xl transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="faq-answer px-5 pb-5 leading-relaxed text-muted sm:px-6">{faq.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function FinalCta({ c, children }: { c: Content; children?: ReactNode }) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-paper">
      <div aria-hidden="true" className="blob-drift absolute -left-20 -top-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(127,196,204,0.5),transparent)]" />
      <div aria-hidden="true" className="blob-drift absolute -bottom-24 right-0 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(1,131,146,0.18),transparent)]" />
      <Reveal className={`${container} relative py-16 text-center sm:py-20`}>
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{c.t.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-paper/85">
          {children ?? fill(c.t.cta.text, { hours: c.hours })}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={c.href("/appointment")} className={btnLight}>
            <CalendarCheck className="size-5" aria-hidden="true" />
            {c.t.bookAppointment}
          </Link>
          <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
            <WhatsAppIcon className="size-5" />
            {c.t.chatWhatsApp}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function OutlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={btnOutline}>
      {children}
      <ArrowRight className={`size-5 ${arrow}`} aria-hidden="true" />
    </Link>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
