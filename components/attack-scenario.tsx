"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskMeter } from "@/components/risk-meter";
import { cn } from "@/lib/utils";

type Step = { label: string; detail: string };

export function AttackScenario({
  title,
  description,
  steps,
  sampleMessage,
  demoScore,
}: {
  title: string;
  description: string;
  steps: Step[];
  sampleMessage: string;
  demoScore: number;
}) {
  const [phase, setPhase] = useState<"idle" | "msg" | "scan" | "result">(
    "idle"
  );

  return (
    <Card className="border-border bg-app-card shadow-card">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary">{title}</CardTitle>
        <CardDescription className="text-text-secondary">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          className="min-h-touch w-full rounded-[12px] text-lg"
          onClick={() => {
            setPhase("msg");
            window.setTimeout(() => setPhase("scan"), 900);
            window.setTimeout(() => setPhase("result"), 2200);
          }}
          disabled={phase !== "idle" && phase !== "result"}
        >
          {phase === "idle" || phase === "result" ? "Start simulation" : "…"}
        </Button>

        <div
          className={cn(
            "rounded-2xl border border-dashed border-border bg-muted/30 p-4 transition-all",
            phase === "idle" && "opacity-50"
          )}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
            Incoming message
          </p>
          <p className="font-mono text-sm leading-relaxed text-text-primary">
            {phase === "idle"
              ? "Tap start to reveal a realistic scam SMS…"
              : sampleMessage}
          </p>
        </div>

        {phase === "scan" || phase === "result" ? (
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-center">
            <div
              className={cn(
                "transition-opacity",
                phase === "scan" && "animate-pulse"
              )}
            >
              <RiskMeter score={phase === "result" ? demoScore : 10} />
            </div>
            {phase === "result" ? (
              <div className="max-w-md space-y-2 text-sm text-text-secondary">
                <p className="font-semibold text-accent-danger">
                  Threat pattern matched
                </p>
                <ul className="list-inside list-disc space-y-1">
                  {steps.map((s) => (
                    <li key={s.label}>
                      <span className="font-medium text-text-primary">
                        {s.label}:{" "}
                      </span>
                      {s.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">Scanning…</p>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
