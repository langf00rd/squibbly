"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();

  function handleBack() {
    window.history.back();
  }

  return (
    <div className="flex items-center justify-center flex-col gap-2 h-screen">
      <p>{searchParams.get("message")}</p>
      <Button onClick={handleBack}>Try again</Button>
    </div>
  );
}
