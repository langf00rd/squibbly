export interface User {
  id: number;
  email: string;
  created_at: string;
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
  currentDrawing: Stroke[];
  setCurrentDrawing: React.Dispatch<React.SetStateAction<Stroke[]>>;
  setCurrentDrawingDetails: React.Dispatch<
    React.SetStateAction<Artifact | null>
  >;
  savedDrawings: Artifact[];
  addSavedDrawing: (drawing: Stroke[]) => void;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  loadDrawing: (index: Artifact["id"]) => void;
  currentDrawingDetails: Artifact | null;
  drawingTitle: string;
  setDrawingTitle: React.Dispatch<React.SetStateAction<string>>;
  createNewDrawing: () => void;
}

export enum COOKIE_KEYS {
  drawing = "drawing:all",
}
