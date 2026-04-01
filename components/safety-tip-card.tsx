"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { explanationForLanguage } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useSpeech } from "@/hooks/use-speech";

export function SafetyTipCard({
  tipEn,
  tipHi,
  tipKn,
  category,
}: {
  tipEn: string;
  tipHi: string;
  tipKn: string;
  category: string;
}) {
  const { language, t } = useLanguage();
  const { speakText, speechAvailable, muted } = useSpeech(language);
  const [open, setOpen] = useState(false);

  const text = explanationForLanguage(tipEn, tipHi, tipKn, language);

  return (
    <Card className="border-border bg-app-card shadow-card">
      <CardHeader
        className="cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-left text-base font-semibold capitalize text-text-primary">
            {category}
          </CardTitle>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-text-secondary transition-transform",
              open && "rotate-180"
            )}
          />
        </div>
      </CardHeader>
      {open ? (
        <CardContent className="space-y-3 text-sm leading-relaxed text-text-secondary">
          <p className="text-text-primary">{text}</p>
          {speechAvailable ? (
            <Button
              type="button"
              variant="secondary"
              className="min-h-touch rounded-[12px] text-base"
              disabled={muted}
              onClick={(e) => {
                e.stopPropagation();
                speakText(text);
              }}
            >
              {t.common.listen}
            </Button>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}
