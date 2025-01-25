export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export type Stroke = {
  path: { x: number; y: number }[];
  color: string;
  brushSize: number;
  tool: "pencil" | "eraser";
};

export interface Artifact {
  id: number;
  data: Stroke[];
  created_at: string;
  title?: string;
}

export interface DrawingContextType {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  tool: "pencil" | "eraser";
  toggleFullScreen: () => void;
  setTool: (tool: "pencil" | "eraser") => void;
  currentArtifactData: Stroke[];
  setCurrentArtifact: React.Dispatch<React.SetStateAction<Stroke[]>>;
  setCurrentArtifactDetails: React.Dispatch<
    React.SetStateAction<Artifact | null>
  >;
  artifacts: Artifact[];
  addSavedDrawing: (drawing: Stroke[]) => void;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  loadDrawing: (index: Artifact["id"]) => void;
  currentArtifactDetails: Artifact | null;
  drawingTitle: string;
  setDrawingTitle: React.Dispatch<React.SetStateAction<string>>;
  createNewDrawing: () => void;
  fetchDataOnLoad: () => Promise<void>;
}

export enum COOKIE_KEYS {
  drawing = "drawing:all",
}
