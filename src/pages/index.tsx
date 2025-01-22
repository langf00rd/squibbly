import DrawingCanvas from "@/lib/components/canvas";
import SaveButton from "@/lib/components/save-button";
import ToolSelector from "@/lib/components/tool-selector";
import Toolbar from "@/lib/components/toolbar";
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
      <div className="absolute top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm p-4 flex justify-between items-center">
        <ToolSelector />
        <Toolbar />
        <SaveButton />
      </div>
    </main>
  );
}
