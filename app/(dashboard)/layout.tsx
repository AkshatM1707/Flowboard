import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ConvexClientProvider>
      <main className="h-full ">
        <Sidebar />
        <div className="pl-[60px] h-full">
          <div className="flex gap-x-3 h-full">
            <OrgSidebar />
            <div className="h-full flex-1">
              <Navbar />

              <Toaster />
              <ModalProvider />
              {children}
            </div>
          </div>
        </div>
      </main>
    </ConvexClientProvider>
  );
};

export default DashboardLayout;
