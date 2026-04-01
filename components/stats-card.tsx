import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatsCard({
  icon: Icon,
  value,
  label,
  className,
}: {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "border-border bg-app-card shadow-card",
        className
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex size-12 min-h-touch min-w-touch items-center justify-center rounded-2xl bg-accent-brand/15 text-accent-brand">
          <Icon className="size-7" aria-hidden />
        </div>
        <div>
          <p className="font-mono text-2xl font-semibold text-text-primary">
            {value}
          </p>
          <p className="text-sm text-text-secondary">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
