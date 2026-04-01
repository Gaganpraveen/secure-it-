import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { AppLanguage, Classification } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function riskColorClass(score: number): string {
  if (score >= 75) return "text-accent-danger";
  if (score >= 40) return "text-accent-warn";
  return "text-accent-safe";
}

export function classificationColor(
  c: Classification | string
): "safe" | "warn" | "danger" {
  if (c === "DANGEROUS") return "danger";
  if (c === "SUSPICIOUS") return "warn";
  return "safe";
}

export function explanationForLanguage(
  en: string,
  hi: string,
  kn: string,
  lang: AppLanguage
): string {
  if (lang === "hi") return hi || en;
  if (lang === "kn") return kn || en;
  return en;
}

export function isBrowserOffline(): boolean {
  if (typeof navigator === "undefined") return false;
  return !navigator.onLine;
}
