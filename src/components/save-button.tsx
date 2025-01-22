"use client";

import type React from "react";
import { Save } from "lucide-react";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { Button } from "./ui/button";

const SaveButton: React.FC = () => {
  const { currentDrawing, addSavedDrawing } = useDrawingContext();

  const handleSave = () => {
    addSavedDrawing(currentDrawing);
  };

  return (
    <Button onClick={handleSave} variant="secondary">
      <Save size={20} />
      Save
    </Button>
  );
};

export default SaveButton;
