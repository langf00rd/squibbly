"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { MenuIcon } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";

export default function SavedDrawingsButton() {
  const { savedDrawings, loadDrawing, currentDrawingDetails } =
    useDrawingContext();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-3 max-h-[500px] overflow-scroll">
        <div className="space-y-3">
          <p className="font-semibold">Your saved drawings</p>
          <ul className="space-y-3">
            {savedDrawings.map((drawing) => (
              <li
                key={drawing.created}
                className="flex items-center gap-1"
                role="button"
                onClick={() => loadDrawing(drawing.id)}
              >
                <p
                  style={{
                    color:
                      currentDrawingDetails?.id === drawing.id
                        ? "var(--primary)"
                        : "",
                  }}
                >
                  {drawing.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
