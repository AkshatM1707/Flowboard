// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "./types/canvas";

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: { x: number; y: number } | null;
      selection: string[];
      pencilDraft?: number[][];
      penColor?: { r: number; g: number; b: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>;
      layerIds: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        name: string;
        picture: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {};

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {};
  }
}

export {};
