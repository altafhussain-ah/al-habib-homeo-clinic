/**
 * Areas of care and the conditions listed under each.
 * To add a condition, add its name to the right `conditions` list below.
 * It then appears on that area's page and in the A–Z search on the Services page.
 */

export type ServiceIconName =
  | "skin"
  | "breath"
  | "digestive"
  | "joints"
  | "women"
  | "child"
  | "hair"
  | "mind"
  | "ent"
  | "urinary"
  | "nerves"
  | "chronic"
  | "support";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIconName;
  summary: string;
  intro: string;
  conditions: string[];
};

export const services: Service[] = [
  {
    slug: "skin-care",
    title: "Skin Concerns",
    icon: "skin",
    summary: "Homeopathic consultation for recurring and long-standing skin complaints.",
    intro:
      "Skin problems often come and go, and they can affect comfort and confidence. We take a full history of when the problem started, what makes it better or worse, and your general health before suggesting a remedy.",
    conditions: [
      "Acne", "Acne rosacea", "Acne scars", "Athlete's foot", "Atopic dermatitis", "Barber's itch", "Bed sores",
      "Body odour", "Boils", "Bullous pemphigoid", "Carbuncle", "Chilblains", "Cold sores (fever blisters)", "Corns",
      "Cracked skin", "Cystic acne", "Dark circles", "Dry skin", "Eczema", "Excessive sweating",
      "Facial pigmentation", "Felon (fingertip infection)", "Folliculitis", "Freckles", "Fungal skin infection",
      "Genital herpes", "Genital warts", "Guttate psoriasis", "Heat rash", "Hives (urticaria)", "Hyperkeratosis",
      "Ichthyosis", "Impetigo", "Ingrown toenails", "Intertrigo", "Itching", "Jock itch", "Keloids", "Leucoderma",
      "Lichen planus", "Lipoma", "Moles", "Molluscum contagiosum", "Nail fungus", "Photodermatitis", "Plantar warts",
      "Psoriasis", "Ringworm", "Scabies", "Scars", "Seborrheic dermatitis", "Seborrheic keratosis", "Shingles",
      "Skin rashes", "Sunburn", "Tinea versicolor", "Vitiligo", "Warts",
    ],
  },
  {
    slug: "allergies-respiratory",
    title: "Allergies & Respiratory",
    icon: "breath",
    summary: "Support for seasonal allergies, recurring colds, and breathing complaints.",
    intro:
      "Many patients visit us for allergies and chest or sinus complaints that return with every change of season. We look at your triggers, your pattern of symptoms, and any medicines you already use. If you use an inhaler or other prescribed medicine, keep using it.",
    conditions: [
      "Allergic bronchitis", "Allergic rhinitis", "Allergies", "Asthma", "Blocked nose", "Breathlessness",
      "Bronchiectasis", "Bronchitis", "Chest congestion", "Cold sensitivity", "Common cold", "Cough",
      "Cough-variant asthma", "Dry cough", "Dust allergy", "Egg allergy", "Emphysema", "Eye allergy", "Flu",
      "Food allergy", "Hay fever", "Milk allergy", "Nasal allergy", "Nasal polyps", "Peanut allergy", "Pet allergy",
      "Phlegm", "Pollen allergy", "Post-nasal drip", "Runny nose", "Sensitivity to weather changes", "Sinusitis",
      "Smoker's cough", "Sneezing", "Wet-weather allergy", "Wheat allergy", "Wheezing",
    ],
  },
  {
    slug: "digestive-health",
    title: "Digestive Health",
    icon: "digestive",
    summary: "Consultation for acidity, bloating, constipation, and other stomach complaints.",
    intro:
      "Digestive complaints are closely tied to diet, routine, and stress. We ask about all three, then choose a remedy for your individual pattern and give simple advice on food and habits.",
    conditions: [
      "Achalasia cardia", "Acid reflux (GERD)", "Amoebiasis", "Anal fissures", "Anal fistula", "Anal itching",
      "Anorectal stricture", "Burping", "Celiac disease", "Colorectal polyps", "Constipation", "Crohn's disease",
      "Difficulty swallowing", "Diverticulitis", "Dysentery", "Fatty liver", "Flatulence", "Food poisoning",
      "Gallstones", "Gas", "Gastritis", "Gastroenteritis", "Gastroparesis", "Giardiasis", "H. pylori infection",
      "Hangover", "Heartburn", "Hernia", "Hiatus hernia", "Indigestion", "Inflammatory bowel disease (IBD)",
      "Irritable bowel syndrome (IBS)", "Jaundice", "Leaky gut", "Liver complaints", "Loose stools",
      "Loss of appetite", "Motion sickness", "Mucus in stool", "Nausea", "Peptic ulcer", "Piles", "Pilonidal cyst",
      "Pinworms", "Proctitis", "Rectal prolapse", "SIBO", "Slow digestion", "Stomach ulcers", "Stool incontinence",
      "Summer diarrhoea", "Ulcerative colitis", "Vomiting", "Worms",
    ],
  },
  {
    slug: "joints-pain",
    title: "Joints & Pain",
    icon: "joints",
    summary: "Homeopathic support for joint stiffness, back pain, and muscular aches.",
    intro:
      "Ongoing pain makes daily life harder. We look at where the pain is, how it behaves through the day, and any reports or scans you already have, and we tell you plainly when another kind of specialist should also be involved.",
    conditions: [
      "Ankle pain", "Ankylosing spondylitis", "Avascular necrosis (AVN)", "Back pain", "Body pains", "Bone pain",
      "Bunion", "Carpal tunnel syndrome", "Cervical spondylosis", "Cubital tunnel syndrome", "Disc prolapse",
      "Dupuytren's contracture", "Elbow pain", "Fibromyalgia", "Foot pain", "Frozen shoulder", "Ganglion cysts",
      "Golfer's elbow", "Gout", "Heel pain", "Heel spurs", "High uric acid", "Hip pain", "Housemaid's knee",
      "Jaw joint (TMJ) pain", "Joint pains", "Juvenile rheumatoid arthritis", "Knee arthritis", "Knee bursitis",
      "Knee injuries", "Knee pain", "Leg cramps", "Leg pain", "Lumbar spondylosis", "Muscle pain", "Muscle weakness",
      "Neck stiffness", "Osgood-Schlatter disease", "Osteoarthritis", "Osteophytes", "Osteoporosis",
      "Pain in hands and fingers", "Pinched nerve", "Piriformis syndrome", "Plantar fasciitis", "Reactive arthritis",
      "Rheumatoid arthritis", "Rotator cuff injury", "Sacroiliitis", "Sciatica", "Scoliosis", "Shoulder pain",
      "Sore muscles", "Spinal nerve compression", "Sprained ankle", "Sprains", "Stiff back", "Stiff neck",
      "Swollen ankles", "Swollen knee", "Tailbone pain", "Tennis elbow", "Trigger finger", "Wrist pain",
      "Writer's cramp",
    ],
  },
  {
    slug: "womens-health",
    title: "Women's Health",
    icon: "women",
    summary: "Private, respectful consultation for women's health concerns.",
    intro:
      "We offer a private and respectful consultation for women at every stage of life. Please bring any previous test reports so the doctor has the full picture.",
    conditions: [
      "Adenomyosis", "Bleeding between periods", "Blocked fallopian tubes", "Cervicitis", "Endometriosis",
      "Fibroadenoma", "Heavy periods", "Hormone imbalance", "Hot flashes", "Infertility", "Leucorrhoea", "Mastitis",
      "Menopause mood changes", "Morning sickness", "Ovarian cysts", "Ovarian pain", "Painful intercourse",
      "Painful periods", "PCOS", "Pelvic inflammatory disease (PID)", "PMS", "Postpartum depression",
      "Pregnancy-related complaints", "Salpingitis", "Scanty periods", "Unwanted facial hair", "Uterine fibroids",
      "Uterine polyps", "Uterine prolapse", "Vaginal candidiasis", "Vaginal dryness", "Vaginal itching", "Vaginitis",
    ],
  },
  {
    slug: "child-health",
    title: "Child Health",
    icon: "child",
    summary: "Gentle consultation for common childhood complaints.",
    intro:
      "Children are welcome at the clinic. We speak with the parent and the child, keep the visit calm, and use medicines that are easy for children to take.",
    conditions: [
      "Adenoids", "ADHD", "Anxiety in children", "Asperger's syndrome", "Asthma in children", "Autism",
      "Bedwetting", "Chickenpox", "Colic in babies", "Cradle cap", "Depression in children",
      "Depression in teenagers", "Developmental delay", "Diaper rash", "Dyslexia", "Hand, foot and mouth disease",
      "Mumps", "Oppositional defiant disorder (ODD)", "PANDAS", "Poor appetite in children",
      "Recurrent infections in children", "Reflux in babies", "Speech delay", "Stammering", "Teething",
    ],
  },
  {
    slug: "hair-scalp",
    title: "Hair & Scalp",
    icon: "hair",
    summary: "Consultation for hair fall, dandruff, and scalp complaints.",
    intro:
      "Hair fall can have many causes, including diet, stress, illness, and hormones. We look for the likely cause in your case and explain honestly what kind of change is realistic to expect.",
    conditions: [
      "Alopecia", "Balding", "Dandruff", "Dry, frizzy hair", "Hair fall", "Premature grey hair", "Scalp folliculitis",
      "Scalp psoriasis", "Scalp ringworm (tinea capitis)",
    ],
  },
  {
    slug: "mind-emotional-health",
    title: "Mind & Emotional Health",
    icon: "mind",
    summary: "A calm, private consultation for stress, anxiety, low mood, and sleep problems.",
    intro:
      "Emotional health affects the whole body. We listen without judgement and take your sleep, routine, and worries into account. If you are under the care of a psychiatrist or take prescribed medicine, please continue it; our treatment works alongside that care.",
    conditions: [
      "Anger problems", "Anxiety", "Borderline personality disorder", "Claustrophobia", "Depression",
      "Drug addiction", "Fear of crowds", "Fears and phobias", "Generalised anxiety", "Grief", "Insomnia",
      "Lack of self-confidence", "Memory problems", "Mood swings", "Nightmares", "OCD", "Panic attacks", "PTSD",
      "Schizophrenia", "Social phobia", "Stress", "Teeth grinding (bruxism)", "Winter depression",
    ],
  },
  {
    slug: "ear-nose-throat-eyes",
    title: "Ear, Throat, Eyes & Mouth",
    icon: "ent",
    summary: "Consultation for ear, throat, eye, and mouth complaints, including vertigo and tonsils.",
    intro:
      "Ear, throat, eye, and mouth complaints are often recurring. We ask how often they return and what sets them off. For any sudden change in vision or hearing, please see an eye or ENT specialist straight away.",
    conditions: [
      "Bad breath", "Bleeding gums", "Blepharitis", "Blepharospasm", "BPPV", "Cataract", "Chalazion",
      "Computer vision syndrome", "Conjunctivitis", "Double vision", "Dry eyes", "Ear discharge", "Ear infections",
      "Ear pain", "Eustachian tube blockage", "Eye floaters", "Gingivitis", "Glaucoma", "Glossitis", "Hearing loss",
      "Hoarse voice", "Itchy eyes", "Keratitis", "Keratoconus", "Labyrinthitis", "Laryngitis", "Loss of smell",
      "Meniere's disease", "Mouth ulcers", "Myopia", "Nosebleeds", "Nystagmus", "Oral lichen planus", "Oral thrush",
      "Pharyngitis", "Pterygium", "Ptosis", "Pyorrhoea", "Sleep apnoea", "Snoring", "Sore throat",
      "Spasmodic dysphonia", "Squint", "Strep throat", "Styes", "Tinnitus", "Tonsil stones", "Tonsillitis",
      "Toothache", "Uveitis", "Vertigo and dizziness", "Vocal cord nodules", "Vocal cord paralysis", "Watery eyes",
    ],
  },
  {
    slug: "urinary-kidney-mens-health",
    title: "Urinary, Kidney & Men's Health",
    icon: "urinary",
    summary: "Private consultation for urinary complaints, kidney stones, and men's health.",
    intro:
      "These complaints can be uncomfortable to talk about, so the consultation is private and unhurried. Please bring any urine tests or ultrasound reports you have.",
    conditions: [
      "Balanitis", "Burning urination", "Cystitis", "Enlarged prostate", "Epididymitis", "Erectile dysfunction",
      "Frequent urination", "Hydrocele", "Kidney pain", "Kidney stones", "Low sperm count", "Low testosterone",
      "Orchitis", "Overactive bladder", "Painful urination", "Premature ejaculation", "Prostatitis",
      "Pus cells in urine", "Urethral stricture", "Urethritis", "Urinary incontinence", "Urinary problems",
      "Urinary tract infection (UTI)", "Varicocele",
    ],
  },
  {
    slug: "nerves-brain",
    title: "Headache, Nerves & Brain",
    icon: "nerves",
    summary: "Support for migraine, nerve pain, numbness, and long-term neurological conditions.",
    intro:
      "For headaches and nerve complaints we look closely at triggers and timing. For long-term neurological conditions, homeopathic treatment is offered alongside your neurologist's care; please keep taking your prescribed medicines.",
    conditions: [
      "Alzheimer's disease", "Ataxia", "Bell's palsy", "Chorea", "Cluster headaches", "Dementia", "Epilepsy",
      "Headaches", "Migraine", "Multiple sclerosis", "Nerve pain", "Numbness in feet",
      "Numbness in hands and fingers", "Parkinson's disease", "Peripheral neuropathy", "Post-herpetic neuralgia",
      "Progressive supranuclear palsy", "Restless legs", "Retinal migraine", "Tension headaches", "Tics",
      "Tourette's syndrome", "Tremors", "Trigeminal neuralgia",
    ],
  },
  {
    slug: "chronic-conditions",
    title: "Chronic & General Health",
    icon: "chronic",
    summary: "Long-term homeopathic support alongside your regular medical care.",
    intro:
      "For long-standing conditions, we work alongside the care you already receive. Please keep taking the medicines your other doctors have prescribed, and bring your reports and current prescriptions to the visit.",
    conditions: [
      "Anaemia", "Chronic fatigue", "Diabetes", "Difficulty gaining weight", "Fatigue", "Fever", "Goitre",
      "Graves' disease", "Hashimoto's thyroiditis", "High blood pressure", "High cholesterol", "Hyperthyroidism",
      "Hypothyroidism", "Low blood pressure", "Overweight", "Palpitations", "Raynaud's disease",
      "Recurring infections", "Sjogren's syndrome", "Systemic lupus erythematosus", "Varicose ulcers",
      "Varicose veins", "Venous insufficiency", "Water retention", "Weakness",
    ],
  },
  {
    slug: "supportive-care",
    title: "Supportive Care in Serious Illness",
    icon: "support",
    summary: "Homeopathic support alongside hospital or specialist treatment, and during recovery.",
    intro:
      "These illnesses need diagnosis and treatment from a hospital or specialist first. We do not replace that treatment. Alongside it, and during recovery, we offer homeopathic support for comfort, strength, and lingering symptoms. Please bring your reports and prescriptions, and go to a hospital straight away if your condition gets worse.",
    conditions: [
      "Burns", "Chikungunya", "Cholera", "Dengue", "Esophageal varices", "Gonorrhoea", "Liver abscess",
      "Liver cirrhosis", "Lyme disease", "Malaria", "Pancreatitis", "Pneumonia", "Syphilis", "Typhoid", "Zika",
    ],
  },
];

/** Every condition with the area it belongs to, sorted A–Z. Used by the search on the Services page. */
export const allConditions = services
  .flatMap((service) => service.conditions.map((name) => ({ name, slug: service.slug, area: service.title })))
  .sort((a, b) => a.name.localeCompare(b.name));
