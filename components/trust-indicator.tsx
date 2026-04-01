import { Shield, ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";
import { TRUST_LEVELS, TrustLevel } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TrustIndicatorProps {
  level: TrustLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const iconMap = { Shield, ShieldCheck, ShieldAlert, ShieldOff };
const sizeConfig = { sm: { icon: 20, text: "text-sm" }, md: { icon: 32, text: "text-base" }, lg: { icon: 48, text: "text-lg" } };

export function TrustIndicator({ level, size = "md", showLabel = true, className }: TrustIndicatorProps) {
  const config = TRUST_LEVELS[level];
  const sizeConf = sizeConfig[size];
  const Icon = iconMap[config.icon as keyof typeof iconMap];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="rounded-full p-3 transition-all duration-300"
        style={{
          background: `${config.color}15`,
          border: `2px solid ${config.color}40`,
          boxShadow: `0 0 20px ${config.color}20`,
        }}
      >
        <Icon size={sizeConf.icon} style={{ color: config.color }} />
      </div>
      {showLabel && (
        <span
          className={cn("font-bold tracking-wide", sizeConf.text)}
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      )}
    </div>
  );
}
