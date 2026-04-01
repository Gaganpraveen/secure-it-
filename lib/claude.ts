import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type AnalysisResult = {
  risk_score: number;
  classification: "SAFE" | "SUSPICIOUS" | "DANGEROUS";
  scam_type: string;
  explanation_en: string;
  explanation_hi: string;
  explanation_kn: string;
  red_flags: string[];
  safety_advice_en: string;
  safety_advice_hi: string;
  safety_advice_kn: string;
  banking_context: string;
};

const SYSTEM_PROMPT = `You are KavachNet AI — a cybersecurity analyst protecting rural Indian digital banking users. You analyze messages (SMS, WhatsApp, calls) for scam/fraud indicators.

CRITICAL CONTEXT: Rural Indian banking scams include:
- Fake KYC update requests from "bank officials"
- UPI collect requests from unknown IDs disguised as refunds
- Fake loan approval SMS with phishing links
- OTP sharing tricks ("share OTP to complete refund")
- Fake electricity/gas bill payment links
- QR code scams at local shops
- Voice calls impersonating SBI/PNB/BoB officers
- Fake government subsidy (PM-KISAN, LPG) SMS
- SIM swap fraud pretexts

Analyze the message and respond ONLY with valid JSON (no markdown, no backticks):
{
  "risk_score": <0-100>,
  "classification": "<SAFE|SUSPICIOUS|DANGEROUS>",
  "scam_type": "<upi_fraud|phishing|vishing|loan_scam|kyc_fraud|fake_app|qr_scam|other|none>",
  "explanation_en": "<Simple English explanation, max 2 sentences, no jargon>",
  "explanation_hi": "<Same explanation in Hindi, simple language>",
  "explanation_kn": "<Same explanation in Kannada, simple language>",
  "red_flags": ["<list of specific red flags found>"],
  "safety_advice_en": "<What to do next, in English>",
  "safety_advice_hi": "<What to do next, in Hindi>",
  "safety_advice_kn": "<What to do next, in Kannada>",
  "banking_context": "<Explain which banking rule/norm this violates, e.g. 'RBI says banks never ask for OTP over phone'>"
}

RULES:
- If message mentions OTP, PIN, CVV sharing → always DANGEROUS (90+)
- If message has shortened URLs (bit.ly, tinyurl) → minimum SUSPICIOUS (60+)
- If message claims to be from a bank but uses informal language → SUSPICIOUS (50+)
- If message asks to install an app or click a link for KYC → DANGEROUS (85+)
- If message is a normal bank statement or genuine alert → SAFE (0-20)
- Explanations must be understandable by someone with Class 5 education
- Use relatable examples: "This is like someone pretending to be the postman to enter your house"`;

export async function analyzeMessage(message: string): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Analyze this message for fraud: "${message}"`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  const parsed = JSON.parse(content.text) as AnalysisResult;
  return parsed;
}

export const FALLBACK_RESULT: AnalysisResult = {
  risk_score: 65,
  classification: "SUSPICIOUS",
  scam_type: "other",
  explanation_en: "This message looks suspicious. We could not fully analyze it right now. Please verify with your bank directly before taking any action.",
  explanation_hi: "यह संदेश संदिग्ध लगता है। कृपया कोई भी कार्रवाई करने से पहले अपने बैंक से सीधे सत्यापित करें।",
  explanation_kn: "ಈ ಸಂದೇಶ ಅನುಮಾನಾಸ್ಪದವಾಗಿ ಕಾಣುತ್ತದೆ. ಯಾವುದೇ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ನಿಮ್ಮ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
  red_flags: ["Could not complete full analysis", "Exercise caution with this message"],
  safety_advice_en: "Do not click any links or share personal information. Call your bank's official helpline to verify.",
  safety_advice_hi: "कोई भी लिंक पर क्लिक न करें या व्यक्तिगत जानकारी साझा न करें। सत्यापन के लिए अपने बैंक की आधिकारिक हेल्पलाइन पर कॉल करें।",
  safety_advice_kn: "ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಪರಿಶೀಲನೆಗಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕಿನ ಅಧಿಕೃತ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.",
  banking_context: "RBI guidelines state that banks never ask customers to click links via SMS or share OTP/PIN details.",
};
