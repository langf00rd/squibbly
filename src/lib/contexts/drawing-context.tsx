"use client";

import {
  createDrawing,
  getUserArtifacts,
  updateArtifcat,
} from "@/lib/actions/artifacts";
import type React from "react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Artifact, COOKIE_KEYS, DrawingContextType, Stroke } from "../generics";
import { toast } from "../hooks/use-toast";
const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export function DrawingProvider(props: { children: ReactNode }) {
  const [isSaving, setIsSaving] =
    useState<DrawingContextType["isSaving"]>(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [currentArtifactData, setCurrentArtifact] = useState<Stroke[]>([]);
  const [currentArtifactDetails, setCurrentArtifactDetails] =
    useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [undoStack, setUndoStack] = useState<Stroke[][]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[][]>([]);
  const [drawingTitle, setDrawingTitle] = useState("");

  const addStroke = useCallback(
    (stroke: Stroke) => {
      setCurrentArtifact((prev) => [...prev, stroke]);
      setUndoStack((prev) => [...prev, currentArtifactData]);
      setRedoStack([]);
    },
    [currentArtifactData],
  );

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const prevDrawing = undoStack.pop()!;
      setRedoStack((prev) => [...prev, currentArtifactData]);
      setCurrentArtifact(prevDrawing);
      setUndoStack([...undoStack]);
    }
  }, [currentArtifactData, undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextDrawing = redoStack.pop()!;
      setUndoStack((prev) => [...prev, currentArtifactData]);
      setCurrentArtifact(nextDrawing);
      setRedoStack([...redoStack]);
    }
  }, [currentArtifactData, redoStack]);

  function saveToLocalStorage(key: COOKIE_KEYS, value: string) {
    localStorage.setItem(key, value);
  }

  async function handleUpdateArtifact(drawing: Artifact["data"]) {
    if (!currentArtifactDetails) {
      return toast({
        title: "Error",
        description: "No drawing to update",
      });
    }

    try {
      const payload = {
        ...currentArtifactDetails,
        title: drawingTitle || `squibble #${artifacts.length + 1}`,
        data: drawing,
      };

      await updateArtifcat(payload);

      const updatedDrawings = artifacts.map((d) =>
        d.id === currentArtifactDetails?.id ? { ...d, data: drawing } : d,
      );

      setArtifacts(updatedDrawings);
      saveToLocalStorage(COOKIE_KEYS.drawing, JSON.stringify(updatedDrawings));
    } catch (err) {
      return toast({
        description: String(err),
      });
    }
  }

  async function handleCreateArtifact(data: Stroke[]) {
    const newArtifact = {
      title: drawingTitle || `squibble #${artifacts.length + 1}`,
      data,
    };
    try {
      const artifactsInDb = await createDrawing(newArtifact);
      setCurrentArtifact(artifactsInDb[0].data);
      setCurrentArtifactDetails(artifactsInDb[0]);
      saveToLocalStorage(COOKIE_KEYS.drawing, JSON.stringify([newArtifact]));
    } catch (err) {
      toast({
        title: "Error",
        description: String(err),
      });
    }
  }

  const addSavedDrawing = useCallback(
    async (drawing: Stroke[]) => {
      const artifactsIDs = artifacts.map((d) => d.id);

      setIsSaving(true);

      if (!currentArtifactDetails || !artifactsIDs)
        await handleCreateArtifact(drawing);
      else await handleUpdateArtifact(drawing);

      await fetchDataOnLoad();

      setIsSaving(false);

      toast({
        title: "🎉 Awesome",
        description: "Your squibble has been saved",
      });
    },
    [currentArtifactDetails, artifacts, artifacts.length, drawingTitle],
  );

  const loadDrawing = useCallback(
    (id: Artifact["id"]) => {
      const drawingToLoad = artifacts.find((a) => a.id === id);
      if (!drawingToLoad) return;
      setCurrentArtifact(drawingToLoad.data);
      setCurrentArtifactDetails(drawingToLoad);
      setUndoStack([]);
      setRedoStack([]);
    },
    [artifacts],
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
    setCurrentArtifact([]);
    setCurrentArtifactDetails(null);
    setUndoStack([]);
    setRedoStack([]);
  }

  async function fetchDataOnLoad() {
    const artifacts = await getUserArtifacts();
    setArtifacts(artifacts);
  }

  useEffect(() => {
    fetchDataOnLoad();
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
        currentArtifactData,
        setCurrentArtifact,
        artifacts,
        addSavedDrawing,
        undoStack,
        redoStack,
        addStroke,
        undo,
        redo,
        loadDrawing,
        toggleFullScreen,
        currentArtifactDetails,
        setCurrentArtifactDetails,
        drawingTitle,
        setDrawingTitle,
        createNewDrawing,
        fetchDataOnLoad,
        isSaving,
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
