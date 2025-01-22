"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { MenuIcon, Save } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";

export default function SavedDrawingsButton() {
  const { currentDrawing, addSavedDrawing, savedDrawings, loadDrawing } =
    useDrawingContext();

  const handleSave = () => {
    addSavedDrawing(currentDrawing);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={handleSave} size="icon" variant="secondary">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-3">
        <div>
          <p>Your saved drawings</p>
          <ul className="space-y-3">
            {savedDrawings.map((drawing, index) => (
              <li
                key={drawing.created}
                className="flex items-center gap-1"
                role="button"
                onClick={() => loadDrawing(index)}
              >
                <p>{drawing.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
