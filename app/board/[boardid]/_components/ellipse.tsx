import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      onPointerDown={(e) => onPointerDown(e, id)}
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCss(fill) : "#CCC"}
      stroke={selectionColor || "transparent"}
      strokeWidth={selectionColor ? "2" : "0"}
    />
  );
};
