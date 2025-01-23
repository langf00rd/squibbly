"use client";

import { Button } from "@/components/ui/button";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { Eraser, Pencil } from "lucide-react";

export default function ToolSelector() {
  const { setTool, tool } = useDrawingContext();
  return (
    <div className="flex gap-x-3">
      <Button
        title="Pencil"
        size="icon"
        className={`text-black border border-gray-100 bg-white shadow-xl ${tool === "pencil" && "bg-primary text-primary-foreground border-transparent"}`}
        onClick={() => setTool("pencil")}
      >
        <Pencil size={20} />
      </Button>
      <Button
        title="Eraser"
        size="icon"
        className={`text-black border border-gray-100 bg-white shadow-xl ${tool === "eraser" && "bg-primary text-primary-foreground border-transparent"}`}
        onClick={() => setTool("eraser")}
      >
        <Eraser size={20} />
      </Button>
    </div>
  );
}
