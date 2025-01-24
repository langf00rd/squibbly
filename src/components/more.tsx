"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { MoreVertical } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/app/auth/actions";

export default function More() {
  const { savedDrawings, loadDrawing, currentDrawingDetails } =
    useDrawingContext();

  async function handleSignOut() {
    await signOut();
    window.location.reload();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="m-3 space-y-5 max-h-[500px] overflow-scroll">
        <Button size="sm" className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
        <hr />
        <div className="space-y-3">
          <p className="font-semibold">Your saved squibbles</p>
          {savedDrawings.length < 1 && (
            <p className="text-sm">No saved squibbles yet :(</p>
          )}
          <ul className="space-y-3">
            {savedDrawings.map((drawing) => (
              <li
                key={drawing.id}
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
                  {drawing.title} #{drawing.id}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
