"use client";

import { useEffect, useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase";

type ThreatReportRow = {
  id: string;
  created_at: string;
  message_text: string;
  sender_info: string | null;
  scam_type: string | null;
  risk_score: number | null;
  pincode: string | null;
  language: string | null;
};

export function useThreatReportsRealtime(pincode: string | null) {
  const [reports, setReports] = useState<ThreatReportRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const client = createBrowserSupabaseClient();
    if (!client) {
      setError("realtime_failed");
      return;
    }
    const sb = client;
    let channel: ReturnType<typeof sb.channel> | null = null;

    async function load() {
      const { data, error: fetchError } = await sb
        .from("threat_reports")
        .select(
          "id, created_at, message_text, sender_info, scam_type, risk_score, pincode, language"
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      const rows = (data ?? []) as ThreatReportRow[];
      const filtered = pincode
        ? rows.filter((r) => r.pincode === pincode)
        : rows;
      if (!cancelled) setReports(filtered);
    }

    async function setup() {
      try {
        await load();
        channel = sb
          .channel("threat_reports_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "threat_reports",
            },
            () => {
              void load();
            }
          )
          .subscribe();
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("realtime_failed");
      }
    }

    void setup();

    return () => {
      cancelled = true;
      if (channel) {
        void sb.removeChannel(channel);
      }
    };
  }, [pincode]);

  return { reports, error };
}
