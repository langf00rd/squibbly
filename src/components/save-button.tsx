"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";
import type React from "react";
import { Button } from "./ui/button";

export default function SaveButton() {
  const { currentArtifactData, addSavedDrawing, isSaving } =
    useDrawingContext();
  return (
    <Button
      isLoading={isSaving}
      onClick={() => addSavedDrawing(currentArtifactData)}
      variant="secondary"
      className="w-[80px]"
    >
      Save
    </Button>
  );
}
