"use client";

import { getRiskColor, getRiskLevel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RiskMeterProps {
  score: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function RiskMeter({ score, size = 120, className, showLabel = true }: RiskMeterProps) {
  const color = getRiskColor(score);
  const level = getRiskLevel(score);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  const levelLabel = {
    SAFE: "SAFE",
    SUSPICIOUS: "SUSPICIOUS",
    DANGEROUS: "DANGEROUS",
  }[level];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(148,163,184,0.15)"
            strokeWidth={10}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-bold"
            style={{ fontSize: size * 0.22, color, lineHeight: 1 }}
          >
            {score}
          </span>
          <span className="text-xs text-secondary font-medium" style={{ color: "#94A3B8" }}>
            /100
          </span>
        </div>
      </div>
      {showLabel && (
        <span
          className="text-xs font-bold tracking-wider px-3 py-1 rounded-full"
          style={{
            color,
            background: `${color}20`,
            border: `1px solid ${color}40`,
          }}
        >
          {levelLabel}
        </span>
      )}
    </div>
  );
}
