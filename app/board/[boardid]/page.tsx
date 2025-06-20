"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Canvas } from "./_components/canvas";
import { Room } from "@/app/room";
import { Loading } from "./_components/loading";

interface BoardIdPageProps {
  params: Promise<{
    boardid: string;
  }>;
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const resolvedParams = use(params);

  // More robust boardId validation
  const rawBoardId = resolvedParams?.boardid;
  const boardId = rawBoardId && rawBoardId !== "undefined" && rawBoardId.trim() !== "" 
    ? rawBoardId as Id<"boards"> 
    : undefined;

  const data = useQuery(
    api.board.get,
    boardId ? { id: boardId } : "skip"
  );

  if (!boardId || data === undefined) {
    return <Loading />;
  }

  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
};

export default BoardIdPage;