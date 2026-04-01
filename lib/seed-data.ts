import type { AppLanguage } from "@/lib/constants";

export type SeedThreatReport = {
  message_text: string;
  sender_info: string | null;
  scam_type: string;
  risk_score: number;
  ai_explanation: string;
  ai_explanation_local: string;
  language: AppLanguage;
  pincode: string;
};

export type SeedAlert = {
  pincode: string;
  alert_title: string;
  alert_title_hi: string;
  alert_title_kn: string;
  description: string;
  description_hi: string;
  description_kn: string;
  severity: "low" | "medium" | "high" | "critical";
  scam_type: string;
  affected_count: number;
};

export type SeedTrust = {
  identifier: string;
  identifier_type: "phone" | "upi_id";
  total_reports: number;
  trust_level: "trusted" | "unknown" | "suspicious" | "dangerous";
};

export type SeedTip = {
  tip_en: string;
  tip_hi: string;
  tip_kn: string;
  category: "upi" | "password" | "otp" | "kyc" | "general" | "atm";
  icon_name: string;
  priority: number;
};

const BASE_THREAT_REPORTS: SeedThreatReport[] = [
  {
    message_text:
      "Dear Customer, Your SBI account will be blocked in 24 hours. Update KYC immediately: http://sbi-kyc-update.in/verify",
    sender_info: "+919876543210",
    scam_type: "kyc_fraud",
    risk_score: 92,
    ai_explanation: "Fake KYC link from unknown domain.",
    ai_explanation_local: "नकली KYC लिंक।",
    language: "en",
    pincode: "560001",
  },
  {
    message_text:
      "You have received ₹15,000 refund from Income Tax Dept. Click to claim: http://bit.ly/itrefund2025",
    sender_info: "+918123456789",
    scam_type: "phishing",
    risk_score: 88,
    ai_explanation: "Shortened tax refund phishing link.",
    ai_explanation_local: "टैक्स रिफंड फिशिंग।",
    language: "en",
    pincode: "560002",
  },
  {
    message_text:
      "Your UPI ID has been selected for ₹50,000 cashback! Share OTP sent to your number to claim reward.",
    sender_info: "reward@ybl",
    scam_type: "upi_fraud",
    risk_score: 95,
    ai_explanation: "Asks for OTP to steal money.",
    ai_explanation_local: "OTP माँगकर पैसा चुराने की कोशिश।",
    language: "en",
    pincode: "560003",
  },
  {
    message_text:
      "This is RBI calling. Your account has suspicious activity. Share your 16 digit card number for verification.",
    sender_info: "+917777666555",
    scam_type: "vishing",
    risk_score: 96,
    ai_explanation: "Impersonation and card data request.",
    ai_explanation_local: "RBI बनकर कार्ड माँगना।",
    language: "en",
    pincode: "560004",
  },
  {
    message_text:
      "प्रिय ग्राहक, आपका PNB खाता 24 घंटे में बंद हो जाएगा। तुरंत KYC अपडेट करें: http://pnb-update.co.in",
    sender_info: "+919988776655",
    scam_type: "kyc_fraud",
    risk_score: 91,
    ai_explanation: "Hindi fake bank KYC page.",
    ai_explanation_local: "नकली PNB KYC।",
    language: "hi",
    pincode: "560005",
  },
  {
    message_text:
      "PM-KISAN योजना के तहत ₹6000 आपके खाते में भेजे जा रहे हैं। पुष्टि के लिए OTP भेजें।",
    sender_info: "+916554433221",
    scam_type: "loan_scam",
    risk_score: 89,
    ai_explanation: "Fake subsidy OTP harvest.",
    ai_explanation_local: "नकली सब्सिडी OTP।",
    language: "hi",
    pincode: "560006",
  },
  {
    message_text:
      "ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ Canara Bank ಖಾತೆ ನಿಷ್ಕ್ರಿಯವಾಗಲಿದೆ. KYC ನವೀಕರಿಸಿ: http://canara-kyc.in",
    sender_info: "+919112233445",
    scam_type: "kyc_fraud",
    risk_score: 90,
    ai_explanation: "Kannada fake Canara KYC.",
    ai_explanation_local: "ನಕಲಿ ಕೆನರಾ KYC.",
    language: "kn",
    pincode: "560007",
  },
  {
    message_text:
      "Your SBI account XXX1234 has been credited with ₹25,000.00 on 01-04-2026. Available balance: ₹1,25,432.50",
    sender_info: "SBI-INFT",
    scam_type: "other",
    risk_score: 8,
    ai_explanation: "Routine credit alert pattern.",
    ai_explanation_local: "सामान्य क्रेडिट अलर्ट।",
    language: "en",
    pincode: "560008",
  },
  {
    message_text:
      "UPI transaction of ₹500 to KUMAR@ybl successful. Ref: 123456789012. If not done by you, call 1800-111-109",
    sender_info: "UPI-SBI",
    scam_type: "other",
    risk_score: 5,
    ai_explanation: "Standard UPI success SMS.",
    ai_explanation_local: "सामान्य UPI संदेश।",
    language: "en",
    pincode: "560009",
  },
];

