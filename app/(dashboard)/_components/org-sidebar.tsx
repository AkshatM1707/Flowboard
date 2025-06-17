"use client";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";

import { useSearchParams } from "next/navigation";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden h-screen w-[206px] flex-col space-y-6 pl-5 pt-5  lg:flex">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn("text-2xl font-semibold", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyConetent: "center",
              alignItems: "center",
              width: "100%",
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
      <div className="w-full space-y-1">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Team Boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "outline"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link
            href={{
              pathname: "/",
              query: {
                favorites: true,
              },
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
