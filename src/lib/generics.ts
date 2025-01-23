export type Stroke = {
  path: { x: number; y: number }[];
  color: string;
  brushSize: number;
  tool: "pencil" | "eraser";
};

export interface Drawing {
  id: string;
  data: Stroke[];
  created: string;
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
    React.SetStateAction<Drawing | null>
  >;
  savedDrawings: Drawing[];
  addSavedDrawing: (drawing: Stroke[]) => void;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  loadDrawing: (index: Drawing["id"]) => void;
  currentDrawingDetails: Drawing | null;
  drawingTitle: string;
  setDrawingTitle: React.Dispatch<React.SetStateAction<string>>;
  createNewDrawing: () => void;
}