const extraMessages = [
  "Win ₹1,00,000! Install http://fakebank-app.in to verify your account.",
  "Your Aadhaar will be blocked. Update now: http://tinyurl.com/aadhaarfix",
  "Electricity bill pending. Pay now or power cut: http://bijli-pay.in",
  "HDFC: Unusual login. Share OTP to unlock.",
  "Congratulations! Loan approved. Pay ₹499 processing fee to receive amount.",
  "Your card will expire. Send CVV to renew.",
  "Free 4G SIM upgrade — share OTP to activate.",
  "IRCTC refund pending. Click http://bit.ly/irctcref",
  "Your Paytm wallet is locked. Verify with OTP.",
  "Karnataka Govt subsidy: send bank details on WhatsApp.",
  "Fake QR at shop — 'Scan for cashback' stole UPI PIN.",
  "Caller said bank manager — asked for ATM PIN.",
  "WhatsApp: 'Your FD matured, share PAN and OTP.'",
  "Fake insurance renewal link for LIC customers.",
  "SMS: 'Aadhaar-PAN link failed. Call this number.'",
  "Phishing: 'SBI Secure Mail' with attachment.",
  "UPI collect from unknown@paytm for 'refund'.",
  "Fake NEFT delay — pay ₹200 to release funds.",
  "RBI lottery: you won ₹5 lakh — pay tax first.",
  "Fake gas bill link from unknown sender.",
  "SIM swap attempt: 'Confirm OTP for tower upgrade.'",
  "Fake customer care on Google for wallet.",
];

const EXTRA_THREAT_REPORTS: SeedThreatReport[] = extraMessages.map(
  (msg, i) => ({
    message_text: msg,
    sender_info: `+91${String(9876500000 + i).padStart(10, "0").slice(0, 10)}`,
    scam_type:
      (["phishing", "upi_fraud", "vishing", "qr_scam", "kyc_fraud"] as const)[
        i % 5
      ] ?? "other",
    risk_score: 55 + (i % 40),
    ai_explanation: "Community-reported suspicious pattern.",
    ai_explanation_local: "संदिग्ध पैटर्न।",
    language: i % 3 === 0 ? "hi" : i % 3 === 1 ? "kn" : "en",
    pincode: `56000${(i % 10) + 1}`,
  })
);

/** 30 realistic threat reports for demo seeding */
export const SEED_THREAT_REPORTS: SeedThreatReport[] = [
  ...BASE_THREAT_REPORTS,
  ...EXTRA_THREAT_REPORTS,
];

