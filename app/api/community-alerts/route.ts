import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const pincode = req.nextUrl.searchParams.get("pincode") ?? "560001";

  try {
    const { data, error } = await supabase
      .from("community_alerts")
      .select("*")
      .eq("pincode", pincode)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ alerts: data ?? [] });
  } catch (error) {
    console.error("Community alerts API error:", error);
    return NextResponse.json({ alerts: [], error: "Could not load alerts" });
  }
}
