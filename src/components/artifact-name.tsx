"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";

export default function ArtifactNameInput() {
  const { artifacts, currentArtifactDetails, setDrawingTitle } =
    useDrawingContext();
  return (
    <>
      <input
        type="text"
        className="p-2"
        placeholder="Untitled Artifact"
        defaultValue={
          currentArtifactDetails && currentArtifactDetails?.title
            ? currentArtifactDetails?.title
            : `squibble #${artifacts.length + 1}`
        }
        onChange={(evt) => {
          setDrawingTitle(evt.target.value);
        }}
      />
    </>
  );
}
