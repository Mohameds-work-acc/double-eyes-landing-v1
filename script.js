let animate = (target, keyframes, options = {}) => {
  if (typeof target === "number" && typeof keyframes === "number" && typeof options.onUpdate === "function") {
    options.onUpdate(keyframes);
  }
  return { cancel() { }, stop() { } };
};

let inView = (target, callback) => {
  const elements = typeof target === "string" ? document.querySelectorAll(target) : [target];
  elements.forEach((element) => callback(element));
};

let stagger = () => 0;
let scroll = () => () => {};
let THREE = null;
let reelAnimation = null;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const heroTitleHtml = {
  en: `We engineer the second
          <br>
          <p class="eye-word mt-5" data-keep-split>
            l
            <span class="word-eyes inline-flex  -translate-y-8 align-middle" aria-label="oo">
              <span class="sr-only">oo</span>

              <!-- <span
                class="word-eye relative inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
              </span> -->

              <span
                class="word-eye relative ml-1 inline-flex h-15 w-50  items-center justify-center rounded-full border-6 border-white">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
              </span>
              <span
                class="word-eye relative ml-1 inline-flex h-15 w-50  items-center justify-center rounded-full border-6 border-white">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            </span>
            k.
          </p>`,
  ar: `نصنع حضورا يلفت مرتين.`
};

