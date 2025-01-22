"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";

export default function DrawingNameInput() {
  const { savedDrawings, currentDrawingDetails } = useDrawingContext();
  return (
    <input
      type="text"
      placeholder="Untitled Drawing"
      defaultValue={
        currentDrawingDetails
          ? currentDrawingDetails?.title
          : `squibble #${savedDrawings.length + 1}`
      }
      className="p-2"
    />
  );
}
