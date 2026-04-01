"use client";

import { useState, useCallback, useEffect } from "react";
import { Language } from "@/lib/constants";
import { speak, stopSpeaking, isSpeechAvailable } from "@/lib/speech";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsAvailable(isSpeechAvailable());
    const muted = localStorage.getItem("kavach_muted") === "true";
    setIsMuted(muted);
  }, []);

  const speakText = useCallback(
    (text: string, lang: Language = "en") => {
      if (!isAvailable || isMuted) return;
      setIsSpeaking(true);
      speak(text, lang);

      const checkInterval = setInterval(() => {
        if (typeof window !== "undefined" && !window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(checkInterval);
        }
      }, 100);

      setTimeout(() => {
        setIsSpeaking(false);
        clearInterval(checkInterval);
      }, 30000);
    },
    [isAvailable, isMuted]
  );

  const stop = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("kavach_muted", String(newMuted));
    if (newMuted) stopSpeaking();
  }, [isMuted]);

  return { speakText, stop, isSpeaking, isAvailable, isMuted, toggleMute };
}
