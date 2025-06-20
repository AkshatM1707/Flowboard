"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
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

  // Inject keyframes dynamically since no global CSS is used
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes orb1 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 20px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }
      @keyframes orb2 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-30px, -20px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const search = useMemo(
    () => searchParams.get("search") || undefined,
    [searchParams]
  );
  const favorites = useMemo(
    () => searchParams.get("favorites") || undefined,
    [searchParams]
  );

  const data = useQuery(api.boards.get, { orgId, search, favorites });

  if (data === undefined) {
    return (
      <div className="relative">
        {/* Beautiful Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "orb1 12s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ animation: "orb2 10s ease-in-out infinite" }}
          />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl">
            {favorites ? "Favorite Boards" : "Team Boards"}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <NewBoardButton orgId={orgId} disabled />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!data?.length && search) {
    return <EmptySearch />;
  }

  if (!data?.length && favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div className="relative">
      
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ animation: "orb1 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ animation: "orb2 10s ease-in-out infinite" }}
        />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl">
          {favorites ? "Favorite Boards" : "Team Boards"}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
              isFavorite={board.isFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
