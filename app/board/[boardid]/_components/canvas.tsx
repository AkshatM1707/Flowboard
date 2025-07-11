"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "@liveblocks/react/suspense";
import { useCallback, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { CursorsPresence } from "./cursors-presence";
import {
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  pointerEventToCanvasPoint,
  resizeBounds,
  colorToCss,
} from "@/lib/utils";

import { useOthersMapped, useStorage, useSelf } from "@liveblocks/react";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { ColorPicker } from "./color-picker";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 252,
    g: 142,
    b: 42,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<number[][]>([]);
  // const [zoom, setZoom] = useState(1);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const pencilDraft = useSelf((self) => self.presence.pencilDraft);
  const selection = useSelf((self) => self.presence.selection);
  // const info = useSelf((self) => self.info);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState]
  );

  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const resizeSelectedLayer = useMutation(
    ({ self, storage }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const startDrawing = useMutation(({ setMyPresence }, point: Point) => {
    setIsDrawing(true);
    const newPath = [[point.x, point.y]];
    setCurrentPath(newPath);
    setMyPresence({ pencilDraft: newPath });
  }, []);

  const continueDrawing = useMutation(
    ({ setMyPresence }, point: Point) => {
      if (!isDrawing || canvasState.mode !== CanvasMode.Pencil) return;

      const newPath = [...currentPath, [point.x, point.y]];
      setCurrentPath(newPath);
      setMyPresence({ pencilDraft: newPath });
    },
    [isDrawing, currentPath, canvasState.mode]
  );

  const finishDrawing = useMutation(
    ({ storage, setMyPresence }) => {
      if (!isDrawing || currentPath.length < 2) {
        setIsDrawing(false);
        setCurrentPath([]);
        setMyPresence({ pencilDraft: undefined });
        return;
      }

      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      if (liveLayers.size >= MAX_LAYERS) {
        setIsDrawing(false);
        setCurrentPath([]);
        setMyPresence({ pencilDraft: undefined });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject({
          type: LayerType.Path,
          x: 0,
          y: 0,
          width: 1,
          height: 1,
          fill: lastUsedColor,
          points: currentPath,
          value: undefined,
        })
      );

      liveLayerIds.push(id);
      setMyPresence({ pencilDraft: undefined });
      setIsDrawing(false);
      setCurrentPath([]);
    },
    [isDrawing, currentPath, lastUsedColor]
  );

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point) => {
      const layers = storage.get("layers").toImmutable();

      // Get the origin from canvasState if it exists, otherwise use current point
      const origin =
        canvasState.mode === CanvasMode.Pressing ||
        canvasState.mode === CanvasMode.SelectionNet
          ? canvasState.origin
          : current;

      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds || [],
        layers,
        origin,
        current
      );

      setMyPresence({ selection: ids });
    },
    [layerIds, canvasState]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pencil && isDrawing) {
        continueDrawing(current);
      } else if (canvasState.mode === CanvasMode.Pressing) {
        updateSelectionNet(current);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [
      camera,
      canvasState,
      isDrawing,
      continueDrawing,
      translateSelectedLayer,
      updateSelectionNet,
      resizeSelectedLayer,
    ]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pencil && isDrawing) {
        finishDrawing();
      } else if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayer();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [
      camera,
      canvasState,
      isDrawing,
      finishDrawing,
      history,
      insertLayer,
      unselectLayer,
      setCanvasState,
    ]
  );

  const onLayerPointerDown = useMutation(
    (
      { self, setMyPresence, storage },
      e: React.PointerEvent,
      layerId: string
    ) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      if (canvasState.mode === CanvasMode.Eraser) {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");
        liveLayers.delete(layerId);
        const index = liveLayerIds.indexOf(layerId);
        if (index !== -1) {
          liveLayerIds.delete(index);
        }
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });

        const liveLayerIds = storage.get("layerIds");
        const arr = liveLayerIds.toImmutable();
        const currentIndex = arr.indexOf(layerId);

        if (currentIndex !== -1 && currentIndex !== arr.length - 1) {
          liveLayerIds.move(currentIndex, arr.length - 1);
        }
      }
      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  // Additional hooks
  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point);
        return;
      }

      setCanvasState({
        origin: point,
        mode: CanvasMode.Pressing,
      });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  if (layerIds === null) {
    return (
      <main className="relative h-full w-full touch-none bg-neutral-100">
        <Info boardId={boardId} />
        <Participants />
        <div className="flex h-full items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </main>
    );
  }

  const selectionNet =
    canvasState.mode === CanvasMode.SelectionNet ? canvasState : null;

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      {canvasState.mode === CanvasMode.Pencil && (
        <div className="absolute left-20 top-20 z-50 flex items-center gap-2 rounded-lg border bg-white p-2 shadow-sm">
          <span className="text-xs text-gray-600">Pen Color</span>
          <ColorPicker onChange={setLastUsedColor} />
        </div>
      )}

      <div className="absolute bottom-4 right-4 rounded-lg border bg-white p-2 text-xs text-gray-600 shadow-sm">
        100%
      </div>

      <svg
        className="h-full w-full"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={
                selection?.includes(layerId)
                  ? "#0ea5e9"
                  : layerIdsToColorSelection[layerId]
                    ? layerIdsToColorSelection[layerId]
                    : "transparent"
              }
            />
          )) || []}

          {(isDrawing || (pencilDraft && pencilDraft.length > 0)) && (
            <path
              d={`M ${(isDrawing ? currentPath : pencilDraft || []).map(([x, y]) => `${x},${y}`).join(" L ")}`}
              fill="none"
              stroke={colorToCss(lastUsedColor)}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          )}

          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {selectionNet && selectionNet.current && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(selectionNet.origin.x, selectionNet.current.x)}
              y={Math.min(selectionNet.origin.y, selectionNet.current.y)}
              width={Math.abs(selectionNet.origin.x - selectionNet.current.x)}
              height={Math.abs(selectionNet.origin.y - selectionNet.current.y)}
            />
          )}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
