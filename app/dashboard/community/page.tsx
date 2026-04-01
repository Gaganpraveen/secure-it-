"use client";

import { useMemo, useState } from "react";

import { ThreatCard } from "@/components/threat-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useThreatReportsRealtime } from "@/hooks/use-realtime";
import { useLanguage } from "@/hooks/use-language";

export default function CommunityPage() {
  const { t } = useLanguage();
  const [pincode, setPincode] = useState("560001");
  const { reports, error } = useThreatReportsRealtime(pincode);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayReports = reports.filter(
      (r) => new Date(r.created_at) >= today
    );
    const typeCount: Record<string, number> = {};
    const senderCount: Record<string, number> = {};
    for (const r of reports) {
      if (r.scam_type) {
        typeCount[r.scam_type] = (typeCount[r.scam_type] ?? 0) + 1;
      }
      if (r.sender_info) {
        senderCount[r.sender_info] = (senderCount[r.sender_info] ?? 0) + 1;
      }
    }
    const topType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
    const topSender = Object.entries(senderCount).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return {
      today: todayReports.length,
      topType: topType?.[0] ?? "—",
      topSender: topSender?.[0] ?? "—",
    };
  }, [reports]);

  const trending = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of reports) {
      if (!r.scam_type) continue;
      map[r.scam_type] = (map[r.scam_type] ?? 0) + 1;
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [reports]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.community.title}
        </h1>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm text-text-secondary">
          {t.community.pincode}
          <Input
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="min-h-touch rounded-xl border-border bg-muted/30"
            inputMode="numeric"
          />
        </label>
      </div>

      {error ? (
        <p className="text-sm text-accent-warn">{t.common.connecting}</p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-app-card p-4 shadow-card">
          <p className="text-xs text-text-secondary">{t.community.statsToday}</p>
          <p className="font-mono text-2xl text-text-primary">{stats.today}</p>
        </div>
        <div className="rounded-2xl border border-border bg-app-card p-4 shadow-card">
          <p className="text-xs text-text-secondary">{t.community.topScam}</p>
          <p className="text-sm font-medium text-text-primary">{stats.topType}</p>
        </div>
        <div className="rounded-2xl border border-border bg-app-card p-4 shadow-card">
          <p className="text-xs text-text-secondary">{t.community.topNumber}</p>
          <p className="truncate text-sm font-medium text-text-primary">
            {stats.topSender}
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 font-heading text-lg font-semibold text-text-primary">
          {t.community.trending}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {trending.map(([type, count]) => (
            <li
              key={type}
              className="rounded-pill border border-border bg-muted/50 px-3 py-1 text-sm text-text-primary"
            >
              {type}: {count}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          {t.community.feed}
        </h2>
        {reports.length === 0 ? (
          <Skeleton className="h-24 w-full rounded-2xl" />
        ) : (
          reports.map((r) => (
            <ThreatCard
              key={r.id}
              messagePreview={r.message_text}
              scamType={r.scam_type}
              riskScore={r.risk_score}
              createdAt={r.created_at}
              senderHint={r.sender_info}
            />
          ))
        )}
      </section>
    </div>
  );
}
