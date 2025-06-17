"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%-80px)] flex-1 p-6">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} />}
    </div>
  );
};

export default DashboardPage;
