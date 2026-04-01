import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { analyzeMessage, FALLBACK_RESULT } from "@/lib/claude";

const schema = z.object({
  message_text: z.string().min(1).max(2000),
  sender_info: z.string().optional(),
  scam_type: z.string().optional(),
  pincode: z.string().min(4).max(10),
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

    const data = parsed.data;

    let analysis = FALLBACK_RESULT;
    try {
      analysis = await analyzeMessage(data.message_text);
    } catch (e) {
      console.error("Analysis during report failed:", e);
    }

    const { data: report, error: insertError } = await supabase
      .from("threat_reports")
      .insert({
        message_text: data.message_text,
        sender_info: data.sender_info,
        scam_type: analysis.scam_type ?? data.scam_type ?? "other",
        risk_score: analysis.risk_score,
        ai_explanation: analysis.explanation_en,
        ai_explanation_local:
          data.language === "hi"
            ? analysis.explanation_hi
            : data.language === "kn"
            ? analysis.explanation_kn
            : analysis.explanation_en,
        language: data.language,
        pincode: data.pincode,
        status: "active",
      })
      .select()
      .single();

    if (insertError) throw insertError;

    if (data.sender_info) {
      const { data: existing } = await supabase
        .from("trust_scores")
        .select("*")
        .eq("identifier", data.sender_info)
        .single();

      if (existing) {
        const newCount = existing.total_reports + 1;
        const trustLevel = newCount >= 3 ? "dangerous" : "suspicious";
        await supabase
          .from("trust_scores")
          .update({
            total_reports: newCount,
            trust_level: trustLevel,
            last_reported_at: new Date().toISOString(),
          })
          .eq("identifier", data.sender_info);
      } else {
        const identifierType = data.sender_info.includes("@") ? "upi_id" : "phone";
        await supabase.from("trust_scores").insert({
          identifier: data.sender_info,
          identifier_type: identifierType,
          total_reports: 1,
          trust_level: "suspicious",
          last_reported_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ success: true, report_id: report?.id });
  } catch (error) {
    console.error("Report API error:", error);
    return NextResponse.json({ error: "Could not submit report" }, { status: 500 });
  }
}
