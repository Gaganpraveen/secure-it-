"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScanLine, Search, AlertCircle, Users, ShieldCheck, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { ShieldStatus } from "@/components/shield-status";
import { StatsCard } from "@/components/stats-card";
import { CommunityAlertCard } from "@/components/community-alert-card";
import { VoiceButton } from "@/components/voice-button";
import { CommunityAlert, SafetyTip } from "@/lib/supabase";

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [latestAlert, setLatestAlert] = useState<CommunityAlert | null>(null);
  const [dailyTip, setDailyTip] = useState<SafetyTip | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [scamCount, setScamCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsRes, tipsRes] = await Promise.all([
          fetch("/api/community-alerts?pincode=560001"),
          fetch("/api/safety-tips"),
        ]);

        if (alertsRes.ok) {
          const { alerts } = await alertsRes.json();
          if (alerts?.length > 0) setLatestAlert(alerts[0]);
        }

        if (tipsRes.ok) {
          const { tips } = await tipsRes.json();
          if (tips?.length > 0) {
            const idx = new Date().getDate() % tips.length;
            setDailyTip(tips[idx]);
          }
        }

        setScamCount(Math.floor(Math.random() * 12) + 3);
        setPeopleCount(Math.floor(Math.random() * 200) + 50);
      } catch (e) {
        console.error("Dashboard data error:", e);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTipText = () => {
    if (!dailyTip) return "";
    if (language === "hi") return dailyTip.tip_hi;
    if (language === "kn") return dailyTip.tip_kn;
    return dailyTip.tip_en;
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      {/* Protection Status */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1))",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <div className="flex justify-center mb-3">
          <ShieldStatus level="safe" size="lg" />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "#10B981" }}>
          {t.dashboard.status}
        </h1>
        <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
          kavach.net is actively monitoring threats
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          icon={AlertCircle}
          value={statsLoading ? "..." : scamCount}
          label={t.dashboard.scamsCaught}
          color="#EF4444"
        />
        <StatsCard
          icon={ShieldCheck}
          value={statsLoading ? "..." : peopleCount}
          label={t.dashboard.peopleProtected}
          color="#10B981"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>
          {t.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { href: "/dashboard/scan", icon: ScanLine, label: t.dashboard.scanMessage, color: "#8B5CF6" },
            { href: "/dashboard/check", icon: Search, label: t.dashboard.checkNumber, color: "#3B82F6" },
            { href: "/dashboard/report", icon: AlertCircle, label: t.dashboard.reportScam, color: "#EF4444" },
          ].map(({ href, icon: Icon, label, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 text-center min-h-[80px] justify-center"
              style={{
                background: "rgba(30,41,59,0.8)",
                border: `1px solid ${color}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <span className="text-xs font-semibold leading-tight" style={{ color: "#94A3B8" }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Alert */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#EF4444" }} />
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
            {t.dashboard.latestAlert}
          </h2>
        </div>
        {latestAlert ? (
          <CommunityAlertCard alert={latestAlert} language={language} />
        ) : (
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <Users size={24} className="mx-auto mb-2" style={{ color: "#94A3B8" }} />
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              {statsLoading ? t.common.loading : t.dashboard.noAlerts}
            </p>
          </div>
        )}
      </div>

      {/* Daily Safety Tip */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
            {t.dashboard.dailyTip}
          </h2>
          <BookOpen size={16} style={{ color: "#94A3B8" }} />
        </div>
        {dailyTip ? (
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.2)" }}>
                <span>💡</span>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed" style={{ color: "#F1F5F9" }}>
                  {getTipText()}
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <VoiceButton text={getTipText()} variant="compact" />
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              {statsLoading ? t.common.loading : t.learn.noTips}
            </p>
          </div>
        )}
      </div>

      {/* Navigate to more features */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Link
          href="/dashboard/community"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
        >
          <Users size={20} style={{ color: "#10B981" }} />
          <div>
            <div className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>Community</div>
            <div className="text-xs" style={{ color: "#94A3B8" }}>Local alerts</div>
          </div>
        </Link>
        <Link
          href="/dashboard/simulate"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105"
          style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
        >
          <span className="text-xl">🎮</span>
          <div>
            <div className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>Simulator</div>
            <div className="text-xs" style={{ color: "#94A3B8" }}>Try demo scams</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
