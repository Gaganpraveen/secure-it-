import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const identifier = req.nextUrl.searchParams.get("identifier");

  if (!identifier) {
    return NextResponse.json({ error: "identifier is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("trust_scores")
      .select("*")
      .eq("identifier", identifier)
      .single();

    if (error || !data) {
      return NextResponse.json({
        trust_level: "unknown",
        total_reports: 0,
        identifier,
        is_bank_verified: false,
      });
    }

    const { data: reports } = await supabase
      .from("threat_reports")
      .select("id, created_at, scam_type, risk_score, ai_explanation, pincode, language")
      .eq("sender_info", identifier)
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({ ...data, recent_reports: reports ?? [] });
  } catch (error) {
    console.error("Trust score API error:", error);
    return NextResponse.json({
      trust_level: "unknown",
      total_reports: 0,
      identifier,
      is_bank_verified: false,
      recent_reports: [],
    });
  }
}
