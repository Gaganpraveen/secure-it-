export const SCAM_TYPES = {
  upi_fraud: { label: "UPI Fraud", color: "danger", icon: "CreditCard" },
  phishing: { label: "Phishing", color: "danger", icon: "Link" },
  vishing: { label: "Vishing Call", color: "warn", icon: "Phone" },
  loan_scam: { label: "Loan Scam", color: "warn", icon: "Banknote" },
  kyc_fraud: { label: "KYC Fraud", color: "danger", icon: "FileWarning" },
  fake_app: { label: "Fake App", color: "danger", icon: "Smartphone" },
  qr_scam: { label: "QR Scam", color: "warn", icon: "QrCode" },
  other: { label: "Other Scam", color: "warn", icon: "AlertTriangle" },
  none: { label: "Safe", color: "safe", icon: "CheckCircle" },
} as const;

export type ScamType = keyof typeof SCAM_TYPES;

export const RISK_LEVELS = {
  SAFE: { label: "SAFE", min: 0, max: 30, color: "#10B981", bgColor: "rgba(16,185,129,0.15)" },
  SUSPICIOUS: { label: "SUSPICIOUS", min: 31, max: 69, color: "#F59E0B", bgColor: "rgba(245,158,11,0.15)" },
  DANGEROUS: { label: "DANGEROUS", min: 70, max: 100, color: "#EF4444", bgColor: "rgba(239,68,68,0.15)" },
} as const;

export const TRUST_LEVELS = {
  trusted: { label: "Trusted", color: "#10B981", icon: "ShieldCheck" },
  unknown: { label: "Unknown", color: "#94A3B8", icon: "Shield" },
  suspicious: { label: "Suspicious", color: "#F59E0B", icon: "ShieldAlert" },
  dangerous: { label: "Dangerous", color: "#EF4444", icon: "ShieldOff" },
} as const;

export type TrustLevel = keyof typeof TRUST_LEVELS;

export const SEVERITY_COLORS = {
  low: "#10B981",
  medium: "#F59E0B",
  high: "#F97316",
  critical: "#EF4444",
} as const;

export const LANGUAGE_MAP = {
  en: { code: "en-IN", label: "EN", flag: "🇬🇧", name: "English" },
  hi: { code: "hi-IN", label: "HI", flag: "🇮🇳", name: "हिंदी" },
  kn: { code: "kn-IN", label: "ಕ", flag: "🇮🇳", name: "ಕನ್ನಡ" },
} as const;

export type Language = keyof typeof LANGUAGE_MAP;

export const TIP_CATEGORIES = {
  upi: { label: "UPI Safety", icon: "Smartphone", color: "#3B82F6" },
  otp: { label: "OTP Protection", icon: "Lock", color: "#10B981" },
  kyc: { label: "KYC Awareness", icon: "FileText", color: "#F59E0B" },
  atm: { label: "ATM Safety", icon: "CreditCard", color: "#8B5CF6" },
  password: { label: "Password Tips", icon: "KeyRound", color: "#F97316" },
  general: { label: "General Safety", icon: "Shield", color: "#94A3B8" },
} as const;

export const EXAMPLE_MESSAGES = [
  {
    label: "KYC Fraud SMS",
    text: "Dear Customer, Your SBI account will be blocked in 24 hours. Update KYC immediately: http://sbi-kyc-update.in/verify Click now to avoid account suspension.",
  },
  {
    label: "UPI Refund Trick",
    text: "You have received ₹15,000 refund from Income Tax Dept. Click to claim: http://bit.ly/itrefund2025 Offer valid for 2 hours only.",
  },
  {
    label: "OTP Sharing Scam",
    text: "Your UPI ID has been selected for ₹50,000 cashback! Share OTP sent to your number to claim reward. This is an RBI approved promotion.",
  },
  {
    label: "Safe Bank SMS",
    text: "Your SBI account XXX1234 has been credited with ₹25,000.00 on 01-04-2026. Available balance: ₹1,25,432.50",
  },
];
