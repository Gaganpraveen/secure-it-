import { CreditCard, Link, Phone, Banknote, FileWarning, Smartphone, QrCode, AlertTriangle, CheckCircle } from "lucide-react";
import { SCAM_TYPES, ScamType } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  CreditCard, Link, Phone, Banknote, FileWarning, Smartphone, QrCode, AlertTriangle, CheckCircle
};

interface ScamTypeBadgeProps {
  type: string;
  className?: string;
  showIcon?: boolean;
}

export function ScamTypeBadge({ type, className, showIcon = true }: ScamTypeBadgeProps) {
  const config = SCAM_TYPES[type as ScamType] ?? SCAM_TYPES.other;
  const colorMap = {
    danger: { bg: "rgba(239,68,68,0.15)", text: "#EF4444", border: "rgba(239,68,68,0.3)" },
    warn: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", border: "rgba(245,158,11,0.3)" },
    safe: { bg: "rgba(16,185,129,0.15)", text: "#10B981", border: "rgba(16,185,129,0.3)" },
  };
  const colors = colorMap[config.color as keyof typeof colorMap];
  const Icon = iconMap[config.icon as keyof typeof iconMap];

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", className)}
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {showIcon && Icon && <Icon size={12} />}
      {config.label}
    </span>
  );
}
