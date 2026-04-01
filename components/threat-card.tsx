"use client";

import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeAgo } from "@/lib/utils";
import { ScamTypeBadge } from "@/components/scam-type-badge";

export function ThreatCard({
  messagePreview,
  scamType,
  riskScore,
  createdAt,
  senderHint,
}: {
  messagePreview: string;
  scamType: string | null;
  riskScore: number | null;
  createdAt: string;
  senderHint: string | null;
}) {
  const risk =
    riskScore === null
      ? "—"
      : riskScore >= 75
        ? "High"
        : riskScore >= 40
          ? "Med"
          : "Low";

  return (
    <Card className="border-border bg-app-card shadow-card">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 shrink-0 text-accent-warn" />
          <CardTitle className="text-base font-semibold text-text-primary">
            {scamType ? <ScamTypeBadge type={scamType} /> : "Report"}
          </CardTitle>
        </div>
        <span className="font-mono text-xs text-text-secondary">
          {formatTimeAgo(createdAt)}
        </span>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-text-secondary">
        <p className="line-clamp-3 text-text-primary">{messagePreview}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-pill bg-muted px-2 py-0.5 font-mono">
            Risk: {risk}
            {riskScore !== null ? ` (${riskScore})` : ""}
          </span>
          {senderHint ? (
            <span className="text-text-secondary">
              From: {senderHint.replace(/(.{4}).+(.{4})/, "$1…$2")}
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
