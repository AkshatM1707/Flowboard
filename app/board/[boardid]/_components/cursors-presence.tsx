"use cilent";
import { memo } from "react";
import { useOthers, useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";

const Cursors =() => {
    const ids = useOthersConnectionIds() ;
    
    return(
        <>
        {ids.map((connectionId)=>{
            <Cursor 
            key = {connectionId}
            connectionId={connectionId} />
        })}
        </>
    )
}


export const CursorsPresence = memo(() => {
    const others = useOthers() ;
    return (
        <div>
            <Cursors />
        </div>
    );
});

CursorsPresence.displayName="CursorsPresence";