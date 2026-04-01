"use client";

import { useCallback, useEffect, useState } from "react";

import type { AppLanguage } from "@/lib/constants";
import { isSpeechSynthesisAvailable, speak, stopSpeaking } from "@/lib/speech";

export function useSpeech(language: AppLanguage) {
  const [muted, setMuted] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(isSpeechSynthesisAvailable());
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!available || muted || !text.trim()) return;
      speak(text, language);
    },
    [available, muted, language]
  );

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m) stopSpeaking();
      return !m;
    });
  }, []);

  return { speakText, muted, setMuted, toggleMute, speechAvailable: available };
}
