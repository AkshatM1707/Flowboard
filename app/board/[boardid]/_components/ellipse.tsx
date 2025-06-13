import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {
  const { x, y, width, height, fill } = layer;
  const isSelected = selectionColor && selectionColor !== "transparent";

  return (
    <ellipse
      onPointerDown={(e) => onPointerDown(e, id)}
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
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
