"use client";

import { useState, useEffect } from "react";
import { Zap, ChevronRight, RotateCcw, AlertTriangle, ShieldOff, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSpeech } from "@/hooks/use-speech";
import { ShieldStatus } from "@/components/shield-status";
import { RiskMeter } from "@/components/risk-meter";
import { ScamTypeBadge } from "@/components/scam-type-badge";

type ScenarioId = "kyc" | "upi" | "voice";

interface ScenarioStep {
  type: "message" | "scan" | "result" | "advice";
  title: string;
  content: string;
  sender?: string;
  risk_score?: number;
  scam_type?: string;
  red_flags?: string[];
}

const SCENARIOS: Record<ScenarioId, { title: string; desc: string; color: string; emoji: string; steps: ScenarioStep[] }> = {
  kyc: {
    title: "The KYC Scam",
    desc: "A fake bank SMS asking you to update KYC",
    color: "#EF4444",
    emoji: "🏦",
    steps: [
      {
        type: "message",
        title: "📱 You receive this SMS",
        sender: "SBI-BANK (fake)",
        content: "Dear Customer, Your SBI account will be blocked in 24 hours due to incomplete KYC. Update immediately: http://sbi-kyc-update.in/verify to avoid suspension. — SBI Customer Care",
      },
      {
        type: "scan",
        title: "🛡️ Kavach is scanning...",
        content: "Analyzing for fraud patterns, suspicious links, and social engineering tactics...",
      },
      {
        type: "result",
        title: "⚠️ THREAT DETECTED",
        content: "This is a fake KYC scam. The message is designed to make you panic and click a fake website link that will steal your banking credentials.",
        risk_score: 95,
        scam_type: "kyc_fraud",
        red_flags: [
          "Suspicious URL: sbi-kyc-update.in (not sbi.co.in)",
          "Urgency tactic: '24 hours' deadline",
          "Real SBI never sends KYC links via SMS",
          "Domain does not belong to State Bank of India",
        ],
      },
      {
        type: "advice",
        title: "✅ What you should do",
        content: "Delete this message immediately. If worried about your account, call SBI directly on 1800-11-2211 (toll free). Never click links in SMS. Banks update KYC at branches or on official apps only.",
      },
    ],
  },
  upi: {
    title: "The UPI Refund Trick",
    desc: "A scammer sends a fake UPI collect request",
    color: "#F59E0B",
    emoji: "💸",
    steps: [
      {
        type: "message",
        title: "📱 You get a WhatsApp message",
        sender: "+91 97865 43210 (Unknown)",
        content: "Hello, I accidentally sent ₹5,000 to your UPI ID. Please return it via the collect request I've sent. The bank told me to contact you directly. I'm a farmer and really need this money back urgently 🙏",
      },
      {
        type: "scan",
        title: "🛡️ Kavach is scanning...",
        content: "Analyzing UPI request patterns, emotional manipulation, and fraud indicators...",
      },
      {
        type: "result",
        title: "⚠️ SCAM PATTERN DETECTED",
        content: "This is the classic UPI Refund Trick. Scammers send a COLLECT request — which TAKES money from you, not gives money to you. Entering your PIN here will send YOUR money to them.",
        risk_score: 88,
        scam_type: "upi_fraud",
        red_flags: [
          "UPI COLLECT requests take money FROM you",
          "You enter PIN = you are paying, not receiving",
          "Emotional pressure (farmer, urgent) is a manipulation tactic",
          "Legitimate refunds happen automatically via bank, not manual requests",
        ],
      },
      {
        type: "advice",
        title: "✅ What you should do",
        content: "Reject the UPI collect request. Do NOT enter your PIN. Remember: To receive money, you NEVER need to enter your UPI PIN. If someone sent money to wrong account, their bank will reverse it automatically.",
      },
    ],
  },
  voice: {
    title: "The Voice Call Trap",
    desc: "Someone impersonating a bank officer calls you",
    color: "#8B5CF6",
    emoji: "📞",
    steps: [
      {
        type: "message",
        title: "📞 You receive a call",
        sender: "Caller: 'RBI Officer Sharma'",
        content: "\"Hello, am I speaking with [your name]? I'm calling from the Reserve Bank of India, Cyber Crime Division. We have detected suspicious activity on your SBI account ending in XXXX. Your account will be blocked in 1 hour unless you verify your identity. Please share the OTP that will be sent to your registered mobile number...\"",
      },
      {
        type: "scan",
        title: "🛡️ Kavach analyzing call pattern...",
        content: "Checking against vishing attack signatures, impersonation patterns, and social engineering indicators...",
      },
      {
        type: "result",
        title: "🚨 VISHING ATTACK DETECTED",
        content: "This is a vishing (voice phishing) attack. The caller is NOT from RBI. RBI never calls customers directly. This is designed to steal your OTP and drain your account.",
        risk_score: 99,
        scam_type: "vishing",
        red_flags: [
          "RBI does NOT have a 'Cyber Crime Division' that calls customers",
          "RBI NEVER calls individual customers",
          "Asking for OTP over phone = 100% fraud",
          "'Account will be blocked' is a fear tactic",
          "Urgency ('1 hour') is to prevent you from thinking clearly",
        ],
      },
      {
        type: "advice",
        title: "✅ What you should do",
        content: "HANG UP IMMEDIATELY. Never share OTP with anyone. Call your bank directly using the number on the back of your debit card. Report this number to the Cyber Crime Helpline: 1930. RBI's official number is 14440 — they use it for general queries, never to ask for OTP.",
      },
    ],
  },
};

