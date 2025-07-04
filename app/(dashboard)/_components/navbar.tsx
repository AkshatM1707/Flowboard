"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [previousOrgId, setPreviousOrgId] = useState<string | null>(null);

  // Handle organization changes - refresh when org switches
  useEffect(() => {
    if (organization?.id && previousOrgId && organization.id !== previousOrgId) {
      // Organization changed, refresh the page
      console.log("Organization changed from", previousOrgId, "to", organization.id);
      // Clear any search parameters when switching organizations
      const currentUrl = new URL(window.location.href);
      currentUrl.search = '';
      window.location.href = currentUrl.toString();
    }
    if (organization?.id) {
      setPreviousOrgId(organization.id);
    }
  }, [organization?.id, previousOrgId]);

  // Log user information for debugging
  useEffect(() => {
    console.log("Current User:", user);
    console.log("Current Organization:", organization);
  }, [user, organization]);

  return (
    <>
      <div className="flex items-center gap-x-2 md:gap-x-4 p-3 md:p-5">
        {/* Search Input - Takes available space but has max width */}
        <div className="flex-1 lg:max-w-md">
          <SearchInput />
        </div>

        {/* Organization Switcher for small screens (tablet/mobile) */}
        <div className="block lg:hidden">
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/"
            afterCreateOrganizationUrl="/"
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  minWidth: "120px",
                },
                organizationSwitcherTrigger: {
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: "1px solid #E5E5E5",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  fontSize: "12px",
                },
              },
            }}
          />
        </div>

        {/* Spacer to push buttons to the right on desktop */}
        <div className="hidden lg:block flex-1"></div>

        {/* Invite Button if an organization is selected */}
        {organization && (
          <div className="hidden md:block">
            <InviteButton />
          </div>
        )}

        {/* User Button */}
        <div className="flex-shrink-0">
          <UserButton />
        </div>
      </div>

    </>
  );
};
