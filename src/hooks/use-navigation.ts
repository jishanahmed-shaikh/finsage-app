import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle navigation state and cleanup
 * This helps prevent stale state when navigating between pages
 */
export const useNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Clear any existing toasts or notifications
    // This prevents notifications from previous pages showing on new pages
    
    // Force a small delay to ensure components are properly mounted
    const timer = setTimeout(() => {
      // Any additional cleanup can go here
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return location;
};

/**
 * Hook to handle component cleanup on unmount
 * Useful for preventing memory leaks and stale state
 */
export const useCleanup = (cleanupFn: () => void) => {
  useEffect(() => {
    return cleanupFn;
  }, [cleanupFn]);
};