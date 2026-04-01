"use client";

import Link from "next/link";
import { Shield, ScanLine, Search, Users, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { ShieldStatus } from "@/components/shield-status";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)" }}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}>
            <Shield size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg" style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            kavach.net
          </span>
        </div>
        <LanguageToggle />
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Shield animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
              <ShieldStatus level="safe" size="lg" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#A78BFA" }}>
            <Zap size={14} />
            AI-Powered Cybersecurity for Rural India
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: "#F1F5F9" }}>
            {t.home.tagline}
          </h1>

          <p className="text-lg md:text-xl mb-8" style={{ color: "#94A3B8" }}>
            {t.home.subtitle}
          </p>

          {/* CTA Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl min-h-[56px]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
          >
            <ShieldCheck size={22} />
            {t.home.cta}
            <ArrowRight size={20} />
          </Link>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm" style={{ color: "#94A3B8" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe size={14} />
              <span>EN / हिंदी / ಕನ್ನಡ</span>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="max-w-4xl mx-auto w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {[
            { icon: ScanLine, color: "#8B5CF6", key: "scan" as const, href: "/dashboard/scan" },
            { icon: Search, color: "#3B82F6", key: "check" as const, href: "/dashboard/check" },
            { icon: Users, color: "#10B981", key: "community" as const, href: "/dashboard/community" },
          ].map(({ icon: Icon, color, key, href }) => (
            <Link
              key={key}
              href={href}
              className="group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl text-left"
              style={{
                background: "rgba(30,41,59,0.8)",
                border: `1px solid ${color}20`,
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#F1F5F9" }}>
                {t.home.features[key].title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                {t.home.features[key].desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: "#64748B" }}>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(100,116,139,0.2)" }}>
            🏦 RBI Guidelines Compliant
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(100,116,139,0.2)" }}>
            🤖 Powered by Claude AI
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(100,116,139,0.2)" }}>
            🔒 No data stored without consent
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-xs" style={{ color: "#64748B" }}>
        <p>kavach.net — Protecting rural India from digital banking fraud</p>
        <p className="mt-1">Cybersecurity Hackathon 2026</p>
      </footer>
    </div>
  );
}