const translations = {
  "en": {
    "title": "Double Eyes | Bilingual 360 Marketing Agency",
    "description": "Double Eyes is an independent bilingual 360 marketing agency rooted in Saudi Arabia and Egypt, serving ambitious brands across the GCC and MENA.",
    "nav": [
      "Who We Are",
      "Services",
      "Work",
      "Contact"
    ],
    "footerNav": [
      "Who We Are",
      "Services",
      "Work",
      "Contact"
    ],
    "ctaNav": "Request consultation",
    "menuTitle": "Open menu",
    "heroEyebrow": "Riyadh / Cairo / GCC & MENA",
    "heroTitle": "We engineer the second<br>We decode culture,<br><p class=\"eye-word mt-5\" data-keep-split>l<span class=\"word-eyes inline-flex -translate-y-8 align-middle\" aria-label=\"oo\"><span class=\"sr-only\">oo</span><span class=\"word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white\"><span class=\"h-3 w-3 rounded-full bg-red-500\"></span></span><span class=\"word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white\"><span class=\"h-3 w-3 rounded-full bg-red-500\"></span></span></span>k.</p>",
    "heroLede": "An independent bilingual 360 marketing agency rooted in Saudi Arabia and Egypt, built for brands that need cultural fluency, performance discipline, and speed.",
    "heroPrimary": "Request a consultation",
    "heroSecondary": "Explore services",
    "consoleTop": "Regional edge index",
    "consoleFooter": [
      "Saudi insight",
      "Egyptian talent",
      "GCC reach"
    ],
    "marquee": [
      "Arabic-native strategy",
      "Paid media",
      "Social management",
      "Influencer marketing",
      "SEO",
      "Brand identity",
      "Web development",
      "PR & activation"
    ],
    "directorEyebrow": "Who We Are",
    "directorTitle": "One agency. Two markets. Every edge.",
    "panels": [
      [
        "Saudi + Egypt Roots",
        "We grew up in the markets we serve.",
        "Our team combines Riyadh market rigour with Cairo creative energy, giving brands insight from both sides of the Red Sea."
      ],
      [
        "Arabic-Native First",
        "Strategy is not translated into Arabic. It starts there.",
        "Creative, copy, community, and media buying are shaped around how Arabic-speaking consumers behave, speak, and buy."
      ],
      [
        "Performance Discipline",
        "Every campaign is accountable to business outcomes.",
        "ROAS, CPL, conversion rate, pipeline value, and lead quality shape how we plan, report, and optimize."
      ],
      [
        "360 Partner",
        "Strategy, creative, media, web, PR, and activation under one roof.",
        "We connect every service to a single question: is this moving the business forward?"
      ]
    ],
    "collisionWord": "RIYADH / CAIRO",
    "collisionEyebrow": "Our Advantage",
    "collisionTitle": "Cultural intelligence, performance transparency, and real access for ambitious brands.",
    "collisionCard": [
      "regional fluency",
      "Built for Saudi SMEs, international brands entering the Kingdom, and Egyptian companies expanding across MENA."
    ],
    "systemEyebrow": "What We Do",
    "systemTitle": "A complete service suite under one strategic roof.",
    "bento": [
      [
        "Digital / Social",
        "End-to-end social media management across Instagram, Snapchat, TikTok, X, YouTube, and LinkedIn in Arabic and English."
      ],
      [
        "Branding",
        "Brand strategy, positioning, visual identity, Arabic typography, messaging, and guidelines."
      ],
      [
        "Production",
        "Photo, video, reels, motion graphics, design, and bilingual copy ready for every platform."
      ],
      [
        "Performance / Paid Media",
        "Google, Meta, Snapchat, TikTok, programmatic, ROAS tracking, and real-time budget optimization."
      ],
      [
        "SEO",
        "Technical audits, Arabic keyword research, on-page optimization, content strategy, and link building."
      ],
      [
        "Web",
        "Mobile-first, bilingual-ready websites, landing pages, e-commerce, SEO architecture, and CRO."
      ],
      [
        "Strategy / Analytics",
        "Brand audits, competitor analysis, 360 roadmaps, AI-powered dashboards, live reporting, and KPI frameworks."
      ]
    ],
    "reelEyebrow": "How We Work",
    "reelTitle": "Market entry. Launch. Scale.",
    "reel": [
      [
        "Discovery",
        "Business goals, audience, competitors, current performance, brand audit, and structured questionnaire."
      ],
      [
        "Strategy",
        "360 marketing strategy, content pillars, channel plan, KPI roadmap, and budget framework."
      ],
      [
        "Production",
        "Creative assets, copy, video, and campaign setup reviewed and approved before launch."
      ],
      [
        "Launch & Optimize",
        "Real-time tracking, media optimization, engagement analysis, lead quality checks, and creative refresh cycles."
      ],
      [
        "Report & Scale",
        "Weekly reports, monthly strategy reviews, dashboard access, scaling what works and cutting what does not."
      ]
    ],
    "proof": [
      "core markets: Saudi Arabia and Egypt",
      "regional reach across GCC and wider MENA",
      "\"We do not just run campaigns. We decode culture, engineer performance, and build brands that mean something.\"",
      "Double Eyes company profile"
    ],
    "contact": {
      "eyebrow": "Request a free consultation",
      "title": "Let's build something that matters.",
      "body": "Whether you're launching in Saudi Arabia, scaling in Egypt, or entering the wider MENA region, start with a conversation.",
      "location": "Riyadh / Cairo / GCC & MENA",
      "badge": "We reply within 24h",
      "formTitle": "Send the brief",
      "formBody": "Tell us where the brand is going next",
      "labels": [
        "Full name",
        "Email address",
        "Company name",
        "Project type",
        "Tell us about your brand",
        "How did you find us?"
      ],
      "placeholders": [
        "Your name",
        "hello@company.com",
        "Your brand name",
        "What market are you entering, scaling, or fixing?"
      ],
      "projects": [
        "360 marketing strategy",
        "Social media management",
        "Paid media & performance",
        "Branding & visual identity",
        "Website / e-commerce",
        "Influencer / PR / activation",
        "Content production",
        "Other"
      ],
      "sources": [
        "Google / Search",
        "Instagram",
        "LinkedIn",
        "Referral",
        "Event / Network",
        "Other"
      ],
      "submit": "Request consultation ->",
      "safe": "Your info is safe",
      "reply": "Reply within 24h"
    },
    "footer": {
      "body": "Bilingual 360 marketing for brands built to win Saudi Arabia, Egypt, and the wider MENA region.",
      "open": "Start the conversation",
      "start": "Request consultation",
      "bottom": "Riyadh / Cairo / GCC & MENA / Bilingual 360 marketing"
    },
    "formMessages": {
      "sending": "Sending...",
      "receivedPrefix": "Signal received. We will map the first route for",
      "invalidName": "Please enter your name.",
      "invalidEmail": "Please enter a valid email.",
      "invalidMessage": "Tell us a little more (10+ chars).",
      "success": "Brief received. We'll be in touch within a business day.",
      "error": "Something jammed the signal. Try again or email hello@doubleeyes.agency."
    }
  },
  "ar": {
    "title": "Double Eyes | Arabic-Native 360 Marketing Agency",
    "description": "Double Eyes is Arabic-native, bilingual 360 marketing agency rooted in Saudi Arabia and Egypt.",
    "nav": [
      "Who We Are",
      "Services",
      "Work",
      "Contact"
    ],
    "footerNav": [
      "Who We Are",
      "Services",
      "Work",
      "Contact"
    ],
    "ctaNav": "Request consultation",
    "menuTitle": "Open menu",
    "heroEyebrow": "Riyadh / Cairo / GCC & MENA",
    "heroTitle": "We engineer the second<br>We decode culture,<br><p class=\"eye-word mt-5\" data-keep-split>l<span class=\"word-eyes inline-flex -translate-y-8 align-middle\" aria-label=\"oo\"><span class=\"sr-only\">oo</span><span class=\"word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white\"><span class=\"h-3 w-3 rounded-full bg-red-500\"></span></span><span class=\"word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white\"><span class=\"h-3 w-3 rounded-full bg-red-500\"></span></span></span>k.</p>",
    "heroLede": "An independent bilingual 360 marketing agency rooted in Saudi Arabia and Egypt, built for brands that need cultural fluency, performance discipline, and speed.",
    "heroPrimary": "Request a consultation",
    "heroSecondary": "Explore services",
    "consoleTop": "Regional edge index",
    "consoleFooter": [
      "Saudi insight",
      "Egyptian talent",
      "GCC reach"
    ],
    "marquee": [
      "Arabic-native strategy",
      "Paid media",
      "Social management",
      "Influencer marketing",
      "SEO",
      "Brand identity",
      "Web development",
      "PR & activation"
    ],
    "directorEyebrow": "Who We Are",
    "directorTitle": "One agency. Two markets. Every edge.",
    "panels": [
      [
        "Saudi + Egypt Roots",
        "We grew up in the markets we serve.",
        "Our team combines Riyadh market rigour with Cairo creative energy, giving brands insight from both sides of the Red Sea."
      ],
      [
        "Arabic-Native First",
        "Strategy is not translated into Arabic. It starts there.",
        "Creative, copy, community, and media buying are shaped around how Arabic-speaking consumers behave, speak, and buy."
      ],
      [
        "Performance Discipline",
        "Every campaign is accountable to business outcomes.",
        "ROAS, CPL, conversion rate, pipeline value, and lead quality shape how we plan, report, and optimize."
      ],
      [
        "360 Partner",
        "Strategy, creative, media, web, PR, and activation under one roof.",
        "We connect every service to a single question: is this moving the business forward?"
      ]
    ],
    "collisionWord": "RIYADH / CAIRO",
    "collisionEyebrow": "Our Advantage",
    "collisionTitle": "Cultural intelligence, performance transparency, and real access for ambitious brands.",
    "collisionCard": [
      "regional fluency",
      "Built for Saudi SMEs, international brands entering the Kingdom, and Egyptian companies expanding across MENA."
    ],
    "systemEyebrow": "What We Do",
    "systemTitle": "A complete service suite under one strategic roof.",
    "bento": [
      [
        "Digital / Social",
        "End-to-end social media management across Instagram, Snapchat, TikTok, X, YouTube, and LinkedIn in Arabic and English."
      ],
      [
        "Branding",
        "Brand strategy, positioning, visual identity, Arabic typography, messaging, and guidelines."
      ],
      [
        "Production",
        "Photo, video, reels, motion graphics, design, and bilingual copy ready for every platform."
      ],
      [
        "Performance / Paid Media",
        "Google, Meta, Snapchat, TikTok, programmatic, ROAS tracking, and real-time budget optimization."
      ],
      [
        "SEO",
        "Technical audits, Arabic keyword research, on-page optimization, content strategy, and link building."
      ],
      [
        "Web",
        "Mobile-first, bilingual-ready websites, landing pages, e-commerce, SEO architecture, and CRO."
      ],
      [
        "Strategy / Analytics",
        "Brand audits, competitor analysis, 360 roadmaps, AI-powered dashboards, live reporting, and KPI frameworks."
      ]
    ],
    "reelEyebrow": "How We Work",
    "reelTitle": "Market entry. Launch. Scale.",
    "reel": [
      [
        "Discovery",
        "Business goals, audience, competitors, current performance, brand audit, and structured questionnaire."
      ],
      [
        "Strategy",
        "360 marketing strategy, content pillars, channel plan, KPI roadmap, and budget framework."
      ],
      [
        "Production",
        "Creative assets, copy, video, and campaign setup reviewed and approved before launch."
      ],
      [
        "Launch & Optimize",
        "Real-time tracking, media optimization, engagement analysis, lead quality checks, and creative refresh cycles."
      ],
      [
        "Report & Scale",
        "Weekly reports, monthly strategy reviews, dashboard access, scaling what works and cutting what does not."
      ]
    ],
    "proof": [
      "core markets: Saudi Arabia and Egypt",
      "regional reach across GCC and wider MENA",
      "\"We do not just run campaigns. We decode culture, engineer performance, and build brands that mean something.\"",
      "Double Eyes company profile"
    ],
    "contact": {
      "eyebrow": "Request a free consultation",
      "title": "Let's build something that matters.",
      "body": "Whether you're launching in Saudi Arabia, scaling in Egypt, or entering the wider MENA region, start with a conversation.",
      "location": "Riyadh / Cairo / GCC & MENA",
      "badge": "We reply within 24h",
      "formTitle": "Send the brief",
      "formBody": "Tell us where the brand is going next",
      "labels": [
        "Full name",
        "Email address",
        "Company name",
        "Project type",
        "Tell us about your brand",
        "How did you find us?"
      ],
      "placeholders": [
        "Your name",
        "hello@company.com",
        "Your brand name",
        "What market are you entering, scaling, or fixing?"
      ],
      "projects": [
        "360 marketing strategy",
        "Social media management",
        "Paid media & performance",
        "Branding & visual identity",
        "Website / e-commerce",
        "Influencer / PR / activation",
        "Content production",
        "Other"
      ],
      "sources": [
        "Google / Search",
        "Instagram",
        "LinkedIn",
        "Referral",
        "Event / Network",
        "Other"
      ],
      "submit": "Request consultation ->",
      "safe": "Your info is safe",
      "reply": "Reply within 24h"
    },
    "footer": {
      "body": "Bilingual 360 marketing for brands built to win Saudi Arabia, Egypt, and the wider MENA region.",
      "open": "Start the conversation",
      "start": "Request consultation",
      "bottom": "Riyadh / Cairo / GCC & MENA / Bilingual 360 marketing"
    },
    "formMessages": {
      "sending": "Sending...",
      "receivedPrefix": "Signal received. We will map the first route for",
      "invalidName": "Please enter your name.",
      "invalidEmail": "Please enter a valid email.",
      "invalidMessage": "Tell us a little more (10+ chars).",
      "success": "Brief received. We'll be in touch within a business day.",
      "error": "Something jammed the signal. Try again or email hello@doubleeyes.agency."
    }
  }
};

