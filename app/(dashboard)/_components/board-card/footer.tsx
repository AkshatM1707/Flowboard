import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };
  return (
    <div className="group relative bg-white p-2 md:p-3">
      <p className="max-w-[calc(100%-20px)] truncate text-xs md:text-[13px] font-medium">{title}</p>
      <p className="truncate text-[10px] md:text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        aria-label="Favorite"
        className={cn(
          "absolute right-2 top-2 md:right-3 md:top-3 text-muted-foreground opacity-0 transition-opacity hover:text-blue-600 group-hover:opacity-100 touch-manipulation",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className="h-3 w-3 md:h-4 md:w-4"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
        />
      </button>
    </div>
  );
};
