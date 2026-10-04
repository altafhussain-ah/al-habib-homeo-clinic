import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { telLink } from "@/data/clinic";
import type { Content } from "@/data/content";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button on larger screens; a full action bar on phones. */
export function FloatingActions({ c }: { c: Content }) {
  const barItem = "flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-sm font-semibold active:scale-95 transition-transform";

  return (
    <>
      <a
        href={c.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={c.t.chatWhatsApp}
        className="fixed bottom-6 right-6 z-30 hidden size-15 place-items-center rounded-full bg-whatsapp text-navy-deep shadow-lg transition duration-200 hover:scale-110 hover:shadow-xl md:grid"
      >
        <WhatsAppIcon className="size-8" />
      </a>

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-navy/15 bg-paper shadow-[0_-4px_16px_rgba(11,33,54,0.08)] md:hidden"
      >
        <a href={telLink} className={`${barItem} text-navy`}>
          <Phone className="size-5" aria-hidden="true" />
          {c.t.call}
        </a>
        <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${barItem} bg-whatsapp text-navy-deep`}>
          <WhatsAppIcon className="size-5" />
          {c.t.whatsapp}
        </a>
        <Link href={c.href("/appointment")} className={`${barItem} bg-teal text-white`}>
          <CalendarCheck className="size-5" aria-hidden="true" />
          {c.t.book}
        </Link>
      </nav>
    </>
  );
}
