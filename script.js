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
  en: `We decode culture.
          <br>
          Engineer performance.
          <br>
          <p class="eye-word mt-5" data-keep-split>
            l
            <span class="word-eyes inline-flex -translate-y-8 align-middle" aria-label="oo">
              <span class="sr-only">oo</span>
              <span
                class="word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
              </span>
              <span
                class="word-eye relative ml-1 inline-flex h-15 w-50 items-center justify-center rounded-full border-6 border-white">
                <span class="h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            </span>
            k.
          </p>`,
  ar: `نفك شفرة الثقافة.<br>ونصمم الأداء.<br>ونبني علامات لها معنى.`
};

const translations = {
  en: {
    title: "Double Eyes | 360 Marketing Agency in Saudi Arabia",
    description: "Double Eyes is an independent bilingual 360 marketing and advertising agency based in Saudi Arabia, serving brands across the GCC and wider MENA region.",
    nav: ["Who We Are", "Services", "How We Work", "Contact"],
    footerNav: ["Who We Are", "Services", "How We Work", "Contact"],
    ctaNav: "Request consultation",
    menuTitle: "Open menu",
    heroEyebrow: "Saudi Arabia / GCC / MENA",
    heroTitle: heroTitleHtml.en,
    heroLede: "Double Eyes is an independent bilingual 360 marketing agency built to help ambitious brands grow through cultural insight, creative excellence, and performance-driven execution.",
    heroPrimary: "Request a consultation",
    heroSecondary: "Explore services",
    consoleTop: "Regional growth signal",
    consoleFooter: ["Saudi insight", "Arabic-native", "MENA reach"],
    marquee: [
      "Arabic-native strategy",
      "Social media management",
      "Paid media",
      "Content production",
      "Brand identity",
      "Influencer marketing",
      "SEO",
      "Web development",
      "PR & activation"
    ],
    directorEyebrow: "Who We Are",
    directorTitle: "A Saudi-based 360 agency built for regional growth.",
    panels: [
      [
        "Independent 360 Agency",
        "We connect strategy, creative, media, web, PR, and activation.",
        "Every engagement is planned as one connected marketing system, not a pile of disconnected deliverables."
      ],
      [
        "Arabic-Native Thinking",
        "We do not translate strategy into Arabic. We think in it.",
        "Creative, copy, community management, and media buying are built around how Arabic-speaking audiences behave, speak, and purchase."
      ],
      [
        "Performance Discipline",
        "Creativity is tied to measurable business impact.",
        "ROAS, CPL, conversion rate, lead quality, revenue, and pipeline value shape how we plan, optimize, report, and scale."
      ],
      [
        "Regional Expertise",
        "We understand the GCC and wider MENA from the inside.",
        "From Ramadan and national moments to Snapchat, TikTok, search, and influencer behavior, we build campaigns around local culture and platform nuance."
      ]
    ],
    collisionWord: "SAUDI / GCC / MENA",
    collisionEyebrow: "Our Advantage",
    collisionTitle: "Cultural relevance, live performance insight, and hands-on partnership for brands ready to grow.",
    collisionCard: [
      "regional fluency",
      "Built for Saudi businesses ready to scale, international companies entering the region, and ambitious brands expanding across the Middle East."
    ],
    systemEyebrow: "What We Do",
    systemTitle: "A complete service suite under one strategic roof.",
    bento: [
      [
        "Digital / Social",
        "End-to-end social media management across Instagram, Snapchat, TikTok, X, YouTube, and LinkedIn, with strategy, calendars, community, and reporting."
      ],
      [
        "Branding",
        "Brand strategy, visual identity, Arabic and bilingual branding, messaging, guidelines, rebranding, and print collateral."
      ],
      [
        "Production",
        "Photo shoots, video, reels, motion graphics, design, product demos, and creative copy designed to stop the scroll."
      ],
      [
        "Performance / Paid Media",
        "Full-funnel campaigns across Google, Meta, Snapchat, TikTok, and programmatic with ROAS tracking and real-time budget optimization."
      ],
      [
        "SEO",
        "Technical audits, keyword research, Arabic SEO, on-page optimization, content strategy, and link building for sustainable visibility."
      ],
      [
        "Web",
        "Mobile-first, bilingual-ready websites, landing pages, e-commerce platforms, maintenance, SEO structure, and conversion rate optimization."
      ],
      [
        "Strategy / PR / Activation",
        "Brand audits, competitor analysis, AI-powered dashboards, PR, community building, OOH, events, and in-store activations."
      ]
    ],
    reelEyebrow: "How We Work",
    reelTitle: "A rigorous process from brief to results.",
    processBody: "We move through a clear rhythm: understand the business and market, build a measurable strategy, produce the work, launch with live tracking, then report and scale what works.",
    reel: [
      [
        "Discovery",
        "Deep dive into business goals, target audience, competitors, current performance, brand audit, and structured questionnaire."
      ],
      [
        "Strategy",
        "A bespoke 360 marketing plan with content pillars, channel plan, KPI roadmap, budget framework, and action plan."
      ],
      [
        "Production",
        "Creative assets, copy, video, content, and campaign setup built and approved before launch."
      ],
      [
        "Launch & Optimize",
        "Campaigns go live with real-time tracking, media optimization, engagement analysis, lead quality checks, and creative refresh cycles."
      ],
      [
        "Report & Scale",
        "Weekly performance reports, monthly strategy reviews, dashboard visibility, and decisions on what to scale next."
      ]
    ],
    market: {
      eyebrow: "Regional Focus",
      title: "Saudi roots. GCC fluency. MENA ambition.",
      body: "Double Eyes helps brands navigate diverse Middle Eastern markets, connect with local audiences, and build meaningful presence through bilingual strategy and execution.",
      cards: [
        ["Saudi Arabia", "Market Core", "Saudi consumer behavior, local culture, regulatory awareness, influencer compliance, and platform-specific campaign execution."],
        ["GCC", "Regional Reach", "Campaign systems shaped for Gulf audiences, cultural calendars, Arabic content, and cross-market growth."],
        ["MENA", "Expansion", "Bilingual strategy and creative execution for brands entering, scaling, or repositioning across the wider region."]
      ]
    },
    credentials: {
      eyebrow: "Built For Trust",
      title: "Transparent, compliant, and focused on measurable growth.",
      cards: [
        ["Live reporting", "Clients get weekly performance reports, AI-powered dashboard visibility, and clear reads on what is working and where to optimize."],
        ["GCAM compliance", "Influencer campaigns are planned around Saudi GCAM and Mawthooq licensing requirements to reduce legal and operational risk."],
        ["ROI-first methodology", "Every engagement starts with KPIs tied to real business outcomes: leads, revenue, ROAS, conversion quality, and pipeline value."],
        ["Regional legal awareness", "Compliance, advertising standards, and market-specific considerations are built into planning so brands can move confidently."]
      ]
    },
    proof: [
      "core focus: Saudi Arabia, GCC, and MENA growth",
      "full 360° marketing scope across strategy, creative, media, web, PR, and activation",
      "\"We do not just run campaigns. We decode culture, engineer performance, and build brands that mean something.\"",
      "Double Eyes company profile"
    ],
    contact: {
      eyebrow: "Request a free consultation",
      title: "Let's build something that matters.",
      body: "Whether you are launching in Saudi Arabia, expanding across the GCC, or growing throughout the MENA region, start with a conversation.",
      location: "Saudi Arabia / GCC / MENA",
      badge: "We reply within 24h",
      formTitle: "Send the brief",
      formBody: "Tell us where the brand is going next",
      labels: ["Full name", "Email address", "Company name", "Project type", "Tell us about your brand", "How did you find us?"],
      placeholders: ["Your name", "hello@company.com", "Your brand name", "What market are you entering, scaling, or fixing?"],
      projects: [
        "360 marketing strategy",
        "Social media management",
        "Paid media & performance",
        "Branding & visual identity",
        "Website / e-commerce",
        "Influencer marketing",
        "PR / community / activation",
        "Content production",
        "Other"
      ],
      sources: ["Google / Search", "Instagram", "LinkedIn", "Referral", "Event / Network", "Other"],
      submit: "Request consultation ->",
      safe: "Your info is safe",
      reply: "Reply within 24h"
    },
    footer: {
      body: "Bilingual 360 marketing for brands built to grow in Saudi Arabia, the GCC, and the wider MENA region.",
      open: "Start the conversation",
      start: "Request consultation",
      bottom: "Saudi Arabia / GCC / MENA / Bilingual 360 marketing"
    },
    formMessages: {
      sending: "Sending...",
      receivedPrefix: "Signal received. We will map the first route for",
      invalidName: "Please enter your name.",
      invalidEmail: "Please enter a valid email.",
      invalidMessage: "Tell us a little more (10+ chars).",
      success: "Brief received. We'll be in touch within a business day.",
      error: "Something jammed the signal. Try again or email hello@doubleeyes.agency."
    }
  },
  ar: {
    title: "دبل آيز | وكالة تسويق وإعلان 360 في السعودية",
    description: "دبل آيز وكالة تسويق وإعلان مستقلة ثنائية اللغة 360، مقرها السعودية وتخدم العلامات التجارية في الخليج والشرق الأوسط وشمال أفريقيا.",
    nav: ["من نحن", "الخدمات", "طريقة العمل", "تواصل"],
    footerNav: ["من نحن", "الخدمات", "طريقة العمل", "تواصل"],
    ctaNav: "اطلب استشارة",
    menuTitle: "فتح القائمة",
    heroEyebrow: "السعودية / الخليج / الشرق الأوسط",
    heroTitle: "نفك شفرة الثقافة.<br>ونصمم الأداء.<br>ونبني علامات لها معنى.",
    heroLede: "دبل آيز وكالة تسويق 360 ثنائية اللغة، تساعد العلامات الطموحة على النمو من خلال فهم السوق، والإبداع، والتنفيذ القائم على الأداء.",
    heroPrimary: "اطلب استشارة",
    heroSecondary: "استكشف الخدمات",
    consoleTop: "مؤشر النمو الإقليمي",
    consoleFooter: ["فهم سعودي", "عربي أصيل", "انتشار إقليمي"],
    marquee: [
      "استراتيجية عربية أصيلة",
      "إدارة السوشيال",
      "إعلانات ممولة",
      "إنتاج محتوى",
      "هوية تجارية",
      "تسويق مؤثرين",
      "SEO",
      "تطوير مواقع",
      "علاقات عامة وتفعيل"
    ],
    directorEyebrow: "من نحن",
    directorTitle: "وكالة 360 سعودية المنشأ ومبنية للنمو الإقليمي.",
    panels: [
      [
        "وكالة 360 مستقلة",
        "نربط الاستراتيجية والإبداع والإعلام والمواقع والتفعيل في منظومة واحدة.",
        "لا نتعامل مع الخدمات كعناصر منفصلة، بل نبني نظاما تسويقيا متكاملا يخدم نمو العلامة ونتائجها."
      ],
      [
        "تفكير عربي أصيل",
        "لا نترجم الاستراتيجية إلى العربية، بل نفكر بها من البداية.",
        "المحتوى، والكتابة، وإدارة المجتمع، وشراء الإعلانات تبنى حول طريقة تفكير الجمهور العربي وسلوكه وقراره."
      ],
      [
        "انضباط الأداء",
        "الإبداع مرتبط دائما بأثر تجاري قابل للقياس.",
        "نقيس الحملات عبر العائد، تكلفة العميل المحتمل، التحويل، جودة العملاء، الإيراد، وقيمة الفرص."
      ],
      [
        "خبرة إقليمية",
        "نفهم الخليج والشرق الأوسط من داخل السوق.",
        "من رمضان والمناسبات الوطنية إلى سناب شات وتيك توك والبحث والمؤثرين، نبني الحملات على الثقافة وسلوك المنصات."
      ]
    ],
    collisionWord: "السعودية / الخليج / مينا",
    collisionEyebrow: "ميزتنا",
    collisionTitle: "ملاءمة ثقافية، ووضوح في الأداء، وشراكة عملية للعلامات الجاهزة للنمو.",
    collisionCard: [
      "فهم إقليمي",
      "مناسب للشركات السعودية التي تريد التوسع، والشركات الدولية التي تدخل المنطقة، والعلامات الطموحة التي تنمو في الشرق الأوسط."
    ],
    systemEyebrow: "ماذا نقدم",
    systemTitle: "حلول تسويقية متكاملة تحت سقف استراتيجي واحد.",
    bento: [
      [
        "رقمي / سوشيال",
        "إدارة متكاملة لحضور العلامة عبر Instagram وSnapchat وTikTok وX وYouTube وLinkedIn، مع استراتيجية ومحتوى ومجتمع وتقارير."
      ],
      [
        "الهوية التجارية",
        "استراتيجية العلامة، الهوية البصرية، الهوية العربية وثنائية اللغة، الرسائل، الدليل البصري، إعادة التسمية، والمطبوعات."
      ],
      [
        "إنتاج المحتوى",
        "تصوير فوتوغرافي، فيديو، ريلز، موشن جرافيك، تصميم، عروض منتجات، وكتابة إبداعية مصممة لتلفت الانتباه."
      ],
      [
        "الإعلانات والأداء",
        "حملات متكاملة عبر Google وMeta وSnapchat وTikTok وProgrammatic مع تتبع العائد وتحسين الميزانية بشكل مستمر."
      ],
      [
        "SEO",
        "تحليل تقني، بحث كلمات، SEO عربي، تحسين الصفحات، استراتيجية محتوى، وبناء روابط لرفع الظهور على المدى الطويل."
      ],
      [
        "المواقع",
        "مواقع ومتاجر وصفحات هبوط متوافقة مع الجوال وثنائية اللغة، مع صيانة، وتهيئة بحث، وتحسين معدلات التحويل."
      ],
      [
        "استراتيجية / علاقات / تفعيل",
        "تحليل العلامة والمنافسين، لوحات بيانات مدعومة بالذكاء الاصطناعي، علاقات عامة، بناء مجتمعات، إعلانات خارجية، فعاليات، وتفعيل داخل المتاجر."
      ]
    ],
    reelEyebrow: "طريقة العمل",
    reelTitle: "من الملخص إلى النتائج بخطوات واضحة.",
    processBody: "نبدأ بفهم النشاط والسوق، ثم نبني استراتيجية قابلة للقياس، وننتج العمل، ونطلق الحملات بتتبع مباشر، ثم نراجع النتائج ونوسع ما ينجح.",
    reel: [
      [
        "الاكتشاف",
        "فهم الأهداف، الجمهور، المنافسين، الأداء الحالي، تدقيق العلامة، واستبيان منظم."
      ],
      [
        "الاستراتيجية",
        "خطة تسويق 360 مع محاور محتوى، قنوات، مؤشرات أداء، إطار ميزانية، وخطة تنفيذ واضحة."
      ],
      [
        "الإنتاج",
        "أصول إبداعية، كتابة، فيديو، محتوى، وإعداد الحملات قبل الإطلاق والمراجعة."
      ],
      [
        "الإطلاق والتحسين",
        "تتبع مباشر، تحسين الإعلانات، تحليل التفاعل، فحص جودة العملاء، وتجديد الإبداع عند الحاجة."
      ],
      [
        "التقرير والتوسع",
        "تقارير أسبوعية، مراجعات استراتيجية شهرية، وضوح عبر اللوحات، وقرارات حول ما يستحق التوسع."
      ]
    ],
    market: {
      eyebrow: "تركيز إقليمي",
      title: "جذور سعودية. فهم خليجي. طموح مينا.",
      body: "تساعد دبل آيز العلامات على فهم الأسواق العربية المتنوعة، والتواصل مع الجمهور المحلي، وبناء حضور مؤثر من خلال استراتيجية وتنفيذ ثنائي اللغة.",
      cards: [
        ["السعودية", "السوق الأساسي", "سلوك المستهلك السعودي، الثقافة المحلية، الوعي التنظيمي، امتثال المؤثرين، وتنفيذ الحملات حسب طبيعة كل منصة."],
        ["الخليج", "انتشار إقليمي", "أنظمة حملات مصممة للجمهور الخليجي، والمواسم الثقافية، والمحتوى العربي، والنمو عبر أكثر من سوق."],
        ["مينا", "التوسع", "استراتيجية وإبداع ثنائي اللغة للعلامات التي تدخل المنطقة أو تتوسع أو تعيد تموضعها في الشرق الأوسط."]
      ]
    },
    credentials: {
      eyebrow: "مبني للثقة",
      title: "شفافية، امتثال، وتركيز على نمو قابل للقياس.",
      cards: [
        ["تقارير مباشرة", "تقارير أداء أسبوعية، ولوحات بيانات مدعومة بالذكاء الاصطناعي، ووضوح كامل حول ما يعمل وما يحتاج إلى تحسين."],
        ["امتثال GCAM", "حملات المؤثرين تخطط وفق متطلبات تراخيص GCAM وموثوق في السعودية لتقليل المخاطر القانونية والتشغيلية."],
        ["منهجية ROI أولا", "كل تعاون يبدأ بمؤشرات أداء مرتبطة بنتائج حقيقية مثل العملاء المحتملين، الإيراد، العائد، جودة التحويل، وقيمة الفرص."],
        ["وعي تنظيمي إقليمي", "نراعي الأنظمة ومعايير الإعلان وخصوصية كل سوق منذ التخطيط حتى التنفيذ حتى تتحرك العلامات بثقة."]
      ]
    },
    proof: [
      "تركيز أساسي: السعودية والخليج والشرق الأوسط",
      "نطاق 360° يشمل الاستراتيجية والإبداع والإعلام والمواقع والعلاقات والتفعيل",
      "\"نحن لا ندير الحملات فقط. نفك شفرة الثقافة، ونصمم الأداء، ونبني علامات لها معنى.\"",
      "ملف شركة دبل آيز"
    ],
    contact: {
      eyebrow: "اطلب استشارة مجانية",
      title: "لنبن شيئا له معنى.",
      body: "سواء كنتم تطلقون في السعودية، أو تتوسعون في الخليج، أو تنمون في منطقة الشرق الأوسط وشمال أفريقيا، ابدأوا بمحادثة.",
      location: "السعودية / الخليج / الشرق الأوسط",
      badge: "نرد خلال 24 ساعة",
      formTitle: "أرسل الملخص",
      formBody: "أخبرنا إلى أين تتجه العلامة",
      labels: ["الاسم الكامل", "البريد الإلكتروني", "اسم الشركة", "نوع المشروع", "حدثنا عن علامتك", "كيف وصلت إلينا؟"],
      placeholders: ["اسمك", "hello@company.com", "اسم علامتك", "أي سوق تريد دخوله أو التوسع فيه أو تحسينه؟"],
      projects: [
        "استراتيجية تسويق 360",
        "إدارة السوشيال",
        "إعلانات وأداء",
        "هوية بصرية",
        "موقع / متجر إلكتروني",
        "تسويق مؤثرين",
        "علاقات عامة / مجتمع / تفعيل",
        "إنتاج محتوى",
        "أخرى"
      ],
      sources: ["بحث جوجل", "إنستغرام", "لينكدإن", "ترشيح", "فعالية / شبكة علاقات", "أخرى"],
      submit: "اطلب الاستشارة ->",
      safe: "بياناتك محفوظة",
      reply: "الرد خلال 24 ساعة"
    },
    footer: {
      body: "تسويق 360 ثنائي اللغة للعلامات التي تريد النمو في السعودية والخليج والشرق الأوسط.",
      open: "ابدأ المحادثة",
      start: "اطلب استشارة",
      bottom: "السعودية / الخليج / الشرق الأوسط / تسويق 360 ثنائي اللغة"
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
