import DrawingCanvas from "@/components/canvas";
import ArtifactNameInput from "@/components/artifact-name";
import NewButton from "@/components/new-button";
import SaveButton from "@/components/save-button";
import More from "@/components/more";
import ToolSelector from "@/components/tool-selector";
import Toolbar from "@/components/toolbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "squibble canvas",
};

export default function Page() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <DrawingCanvas />
      <div className="absolute p-3 flex top-0 left-0 right-0 justify-between items-center">
        <ArtifactNameInput />
        <div className="flex gap-3">
          <NewButton />
          <SaveButton />
          <More />
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
