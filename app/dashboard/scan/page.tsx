"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Flag } from "lucide-react";

import { RiskMeter } from "@/components/risk-meter";
import { ScamTypeBadge } from "@/components/scam-type-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { VoiceButton } from "@/components/voice-button";
import { explanationForLanguage } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

type Analysis = {
  risk_score: number;
  classification: string;
  scam_type: string;
  explanation_en: string;
  explanation_hi: string;
  explanation_kn: string;
  red_flags: string[];
  safety_advice_en: string;
  safety_advice_hi: string;
  safety_advice_kn: string;
  banking_context: string;
};

const EXAMPLES = [
  "Dear Customer, Your SBI account will be blocked in 24 hours. Update KYC immediately: http://sbi-kyc-update.in/verify",
  "Your UPI ID has been selected for ₹50,000 cashback! Share OTP sent to your number to claim reward.",
  "Your SBI account XXX1234 has been credited with ₹25,000.00 on 01-04-2026. Available balance: ₹1,25,432.50",
];

export default function ScanPage() {
  const { language, t } = useLanguage();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);

  useEffect(() => {
    const handler = () => {
      if (!navigator.onLine) toast.message(t.common.offline);
    };
    window.addEventListener("offline", handler);
    return () => window.removeEventListener("offline", handler);
  }, [t.common.offline]);

  async function runScan() {
    if (!text.trim()) {
      toast.error(t.scan.placeholder);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });
      if (!res.ok) {
        toast.error(t.errors.analyzeFailed);
        setResult(null);
        return;
      }
      const data = (await res.json()) as Analysis;
      setResult(data);
    } catch {
      toast.error(t.errors.network);
    } finally {
      setLoading(false);
    }
  }

  const explanation = result
    ? explanationForLanguage(
        result.explanation_en,
        result.explanation_hi,
        result.explanation_kn,
        language
      )
    : "";

  const advice = result
    ? explanationForLanguage(
        result.safety_advice_en,
        result.safety_advice_hi,
        result.safety_advice_kn,
        language
      )
    : "";

  const listenLabel = `🔊 ${t.scan.listenIn} ${language.toUpperCase()}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.scan.title}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">{t.meta.description}</p>
      </div>

      <Card className="border-border bg-app-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg text-text-primary">
            {t.scan.cta}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.scan.placeholder}
            className="min-h-[160px] rounded-2xl border-border bg-muted/30 text-base text-text-primary placeholder:text-text-secondary"
          />
          <p className="text-sm text-text-secondary">{t.scan.examples}</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.slice(0, 24)}
                type="button"
                onClick={() => setText(ex)}
                className="rounded-pill border border-border bg-muted/40 px-3 py-2 text-left text-xs text-text-primary transition hover:bg-muted/60"
              >
                {ex.slice(0, 48)}…
              </button>
            ))}
          </div>
          <Button
            type="button"
            className="min-h-touch w-full rounded-[12px] text-lg"
            onClick={() => void runScan()}
            disabled={loading}
          >
            {loading ? t.scan.analyzing : t.scan.cta}
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="mx-auto size-40 rounded-full" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      ) : null}

      {result && !loading ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
            <RiskMeter score={result.risk_score} />
            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-pill border border-border bg-muted px-4 py-2 font-mono text-sm text-text-primary">
                {t.scan.classification}: {result.classification}
              </span>
              {result.scam_type && result.scam_type !== "none" ? (
                <ScamTypeBadge type={result.scam_type} />
              ) : null}
            </div>
          </div>

          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary">
                {t.scan.explanation}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="leading-relaxed text-text-primary">{explanation}</p>
              <VoiceButton
                text={explanation}
                label={listenLabel}
                autoPlay={result.classification === "DANGEROUS"}
                delayMs={600}
              />
            </CardContent>
          </Card>

          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-text-primary">
                <AlertTriangle className="size-5 text-accent-warn" />
                {t.scan.redFlags}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-text-secondary">
                {result.red_flags.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden>⚠️</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-app-card shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary">
                {t.scan.safetyAdvice}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-text-primary">{advice}</p>
              <VoiceButton text={advice} label={listenLabel} />
            </CardContent>
          </Card>

          <Card className="border-accent-info/30 bg-accent-info/10 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-accent-info">
                {t.scan.bankingContext}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-text-primary">
                {result.banking_context}
              </p>
            </CardContent>
          </Card>

          <Button
            type="button"
            variant="destructive"
            className="min-h-touch w-full gap-2 rounded-[12px] text-lg"
            onClick={() => {
              const params = new URLSearchParams({
                message: text,
                scam: result.scam_type ?? "other",
              });
              window.location.href = `/dashboard/report?${params.toString()}`;
            }}
          >
            <Flag className="size-5" />
            {t.scan.reportThis}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
