import { clinic } from "@/data/clinic";
import { getContent } from "@/data/content";
import { localePath, type Locale } from "@/i18n";

/**
 * The website assistant. It runs entirely in the visitor's browser and answers
 * from the clinic's own data by matching keywords, so it is free to run and
 * sends nothing to any outside service.
 *
 * It understands English, Roman Urdu, and Urdu. To teach it a new word, add it
 * to the relevant list below.
 */

export type Reply = { text: string; links?: { label: string; href: string }[] };

const english = getContent("en");
const urdu = getContent("ur");

/** Everyday words for common complaints, mapped to a condition name in services.ts. */
const aliases: Record<string, string> = {
  "sar dard": "Headaches", "sir dard": "Headaches", "sar mein dard": "Headaches", "sir mein dard": "Headaches", headache: "Headaches",
  "سر میں درد": "Headaches", "سردرد": "Headaches",
  "adha sar": "Migraine", "aadha sar": "Migraine", "مائیگرین": "Migraine", "آدھے سر": "Migraine",
  "baal girna": "Hair fall", "baal gir": "Hair fall", "balon ka girna": "Hair fall", "hair fall": "Hair fall", hairfall: "Hair fall", "hair loss": "Hair fall",
  "بال گر": "Hair fall", "بالوں کا گرنا": "Hair fall",
  ganjapan: "Balding",
  khushki: "Dandruff", sikri: "Dandruff", "خشکی": "Dandruff", "سکری": "Dandruff",
  kabz: "Constipation", qabz: "Constipation",
  khansi: "Cough", khaansi: "Cough",
  bukhar: "Fever", bukhaar: "Fever",
  tezabiyat: "Heartburn", acidity: "Heartburn", "seene ki jalan": "Heartburn", "maiday ki jalan": "Heartburn", "تیزابیت": "Heartburn", "معدے کی جلن": "Heartburn",
  sugar: "Diabetes", shugar: "Diabetes", "شوگر": "Diabetes", "ذیابیطس": "Diabetes",
  "blood pressure": "High blood pressure", bp: "High blood pressure", "بلڈ پریشر": "High blood pressure",
  "jor dard": "Joint pains", "joron ka dard": "Joint pains", "joron mein dard": "Joint pains", "joint pain": "Joint pains", "joint pains": "Joint pains", "جوڑوں میں درد": "Joint pains",
  "kamar dard": "Back pain", "kamar mein dard": "Back pain", "kamar ka dard": "Back pain", "کمر میں درد": "Back pain", "کمر کا درد": "Back pain",
  "ghutne ka dard": "Knee pain", "ghutnon ka dard": "Knee pain", "ghutno mein dard": "Knee pain", "گھٹنوں کا درد": "Knee pain", "گھٹنوں میں درد": "Knee pain",
  pathri: "Kidney stones", "gurde ki pathri": "Kidney stones", "kidney stone": "Kidney stones", "پتھری": "Kidney stones",
  "pitte ki pathri": "Gallstones",
  bawaseer: "Piles", bawasir: "Piles", hemorrhoids: "Piles",
  kharish: "Itching", khujli: "Itching", "کھجلی": "Itching",
  dama: "Asthma", damma: "Asthma",
  nazla: "Common cold", zukam: "Common cold", zukaam: "Common cold", "نزلہ": "Common cold", "زکام": "Common cold",
  daad: "Ringworm",
  chambal: "Psoriasis",
  motapa: "Overweight", "weight loss": "Overweight", "wazan kam": "Overweight", "وزن کم": "Overweight",
  "neend nahi": "Insomnia", "neend na aana": "Insomnia", "sleep problem": "Insomnia", "نیند نہیں": "Insomnia",
  tension: "Stress", pareshani: "Stress", "zehni dabao": "Stress", "ٹینشن": "Stress", "پریشانی": "Stress",
  ghabrahat: "Anxiety", "گھبراہٹ": "Anxiety",
  "pait dard": "Gas", "pet dard": "Gas", "pait mein dard": "Gas", "pet mein dard": "Gas", "stomach pain": "Gas", "پیٹ میں درد": "Gas", "پیٹ درد": "Gas",
  badhazmi: "Indigestion",
  muhase: "Acne", muhasay: "Acne", keel: "Acne", pimples: "Acne", pimple: "Acne", daane: "Acne", "مہاسے": "Acne", "دانے": "Acne",
  chaiyan: "Facial pigmentation", jhaiyan: "Facial pigmentation", "چھائیاں": "Facial pigmentation",
  yarqan: "Jaundice", "peela yarqan": "Jaundice",
  mirgi: "Epilepsy",
  masse: "Warts", mohke: "Warts",
  "gale ki kharabi": "Sore throat", "gala kharab": "Sore throat", "گلا خراب": "Sore throat",
  "kaan dard": "Ear pain", "kaan mein dard": "Ear pain", "کان میں درد": "Ear pain",
  "daant dard": "Toothache", "dant dard": "Toothache", "دانت میں درد": "Toothache",
  chakkar: "Vertigo and dizziness", "چکر": "Vertigo and dizziness",
  kamzori: "Weakness",
  thyroid: "Hypothyroidism", "تھائیرائڈ": "Hypothyroidism",
  likoria: "Leucorrhoea", leucorrhea: "Leucorrhoea",
  mahwari: "Painful periods", haiz: "Painful periods", "ماہواری": "Painful periods", "حیض": "Painful periods",
  banjhpan: "Infertility", aulad: "Infertility", "اولاد": "Infertility",
  "peshab ki jalan": "Burning urination", "peshab mein jalan": "Burning urination",
  "bistar par peshab": "Bedwetting",
  sinus: "Sinusitis", "سائنس": "Sinusitis",
  eczema: "Eczema",
  allergy: "Allergies",
  "pait ke keere": "Worms", "pet ke keere": "Worms",
  dast: "Loose stools", motions: "Loose stools",
  ulti: "Vomiting", qai: "Vomiting", "قے": "Vomiting",
};

