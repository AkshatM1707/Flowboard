"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Canvas } from "./_components/canvas";
import { Room } from "@/app/room";
import { Loading } from "./_components/loading";
import { use } from "react";

interface BoardIdPageProps {
    params: Promise<{
        boardid: string;
    }>;
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
    const resolvedParams = use(params);

    console.log("Resolved Params:", resolvedParams);
    console.log("Board ID:", resolvedParams.boardid);

    if (!resolvedParams.boardid) {
        return <div>No board ID found</div>;
    }

    const data = useQuery(api.board.get, {
        id: resolvedParams.boardid as Id<"boards">,
    });

    if (!data) return <Loading />;

    return (
        <Room roomId={resolvedParams.boardid} fallback={<Loading />}>
            <Canvas boardId={resolvedParams.boardid} />
        </Room>
    );
};

export default BoardIdPage;
