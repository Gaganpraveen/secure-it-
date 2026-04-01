import type { AppLanguage } from "@/lib/constants";

export type TranslationTree = {
  meta: { title: string; description: string };
  nav: {
    home: string;
    dashboard: string;
    scan: string;
    check: string;
    community: string;
    report: string;
    learn: string;
    simulate: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    listen: string;
    mute: string;
    unmute: string;
    offline: string;
    connecting: string;
    submit: string;
    cancel: string;
    back: string;
    next: string;
    done: string;
    language: string;
  };
  landing: {
    tagline: string;
    cta: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  dashboard: {
    title: string;
    scamsCaught: string;
    peopleProtected: string;
    latestAlert: string;
    dailyTip: string;
    quickActions: string;
    scanMessage: string;
    checkNumber: string;
    reportScam: string;
    protectionStatus: string;
    safe: string;
  };
  scan: {
    title: string;
    placeholder: string;
    cta: string;
    examples: string;
    riskScore: string;
    classification: string;
    scamType: string;
    explanation: string;
    listenIn: string;
    redFlags: string;
    safetyAdvice: string;
    bankingContext: string;
    reportThis: string;
    analyzing: string;
  };
  check: {
    title: string;
    placeholder: string;
    cta: string;
    trustLevel: string;
    reportsCount: string;
    noReports: string;
    recentReports: string;
    reportNumber: string;
  };
  community: {
    title: string;
    pincode: string;
    feed: string;
    statsToday: string;
    topScam: string;
    topNumber: string;
    trending: string;
  };
  report: {
    title: string;
    stepWhat: string;
    stepMessage: string;
    stepSender: string;
    stepPincode: string;
    stepLang: string;
    sms: string;
    call: string;
    whatsapp: string;
    qr: string;
    other: string;
    thankYou: string;
  };
  learn: {
    title: string;
    categories: string;
    bankingRights: string;
    bankingRightsText: string;
  };
  simulate: {
    title: string;
    kycTitle: string;
    kycDesc: string;
    upiTitle: string;
    upiDesc: string;
    vishTitle: string;
    vishDesc: string;
    start: string;
    detect: string;
  };
  errors: {
    analyzeFailed: string;
    genericSuspicious: string;
    supabaseFailed: string;
    network: string;
  };
};

const en: TranslationTree = {
  meta: {
    title: "Kavach — Secure rural digital banking",
    description:
      "Adaptive cybersecurity for rural India: scan messages, check UPI, community alerts, and safety tips.",
  },
  nav: {
    home: "Home",
    dashboard: "Dashboard",
    scan: "Scan",
    check: "Check",
    community: "Community",
    report: "Report",
    learn: "Learn",
    simulate: "Simulate",
  },
  common: {
    loading: "Loading…",
    error: "Something went wrong",
    retry: "Try again",
    listen: "Listen",
    mute: "Mute voice",
    unmute: "Unmute voice",
    offline: "You seem to be offline. Some features may not work.",
    connecting: "Connecting to secure services…",
    submit: "Submit",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    done: "Done",
    language: "Language",
  },
  landing: {
    tagline: "Your money speaks your language. So does your security.",
    cta: "Get protected",
    feature1Title: "AI message scan",
    feature1Desc: "Paste SMS or WhatsApp text and get instant risk analysis in your language.",
    feature2Title: "Trust check",
    feature2Desc: "Verify phone numbers and UPI IDs against community reports.",
    feature3Title: "Live community alerts",
    feature3Desc: "See scams reported near your pincode in real time.",
  },
  dashboard: {
    title: "Protection overview",
    scamsCaught: "scams caught near you today",
    peopleProtected: "people protected in your area",
    latestAlert: "Latest community alert",
    dailyTip: "Daily safety tip",
    quickActions: "Quick actions",
    scanMessage: "Scan message",
    checkNumber: "Check number",
    reportScam: "Report scam",
    protectionStatus: "Protection status",
    safe: "You are protected",
  },
  scan: {
    title: "Message scanner",
    placeholder: "Paste suspicious message here (SMS, WhatsApp, etc.)",
    cta: "Scan for threats",
    examples: "Try an example",
    riskScore: "Risk score",
    classification: "Classification",
    scamType: "Scam type",
    explanation: "Explanation",
    listenIn: "Listen in",
    redFlags: "Red flags",
    safetyAdvice: "What to do next",
    bankingContext: "Banking rule",
    reportThis: "Report this",
    analyzing: "Analyzing message…",
  },
  check: {
    title: "UPI / phone checker",
    placeholder: "Enter phone number or UPI ID",
    cta: "Check trust score",
    trustLevel: "Trust level",
    reportsCount: "people have reported this identifier",
    noReports: "No reports found. Stay cautious anyway.",
    recentReports: "Recent reports",
    reportNumber: "Report this number",
  },
  community: {
    title: "Community feed",
    pincode: "Pincode",
    feed: "Threat feed",
    statsToday: "Reports today",
    topScam: "Most common scam",
    topNumber: "Most reported number",
    trending: "Trending scams",
  },
  report: {
    title: "Report a scam",
    stepWhat: "What happened?",
    stepMessage: "Message or description",
    stepSender: "Scammer number or UPI (optional)",
    stepPincode: "Your pincode",
    stepLang: "Report language",
    sms: "Got SMS",
    call: "Got call",
    whatsapp: "Got WhatsApp",
    qr: "Scanned QR",
    other: "Other",
    thankYou: "Thank you! Your report helps protect your community.",
  },
  learn: {
    title: "Safety hub",
    categories: "Categories",
    bankingRights: "Banking rights",
    bankingRightsText:
      "If money is debited without your authorization, your bank must refund within 10 working days (RBI circular 2017).",
  },
  simulate: {
    title: "Attack simulator",
    kycTitle: "The KYC scam",
    kycDesc: "Fake bank SMS asks you to update KYC on a look-alike site.",
    upiTitle: "The UPI refund trick",
    upiDesc: "A fake collect request pretends to be a government refund.",
    vishTitle: "The voice call trap",
    vishDesc: "Caller pretends to be RBI and asks for card details.",
    start: "Start simulation",
    detect: "How Kavach detects this",
  },
  errors: {
    analyzeFailed: "Could not complete AI scan. Showing a safe cautious result.",
    genericSuspicious:
      "This message looks suspicious. Please verify with your bank directly.",
    supabaseFailed: "Could not load live data. Showing cached information.",
    network: "Network error. Please check your connection.",
  },
};

const hi: TranslationTree = {
  meta: {
    title: "कवच — ग्रामीण डिजिटल बैंकिंग सुरक्षित करें",
    description:
      "ग्रामीण भारत के लिए अनुकूल साइबर सुरक्षा: संदेश स्कैन, UPI जाँच, समुदाय अलर्ट।",
  },
  nav: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    scan: "स्कैन",
    check: "जाँच",
    community: "समुदाय",
    report: "रिपोर्ट",
    learn: "सीखें",
    simulate: "सिमुलेट",
  },
  common: {
    loading: "लोड हो रहा है…",
    error: "कुछ गलत हो गया",
    retry: "फिर कोशिश करें",
    listen: "सुनें",
    mute: "आवाज़ बंद",
    unmute: "आवाज़ चालू",
    offline: "लगता है आप ऑफ़लाइन हैं। कुछ सुविधाएँ काम न कर सकतीं।",
    connecting: "सुरक्षित सेवा से जुड़ रहा है…",
    submit: "जमा करें",
    cancel: "रद्द करें",
    back: "पीछे",
    next: "आगे",
    done: "पूरा",
    language: "भाषा",
  },
  landing: {
    tagline: "आपका पैसा आपकी भाषा बोलता है। आपकी सुरक्षा भी।",
    cta: "सुरक्षा पाएँ",
    feature1Title: "AI संदेश स्कैन",
    feature1Desc: "SMS या WhatsApp पेस्ट करें और अपनी भाषा में तुरंत जोखिम जानें।",
    feature2Title: "विश्वास जाँच",
    feature2Desc: "फ़ोन और UPI ID को समुदाय रिपोर्ट से मिलाएँ।",
    feature3Title: "लाइव अलर्ट",
    feature3Desc: "अपने पिनकोड के आसपास की घोटालों की जानकारी तुरंत।",
  },
  dashboard: {
    title: "सुरक्षा सारांश",
    scamsCaught: "आज आपके पास पकड़े गए घोटाले",
    peopleProtected: "आपके क्षेत्र में सुरक्षित लोग",
    latestAlert: "नवीनतम समुदाय अलर्ट",
    dailyTip: "दैनिक सुरक्षा टिप",
    quickActions: "त्वरित कार्य",
    scanMessage: "संदेश स्कैन करें",
    checkNumber: "नंबर जाँचें",
    reportScam: "घोटाला रिपोर्ट करें",
    protectionStatus: "सुरक्षा स्थिति",
    safe: "आप सुरक्षित हैं",
  },
  scan: {
    title: "संदेश स्कैनर",
    placeholder: "संदिग्ध संदेश यहाँ पेस्ट करें (SMS, WhatsApp)",
    cta: "खतरे के लिए स्कैन करें",
    examples: "उदाहरण आज़माएँ",
    riskScore: "जोखिम स्कोर",
    classification: "श्रेणी",
    scamType: "घोटाले का प्रकार",
    explanation: "व्याख्या",
    listenIn: "में सुनें",
    redFlags: "चेतावनी संकेत",
    safetyAdvice: "अगला कदम",
    bankingContext: "बैंकिंग नियम",
    reportThis: "इसकी रिपोर्ट करें",
    analyzing: "संदेश का विश्लेषण…",
  },
  check: {
    title: "UPI / फ़ोन चेकर",
    placeholder: "फ़ोन नंबर या UPI ID दर्ज करें",
    cta: "विश्वास स्कोर देखें",
    trustLevel: "विश्वास स्तर",
    reportsCount: "लोगों ने इसकी रिपोर्ट की है",
    noReports: "कोई रिपोर्ट नहीं मिली। फिर भी सतर्क रहें।",
    recentReports: "हाल की रिपोर्ट",
    reportNumber: "इस नंबर की रिपोर्ट करें",
  },
  community: {
    title: "समुदाय फ़ीड",
    pincode: "पिनकोड",
    feed: "खतरे की सूची",
    statsToday: "आज की रिपोर्ट",
    topScam: "सबसे आम घोटाला",
    topNumber: "सबसे ज़्यादा रिपोर्ट नंबर",
    trending: "ट्रेंडिंग घोटाले",
  },
  report: {
    title: "घोटाला रिपोर्ट करें",
    stepWhat: "क्या हुआ?",
    stepMessage: "संदेश या विवरण",
    stepSender: "घोटालेबाज़ नंबर या UPI (वैकल्पिक)",
    stepPincode: "आपका पिनकोड",
    stepLang: "रिपोर्ट भाषा",
    sms: "SMS आया",
    call: "कॉल आई",
    whatsapp: "WhatsApp आया",
    qr: "QR स्कैन किया",
    other: "अन्य",
    thankYou: "धन्यवाद! आपकी रिपोर्ट समुदाय की सुरक्षा में मदद करती है।",
  },
  learn: {
    title: "सुरक्षा केंद्र",
    categories: "श्रेणियाँ",
    bankingRights: "बैंकिंग अधिकार",
    bankingRightsText:
      "यदि बिना अनुमति के पैसा कटता है, तो बैंक को 10 कार्य दिवसों में वापस करना होगा (RBI 2017)।",
  },
  simulate: {
    title: "अटैक सिमुलेटर",
    kycTitle: "KYC घोटाला",
    kycDesc: "नकली बैंक SMS आपको नकली साइट पर KYC अपडेट करने कहता है।",
    upiTitle: "UPI रिफ़ंड चाल",
    upiDesc: "नकली कलेक्ट अनुरोध सरकारी रिफ़ंड जैसा दिखता है।",
    vishTitle: "वॉइस कॉल जाल",
    vishDesc: "कॉलर RBI बनकर कार्ड विवरण माँगता है।",
    start: "सिमुलेशन शुरू करें",
    detect: "कवच इसे कैसे पकड़ता है",
  },
  errors: {
    analyzeFailed: "AI स्कैन पूरा नहीं हो सका। सतर्क परिणाम दिखा रहे हैं।",
    genericSuspicious:
      "यह संदेश संदिग्ध लगता है। कृपया सीधे अपने बैंक से पुष्टि करें।",
    supabaseFailed: "लाइव डेटा लोड नहीं हो सका। कैश्ड जानकारी दिखा रहे हैं।",
    network: "नेटवर्क त्रुटि। कृपया कनेक्शन जाँचें।",
  },
};

