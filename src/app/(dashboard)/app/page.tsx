import ArtifactNameInput from "@/components/artifact-name";
import DrawingCanvas from "@/components/canvas";
import More from "@/components/more";
import NewButton from "@/components/new-button";
import SaveButton from "@/components/save-button";
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
      <div className="absolute top-0 left-0 p-3">
        <ArtifactNameInput />
      </div>
      <div className="absolute top-0 right-0 p-3 flex gap-3">
        <NewButton />
        <SaveButton />
        <More />
      </div>
      <div className="absolute bottom-0 left-0 p-3">
        <ToolSelector />
      </div>
      <div className="absolute bottom-0 right-0 p-3 flex gap-3">
        <Toolbar />
      </div>
    </main>
  );
}
