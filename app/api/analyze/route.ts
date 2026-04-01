import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeMessage, FALLBACK_RESULT } from "@/lib/claude";

const schema = z.object({
  message: z.string().min(1).max(2000),
  language: z.enum(["en", "hi", "kn"]).default("en"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await analyzeMessage(parsed.data.message);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(FALLBACK_RESULT, { status: 200 });
  }
}
