/**
 * All clinic content lives in this file.
 * Edit text, timings, doctors, services, and FAQs here; no component changes needed.
 *
 * Anything written in [square brackets] is a placeholder waiting for real
 * information from the clinic. Search this file for "[" to find them all.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://al-habib-homeo-clinic.vercel.app";

export const clinic = {
  /** Name and address match the clinic's Google Maps listing exactly. Keep them identical everywhere. */
  name: "Al-Habib Homeo Clinic & Store",
  tagline: "Gentle homeopathic care for your whole family",
  /** Year the clinic opened. */
  founded: 2006,
  description:
    "Al-Habib Homeo Clinic & Store offers homeopathic consultation for patients of all ages in Usman Town, Jhangi Sayedan, Islamabad. Open every day, 9 AM to 9 PM. Book on WhatsApp.",
  address: {
    street: "Opposite Jamia Masjid Saddique Akbar",
    area: "Usman Town, Jhangi Sayedan",
    city: "Islamabad",
    postalCode: "44000",
    country: "Pakistan",
    countryCode: "PK",
  },
  phoneDisplay: "0315-5285462",
  phoneTel: "+923155285462",
  /** International format without "+" for wa.me links. */
  whatsapp: "923155285462",
  /** Leave empty to hide email across the site. */
  email: "",
  hours: {
    display: "9:00 AM – 9:00 PM",
    opens: "09:00",
    closes: "21:00",
    /** Shown next to the timings. */
    days: "Monday – Sunday",
    /**
     * Used for search-engine structured data. Fill in once the days are confirmed,
     * e.g. ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].
     */
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  /** The clinic's exact position, taken from its Google Maps listing. */
  geo: { latitude: 33.6232732, longitude: 72.9468874 },
  /** The clinic's Google Maps listing ("Al-Habib Homeo Clinic & Store"). Opened by "Get directions". */
  mapUrl: "https://maps.app.goo.gl/vdqrS57JRsV8EQQd8",
  /** ID of that Google listing. The embedded map uses it to show the clinic's name on the marker. */
  mapCid: "11614078577023004067",
};

export const fullAddress = `${clinic.address.street}, ${clinic.address.area}, ${clinic.address.city}`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${clinic.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage =
  "Assalam-o-Alaikum, I would like to book an appointment at Al-Habib Homeo Clinic & Store.";

export const telLink = `tel:${clinic.phoneTel}`;

export const mapEmbedUrl = `https://www.google.com/maps?cid=${clinic.mapCid}&z=17&output=embed`;
export const mapDirectionsUrl = clinic.mapUrl;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export type Doctor = {
  name: string;
  initials: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
  /** Path under /public, e.g. "/doctors/tariq-masood.jpg". Empty shows initials. */
  photo: string;
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Tariq Masood",
    initials: "TM",
    role: "Homeopathic Doctor",
    qualification: "DHMS",
    experience: "20+ years",
    bio: "Dr. Tariq Masood has been serving patients for more than 20 years. He sees patients of all ages for both recent complaints and long-standing conditions.",
    photo: "",
  },
  {
    name: "Dr. Altaf Hussain",
    initials: "AH",
    role: "Homeopathic Doctor",
    qualification: "DHMS",
    experience: "Since 2020",
    bio: "Dr. Altaf Hussain has been serving patients since 2020. He sees patients of all ages for both recent complaints and long-standing conditions.",
    photo: "",
  },
];

export const stats = [
  { value: 20, suffix: "+", label: "Years serving patients" },
  { value: 2, suffix: "", label: "DHMS-qualified doctors" },
  { value: 7, suffix: "", label: "Days a week, 9 AM to 9 PM" },
];

/** Areas of care and the full list of conditions are in services.ts. */
export * from "./services";

export const reasons = [
  {
    title: "Two doctors, one clinic",
    text: "Dr. Tariq Masood and Dr. Altaf Hussain both consult here, so there is usually a doctor available when you visit.",
  },
  {
    title: "Open every day, 9 AM to 9 PM",
    text: "We are open Monday to Sunday, so you can come before work, after school, in the evening, or at the weekend.",
  },
  {
    title: "Care for all ages",
    text: "Children, adults, and elders are all welcome, so one clinic can look after the whole family.",
  },
  {
    title: "Book on WhatsApp",
    text: "Send a message with your name and preferred time. No app, account, or online payment is needed.",
  },
];

export const steps = [
  {
    title: "Book your visit",
    text: "Message us on WhatsApp, call, or fill in the short appointment form.",
  },
  {
    title: "Tell us your story",
    text: "The doctor asks about your symptoms, your history, your routine, and any medicines you take.",
  },
  {
    title: "Receive your remedy",
    text: "You get a homeopathic prescription chosen for you, with clear instructions on how to take it.",
  },
  {
    title: "Follow up",
    text: "We review how you are doing at the next visit and adjust the treatment if needed.",
  },
];

/**
 * Real patient feedback only, used with the patient's permission.
 * While this list is empty the "What our patients say" section stays hidden.
 * To show it, add entries like: { quote: "…", name: "A. K." },
 */
export const testimonials: { quote: string; name: string }[] = [];

export const clinicStory =
  "Al-Habib Homeo Clinic & Store opened in 2006 and has served families in Usman Town and Jhangi Sayedan ever since. Dr. Tariq Masood has been treating patients for more than 20 years, and Dr. Altaf Hussain has been serving patients since 2020.";

export const faqs = [
  {
    question: "What is homeopathy?",
    answer:
      "Homeopathy is a system of medicine that uses highly diluted remedies chosen for the individual patient. The doctor looks at your symptoms, history, and general health together, then selects a remedy to match.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Booking ahead helps us keep your wait short. Send us a WhatsApp message or call, and we will confirm a time between 9 AM and 9 PM, any day of the week.",
  },
  {
    question: "What happens in the first consultation?",
    answer:
      "The doctor asks detailed questions about your complaint, your past health, your diet, sleep, and routine. This usually takes longer than a follow-up visit. You then receive your medicine with instructions.",
  },
  {
    question: "What should I bring with me?",
    answer:
      "Please bring any recent test reports, scans, and a list of the medicines you currently take. For children, bring their vaccination card if you have it.",
  },
  {
    question: "Can I take homeopathic medicine with my regular medicines?",
    answer:
      "Tell the doctor about everything you take. Do not stop or change any prescribed medicine without first speaking to the doctor who prescribed it.",
  },
  {
    question: "How long will treatment take?",
    answer:
      "It depends on the condition, how long you have had it, and how you respond. The doctor will give you an honest idea at your visit. We do not promise or guarantee results.",
  },
  {
    question: "Do you see children and elderly patients?",
    answer: "Yes. We see patients of all ages, from infants to elders.",
  },
  {
    question: "Do you handle emergencies?",
    answer:
      "No. The clinic is not an emergency facility. For chest pain, difficulty breathing, serious injury, heavy bleeding, or any other emergency, go to the nearest hospital straight away.",
  },
  {
    question: "What are the consultation charges?",
    answer:
      "Please call or message us on WhatsApp and we will tell you the current consultation and medicine charges.",
  },
];

export const disclaimer =
  "The information on this website is for general understanding only and is not a substitute for professional medical advice, diagnosis, or treatment. Results vary from person to person and no outcome is guaranteed. Do not stop any prescribed medicine without consulting your doctor. In an emergency, go to the nearest hospital.";
