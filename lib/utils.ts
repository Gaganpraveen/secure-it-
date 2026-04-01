import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RISK_LEVELS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function getRiskLevel(score: number): keyof typeof RISK_LEVELS {
  if (score <= 30) return "SAFE";
  if (score <= 69) return "SUSPICIOUS";
  return "DANGEROUS";
}

export function getRiskColor(score: number): string {
  if (score <= 30) return "#10B981";
  if (score <= 69) return "#F59E0B";
  return "#EF4444";
}

export function getRiskBgColor(score: number): string {
  if (score <= 30) return "rgba(16,185,129,0.15)";
  if (score <= 69) return "rgba(245,158,11,0.15)";
  return "rgba(239,68,68,0.15)";
}

export function anonymizeSender(sender: string): string {
  if (!sender) return "Unknown";
  if (sender.includes("@")) {
    const [name, domain] = sender.split("@");
    return `${name.substring(0, 2)}***@${domain}`;
  }
  if (sender.length >= 10) {
    return `${sender.substring(0, 3)}****${sender.slice(-3)}`;
  }
  return `${sender.substring(0, 2)}****`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#F97316",
    critical: "#EF4444",
  };
  return colors[severity] ?? "#94A3B8";
}

export function getScamTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    upi_fraud: "UPI Fraud",
    phishing: "Phishing",
    vishing: "Vishing Call",
    loan_scam: "Loan Scam",
    kyc_fraud: "KYC Fraud",
    fake_app: "Fake App",
    qr_scam: "QR Scam",
    other: "Other Scam",
    none: "Safe",
  };
  return labels[type] ?? type;
}
