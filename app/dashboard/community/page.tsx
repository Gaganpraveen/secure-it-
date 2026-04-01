"use client";

import { useState, useEffect } from "react";
import { Users, MapPin, TrendingUp, RefreshCw } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { CommunityAlertCard } from "@/components/community-alert-card";
import { ThreatCard } from "@/components/threat-card";
import { useRealtimeThreatReports } from "@/hooks/use-realtime";
import { CommunityAlert } from "@/lib/supabase";
import { getScamTypeLabel } from "@/lib/utils";

export default function CommunityPage() {
  const { t, language } = useLanguage();
  const [pincode, setPincode] = useState("560001");
  const [inputPincode, setInputPincode] = useState("560001");
  const [alerts, setAlerts] = useState<CommunityAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);

  const { reports, loading: reportsLoading } = useRealtimeThreatReports(pincode);

  useEffect(() => {
    const fetchAlerts = async () => {
      setAlertsLoading(true);
      try {
        const res = await fetch(`/api/community-alerts?pincode=${pincode}`);
        if (res.ok) {
          const { alerts: data } = await res.json();
          setAlerts(data ?? []);
        }
      } catch (e) {
        console.error("Alerts error:", e);
      } finally {
        setAlertsLoading(false);
      }
    };
    fetchAlerts();
  }, [pincode]);

  const handleUpdatePincode = () => {
    if (inputPincode.trim().length >= 4) {
      setPincode(inputPincode.trim());
    }
  };

  // Compute trending scam types
  const scamCounts = reports.reduce((acc, r) => {
    if (r.scam_type && r.scam_type !== "none") {
      acc[r.scam_type] = (acc[r.scam_type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const trending = Object.entries(scamCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const todayReports = reports.filter((r) => {
    const d = new Date(r.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
            <Users size={22} style={{ color: "#10B981" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>{t.community.title}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.community.subtitle}</p>
          </div>
        </div>

        {/* Pincode input */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(148,163,184,0.2)" }}>
            <MapPin size={16} style={{ color: "#94A3B8" }} />
            <input
              type="text"
              value={inputPincode}
              onChange={(e) => setInputPincode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdatePincode()}
              placeholder={t.community.pincodeLabel}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "#F1F5F9" }}
              maxLength={6}
            />
          </div>
          <button
            onClick={handleUpdatePincode}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
          >
            {t.community.pincodeButton}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}>
          <div className="text-xl font-bold font-mono" style={{ color: "#EF4444" }}>
            {todayReports.length}
          </div>
          <div className="text-xs" style={{ color: "#94A3B8" }}>{t.community.totalReports}</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}>
          <div className="text-sm font-bold truncate" style={{ color: "#F59E0B" }}>
            {trending[0] ? getScamTypeLabel(trending[0][0]) : "None"}
          </div>
          <div className="text-xs" style={{ color: "#94A3B8" }}>{t.community.commonScam}</div>
        </div>
      </div>

      {/* Alerts section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: "#94A3B8" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#EF4444" }} />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <CommunityAlertCard key={alert.id} alert={alert} language={language} />
            ))}
          </div>
        </div>
      )}

      {/* Trending scams */}
      {trending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: "#94A3B8" }}>
            <TrendingUp size={14} />
            {t.community.trending}
          </h2>
          <div className="flex flex-wrap gap-2">
            {trending.map(([type, count]) => (
              <div
                key={type}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B" }}
              >
                {getScamTypeLabel(type)}
                <span className="font-bold font-mono text-xs">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live feed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2" style={{ color: "#94A3B8" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            {t.community.recentReports}
          </h2>
          {reportsLoading && <RefreshCw size={14} className="animate-spin" style={{ color: "#94A3B8" }} />}
        </div>

        {reportsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-4 animate-pulse"
                style={{ background: "rgba(30,41,59,0.6)", height: "88px" }}
              />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <Users size={32} className="mx-auto mb-3" style={{ color: "#94A3B8" }} />
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t.community.noReports}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <ThreatCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
