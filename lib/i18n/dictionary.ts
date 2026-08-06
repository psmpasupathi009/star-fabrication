import type { Locale } from "@/lib/i18n/config";

export type Dictionary = {
  skipToContent: string;
  nav: {
    about: string;
    services: string;
    gallery: string;
    faq: string;
    contact: string;
  };
  header: {
    call: string;
    dashboard: string;
    logOut: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  footer: {
    explore: string;
    contact: string;
    privacy: string;
    admin: string;
    backToTop: string;
    copyright: string;
    taglineSuffix: string;
  };
  about: {
    processMeasure: string;
    processMeasureText: string;
    processFabricate: string;
    processFabricateText: string;
    processInstall: string;
    processInstallText: string;
    learnMore: string;
    owners: string;
    close: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    learnMore: string;
    fullPage: string;
    requestQuote: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyBody: string;
    project: string;
    close: string;
    prev: string;
    next: string;
  };
  areas: {
    eyebrow: string;
    title: string;
    description: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    seeReviews: string;
    items: { quote: string; name: string; place: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    whatsapp: string;
    openMaps: string;
    privacyAgree: string;
    privacyLink: string;
    fillRequired: string;
    sendFailed: string;
  };
  servicePage: {
    home: string;
    services: string;
    related: string;
    requestQuote: string;
    callNow: string;
    whatsapp: string;
  };
  privacy: {
    title: string;
    legal: string;
    updated: string;
    summary: string;
    intro: string;
    collectTitle: string;
    collectBody: string;
    useTitle: string;
    useBody: string;
    emailTitle: string;
    emailBody: string;
    retentionTitle: string;
    retentionBody: string;
    contactTitle: string;
    contactBody: string;
    contactForm: string;
    backHome: string;
  };
  hours: {
    closed: string;
    weekdays: Record<
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
      string
    >;
    short: Record<
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
      string
    >;
  };
  whatsapp: {
    defaultMessage: string;
    quoteGreeting: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    serviceLabel: string;
  };
  mobileBar: {
    call: string;
    whatsapp: string;
  };
};

const en: Dictionary = {
  skipToContent: "Skip to content",
  nav: {
    about: "About",
    services: "Services",
    gallery: "Gallery",
    faq: "FAQ",
    contact: "Contact",
  },
  header: {
    call: "Call",
    dashboard: "Dashboard",
    logOut: "Log out",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  footer: {
    explore: "Explore",
    contact: "Contact",
    privacy: "Privacy",
    admin: "Admin",
    backToTop: "Back to top",
    copyright: "All rights reserved.",
    taglineSuffix: "Metal fabrication crafted in",
  },
  about: {
    processMeasure: "Measure",
    processMeasureText: "On-site sizing so the work fits your opening.",
    processFabricate: "Fabricate",
    processFabricateText: "Welded and finished in our Mevani workshop.",
    processInstall: "Install",
    processInstallText: "Fitted, adjusted, and handed over ready to use.",
    learnMore: "Learn more",
    owners: "Owners",
    close: "Close",
  },
  services: {
    eyebrow: "What we make",
    title: "Fabrication services",
    description: "Swipe or use the arrows — open a service for details or visit its page.",
    learnMore: "Learn more",
    fullPage: "Full page",
    requestQuote: "Request a quote",
  },
  gallery: {
    eyebrow: "Our work",
    title: "Project gallery",
    description: "Swipe the rail or use the arrows — tap a photo to open it full screen.",
    emptyTitle: "Projects coming soon",
    emptyBody: "New fabrication work will appear here shortly.",
    project: "Project",
    close: "Close gallery",
    prev: "Previous image",
    next: "Next image",
  },
  areas: {
    eyebrow: "Where we work",
    title: "Service areas",
    description: "Based in {location} — we fabricate and install across these towns and nearby villages.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    description: "Site visits, materials, timelines, and payment — answered briefly.",
    items: [
      {
        question: "Do you visit the site before quoting?",
        answer:
          "Yes. For most gates, grills, roofing, and custom work we measure on site so the quote matches your opening sizes and installation needs.",
      },
      {
        question: "What materials do you work with?",
        answer:
          "Mild steel (MS) for everyday strength and value, and stainless steel (SS) where rust resistance or a polished finish matters — railings, kitchen stands, and select gates.",
      },
      {
        question: "How long does a typical job take?",
        answer:
          "Simple grills or small repairs can finish in a few days. Full gates, sheds, and roofing usually take one to a few weeks depending on size, design, and site readiness. We’ll give a clear timeline with your quote.",
      },
      {
        question: "How does payment work?",
        answer:
          "We typically take an advance to start fabrication, with the balance on delivery or installation. Exact terms are confirmed when you approve the quote.",
      },
      {
        question: "Do you install as well as fabricate?",
        answer:
          "Yes. Our process is measure → fabricate → install and finish, so the work fits and works on site.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Word of mouth",
    title: "What customers say",
    description: "Neighbors and local businesses who trusted us with their metalwork.",
    seeReviews: "See Google reviews",
    items: [
      {
        quote:
          "Gate and grill work finished on time — strong welding and a clean finish for our house in Mevani.",
        name: "Local homeowner",
        place: "Mevani",
      },
      {
        quote:
          "Parking shed measured carefully and installed without hassle. Clear communication throughout.",
        name: "Shop owner",
        place: "Rasipuram area",
      },
      {
        quote:
          "Industrial shed framing was solid. They understood our workshop layout and delivered as promised.",
        name: "Small business",
        place: "Namakkal district",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Request a quote",
    description: "Send your project details to {name} by email — or continue on WhatsApp.",
    name: "Name",
    phone: "Phone",
    email: "Email (optional)",
    service: "Service",
    message: "Message",
    namePlaceholder: "Your name",
    phonePlaceholder: "Your phone number",
    emailPlaceholder: "For a confirmation reply",
    messagePlaceholder: "Describe your project, size, and timeline",
    send: "Send message",
    sending: "Sending…",
    whatsapp: "WhatsApp",
    openMaps: "Open in Google Maps",
    privacyAgree: "By submitting, you agree to our",
    privacyLink: "Privacy Policy",
    fillRequired: "Please fill name, phone, and message before WhatsApp.",
    sendFailed: "Could not send message. Please try WhatsApp or call us.",
  },
  servicePage: {
    home: "Home",
    services: "Services",
    related: "Related services",
    requestQuote: "Request a quote",
    callNow: "Call now",
    whatsapp: "WhatsApp",
  },
  privacy: {
    title: "Privacy Policy",
    legal: "Legal",
    updated: "Last updated: August 2026",
    summary:
      "We collect only the details you send through the contact form or WhatsApp so we can reply about your fabrication job. We do not sell your information.",
    intro:
      "{name} (“we”) operates this website to share our metal fabrication services and receive quote requests from customers in {location} and nearby areas.",
    collectTitle: "Information we collect",
    collectBody:
      "When you use the quote form, we collect the name, phone number, optional email address, service interest, and message you provide. If you contact us on WhatsApp or by phone, we receive whatever details you choose to share in that conversation.",
    useTitle: "How we use it",
    useBody:
      "We use this information only to respond to your enquiry, prepare quotes, schedule site visits or installation, and follow up about your project. We do not sell your personal information.",
    emailTitle: "Email confirmation",
    emailBody:
      "If you provide an email address, we may send a short confirmation that we received your request. We do not use your email for unrelated marketing unless you ask us to.",
    retentionTitle: "Retention",
    retentionBody:
      "Quote emails are kept as long as needed to handle your request and for ordinary business records, then deleted or archived according to our normal practice.",
    contactTitle: "Contact",
    contactBody: "Questions about this policy: call {phone} or write via the",
    contactForm: "contact form",
    backHome: "Back to home",
  },
  hours: {
    closed: "Closed",
    weekdays: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    short: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    },
  },
  whatsapp: {
    defaultMessage: "Hello Star Fabrication, I would like a quote.",
    quoteGreeting: "Hello Star Fabrication,",
    nameLabel: "Name",
    phoneLabel: "Phone",
    emailLabel: "Email",
    serviceLabel: "Service",
  },
  mobileBar: {
    call: "Call",
    whatsapp: "WhatsApp",
  },
};

const ta: Dictionary = {
  skipToContent: "முக்கிய உள்ளடக்கத்திற்குச் செல்லவும்",
  nav: {
    about: "எங்களைப் பற்றி",
    services: "சேவைகள்",
    gallery: "பணிகள்",
    faq: "கேள்வி பதில்",
    contact: "தொடர்புக்கு",
  },
  header: {
    call: "அழைக்க",
    dashboard: "நிர்வாகப் பலகை",
    logOut: "வெளியேறு",
    openMenu: "பட்டியலைத் திறக்க",
    closeMenu: "பட்டியலை மூட",
    language: "மொழி",
  },
  footer: {
    explore: "பார்க்க",
    contact: "தொடர்பு",
    privacy: "தனியுரிமை",
    admin: "நிர்வாகம்",
    backToTop: "மேலே செல்ல",
    copyright: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    taglineSuffix: "இரும்பு வேலைகள் —",
  },
  about: {
    processMeasure: "அளவீடு",
    processMeasureText: "உங்கள் இடத்திலேயே அளந்து, சரியான அளவுக்கு ஏற்ப தயாரிக்கிறோம்.",
    processFabricate: "தயாரிப்பு",
    processFabricateText: "மேவாணி பட்டறையில் வெல்டிங் செய்து உறுதியாக முடிக்கிறோம்.",
    processInstall: "பொருத்துதல்",
    processInstallText: "இடத்தில் பொருத்தி, சரிசெய்து, பயன்படுத்தத் தயார் செய்து தருகிறோம்.",
    learnMore: "மேலும் தெரிந்துகொள்ள",
    owners: "உரிமையாளர்கள்",
    close: "மூடு",
  },
  services: {
    eyebrow: "நாங்கள் செய்யும் வேலைகள்",
    title: "உலோக வேலை சேவைகள்",
    description: "இடது வலமாக நகர்த்தி பார்க்கவும் — விவரம் அறிய ஒரு சேவையைத் தேர்ந்தெடுக்கவும்.",
    learnMore: "மேலும் தெரிந்துகொள்ள",
    fullPage: "முழு விவரம்",
    requestQuote: "விலை மதிப்பீடு கேட்க",
  },
  gallery: {
    eyebrow: "எங்கள் பணிகள்",
    title: "முடித்த பணிகள்",
    description: "படங்களை நகர்த்தி பார்க்கவும் — பெரிதாகக் காண ஒரு படத்தைத் தொடவும்.",
    emptyTitle: "பணிகள் விரைவில் வரும்",
    emptyBody: "புதிய உலோக வேலைப் படங்கள் விரைவில் இங்கே காட்டப்படும்.",
    project: "பணி",
    close: "மூடு",
    prev: "முந்தைய படம்",
    next: "அடுத்த படம்",
  },
  areas: {
    eyebrow: "நாங்கள் செல்லும் இடங்கள்",
    title: "சேவைப் பகுதிகள்",
    description:
      "{location} மையமாகக் கொண்டு அருகிலுள்ள ஊர்களிலும் அளந்து பொருத்தித் தருகிறோம்.",
  },
  faq: {
    eyebrow: "கேள்வி பதில்",
    title: "அடிக்கடி கேட்கும் கேள்விகள்",
    description: "இட வருகை, இரும்பு வகை, நேரம், கட்டணம் — சுருக்கமான பதில்கள்.",
    items: [
      {
        question: "விலை சொல்லும் முன் இடத்திற்கு வருவீர்களா?",
        answer:
          "ஆம். பெரும்பாலான கதவு, சாளரக் கிரில், கூரை மற்றும் தனிப்பயன் பணிகளுக்கு இடத்திலேயே அளந்து, உங்கள் அளவுக்கு ஏற்ற விலை மதிப்பீடு தருகிறோம்.",
      },
      {
        question: "எந்த இரும்புடன் வேலை செய்கிறீர்கள்?",
        answer:
          "பொதுவான வலிமைக்கும் விலைக்கு ஏற்ற மைல்டு ஸ்டீல் (MS); துருப் பிடிக்காமல் இருக்க வேண்டிய இடங்களில் ஸ்டெயின்லெஸ் ஸ்டீல் (SS) — கைப்பிடி, சமையலறை ஸ்டாண்ட், சில கதவுகள்.",
      },
      {
        question: "ஒரு பணிக்கு எவ்வளவு நாள் ஆகும்?",
        answer:
          "சிறிய கிரில் அல்லது பழுது சில நாட்களில் முடியும். முழு கதவு, ஷெட், கூரை போன்றவை அளவு மற்றும் வடிவமைப்பைப் பொறுத்து ஒரு வாரம் முதல் சில வாரங்கள் வரை ஆகலாம். விலையுடன் தெளிவான நாள் அட்டவணையும் சொல்வோம்.",
      },
      {
        question: "பணம் எப்படி செலுத்த வேண்டும்?",
        answer:
          "பொதுவாக வேலை தொடங்க முன்பணம்; மீதி பணம் ஒப்படைக்கும்போது அல்லது பொருத்தும்போது. விலை ஒப்புதல் அளிக்கும்போது விதிமுறைகளை உறுதி செய்கிறோம்.",
      },
      {
        question: "தயாரிப்புடன் பொருத்தலும் செய்கிறீர்களா?",
        answer:
          "ஆம். அளவு → பட்டறையில் தயாரிப்பு → இடத்தில் பொருத்தி முடித்தல் என்ற முறையில், சரியாகப் பொருந்தும்படி செய்கிறோம்.",
      },
    ],
  },
  testimonials: {
    eyebrow: "வாடிக்கையாளர் கருத்து",
    title: "வாடிக்கையாளர்கள் சொல்வது",
    description: "எங்கள் இரும்பு வேலைகளை நம்பிய அண்டை வீட்டினர் மற்றும் கடை உரிமையாளர்கள்.",
    seeReviews: "Google விமர்சனங்களைப் பார்க்க",
    items: [
      {
        quote:
          "கதவு மற்றும் கிரில் வேலை சரியான நேரத்தில் முடிந்தது — உறுதியான வெல்டிங், சுத்தமான பூச்சு. மேவாணி வீட்டிற்கு நன்றாக வந்தது.",
        name: "வீட்டு உரிமையாளர்",
        place: "மேவாணி",
      },
      {
        quote:
          "கார் நிறுத்த ஷெட் கவனமாக அளந்து, சிரமம் இல்லாமல் பொருத்தினார்கள். தொடக்கத்திலிருந்தே தெளிவாகப் பேசினார்கள்.",
        name: "கடை உரிமையாளர்",
        place: "ராசிபுரம் பகுதி",
      },
      {
        quote:
          "தொழிற்சாலை ஷெட் சட்டகம் உறுதியாக இருந்தது. எங்கள் பட்டறை அமைப்பைப் புரிந்து, சொன்னபடி முடித்தார்கள்.",
        name: "சிறு வணிகம்",
        place: "நாமக்கல் மாவட்டம்",
      },
    ],
  },
  contact: {
    eyebrow: "தொடர்பு கொள்ளுங்கள்",
    title: "விலை மதிப்பீடு கேட்க",
    description:
      "உங்கள் பணி விவரங்களை {name}க்கு அனுப்புங்கள் — அல்லது WhatsApp வழியாகத் தொடருங்கள்.",
    name: "பெயர்",
    phone: "தொலைபேசி எண்",
    email: "மின்னஞ்சல் (விருப்பம்)",
    service: "தேவையான சேவை",
    message: "செய்தி",
    namePlaceholder: "உங்கள் பெயர்",
    phonePlaceholder: "உங்கள் தொலைபேசி எண்",
    emailPlaceholder: "உறுதிப்படுத்தல் பதிலுக்கு",
    messagePlaceholder: "பணியின் வகை, அளவு, தேவையான நேரம் ஆகியவற்றை எழுதுங்கள்",
    send: "செய்தி அனுப்பு",
    sending: "அனுப்புகிறது…",
    whatsapp: "WhatsApp",
    openMaps: "Google Maps-ல் திறக்க",
    privacyAgree: "சமர்ப்பிப்பதன் மூலம் நீங்கள் எங்கள்",
    privacyLink: "தனியுரிமைக் கொள்கையை",
    fillRequired: "WhatsApp அனுப்பும் முன் பெயர், தொலைபேசி, செய்தியை நிரப்புங்கள்.",
    sendFailed: "செய்தி அனுப்ப முடியவில்லை. WhatsApp அல்லது அழைப்பு முயற்சிக்கவும்.",
  },
  servicePage: {
    home: "முகப்பு",
    services: "சேவைகள்",
    related: "தொடர்புடைய சேவைகள்",
    requestQuote: "விலை மதிப்பீடு கேட்க",
    callNow: "இப்போது அழைக்க",
    whatsapp: "WhatsApp",
  },
  privacy: {
    title: "தனியுரிமைக் கொள்கை",
    legal: "சட்டம்",
    updated: "கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2026",
    summary:
      "தொடர்புப் படிவம் அல்லது WhatsApp வழியாக நீங்கள் அனுப்பும் விவரங்களை மட்டுமே உங்கள் உலோக வேலைக்குப் பதிலளிக்க சேகரிக்கிறோம். உங்கள் தகவலை விற்கமாட்டோம்.",
    intro:
      "{name} இந்த இணையதளத்தை உலோக வேலை சேவைகளைப் பகிரவும், {location} மற்றும் அருகிலுள்ள பகுதிகளிலிருந்து விலை மதிப்பீடு கோரிக்கைகளைப் பெறவும் நடத்துகிறது.",
    collectTitle: "நாங்கள் சேகரிக்கும் தகவல்",
    collectBody:
      "விலை மதிப்பீடு படிவத்தில் நீங்கள் கொடுக்கும் பெயர், தொலைபேசி எண், விருப்ப மின்னஞ்சல், சேவை ஆர்வம், செய்தி ஆகியவற்றை சேகரிக்கிறோம். WhatsApp அல்லது அழைப்பு வழியாகத் தொடர்பு கொண்டால், அந்த உரையாடலில் நீங்கள் பகிரும் விவரங்களைப் பெறுகிறோம்.",
    useTitle: "எப்படிப் பயன்படுத்துகிறோம்",
    useBody:
      "உங்கள் கோரிக்கைக்குப் பதிலளிக்க, விலை தயாரிக்க, இட வருகை அல்லது பொருத்துதலை திட்டமிட, உங்கள் பணியைத் தொடர மட்டுமே இந்தத் தகவலைப் பயன்படுத்துகிறோம். தனிப்பட்ட தகவலை விற்கமாட்டோம்.",
    emailTitle: "மின்னஞ்சல் உறுதிப்படுத்தல்",
    emailBody:
      "மின்னஞ்சல் கொடுத்தால், கோரிக்கை கிடைத்ததை உறுதிப்படுத்தும் குறுகிய செய்தி அனுப்பலாம். நீங்கள் கேட்காத வரை விளம்பர மின்னஞ்சல் அனுப்பமாட்டோம்.",
    retentionTitle: "எவ்வளவு காலம் வைத்திருப்போம்",
    retentionBody:
      "உங்கள் கோரிக்கையை கையாளத் தேவையான காலம் வரை மற்றும் வழக்கமான வணிகப் பதிவுகளுக்காக வைத்திருப்போம்; பின்னர் நீக்கப்படும் அல்லது ஆவணப்படுத்தப்படும்.",
    contactTitle: "தொடர்பு",
    contactBody: "இந்தக் கொள்கை பற்றி கேள்விகள் இருந்தால் {phone}-ஐ அழைக்கவும் அல்லது",
    contactForm: "தொடர்புப் படிவம்",
    backHome: "முகப்புக்குத் திரும்ப",
  },
  hours: {
    closed: "விடுமுறை",
    weekdays: {
      monday: "திங்கள்",
      tuesday: "செவ்வாய்",
      wednesday: "புதன்",
      thursday: "வியாழன்",
      friday: "வெள்ளி",
      saturday: "சனி",
      sunday: "ஞாயிறு",
    },
    short: {
      monday: "திங்",
      tuesday: "செவ்",
      wednesday: "புத",
      thursday: "வியா",
      friday: "வெள்",
      saturday: "சனி",
      sunday: "ஞாயி",
    },
  },
  whatsapp: {
    defaultMessage: "வணக்கம் ஸ்டார் பேப்ரிக்கேஷன், உலோக வேலைக்கு விலை மதிப்பீடு வேண்டும்.",
    quoteGreeting: "வணக்கம் ஸ்டார் பேப்ரிக்கேஷன்,",
    nameLabel: "பெயர்",
    phoneLabel: "தொலைபேசி",
    emailLabel: "மின்னஞ்சல்",
    serviceLabel: "சேவை",
  },
  mobileBar: {
    call: "அழைக்க",
    whatsapp: "WhatsApp",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ta };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Locale };
