"use client";

import { useEffect, useState } from "react";
import { Smartphone, Monitor, Tablet, X, Info } from "lucide-react";

export const MobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store preference in localStorage
    localStorage.setItem("flowboard-mobile-warning-dismissed", "true");
  };

  const handleCollapse = () => {
    setIsCollapsed(true);
  };

  const handleExpand = () => {
    setIsCollapsed(false);
  };

  // Check if user has dismissed the warning before
  useEffect(() => {
    const dismissed = localStorage.getItem("flowboard-mobile-warning-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  if (!isMobile && !isTablet) return null;
  if (!isVisible) return null;

  // Collapsed banner
  if (isCollapsed) {
    return (
      <div className="sticky top-0 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200">
        <div className="flex items-center justify-between p-2 px-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-amber-800">
              {isMobile ? "Mobile" : "Tablet"} - Limited functionality
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExpand}
              className="text-xs text-amber-700 hover:text-amber-900 underline"
            >
              Learn more
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-amber-100 rounded"
            >
              <X className="h-3 w-3 text-amber-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded banner
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-amber-600" />
            ) : (
              <Tablet className="h-5 w-5 text-amber-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-amber-900 text-sm mb-1">
              {isMobile ? "Mobile" : "Tablet"} Experience Notice
            </h3>
            <p className="text-xs text-amber-800 mb-3">
              Flowboard is optimized for desktop use. While you can browse boards here, 
              the full editing experience works best on larger screens.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <Monitor className="h-3 w-3" />
              <span>Best on desktop • 1024px+ screen • Mouse/trackpad recommended</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCollapse}
              className="text-xs text-amber-700 hover:text-amber-900 underline"
            >
              Minimize
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-amber-100 rounded"
            >
              <X className="h-4 w-4 text-amber-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
