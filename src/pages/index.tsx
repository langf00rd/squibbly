import DrawingCanvas from "@/components/canvas";
import DrawingNameInput from "@/components/drawing-name-input";
import SaveButton from "@/components/save-button";
import SavedDrawingsButton from "@/components/saved-drawings-button";
import ToolSelector from "@/components/tool-selector";
import Toolbar from "@/components/toolbar";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`h-screen w-screen overflow-hidden ${geistMono.className}`}
    >
      <DrawingCanvas />
      <div className="absolute p-3 flex top-0 left-0 right-0 justify-between items-center">
        <DrawingNameInput />
        <div className="flex gap-3">
          <SaveButton />
          <SavedDrawingsButton />
        </div>
      </div>
      <div className="absolute p-3 flex bottom-0 left-0 right-0 justify-between items-center">
        <div className="flex gap-3">
          <ToolSelector />
        </div>
        <div className="flex gap-3">
          <Toolbar />
        </div>
      </div>
    </main>
  );
}
