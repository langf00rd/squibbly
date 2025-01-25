import { useDrawingContext } from "@/lib/contexts/drawing-context";

export default function ArtifactsList() {
  const { artifacts, loadDrawing, currentArtifactDetails } =
    useDrawingContext();
  return (
    <div className="space-y-3">
      <p className="font-semibold">Your saved squibbles</p>
      {artifacts.length < 1 && (
        <p className="text-sm">No saved squibbles yet :(</p>
      )}
      <ul className="space-y-3">
        {artifacts.map((drawing) => (
          <li
            key={drawing.id}
            className="flex items-center gap-1"
            role="button"
            onClick={() => loadDrawing(drawing.id)}
          >
            <p
              style={{
                color:
                  currentArtifactDetails?.id === drawing.id
                    ? "var(--primary)"
                    : "",
              }}
            >
              {drawing.title} #{drawing.id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
