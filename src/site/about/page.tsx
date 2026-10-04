import { Ear, HeartHandshake, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DoctorCard, FinalCta, PageHero, SectionHeading } from "@/components/sections";
import { fill } from "@/i18n";
import { contentFor, pageMeta, type LangParams } from "@/lib/meta";
import { container } from "@/lib/styles";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const c = await contentFor(params);
  const t = c.t.about;
  return pageMeta(c.lang, "/about", t.metaTitle, fill(t.metaDescription, { doctors: c.doctorNames, name: c.name, area: c.area, city: c.city }));
}

const valueIcons = [Ear, ShieldCheck, HeartHandshake];

/** "Opposite the mosque" reads naturally mid-sentence in English when it starts in lower case. */
const midSentence = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export default async function AboutPage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.about;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={fill(t.text, { name: c.name, area: c.area, city: c.city })} />

      <section className={`${container} py-16 sm:py-24`}>
        <SectionHeading eyebrow={t.doctorsEyebrow} title={t.doctorsTitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.doctors.map((doctor, index) => (
            <Reveal key={doctor.name} delay={index * 0.1}>
              <DoctorCard c={c} doctor={doctor} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className={`${container} grid gap-10 py-16 sm:py-24 lg:grid-cols-2`}>
          <SectionHeading eyebrow={t.storyEyebrow} title={t.storyTitle} />
          <Reveal delay={0.1} className="space-y-4 text-lg leading-relaxed text-muted">
            <p>{c.story}</p>
            <p>{fill(t.storyLocation, { street: midSentence(c.street), hours: c.hours })}</p>
          </Reveal>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-24`}>
        <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <Reveal key={value.title} delay={index * 0.1} className="h-full">
                <div className="h-full rounded-3xl border border-navy/10 bg-white p-6 shadow-sm">
                  <span className="grid size-14 place-items-center rounded-2xl bg-teal-soft text-navy">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{value.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <FinalCta c={c} />
    </>
  );
}
