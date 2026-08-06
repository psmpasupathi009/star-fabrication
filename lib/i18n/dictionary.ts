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
    summary:
      "We collect only the details you send through the contact form or WhatsApp so we can reply about your fabrication job. We do not sell your information.",
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
  skipToContent: "உள்ளடக்கத்திற்குச் செல்",
  nav: {
    about: "எங்களைப் பற்றி",
    services: "சேவைகள்",
    gallery: "கேலரி",
    faq: "கேள்விகள்",
    contact: "தொடர்பு",
  },
  header: {
    call: "அழை",
    dashboard: "டாஷ்போர்டு",
    logOut: "வெளியேறு",
    openMenu: "மெனுவைத் திற",
    closeMenu: "மெனுவை மூடு",
    language: "மொழி",
  },
  footer: {
    explore: "ஆராய்க",
    contact: "தொடர்பு",
    privacy: "தனியுரிமை",
    admin: "நிர்வாகம்",
    backToTop: "மேலே செல்",
    copyright: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    taglineSuffix: "உலோக வேலைப்பாடுகள்",
  },
  about: {
    processMeasure: "அளவீடு",
    processMeasureText: "உங்கள் இடத்திற்குப் பொருந்த அளந்து எடுக்கிறோம்.",
    processFabricate: "தயாரிப்பு",
    processFabricateText: "மேவாணி பட்டறையில் வெல்டிங் செய்து முடிக்கிறோம்.",
    processInstall: "பொருத்துதல்",
    processInstallText: "பொருத்தி சரிசெய்து பயன்படுத்தத் தயார் நிலையில் ஒப்படைக்கிறோம்.",
    learnMore: "மேலும் அறிய",
    owners: "உரிமையாளர்கள்",
    close: "மூடு",
  },
  services: {
    eyebrow: "நாங்கள் செய்வது",
    title: "பேப்ரிக்கேஷன் சேவைகள்",
    description: "ஸ்வைப் செய்யவும் அல்லது அம்புகளைப் பயன்படுத்தவும் — விவரங்களுக்குத் திறக்கவும்.",
    learnMore: "மேலும் அறிய",
    fullPage: "முழு பக்கம்",
    requestQuote: "மேற்கோள் கேளுங்கள்",
  },
  gallery: {
    eyebrow: "எங்கள் பணிகள்",
    title: "திட்டக் கேலரி",
    description: "ரெயிலை ஸ்வைப் செய்யவும் — முழுத்திரையில் காண புகைப்படத்தைத் தட்டவும்.",
    emptyTitle: "திட்டங்கள் விரைவில்",
    emptyBody: "புதிய பேப்ரிக்கேஷன் பணிகள் விரைவில் இங்கே தோன்றும்.",
    project: "திட்டம்",
    close: "கேலரியை மூடு",
    prev: "முந்தைய படம்",
    next: "அடுத்த படம்",
  },
  areas: {
    eyebrow: "நாங்கள் சேவை செய்யும் இடங்கள்",
    title: "சேவைப் பகுதிகள்",
    description: "{location}-ஐ மையமாகக் கொண்டு அருகிலுள்ள ஊர்களிலும் பொருத்தி தருகிறோம்.",
  },
  faq: {
    eyebrow: "கேள்விகள்",
    title: "பொதுவான கேள்விகள்",
    description: "இட வருகை, பொருட்கள், கால அளவு, கட்டணம் — சுருக்கமாக.",
    items: [
      {
        question: "மேற்கோளுக்கு முன் இடத்திற்கு வருவீர்களா?",
        answer:
          "ஆம். பெரும்பாலான கதவு, கிரில், கூரை மற்றும் தனிப்பயன் பணிகளுக்கு இடத்திலேயே அளந்து, உங்கள் அளவுகளுக்கு ஏற்ற மேற்கோள் தருகிறோம்.",
      },
      {
        question: "எந்தப் பொருட்களுடன் வேலை செய்கிறீர்கள்?",
        answer:
          "தினசரி பயன்பாட்டிற்கு மைல்டு ஸ்டீல் (MS); துருப்பிடிக்காத அல்லது பளபளப்பான பூச்சு தேவைப்படும் இடங்களில் ஸ்டெயின்லெஸ் ஸ்டீல் (SS) — ரெயிலிங், சமையலறை ஸ்டாண்ட், சில கதவுகள்.",
      },
      {
        question: "ஒரு சாதாரண பணிக்கு எவ்வளவு நேரம்?",
        answer:
          "சிறிய கிரில் அல்லது பழுது சில நாட்களில் முடியும். முழு கதவு, ஷெட், கூரை ஆகியவை அளவு மற்றும் வடிவமைப்பைப் பொறுத்து ஒன்று முதல் சில வாரங்கள் வரை ஆகலாம். மேற்கோளுடன் தெளிவான கால அட்டவணை தருவோம்.",
      },
      {
        question: "கட்டணம் எப்படி?",
        answer:
          "பொதுவாக தயாரிப்பு தொடங்க முன்பணம்; மீதம் ஒப்படைப்பு அல்லது பொருத்தும்போது. மேற்கோள் அங்கீகரிக்கும்போது விதிமுறைகள் உறுதி செய்யப்படும்.",
      },
      {
        question: "தயாரிப்புடன் பொருத்தலும் செய்கிறீர்களா?",
        answer:
          "ஆம். அளவு → தயாரிப்பு → பொருத்தி முடித்தல் என்ற முறையில் இடத்திற்குப் பொருந்தும்படி செய்கிறோம்.",
      },
    ],
  },
  testimonials: {
    eyebrow: "வாடிக்கையாளர் கருத்து",
    title: "வாடிக்கையாளர்கள் சொல்வது",
    description: "எங்கள் உலோக வேலைகளை நம்பிய அண்டை வீட்டினர் மற்றும் வணிகங்கள்.",
    seeReviews: "Google விமர்சனங்களைக் காண",
    items: [
      {
        quote:
          "கதவு மற்றும் கிரில் பணி நேரத்தில் முடிந்தது — வலுவான வெல்டிங், சுத்தமான பூச்சு. மேவாணி வீட்டிற்கு சிறப்பு.",
        name: "வீட்டு உரிமையாளர்",
        place: "மேவாணி",
      },
      {
        quote:
          "பார்க்கிங் ஷெட் கவனமாக அளந்து, சிரமமின்றி பொருத்தப்பட்டது. தொடக்கம் முதல் தெளிவான தொடர்பு.",
        name: "கடை உரிமையாளர்",
        place: "ராசிபுரம் பகுதி",
      },
      {
        quote:
          "தொழில்துறை ஷெட் சட்டகம் உறுதியாக இருந்தது. எங்கள் பட்டறை அமைப்பைப் புரிந்து வாக்குறுதியின்படி முடித்தனர்.",
        name: "சிறு வணிகம்",
        place: "நாமக்கல் மாவட்டம்",
      },
    ],
  },
  contact: {
    eyebrow: "தொடர்பு கொள்ளுங்கள்",
    title: "மேற்கோள் கேளுங்கள்",
    description: "உங்கள் திட்ட விவரங்களை {name}க்கு மின்னஞ்சல் அனுப்பவும் — அல்லது WhatsApp-ல் தொடரவும்.",
    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல் (விருப்பம்)",
    service: "சேவை",
    message: "செய்தி",
    namePlaceholder: "உங்கள் பெயர்",
    phonePlaceholder: "உங்கள் தொலைபேசி எண்",
    emailPlaceholder: "உறுதிப்படுத்தல் பதிலுக்கு",
    messagePlaceholder: "திட்டம், அளவு, கால அளவை விவரிக்கவும்",
    send: "செய்தி அனுப்பு",
    sending: "அனுப்புகிறது…",
    whatsapp: "WhatsApp",
    openMaps: "Google Maps-ல் திற",
    privacyAgree: "சமர்ப்பிப்பதன் மூலம் நீங்கள் எங்கள்",
    privacyLink: "தனியுரிமைக் கொள்கைக்கு",
    fillRequired: "WhatsApp-க்கு முன் பெயர், தொலைபேசி, செய்தியை நிரப்பவும்.",
    sendFailed: "செய்தி அனுப்ப முடியவில்லை. WhatsApp அல்லது அழைப்பு முயற்சிக்கவும்.",
  },
  servicePage: {
    home: "முகப்பு",
    services: "சேவைகள்",
    related: "தொடர்புடைய சேவைகள்",
    requestQuote: "மேற்கோள் கேளுங்கள்",
    callNow: "இப்போது அழை",
    whatsapp: "WhatsApp",
  },
  privacy: {
    title: "தனியுரிமைக் கொள்கை",
    summary:
      "தொடர்பு படிவம் அல்லது WhatsApp வழியாக நீங்கள் அனுப்பும் விவரங்களை மட்டுமே பேப்ரிக்கேஷன் பணிக்காக பதிலளிக்க சேகரிக்கிறோம். உங்கள் தகவலை விற்கமாட்டோம்.",
    backHome: "முகப்புக்குத் திரும்பு",
  },
  hours: {
    closed: "மூடப்பட்டுள்ளது",
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
    defaultMessage: "வணக்கம் ஸ்டார் பேப்ரிக்கேஷன், மேற்கோள் வேண்டும்.",
    quoteGreeting: "வணக்கம் ஸ்டார் பேப்ரிக்கேஷன்,",
    nameLabel: "பெயர்",
    phoneLabel: "தொலைபேசி",
    emailLabel: "மின்னஞ்சல்",
    serviceLabel: "சேவை",
  },
  mobileBar: {
    call: "அழை",
    whatsapp: "WhatsApp",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ta };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Locale };
