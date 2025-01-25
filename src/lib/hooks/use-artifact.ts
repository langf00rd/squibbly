import { useState } from "react";
import { deleteArtifactByID } from "../actions/artifacts";
import { useDrawingContext } from "../contexts/drawing-context";
import { Artifact } from "../generics";
import { toast } from "./use-toast";

export default function useArtifact() {
  const { artifacts, loadDrawing, fetchDataOnLoad, currentArtifactDetails } =
    useDrawingContext();
  const [isDeletingArtifact, setIsDeletingArtifact] = useState(false);

  async function deleteArtifact(id: Artifact["id"]) {
    try {
      setIsDeletingArtifact(true);
      await deleteArtifactByID(id);
      await fetchDataOnLoad();
      if (currentArtifactDetails?.id === id) loadDrawing(artifacts[0].id); // load the first artifact if the current loaded one is deleted
      toast({
        description: "deleted, gone forever",
      });
    } catch (err) {
      toast({
        description: String(err),
      });
    } finally {
      setIsDeletingArtifact(false);
    }
  }

  return { deleteArtifact, isDeletingArtifact };
}
