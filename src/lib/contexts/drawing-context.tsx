"use client";

import {
  createDrawing,
  getUserArtifacts,
  updateArtifcat,
} from "@/app/(dashboard)/actions";
import type React from "react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { COOKIE_KEYS, Artifact, DrawingContextType, Stroke } from "../generics";
import { toast } from "../hooks/use-toast";
const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export function DrawingProvider(props: { children: ReactNode }) {
  const [drawingTitle, setDrawingTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [currentDrawing, setCurrentDrawing] = useState<Stroke[]>([]);
  const [currentDrawingDetails, setCurrentDrawingDetails] =
    useState<Artifact | null>(null);
  const [savedDrawings, setSavedDrawings] = useState<Artifact[]>([]);
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

  async function handleUpdateArtifact(drawing: Artifact["data"]) {
    if (!currentDrawingDetails) {
      return toast({
        title: "Error",
        description: "No drawing to update",
      });
    }

    try {
      const payload = {
        ...currentDrawingDetails,
        data: drawing,
      };

      await updateArtifcat(payload);

      const updatedDrawings = savedDrawings.map((d) =>
        d.id === currentDrawingDetails?.id ? { ...d, data: drawing } : d,
      );

      setSavedDrawings(updatedDrawings);
      saveToLocalStorage(COOKIE_KEYS.drawing, JSON.stringify(updatedDrawings));
    } catch (err) {
      return toast({
        description: String(err),
      });
    }
  }

  async function handleCreateArtifact(drawing: Stroke[]) {
    const newDrawing = {
      data: drawing,
      title: `squibble #${savedDrawings.length + 1}`,
    };
    try {
      const _drawings = await createDrawing(newDrawing);
      setCurrentDrawing(_drawings[0].data);
      setCurrentDrawingDetails(_drawings[0]);
      saveToLocalStorage(COOKIE_KEYS.drawing, JSON.stringify([newDrawing]));
    } catch (err) {
      toast({
        title: "Error",
        description: String(err),
      });
    }
  }

  const addSavedDrawing = useCallback(
    (drawing: Stroke[]) => {
      const savedDrawingsIDs = savedDrawings.map((d) => d.id);

      if (!currentDrawingDetails || !savedDrawingsIDs)
        handleCreateArtifact(drawing);
      else handleUpdateArtifact(drawing);

      toast({
        title: "🎉 Awesome",
        description: "Your squibble has been saved",
      });
    },
    [currentDrawingDetails, savedDrawings],
  );

  const loadDrawing = useCallback(
    (id: Artifact["id"]) => {
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

  function createNewDrawing() {
    setCurrentDrawing([]);
    setCurrentDrawingDetails(null);
    setUndoStack([]);
    setRedoStack([]);
  }

  useEffect(() => {
    (async () => {
      const artifacts = await getUserArtifacts();
      setSavedDrawings(artifacts);
    })();
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