translations.en.processBody = "Every engagement moves through a clear rhythm: diagnose the market, build the system, launch with live data, then scale what proves itself.";
translations.en.market = {
  eyebrow: "Two Markets",
  title: "Cairo creative energy. Riyadh market rigour.",
  body: "Double Eyes was built by people from both sides of the Red Sea, so brands get cultural instinct and commercial discipline in the same room.",
  cards: [
    ["Saudi Arabia", "Riyadh", "Market entry, SME scale, Saudi consumer moments, and GCAM-aware influencer execution."],
    ["Egypt", "Cairo", "Creative production, Arabic copy, social velocity, and regional expansion support."],
    ["Reach", "GCC + MENA", "Campaign systems designed for bilingual audiences and cross-market growth."]
  ]
};
translations.en.credentials = {
  eyebrow: "Built For Trust",
  title: "Transparent, compliant, and obsessed with measurable growth.",
  cards: [
    ["AI-powered reporting", "Live dashboards, weekly performance reads, monthly strategy reviews, and clear optimization decisions."],
    ["GCAM compliance", "Influencer campaigns are planned with Saudi licensing requirements and brand safety in mind."],
    ["ROI-first methodology", "Every campaign starts with KPIs tied to leads, revenue, ROAS, pipeline quality, or growth."],
    ["Bilingual native team", "Strategists, creatives, and account leads move between Arabic and English without losing nuance."]
  ]
};

