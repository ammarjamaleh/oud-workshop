/* ═══════════════════════════════════════════════════════════════
   data.js — Ibrahim Oud Atelier
   All site content: ouds, makers, wood guide, testimonials, blog
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   OUD PRODUCTS
───────────────────────────────────────────── */
const OUDS = [
    {
      id: 1,
      nameEn: "Damascus Concert",
      nameAr: "عود دمشق الكونسرت",
      typeEn: "Concert Grade · Arabic Tuning",
      typeAr: "درجة الكونسرت · ضبط عربي",
      maker: "samer",
      badge: { en: "Featured", ar: "مميز" },
      price: 1850,
      currency: "USD",
      status: "available",
      deliveryWeeks: 6,
      soldTo: null,
      audioSrc: null,
      woods: {
        en: [
          { part: "Soundboard",      wood: "European Spruce (Picea abies)" },
          { part: "Back & Ribs",     wood: "Syrian Walnut · 17 ribs" },
          { part: "Fingerboard",     wood: "African Ebony" },
          { part: "Neck",            wood: "Western Red Cedar" },
          { part: "Bridge",          wood: "Indian Rosewood" },
          { part: "Pegbox",          wood: "Walnut" },
          { part: "Binding",         wood: "Maple inlay strip" },
          { part: "Rosette",         wood: "Hand-engraved arabesque" }
        ],
        ar: [
          { part: "خشب الصدر",      wood: "تنوب أوروبي (Picea abies)" },
          { part: "الظهر والضلوع",  wood: "جوز سوري · ١٧ ضلعاً" },
          { part: "المسطرة",        wood: "آبنوس أفريقي" },
          { part: "العنق",          wood: "أرز أحمر غربي" },
          { part: "الكرسي",         wood: "خشب ورد هندي" },
          { part: "صندوق المفاتيح", wood: "جوز" },
          { part: "التحزيم",        wood: "شريط تطعيم قيقب" },
          { part: "الوردة",         wood: "أرابيسك منقوش يدوياً" }
        ]
      }
    },
    {
      id: 2,
      nameEn: "Cedar Bloom",
      nameAr: "عود زهرة الأرز",
      typeEn: "Professional · Turkish Tuning Available",
      typeAr: "احترافي · متوفر بضبط تركي",
      maker: "alaa",
      badge: null,
      price: 1450,
      currency: "USD",
      status: "available",
      deliveryWeeks: 5,
      soldTo: null,
      audioSrc: null,
      woods: {
        en: [
          { part: "Soundboard",      wood: "Western Red Cedar" },
          { part: "Back & Ribs",     wood: "Indian Rosewood · 21 ribs" },
          { part: "Fingerboard",     wood: "African Ebony" },
          { part: "Neck",            wood: "Cedar" },
          { part: "Bridge",          wood: "Ebony" },
          { part: "Pegbox",          wood: "Rosewood" },
          { part: "Binding",         wood: "Abalone shell + maple" },
          { part: "Rosette",         wood: "Mother-of-pearl geometric" }
        ],
        ar: [
          { part: "خشب الصدر",      wood: "أرز أحمر غربي" },
          { part: "الظهر والضلوع",  wood: "خشب ورد هندي · ٢١ ضلعاً" },
          { part: "المسطرة",        wood: "آبنوس أفريقي" },
          { part: "العنق",          wood: "أرز" },
          { part: "الكرسي",         wood: "آبنوس" },
          { part: "صندوق المفاتيح", wood: "خشب الورد" },
          { part: "التحزيم",        wood: "صدف + قيقب" },
          { part: "الوردة",         wood: "لؤلؤ هندسي" }
        ]
      }
    },
    {
      id: 3,
      nameEn: "Levant Classic",
      nameAr: "عود الشام الكلاسيك",
      typeEn: "Standard · Beginner & Intermediate",
      typeAr: "قياسي · مبتدئ ومتوسط",
      maker: "samer",
      badge: { en: "New", ar: "جديد" },
      price: 980,
      currency: "USD",
      status: "available",
      deliveryWeeks: 4,
      soldTo: null,
      audioSrc: null,
      woods: {
        en: [
          { part: "Soundboard",      wood: "Canadian Spruce" },
          { part: "Back & Ribs",     wood: "Maple · 15 ribs" },
          { part: "Fingerboard",     wood: "Indian Rosewood" },
          { part: "Neck",            wood: "Walnut" },
          { part: "Bridge",          wood: "Rosewood" },
          { part: "Pegbox",          wood: "Walnut" },
          { part: "Binding",         wood: "Maple" },
        { part: "Rosette",         wood: "Laser-cut inlay" }
      ],
      ar: [
        { part: "خشب الصدر",      wood: "تنوب كندي" },
        { part: "الظهر والضلوع",  wood: "قيقب · ١٥ ضلعاً" },
        { part: "المسطرة",        wood: "خشب ورد هندي" },
        { part: "العنق",          wood: "جوز" },
        { part: "الكرسي",         wood: "خشب الورد" },
        { part: "صندوق المفاتيح", wood: "جوز" },
        { part: "التحزيم",        wood: "قيقب" },
        { part: "الوردة",         wood: "تطعيم بالليزر" }
      ]
    }
  },
  {
    id: 4,
    nameEn: "Alaa's Signature",
    nameAr: "عود علاء التوقيع",
    typeEn: "Signature Series · Limited Edition",
    typeAr: "سلسلة التوقيع · إصدار محدود",
    maker: "alaa",
    badge: { en: "Limited", ar: "محدود" },
    price: 2400,
    currency: "USD",
    status: "available",
    deliveryWeeks: 10,
    soldTo: null,
    audioSrc: null,
    woods: {
      en: [
        { part: "Soundboard",      wood: "Aged European Spruce · 15 yr" },
        { part: "Back & Ribs",     wood: "Brazilian Rosewood · 23 ribs" },
        { part: "Fingerboard",     wood: "African Ebony (Grade AAA)" },
        { part: "Neck",            wood: "Cedar + carbon reinforcement" },
        { part: "Bridge",          wood: "Brazilian Rosewood" },
        { part: "Pegbox",          wood: "Rosewood" },
        { part: "Binding",         wood: "Ivory-style ABS + Abalone" },
        { part: "Rosette",         wood: "Hand-carved damascene arabesque" }
      ],
      ar: [
        { part: "خشب الصدر",      wood: "تنوب أوروبي معتّق ١٥ عاماً" },
        { part: "الظهر والضلوع",  wood: "خشب ورد برازيلي · ٢٣ ضلعاً" },
        { part: "المسطرة",        wood: "آبنوس أفريقي (درجة AAA)" },
        { part: "العنق",          wood: "أرز مع تقوية كربونية" },
        { part: "الكرسي",         wood: "خشب ورد برازيلي" },
        { part: "صندوق المفاتيح", wood: "خشب الورد" },
        { part: "التحزيم",        wood: "ABS عاجي + صدف" },
        { part: "الوردة",         wood: "أرابيسك دمشقي منحوت يدوياً" }
      ]
    }
  },
  {
    id: 5,
    nameEn: "Samer's Walnut",
    nameAr: "عود سامر الجوزي",
    typeEn: "Professional · Deep Bass Response",
    typeAr: "احترافي · جهير عميق",
    maker: "samer",
    badge: null,
    price: 1700,
    currency: "USD",
    status: "sold",
    deliveryWeeks: 8,
    soldTo: { city: "Cairo", country: "Egypt", countryAr: "مصر", flag: "🇪🇬" },
    audioSrc: null,
    woods: {
      en: [
        { part: "Soundboard",      wood: "European Spruce (Master grade)" },
        { part: "Back & Ribs",     wood: "Black Walnut · 19 ribs" },
        { part: "Fingerboard",     wood: "Ebony" },
        { part: "Neck",            wood: "Cedar" },
        { part: "Bridge",          wood: "Walnut" },
        { part: "Pegbox",          wood: "Black Walnut" },
        { part: "Binding",         wood: "Rosewood + maple purfling" },
        { part: "Rosette",         wood: "Hand-tooled star pattern" }
      ],
      ar: [
        { part: "خشب الصدر",      wood: "تنوب أوروبي (درجة أستاذ)" },
        { part: "الظهر والضلوع",  wood: "جوز أسود · ١٩ ضلعاً" },
        { part: "المسطرة",        wood: "آبنوس" },
        { part: "العنق",          wood: "أرز" },
        { part: "الكرسي",         wood: "جوز" },
        { part: "صندوق المفاتيح", wood: "جوز أسود" },
        { part: "التحزيم",        wood: "خشب ورد + خطوط قيقب" },
        { part: "الوردة",         wood: "نجمة محفورة يدوياً" }
      ]
    }
  },
  {
    id: 6,
    nameEn: "The Rose",
    nameAr: "عود الوردة",
    typeEn: "Concert Grade · Turkish Style",
    typeAr: "درجة الكونسرت · طراز تركي",
    maker: "alaa",
    badge: null,
    price: 2100,
    currency: "USD",
    status: "sold",
    deliveryWeeks: 9,
    soldTo: { city: "Istanbul", country: "Turkey", countryAr: "تركيا", flag: "🇹🇷" },
    audioSrc: null,
    woods: {
      en: [
        { part: "Soundboard",      wood: "Aged Cedar (8 yr)" },
        { part: "Back & Ribs",     wood: "Indian Rosewood · 25 ribs" },
        { part: "Fingerboard",     wood: "Ebony" },
        { part: "Neck",            wood: "Cedar" },
        { part: "Bridge",          wood: "Rosewood" },
        { part: "Pegbox",          wood: "Rosewood" },
        { part: "Binding",         wood: "Abalone + ebony purfling" },
        { part: "Rosette",         wood: "Rose petal marquetry" }
      ],
      ar: [
        { part: "خشب الصدر",      wood: "أرز معتّق ٨ أعوام" },
        { part: "الظهر والضلوع",  wood: "خشب ورد هندي · ٢٥ ضلعاً" },
        { part: "المسطرة",        wood: "آبنوس" },
        { part: "العنق",          wood: "أرز" },
        { part: "الكرسي",         wood: "خشب الورد" },
        { part: "صندوق المفاتيح", wood: "خشب الورد" },
        { part: "التحزيم",        wood: "صدف + خطوط آبنوس" },
        { part: "الوردة",         wood: "فسيفساء بتلات الورد" }
      ]
    }
  }
];

