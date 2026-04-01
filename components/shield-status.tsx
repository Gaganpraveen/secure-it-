"use client";

import { Shield } from "lucide-react";

import { cn } from "@/lib/utils";

type Level = "safe" | "warn" | "danger" | "neutral";

const levelMap: Record<
  Level,
  { ring: string; icon: string; label: string }
> = {
  safe: {
    ring: "text-accent-safe",
    icon: "text-accent-safe",
    label: "Safe",
  },
  warn: {
    ring: "text-accent-warn",
    icon: "text-accent-warn",
    label: "Watch",
  },
  danger: {
    ring: "text-accent-danger",
    icon: "text-accent-danger",
    label: "Threat",
  },
  neutral: {
    ring: "text-text-secondary",
    icon: "text-text-secondary",
    label: "Unknown",
  },
};

export function ShieldStatus({
  level,
  className,
  pulse = true,
}: {
  level: Level;
  className?: string;
  pulse?: boolean;
}) {
  const cfg = levelMap[level];
  return (
    <div
      className={cn(
        "relative flex size-36 items-center justify-center rounded-full border-4 border-app-card bg-app-card shadow-card",
        pulse && level === "safe" && "animate-shield",
        className
      )}
      aria-label={cfg.label}
    >
      <div
        className={cn(
          "absolute inset-2 rounded-full border-2 opacity-40",
          cfg.ring
        )}
      />
      <Shield className={cn("relative z-10 size-20", cfg.icon)} strokeWidth={1.5} />
    </div>
  );
}
