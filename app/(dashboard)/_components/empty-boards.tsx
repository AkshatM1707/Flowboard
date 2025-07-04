"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useApiMutation } from "@/hooks/use-api-mutation";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      title: "Untitled",
      orgId: organization.id,
    })
      .then((id) => {
        toast.success("Board Created");
        // Use window.location.href to ensure a full page load with proper auth sync
        window.location.href = `/board/${id}`;
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6 md:p-8">
      <Image src="/note.svg" height={110} width={110} alt="Empty" />
      <h2 className="mt-6 text-xl md:text-2xl font-semibold text-center">Create your first board!</h2>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        Start by creating a board for your organization to begin collaborating.
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg" className="touch-manipulation">
          {pending ? "Creating..." : "Create Board"}
        </Button>
      </div>
    </div>
  );
};
