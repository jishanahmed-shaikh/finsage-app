
import { useState, useEffect } from "react";

export type Viewport = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
};

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    // Set initial values
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        width,
        height
      });
    };
    
    // Initialize
    updateViewport();
    
    // Add event listener
    window.addEventListener("resize", updateViewport);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
}
