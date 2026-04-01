import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  try {
    let query = supabase
      .from("banking_safety_tips")
      .select("*")
      .order("priority", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.limit(50);

    if (error) throw error;

    return NextResponse.json({ tips: data ?? [] });
  } catch (error) {
    console.error("Safety tips API error:", error);
    return NextResponse.json({ tips: [], error: "Could not load tips" });
  }
}
