"use client";

import { useState } from "react";
import { Search, Clock, MapPin, Flag } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { TrustIndicator } from "@/components/trust-indicator";
import { ScamTypeBadge } from "@/components/scam-type-badge";
import { TrustLevel } from "@/lib/constants";
import { timeAgo, anonymizeSender } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

interface TrustData {
  identifier: string;
  trust_level: TrustLevel;
  total_reports: number;
  last_reported_at?: string;
  is_bank_verified?: boolean;
  recent_reports?: Array<{
    id: string;
    created_at: string;
    scam_type?: string;
    risk_score?: number;
    ai_explanation?: string;
    pincode?: string;
  }>;
}

export default function CheckPage() {
  const { t, language } = useLanguage();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrustData | null>(null);

  const handleCheck = async () => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      toast.error(t.check.errors.empty);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/trust-score?identifier=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error("Check failed");
      const data: TrustData = await res.json();
      setResult(data);
    } catch (e) {
      console.error("Check error:", e);
      toast.error(t.check.errors.failed);
    } finally {
      setLoading(false);
    }
  };

  const trustMessages: Record<TrustLevel, { en: string; hi: string; kn: string }> = {
    trusted: {
      en: "This identifier is verified safe. Still, always verify before sending money.",
      hi: "यह पहचानकर्ता सत्यापित रूप से सुरक्षित है। फिर भी, पैसे भेजने से पहले हमेशा जांचें।",
      kn: "ಈ ಗುರುತಿಸುಪಟ್ಟ ಸುರಕ್ಷಿತ ಎಂದು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಆದರೂ ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.",
    },
    unknown: {
      en: "No reports found for this number. Exercise caution — this doesn't mean it's safe.",
      hi: "इस नंबर के लिए कोई रिपोर्ट नहीं मिली। सावधान रहें — इसका मतलब यह सुरक्षित है, ऐसा नहीं।",
      kn: "ಈ ನಂಬರ್‌ಗೆ ಯಾವುದೇ ವರದಿ ಸಿಗಲಿಲ್ಲ. ಎಚ್ಚರಿಕೆ ವಹಿಸಿ — ಇದು ಸುರಕ್ಷಿತ ಎಂದಲ್ಲ.",
    },
    suspicious: {
      en: "This number has been reported suspicious by community members. Proceed with caution.",
      hi: "इस नंबर को समुदाय के सदस्यों ने संदिग्ध बताया है। सावधानी से आगे बढ़ें।",
      kn: "ಈ ನಂಬರ್ ಅನ್ನು ಸಮುದಾಯ ಸದಸ್ಯರು ಅನುಮಾನಾಸ್ಪದ ಎಂದು ವರದಿ ಮಾಡಿದ್ದಾರೆ. ಎಚ್ಚರಿಕೆಯಿಂದ ಮುಂದುವರಿಯಿರಿ.",
    },
    dangerous: {
      en: "WARNING: This number has multiple fraud reports. Do NOT send money or share any information.",
      hi: "चेतावनी: इस नंबर के खिलाफ कई धोखाधड़ी की रिपोर्ट हैं। पैसे न भेजें या कोई जानकारी साझा न करें।",
      kn: "ಎಚ್ಚರಿಕೆ: ಈ ನಂಬರ್ ವಿರುದ್ಧ ಹಲವು ವಂಚನೆ ವರದಿಗಳಿವೆ. ಹಣ ಕಳುಹಿಸಬೇಡಿ ಅಥವಾ ಯಾವುದೇ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
    },
  };

  const getMessage = (level: TrustLevel) => {
    const msg = trustMessages[level];
    if (language === "hi") return msg.hi;
    if (language === "kn") return msg.kn;
    return msg.en;
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.2)" }}>
            <Search size={22} style={{ color: "#3B82F6" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.check.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.check.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder={t.check.placeholder}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "rgba(30,41,59,0.9)",
              border: "1px solid rgba(148,163,184,0.2)",
              color: "#F1F5F9",
              minHeight: "48px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(148,163,184,0.2)")}
          />
          <button
            onClick={handleCheck}
            disabled={loading || !identifier.trim()}
            className="px-5 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 min-h-[48px] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            {loading ? "..." : t.check.checkButton}
          </button>
        </div>

        {/* Quick examples */}
        <div className="flex flex-wrap gap-2">
          {["+919876543210", "cashback@fake", "PAYTM", "refund@fake"].map((ex) => (
            <button
              key={ex}
              onClick={() => setIdentifier(ex)}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105 font-mono"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#93C5FD",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="mt-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full border-2 border-info animate-spin" style={{ borderColor: "transparent", borderTopColor: "#3B82F6" }} />
          </div>
          <p className="text-sm" style={{ color: "#94A3B8" }}>{t.check.checking}</p>
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 space-y-4 animate-fade-in-up">
          {/* Trust level display */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "rgba(30,41,59,0.8)",
              border: "1px solid rgba(148,163,184,0.1)",
            }}
          >
            <div className="flex justify-center mb-4">
              <TrustIndicator level={result.trust_level as TrustLevel} size="lg" />
            </div>

            {result.is_bank_verified && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                ✓ {t.check.results.bankVerified}
              </div>
            )}

            <p className="text-sm leading-relaxed mt-2" style={{ color: "#94A3B8" }}>
              {getMessage(result.trust_level as TrustLevel)}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
            >
              <div className="text-2xl font-bold font-mono" style={{ color: result.total_reports > 0 ? "#EF4444" : "#10B981" }}>
                {result.total_reports}
              </div>
              <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>{t.check.results.totalReports}</div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
            >
              <div className="text-sm font-mono" style={{ color: "#94A3B8" }}>
                {result.last_reported_at ? timeAgo(result.last_reported_at) : "Never"}
              </div>
              <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>{t.check.results.lastReported}</div>
            </div>
          </div>

          {/* Recent reports */}
          {result.recent_reports && result.recent_reports.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#94A3B8" }}>
                {t.check.results.recentReports}
              </h3>
              <div className="space-y-2">
                {result.recent_reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="rounded-xl p-3 flex items-start gap-3"
                    style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
                  >
                    {rep.scam_type && <ScamTypeBadge type={rep.scam_type} />}
                    <div className="flex-1 min-w-0">
                      {rep.ai_explanation && (
                        <p className="text-xs line-clamp-2" style={{ color: "#CBD5E1" }}>{rep.ai_explanation}</p>
                      )}
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "#64748B" }}>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {timeAgo(rep.created_at)}
                        </span>
                        {rep.pincode && (
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            {rep.pincode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report button */}
          <Link
            href={`/dashboard/report?sender=${encodeURIComponent(result.identifier)}`}
            className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] min-h-[48px]"
            style={{ background: "linear-gradient(135deg, #EF4444, #F97316)" }}
          >
            <Flag size={18} />
            {t.check.results.reportThis}
          </Link>
        </div>
      )}
    </div>
  );
}
