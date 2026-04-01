import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-20250514";

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

export type ClaudeAnalysisResult = {
  risk_score: number;
  classification: string;
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

function getFallbackAnalysis(): ClaudeAnalysisResult {
  return {
    risk_score: 65,
    classification: "SUSPICIOUS",
    scam_type: "other",
    explanation_en:
      "This message looks suspicious. Please verify with your bank directly before clicking links or sharing any information.",
    explanation_hi:
      "यह संदेश संदिग्ध लगता है। कृपया लिंक पर क्लिक करने या जानकारी साझा करने से पहले सीधे अपने बैंक से पुष्टि करें।",
    explanation_kn:
      "ಈ ಸಂದೇಶ ಸಂಶಯಾಸ್ಪದವಾಗಿದೆ. ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೊದಲು ಅಥವಾ ಯಾವುದೇ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳುವ ಮೊದಲು ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.",
    red_flags: ["Could not complete AI scan — treat as unverified"],
    safety_advice_en:
      "Call your bank’s official number from the back of your card. Never share OTP or PIN.",
    safety_advice_hi:
      "अपने कार्ड के पीछे दिए गए आधिकारिक नंबर पर बैंक को कॉल करें। OTP या PIN कभी न साझा करें।",
    safety_advice_kn:
      "ನಿಮ್ಮ ಕಾರ್ಡ್ ಹಿಂದೆ ಇರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಬ್ಯಾಂಕ್‌ಗೆ ಕರೆ ಮಾಡಿ. OTP ಅಥವಾ PIN ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
    banking_context:
      "RBI guidelines: Banks never ask for OTP, PIN, or full card details over phone or SMS.",
  };
}

export async function analyzeMessageWithClaude(
  message: string
): Promise<ClaudeAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    return getFallbackAnalysis();
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this message:\n\n"""${message.slice(0, 12000)}"""`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return getFallbackAnalysis();
    }

    let raw = textBlock.text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");

    const parsed = JSON.parse(raw) as Partial<ClaudeAnalysisResult>;
    if (
      typeof parsed.risk_score !== "number" ||
      !parsed.classification ||
      !parsed.explanation_en
    ) {
      return getFallbackAnalysis();
    }

    const base = getFallbackAnalysis();
    return {
      ...base,
      ...parsed,
      risk_score: parsed.risk_score,
      classification: parsed.classification,
      scam_type: parsed.scam_type ?? base.scam_type,
      explanation_en: parsed.explanation_en,
      explanation_hi: parsed.explanation_hi ?? base.explanation_hi,
      explanation_kn: parsed.explanation_kn ?? base.explanation_kn,
      red_flags: Array.isArray(parsed.red_flags) ? parsed.red_flags : base.red_flags,
      safety_advice_en: parsed.safety_advice_en ?? base.safety_advice_en,
      safety_advice_hi: parsed.safety_advice_hi ?? base.safety_advice_hi,
      safety_advice_kn: parsed.safety_advice_kn ?? base.safety_advice_kn,
      banking_context: parsed.banking_context ?? base.banking_context,
    };
  } catch (e) {
    console.error("Claude analysis failed:", e);
    return getFallbackAnalysis();
  }
}
