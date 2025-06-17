import { colorToCss } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, textColor, fontSize, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <div
        className="h-full w-full rounded-lg p-3 text-sm shadow-lg"
        style={{
          backgroundColor: fill ? colorToCss(fill) : "#fef68a",
          border: selectionColor
            ? `2px solid ${selectionColor}`
            : "1px solid #d1d5db",
        }}
      >
        <div
          className="h-full w-full resize-none bg-transparent outline-none"
          style={{
            color: textColor ? colorToCss(textColor) : "#000",
            fontSize: fontSize || 14,
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateValue(e.currentTarget.textContent || "")}
        >
          {value || "Note"}
        </div>
      </div>
    </foreignObject>
  );
};
