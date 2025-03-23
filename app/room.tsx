"use client";


import { ReactNode } from "react";

import {

  LiveblocksProvider,

  RoomProvider,

  ClientSideSuspense,

} from "@liveblocks/react/suspense";

interface RoomProps {
    children : ReactNode 
    roomId: string ;
    fallback: NonNullable<ReactNode> | null ;
} ;


export const Room = ({ children , roomId , fallback }: RoomProps) => {

  return (

    <LiveblocksProvider publicApiKey={"pk_dev_5RaDfz5qep4yn-0JXNLngid4LWB1tpFt9GFgIHvo03AGm2Sr5VPU6_2dMglYQTaY"}>

      <RoomProvider id={roomId} initialPresence ={{}}>

        <ClientSideSuspense fallback={fallback}>

          {()=>children}

        </ClientSideSuspense>

      </RoomProvider>

    </LiveblocksProvider>

  );

}