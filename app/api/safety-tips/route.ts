import { NextResponse } from "next/server";

import { SEED_TIPS } from "@/lib/seed-data";
import { createAnonServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const supabase = createAnonServerClient();
    if (!supabase) {
      const tips =
        category && category !== "all"
          ? SEED_TIPS.filter((t) => t.category === category)
          : SEED_TIPS;
      return NextResponse.json({
        tips: tips.map((tip, i) => ({
          id: `seed-${category ?? "all"}-${i}`,
          ...tip,
        })),
        fallback: true,
      });
    }
    let query = supabase
      .from("banking_safety_tips")
      .select("*")
      .order("priority", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error || !data?.length) {
      const tips =
        category && category !== "all"
          ? SEED_TIPS.filter((t) => t.category === category)
          : SEED_TIPS;
      return NextResponse.json({
        tips: tips.map((tip, i) => ({
          id: `seed-${category ?? "all"}-${i}`,
          ...tip,
        })),
        fallback: true,
      });
    }

    return NextResponse.json({ tips: data });
  } catch (e) {
    console.error("GET /api/safety-tips:", e);
    const tips =
      category && category !== "all"
        ? SEED_TIPS.filter((t) => t.category === category)
        : SEED_TIPS;
    return NextResponse.json({
      tips: tips.map((tip, i) => ({
        id: `seed-${category ?? "all"}-${i}`,
        ...tip,
      })),
      fallback: true,
    });
  }
}
