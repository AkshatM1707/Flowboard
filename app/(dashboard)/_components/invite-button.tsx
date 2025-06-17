import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, // Add this import
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Add this import

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[880px] border-none bg-transparent p-0">
        {/* Add DialogTitle wrapped in VisuallyHidden for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Organization Management</DialogTitle>
        </VisuallyHidden>

        <OrganizationProfile
          routing="hash" // Add this to prevent navigation issues
          appearance={{
            elements: {
              rootBox: {
                boxShadow: "none",
                width: "100%",
              },
              card: {
                border: "1px solid #e5e5e5",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
