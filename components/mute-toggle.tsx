"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useSpeech } from "@/hooks/use-speech";

export function MuteToggle() {
  const { language, t } = useLanguage();
  const { speechAvailable, muted, toggleMute } = useSpeech(language);

  if (!speechAvailable) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="min-h-touch gap-2 text-text-secondary"
      onClick={toggleMute}
      aria-pressed={muted}
    >
      {muted ? (
        <VolumeX className="size-5" />
      ) : (
        <Volume2 className="size-5" />
      )}
      <span className="hidden sm:inline">
        {muted ? t.common.unmute : t.common.mute}
      </span>
    </Button>
  );
}