export const SEED_ALERTS: SeedAlert[] = [
  {
    pincode: "560001",
    alert_title: "Spike in fake KYC SMS",
    alert_title_hi: "नकली KYC SMS में वृद्धि",
    alert_title_kn: "ನಕಲಿ KYC SMS ಹೆಚ್ಚಳ",
    description: "Several residents reported SMS with look-alike bank domains.",
    description_hi: "कई लोगों ने नकली बैंक डोमेन वाले SMS की रिपोर्ट की।",
    description_kn: "ನಕಲಿ ಬ್ಯಾಂಕ್ ಡೊಮೇನ್ SMS ವರದಿಗಳು.",
    severity: "high",
    scam_type: "kyc_fraud",
    affected_count: 42,
  },
  {
    pincode: "560002",
    alert_title: "UPI collect refund scam",
    alert_title_hi: "UPI कलेक्ट रिफंड घोटाला",
    alert_title_kn: "UPI ಕಲೆಕ್ಟ್ ರಿಫಂಡ್ ವಂಚನೆ",
    description: "Unknown IDs sending collect requests labeled as refunds.",
    description_hi: "अज्ञात ID रिफंड के नाम पर कलेक्ट भेज रही हैं।",
    description_kn: "ಅಜ್ಞಾತ ID ಗಳು ರಿಫಂಡ್ ಹೆಸರಲ್ಲಿ ಕಲೆಕ್ಟ್ ಕಳುಹಿಸುತ್ತಿವೆ.",
    severity: "critical",
    scam_type: "upi_fraud",
    affected_count: 78,
  },
  {
    pincode: "560003",
    alert_title: "QR sticker swaps at kirana shops",
    alert_title_hi: "किराना दुकानों पर QR बदलाव",
    alert_title_kn: "ಕಿರಾಣಿ ಅಂಗಡಿಗಳಲ್ಲಿ QR ಬದಲಾವಣೆ",
    description: "Fraudsters replacing merchant QR codes near markets.",
    description_hi: "बाज़ारों में व्यापारियों के QR बदले जा रहे हैं।",
    description_kn: "ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ವ್ಯಾಪಾರಿಗಳ QR ಬದಲಾಗುತ್ತಿದೆ.",
    severity: "high",
    scam_type: "qr_scam",
    affected_count: 31,
  },
  {
    pincode: "560004",
    alert_title: "Fake RBI / cyber cell calls",
    alert_title_hi: "नकली RBI / साइबर सेल कॉल",
    alert_title_kn: "ನಕಲಿ RBI / ಸೈಬರ್ ಕಾಲ್‌ಗಳು",
    description: "Callers demand card numbers citing suspicious transactions.",
    description_hi: "कॉलर लेनदेन के बहाने कार्ड नंबर माँग रहे हैं।",
    description_kn: "ವಹಿವಾಟಿನ ಹೆಸರಲ್ಲಿ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ ಕೇಳುತ್ತಾರೆ.",
    severity: "critical",
    scam_type: "vishing",
    affected_count: 56,
  },
  {
    pincode: "560005",
    alert_title: "Phishing links in loan SMS",
    alert_title_hi: "लोन SMS में फिशिंग लिंक",
    alert_title_kn: "ಲೋನ್ SMS ನಲ್ಲಿ ಫಿಶಿಂಗ್ ಲಿಂಕ್‌ಗಳು",
    description: "Instant loan approvals with upfront fee requests.",
    description_hi: "तुरंत लोन के नाम पर पहले शुल्क माँगा जा रहा है।",
    description_kn: "ತಕ್ಷಣ ಲೋನ್ ಹೆಸರಲ್ಲಿ ಮುಂಗಡ ಶುಲ್ಕ.",
    severity: "medium",
    scam_type: "loan_scam",
    affected_count: 24,
  },
  {
    pincode: "560006",
    alert_title: "Fake electricity bill portals",
    alert_title_hi: "नकली बिजली बिल पोर्टल",
    alert_title_kn: "ನಕಲಿ ವಿದ್ಯುತ್ ಬಿಲ್ ಪೋರ್ಟಲ್‌ಗಳು",
    description: "Residents directed to non-official payment pages.",
    description_hi: "गैर-आधिकारिक पेज पर भुगतान के लिए कहा जा रहा है।",
    description_kn: "ಅಧಿಕೃತವಲ್ಲದ ಪುಟಗಳಿಗೆ ಪಾವತಿ ಕೇಳಲಾಗುತ್ತಿದೆ.",
    severity: "medium",
    scam_type: "phishing",
    affected_count: 19,
  },
  {
    pincode: "560007",
    alert_title: "SIM swap pretext SMS",
    alert_title_hi: "SIM स्वैप बहाने वाले SMS",
    alert_title_kn: "SIM ಸ್ವ್ಯಾಪ್ ನೆಪದ SMS ಗಳು",
    description: "Messages asking to confirm OTP for tower upgrades.",
    description_hi: "टावर अपग्रेड के लिए OTP माँगने वाले संदेश।",
    description_kn: "ಟವರ್ ಅಪ್‌ಗ್ರೇಡ್‌ಗೆ OTP ಕೇಳುವ ಸಂದೇಶಗಳು.",
    severity: "high",
    scam_type: "other",
    affected_count: 15,
  },
  {
    pincode: "560008",
    alert_title: "Fake app installs for cashback",
    alert_title_hi: "कैशबैक के लिए नकली ऐप",
    alert_title_kn: "ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್‌ಗೆ ನಕಲಿ ಆ್ಯಪ್‌ಗಳು",
    description: "APKs shared on WhatsApp promising rewards.",
    description_hi: "WhatsApp पर इनाम का वादा करके APK भेजे जा रहे हैं।",
    description_kn: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಬಹುಮಾನದ ಭರವಸೆಯಿಂದ APK ಹಂಚಿಕೆ.",
    severity: "high",
    scam_type: "fake_app",
    affected_count: 27,
  },
  {
    pincode: "560009",
    alert_title: "ATM shoulder surfing alerts",
    alert_title_hi: "ATM पर शोल्डर सर्फिंग",
    alert_title_kn: "ATM ನಲ್ಲಿ ಶೋಲ್ಡರ್ ಸರ್ಫಿಂಗ್",
    description: "Helpers offering to 'assist' at rural ATMs.",
    description_hi: "ग्रामीण ATM पर 'मदद' का बहाना।",
    description_kn: "ಗ್ರಾಮೀಣ ATM ಗಳಲ್ಲಿ 'ಸಹಾಯ' ನೆಪ.",
    severity: "low",
    scam_type: "other",
    affected_count: 11,
  },
  {
    pincode: "560010",
    alert_title: "Coordinated vishing on pension day",
    alert_title_hi: "पेंशन दिवस पर विशिंग",
    alert_title_kn: "ಪೆನ್ಶನ್ ದಿನದ ವಿಶಿಂಗ್",
    description: "Callers target seniors on pension credit days.",
    description_hi: "पेंशन आने के दिन बुजुर्गों को कॉल।",
    description_kn: "ಪೆನ್ಶನ್ ದಿನ ಹಿರಿಯರಿಗೆ ಕರೆಗಳು.",
    severity: "critical",
    scam_type: "vishing",
    affected_count: 63,
  },
];

