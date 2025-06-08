"use client";


import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { root } from "postcss";
import {memo} from "react";
import { Rectangle } from "./rectangle";
import { Text } from "./text";

interface LayerPreviewProps {
    id : string ;
    onLayerPointerDown : (e: React.PointerEvent, layerId:string) => void;

    selectionColor ?: string ;
}
export const LayerPreview =memo(({
    id,
    onLayerPointerDown,
    selectionColor
}:LayerPreviewProps) => {
    const layer =useStorage((root)=>root.layers.get(id));
    if(!layer){
        return null ;
    }
    
    switch(layer.type){
        case LayerType.Text:
            return(
                <Text
                id = {id}
                layer = {layer}
                onPointerDown = {onLayerPointerDown}
                selectionColor = {selectionColor}
                />
            ) ;
        case LayerType.Rectangle:
            return(
                <Rectangle 
                id = {id}
                layer = {layer}
                onPointerDown = {onLayerPointerDown}
                selectionColor = {selectionColor}
                />
                
            );
            default:
                console.warn("Unknown layer type",layer.type);
                return null;
    }
});

LayerPreview.displayName = "LayerPreview";