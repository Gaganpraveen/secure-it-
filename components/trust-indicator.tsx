"use client";

import { ShieldAlert, ShieldCheck, ShieldOff, ShieldQuestion } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/lib/constants";

const cfg: Record<
  TrustLevel,
  { Icon: typeof ShieldCheck; color: string; label: string }
> = {
  trusted: {
    Icon: ShieldCheck,
    color: "text-accent-safe",
    label: "Trusted",
  },
  unknown: {
    Icon: ShieldQuestion,
    color: "text-text-secondary",
    label: "Unknown",
  },
  suspicious: {
    Icon: ShieldAlert,
    color: "text-accent-warn",
    label: "Suspicious",
  },
  dangerous: {
    Icon: ShieldOff,
    color: "text-accent-danger",
    label: "Dangerous",
  },
};

export function TrustIndicator({
  level,
  className,
}: {
  level: TrustLevel | string;
  className?: string;
}) {
  const key = (level in cfg ? level : "unknown") as TrustLevel;
  const { Icon, color, label } = cfg[key];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-app-card p-6 shadow-card",
        className
      )}
    >
      <Icon className={cn("size-20", color)} strokeWidth={1.25} />
      <p className={cn("font-heading text-lg font-semibold", color)}>{label}</p>
    </div>
  );
}
