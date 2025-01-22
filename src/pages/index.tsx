import DrawingCanvas from "@/components/canvas";
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
      <div className="absolute p-3 top-0 left-0 right-0 flex justify-between items-center">
        <ToolSelector />
        <Toolbar />
        <div className="flex gap-3">
          <SaveButton />
          <SavedDrawingsButton />
        </div>
      </div>
    </main>
  );
}
