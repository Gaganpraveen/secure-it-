"use client";

import { useEffect, useState } from "react";
import { BookOpen, Smartphone, Lock, FileText, CreditCard, KeyRound, Shield, Scale } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { TipCategory } from "@/components/safety-tip-card";
import { SafetyTip } from "@/lib/supabase";
import { VoiceButton } from "@/components/voice-button";

const CATEGORY_CONFIG = {
  upi: { icon: <Smartphone size={20} />, color: "#3B82F6" },
  otp: { icon: <Lock size={20} />, color: "#10B981" },
  kyc: { icon: <FileText size={20} />, color: "#F59E0B" },
  atm: { icon: <CreditCard size={20} />, color: "#8B5CF6" },
  password: { icon: <KeyRound size={20} />, color: "#F97316" },
  general: { icon: <Shield size={20} />, color: "#94A3B8" },
} as const;

const BANKING_RIGHTS = [
  {
    en: "If money is debited from your account without authorization, your bank must refund within 10 working days (RBI circular 2017).",
    hi: "अगर बिना अनुमति खाते से पैसे कटें, तो बैंक 10 कार्य दिवसों में वापस करने के लिए बाध्य है (RBI परिपत्र 2017)।",
    kn: "ಅನಧಿಕೃತವಾಗಿ ಹಣ ಕಡಿದರೆ, ಬ್ಯಾಂಕ್ 10 ಕಾರ್ಯ ದಿನಗಳಲ್ಲಿ ಹಿಂತಿರುಗಿಸಬೇಕು (RBI ಸುತ್ತೋಲೆ 2017).",
  },
  {
    en: "You can file a banking complaint on the RBI Ombudsman portal: cms.rbi.org.in",
    hi: "आप RBI ओम्बड्समैन पोर्टल पर बैंकिंग शिकायत दर्ज कर सकते हैं: cms.rbi.org.in",
    kn: "ನೀವು RBI ಒಂಬುಡ್ಸ್‌ಮ್ಯಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೂರು ಸಲ್ಲಿಸಬಹುದು: cms.rbi.org.in",
  },
  {
    en: "Report cyber fraud immediately at the National Cyber Crime Helpline: 1930 or cybercrime.gov.in",
    hi: "साइबर धोखाधड़ी तुरंत रिपोर्ट करें: राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 या cybercrime.gov.in",
    kn: "ಸೈಬರ್ ವಂಚನೆಯನ್ನು ತಕ್ಷಣ ವರದಿ ಮಾಡಿ: ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ಸಹಾಯವಾಣಿ 1930 ಅಥವಾ cybercrime.gov.in",
  },
];

export default function LearnPage() {
  const { t, language } = useLanguage();
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch("/api/safety-tips");
        if (res.ok) {
          const { tips: data } = await res.json();
          setTips(data ?? []);
        }
      } catch (e) {
        console.error("Tips error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const tipsByCategory = Object.keys(CATEGORY_CONFIG).reduce((acc, cat) => {
    acc[cat] = tips.filter((tip) => tip.category === cat);
    return acc;
  }, {} as Record<string, SafetyTip[]>);

  const getRightText = (right: typeof BANKING_RIGHTS[0]) => {
    if (language === "hi") return right.hi;
    if (language === "kn") return right.kn;
    return right.en;
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
            <BookOpen size={22} style={{ color: "#10B981" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.learn.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.learn.subtitle}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl animate-pulse"
              style={{ background: "rgba(30,41,59,0.6)", height: "64px" }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(CATEGORY_CONFIG).map(([cat, config]) => {
            const catTips = tipsByCategory[cat] ?? [];
            if (catTips.length === 0) return null;

            const catLabel = t.learn.categories[cat as keyof typeof t.learn.categories];
            return (
              <TipCategory
                key={cat}
                title={catLabel}
                icon={config.icon}
                color={config.color}
                tips={catTips}
                language={language}
                defaultOpen={cat === "upi"}
              />
            );
          })}
        </div>
      )}

      {/* Banking Rights section */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale size={18} style={{ color: "#3B82F6" }} />
          <h2 className="font-bold" style={{ color: "#F1F5F9" }}>{t.learn.bankingRights}</h2>
        </div>
        <div className="space-y-3">
          {BANKING_RIGHTS.map((right, i) => (
            <div
              key={i}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(59,130,246,0.2)", color: "#3B82F6" }}
              >
                {i + 1}
              </div>
              <p className="text-sm flex-1 leading-relaxed" style={{ color: "#CBD5E1" }}>
                {getRightText(right)}
              </p>
              <VoiceButton text={getRightText(right)} variant="icon" className="shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
