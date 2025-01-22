"use client";

import type React from "react";
import { useDrawingContext } from "@/lib/contexts/drawing-context";

const SavedDrawings: React.FC = () => {
  const { savedDrawings, loadDrawing } = useDrawingContext();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Saved Drawings</h2>
      <div className="grid grid-cols-3 gap-4">
        {savedDrawings.map((drawing, index) => (
          <button
            key={index}
            onClick={() => loadDrawing(index)}
            className="w-full h-auto aspect-square rounded-lg shadow-md overflow-hidden"
          >
            <canvas
              width={200}
              height={200}
              className="w-full h-full"
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.clearRect(0, 0, 200, 200);
                    drawing.data.forEach((stroke) => {
                      ctx.beginPath();
                      ctx.strokeStyle = stroke.color;
                      ctx.lineWidth = stroke.brushSize / 8;
                      ctx.globalCompositeOperation =
                        stroke.tool === "eraser"
                          ? "destination-out"
                          : "source-over";
                      stroke.path.forEach((point, i) => {
                        if (i === 0) ctx.moveTo(point.x / 8, point.y / 8);
                        else ctx.lineTo(point.x / 8, point.y / 8);
                      });
                      ctx.stroke();
                    });
                  }
                }
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SavedDrawings;