export default function SimulatePage() {
  const { t, language } = useLanguage();
  const { speakText } = useSpeech();
  const [selected, setSelected] = useState<ScenarioId | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scenario = selected ? SCENARIOS[selected] : null;
  const step = scenario ? scenario.steps[currentStep] : null;

  const handleStart = (id: ScenarioId) => {
    setSelected(id);
    setCurrentStep(0);
    setScanning(false);
    setShowResult(false);
  };

  const handleNext = () => {
    if (!scenario) return;
    const nextStep = currentStep + 1;
    if (nextStep >= scenario.steps.length) return;

    if (scenario.steps[nextStep].type === "scan") {
      setCurrentStep(nextStep);
      setScanning(true);
      setTimeout(() => {
        setScanning(false);
        setCurrentStep(nextStep + 1);
      }, 2000);
    } else {
      setCurrentStep(nextStep);

      if (scenario.steps[nextStep].type === "result") {
        const content = scenario.steps[nextStep].content;
        setTimeout(() => speakText(`Warning! ${content}`, language), 500);
      }
    }
  };

  const handleReset = () => {
    setSelected(null);
    setCurrentStep(0);
    setScanning(false);
    setShowResult(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
            <Zap size={22} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.simulate.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.simulate.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Scenario selector */}
      {!selected && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Choose a scam scenario to see how Kavach would detect and explain it in real-time:
          </p>
          {(Object.keys(SCENARIOS) as ScenarioId[]).map((id) => {
            const s = SCENARIOS[id];
            return (
              <button
                key={id}
                onClick={() => handleStart(id)}
                className="w-full text-left p-5 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                style={{
                  background: "rgba(30,41,59,0.8)",
                  border: `1px solid ${s.color}20`,
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                    >
                      {s.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-base" style={{ color: "#F1F5F9" }}>{s.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: "#94A3B8" }}>{s.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} style={{ color: s.color }} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}

          <div
            className="rounded-xl p-4 text-center text-xs"
            style={{ background: "rgba(30,41,59,0.4)", color: "#64748B" }}
          >
            🎭 These are simulated scenarios for educational purposes. All messages shown are examples of real scam patterns.
          </div>
        </div>
      )}

      {/* Active scenario */}
      {selected && scenario && step && (
        <div className="animate-fade-in-up">
          {/* Scenario title */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: `${scenario.color}10`, border: `1px solid ${scenario.color}20` }}>
            <span className="text-xl">{scenario.emoji}</span>
            <div>
              <div className="font-bold text-sm" style={{ color: scenario.color }}>{scenario.title}</div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>
                Step {currentStep + 1} of {scenario.steps.length}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {scenario.steps.map((s, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i <= currentStep ? scenario.color : "rgba(148,163,184,0.2)",
                }}
              />
            ))}
          </div>

          {/* Scanning state */}
          {scanning && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <ShieldStatus level="scanning" size="lg" />
              </div>
              <p className="text-lg font-bold" style={{ color: "#3B82F6" }}>Kavach is scanning...</p>
              <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>
                Analyzing message patterns, URLs, and social engineering tactics
              </p>
            </div>
          )}

          {/* Step content */}
          {!scanning && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold" style={{ color: "#F1F5F9" }}>{step.title}</h2>

              {/* Message display */}
              {step.type === "message" && (
                <div>
                  {step.sender && (
                    <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: "#94A3B8" }}>
                      <span>From:</span>
                      <span className="font-mono px-2 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#FCA5A5" }}>
                        {step.sender}
                      </span>
                    </div>
                  )}
                  <div
                    className="rounded-xl p-5 text-sm leading-relaxed"
                    style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(148,163,184,0.15)", color: "#CBD5E1", fontFamily: "monospace" }}
                  >
                    {step.content}
                  </div>
                  <p className="text-xs mt-2 text-center" style={{ color: "#64748B" }}>
                    ⬆️ This is a scam message. Tap next to see how Kavach detects it.
                  </p>
                </div>
              )}

              {/* Result */}
              {step.type === "result" && (
                <div className="space-y-4">
                  {/* Kavach detected banner */}
                  <div
                    className="rounded-2xl p-4 text-center animate-glow-danger"
                    style={{ background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.4)" }}
                  >
                    <div className="flex justify-center mb-2">
                      <ShieldStatus level="danger" size="md" />
                    </div>
                    <div className="text-lg font-bold" style={{ color: "#EF4444" }}>
                      🚨 {t.simulate.kavachDetected}
                    </div>
                    {step.scam_type && (
                      <div className="flex justify-center mt-2">
                        <ScamTypeBadge type={step.scam_type} />
                      </div>
                    )}
                  </div>

                  {/* Risk meter */}
                  {step.risk_score !== undefined && (
                    <div
                      className="rounded-xl p-4 flex justify-center"
                      style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
                    >
                      <RiskMeter score={step.risk_score} size={120} />
                    </div>
                  )}

                  {/* Explanation */}
                  <div
                    className="rounded-xl p-4"
                    style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{step.content}</p>
                  </div>

                  {/* Red flags */}
                  {step.red_flags && step.red_flags.length > 0 && (
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={16} style={{ color: "#EF4444" }} />
                        <span className="font-bold text-sm" style={{ color: "#F1F5F9" }}>Red Flags Detected</span>
                      </div>
                      <ul className="space-y-2">
                        {step.red_flags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#FCA5A5" }}>
                            <span className="shrink-0 mt-0.5">⚠️</span>
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Advice */}
              {step.type === "advice" && (
                <div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#6EE7B7" }}>{step.content}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {!scanning && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl font-medium flex items-center gap-2 min-h-[48px]"
                style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.2)", color: "#94A3B8" }}
              >
                <RotateCcw size={18} />
                {t.simulate.restartButton}
              </button>

              {currentStep < scenario.steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 min-h-[48px]"
                  style={{ background: `linear-gradient(135deg, ${scenario.color}, ${scenario.color}99)` }}
                >
                  {t.simulate.nextButton}
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 min-h-[48px]"
                  style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
                >
                  <Shield size={18} />
                  Try Another Scenario
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