const words = {
  emergency: [
    "emergency", "chest pain", "seene mein dard", "seenay mein dard", "heart attack", "dil ka daura", "stroke", "falij",
    "saans nahi", "saans band", "saans ruk", "cannot breathe", "can't breathe", "cant breathe", "difficulty breathing",
    "behosh", "unconscious", "fainted", "heavy bleeding", "khoon beh", "bohat khoon", "accident", "zehar", "poison",
    "suicide", "khudkushi", "kill myself", "marna chahta", "marna chahti", "fits", "daura par",
    "ایمرجنسی", "سینے میں درد", "ہارٹ اٹیک", "دل کا دورہ", "فالج", "سانس نہیں", "سانس بند", "سانس رک", "بے ہوش", "بیہوش",
    "خون بہ", "بہت خون", "حادثہ", "زہر", "خودکشی", "مرنا چاہت",
  ],
  timings: [
    "timing", "timings", "time", "open", "opening", "close", "closed", "hours", "khula", "khulta", "khulti", "khulne", "band", "kab", "auqat", "waqt", "sunday", "itwar", "juma", "friday", "chutti", "holiday",
    "اوقات", "ٹائم", "وقت", "کب", "کھلا", "کھلتا", "کھلتی", "بند", "اتوار", "جمعہ", "چھٹی",
  ],
  location: ["where", "address", "location", "located", "map", "directions", "kahan", "kidhar", "pata", "rasta", "raasta", "jagah", "masjid", "کہاں", "کدھر", "پتہ", "پتا", "راستہ", "مقام", "نقشہ", "ایڈریس", "لوکیشن", "جگہ"],
  booking: ["book", "booking", "appointment", "appointments", "visit", "milna", "mulaqat", "number lagana", "time lena", "checkup", "check up", "dikhana", "اپائنٹمنٹ", "ملاقات", "وقت لینا", "وقت لوں", "بکنگ", "نمبر لگ", "چیک اپ", "دکھانا"],
  fees: ["fee", "fees", "charges", "charge", "price", "cost", "paise", "paisay", "rupees", "rupay", "kitne ka", "kitni fees", "free", "فیس", "چارجز", "پیسے", "قیمت", "خرچ", "روپے"],
  doctors: ["doctor", "doctors", "dr", "daktar", "qualification", "qualified", "experience", "tajurba", "tariq", "altaf", "dhms", "lady doctor", "ڈاکٹر", "تعلیم", "تجربہ", "طارق", "الطاف"],
  contact: ["phone", "number", "whatsapp", "call", "contact", "rabta", "mobile", "email", "فون", "نمبر", "واٹس ایپ", "رابطہ", "کال", "موبائل"],
  medicine: ["medicine", "medicines", "remedy", "remedies", "dose", "dosage", "dawa", "dawai", "dawaai", "dawaiyan", "nuskha", "ilaj batao", "treatment batao", "prescribe", "kya loon", "kya khaon", "دوا", "دوائی", "نسخہ", "خوراک", "علاج بتا"],
  homeopathy: ["homeopathy", "homeopathic", "homeo", "side effect", "side effects", "safe", "nuqsan", "ہومیوپیتھی", "ہومیو", "نقصان", "محفوظ"],
  children: ["child", "children", "kid", "kids", "baby", "babies", "infant", "bacha", "bachay", "bache", "bachon", "bachi", "elderly", "buzurg", "old age", "بچہ", "بچے", "بچوں", "بچی", "بزرگ"],
  greeting: ["hi", "hello", "hey", "salam", "salaam", "assalam", "aoa", "assalamualaikum", "سلام", "السلام"],
  thanks: ["thanks", "thank", "shukria", "shukriya", "jazakallah", "meharbani", "شکریہ", "جزاک", "مہربانی"],
  romanUrdu: ["hai", "hain", "kya", "kab", "kahan", "kidhar", "kaise", "kaisay", "kesay", "mujhe", "mujhy", "mera", "meri", "nahi", "nahin", "chahiye", "chahye", "batao", "bataye", "batayen", "kitni", "kitne", "aap", "liye", "karna", "karwana", "ho", "hota", "hoti", "mein", "ka", "ki", "ke", "ko", "se", "shukria", "shukriya", "meharbani", "jazakallah"],
};