/* ─────────────────────────────────────────────
   MAKERS
───────────────────────────────────────────── */
const MAKERS = {
  samer: {
    nameEn:      "Samer Ibrahim",
    nameAr:      "سامر إبراهيم",
    titleEn:     "Master Luthier",
    titleAr:     "أستاذ صناعة العود",
    locationEn:  "Damascus, Syria",
    locationAr:  "دمشق، سوريا",
    bioEn:       "With over 30 years at the workbench, Samer Ibrahim is renowned for concert-grade ouds with extraordinary projection and tonal depth. His hallmark multi-rib walnut bowls and precisely shaped spruce tops have earned the trust of professional musicians from Cairo to London.",
    bioAr:       "بأكثر من ٣٠ عاماً خلف طاولة العمل، اشتُهر سامر إبراهيم بأعواد الكونسرت ذات الإسقاط الصوتي الاستثنائي والعمق النبري. قصاعته من الجوز متعدد الضلوع وصدوره من التنوب المشكّلة بدقة كسبت ثقة موسيقيين محترفين من القاهرة إلى لندن.",
    specialtyEn: "Concert Grade · Deep Bass · Multi-rib Walnut",
    specialtyAr: "درجة الكونسرت · جهير عميق · جوز متعدد الضلوع",
    initial:     "S",
    oudsBuilt:   340,
    yearsActive: 30
  },
  alaa: {
    nameEn:      "Alaa Ibrahim",
    nameAr:      "علاء إبراهيم",
    titleEn:     "Master Luthier",
    titleAr:     "أستاذ صناعة العود",
    locationEn:  "Damascus, Syria",
    locationAr:  "دمشق، سوريا",
    bioEn:       "Alaa Ibrahim's ouds are celebrated for their warmth, immediacy, and the singular voice of his cedar-top builds. A second-generation craftsman who trained under his father before developing his own distinctive aesthetic — blending traditional Syrian craft with refined Turkish tonal sensibilities.",
    bioAr:       "تشتهر أعواد علاء إبراهيم بدفئها وفوريتها وصوتها المميز في صدوره من الأرز. حرفي من الجيل الثاني، تدرّب على يد والده قبل أن يطور أسلوبه المميز — مزجاً بين الحرفية السورية التقليدية والحساسية النبرية التركية المصقولة.",
    specialtyEn: "Cedar Top · Warm Midrange · Turkish Tuning",
    specialtyAr: "صدر أرز · نبرة وسطى دافئة · ضبط تركي",
    initial:     "A",
    oudsBuilt:   280,
    yearsActive: 22
  }
};

