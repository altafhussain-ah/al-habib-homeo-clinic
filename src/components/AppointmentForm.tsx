"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { clinic, whatsappLink } from "@/data/clinic";
import type { Ui } from "@/data/ui";
import type { Locale } from "@/i18n";
import { btnOutline, btnWhatsApp } from "@/lib/styles";
import { WhatsAppIcon } from "./icons";

type Fields = { name: string; phone: string; doctor: string; date: string; time: string; concern: string };
type Errors = Partial<Record<keyof Fields, string>>;

type Props = {
  lang: Locale;
  t: Ui["form"];
  /** First line of the WhatsApp message. */
  greeting: string;
  /** Opening hours as shown to visitors, used in the time error. */
  hours: string;
  doctorNames: string[];
};

const empty: Fields = { name: "", phone: "", doctor: "", date: "", time: "", concern: "" };

function todayLocal() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function AppointmentForm({ lang, t, greeting, hours, doctorNames }: Props) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): Errors => {
    const found: Errors = {};
    if (fields.name.trim().length < 2) found.name = t.errName;

    const phone = fields.phone.replace(/[\s-]/g, "");
    if (!/^\+?\d{10,13}$/.test(phone)) found.phone = t.errPhone;

    if (!fields.date) found.date = t.errDate;
    else if (fields.date < todayLocal()) found.date = t.errDatePast;

    if (!fields.time) found.time = t.errTime;
    else if (fields.time < clinic.hours.opens || fields.time > clinic.hours.closes)
      found.time = t.errTimeRange.replace("{hours}", hours);

    if (fields.concern.trim().length < 5) found.concern = t.errConcern;
    return found;
  };

  const buildMessage = () => {
    const date = new Date(`${fields.date}T${fields.time}`);
    const locale = lang === "ur" ? "ur-PK" : "en-GB";
    return [
      greeting,
      "",
      `${t.msgName}: ${fields.name.trim()}`,
      `${t.msgPhone}: ${fields.phone.trim()}`,
      `${t.msgDoctor}: ${fields.doctor || t.anyDoctor}`,
      `${t.msgDate}: ${date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
      `${t.msgTime}: ${date.toLocaleTimeString(lang === "ur" ? "ur-PK" : "en-US", { hour: "numeric", minute: "2-digit" })}`,
      `${t.msgConcern}: ${fields.concern.trim()}`,
    ].join("\n");
  };

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const url = whatsappLink(buildMessage());
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div role="status" className="fade-up rounded-3xl border border-navy/10 bg-white p-6 text-center shadow-sm sm:p-10">
        <CheckCircle2 className="mx-auto size-14 text-navy" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-navy">{t.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">{t.sentText}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
            <WhatsAppIcon className="size-5" />
            {t.openAgain}
          </a>
          <button type="button" onClick={() => setSentUrl("")} className={btnOutline}>
            {t.edit}
          </button>
        </div>
      </div>
    );
  }

  const inputClass = (key: keyof Fields) =>
    `mt-2 block min-h-12 w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 ${
      errors[key] ? "border-red-700" : "border-navy/20 hover:border-navy/40"
    }`;
  const labelClass = "block font-semibold text-ink";
  const describedBy = (key: keyof Fields) => (errors[key] ? `${key}-error` : undefined);
  const errorText = (key: keyof Fields) =>
    errors[key] && (
      <p id={`${key}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
        {errors[key]}
      </p>
    );

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="text-sm text-muted">{t.required}</p>

      <div>
        <label htmlFor="name" className={labelClass}>
          {t.name} *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={inputClass("name")}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {t.phone} *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          placeholder="03XX XXXXXXX"
          value={fields.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("phone")}
          className={`${inputClass("phone")} font-latin rtl:text-right`}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor="doctor" className={labelClass}>
          {t.doctor} <span className="font-normal text-muted">{t.optional}</span>
        </label>
        <select
          id="doctor"
          name="doctor"
          value={fields.doctor}
          onChange={(event) => update("doctor", event.target.value)}
          className={inputClass("doctor")}
        >
          <option value="">{t.anyDoctor}</option>
          {doctorNames.map((doctor) => (
            <option key={doctor} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>
            {t.date} *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={fields.date}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date")}
            className={`${inputClass("date")} font-latin`}
          />
          {errorText("date")}
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>
            {t.time} *
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            min={clinic.hours.opens}
            max={clinic.hours.closes}
            value={fields.time}
            onChange={(event) => update("time", event.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={describedBy("time")}
            className={`${inputClass("time")} font-latin`}
          />
          {errorText("time")}
        </div>
      </div>

      <div>
        <label htmlFor="concern" className={labelClass}>
          {t.concern} *
        </label>
        <textarea
          id="concern"
          name="concern"
          rows={4}
          required
          value={fields.concern}
          onChange={(event) => update("concern", event.target.value)}
          aria-invalid={Boolean(errors.concern)}
          aria-describedby={describedBy("concern")}
          className={inputClass("concern")}
        />
        {errorText("concern")}
      </div>

      <button type="submit" className={`${btnWhatsApp} w-full`}>
        <WhatsAppIcon className="size-5" />
        {t.submit}
      </button>
      <p className="text-sm leading-relaxed text-muted">{t.privacy}</p>
    </form>
  );
}
