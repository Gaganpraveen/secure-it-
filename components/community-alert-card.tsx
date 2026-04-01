"use client";

import { AlertOctagon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { explanationForLanguage } from "@/lib/utils";
import type { AppLanguage } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";
import { VoiceButton } from "@/components/voice-button";

const severityStyle: Record<string, string> = {
  low: "bg-accent-safe/20 text-accent-safe border-accent-safe/30",
  medium: "bg-accent-warn/20 text-accent-warn border-accent-warn/30",
  high: "bg-accent-danger/20 text-accent-danger border-accent-danger/30",
  critical: "bg-accent-danger/30 text-accent-danger border-accent-danger/50",
};

export function CommunityAlertCard({
  titleEn,
  titleHi,
  titleKn,
  descEn,
  descHi,
  descKn,
  severity,
}: {
  titleEn: string;
  titleHi: string;
  titleKn: string;
  descEn: string;
  descHi: string;
  descKn: string;
  severity: string;
}) {
  const { language, t } = useLanguage();
  const lang = language as AppLanguage;
  const title = explanationForLanguage(titleEn, titleHi, titleKn, lang);
  const desc = explanationForLanguage(descEn, descHi, descKn, lang);
  const speakLabel = `${t.common.listen} (${lang.toUpperCase()})`;

  return (
    <Card className="border-border bg-app-card shadow-card">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
        <div className="flex items-start gap-2">
          <AlertOctagon className="mt-0.5 size-6 shrink-0 text-accent-warn" />
          <CardTitle className="text-left text-base font-semibold text-text-primary">
            {title}
          </CardTitle>
        </div>
        <Badge
          className={
            severityStyle[severity] ??
            "border border-border bg-muted text-text-secondary"
          }
        >
          {severity}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-text-secondary">
        <p className="leading-relaxed text-text-primary">{desc}</p>
        <VoiceButton text={`${title}. ${desc}`} label={speakLabel} />
      </CardContent>
    </Card>
  );
}