translations.ar = {
  title: "دبل آيز | وكالة تسويق 360 ثنائية اللغة",
  description: "دبل آيز وكالة تسويق وإعلان متكاملة 360 تعمل بين الرياض والقاهرة وتخدم أسواق الخليج والشرق الأوسط.",
  nav: ["من نحن", "الخدمات", "طريقة العمل", "تواصل"],
  footerNav: ["من نحن", "الخدمات", "طريقة العمل", "تواصل"],
  ctaNav: "اطلب استشارة",
  menuTitle: "فتح القائمة",
  heroEyebrow: "الرياض / القاهرة / الخليج والشرق الأوسط",
  heroTitle: "نبني استراتيجيات مدروسة<br>تفهم السوق والجمهور",
  heroLede: "نبني استراتيجيات تسويقية ترتكز على فهم عميق للسوق السعودي والمصري، والثقافة المحلية، وسلوك الجمهور المستهدف.",
  heroPrimary: "اطلب استشارة",
  heroSecondary: "استكشف الخدمات",
  consoleTop: "مؤشر القوة الإقليمية",
  consoleFooter: ["فهم سعودي", "موهبة مصرية", "انتشار خليجي"],
  marquee: ["استراتيجية عربية أصيلة", "إعلانات مدفوعة", "إدارة السوشيال", "تسويق مؤثرين", "SEO", "هوية بصرية", "مواقع إلكترونية", "علاقات عامة وتفعيل"],
  directorEyebrow: "من نحن",
  directorTitle: "وكالة واحدة.. بخبرة سوقين.",
  panels: [
    ["سعودية ومصرية", "تأسست الوكالة بخبرات سعودية ومصرية.", "نجمع بين الرؤية التجارية للسوق السعودي والطاقة الإبداعية المصرية لتقديم منظور تسويقي عميق قائم على الأداء والنتائج."],
    ["عقلية السوق المحلي", "لا نقوم بترجمة الأفكار إلى العربية.", "نبني الأفكار من الأساس بعقلية عربية وخليجية قريبة من الجمهور الحقيقي وتعكس طبيعة السوق."],
    ["الأداء والنتائج", "كل حملة وكل محتوى وكل إعلان مبني على هدف واضح.", "نربط التسويق بالنمو والعائد، ونقيس الأداء بتقارير وتحليلات مستمرة."],
    ["حلول 360", "لا نقدم خدمات منفصلة.", "نبني منظومة تسويقية متكاملة تعمل تحت سقف واحد لتحقيق نمو العلامة ونتائج فعلية."]
  ],
  collisionWord: "الرياض / القاهرة",
  collisionEyebrow: "ميزتنا",
  collisionTitle: "فهم حقيقي للسوق السعودي والخليجي والمصري، وشفافية كاملة في الأداء.",
  collisionCard: ["حضور إقليمي", "نعمل مع الشركات الناشئة، العلامات المتوسطة، الشركات المتوسعة، والعلامات الإقليمية والدولية لبناء حضور قوي ومستدام داخل السوق."],
  systemEyebrow: "ماذا نقدم",
  systemTitle: "حلول تسويقية متكاملة تحت سقف واحد.",
  bento: [
    ["إدارة حسابات التواصل", "إدارة احترافية لحسابات العلامة عبر Instagram وSnapchat وTikTok وX وYouTube وLinkedIn، مع خطط محتوى وتقارير دورية وإدارة تفاعل بالعربية والإنجليزية."],
    ["الهوية التجارية", "نصمم هوية متكاملة تعكس شخصية المشروع وتساعد على بناء صورة ذهنية قوية في أذهان العملاء."],
    ["صناعة المحتوى", "ننتج محتوى احترافيا مصمما للمنصات الرقمية الحديثة: تصوير، فيديو، ريلز، موشن جرافيك، تصميم وكتابة محتوى إبداعي."],
    ["الإعلانات الممولة", "ندير حملات Google وMeta وSnapchat وTikTok وProgrammatic مع التركيز على الوعي، المبيعات، التحويل، وجودة العملاء."],
    ["تحسين محركات البحث", "نرفع ظهور العلامات داخل محركات البحث من خلال التحليل التقني، دراسة الكلمات، تحسين المحتوى، بناء استراتيجية SEO، وتحسين أداء الموقع."],
    ["تصميم وتطوير المواقع", "نصمم مواقع احترافية تدعم نمو الأعمال وتحسن تجربة المستخدم، مع UI/UX، متاجر إلكترونية، توافق للجوال، وتهيئة SEO وCRO."],
    ["العلاقات والمجتمعات", "نبني صورة موثوقة وحضورا مؤثرا عبر العلاقات الإعلامية، البيانات الصحفية، إدارة السمعة، وبناء المجتمعات الرقمية."]
  ],
  reelEyebrow: "طريقة العمل",
  reelTitle: "آلية عمل واضحة من التحليل إلى التحسين.",
  processBody: "نعمل بخطوات منظمة تبدأ بفهم النشاط والسوق والجمهور، ثم بناء استراتيجية قابلة للقياس، وتنفيذ الحملات، ومتابعة الأداء وتطوير النتائج.",
  reel: [
    ["التحليل والاكتشاف", "فهم النشاط التجاري وتحليل السوق والمنافسين والجمهور المستهدف."],
    ["بناء الاستراتيجية", "إعداد خطة تسويقية متكاملة بأهداف واضحة ومؤشرات أداء قابلة للقياس."],
    ["التنفيذ والإنتاج", "تنفيذ الحملات وإنتاج المحتوى والإعلانات وفق أعلى المعايير."],
    ["المتابعة والتحسين", "تحليل الأداء وتطوير النتائج بشكل مستمر بناء على البيانات والتقارير."],
    ["النمو المستدام", "تحويل النتائج إلى قرارات تسويقية تساعد العلامة على بناء حضور قوي داخل السوق."]
  ],
  market: {
    eyebrow: "سوقان",
    title: "السوق المصري والسعودي والخليجي في منظور واحد.",
    body: "نعمل بين الرياض والقاهرة ونقدم حلولا تسويقية قائمة على الأداء والتحليل العميق للسوق، مع تغطية تمتد إلى الخليج والشرق الأوسط.",
    cards: [
      ["السعودية", "الرياض", "فهم لطبيعة السوق المحلي وسلوك المستهلك السعودي وطريقة صناعة التأثير داخله."],
      ["مصر", "القاهرة", "طاقة إبداعية مصرية وخبرة في المحتوى والإنتاج وبناء حضور رقمي مؤثر."],
      ["الانتشار", "الخليج والشرق الأوسط", "تغطية إقليمية تدعم العلامات التي تستهدف التوسع والنمو في الأسواق العربية."]
    ]
  },
  credentials: {
    eyebrow: "مبني للثقة",
    title: "التزاماتنا: نتائج قابلة للقياس ووضوح كامل.",
    cards: [
      ["نتائج قابلة للقياس", "نربط جميع الأعمال التسويقية بأهداف تجارية واضحة وعائد فعلي على الاستثمار."],
      ["تقارير واضحة وشفافة", "نؤمن بالوضوح الكامل في الأداء والنتائج دون تعقيد أو مبالغة."],
      ["فهم الأنظمة المحلية", "نعمل وفق الأنظمة التنظيمية داخل المملكة والخليج لضمان تنفيذ الحملات بشكل احترافي ومتوافق."],
      ["قصص نجاح حقيقية", "هدفنا بناء نتائج مستدامة تساعد العلامات التجارية على النمو وتحقيق حضور قوي داخل السوق."]
    ]
  },
  proof: [
    "سوقان أساسيان: السعودية ومصر",
    "انتشار إقليمي في الخليج والشرق الأوسط",
    "\"نحن لا ندير الحملات فقط. نفك شفرة الثقافة، نصمم الأداء، ونبني علامات لها معنى.\"",
    "ملف شركة دبل آيز"
  ],
  contact: {
    eyebrow: "اطلب استشارة مجانية",
    title: "لنبن علامة تجارية تستحق أن ترى.",
    body: "سواء كنتم تطلقون مشروعا جديدا، أو تتوسعون داخل السعودية أو مصر، أو تستهدفون النمو في الخليج والشرق الأوسط، فنحن هنا لنكون شريككم التسويقي في هذه الرحلة.",
    location: "الرياض / القاهرة / الخليج والشرق الأوسط",
    badge: "نرد خلال 24 ساعة",
    formTitle: "أرسل الملخص",
    formBody: "أخبرنا إلى أين تتجه العلامة",
    labels: ["الاسم الكامل", "البريد الإلكتروني", "اسم الشركة", "نوع المشروع", "حدثنا عن علامتك", "كيف وصلت إلينا؟"],
    placeholders: ["اسمك", "hello@company.com", "اسم علامتك", "أي سوق تريد دخوله أو توسيعه أو تحسينه؟"],
    projects: ["استراتيجية تسويق 360", "إدارة السوشيال", "إعلانات وأداء", "هوية بصرية", "موقع / متجر إلكتروني", "مؤثرون / علاقات عامة / تفعيل", "إنتاج محتوى", "أخرى"],
    sources: ["بحث جوجل", "إنستغرام", "لينكدإن", "ترشيح", "فعالية / شبكة علاقات", "أخرى"],
    submit: "اطلب الاستشارة ->",
    safe: "بياناتك محفوظة",
    reply: "الرد خلال 24 ساعة"
  },
  footer: {
    body: "تسويق 360 ثنائي اللغة للعلامات التي تريد الفوز في السعودية ومصر والشرق الأوسط.",
    open: "ابدأ المحادثة",
    start: "اطلب استشارة",
    bottom: "الرياض / القاهرة / الخليج والشرق الأوسط / تسويق 360 ثنائي اللغة"
  },
  formMessages: {
    sending: "جار الإرسال...",
    receivedPrefix: "وصل الطلب. سنرسم أول خطوة إلى",
    invalidName: "اكتب اسمك من فضلك.",
    invalidEmail: "اكتب بريدا صحيحا.",
    invalidMessage: "نحتاج تفاصيل أكثر قليلا (10 أحرف على الأقل).",
    success: "وصل الملخص. سنتواصل خلال يوم عمل.",
    error: "لم يصل الطلب. حاول مرة أخرى أو راسل hello@doubleeyes.agency."
  }
};

