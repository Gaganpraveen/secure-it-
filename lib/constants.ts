export const SCAM_TYPES = [
  "upi_fraud",
  "phishing",
  "vishing",
  "loan_scam",
  "kyc_fraud",
  "fake_app",
  "qr_scam",
  "other",
] as const;

export type ScamType = (typeof SCAM_TYPES)[number] | "none";

export const CLASSIFICATIONS = ["SAFE", "SUSPICIOUS", "DANGEROUS"] as const;
export type Classification = (typeof CLASSIFICATIONS)[number];

export const TRUST_LEVELS = [
  "trusted",
  "unknown",
  "suspicious",
  "dangerous",
] as const;
export type TrustLevel = (typeof TRUST_LEVELS)[number];

export const TIP_CATEGORIES = [
  "upi",
  "password",
  "otp",
  "kyc",
  "general",
  "atm",
] as const;
export type TipCategory = (typeof TIP_CATEGORIES)[number];

export const LANGUAGES = ["en", "hi", "kn"] as const;
export type AppLanguage = (typeof LANGUAGES)[number];

export const SPEECH_LANG_MAP: Record<AppLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};