const kn: TranslationTree = {
  meta: {
    title: "ಕವಚ — ಗ್ರಾಮೀಣ ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಸುರಕ್ಷಿತ",
    description:
      "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಅನುಕೂಲಕರ ಸೈಬರ್ ಸುರಕ್ಷೆ: ಸಂದೇಶ ಸ್ಕ್ಯಾನ್, UPI ಪರಿಶೀಲನೆ, ಸಮುದಾಯ ಎಚ್ಚರಿಕೆಗಳು.",
  },
  nav: {
    home: "ಮುಖಪುಟ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    scan: "ಸ್ಕ್ಯಾನ್",
    check: "ಪರಿಶೀಲನೆ",
    community: "ಸಮುದಾಯ",
    report: "ವರದಿ",
    learn: "ಕಲಿಯಿರಿ",
    simulate: "ಸಿಮ್ಯುಲೇಟ್",
  },
  common: {
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
    error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    listen: "ಕೇಳಿ",
    mute: "ಧ್ವನಿ ಆಫ್",
    unmute: "ಧ್ವನಿ ಆನ್",
    offline: "ನೀವು ಆಫ್‌ಲೈನ್ ಇರುವಂತೆ ಕಾಣುತ್ತದೆ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಕೆಲಸ ಮಾಡದಿರಬಹುದು.",
    connecting: "ಸುರಕ್ಷಿತ ಸೇವೆಗೆ ಸಂಪರ್ಕಿಸುತ್ತಿದೆ…",
    submit: "ಸಲ್ಲಿಸಿ",
    cancel: "ರದ್ದು",
    back: "ಹಿಂದೆ",
    next: "ಮುಂದೆ",
    done: "ಪೂರ್ಣ",
    language: "ಭಾಷೆ",
  },
  landing: {
    tagline: "ನಿಮ್ಮ ಹಣ ನಿಮ್ಮ ಭಾಷೆ ಮಾತನಾಡುತ್ತದೆ. ನಿಮ್ಮ ಸುರಕ್ಷೆಯೂ ಹಾಗೇ.",
    cta: "ಸುರಕ್ಷೆ ಪಡೆಯಿರಿ",
    feature1Title: "AI ಸಂದೇಶ ಸ್ಕ್ಯಾನ್",
    feature1Desc: "SMS ಅಥವಾ WhatsApp ಅನ್ನು ಅಂಟಿಸಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ತಕ್ಷಣ ಅಪಾಯ ತಿಳಿಯಿರಿ.",
    feature2Title: "ವಿಶ್ವಾಸ ಪರಿಶೀಲನೆ",
    feature2Desc: "ಫೋನ್ ಮತ್ತು UPI ID ಅನ್ನು ಸಮುದಾಯ ವರದಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ.",
    feature3Title: "ಲೈವ್ ಎಚ್ಚರಿಕೆಗಳು",
    feature3Desc: "ನಿಮ್ಮ ಪಿನ್‌ಕೋಡ್ ಸುತ್ತಲಿನ ವಂಚನೆಗಳ ಬಗ್ಗೆ ತಕ್ಷಣ.",
  },
  dashboard: {
    title: "ಸುರಕ್ಷಾ ಅವಲೋಕನ",
    scamsCaught: "ಇಂದು ನಿಮ್ಮ ಹತ್ತಿರ ಪತ್ತೆಯಾದ ವಂಚನೆಗಳು",
    peopleProtected: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ರಕ್ಷಿಸಲಾದ ಜನರು",
    latestAlert: "ಇತ್ತೀಚಿನ ಸಮುದಾಯ ಎಚ್ಚರಿಕೆ",
    dailyTip: "ದೈನಂದಿನ ಸುರಕ್ಷಾ ಸಲಹೆ",
    quickActions: "ತ್ವರಿತ ಕ್ರಮಗಳು",
    scanMessage: "ಸಂದೇಶ ಸ್ಕ್ಯಾನ್",
    checkNumber: "ಸಂಖ್ಯೆ ಪರಿಶೀಲಿಸಿ",
    reportScam: "ವಂಚನೆ ವರದಿ",
    protectionStatus: "ಸುರಕ್ಷಾ ಸ್ಥಿತಿ",
    safe: "ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ",
  },
  scan: {
    title: "ಸಂದೇಶ ಸ್ಕ್ಯಾನರ್",
    placeholder: "ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ (SMS, WhatsApp)",
    cta: "ಬೆದರಿಕೆಗಳಿಗಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    examples: "ಉದಾಹರಣೆ ಪ್ರಯತ್ನಿಸಿ",
    riskScore: "ಅಪಾಯ ಅಂಕ",
    classification: "ವರ್ಗೀಕರಣ",
    scamType: "ವಂಚನೆ ಪ್ರಕಾರ",
    explanation: "ವಿವರಣೆ",
    listenIn: "ನಲ್ಲಿ ಕೇಳಿ",
    redFlags: "ಎಚ್ಚರಿಕೆ ಸಂಕೇತಗಳು",
    safetyAdvice: "ಮುಂದಿನ ಕ್ರಮ",
    bankingContext: "ಬ್ಯಾಂಕಿಂಗ್ ನಿಯಮ",
    reportThis: "ಇದನ್ನು ವರದಿ ಮಾಡಿ",
    analyzing: "ಸಂದೇಶ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…",
  },
  check: {
    title: "UPI / ಫೋನ್ ಚೆಕರ್",
    placeholder: "ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ UPI ID ನಮೂದಿಸಿ",
    cta: "ವಿಶ್ವಾಸ ಅಂಕ ನೋಡಿ",
    trustLevel: "ವಿಶ್ವಾಸ ಮಟ್ಟ",
    reportsCount: "ಜನರು ಈ ಗುರುತನ್ನು ವರದಿ ಮಾಡಿದ್ದಾರೆ",
    noReports: "ಯಾವುದೇ ವರದಿ ಕಂಡುಬಂದಿಲ್ಲ. ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ.",
    recentReports: "ಇತ್ತೀಚಿನ ವರದಿಗಳು",
    reportNumber: "ಈ ಸಂಖ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
  },
  community: {
    title: "ಸಮುದಾಯ ಫೀಡ್",
    pincode: "ಪಿನ್‌ಕೋಡ್",
    feed: "ಬೆದರಿಕೆ ಫೀಡ್",
    statsToday: "ಇಂದಿನ ವರದಿಗಳು",
    topScam: "ಅತ್ಯಂತ ಸಾಮಾನ್ಯ ವಂಚನೆ",
    topNumber: "ಹೆಚ್ಚು ವರದಿ ಮಾಡಿದ ಸಂಖ್ಯೆ",
    trending: "ಟ್ರೆಂಡಿಂಗ್ ವಂಚನೆಗಳು",
  },
  report: {
    title: "ವಂಚನೆ ವರದಿ",
    stepWhat: "ಏನಾಯಿತು?",
    stepMessage: "ಸಂದೇಶ ಅಥವಾ ವಿವರಣೆ",
    stepSender: "ವಂಚಕ ಸಂಖ್ಯೆ ಅಥವಾ UPI (ಐಚ್ಛಿಕ)",
    stepPincode: "ನಿಮ್ಮ ಪಿನ್‌ಕೋಡ್",
    stepLang: "ವರದಿ ಭಾಷೆ",
    sms: "SMS ಬಂದಿತು",
    call: "ಕರೆ ಬಂದಿತು",
    whatsapp: "WhatsApp ಬಂದಿತು",
    qr: "QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿದೆ",
    other: "ಇತರೆ",
    thankYou: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವರದಿ ಸಮುದಾಯವನ್ನು ರಕ್ಷಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
  },
  learn: {
    title: "ಸುರಕ್ಷಾ ಕೇಂದ್ರ",
    categories: "ವರ್ಗಗಳು",
    bankingRights: "ಬ್ಯಾಂಕಿಂಗ್ ಹಕ್ಕುಗಳು",
    bankingRightsText:
      "ಅನಧಿಕೃತವಾಗಿ ಹಣ ಕಡಿತವಾದರೆ, ಬ್ಯಾಂಕ್ 10 ಕೆಲಸದ ದಿನಗಳೊಳಗೆ ಮರುಪಾವತಿಸಬೇಕು (RBI 2017).",
  },
  simulate: {
    title: "ಆಕ್ರಮಣ ಸಿಮ್ಯುಲೇಟರ್",
    kycTitle: "KYC ವಂಚನೆ",
    kycDesc: "ನಕಲಿ ಬ್ಯಾಂಕ್ SMS ನಕಲಿ ಸೈಟ್‌ನಲ್ಲಿ KYC ನವೀಕರಿಸಲು ಹೇಳುತ್ತದೆ.",
    upiTitle: "UPI ರಿಫಂಡ್ ಟ್ರಿಕ್",
    upiDesc: "ನಕಲಿ ಕಲೆಕ್ಟ್ ವಿನಂತಿ ಸರ್ಕಾರಿ ರಿಫಂಡ್ ಎಂದು ತೋರುತ್ತದೆ.",
    vishTitle: "ವಾಯ್ಸ್ ಕಾಲ್ ಉರುಳು",
    vishDesc: "ಕರೆದವರು RBI ಎಂದು ನಟಿಸಿ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ಕೇಳುತ್ತಾರೆ.",
    start: "ಸಿಮ್ಯುಲೇಷನ್ ಪ್ರಾರಂಭಿಸಿ",
    detect: "ಕವಚ ಇದನ್ನು ಹೇಗೆ ಪತ್ತೆಹಚ್ಚುತ್ತದೆ",
  },
  errors: {
    analyzeFailed: "AI ಸ್ಕ್ಯಾನ್ ಪೂರ್ಣಗೊಳಿಸಲಾಗಲಿಲ್ಲ. ಎಚ್ಚರಿಕೆಯ ಫಲಿತಾಂಶ ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    genericSuspicious:
      "ಈ ಸಂದೇಶ ಸಂಶಯಾಸ್ಪದವಾಗಿದೆ. ದಯವಿಟ್ಟು ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.",
    supabaseFailed: "ಲೈವ್ ಡೇಟಾ ಲೋಡ್ ಮಾಡಲಾಗಲಿಲ್ಲ. ಕ್ಯಾಶ್ ಮಾಹಿತಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    network: "ನೆಟ್‌ವರ್ಕ್ ದೋಷ. ದಯವಿಟ್ಟು ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ.",
  },
};

const translations: Record<AppLanguage, TranslationTree> = {
  en,
  hi,
  kn,
};

export function getTranslations(lang: AppLanguage): TranslationTree {
  return translations[lang] ?? en;
}