let currentLanguage = localStorage.getItem("doubleEyesLanguage") || "en";

const text = (selector, value, scope = document) => {
  const element = qs(selector, scope);
  if (element) element.textContent = value;
};

const allText = (selector, values, scope = document) => {
  qsa(selector, scope).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
};

const setOptions = (selector, values) => {
  const select = qs(selector);
  if (!select) return;
  qsa("option", select).forEach((option, index) => {
    if (values[index] !== undefined) option.textContent = values[index];
  });
};

const renderMarquee = (items) => {
  const marquee = qs("[data-marquee]");
  if (!marquee || !items?.length) return;

  const createSet = (hidden = false) => {
    const set = document.createElement("div");
    set.className = "marquee-set";
    if (hidden) set.setAttribute("aria-hidden", "true");

    items.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      set.appendChild(span);

      const separator = document.createElement("b");
      separator.setAttribute("aria-hidden", "true");
      set.appendChild(separator);
    });

    return set;
  };

  marquee.replaceChildren();
  marquee.classList.add("has-marquee-sets");
  marquee.append(createSet(), createSet(true));
};

const applyTranslations = (language = currentLanguage) => {
  const copy = translations[language] || translations.en;
  currentLanguage = language;
  localStorage.setItem("doubleEyesLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = copy.title;
  const description = qs('meta[name="description"]');
  if (description) description.setAttribute("content", copy.description);

  qsa("[data-language-option]").forEach((option) => {
    option.checked = option.value === language;
  });

  allText(".desktop-nav a", copy.nav);
  allText("#mobileMenu a", copy.nav);
  allText(".footer-nav a", copy.footerNav);
  text(".nav-cta", copy.ctaNav);
  const navIcon = document.createElement("i");
  navIcon.setAttribute("data-lucide", "sparkles");
  const navCta = qs(".nav-cta");
  if (navCta) navCta.prepend(navIcon);
  const menuButton = qs("[data-menu-toggle]");
  if (menuButton) menuButton.setAttribute("title", copy.menuTitle);

  text(".hero-copy .eyebrow", copy.heroEyebrow);
  const heroTitle = qs(".premium-title");
  if (heroTitle) heroTitle.innerHTML = copy.heroTitle;
  text(".hero-lede", copy.heroLede);
  text(".primary-button", copy.heroPrimary);
  const primaryIcon = document.createElement("i");
  primaryIcon.setAttribute("data-lucide", "zap");
  const primaryButton = qs(".primary-button");
  if (primaryButton) primaryButton.prepend(primaryIcon);
  text(".ghost-button", copy.heroSecondary);
  const ghostIcon = document.createElement("i");
  ghostIcon.setAttribute("data-lucide", "play");
  const ghostButton = qs(".ghost-button");
  if (ghostButton) ghostButton.prepend(ghostIcon);

  text(".console-top span", copy.consoleTop);
  allText(".console-footer span", copy.consoleFooter);
  renderMarquee(copy.marquee);
  text(".director-heading .eyebrow", copy.directorEyebrow);
  text(".director-heading .section-title", copy.directorTitle);
  qsa(".director-panel").forEach((panel, index) => {
    const panelCopy = copy.panels[index];
    if (!panelCopy) return;
    text(".panel-content span", panelCopy[0], panel);
    text(".panel-content h3", panelCopy[1], panel);
    text(".panel-content p", panelCopy[2], panel);
  });
  text(".collision-bg-word", copy.collisionWord);
  text(".collision-copy .eyebrow", copy.collisionEyebrow);
  text(".collision-copy .section-title", copy.collisionTitle);
  text(".collision-card span", copy.collisionCard[0]);
  text(".collision-card p", copy.collisionCard[1]);
  text(".bento-head .eyebrow", copy.systemEyebrow);
  text(".bento-head .section-title", copy.systemTitle);
  qsa(".bento-content, .bento-half").forEach((item, index) => {
    const itemCopy = copy.bento[index];
    if (!itemCopy) return;
    text(".bento-tag", itemCopy[0], item);
    text("h3", itemCopy[1], item);
  });
  text(".reel-head .eyebrow", copy.reelEyebrow);
  text(".reel-head .section-title", copy.reelTitle);
  text(".process-head .eyebrow", copy.reelEyebrow);
  text(".process-head .section-title", copy.reelTitle);
  text(".process-head p:not(.eyebrow)", copy.processBody);
  qsa("[data-process-step]").forEach((step, index) => {
    const stepCopy = copy.reel[index];
    if (!stepCopy) return;
    text("h3", stepCopy[0], step);
    text("p", stepCopy[1], step);
  });
  if (copy.market) {
    text(".market-copy .eyebrow", copy.market.eyebrow);
    text(".market-copy .section-title", copy.market.title);
    text(".market-copy p:not(.eyebrow)", copy.market.body);
    qsa(".market-map article").forEach((card, index) => {
      const cardCopy = copy.market.cards[index];
      if (!cardCopy) return;
      text("span", cardCopy[0], card);
      text("strong", cardCopy[1], card);
      text("p", cardCopy[2], card);
    });
  }
  if (copy.credentials) {
    text(".credentials-head .eyebrow", copy.credentials.eyebrow);
    text(".credentials-head .section-title", copy.credentials.title);
    qsa(".credential-card").forEach((card, index) => {
      const cardCopy = copy.credentials.cards[index];
      if (!cardCopy) return;
      text("h3", cardCopy[0], card);
      text("p", cardCopy[1], card);
    });
  }
  const proofPanels = qsa(".proof-panel");
  text("p", copy.proof[0], proofPanels[0]);
  text("p", copy.proof[1], proofPanels[1]);
  text("blockquote", copy.proof[2], proofPanels[2]);
  text("cite", copy.proof[3], proofPanels[2]);

  text("#contact .space-y-6 .text-white.font-semibold", copy.contact.eyebrow);
  text("#contact h2", copy.contact.title);
  text("#contact .space-y-6 > p", copy.contact.body);
  const contactItems = qsa("#contact ul span");
  if (contactItems[1]) contactItems[1].textContent = copy.contact.location;
  text("#contact .inline-flex .text-xs", copy.contact.badge);
  text("#contact h3", copy.contact.formTitle);
  text("#contact .text-center p", copy.contact.formBody);
  allText("#contact form label", copy.contact.labels);
  const inputs = qsa('#contact input[type="text"], #contact input[type="email"], #contact textarea');
  copy.contact.placeholders.forEach((placeholder, index) => {
    if (inputs[index]) inputs[index].setAttribute("placeholder", placeholder);
  });
  setOptions('select[name="project"]', copy.contact.projects);
  setOptions('select[name="source"]', copy.contact.sources);
  text('#contact button[type="submit"] span span', copy.contact.submit);
  const trustBadges = qsa("#contact form .pt-2 span");
  if (trustBadges[0]) trustBadges[0].textContent = copy.contact.safe;
  if (trustBadges[1]) trustBadges[1].textContent = copy.contact.reply;

  text(".footer-brand p", copy.footer.body);
  text(".footer-contact > span", copy.footer.open);
  text(".footer-button", copy.footer.start);
  const footerIcon = document.createElement("i");
  footerIcon.setAttribute("data-lucide", "arrow-up-right");
  const footerButton = qs(".footer-button");
  if (footerButton) footerButton.prepend(footerIcon);
  const footerBottom = qsa(".footer-bottom span");
  if (footerBottom[1]) footerBottom[1].textContent = copy.footer.bottom;

  bootIcons();
};

const setupLanguageSwitcher = () => {
  qsa("[data-language-option]").forEach((option) => {
    option.checked = option.value === currentLanguage;
    option.addEventListener("change", () => {
      if (!option.checked) return;
      applyTranslations(option.value);
      splitText();
      setupHeroEyes();
      setupMarquee();
      setupReel();
    });
  });
};

const bootIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ strokeWidth: 2, absoluteStrokeWidth: true });
  }
};

