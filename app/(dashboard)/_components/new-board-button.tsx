"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    toast.loading("Creating board...", { id: "create-board" });
    
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        console.log("Board created with ID:", id);
        toast.success("Board created successfully", { id: "create-board" });
        
        if (id) {
          // Use window.location.href to ensure a full page load with proper auth sync
          window.location.href = `/board/${id}`;
        } else {
          toast.error("Failed to get board ID", { id: "create-board" });
        }
      })
      .catch((err) => {
        console.error("Failed to create board", err);
        toast.error("Failed to create board", { id: "create-board" });
      });
  };
  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-4 md:py-6 hover:bg-blue-800 transition-colors touch-manipulation",
        (pending || disabled) &&
          "cursor-not-allowed opacity-75 hover:bg-blue-600"
      )}
    >
      <div />
      <Plus className="h-8 w-8 md:h-12 md:w-12 stroke-1 text-white" />
      <p className="text-xs md:text-sm font-light text-white mt-1 md:mt-2">New Board</p>
    </button>
  );
};
