import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDrawingContext } from "@/lib/contexts/drawing-context";
import { Artifact } from "@/lib/generics";
import useArtifact from "@/lib/hooks/use-artifact";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ArtifactsList() {
  const { deleteArtifact, isDeletingArtifact } = useArtifact();
  const { artifacts, loadDrawing, currentArtifactDetails } =
    useDrawingContext();

  return (
    <div className="space-y-3">
      <p className="font-semibold">Your saved squibbles</p>
      {artifacts.length < 1 && (
        <p className="text-sm">No saved squibbles yet :(</p>
      )}
      <ul className="space-y-3">
        {artifacts.map((artifact) => (
          <ArtifactItem
            onDelete={deleteArtifact}
            isDeleting={isDeletingArtifact}
            currentArtifactDetails={currentArtifactDetails}
            onSelect={loadDrawing}
            artifact={artifact}
            key={artifact.id}
          />
        ))}
      </ul>
    </div>
  );
}

function ArtifactItem(props: {
  onDelete: (artifact: Artifact["id"]) => void;
  isDeleting: boolean;
  currentArtifactDetails: Artifact | null;
  onSelect: (artifact: Artifact["id"]) => void;
  artifact: Artifact;
}) {
  return (
    <div className="flex items-center justify-between">
      <p
        role="button"
        onClick={() => props.onSelect(props.artifact.id)}
        style={{
          color:
            props.currentArtifactDetails?.id === props.artifact.id
              ? "var(--primary)"
              : "",
        }}
      >
        {props.artifact.title || props.artifact.id}
      </p>
      <Dialog>
        <DialogTrigger>
          <TrashIcon size={14} className="hover:text-destructive" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>are you absolutely sure?</DialogTitle>
            <DialogDescription>
              this action cannot be undone. This will permanently delete your
              squibble and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => props.onDelete(props.artifact.id)}
              isLoading={props.isDeleting}
            >
              Yes, delete :(
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
