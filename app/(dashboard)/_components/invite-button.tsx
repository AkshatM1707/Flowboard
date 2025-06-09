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
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
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