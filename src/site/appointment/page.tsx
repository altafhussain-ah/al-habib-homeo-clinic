import { Clock, MessageSquareText, Phone } from "lucide-react";
import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/sections";
import { telLink } from "@/data/clinic";
import { fill } from "@/i18n";
import { contentFor, pageMeta, type LangParams } from "@/lib/meta";
import { btnOutline, btnWhatsApp, container } from "@/lib/styles";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const c = await contentFor(params);
  const t = c.t.appointment;
  return pageMeta(c.lang, "/appointment", t.metaTitle, fill(t.metaDescription, { name: c.name, city: c.city, hours: c.hours }));
}

export default async function AppointmentPage({ params }: LangParams) {
  const c = await contentFor(params);
  const t = c.t.appointment;
  const [callBefore, callAfter] = t.callNumber.split("{phone}");

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className={`${container} grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]`}>
        <AppointmentForm
          lang={c.lang}
          t={c.t.form}
          greeting={fill(c.t.whatsappGreeting, { name: c.name })}
          hours={c.hours}
          doctorNames={c.doctors.map((doctor) => doctor.name)}
        />

        <aside className="space-y-5">
          <div className="rounded-3xl bg-mist p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-navy">{t.preferTalk}</h2>
            <p className="mt-3 leading-relaxed text-muted">{t.preferTalkText}</p>
            <div className="mt-5 flex flex-col gap-3">
              <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
                <WhatsAppIcon className="size-5" />
                {c.t.chatWhatsApp}
              </a>
              <a href={telLink} className={btnOutline}>
                <Phone className="size-5 shrink-0" aria-hidden="true" />
                <span>
                  {callBefore}
                  <span dir="ltr" className="font-latin">
                    {c.phone}
                  </span>
                  {callAfter}
                </span>
              </a>
            </div>
          </div>

          <ul className="space-y-4 rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
              <span className="text-ink">{fill(t.openLine, { hours: c.hours, days: c.days })}</span>
            </li>
            <li className="flex gap-3">
              <MessageSquareText className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
              <span className="text-ink">{t.confirmNote}</span>
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-muted">{t.emergencyNote}</p>
        </aside>
      </section>
    </>
  );
}
