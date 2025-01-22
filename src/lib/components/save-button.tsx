"use client";

import type React from "react";
import { Save } from "lucide-react";
import { useDrawingContext } from "../contexts/drawing-context";

const SaveButton: React.FC = () => {
  const { currentDrawing, addSavedDrawing } = useDrawingContext();

  const handleSave = () => {
    addSavedDrawing(currentDrawing);
    alert("Drawing saved!");
  };

  return (
    <button
      onClick={handleSave}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <Save size={20} className="mr-2" />
      Save
    </button>
  );
};

export default SaveButton;
