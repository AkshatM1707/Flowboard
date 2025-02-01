"use client";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    const { organization } = useOrganization();
    const { user } = useUser();

    // Log user information for debugging
    useEffect(() => {
        console.log("Current User:", user);
    }, [user]);

    return (
        <div className="flex items-center gap-x-4 p-5">
            {/* Search Input for large screens */}
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>

            {/* Organization Switcher for small screens */}
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "370px",
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #E5E5E5",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                            },
                        },
                    }}
                />
            </div>

            {/* Invite Button if an organization is selected */}
            {organization ? (
                <InviteButton />
            ) : (
                <p className="text-sm text-gray-500">No organization selected</p>
            )}

            {/* User Button */}
            <UserButton />
        </div>
    );
};
