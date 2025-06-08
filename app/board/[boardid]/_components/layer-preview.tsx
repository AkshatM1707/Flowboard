"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    const commonProps = {
      id,
      layer,
      onPointerDown: onLayerPointerDown,
      selectionColor,
    };

    switch (layer.type) {
      case LayerType.Path:
        return <Path {...commonProps} />;
      case LayerType.Rectangle:
        return <Rectangle {...commonProps} />;
      case LayerType.Ellipse:
        return <Ellipse {...commonProps} />;
      case LayerType.Text:
        return <Text {...commonProps} />;
      case LayerType.Note:
        return <Note {...commonProps} />;
      default:
        console.warn("Unknown layer type", layer.type);

        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
