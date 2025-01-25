"use client";

import type React from "react";
import { Save } from "lucide-react";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { Button } from "./ui/button";

export default function SaveButton() {
  const { currentArtifactData, addSavedDrawing } = useDrawingContext();
  return (
    <Button
      onClick={() => addSavedDrawing(currentArtifactData)}
      variant="secondary"
    >
      <Save size={20} />
      Save
    </Button>
  );
}
