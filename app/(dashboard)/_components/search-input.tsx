"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import queryString from "query-string";

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (isMobile) {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setValue("");
  };

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  // Mobile expanded search in navbar
  if (isMobile && isExpanded) {
    return (
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm">
        <div className="flex items-center p-4 gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              className="w-full pl-9 pr-4 border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-200"
              placeholder="Search boards..."
              onChange={handleChange}
              value={value}
              autoFocus
            />
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {value && (
          <div className="px-4 pb-3 border-t bg-blue-50">
            <div className="py-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-800">
                Searching for "<span className="font-medium">{value}</span>"
              </p>
            </div>
            <p className="text-xs text-blue-600">
              Close search to see results below
            </p>
          </div>
        )}
      </div>
    );
  }

  // Desktop version or mobile collapsed
  return (
    <div className="relative w-full">
      {isMobile ? (
        // Mobile search button
        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
          aria-label="Search boards"
        >
          <Search className="h-4 w-4 text-gray-600" />
        </button>
      ) : (
        // Desktop search input
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            className={`w-full max-w-[516px] pl-9 transition-all duration-200 rounded-xl ${
              value 
                ? 'border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-200 bg-blue-50' 
                : 'border-gray-200 focus:border-gray-300'
            }`}
            placeholder="Search boards"
            onChange={handleChange}
            value={value}
          />
          {value && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs text-blue-600 font-medium">
                {value.length > 0 ? 'Searching...' : ''}
              </span>
              <button
                onClick={() => setValue("")}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
