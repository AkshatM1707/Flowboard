"use client";

import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  const handleClick = () => {
    // console.log("ToolButton clicked:", label);
    onClick();
  };
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={handleClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
