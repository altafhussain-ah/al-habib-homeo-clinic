"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Condition = { name: string; english: string; slug: string; area: string };
type Labels = { label: string; placeholder: string; none: string; count: string; letters: string };

/** Searchable A–Z list of every condition. Each name links to its area of care. */
export function ConditionSearch({
  conditions,
  labels,
  basePath,
}: {
  conditions: Condition[];
  labels: Labels;
  /** "/services" in English, "/ur/services" in Urdu. */
  basePath: string;
}) {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    // A search matches the name in either language, so "migraine" also works on the Urdu page.
    const matches = term
      ? conditions.filter((item) => item.name.toLowerCase().includes(term) || item.english.toLowerCase().includes(term))
      : conditions;
    const byLetter = new Map<string, Condition[]>();
    for (const item of matches) {
      const letter = item.name[0].toUpperCase();
      byLetter.set(letter, [...(byLetter.get(letter) ?? []), item]);
    }
    return { total: matches.length, letters: [...byLetter.entries()] };
  }, [conditions, query]);

  return (
    <div>
      <label htmlFor="condition-search" className="block font-semibold text-ink">
        {labels.label}
      </label>
      <div className="relative mt-2 max-w-xl">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id="condition-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.placeholder}
          autoComplete="off"
          className="block min-h-12 w-full rounded-full border-2 border-navy/20 bg-white py-3 pe-5 ps-12 text-base text-ink placeholder:text-muted/70 hover:border-navy/40"
        />
      </div>
      <p role="status" className="mt-3 text-sm text-muted">
        {groups.total === 0 ? labels.none : labels.count.replace("{count}", String(groups.total))}
      </p>

      <div className="mt-6 space-y-6">
        {groups.letters.map(([letter, items]) => (
          <section key={letter} aria-label={labels.letters.replace("{letter}", letter)} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
            <p aria-hidden="true" className="font-display text-3xl font-semibold text-teal-deep">
              {letter}
            </p>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={`${item.slug}-${item.english}`}>
                  <Link
                    href={`${basePath}/${item.slug}`}
                    title={item.area}
                    className="inline-flex min-h-11 items-center rounded-full border border-navy/15 bg-white px-4 py-2 text-[15px] text-ink transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:text-teal-deep hover:shadow-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
