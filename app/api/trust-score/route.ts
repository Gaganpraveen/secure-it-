import { NextResponse } from "next/server";

import { createAnonServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const identifier = (searchParams.get("identifier") ?? "").trim();

  if (!identifier) {
    return NextResponse.json(
      { error: "identifier required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createAnonServerClient();
    if (!supabase) {
      return NextResponse.json({
        trust_level: "unknown",
        total_reports: 0,
        last_reported_at: null,
        fallback: true,
      });
    }
    const { data, error } = await supabase
      .from("trust_scores")
      .select("trust_level, total_reports, last_reported_at, identifier_type")
      .eq("identifier", identifier)
      .maybeSingle();

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          trust_level: "unknown",
          total_reports: 0,
          last_reported_at: null,
          fallback: true,
        },
        { status: 200 }
      );
    }

    if (!data) {
      return NextResponse.json({
        trust_level: "unknown",
        total_reports: 0,
        last_reported_at: null,
      });
    }

    return NextResponse.json({
      trust_level: data.trust_level,
      total_reports: data.total_reports ?? 0,
      last_reported_at: data.last_reported_at,
      identifier_type: data.identifier_type,
    });
  } catch (e) {
    console.error("GET /api/trust-score:", e);
    return NextResponse.json(
      {
        trust_level: "unknown",
        total_reports: 0,
        last_reported_at: null,
        fallback: true,
      },
      { status: 200 }
    );
  }
}
