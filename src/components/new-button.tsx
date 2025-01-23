"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDrawingContext } from "@/lib/contexts/drawing-context";

export default function NewButton() {
  const { createNewDrawing } = useDrawingContext();
  return (
    <Button
      size="icon"
      className="bg-white border text-primary"
      onClick={createNewDrawing}
    >
      <PlusIcon size={20} />
    </Button>
  );
}
