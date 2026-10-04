/** Shared class strings so buttons and page width stay consistent. */

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

export const btnPrimary = `${btnBase} bg-teal text-white shadow-sm hover:bg-teal-deep hover:shadow-md`;
export const btnWhatsApp = `${btnBase} bg-whatsapp text-navy-deep shadow-sm hover:brightness-95 hover:shadow-md`;
export const btnOutline = `${btnBase} border-2 border-navy text-navy hover:bg-navy hover:text-paper`;
export const btnLight = `${btnBase} bg-paper text-navy shadow-sm hover:bg-white hover:shadow-md`;

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
