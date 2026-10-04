import Link from "next/link";
import { ui } from "@/data/ui";
import { btnPrimary, container } from "@/lib/styles";

/** A not-found page cannot read the URL's language, so it shows both. */
export default function NotFound() {
  return (
    <section className={`${container} py-24 text-center`}>
      <p className="text-sm font-bold uppercase tracking-widest text-teal-deep">{ui.en.notFound.eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">{ui.en.notFound.title}</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">{ui.en.notFound.text}</p>
      <p lang="ur" dir="rtl" className="mx-auto mt-4 max-w-md text-lg text-muted">
        {ui.ur.notFound.title}۔ {ui.ur.notFound.text}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className={btnPrimary}>
          {ui.en.notFound.home}
        </Link>
        <Link href="/ur" lang="ur" className={btnPrimary}>
          {ui.ur.notFound.home}
        </Link>
      </div>
    </section>
  );
}
