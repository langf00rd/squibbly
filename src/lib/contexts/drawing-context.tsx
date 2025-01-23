"use client";

import type React from "react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Drawing, DrawingContextType, Stroke } from "../generics";

const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export function DrawingProvider(props: { children: ReactNode }) {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [currentDrawing, setCurrentDrawing] = useState<Stroke[]>([]);
  const [currentDrawingDetails, setCurrentDrawingDetails] =
    useState<Drawing | null>(null);
  const [savedDrawings, setSavedDrawings] = useState<Drawing[]>([]);
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

  const addSavedDrawing = useCallback(
    (drawing: Stroke[]) => {
      setSavedDrawings((prev) => [
        ...prev,
        {
          created: Date.now(),
          title: `squibble #${prev.length + 1}`,
          data: drawing,
          id: `drawing-${prev.length + 1}`,
        },
      ]);
      localStorage.setItem("drawings:saved", JSON.stringify(savedDrawings)); // save to local storage
    },
    [savedDrawings],
  );

  const loadDrawing = useCallback(
    (id: string) => {
      const drawingToLoad = savedDrawings.find((a) => a.id === id);

      console.log("loading", id);
      console.log("loading:drawing", drawingToLoad);

      if (!drawingToLoad) return;
      setCurrentDrawing(drawingToLoad.data);
      setCurrentDrawingDetails(drawingToLoad);
      setUndoStack([]);
      setRedoStack([]);
    },
    [savedDrawings],
  );

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  useEffect(() => {
    // fetch saved drawing from local storage and set to state
    const storedDrawings = localStorage.getItem("drawings:saved");
    if (storedDrawings) {
      const parsedStoredDrawings: Drawing[] = JSON.parse(storedDrawings);
      setSavedDrawings(parsedStoredDrawings);
      setCurrentDrawingDetails(
        parsedStoredDrawings[parsedStoredDrawings.length - 1],
      );
      setCurrentDrawing(
        parsedStoredDrawings[parsedStoredDrawings.length - 1].data,
      );
    }
  }, []);

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
        toggleFullScreen,
        currentDrawingDetails,
      }}
    >
      {props.children}
    </DrawingContext.Provider>
  );
}

export function useDrawingContext() {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error("useDrawingContext must be used within a DrawingProvider");
  }
  return context;
}
