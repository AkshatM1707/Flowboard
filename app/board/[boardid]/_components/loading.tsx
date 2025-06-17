"use client";
import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <main className="fixed inset-0 flex touch-none items-center justify-center bg-neutral-100">
      <Loader className="h-10 w-10 animate-spin text-gray-500" />

      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
