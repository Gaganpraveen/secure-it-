import type { AppLanguage } from "@/lib/constants";
import { SPEECH_LANG_MAP } from "@/lib/constants";

export function isSpeechSynthesisAvailable(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window && !!window.speechSynthesis;
}

export function speak(text: string, lang: AppLanguage): void {
  if (!isSpeechSynthesisAvailable()) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG_MAP[lang] ?? "en-IN";
  utterance.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
