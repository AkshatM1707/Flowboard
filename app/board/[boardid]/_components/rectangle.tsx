import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Rectangle = ({ id, layer, onPointerDown, selectionColor }) => {
    const { x, y, width, height, fill } = layer;

    return (
        <rect
            className="drop-shadow-md pointer-events-auto"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            fill={fill ? `rgb(${fill.r}, ${fill.g}, ${fill.b})` : "#000"}
            stroke={selectionColor || "transparent"}
            strokeWidth="1"
        />
    );
};
