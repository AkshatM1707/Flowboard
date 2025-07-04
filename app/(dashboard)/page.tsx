"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { MobileOptimization } from "@/components/mobile-optimization";

const DashboardPage = () => {
  const { organization } = useOrganization();

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