/* ─────────────────────────────────────────────
   WOOD GUIDE
───────────────────────────────────────────── */
const WOODS = [
  {
    icon:    "🌲",
    partEn:  "Soundboard",
    partAr:  "خشب الصدر",
    descEn:  "The acoustic heart of the oud. Spruce delivers brilliance and projection; Cedar responds faster with a warmer, rounder voice. Both are aged and seasoned before use.",
    descAr:  "القلب الصوتي للعود. التنوب يمنح البريق والإسقاط؛ الأرز يستجيب بسرعة أكبر مع صوت أدفأ وأكثر نعومة. كلاهما يُعتَّق ويُجفَّف قبل الاستخدام.",
    options: ["European Spruce", "Western Red Cedar", "Canadian Spruce"]
  },
  {
    icon:    "🪵",
    partEn:  "Back & Ribs",
    partAr:  "خشب الظهر والضلوع",
    descEn:  "Multi-rib bowl construction. Walnut adds warmth and sustain; Rosewood delivers bright focused highs. Rib count (15–25) affects tonal complexity and visual character.",
    descAr:  "قصعة مبنية من ضلوع متعددة. الجوز يضيف الدفء والامتداد؛ خشب الورد يمنح حدة مركّزة. عدد الضلوع (١٥–٢٥) يؤثر على تعقيد النبرة والطابع البصري.",
    options: ["Syrian Walnut", "Indian Rosewood", "Maple", "Black Walnut"]
  },
  {
    icon:    "🎵",
    partEn:  "Fingerboard",
    partAr:  "خشب المسطرة",
    descEn:  "Must be dense, smooth and dimensionally stable. Ebony is the premium choice for feel and durability. Rosewood is a warmer, slightly softer alternative.",
    descAr:  "يجب أن يكون كثيفاً وناعماً ومستقراً. الآبنوس هو الخيار الممتاز للملمس والمتانة. خشب الورد بديل أدفأ وأكثر ليونة قليلاً.",
    options: ["African Ebony", "Indian Rosewood"]
  },
  {
    icon:    "🔑",
    partEn:  "Pegbox & Pegs",
    partAr:  "صندوق المفاتيح والمفاتيح",
    descEn:  "Houses the tuning pegs and defines the instrument's visual silhouette. Walnut and Cedar are traditional choices; Rosewood is the luxury option.",
    descAr:  "يحتضن أوتاد الضبط ويحدد صورة الآلة البصرية. الجوز والأرز خياران تقليديان؛ خشب الورد هو الخيار الفاخر.",
    options: ["Walnut", "Cedar", "Rosewood"]
  },
  {
    icon:    "🌉",
    partEn:  "Bridge",
    partAr:  "الكرسي (الجسر)",
    descEn:  "Transfers string vibration directly into the soundboard. Material and contact area critically affect tonal energy transfer — Ebony is the most acoustically efficient.",
    descAr:  "ينقل اهتزاز الأوتار مباشرةً إلى الصدر. تؤثر المادة ومساحة التماس بشكل حاسم على نقل الطاقة الصوتية — الآبنوس الأكثر كفاءةً.",
    options: ["Ebony", "Indian Rosewood", "Walnut"]
  },
  {
    icon:    "🌿",
    partEn:  "Neck",
    partAr:  "خشب العنق",
    descEn:  "Balances structural rigidity with low weight for comfortable long playing sessions. Cedar is traditional; carbon reinforcement is added to premium builds for extra stability.",
    descAr:  "يوازن بين الصلابة الهيكلية والوزن الخفيف لجلسات عزف طويلة مريحة. الأرز تقليدي؛ تُضاف تقوية كربونية في الأعواد المتميزة.",
    options: ["Cedar", "Walnut", "Cedar + Carbon"]
  }
];

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    nameEn:  "Naseer Shamma",
    nameAr:  "نصير شمّه",
    roleEn:  "World-Renowned Oud Virtuoso",
    roleAr:  "عازف عود عالمي الشهرة",
    cityEn:  "Baghdad / Cairo",
    cityAr:  "بغداد / القاهرة",
    quoteEn: "The craftsmanship of the Ibrahim workshop is among the finest I have encountered. The Damascus Concert produces a voice that fills the hall with effortless resonance.",
    quoteAr: "حرفية ورشة إبراهيم من أرقى ما صادفته. عود دمشق الكونسرت يُصدر صوتاً يملأ القاعة بصدى لا يحتاج جهداً.",
    stars: 5
  },
  {
    nameEn:  "Mariam Al-Halabi",
    nameAr:  "مريم الحلبي",
    roleEn:  "Conservatory Professor · Aleppo",
    roleAr:  "أستاذة في المعهد · حلب",
    cityEn:  "Aleppo, Syria",
    cityAr:  "حلب، سوريا",
    quoteEn: "I have recommended Alaa's cedar ouds to my students for years. The response is immediate, the action forgiving, and every instrument arrives perfectly set up.",
    quoteAr: "أوصيت طلابي بأعواد علاء الأرزية منذ سنوات. الاستجابة فورية والأداء سهل وكل آلة تصل معدّة بشكل مثالي.",
    stars: 5
  },
  {
    nameEn:  "Tarek Fares",
    nameAr:  "طارق فارس",
    roleEn:  "Session Musician · Recording Artist",
    roleAr:  "موسيقي استوديو · فنان تسجيلات",
    cityEn:  "London, UK",
    cityAr:  "لندن، المملكة المتحدة",
    quoteEn: "Ordered a custom walnut oud — the communication was excellent and the instrument arrived six weeks later exactly as specified. Stunning work.",
    quoteAr: "طلبت عوداً مخصصاً من الجوز — التواصل كان ممتازاً ووصلت الآلة بعد ستة أسابيع بالضبط كما هو محدد. عمل رائع.",
    stars: 5
  },
  {
    nameEn:  "Leila Boudali",
    nameAr:  "ليلى بودالي",
    roleEn:  "Luthier & Performer",
    roleAr:  "صانعة عود وعازفة",
    cityEn:  "Algiers, Algeria",
    cityAr:  "الجزائر، الجزائر",
    quoteEn: "As a fellow luthier, I look for joinery precision, wood selection discipline, and tonal intent. The Ibrahim atelier excels in all three.",
    quoteAr: "بوصفي صانعة عود، أبحث عن دقة التوصيل وانضباط اختيار الخشب والنية النبرية. ورشة إبراهيم تتفوق في الثلاثة.",
    stars: 5
  }
];

