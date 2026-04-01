"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpeech } from "@/hooks/use-speech";
import { useLanguage } from "@/hooks/use-language";

export function VoiceButton({
  text,
  label,
  className,
  autoPlay = false,
  delayMs = 0,
}: {
  text: string;
  label: string;
  className?: string;
  autoPlay?: boolean;
  delayMs?: number;
}) {
  const { language } = useLanguage();
  const { speakText, speechAvailable, muted } = useSpeech(language);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!autoPlay || !speechAvailable || muted || !text.trim()) return;
    if (playedRef.current) return;
    playedRef.current = true;
    const t = window.setTimeout(() => speakText(text), delayMs);
    return () => window.clearTimeout(t);
  }, [autoPlay, speechAvailable, muted, text, delayMs, speakText]);

  if (!speechAvailable) return null;

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "min-h-touch rounded-[12px] text-base",
        className
      )}
      onClick={() => {
        if (muted) return;
        speakText(text);
      }}
      disabled={muted}
    >
      <Volume2 className="mr-2 size-5" />
      {label}
    </Button>
  );
}
