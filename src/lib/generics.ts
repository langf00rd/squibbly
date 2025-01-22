export type Stroke = {
  path: { x: number; y: number }[];
  color: string;
  brushSize: number;
  tool: "pencil" | "eraser";
};

export interface Drawing {
  data: Stroke[];
  created: number;
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
  savedDrawings: Drawing[];
  addSavedDrawing: (drawing: Stroke[]) => void;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
  addStroke: (stroke: Stroke) => void;
  undo: () => void;
  redo: () => void;
  loadDrawing: (index: number) => void;
}
