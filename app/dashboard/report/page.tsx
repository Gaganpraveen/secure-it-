"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Flag, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

const STEPS = 5;

function ReportContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const initialSender = searchParams.get("sender") ?? "";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    what_happened: "",
    message_text: "",
    sender_info: initialSender,
    pincode: "",
    language: language,
  });

  const handleSubmit = async () => {
    if (!form.message_text.trim()) {
      toast.error(t.report.errors.message);
      return;
    }
    if (!form.pincode.trim()) {
      toast.error(t.report.errors.pincode);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_text: form.message_text,
          sender_info: form.sender_info || undefined,
          pincode: form.pincode,
          language: form.language,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setSuccess(true);
    } catch (e) {
      console.error("Report error:", e);
      toast.error(t.report.errors.failed);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 md:p-6 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-bounce" style={{ background: "rgba(16,185,129,0.2)" }}>
          <CheckCircle size={40} style={{ color: "#10B981" }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#F1F5F9" }}>
          {t.report.success}
        </h2>
        <p className="text-sm mb-8" style={{ color: "#94A3B8" }}>
          Your report has been submitted and is now helping protect your community.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setForm({ what_happened: "", message_text: "", sender_info: "", pincode: "", language });
          }}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  const progressPct = ((step - 1) / (STEPS - 1)) * 100;

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.2)" }}>
            <Flag size={22} style={{ color: "#EF4444" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.report.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.report.subtitle}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: s <= step ? "linear-gradient(135deg, #8B5CF6, #3B82F6)" : "rgba(148,163,184,0.2)",
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: "#94A3B8" }}>
          Step {step} of {STEPS}
        </p>
      </div>

      {/* Step content */}
      <div className="space-y-4">
        {step === 1 && (
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F1F5F9" }}>
              {t.report.step1.label}
            </label>
            <div className="space-y-2">
              {t.report.step1.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setForm((f) => ({ ...f, what_happened: option }));
                    setStep(2);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] min-h-[48px]"
                  style={{
                    background: form.what_happened === option ? "rgba(139,92,246,0.2)" : "rgba(30,41,59,0.8)",
                    border: form.what_happened === option ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(148,163,184,0.1)",
                    color: form.what_happened === option ? "#A78BFA" : "#94A3B8",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F1F5F9" }}>
              {t.report.step2.label}
            </label>
            <textarea
              value={form.message_text}
              onChange={(e) => setForm((f) => ({ ...f, message_text: e.target.value }))}
              placeholder={t.report.step2.placeholder}
              rows={6}
              className="w-full rounded-xl p-4 text-sm resize-none outline-none"
              style={{
                background: "rgba(30,41,59,0.9)",
                border: "1px solid rgba(148,163,184,0.2)",
                color: "#F1F5F9",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(148,163,184,0.2)")}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F1F5F9" }}>
              {t.report.step3.label}
            </label>
            <input
              type="text"
              value={form.sender_info}
              onChange={(e) => setForm((f) => ({ ...f, sender_info: e.target.value }))}
              placeholder={t.report.step3.placeholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none min-h-[48px]"
              style={{
                background: "rgba(30,41,59,0.9)",
                border: "1px solid rgba(148,163,184,0.2)",
                color: "#F1F5F9",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(148,163,184,0.2)")}
            />
            <p className="text-xs mt-2" style={{ color: "#64748B" }}>
              This is optional but helps warn the community.
            </p>
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F1F5F9" }}>
              {t.report.step4.label}
            </label>
            <input
              type="text"
              value={form.pincode}
              onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
              placeholder={t.report.step4.placeholder}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none min-h-[48px] font-mono"
              style={{
                background: "rgba(30,41,59,0.9)",
                border: "1px solid rgba(148,163,184,0.2)",
                color: "#F1F5F9",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(148,163,184,0.2)")}
            />
          </div>
        )}

        {step === 5 && (
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F1F5F9" }}>
              {t.report.step5.label}
            </label>
            <div className="flex gap-3">
              {(["en", "hi", "kn"] as const).map((lang) => {
                const labels = { en: "🇬🇧 English", hi: "🇮🇳 हिंदी", kn: "🇮🇳 ಕನ್ನಡ" };
                return (
                  <button
                    key={lang}
                    onClick={() => setForm((f) => ({ ...f, language: lang }))}
                    className="flex-1 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px]"
                    style={{
                      background: form.language === lang ? "rgba(139,92,246,0.2)" : "rgba(30,41,59,0.8)",
                      border: form.language === lang ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(148,163,184,0.1)",
                      color: form.language === lang ? "#A78BFA" : "#94A3B8",
                    }}
                  >
                    {labels[lang]}
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            <div
              className="mt-4 rounded-xl p-4 text-sm space-y-2"
              style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
            >
              <h3 className="font-semibold" style={{ color: "#94A3B8" }}>Summary</h3>
              <div style={{ color: "#CBD5E1" }}>
                <span style={{ color: "#94A3B8" }}>What: </span>
                {form.what_happened || "Not specified"}
              </div>
              <div style={{ color: "#CBD5E1" }}>
                <span style={{ color: "#94A3B8" }}>Pincode: </span>
                {form.pincode}
              </div>
              {form.sender_info && (
                <div style={{ color: "#CBD5E1" }}>
                  <span style={{ color: "#94A3B8" }}>Scammer: </span>
                  {form.sender_info}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-3 rounded-xl font-medium flex items-center gap-2 min-h-[48px]"
            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.2)", color: "#94A3B8" }}
          >
            <ChevronLeft size={18} />
            {t.common.back}
          </button>
        )}

        {step < STEPS ? (
          <button
            onClick={() => {
              if (step === 2 && !form.message_text.trim()) {
                toast.error(t.report.errors.message);
                return;
              }
              if (step === 4 && !form.pincode.trim()) {
                toast.error(t.report.errors.pincode);
                return;
              }
              setStep((s) => s + 1);
            }}
            className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 min-h-[48px]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
          >
            {t.common.next}
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #EF4444, #F97316)" }}
          >
            {loading ? t.report.submitting : t.report.submitButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center" style={{ color: "#94A3B8" }}>Loading...</div>}>
      <ReportContent />
    </Suspense>
  );
}
