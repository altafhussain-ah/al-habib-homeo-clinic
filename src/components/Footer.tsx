import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { telLink, whatsappLink } from "@/data/clinic";
import type { Content } from "@/data/content";
import { fill, logos } from "@/i18n";
import { container } from "@/lib/styles";
import { WhatsAppIcon } from "./icons";

export function Footer({ c }: { c: Content }) {
  const linkClass = "inline-flex min-h-11 items-center gap-2.5 text-paper/90 underline-offset-4 hover:text-white hover:underline";

  return (
    <footer className="on-dark bg-navy-deep text-paper">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.3fr]`}>
        <div>
          {/* The logo has dark lettering, so it sits on a light plate against the dark footer. */}
          <span className="inline-block rounded-2xl bg-paper px-4 py-3">
            <Image {...logos[c.lang]} alt={c.name} className="h-12 w-auto" />
          </span>
          <p className="mt-4 max-w-sm leading-relaxed text-paper/80">{fill(c.t.footer.about, { area: c.area, city: c.city })}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg font-semibold">{c.t.footer.quickLinks}</h2>
          <ul className="mt-3">
            {[...c.nav, { href: c.href("/appointment"), label: c.t.bookAppointment }].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-semibold">{c.t.footer.visitContact}</h2>
          <ul className="mt-3">
            <li className="flex min-h-11 items-start gap-2.5 py-2 text-paper/90">
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {c.fullAddress}
            </li>
            <li className="flex min-h-11 items-start gap-2.5 py-2 text-paper/90">
              <Clock className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {`${c.hours}${c.lang === "ur" ? "، " : ", "}${c.days}`}
            </li>
            <li>
              <a href={telLink} className={linkClass}>
                <Phone className="size-5 shrink-0" aria-hidden="true" />
                <span dir="ltr" className="font-latin">
                  {c.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <WhatsAppIcon className="size-5 shrink-0" />
                {c.t.chatWhatsApp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className={`${container} space-y-3 py-6 text-sm leading-relaxed text-paper/75`}>
          <p>
            <strong className="font-semibold text-paper">{c.t.footer.disclaimerLabel}</strong> {c.disclaimer}
          </p>
          <p>{fill(c.t.footer.rights, { year: new Date().getFullYear(), name: c.name })}</p>
        </div>
      </div>
    </footer>
  );
}