const splitText = () => {
  qsa("[data-split]").forEach((element) => {
    const nodes = Array.from(element.childNodes);
    const fragment = document.createDocumentFragment();

    const appendSplitWord = (content) => {
      const outer = document.createElement("span");
      const inner = document.createElement("span");
      outer.className = "split-word";

      if (typeof content === "string") {
        inner.textContent = content;
      } else {
        inner.appendChild(content);
      }

      outer.appendChild(inner);
      fragment.appendChild(outer);
      fragment.appendChild(document.createTextNode(" "));
    };

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .forEach(appendSplitWord);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        appendSplitWord(node.cloneNode(true));
      }
    });

    element.replaceChildren(fragment);
  });
};

const setupHeroEyes = () => {
  if (setupHeroEyes.cleanup) {
    setupHeroEyes.cleanup();
    setupHeroEyes.cleanup = null;
  }

  const eyes = qsa(".word-eye");
  const title = qs(".premium-title");
  if (!eyes.length || !title) return;

  let ambientTimer = 0;
  const glances = [
    [-0.75, 0.12],
    [0.7, -0.18],
    [0.15, 0.45],
    [-0.25, -0.32],
    [0, 0],
  ];
  let glanceIndex = 0;

  const setLook = (x, y) => {
    eyes.forEach((eye, index) => {
      eye.style.setProperty("--eye-x", `${(x * 0.105 + (index ? 0.012 : -0.012)).toFixed(3)}em`);
      eye.style.setProperty("--eye-y", `${(y * 0.075).toFixed(3)}em`);
    });
  };

  const resumeAmbient = () => {
    if (prefersReducedMotion || ambientTimer) return;
    ambientTimer = window.setInterval(() => {
      glanceIndex = (glanceIndex + 1) % glances.length;
      setLook(glances[glanceIndex][0], glances[glanceIndex][1]);
    }, 1700);
  };

  const pauseAmbient = () => {
    window.clearInterval(ambientTimer);
    ambientTimer = 0;
  };

  const onPointerMove = (event) => {
      const rect = title.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      pauseAmbient();
      setLook(x, y);
      window.clearTimeout(setupHeroEyes.resumeTimer);
      setupHeroEyes.resumeTimer = window.setTimeout(resumeAmbient, 1100);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  setupHeroEyes.cleanup = () => {
    window.removeEventListener("pointermove", onPointerMove);
    pauseAmbient();
    window.clearTimeout(setupHeroEyes.resumeTimer);
  };

  if (!prefersReducedMotion) {
    animate(".word-eye", { scale: [1, 1.08, 1] }, { duration: 3.4, delay: stagger(0.1), repeat: Infinity, easing: "ease-in-out" });
    animate(".eye-word", { y: [0, -5, 0] }, { duration: 4.8, repeat: Infinity, easing: "ease-in-out" });
    resumeAmbient();
  }
};

const setupPreloader = () => {
  const preloader = qs(".preloader");
  if (!preloader) return;

  if (prefersReducedMotion) {
    preloader.remove();
    return;
  }

  window.setTimeout(() => {
    animate(preloader, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.75, easing: [0.16, 1, 0.3, 1] });
    window.setTimeout(() => preloader.remove(), 820);
  }, 850);
};