const urduScript = /[؀-ۿ]/;

function normalise(input: string) {
  return ` ${input.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s']/gu, " ").replace(/\s+/g, " ").trim()} `;
}

/**
 * True when any of the words appears in the text. English and Roman Urdu words
 * must match as whole words; Urdu words may carry endings, so they match anywhere.
 */
function has(text: string, list: string[]) {
  return list.some((item) => (urduScript.test(item) || item.includes(" ") ? text.includes(item) : text.includes(` ${item} `)));
}

const keysOf = (name: string) =>
  name.toLowerCase().split(/[()]/).map((part) => part.replace(/[^\p{L}\p{M}\p{N}\s']/gu, " ").trim()).filter((part) => part.length > 2);

// Each condition can be found by its English or its Urdu name. "Hives (urticaria)" matches "hives" and "urticaria".
const conditionIndex = urdu.allConditions.map((item) => ({
  english: item.english,
  slug: item.slug,
  keys: [...keysOf(item.english), ...keysOf(item.name)],
}));

function findCondition(text: string) {
  let best = "";
  let bestLength = 0;
  for (const item of conditionIndex) {
    for (const key of item.keys) {
      if (key.length > bestLength && text.includes(` ${key} `)) {
        best = item.english;
        bestLength = key.length;
      }
    }
  }
  for (const [alias, name] of Object.entries(aliases)) {
    const found = urduScript.test(alias) ? text.includes(alias) : text.includes(` ${alias} `);
    if (alias.length > bestLength && found) {
      best = name;
      bestLength = alias.length;
    }
  }
  return best;
}

function findFaq(text: string, faqs: { question: string; answer: string }[]) {
  const tokens = new Set(text.trim().split(" ").filter((token) => token.length > 3));
  let best: { question: string; answer: string } | null = null;
  let bestScore = 1;
  for (const faq of faqs) {
    const score = normalise(faq.question).trim().split(" ").filter((token) => tokens.has(token)).length;
    if (score > bestScore) {
      best = faq;
      bestScore = score;
    }
  }
  return best;
}

/** `lang` is the language of the page the visitor is on; links in the reply stay in that language. */
export function answer(question: string, lang: Locale): Reply {
  const text = normalise(question);

  // Reply in the visitor's own writing: Urdu script, Roman Urdu, or English.
  const mode = urduScript.test(question) ? "ur" : has(text, words.romanUrdu) ? "roman" : /[a-z]/i.test(question) ? "en" : lang === "ur" ? "ur" : "en";
  const say = (en: string, roman: string, ur: string) => (mode === "ur" ? ur : mode === "roman" ? roman : en);
  const c = mode === "ur" ? urdu : english;
  const page = lang === "ur" ? urdu : english;

  const link = (label: string, path: string) => ({ label, href: localePath(lang, path) });
  const bookLink = link(page.t.bookAppointment, "/appointment");
  const contactLink = link(page.t.nav.contact, "/contact");
  const faqLink = link(page.t.home.seeAllQuestions, "/faq");
  const phone = clinic.phoneDisplay;

  if (has(text, words.emergency)) {
    return {
      text: say(
        "This sounds like it could be an emergency. Please go to the nearest hospital right now. Our clinic is not an emergency facility.",
        "Yeh emergency ho sakti hai. Meharbani kar ke foran qareebi hospital jayein. Hamara clinic emergency ke liye nahi hai.",
        "یہ ایمرجنسی ہو سکتی ہے۔ براہ کرم فوراً قریبی ہسپتال جائیں۔ ہمارا کلینک ایمرجنسی کے لیے نہیں ہے۔",
      ),
    };
  }

  const conditionName = findCondition(text);
  if (conditionName) {
    const shown = c.allConditions.find((item) => item.english === conditionName);
    const linked = page.allConditions.find((item) => item.english === conditionName);
    if (shown && linked) {
      const areaLink = link(linked.area, `/services/${linked.slug}`);
      if (shown.slug === "supportive-care") {
        return {
          text: say(
            `${shown.name} needs treatment from a hospital or specialist first. Alongside that treatment, and during recovery, our doctors offer supportive homeopathic care. If the patient is getting worse, please go to a hospital straight away.`,
            `${shown.name} ka pehla ilaj hospital ya specialist karta hai. Us ilaj ke saath aur sehatyabi ke dauran hamare doctors madadgar homeopathic ilaj dete hain. Agar mareez ki halat bigar rahi ho to foran hospital jayein.`,
            `${shown.name} کا پہلا علاج ہسپتال یا ماہر ڈاکٹر کرتا ہے۔ اس علاج کے ساتھ اور صحت یابی کے دوران ہمارے ڈاکٹر معاون ہومیوپیتھک علاج دیتے ہیں۔ اگر مریض کی حالت بگڑ رہی ہو تو فوراً ہسپتال جائیں۔`,
          ),
          links: [areaLink],
        };
      }
      return {
        text: say(
          `Yes, our doctors see patients for ${shown.name.toLowerCase()} (${shown.area}). I cannot suggest a medicine here, because the doctor needs to hear your full history first. You can visit any day, ${c.hours}.`,
          `Ji, hamare doctors ${shown.name.toLowerCase()} ke mareez dekhte hain (${shown.area}). Main yahan dawa nahi bata sakta, kyunke doctor pehle aap ki poori history sunte hain. Aap kisi bhi din ${c.hours} ke darmiyan aa sakte hain.`,
          `جی، ہمارے ڈاکٹر ${shown.name} کے مریض دیکھتے ہیں (${shown.area})۔ میں یہاں دوا نہیں بتا سکتا، کیونکہ ڈاکٹر پہلے آپ کی پوری ہسٹری سنتے ہیں۔ آپ کسی بھی دن ${c.hours} آ سکتے ہیں۔`,
        ),
        links: [areaLink, bookLink],
      };
    }
  }

  const faq = findFaq(text, c.faqs);
  if (faq) return { text: faq.answer, links: [faqLink] };

  if (has(text, words.children)) {
    return {
      text: say(
        "Yes. We see patients of all ages, from infants to elders, and children are welcome at the clinic.",
        "Ji haan. Hum har umar ke mareez dekhte hain, bachon se le kar buzurgon tak.",
        "جی ہاں۔ ہم بچوں سے لے کر بزرگوں تک ہر عمر کے مریض دیکھتے ہیں۔",
      ),
      links: [link(page.services.find((service) => service.slug === "child-health")?.title ?? "", "/services/child-health"), bookLink],
    };
  }

  if (has(text, words.medicine)) {
    return {
      text: say(
        "I cannot suggest medicines or doses. The doctor chooses a remedy after asking about your symptoms and history. Please book a visit or message the clinic.",
        "Main dawa ya khurak nahi bata sakta. Doctor aap ki alamaat aur history pooch kar dawa tajweez karte hain. Meharbani kar ke appointment lein ya clinic ko message karein.",
        "میں دوا یا خوراک نہیں بتا سکتا۔ ڈاکٹر آپ کی علامات اور ہسٹری پوچھ کر دوا تجویز کرتے ہیں۔ براہ کرم اپائنٹمنٹ لیں یا کلینک کو پیغام بھیجیں۔",
      ),
      links: [bookLink],
    };
  }

  if (has(text, words.fees)) {
    return {
      text: say(
        `Please call or WhatsApp ${phone} and the clinic will tell you the current consultation and medicine charges.`,
        `Fees aur dawa ke charges ke liye ${phone} par call ya WhatsApp karein, clinic aap ko bata de ga.`,
        `فیس اور دوا کے چارجز کے لیے ${phone} پر کال یا واٹس ایپ کریں، کلینک آپ کو بتا دے گا۔`,
      ),
    };
  }

  if (has(text, words.booking)) {
    return {
      text: say(
        `Fill in the short form on the Book Appointment page and it opens WhatsApp with your details. You can also call or WhatsApp ${phone}. Your appointment is confirmed when the clinic replies.`,
        `Book Appointment wale page par chhota sa form bharein; woh aap ki tafseel ke saath WhatsApp khol de ga. Aap ${phone} par call ya WhatsApp bhi kar sakte hain. Clinic ke jawab par appointment pakki hoti hai.`,
        `اپائنٹمنٹ والے صفحے پر مختصر فارم بھریں؛ واٹس ایپ آپ کی تفصیل کے ساتھ کھل جائے گا۔ آپ ${phone} پر کال یا واٹس ایپ بھی کر سکتے ہیں۔ کلینک کے جواب پر آپ کا وقت پکا ہو جاتا ہے۔`,
      ),
      links: [bookLink],
    };
  }

  if (has(text, words.location)) {
    return {
      text: say(`We are at: ${c.fullAddress}.`, `Hamara pata: ${c.fullAddress}.`, `ہمارا پتہ: ${c.fullAddress}۔`),
      links: [{ label: "Google Maps", href: clinic.mapUrl }, contactLink],
    };
  }

  if (has(text, words.timings)) {
    return {
      text: say(
        `We are open every day: ${c.hours}, ${c.days}.`,
        `Clinic har roz khula hota hai: ${c.hours}, ${c.days}.`,
        `کلینک روزانہ کھلا رہتا ہے: ${c.hours}، ${c.days}۔`,
      ),
    };
  }

  if (has(text, words.doctors)) {
    const list = c.doctors.map((doctor) => `${doctor.name} (${doctor.qualification}, ${doctor.experience})`).join(mode === "ur" ? " اور " : " and ");
    return {
      text: say(`Our doctors are ${list}.`, `Hamare doctors: ${list}.`, `ہمارے ڈاکٹر: ${list}۔`),
      links: [link(page.t.nav.about, "/about")],
    };
  }

  if (has(text, words.contact)) {
    return {
      text: say(
        `You can call or WhatsApp the clinic on ${phone}.`,
        `Aap clinic ko ${phone} par call ya WhatsApp kar sakte hain.`,
        `آپ کلینک کو ${phone} پر کال یا واٹس ایپ کر سکتے ہیں۔`,
      ),
      links: [contactLink],
    };
  }

  if (has(text, words.homeopathy)) return { text: c.faqs[0].answer, links: [faqLink] };

  if (has(text, words.thanks)) {
    return { text: say("You are welcome. We wish you good health.", "Khush rahein. Allah aap ko sehat de.", "خوش رہیں۔ اللہ آپ کو صحت دے۔") };
  }

  if (has(text, words.greeting)) {
    return {
      text: say(
        "Wa alaikum assalam! Ask me about our timings, location, doctors, booking, or a health concern.",
        "Wa alaikum assalam! Timings, pata, doctors, appointment ya kisi bimari ke bare mein poochein.",
        "وعلیکم السلام! اوقات، پتہ، ڈاکٹرز، اپائنٹمنٹ یا کسی مرض کے بارے میں پوچھیں۔",
      ),
    };
  }

  return {
    text: say(
      `I am not sure about that. You can search the full list of conditions, or call or WhatsApp the clinic on ${phone} for a personal answer.`,
      `Is ka jawab mere paas nahi hai. Aap bimariyon ki poori list dekh sakte hain, ya ${phone} par clinic ko call ya WhatsApp kar ke pooch sakte hain.`,
      `اس کا جواب میرے پاس نہیں ہے۔ آپ امراض کی مکمل فہرست دیکھ سکتے ہیں، یا ${phone} پر کلینک کو کال یا واٹس ایپ کر کے پوچھ سکتے ہیں۔`,
    ),
    links: [link(page.t.services.azEyebrow, "/services#a-z")],
  };
}
