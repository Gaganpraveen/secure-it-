import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
  className?: string;
}

export function StatsCard({ icon: Icon, value, label, color = "#8B5CF6", className }: StatsCardProps) {
  return (
    <div
      className={cn("rounded-2xl p-4 flex items-center gap-4", className)}
      style={{
        background: "rgba(30,41,59,0.8)",
        border: "1px solid rgba(148,163,184,0.1)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <div className="text-2xl font-bold font-mono" style={{ color }}>
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