const setupMenu = () => {
  const button = qs("[data-menu-toggle]");
  const menu = qs("#mobileMenu");
  if (!button || !menu) return;

  const closeMenu = () => {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
  });

  qsa("a", menu).forEach((link) => link.addEventListener("click", closeMenu));
};

const setupProgress = () => {
  const progress = qs("#siteProgress");
  if (!progress || prefersReducedMotion) return;

  try {
    scroll(animate(progress, { scaleX: [0, 1] }, { ease: "linear" }));
  } catch (e) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const amount = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = `scaleX(${Math.min(Math.max(amount, 0), 1).toFixed(4)})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }
};

const setupCursor = () => {
  const orb = qs(".cursor-orb");
  if (!orb || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  let frame = 0;
  let visible = false;
  const point = { x: 0, y: 0 };

  window.addEventListener(
    "pointermove",
    (event) => {
      point.x = event.clientX;
      point.y = event.clientY;
      if (!visible) {
        visible = true;
        animate(orb, { opacity: 1 }, { duration: 0.25 });
      }
      if (!frame) {
        frame = requestAnimationFrame(() => {
          orb.style.left = `${point.x}px`;
          orb.style.top = `${point.y}px`;
          frame = 0;
        });
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    visible = false;
    animate(orb, { opacity: 0 }, { duration: 0.25 });
  });
};

const setupHero = () => {
  if (prefersReducedMotion) return;

  animate(
    ".split-word > span",
    { y: ["110%", "0%"], rotate: [5, 0] },
    { duration: 0.95, delay: stagger(0.07, { startDelay: 0.65 }), easing: [0.16, 1, 0.3, 1] }
  );

  animate(
    ".rail",
    { opacity: [0, 1], y: [90, 0], scale: [0.86, 1] },
    { duration: 1.2, delay: stagger(0.13, { startDelay: 0.7 }), easing: [0.16, 1, 0.3, 1] }
  );

  animate(".rail-a", { y: [0, -28, 0], rotate: [-8, -3, -8] }, { duration: 7, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-b", { y: [0, 22, 0], rotate: [5, 1, 5] }, { duration: 8, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-c", { y: [0, -18, 0], rotate: [-3, -8, -3] }, { duration: 6.4, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-d", { y: [0, 26, 0], rotate: [9, 4, 9] }, { duration: 7.5, repeat: Infinity, easing: "ease-in-out" });
  animate(".hero-orbit", { rotate: 360 }, { duration: 26, repeat: Infinity, easing: "linear" });
  animate(".console-map span", { scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }, { duration: 2, delay: stagger(0.22), repeat: Infinity });
};

const setupAttentionScene = () => {
  const canvas = qs("#attentionScene");
  if (!canvas || !THREE || prefersReducedMotion) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const group = new THREE.Group();
  scene.add(group);

  const red = new THREE.Color(0xf00816);
  const white = new THREE.Color(0xffffff);
  const positions = [];
  const colors = [];

  for (let i = 0; i < 1800; i += 1) {
    const band = i % 2 === 0 ? 1.0 : 0.62;
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.25 + Math.random() * 2.25;
    const x = Math.cos(angle) * radius * 1.55;
    const y = Math.sin(angle) * radius * 0.52 * band;
    const z = (Math.random() - 0.5) * 3.5;
    positions.push(x, y, z);
    const color = Math.random() > 0.72 ? red : white;
    colors.push(color.r, color.g, color.b);
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.026,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });

  const points = new THREE.Points(particleGeometry, particleMaterial);
  group.add(points);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xf00816, transparent: true, opacity: 0.34 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.01, 12, 160), ringMaterial);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.012, 12, 160), ringMaterial.clone());
  ringA.scale.y = 0.32;
  ringB.scale.y = 0.32;
  ringB.material.opacity = 0.5;
  group.add(ringA, ringB);

  const pupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xf00816, transparent: true, opacity: 0.95 })
  );
  pupil.position.set(0.65, 0, 0.15);
  group.add(pupil);

  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);

  let frame = 0;
  const render = () => {
    frame += 0.01;
    group.rotation.y += 0.0035;
    group.rotation.x += (pointer.y * 0.14 - group.rotation.x) * 0.035;
    group.rotation.z += (pointer.x * 0.08 - group.rotation.z) * 0.035;
    points.rotation.z = Math.sin(frame) * 0.06;
    ringA.rotation.z -= 0.004;
    ringB.rotation.z += 0.006;
    pupil.position.x = 0.65 + pointer.x * 0.12;
    pupil.position.y = pointer.y * -0.08;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};

const setupCollisionMotion = () => {
  if (prefersReducedMotion) return;

  animate(".collision-one", { y: [0, -24, 0], rotate: [-7, -2, -7] }, { duration: 7.4, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-two", { y: [0, 18, 0], rotate: [5, 9, 5] }, { duration: 8.2, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-three", { y: [0, -16, 0], rotate: [10, 5, 10] }, { duration: 6.6, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-red span", { scaleY: [1, 0.34, 1], opacity: [1, 0.58, 1] }, { duration: 1.6, delay: stagger(0.18), repeat: Infinity, easing: "ease-in-out" });
};

const setupDirectorBoard = () => {
  const board = qs("[data-director-board]");
  if (!board) return;

  const panels = qsa("[data-director-panel]", board);
  if (!panels.length) return;

  const activate = (activePanel) => {
    panels.forEach((panel) => {
      const active = panel === activePanel;
      panel.classList.toggle("is-active", active);
      if (!prefersReducedMotion) {
        animate(panel, { opacity: active ? 1 : 0.72 }, { duration: 0.45, easing: [0.16, 1, 0.3, 1] });
        animate(qs(".panel-content", panel), { y: active ? [18, 0] : 0 }, { duration: 0.55, easing: [0.16, 1, 0.3, 1] });
      }
    });
  };

  panels.forEach((panel) => {
    panel.addEventListener("pointerenter", () => activate(panel));
    panel.addEventListener("focusin", () => activate(panel));
    panel.addEventListener("click", () => activate(panel));
    panel.setAttribute("tabindex", "0");
  });

  if (!prefersReducedMotion) {
    animate(".director-backdrop img", { x: ["-2%", "2%", "-2%"] }, { duration: 9, repeat: Infinity, easing: "ease-in-out" });
  }
};

const setupReveals = () => {
  if (prefersReducedMotion) {
    qsa(".reveal").forEach((element) => {
      element.style.opacity = 1;
      element.style.transform = "none";
    });
    return;
  }

  qsa(".reveal").forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(46px)";
  });

  inView(
    ".reveal",
    (element) => {
      animate(element, { opacity: 1, y: [46, 0] }, { duration: 0.82, easing: [0.16, 1, 0.3, 1] });
    },
    { amount: 0.18, margin: "0px 0px -10% 0px" }
  );
};

const setupMarquee = () => {
  const marquee = qs("[data-marquee]");
  if (!marquee) return;
  marquee.classList.remove("is-animated");
  marquee.style.transform = "translate3d(0, 0, 0)";
  if (prefersReducedMotion) return;

  requestAnimationFrame(() => {
    const firstSet = qs(".marquee-set", marquee);
    const distance = firstSet ? firstSet.offsetWidth : marquee.scrollWidth / 2;
    if (!distance) return;

    marquee.style.setProperty("--marquee-offset", `${-distance}px`);
    marquee.style.setProperty("--marquee-duration", `${Math.max(18, distance / 70).toFixed(2)}s`);
    marquee.style.transform = "translate3d(0, 0, 0)";
    void marquee.offsetWidth;
    marquee.classList.add("is-animated");
  });
};

const setupReel = () => {
  const track = qs("[data-reel-track]");
  if (!track) return;

  if (reelAnimation) {
    reelAnimation.cancel?.();
    reelAnimation.stop?.();
    reelAnimation = null;
  }

  qsa('.cinema-card[aria-hidden="true"]', track).forEach((card) => card.remove());
  const originalCards = qsa(".cinema-card", track);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  track.dataset.cloned = "true";
  track.style.transform = "translate3d(0, 0, 0)";

  if (prefersReducedMotion) return;

  requestAnimationFrame(() => {
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
    const distance = originalCards.reduce((total, card) => total + card.offsetWidth, 0) + originalCards.length * gap;
    if (!distance) return;
    reelAnimation = animate(track, { x: [0, -distance] }, { duration: Math.max(30, distance / 75), repeat: Infinity, easing: "linear" });
  });

  animate(".cinema-card img", { scale: [1, 1.12, 1] }, { duration: 10, delay: stagger(0.4), repeat: Infinity, easing: "ease-in-out" });
};

const setupCounters = () => {
  const format = (value, element) => {
    const suffix = element.dataset.suffix || "";
    const prefix = element.dataset.prefix || "";
    return `${prefix}${Math.round(value)}${suffix}`;
  };

  qsa(".stat-number").forEach((element) => {
    const target = Number(element.dataset.value || 0);
    inView(
      element,
      () => {
        if (prefersReducedMotion) {
          element.textContent = format(target, element);
          return;
        }
        animate(0, target, {
          duration: 1.5,
          easing: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            element.textContent = format(latest, element);
          }
        });
      },
      { amount: 0.75 }
    );
  });
};

const setupMagnetic = () => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  qsa(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      animate(element, { x, y }, { type: "spring", stiffness: 420, damping: 28 });
    });
    element.addEventListener("pointerleave", () => {
      animate(element, { x: 0, y: 0 }, { type: "spring", stiffness: 360, damping: 22 });
    });
  });
};

const setupTiltAndDepth = () => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  qsa(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
  });

  qsa("[data-depth-card]").forEach((card) => {
    const layers = qsa(".depth-layer", card);
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer, index) => {
        const depth = 16 + index * 10;
        animate(layer, { x: x * depth, y: y * depth * -1 }, { type: "spring", stiffness: 160, damping: 24 });
      });
    });
    card.addEventListener("pointerleave", () => {
      layers.forEach((layer) => animate(layer, { x: 0, y: 0 }, { type: "spring", stiffness: 160, damping: 24 }));
    });
  });
};

const setupParallax = () => {
  if (prefersReducedMotion) return;
  const targets = qsa(".bento-bg, .hero-logo-ghost img, .cta-logo img");
  if (!targets.length) return;

  try {
    targets.forEach((target) => {
      scroll(animate(target, { y: [-30, 30] }), {
        target: target.parentElement,
        offset: ["start end", "end start"]
      });
    });
  } catch (e) {
    const update = () => {
      targets.forEach((target, index) => {
        const rect = target.getBoundingClientRect();
        const amount = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        target.style.transform = `translateY(${(amount * -28).toFixed(2)}px) scale(${index === 0 ? 1.06 : 1})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
};

