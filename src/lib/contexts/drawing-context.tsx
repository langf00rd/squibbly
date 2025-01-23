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
import { COOKIE_KEYS, Drawing, DrawingContextType, Stroke } from "../generics";
import { toast } from "../hooks/use-toast";
const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export function DrawingProvider(props: { children: ReactNode }) {
  const [drawingTitle, setDrawingTitle] = useState("");
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

  function saveToLocalStorage(key: COOKIE_KEYS, value: string) {
    localStorage.setItem(key, value);
  }

  const addSavedDrawing = useCallback(
    (drawing: Stroke[]) => {
      if (!currentDrawingDetails) {
        const newDrawing = {
          data: drawing,
          created: new Date().toISOString(),
          title: `squibble #1`,
          id: `SQUIBBLE-1-${Date.now()}`,
        };
        setCurrentDrawingDetails(newDrawing);
        saveToLocalStorage(COOKIE_KEYS.drawing, JSON.stringify([newDrawing]));
        return toast({
          title: "Great.",
          description: "Your first drawing is saved",
        });
      }

      const savedDrawingsIDs = savedDrawings.map((d) => d.id);

      if (savedDrawingsIDs.includes(currentDrawingDetails?.id)) {
        const updatedDrawings = savedDrawings.map((d) =>
          d.id === currentDrawingDetails.id ? { ...d, data: drawing } : d,
        );
        setSavedDrawings(updatedDrawings);
        saveToLocalStorage(
          COOKIE_KEYS.drawing,
          JSON.stringify(updatedDrawings),
        );
      } else {
        const thisDrawing = {
          ...currentDrawingDetails,
          data: drawing,
        };
        setSavedDrawings((prev) => [...prev, thisDrawing]);
        saveToLocalStorage(
          COOKIE_KEYS.drawing,
          JSON.stringify([...savedDrawings, thisDrawing]),
        );
      }
      toast({
        title: "🎉 Awesome",
        description: "Drawing has been saved successfully",
      });
    },
    [currentDrawingDetails, savedDrawings],
  );

  const loadDrawing = useCallback(
    (id: string) => {
      const drawingToLoad = savedDrawings.find((a) => a.id === id);
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

  function createDrawingObject(data?: Drawing) {
    return {
      ...data,
      created: new Date().toISOString(),
      title: data?.title ?? `squibble #${savedDrawings.length + 1}`,
      data: data?.data ?? currentDrawing,
      id: data?.id ?? `SQUIBBLE-${savedDrawings.length + 1}-${Date.now()}`,
    };
  }

  function createNewDrawing() {
    const newDrawing = createDrawingObject();
    setCurrentDrawing([]);
    setCurrentDrawingDetails(newDrawing);
    setUndoStack([]);
    setRedoStack([]);
  }

  useEffect(() => {
    // fetch saved drawing from local storage and set to state
    const storedDrawings = localStorage.getItem(COOKIE_KEYS.drawing);
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
        setCurrentDrawingDetails,
        drawingTitle,
        setDrawingTitle,
        createNewDrawing,
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
