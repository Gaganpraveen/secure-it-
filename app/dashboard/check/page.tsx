"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

import { TrustIndicator } from "@/components/trust-indicator";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { TrustLevel } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

export default function CheckPage() {
  const { t } = useLanguage();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    trust_level: TrustLevel | string;
    total_reports: number;
    last_reported_at: string | null;
  } | null>(null);

  async function check() {
    if (!id.trim()) return;
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(
        `/api/trust-score?identifier=${encodeURIComponent(id.trim())}`
      );
      const json = await res.json();
      setData(json);
      if (json.fallback) toast.message(t.errors.supabaseFailed);
    } catch {
      toast.error(t.errors.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.check.title}
        </h1>
      </div>

      <Card className="border-border bg-app-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-text-primary">
            <Phone className="size-5 text-accent-info" />
            {t.check.cta}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={t.check.placeholder}
            className="min-h-touch rounded-xl border-border bg-muted/30 text-base"
          />
          <Button
            type="button"
            className="min-h-touch w-full rounded-[12px] text-lg"
            onClick={() => void check()}
            disabled={loading}
          >
            {loading ? t.common.loading : t.check.cta}
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <Skeleton className="h-48 w-full rounded-2xl" />
      ) : data ? (
        <div className="space-y-4">
          <TrustIndicator level={data.trust_level as TrustLevel} />
          <p className="text-center text-sm text-text-secondary">
            {data.total_reports > 0
              ? `${data.total_reports} ${t.check.reportsCount}`
              : t.check.noReports}
          </p>
          <a
            href={`/dashboard/report?sender=${encodeURIComponent(id.trim())}`}
            className={buttonVariants({
              variant: "outline",
              className: "min-h-touch w-full rounded-[12px] text-lg",
            })}
          >
            {t.check.reportNumber}
          </a>
        </div>
      ) : null}
    </div>
  );
}