const setupForm = () => {
  const form = qs("#contactForm");
  const note = qs("#formStatus");
  const button = qs("button", form);
  if (!form || !note || !button) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const messages = translations[currentLanguage].formMessages;
    note.textContent = "";

    if (!data.name || String(data.name).trim().length < 2) {
      note.textContent = messages.invalidName;
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(String(data.email || "").trim())) {
      note.textContent = messages.invalidEmail;
      return;
    }
    if (!data.message || String(data.message).trim().length < 10) {
      note.textContent = messages.invalidMessage;
      return;
    }

    const originalHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<i data-lucide="loader"></i> ${messages.sending}`;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      note.textContent = messages.success;
      form.reset();
      button.disabled = false;
      button.innerHTML = originalHtml;
      if (window.lucide) window.lucide.createIcons();
    }, 700);
  });
};

const boot = () => {
  applyTranslations(currentLanguage);
  setupLanguageSwitcher();
  splitText();
  bootIcons();
  setupPreloader();
  setupMenu();
  setupProgress();
  setupCursor();
  setupAttentionScene();
  setupHero();
  setupHeroEyes();
  setupDirectorBoard();
  setupCollisionMotion();
  setupReveals();
  setupMarquee();
  setupReel();
  setupCounters();
  setupMagnetic();
  setupTiltAndDepth();
  setupParallax();
  setupForm();
};

const loadMotion = async () => {
  try {
    const motion = await import("https://esm.sh/framer-motion@12.23.24/dom?bundle");
    THREE = await import("https://esm.sh/three@0.164.1");
    animate = motion.animate;
    inView = motion.inView;
    stagger = motion.stagger;
    scroll = motion.scroll;
  } catch (error) {
    console.warn("Framer Motion could not be loaded. Static fallbacks are active.", error);
  }
};

const start = async () => {
  await loadMotion();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
};

start();
