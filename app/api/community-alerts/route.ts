import { NextResponse } from "next/server";

import { createAnonServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = (searchParams.get("pincode") ?? "560001").trim();

  try {
    const supabase = createAnonServerClient();
    if (!supabase) {
      return NextResponse.json({ alerts: [], fallback: true });
    }
    const { data, error } = await supabase
      .from("community_alerts")
      .select("*")
      .eq("is_active", true)
      .eq("pincode", pincode)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error(error);
      return NextResponse.json({ alerts: [], fallback: true });
    }

    return NextResponse.json({ alerts: data ?? [] });
  } catch (e) {
    console.error("GET /api/community-alerts:", e);
    return NextResponse.json({ alerts: [], fallback: true });
  }
}
