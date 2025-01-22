"use client";

import type React from "react";
import { Pencil, Eraser } from "lucide-react";
import { useDrawingContext } from "../contexts/drawing-context";

const ToolSelector: React.FC = () => {
  const { tool, setTool } = useDrawingContext();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setTool("pencil")}
        className={`p-2 rounded ${tool === "pencil" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        <Pencil size={20} />
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`p-2 rounded ${tool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        <Eraser size={20} />
      </button>
    </div>
  );
};

export default ToolSelector;
