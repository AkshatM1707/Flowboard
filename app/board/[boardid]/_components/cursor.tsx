// cursor.tsx
"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence?.cursor);

  // Don't render if cursor is null or undefined
  if (!cursor) return null;

  const { x, y } = cursor;
  const name = info?.name || "Teammate";
  const color = connectionIdToColor(connectionId);

  return (
    <foreignObject
      x={x}
      y={y}
      width={name.length * 10 + 24}
      height={50}
      className="overflow-visible"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative flex items-center">
        <MousePointer2
          className="h-5 w-5"
          style={{
            fill: color,
            color: color,
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="absolute left-5 top-5 px-1.5 py-0.5 rounded text-xs text-white font-semibold whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {name}
        </div>
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