export const SEED_TRUST: SeedTrust[] = [
  { identifier: "+919876543210", identifier_type: "phone", total_reports: 4, trust_level: "dangerous" },
  { identifier: "+918123456789", identifier_type: "phone", total_reports: 3, trust_level: "dangerous" },
  { identifier: "scammer@ybl", identifier_type: "upi_id", total_reports: 2, trust_level: "suspicious" },
  { identifier: "fakepay@paytm", identifier_type: "upi_id", total_reports: 2, trust_level: "suspicious" },
  { identifier: "+917700112233", identifier_type: "phone", total_reports: 1, trust_level: "suspicious" },
  { identifier: "govtrefund@oksbi", identifier_type: "upi_id", total_reports: 5, trust_level: "dangerous" },
  { identifier: "+919555444333", identifier_type: "phone", total_reports: 1, trust_level: "suspicious" },
  { identifier: "lottery@ibl", identifier_type: "upi_id", total_reports: 3, trust_level: "dangerous" },
  { identifier: "+919333222111", identifier_type: "phone", total_reports: 0, trust_level: "unknown" },
  { identifier: "verified.merchant@ybl", identifier_type: "upi_id", total_reports: 0, trust_level: "trusted" },
  { identifier: "+919000800700", identifier_type: "phone", total_reports: 0, trust_level: "trusted" },
  { identifier: "kirana.store@paytm", identifier_type: "upi_id", total_reports: 1, trust_level: "suspicious" },
  { identifier: "+918888777666", identifier_type: "phone", total_reports: 2, trust_level: "suspicious" },
  { identifier: "phish@axl", identifier_type: "upi_id", total_reports: 4, trust_level: "dangerous" },
  { identifier: "+919444333222", identifier_type: "phone", total_reports: 1, trust_level: "suspicious" },
];

