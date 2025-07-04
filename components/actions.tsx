"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ConfirmModal } from "./confirm-model";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { useRouter } from "next/navigation";
interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionProps) => {
  const router = useRouter();
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);
  
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link Copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    toast.loading("Deleting board...", { id: "delete-board" });
    
    mutate({ id })
      .then(() => {
        toast.success("Board Deleted", { id: "delete-board" });
        // Use window.location.href to ensure a full page load
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Delete error:", error);
        if (error.message?.includes("Unauthorized") || error.message?.includes("authentication")) {
          toast.error("Authentication issue. Please try again.", { id: "delete-board" });
        } else {
          toast.error("Failed to delete board", { id: "delete-board" });
        }
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span>{children}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="cursor-pointer p-3">
          <Link2 className="mr-2 h-4 w-4" />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="cursor-pointer p-3"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Board?"
          description="This will delete the board and all of its contents."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start p-3 text-sm font-normal"
            disabled={pending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
