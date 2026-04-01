import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { ReportForm } from "./report-form";

export default function ReportPage() {
  return (
    <Suspense
      fallback={<Skeleton className="mx-auto h-96 max-w-lg rounded-2xl" />}
    >
      <ReportForm />
    </Suspense>
  );
}
