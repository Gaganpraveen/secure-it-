import { NextResponse } from "next/server";

import { createAnonServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createAnonServerClient();
    if (!supabase) {
      return NextResponse.json({
        scamsToday: 12,
        protectedEstimate: 2400,
        fallback: true,
      });
    }
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const { count: todayCount, error: c1 } = await supabase
      .from("threat_reports")
      .select("*", { count: "exact", head: true })
      .gte("created_at", start.toISOString());

    const { count: totalActive, error: c2 } = await supabase
      .from("threat_reports")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    if (c1 || c2) {
      console.error(c1 ?? c2);
      return NextResponse.json({
        scamsToday: 12,
        protectedEstimate: 2400,
        fallback: true,
      });
    }

    return NextResponse.json({
      scamsToday: todayCount ?? 0,
      protectedEstimate: Math.max(500, (totalActive ?? 0) * 18),
    });
  } catch (e) {
    console.error("GET /api/stats:", e);
    return NextResponse.json({
      scamsToday: 12,
      protectedEstimate: 2400,
      fallback: true,
    });
  }
}
