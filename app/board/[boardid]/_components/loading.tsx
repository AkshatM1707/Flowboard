"use client";
import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-neutral-100 touch-none">
      <Loader className="h-10 w-10 text-gray-500 animate-spin" />

      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
