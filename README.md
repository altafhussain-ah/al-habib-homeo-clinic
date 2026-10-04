# Al-Habib Homeo Clinic & Store website

Website for Al-Habib Homeo Clinic & Store, Usman Town, Jhangi Sayedan, Islamabad.
Built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the production site |
| `npm run start` | Serves the production build |
| `npm run lint` | Checks the code for problems |

## Change the content

The site is in two languages: English at `/` and Urdu at `/ur`. A button in the header
switches between them.

| What | English | Urdu |
|---|---|---|
| Clinic details, doctors, timings, FAQs | `src/data/clinic.ts` | `src/data/ur.ts` |
| Areas of care and conditions | `src/data/services.ts` | `src/data/ur.ts` (`urServices`, `urConditions`) |
| Buttons, headings, and other page text | `src/data/ui.ts` (`en`) | `src/data/ui.ts` (`ur`) |

When you change English text, change the matching Urdu text too. Facts that are the same
in both languages (phone number, map link, opening times used by the form) are only in
`clinic.ts`.

To add a condition, add its English name to the right list in `services.ts` and its Urdu
name to `urConditions` in `ur.ts`. A condition without an Urdu name is shown in English
on the Urdu pages.

Still to add:

- Patient testimonials: the section is hidden until you add real quotes (with permission) to `testimonials` in `clinic.ts`
- Email address (leave empty to keep it hidden)

To add doctor photos, put the image in `public/doctors/` and set the `photo`
field, for example `photo: "/doctors/tariq-masood.jpg"`. Square photos of at
least 400×400 pixels work best. Until then the site shows the doctor's initials.

## How the appointment form works

There is no backend or database. When a patient submits the form, the site
checks the fields and opens WhatsApp with a message already written to
0315-5285462. The patient presses Send. Nothing is stored on the website.

## The assistant (chat)

The "Ask a question" assistant answers visitors' questions about timings, location,
doctors, booking, and conditions. It is free to run: it works inside the visitor's
browser by matching keywords against the clinic's own data, and it does not use any
paid AI service or send messages anywhere.

It understands English, Roman Urdu, and Urdu, and replies in the same way the visitor writes. Its answers and keyword lists are in
`src/lib/assistant.ts`. To teach it a new Roman Urdu word for a complaint, add it to
the `aliases` list there. It never suggests medicines, and it sends emergencies to a
hospital.

## Project structure

```
src/
  site/                The pages themselves, written once and shared by both languages
  app/(en)/            English routes ("/", "/about", ...): thin files that show src/site in English
  app/ur/              Urdu routes ("/ur", "/ur/about", ...): the same pages in Urdu
  components/          Header, footer, form, chat, animations, shared sections
  data/                All content: clinic.ts, services.ts, ur.ts, ui.ts
  lib/assistant.ts     The chat assistant's answers and keywords
  i18n.ts              Language list and URL helpers
```

## Publishing changes

The site is hosted on Vercel and connected to this GitHub repository. Every change
pushed to the `main` branch is built and published automatically within a minute or two:

```bash
git add -A
git commit -m "Describe the change"
git push
```

Live site: https://al-habib-homeo-clinic.vercel.app

If you later use your own domain, add an environment variable in Vercel named
`NEXT_PUBLIC_SITE_URL` with that address (for example `https://www.example.com`) and
redeploy, so the sitemap and search-engine data point to the right address.

## After launch

- Create or claim the clinic's Google Business Profile and use exactly the same
  name, address, and phone number as this site.
- Submit `https://your-address/sitemap.xml` in Google Search Console.
