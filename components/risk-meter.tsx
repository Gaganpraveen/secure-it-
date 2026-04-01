"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

export function RiskMeter({
  score,
  size = 160,
  className,
}: {
  score: number;
  size?: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (clamped / 100) * circumference;

  const strokeClass = useMemo(() => {
    if (clamped >= 75) return "stroke-accent-danger";
    if (clamped >= 40) return "stroke-accent-warn";
    return "stroke-accent-safe";
  }, [clamped]);

  const textClass = useMemo(() => {
    if (clamped >= 75) return "text-accent-danger";
    if (clamped >= 40) return "text-accent-warn";
    return "text-accent-safe";
  }, [clamped]);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-muted/40"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={cn("transition-all duration-700", strokeClass)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
        <span className={cn("text-3xl font-semibold tabular-nums", textClass)}>
          {clamped}
        </span>
        <span className="text-xs text-text-secondary">/ 100</span>
      </div>
    </div>
  );
}
