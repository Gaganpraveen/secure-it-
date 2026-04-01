"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SafetyTip } from "@/lib/supabase";
import { Language } from "@/lib/constants";
import { VoiceButton } from "./voice-button";
import { cn } from "@/lib/utils";

interface SafetyTipCardProps {
  tip: SafetyTip;
  language?: Language;
}

export function SafetyTipCard({ tip, language = "en" }: SafetyTipCardProps) {
  const getText = () => {
    if (language === "hi") return tip.tip_hi;
    if (language === "kn") return tip.tip_kn;
    return tip.tip_en;
  };

  const text = getText();

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{
        background: "rgba(30,41,59,0.6)",
        border: "1px solid rgba(148,163,184,0.1)",
      }}
    >
      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: "#10B981" }} />
      <div className="flex-1">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
      <VoiceButton text={text} variant="icon" className="shrink-0 mt-0.5" />
    </div>
  );
}

interface TipCategoryProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  tips: SafetyTip[];
  language?: Language;
  defaultOpen?: boolean;
}

export function TipCategory({ title, icon, color, tips, language = "en", defaultOpen = false }: TipCategoryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(148,163,184,0.1)" }}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
        style={{ background: "rgba(30,41,59,0.9)" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}30` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">{title}</span>
            <div className="text-xs text-muted-foreground">{tips.length} tips</div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={cn("text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="p-3 space-y-2" style={{ background: "rgba(15,23,42,0.5)" }}>
          {tips.map((tip) => (
            <SafetyTipCard key={tip.id} tip={tip} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}
