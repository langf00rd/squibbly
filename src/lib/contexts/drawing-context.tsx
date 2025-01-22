"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";

type Stroke = {
  path: { x: number; y: number }[];
  color: string;
  brushSize: number;
  tool: "pencil" | "eraser";
};

interface DrawingContextType {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  tool: "pencil" | "eraser";
  setTool: (tool: "pencil" | "eraser") => void;
  currentDrawing: Stroke[];
  setCurrentDrawing: React.Dispatch<React.SetStateAction<Stroke[]>>;
  savedDrawings: Stroke[][];
  addSavedDrawing: (drawing: Stroke[]) => void;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  loadDrawing: (index: number) => void;
}

const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [currentDrawing, setCurrentDrawing] = useState<Stroke[]>([]);
  const [savedDrawings, setSavedDrawings] = useState<Stroke[][]>([]);
  const [undoStack, setUndoStack] = useState<Stroke[][]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[][]>([]);

  const addStroke = useCallback(
    (stroke: Stroke) => {
      setCurrentDrawing((prev) => [...prev, stroke]);
      setUndoStack((prev) => [...prev, currentDrawing]);
      setRedoStack([]);
    },
    [currentDrawing],
  );

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const prevDrawing = undoStack.pop()!;
      setRedoStack((prev) => [...prev, currentDrawing]);
      setCurrentDrawing(prevDrawing);
      setUndoStack([...undoStack]);
    }
  }, [currentDrawing, undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextDrawing = redoStack.pop()!;
      setUndoStack((prev) => [...prev, currentDrawing]);
      setCurrentDrawing(nextDrawing);
      setRedoStack([...redoStack]);
    }
  }, [currentDrawing, redoStack]);

  const addSavedDrawing = useCallback((drawing: Stroke[]) => {
    setSavedDrawings((prev) => [...prev, drawing]);
  }, []);

  const loadDrawing = useCallback(
    (index: number) => {
      const drawingToLoad = savedDrawings[index];
      setCurrentDrawing(drawingToLoad);
      setUndoStack([]);
      setRedoStack([]);
    },
    [savedDrawings],
  );

  return (
    <DrawingContext.Provider
      value={{
        color,
        setColor,
        brushSize,
        setBrushSize,
        tool,
        setTool,
        currentDrawing,
        setCurrentDrawing,
        savedDrawings,
        addSavedDrawing,
        undoStack,
        redoStack,
        addStroke,
        undo,
        redo,
        loadDrawing,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error("useDrawingContext must be used within a DrawingProvider");
  }
  return context;
};
