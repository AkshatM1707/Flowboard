import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;
  const isSelected = selectionColor && selectionColor !== "transparent";

  return (
    <rect
      onPointerDown={(e) => onPointerDown(e, id)}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill ? colorToCss(fill) : "#CCC"}
      stroke={selectionColor || "transparent"}
      strokeWidth={isSelected ? "3" : "0"}
      strokeDasharray={isSelected ? "5,5" : "none"}
      filter={
        isSelected ? "drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))" : "none"
      }
    />
  );
};
