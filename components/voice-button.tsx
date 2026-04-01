"use client";

import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "compact" | "icon";
  label?: string;
}

export function VoiceButton({ text, className, variant = "default", label }: VoiceButtonProps) {
  const { speakText, stop, isSpeaking, isAvailable } = useSpeech();
  const { language, t } = useLanguage();

  if (!isAvailable) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speakText(text, language);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
          isSpeaking
            ? "bg-brand text-white"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600",
          className
        )}
        title={isSpeaking ? "Stop" : t.common.listen}
      >
        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          isSpeaking
            ? "bg-brand/20 text-brand border border-brand/40"
            : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700",
          className
        )}
      >
        {isSpeaking ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Volume2 size={14} />
            <span>{label ?? t.common.listen}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 min-h-[48px]",
        isSpeaking
          ? "bg-brand text-white"
          : "bg-slate-700/80 text-slate-200 hover:bg-slate-600 border border-slate-600",
        className
      )}
    >
      {isSpeaking ? (
        <>
          <VolumeX size={18} />
          <span>Stop Speaking</span>
        </>
      ) : (
        <>
          <Volume2 size={18} />
          <span>🔊 {label ?? t.common.listen}</span>
        </>
      )}
    </button>
  );
}

export function MuteToggle() {
  const { isMuted, toggleMute } = useSpeech();

  return (
    <button
      onClick={toggleMute}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 transition-colors"
      title={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX size={18} className="text-slate-400" /> : <Volume2 size={18} className="text-slate-300" />}
    </button>
  );
}
