"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
}

export const BoardList = ({ orgId }: BoardListProps) => {
  const searchParams = useSearchParams();
  const search = useMemo(() => searchParams.get("search"), [searchParams]);
  const favorites = useMemo(() => searchParams.get("favorites"), [searchParams]);

  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {favorites ? "Favorite Boards" : "Team Boards"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  // If data is empty and search is active, show EmptySearch
  if (!data.length && search) {
    return <EmptySearch />;
  }

  // If data is empty and favorites is active, show EmptyFavorites
  if (!data.length && favorites) {
    return <EmptyFavorites />;
  }

  // If data is empty, show EmptyBoards
  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {favorites ? "Favorite Boards" : "Team Boards"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={favorites ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
