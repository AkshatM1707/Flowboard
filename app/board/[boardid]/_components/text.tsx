import { colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
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
        className="h-full w-full flex items-center justify-center text-center outline-none font-medium"
        style={{
          fontSize: fontSize || Math.min(width, height) * 0.15,
          color: textColor
            ? colorToCss(textColor)
            : fill
            ? colorToCss(fill)
            : "#000",
          border: selectionColor ? `2px solid ${selectionColor}` : "none",
          backgroundColor: "transparent",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontStyle: "italic",
          letterSpacing: "0.025em",
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateValue(e.currentTarget.textContent || "")}
      >
        {value || "Text"}
      </div>
    </foreignObject>
  );
};
