import { NextResponse } from "next/server";
import { z } from "zod";

import { analyzeMessageWithClaude } from "@/lib/claude";
import type { AppLanguage } from "@/lib/constants";

const bodySchema = z.object({
  message: z.string().min(1).max(15000),
  language: z.enum(["en", "hi", "kn"]).optional(),
});

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { message, language = "en" } = parsed.data;
    const lang = language as AppLanguage;

    const analysis = await analyzeMessageWithClaude(message);

    const explanationKey =
      lang === "hi"
        ? "explanation_hi"
        : lang === "kn"
          ? "explanation_kn"
          : "explanation_en";
    const adviceKey =
      lang === "hi"
        ? "safety_advice_hi"
        : lang === "kn"
          ? "safety_advice_kn"
          : "safety_advice_en";

    return NextResponse.json({
      ...analysis,
      language: lang,
      explanation_local:
        analysis[
          explanationKey as keyof typeof analysis
        ] as string,
      safety_advice_local:
        analysis[adviceKey as keyof typeof analysis] as string,
    });
  } catch (e) {
    console.error("POST /api/analyze:", e);
    return NextResponse.json(
      {
        error: "analysis_failed",
        message:
          "This message looks suspicious. Please verify with your bank directly.",
      },
      { status: 500 }
    );
  }
}
