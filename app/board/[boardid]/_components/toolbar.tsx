import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";




interface ToolbarProps{
    canvasState:CanvasState ;
    setCanvasState:(newState: CanvasState) => void ;
    undo : () => void 
    redo: () => void ;
    canUndo : boolean ;
    canRedo : boolean ;
} ;
export const Toolbar = ({
    canvasState, setCanvasState , undo , redo , canUndo , canRedo
}: ToolbarProps) => {
    return (
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-y-4">
            <div className="bg-white rounded-lg p-2 flex gap-y-2 flex-col items-center shadow-lg">
                <ToolButton
                label ="Select"
                icon = {MousePointer2}
                onClick={()=>setCanvasState({mode: CanvasMode.None, })}
                isActive={
                    canvasState.mode ===CanvasMode.None || 
                    canvasState.mode ===CanvasMode.Pressing || 
                    canvasState.mode ===CanvasMode.SelectionNet || 
                    canvasState.mode ===CanvasMode.Translating || 
                    canvasState.mode ===CanvasMode.Resizing
                                }
                />
                <ToolButton
                label ="Text"
                icon = {Type}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Text ,
                })}
                isActive={
                    canvasState.mode ===CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Text
                }
                />
                <ToolButton
                label ="Sticky Note"
                icon = {StickyNote}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Note ,
                })}
                isActive={
                    canvasState.mode ===CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Note
                }
                />
                <ToolButton
                label ="Rectangle"
                icon = {Square}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Rectangle ,
                })}
                isActive={
                    canvasState.mode ===CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Rectangle
                }
                />
                <ToolButton
                label ="Ellipse"
                icon = {Circle}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Ellipse ,
                })}
                isActive={
                    canvasState.mode ===CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Ellipse
                }
                />
                <ToolButton
                label ="Pen"
                icon = {Pencil}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Pencil,
                    
                })}
                isActive={
                    canvasState.mode ===CanvasMode.Pencil
                }
                />
                </div>
            <div className ="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
            <ToolButton
                label ="Undo"
                icon = {Undo2}
                onClick={undo}
                isDisabled={!canUndo}
                />
                <ToolButton
                label ="Redo"
                icon = {Redo2}
                onClick={redo}
                isDisabled={!canRedo}
                />

            </div>
        </div>
    );
};


export const ToolbarSkeleton = () => {
    return (
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md"
        >
        </div>

    ) ;

}