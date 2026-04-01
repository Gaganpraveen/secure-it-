"use client";

import { useState, useEffect } from "react";
import { ScanLine, AlertTriangle, CheckCircle, ChevronRight, RotateCcw, Send } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSpeech } from "@/hooks/use-speech";
import { ShieldStatus } from "@/components/shield-status";
import { RiskMeter } from "@/components/risk-meter";
import { ScamTypeBadge } from "@/components/scam-type-badge";
import { VoiceButton } from "@/components/voice-button";
import { EXAMPLE_MESSAGES } from "@/lib/constants";
import { AnalysisResult } from "@/lib/claude";
import { toast } from "sonner";
import type { Metadata } from "next";

export default function ScanPage() {
  const { t, language } = useLanguage();
  const { speakText } = useSpeech();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);

  const handleScan = async () => {
    if (!message.trim()) {
      toast.error(t.scan.errors.empty);
      return;
    }

    setLoading(true);
    setResult(null);
    setReported(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), language }),
      });

      if (!res.ok) throw new Error("Scan failed");
      const data: AnalysisResult = await res.json();
      setResult(data);

      // Auto-speak on dangerous
      if (data.classification === "DANGEROUS") {
        setTimeout(() => {
          const explanation =
            language === "hi"
              ? data.explanation_hi
              : language === "kn"
              ? data.explanation_kn
              : data.explanation_en;
          speakText(`Warning! ${explanation}`, language);
        }, 800);
      }
    } catch (error) {
      console.error("Scan error:", error);
      toast.error(t.scan.errors.failed);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!result || !message) return;
    setReporting(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_text: message,
          scam_type: result.scam_type,
          pincode: "560001",
          language,
        }),
      });
      if (!res.ok) throw new Error("Report failed");
      setReported(true);
      toast.success("Reported to community! Thank you.");
    } catch (e) {
      toast.error("Could not submit report. Please try again.");
    } finally {
      setReporting(false);
    }
  };

  const getExplanation = () => {
    if (!result) return "";
    if (language === "hi") return result.explanation_hi;
    if (language === "kn") return result.explanation_kn;
    return result.explanation_en;
  };

  const getSafetyAdvice = () => {
    if (!result) return "";
    if (language === "hi") return result.safety_advice_hi;
    if (language === "kn") return result.safety_advice_kn;
    return result.safety_advice_en;
  };

  const classificationConfig = result
    ? {
        SAFE: { color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", label: t.common.safe, icon: "safe" as const },
        SUSPICIOUS: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", label: t.common.suspicious, icon: "warn" as const },
        DANGEROUS: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", label: t.common.dangerous, icon: "danger" as const },
      }[result.classification]
    : null;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
            <ScanLine size={22} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.scan.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.scan.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Input area */}
      {!result && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.scan.placeholder}
              rows={6}
              className="w-full rounded-2xl p-4 text-sm resize-none outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "rgba(30,41,59,0.9)",
                border: "1px solid rgba(148,163,184,0.2)",
                color: "#F1F5F9",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                lineHeight: "1.6",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(148,163,184,0.2)")}
            />
          </div>

          {/* Example chips */}
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>
              {t.scan.exampleLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_MESSAGES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setMessage(ex.text)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    color: "#A78BFA",
                  }}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scan button */}
          <button
            onClick={handleScan}
            disabled={loading || !message.trim()}
            className="w-full py-4 rounded-xl text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 min-h-[56px] flex items-center justify-center gap-3"
            style={{
              background: loading
                ? "rgba(139,92,246,0.5)"
                : "linear-gradient(135deg, #8B5CF6, #3B82F6)",
              boxShadow: !loading ? "0 0 20px rgba(139,92,246,0.3)" : "none",
            }}
          >
            {loading ? (
              <>
                <ShieldStatus level="scanning" size="sm" />
                {t.scan.scanning}
              </>
            ) : (
              <>
                <ScanLine size={22} />
                {t.scan.scanButton}
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && classificationConfig && (
        <div className="space-y-4 animate-fade-in-up">
          {/* Classification banner */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: classificationConfig.bg,
              border: `1px solid ${classificationConfig.border}`,
            }}
          >
            <div className="flex justify-center mb-3">
              <ShieldStatus level={classificationConfig.icon} size="md" />
            </div>
            <div
              className="text-2xl font-bold tracking-wider mb-1"
              style={{ color: classificationConfig.color }}
            >
              {classificationConfig.label}
            </div>
            {result.scam_type && result.scam_type !== "none" && (
              <div className="flex justify-center mt-2">
                <ScamTypeBadge type={result.scam_type} />
              </div>
            )}
          </div>

          {/* Risk meter */}
          <div
            className="rounded-2xl p-5 flex flex-col items-center"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: "#94A3B8" }}>
              {t.scan.results.riskScore}
            </p>
            <RiskMeter score={result.risk_score} size={140} />
          </div>

          {/* Explanation */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold" style={{ color: "#F1F5F9" }}>
                {t.scan.results.explanation}
              </h3>
              <VoiceButton text={getExplanation()} variant="compact" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
              {getExplanation()}
            </p>
          </div>

          {/* Red flags */}
          {result.red_flags.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
            >
              <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#F1F5F9" }}>
                <AlertTriangle size={18} style={{ color: "#EF4444" }} />
                {t.scan.results.redFlags}
              </h3>
              <ul className="space-y-2">
                {result.red_flags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#FCA5A5" }}>
                    <span className="mt-0.5 shrink-0">⚠️</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety advice */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold flex items-center gap-2" style={{ color: "#F1F5F9" }}>
                <CheckCircle size={18} style={{ color: "#10B981" }} />
                {t.scan.results.safetyAdvice}
              </h3>
              <VoiceButton text={getSafetyAdvice()} variant="compact" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6EE7B7" }}>
              {getSafetyAdvice()}
            </p>
          </div>

          {/* Banking context */}
          {result.banking_context && (
            <div
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <span className="text-xl shrink-0">🏦</span>
              <div>
                <div className="text-xs font-bold mb-1" style={{ color: "#93C5FD" }}>
                  {t.scan.results.bankingRule}
                </div>
                <p className="text-sm" style={{ color: "#CBD5E1" }}>
                  {result.banking_context}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setResult(null);
                setMessage("");
                setReported(false);
              }}
              className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:bg-slate-700 min-h-[48px]"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.2)", color: "#94A3B8" }}
            >
              <RotateCcw size={18} />
              {t.scan.results.scanAnother}
            </button>

            {result.classification !== "SAFE" && !reported && (
              <button
                onClick={handleReport}
                disabled={reporting}
                className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-105 min-h-[48px]"
                style={{
                  background: "linear-gradient(135deg, #EF4444, #F97316)",
                  opacity: reporting ? 0.7 : 1,
                }}
              >
                <Send size={18} />
                {reporting ? "Reporting..." : t.scan.results.reportThis}
              </button>
            )}

            {reported && (
              <div
                className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10B981" }}
              >
                <CheckCircle size={18} />
                Reported!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
