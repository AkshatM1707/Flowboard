"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star, Sparkles, Grid3X3 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden h-screen w-[280px] flex-col space-y-8 p-6 lg:flex relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/20" />
      
      <div className="relative z-10 space-y-8">
        {/* Logo Section */}
        <Link href="/" className="group">
  <div className="flex items-center gap-x-3 p-3 rounded-2xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-slate-700/30">
    <div className="relative">
      {/* Removed gradient background div */}
      <Image src="/logo.svg" alt="logo" height={60} width={60} className="relative z-10" />
    </div>
    <span className={cn(
      "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300",
      font.className
    )}>
      Board
    </span>
  </div>
</Link>


        {/* Organization Switcher */}
        <div className="space-y-3">
          <div className="flex items-center gap-x-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Sparkles className="h-4 w-4" />
            <span>Workspace</span>
          </div>
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                },
                organizationSwitcherTrigger: {
                  padding: "12px 16px",
                  width: "100%",
                  borderRadius: "16px",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  },
                },
              },
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
            Navigation
          </div>
          
          <Button
            variant={favorites ? "ghost" : "secondary"}
            asChild
            size="lg"
            className={cn(
              "w-full justify-start px-4 py-3 h-auto font-medium rounded-xl transition-all duration-300",
              !favorites 
                ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-md hover:from-blue-100 hover:to-blue-150 dark:hover:from-blue-900/70 dark:hover:to-blue-800/70" 
                : "hover:bg-white/50 dark:hover:bg-slate-700/30 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <Link href="/" className="flex items-center w-full">
              <div className={cn(
                "mr-3 p-1.5 rounded-lg transition-colors",
                !favorites ? "bg-blue-200/50 dark:bg-blue-800/50" : ""
              )}>
                <LayoutDashboard className="h-4 w-4" />
              </div>
              Team Boards
            </Link>
          </Button>

          <Button
            variant={favorites ? "secondary" : "ghost"}
            asChild
            size="lg"
            className={cn(
              "w-full justify-start px-4 py-3 h-auto font-medium rounded-xl transition-all duration-300",
              favorites 
                ? "bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 shadow-sm hover:shadow-md hover:from-amber-100 hover:to-orange-150 dark:hover:from-amber-900/70 dark:hover:to-orange-800/70" 
                : "hover:bg-white/50 dark:hover:bg-slate-700/30 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            <Link
              href={{
                pathname: "/",
                query: { favorites: true },
              }}
              className="flex items-center w-full"
            >
              <div className={cn(
                "mr-3 p-1.5 rounded-lg transition-colors",
                favorites ? "bg-amber-200/50 dark:bg-amber-800/50" : ""
              )}>
                <Star className="h-4 w-4" />
              </div>
              Favorite Boards
            </Link>
          </Button>
        </div>

        {/* Stats or Additional Info */}
<div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
  <div className="grid grid-cols-1 gap-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 col-span-full">
      Quick Stats
    </div>

    {/* Tip 1 */}
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Create, collaborate, and innovate with your team in real-time.
    </div>

    {/* Tip 2 */}
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex items-center gap-2">
      <Star className="h-4 w-4 text-amber-500" />
      You can favorite boards by clicking the star icon on them.
    </div>

    {/* Tip 3 */}
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Switch between multiple workspaces using the workspace switcher .
    </div>

    {/* Tip 4 */}
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Organize your boards into teams for better project management.
    </div>

    {/* Tip 5
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Drag and move elements on boards effortlessly—just like sticky notes.
    </div> */}

    {/* Tip 6 */}
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Hover over board tiles for quick actions like renaming or deleting.
    </div>

    {/* Tip 7
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      Enjoy smooth cross-device collaboration—your boards stay synced everywhere.
    </div> */}
  </div>
</div>

      </div>
    </div>
  );
};