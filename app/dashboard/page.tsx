"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Radar, ScanLine, Shield } from "lucide-react";

import { CommunityAlertCard } from "@/components/community-alert-card";
import { ShieldStatus } from "@/components/shield-status";
import { StatsCard } from "@/components/stats-card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEED_TIPS } from "@/lib/seed-data";
import { explanationForLanguage, isBrowserOffline } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

type AlertRow = {
  id: string;
  alert_title: string;
  alert_title_hi: string | null;
  alert_title_kn: string | null;
  description: string;
  description_hi: string | null;
  description_kn: string | null;
  severity: string;
};

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState<{
    scamsToday: number;
    protectedEstimate: number;
    fallback?: boolean;
  } | null>(null);
  const [alert, setAlert] = useState<AlertRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isBrowserOffline()) {
      toast.message(t.common.offline);
    }
  }, [t.common.offline]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [sRes, aRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/community-alerts?pincode=560001"),
        ]);
        const sJson = await sRes.json();
        const aJson = await aRes.json();
        if (!cancelled) {
          setStats(sJson);
          setAlert((aJson.alerts?.[0] as AlertRow) ?? null);
          if (sJson.fallback || aJson.fallback) {
            toast.message(t.errors.supabaseFailed);
          }
        }
      } catch {
        if (!cancelled) {
          setStats({ scamsToday: 12, protectedEstimate: 2400, fallback: true });
          toast.error(t.errors.network);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [t.errors.network, t.errors.supabaseFailed]);

  const dailyTip = SEED_TIPS[0];
  const tipText = explanationForLanguage(
    dailyTip.tip_en,
    dailyTip.tip_hi,
    dailyTip.tip_kn,
    language
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
          {t.dashboard.title}
        </h1>
        <p className="mt-1 text-text-secondary">{t.meta.description}</p>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-gradient-to-b from-app-card to-app-bg p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <ShieldStatus level="safe" />
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-semibold text-text-primary">
              {t.dashboard.protectionStatus}
            </p>
            <p className="text-text-secondary">{t.dashboard.safe}</p>
          </div>
        </div>
        <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </>
          ) : (
            <>
              <StatsCard
                icon={Shield}
                value={stats?.scamsToday ?? "—"}
                label={t.dashboard.scamsCaught}
              />
              <StatsCard
                icon={Radar}
                value={stats?.protectedEstimate ?? "—"}
                label={t.dashboard.peopleProtected}
              />
            </>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          {t.dashboard.latestAlert}
        </h2>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-2xl" />
        ) : alert ? (
          <CommunityAlertCard
            titleEn={alert.alert_title}
            titleHi={alert.alert_title_hi ?? alert.alert_title}
            titleKn={alert.alert_title_kn ?? alert.alert_title}
            descEn={alert.description}
            descHi={alert.description_hi ?? alert.description}
            descKn={alert.description_kn ?? alert.description}
            severity={alert.severity}
          />
        ) : (
          <p className="text-sm text-text-secondary">{t.common.connecting}</p>
        )}
      </section>

      <section className="space-y-3 rounded-2xl border border-border bg-app-card p-4 shadow-card">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          {t.dashboard.dailyTip}
        </h2>
        <p className="text-sm leading-relaxed text-text-primary">{tipText}</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          {t.dashboard.quickActions}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/dashboard/scan"
            className={buttonVariants({
              className:
                "min-h-touch justify-between rounded-[12px] text-lg",
            })}
          >
            {t.dashboard.scanMessage}
            <ScanLine className="size-5" />
          </Link>
          <Link
            href="/dashboard/check"
            className={buttonVariants({
              variant: "secondary",
              className:
                "min-h-touch justify-between rounded-[12px] text-lg",
            })}
          >
            {t.dashboard.checkNumber}
            <Radar className="size-5" />
          </Link>
          <Link
            href="/dashboard/report"
            className={buttonVariants({
              variant: "outline",
              className:
                "min-h-touch justify-between rounded-[12px] text-lg",
            })}
          >
            {t.dashboard.reportScam}
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
