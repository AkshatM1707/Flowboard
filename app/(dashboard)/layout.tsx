"use client";

import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Inject keyframes dynamically since no global CSS is used
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes orb1 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(50px, 30px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }
      @keyframes orb2 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-50px, -30px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ConvexClientProvider>
      <main className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Mobile/Tablet Sidebar - Hidden on mobile, overlay on tablet */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="h-full md:pl-[68px] transition-all duration-300 ease-in-out">
          <div className="flex h-full gap-x-0 md:gap-x-4">
            {/* Organization Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
              <OrgSidebar />
            </div>
            
            <div className="h-full flex-1 relative">
              {/* Beautiful Background */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-60" />

                {/* Dotted Pattern - Smaller on mobile */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Animated Blurred Orbs - Smaller on mobile */}
                <div
                  className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                  style={{ animation: "orb1 12s ease-in-out infinite" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                  style={{ animation: "orb2 10s ease-in-out infinite" }}
                />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <Navbar />
                <div className="flex-1 p-3 md:p-6 overflow-hidden">
                  <div className="h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden flex flex-col">
                    {children}
                  </div>
                </div>
              </div>

              <Toaster />
              <ModalProvider />
            </div>
          </div>
        </div>
      </main>
    </ConvexClientProvider>
  );
};

export default DashboardLayout;
