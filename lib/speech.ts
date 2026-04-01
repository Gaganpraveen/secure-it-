import { Language, LANGUAGE_MAP } from "./constants";

export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, lang: Language = "en"): void {
  if (!isSpeechAvailable()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANGUAGE_MAP[lang].code;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (!isSpeechAvailable()) return;
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (!isSpeechAvailable()) return false;
  return window.speechSynthesis.speaking;
}