/* ─────────────────────────────────────────────
   BLOG POSTS
───────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    id: 1,
    date:        "2025-03-12",
    readMinutes: 5,
    titleEn:     "Spruce vs Cedar: Choosing Your Soundboard",
    titleAr:     "التنوب أم الأرز؟ كيف تختار خشب الصدر",
    excerptEn:   "The two most common soundboard tonewoods and how each shapes the character, projection and lifespan of your oud.",
    excerptAr:   "أكثر خشبَي الصدر شيوعاً وكيف يشكّل كل منهما طابع عودك وإسقاطه وعمره الافتراضي.",
    category:    { en: "Materials", ar: "الأخشاب" }
  },
  {
    id: 2,
    date:        "2025-01-28",
    readMinutes: 4,
    titleEn:     "Why Rib Count Changes Everything",
    titleAr:     "لماذا يغيّر عدد الضلوع كل شيء",
    excerptEn:   "From 13 to 25 ribs — how bowl geometry alters sustain, warmth, and the visual personality of the instrument.",
    excerptAr:   "من ١٣ إلى ٢٥ ضلعاً — كيف تغيّر هندسة القصعة الامتداد والدفء والشخصية البصرية للآلة.",
    category:    { en: "Craft", ar: "الحرفة" }
  },
  {
    id: 3,
    date:        "2024-12-05",
    readMinutes: 6,
    titleEn:     "Caring for Your Oud: A Seasonal Guide",
    titleAr:     "العناية بعودك: دليل موسمي",
    excerptEn:   "Humidity control, string changes, neck adjustment, and storage tips to keep your oud in concert condition year-round.",
    excerptAr:   "التحكم بالرطوبة وتغيير الأوتار وضبط العنق ونصائح التخزين للحفاظ على عودك طوال العام.",
    category:    { en: "Care", ar: "العناية" }
  },
  {
    id: 4,
    date:        "2024-10-18",
    readMinutes: 3,
    titleEn:     "Arabic vs Turkish Tuning: What's the Difference?",
    titleAr:     "الضبط العربي مقابل التركي: ما الفرق؟",
    excerptEn:   "A practical breakdown of both tuning systems, the tonal implications, and which suits your playing style.",
    excerptAr:   "شرح عملي لنظامَي الضبط والتداعيات النبرية وأيهما يناسب أسلوب عزفك.",
    category:    { en: "Technique", ar: "الأسلوب" }
  }
];