"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { MobileOptimization } from "@/components/mobile-optimization";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { organization, isLoaded } = useOrganization();
  const [orgError, setOrgError] = useState(false);

  // Handle organization loading errors with improved timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded && !orgError) {
        setOrgError(true);
      }
    }, 5000); // Increased timeout to handle RSC delays

    if (isLoaded) {
      setOrgError(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoaded, orgError]);

  // Show error state if organization fails to load
  if (orgError) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold">Authentication Error</h2>
          <p className="text-muted-foreground max-w-md">
            Unable to load organization information. Please check your authentication setup.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while organization is loading
  if (!isLoaded) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <MobileOptimization />
      <div className="h-full flex-1 p-3 md:p-6 overflow-y-auto">
        <div className="min-h-full">
          {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} />}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
