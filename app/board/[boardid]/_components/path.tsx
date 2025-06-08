import { colorToCss } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";

interface PathProps {
  id: string;
  layer: PathLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Path = ({ id, layer, onPointerDown, selectionColor }) => {
  const { fill, points } = layer;

  if (!points.length) return null;

  const pathData = points.length > 1 
    ? `M ${points[0][0]},${points[0][1]} ${points.slice(1).map(([x, y]) => `L ${x},${y}`).join(" ")}`
    : `M ${points[0][0]},${points[0][1]}`;

  const isSelected = selectionColor && selectionColor !== "transparent";

  return (
    <g>
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        onPointerDown={(e) => onPointerDown(e, id)}
        className="pointer-events-auto cursor-pointer"
      />
      {/* Visible path */}
      <path
        d={pathData}
        fill="none"
        stroke={fill ? colorToCss(fill) : "#000"}
        strokeWidth={isSelected ? "4" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none"
        style={{
          filter: isSelected ? "drop-shadow(0 0 4px rgba(14, 165, 233, 0.5))" : "none",
        }}
      />
    </g>
  );
};
