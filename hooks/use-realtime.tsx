"use client";

import { useEffect, useState } from "react";
import { supabase, ThreatReport } from "@/lib/supabase";

export function useRealtimeThreatReports(pincode: string) {
  const [reports, setReports] = useState<ThreatReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pincode) return;

    const fetchInitial = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("threat_reports")
          .select("*")
          .eq("pincode", pincode)
          .order("created_at", { ascending: false })
          .limit(20);

        if (fetchError) throw fetchError;
        setReports(data ?? []);
      } catch (err) {
        setError("Could not load reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();

    const subscription = supabase
      .channel(`threat_reports_${pincode}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "threat_reports",
          filter: `pincode=eq.${pincode}`,
        },
        (payload) => {
          setReports((prev) => [payload.new as ThreatReport, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [pincode]);

  return { reports, loading, error };
}
