"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AppLanguage } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

export function ReportForm() {
  const { language, t, setLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [channel, setChannel] = useState<
    "sms" | "call" | "whatsapp" | "qr" | "other"
  >("sms");
  const [message, setMessage] = useState(searchParams.get("message") ?? "");
  const [sender, setSender] = useState(searchParams.get("sender") ?? "");
  const [pincode, setPincode] = useState("560001");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || pincode.length < 6) {
      toast.error(t.common.error);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_text: message,
          sender_info: sender || null,
          pincode,
          language,
          channel,
        }),
      });
      if (!res.ok) {
        toast.error(t.common.error);
        return;
      }
      setDone(true);
      toast.success(t.report.thankYou);
    } catch {
      toast.error(t.errors.network);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-12 text-center">
        <CheckCircle2 className="size-20 text-accent-safe" />
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.report.thankYou}
        </h1>
        <Button
          type="button"
          className="min-h-touch rounded-[12px] text-lg"
          onClick={() => router.push("/dashboard")}
        >
          {t.nav.dashboard}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t.report.title}
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card className="border-border bg-app-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-text-primary">
              {t.report.stepWhat}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={channel}
              onValueChange={(v) => setChannel(v as typeof channel)}
            >
              <SelectTrigger className="min-h-touch rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">{t.report.sms}</SelectItem>
                <SelectItem value="call">{t.report.call}</SelectItem>
                <SelectItem value="whatsapp">{t.report.whatsapp}</SelectItem>
                <SelectItem value="qr">{t.report.qr}</SelectItem>
                <SelectItem value="other">{t.report.other}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="border-border bg-app-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-text-primary">
              {t.report.stepMessage}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px] rounded-2xl border-border bg-muted/30"
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-app-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-text-primary">
              {t.report.stepSender}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="min-h-touch rounded-xl border-border bg-muted/30"
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-app-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-text-primary">
              {t.report.stepPincode}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              required
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputMode="numeric"
              className="min-h-touch rounded-xl border-border bg-muted/30"
            />
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label>{t.report.stepLang}</Label>
          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as AppLanguage)}
          >
            <SelectTrigger className="min-h-touch rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="min-h-touch w-full rounded-[12px] text-lg"
          disabled={submitting}
        >
          {submitting ? t.common.loading : t.common.submit}
        </Button>
      </form>
    </div>
  );
}
