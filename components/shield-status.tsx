"use client";

import { Shield, ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ShieldLevel = "safe" | "warn" | "danger" | "scanning";

interface ShieldStatusProps {
  level?: ShieldLevel;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const levelConfig = {
  safe: {
    color: "#10B981",
    glow: "safe-glow",
    pulse: "animate-pulse-shield",
    Icon: ShieldCheck,
    label: "Protected",
  },
  warn: {
    color: "#F59E0B",
    glow: "warn-glow",
    pulse: "animate-pulse",
    Icon: ShieldAlert,
    label: "Suspicious",
  },
  danger: {
    color: "#EF4444",
    glow: "danger-glow",
    pulse: "animate-pulse",
    Icon: ShieldOff,
    label: "Threat Detected",
  },
  scanning: {
    color: "#3B82F6",
    glow: "",
    pulse: "animate-spin-slow",
    Icon: Shield,
    label: "Scanning...",
  },
};

const sizeConfig = {
  sm: { wrapper: "w-12 h-12", icon: 24 },
  md: { wrapper: "w-20 h-20", icon: 40 },
  lg: { wrapper: "w-32 h-32", icon: 64 },
};

export function ShieldStatus({ level = "safe", size = "md", className }: ShieldStatusProps) {
  const config = levelConfig[level];
  const sizeConf = sizeConfig[size];
  const { Icon } = config;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full",
        sizeConf.wrapper,
        config.glow,
        config.pulse,
        className
      )}
      style={{
        background: `radial-gradient(circle, ${config.color}20 0%, transparent 70%)`,
        border: `2px solid ${config.color}40`,
      }}
    >
      <Icon size={sizeConf.icon} style={{ color: config.color }} />
      {level === "scanning" && (
        <div
          className="absolute inset-0 rounded-full border-2 border-t-info animate-spin"
          style={{ borderColor: "transparent", borderTopColor: "#3B82F6" }}
        />
      )}
    </div>
  );
}