export const SEED_TIPS: SeedTip[] = [
  {
    tip_en: "Never share UPI PIN or OTP with anyone — not even 'bank officials'.",
    tip_hi: "कभी भी UPI PIN या OTP किसी के साथ साझा न करें — 'बैंक अधिकारी' होने का दावा करने वालों से भी नहीं।",
    tip_kn: "ಯಾರೊಂದಿಗೂ UPI PIN ಅಥವಾ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ — 'ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿ' ಎಂದು ಹೇಳುವವರಿಗೂ ಅಲ್ಲ.",
    category: "upi",
    icon_name: "Smartphone",
    priority: 10,
  },
  {
    tip_en: "Verify UPI collect requests — read the payee name carefully before approving.",
    tip_hi: "UPI कलेक्ट अनुरोधों की जाँच करें — स्वीकृति से पहले नाम ध्यान से पढ़ें।",
    tip_kn: "UPI ಕಲೆಕ್ಟ್ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ — ಅನುಮೋದಿಸುವ ಮೊದಲು ಪಾಯಿ ಹೆಸರು ಓದಿ.",
    category: "upi",
    icon_name: "ShieldCheck",
    priority: 9,
  },
  {
    tip_en: "Use strong passwords and change them if you suspect a breach.",
    tip_hi: "मजबूत पासवर्ड इस्तेमाल करें और संदेह होने पर बदल दें।",
    tip_kn: "ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸಿ, ಉಲ್ಬಣಗೊಂಡರೆ ಬದಲಾಯಿಸಿ.",
    category: "password",
    icon_name: "KeyRound",
    priority: 8,
  },
  {
    tip_en: "Banks never ask for OTP over phone — hang up and call the official number.",
    tip_hi: "बैंक फोन पर OTP नहीं माँगते — कॉल काटें और आधिकारिक नंबर पर कॉल करें।",
    tip_kn: "ಬ್ಯಾಂಕ್‌ಗಳು ಫೋನ್‌ನಲ್ಲಿ OTP ಕೇಳುವುದಿಲ್ಲ — ಕರೆ ಕೊನೆಗೊಳಿಸಿ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.",
    category: "otp",
    icon_name: "PhoneOff",
    priority: 10,
  },
  {
    tip_en: "Do KYC only via official bank app or branch — not through random links.",
    tip_hi: "KYC केवल आधिकारिक ऐप या शाखा से करें — किसी लिंक से नहीं।",
    tip_kn: "KYC ಅಧಿಕೃತ ಆ್ಯಪ್ ಅಥವಾ ಶಾಖೆಯಿಂದ ಮಾತ್ರ — ಯಾದೃಚ್ಛಿಕ ಲಿಂಕ್‌ಗಳಿಂದ ಅಲ್ಲ.",
    category: "kyc",
    icon_name: "Building2",
    priority: 9,
  },
  {
    tip_en: "Cover the keypad at ATMs and never take 'help' from strangers.",
    tip_hi: "ATM पर कीपैड ढँकें और अजनबियों की 'मदद' न लें।",
    tip_kn: "ATM ನಲ್ಲಿ ಕೀಪ್ಯಾಡ್ ಮುಚ್ಚಿರಿ, ಅಪರಿಚಿತರ 'ಸಹಾಯ' ಸ್ವೀಕರಿಸಬೇಡಿ.",
    category: "atm",
    icon_name: "Landmark",
    priority: 7,
  },
  {
    tip_en: "Check SMS sender IDs — scammers mimic bank names with small spelling changes.",
    tip_hi: "SMS भेजने वाले का ID देखें — छोटे अक्षर बदलकर नकली नाम बनाए जाते हैं।",
    tip_kn: "SMS ಕಳುಹಿಸುವವರ ID ಪರಿಶೀಲಿಸಿ — ಚಿಕ್ಕ ಬದಲಾವಣೆಗಳಿಂದ ನಕಲಿ ಹೆಸರುಗಳು.",
    category: "general",
    icon_name: "MessageSquareWarning",
    priority: 8,
  },
  {
    tip_en: "Enable transaction alerts on your phone for every debit.",
    tip_hi: "हर डेबिट पर अलर्ट चालू रखें।",
    tip_kn: "ಪ್ರತಿ ಡೆಬಿಟ್‌ಗೆ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    category: "general",
    icon_name: "Bell",
    priority: 6,
  },
  {
    tip_en: "Do not click shortened links in SMS about refunds or subsidies.",
    tip_hi: "रिफंड या सब्सिडी वाले SMS में छोटे लिंक पर क्लिक न करें।",
    tip_kn: "ರಿಫಂಡ್ ಅಥವಾ ಸಬ್ಸಿಡಿ SMS ನಲ್ಲಿ ಚಿಕ್ಕ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
    category: "general",
    icon_name: "Link2Off",
    priority: 9,
  },
  {
    tip_en: "If money leaves your account wrongly, inform the bank immediately in writing.",
    tip_hi: "गलत कटौती पर तुरंत बैंक को लिखित में सूचित करें।",
    tip_kn: "ತಪ್ಪಾದ ಕಡಿತಕ್ಕೆ ತಕ್ಷಣ ಬ್ಯಾಂಕಿಗೆ ಲಿಖಿತವಾಗಿ ತಿಳಿಸಿ.",
    category: "general",
    icon_name: "FileWarning",
    priority: 8,
  },
  {
    tip_en: "Use screen lock and app lock for banking and UPI apps.",
    tip_hi: "बैंकिंग और UPI ऐप्स पर स्क्रीन लॉक और ऐप लॉक लगाएँ।",
    tip_kn: "ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು UPI ಆ್ಯಪ್‌ಗಳಿಗೆ ಸ್ಕ್ರೀನ್ ಲಾಕ್ ಮತ್ತು ಆ್ಯಪ್ ಲಾಕ್ ಬಳಸಿ.",
    category: "password",
    icon_name: "Lock",
    priority: 7,
  },
  {
    tip_en: "Avoid public Wi‑Fi for banking; use mobile data when possible.",
    tip_hi: "बैंकिंग के लिए सार्वजनिक Wi‑Fi से बचें; मोबाइल डेटा उपयोग करें।",
    tip_kn: "ಬ್ಯಾಂಕಿಂಗ್‌ಗೆ ಸಾರ್ವಜನಿಕ Wi‑Fi ತಪ್ಪಿಸಿ; ಸಾಧ್ಯವಾದರೆ ಮೊಬೈಲ್ ಡೇಟಾ.",
    category: "general",
    icon_name: "WifiOff",
    priority: 6,
  },
  {
    tip_en: "Memorize your bank’s toll-free number from passbook — do not trust Google ads.",
    tip_hi: "पासबुक से टोल-फ्री नंबर याद रखें — Google विज्ञापन पर भरोसा न करें।",
    tip_kn: "ಪಾಸ್‌ಬುಕ್‌ನಿಂದ ಟೋಲ್ ಫ್ರಿ ಸಂಖ್ಯೆ ನೆನಪಿಡಿ — ಗೂಗಲ್ ಜಾಹೀರಾತುಗಳನ್ನು ನಂಬಬೇಡಿ.",
    category: "general",
    icon_name: "BookOpen",
    priority: 7,
  },
  {
    tip_en: "Report suspicious SMS to your bank and block the sender.",
    tip_hi: "संदिग्ध SMS की बैंक को रिपोर्ट करें और भेजने वाले को ब्लॉक करें।",
    tip_kn: "ಸಂಶಯಾಸ್ಪದ SMS ಅನ್ನು ಬ್ಯಾಂಕಿಗೆ ವರದಿ ಮಾಡಿ ಮತ್ತು ಕಳುಹಿಸುವವರನ್ನು ನಿರ್ಬಂಧಿಸಿ.",
    category: "general",
    icon_name: "Flag",
    priority: 6,
  },
  {
    tip_en: "When in doubt, visit your branch with ID proof — do not hurry online.",
    tip_hi: "संदेह हो तो शाखा जाएँ ID के साथ — ऑनलाइन जल्दबाजी न करें।",
    tip_kn: "ಸಂದೇಹವಿದ್ದರೆ ಐಡಿ ಪುರಾವೆಯೊಂದಿಗೆ ಶಾಖೆಗೆ ಹೋಗಿ — ಆನ್‌ಲೈನ್ ಅವಸರ ಮಾಡಬೇಡಿ.",
    category: "kyc",
    icon_name: "UserCheck",
    priority: 8,
  },
  {
    tip_en: "Do not store passwords in phone notes — use a trusted password manager.",
    tip_hi: "पासवर्ड फोन नोट्स में न रखें — भरोसेमंद पासवर्ड मैनेजर उपयोग करें।",
    tip_kn: "ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಫೋನ್ ನೋಟ್ಸ್‌ನಲ್ಲಿ ಇಡಬೇಡಿ — ವಿಶ್ವಾಸಾರ್ಹ ಪಾಸ್‌ವರ್ಡ್ ಮ್ಯಾನೇಜರ್ ಬಳಸಿ.",
    category: "password",
    icon_name: "NotebookPen",
    priority: 6,
  },
  {
    tip_en: "If a QR looks new or pasted over, ask the shopkeeper to confirm.",
    tip_hi: "अगर QR नया या चिपका हुआ लगे, दुकानदार से पुष्टि करें।",
    tip_kn: "QR ಹೊಸದಾಗಿ ಅಥವಾ ಅಂಟಿಸಿದಂತೆ ಕಾಣುತ್ತಿದ್ದರೆ, ಅಂಗಡಿದಾರರಿಂದ ದೃಢೀಕರಿಸಿ.",
    category: "upi",
    icon_name: "QrCode",
    priority: 8,
  },
  {
    tip_en: "Never return a 'wrong' UPI credit without verifying with your bank.",
    tip_hi: "गलत क्रेडिट लौटाने से पहले बैंक से पुष्टि करें।",
    tip_kn: "ತಪ್ಪಾದ UPI ಕ್ರೆಡಿಟ್ ಹಿಂತಿರುಗಿಸುವ ಮೊದಲು ಬ್ಯಾಂಕಿನಿಂದ ದೃಢೀಕರಿಸಿ.",
    category: "upi",
    icon_name: "ArrowLeftRight",
    priority: 7,
  },
  {
    tip_en: "Keep your registered mobile number updated — SIM swap attacks target old SIMs.",
    tip_hi: "रजिस्टर्ड मोबाइल अपडेट रखें — SIM स्वैप पुराने सिम को निशाना बनाता है।",
    tip_kn: "ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ನವೀಕೃತವಾಗಿರಲಿ — SIM ಸ್ವ್ಯಾಪ್ ಹಳೆಯ ಸಿಮ್ ಗಳನ್ನು ಗುರಿಯಾಗಿಸುತ್ತದೆ.",
    category: "otp",
    icon_name: "SimCard",
    priority: 7,
  },
  {
    tip_en: "Read RBI’s ‘safe digital banking’ leaflets available at bank branches.",
    tip_hi: "बैंक शाखाओं पर उपलब्ध RBI की पत्रिकाएँ पढ़ें।",
    tip_kn: "ಬ್ಯಾಂಕ್ ಶಾಖೆಗಳಲ್ಲಿ ಲಭ್ಯವಿರುವ RBI ಯ ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಚೀಟಿಗಳನ್ನು ಓದಿ.",
    category: "general",
    icon_name: "ScrollText",
    priority: 5,
  },
];
