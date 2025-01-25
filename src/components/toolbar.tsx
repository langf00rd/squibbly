"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { MoreHorizontal, Redo2, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

const colors = [
  "#000000",
  "#152DF5",
  "#F9A677",
  "#F450D9",
  "#E9E3FD",
  "#D5BD99",
  "#91E7AD",
];

export default function Toolbar() {
  const { undo, redo, brushSize, setBrushSize, color, setColor } =
    useDrawingContext();
  return (
    <div className="flex items-center space-x-4">
      {/* <div className="flex space-x-1">
        {colors.map((c) => (
          <button
            key={c}
            className={`w-6 h-6 rounded-full ${c === color ? "ring-2 ring-offset-1 ring-gray-400" : ""}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div> */}
      {/* <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => setBrushSize(Number(e.target.value))}
        className="w-32"
      /> */}
      <div className="flex space-x-2">
        <Button
          size="icon"
          onClick={undo}
          className="text-black bg-white border shadow-md hover:bg-gray-300"
        >
          <Undo2 size={20} />
        </Button>
        <Button
          size="icon"
          onClick={redo}
          className="text-black bg-white border shadow-md hover:bg-gray-300"
        >
          <Redo2 size={20} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="text-black bg-white border shadow-xl"
            >
              <MoreHorizontal size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3">
            <div className="space-y-3">
              <Label>Brush Size</Label>
              <Input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label>Brush Colors</Label>
              <div className="flex items-center justify-between">
                {colors.map((c) => (
                  <button
                    key={c}
                    className={`w-6 h-6 rounded-full ${c === color ? "ring-2 ring-offset-1 ring-gray-400" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
                <Input
                  className="size-6 p-0 rounded-full"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
