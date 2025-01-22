"use client";

import type React from "react";
import { Undo2, Redo2 } from "lucide-react";
import { useDrawingContext } from "../contexts/drawing-context";

const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF"];

const Toolbar: React.FC = () => {
  const { color, setColor, brushSize, setBrushSize, undo, redo } =
    useDrawingContext();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-1">
        {colors.map((c) => (
          <button
            key={c}
            className={`w-6 h-6 rounded-full ${c === color ? "ring-2 ring-offset-1 ring-gray-400" : ""}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => setBrushSize(Number(e.target.value))}
        className="w-32"
      />
      <div className="flex space-x-2">
        <button
          onClick={undo}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={redo}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          <Redo2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
