import React, { createContext, useContext } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Create a context to track whether Convex is available
const ConvexAvailabilityContext = createContext(false);

// Hook to check if Convex is available
export const useConvexAvailable = () => useContext(ConvexAvailabilityContext);

// Function to get the Convex URL from various possible sources
function getConvexUrl() {
  // Check for hardcoded URL in .env file
  if (process.env.REACT_APP_CONVEX_URL) {
    return process.env.REACT_APP_CONVEX_URL;
  }

  // Try to extract from the window.location if we're in a browser
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    // If we're on localhost, use the dev URL
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "https://valiant-lemur-724.convex.cloud";
    }
  }

  // Fallback to a hardcoded value for production
  return "https://valiant-lemur-724.convex.cloud";
}

// Try to initialize the Convex client
let convex = null;
try {
  const convexUrl = getConvexUrl();
  if (convexUrl) {
    convex = new ConvexReactClient(convexUrl);
  }
} catch (error) {
  console.error("Failed to initialize Convex client:", error);
}

export function ConvexClientProvider({ children }) {
  // Check if Convex is available
  const isConvexAvailable = !!convex;

  // If Convex is not available, just render the children without the ConvexProvider
  // This allows the public parts of the site to work without Convex
  if (!isConvexAvailable) {
    console.warn(
      "Convex client not initialized. Admin features will not work, but public site should function."
    );
    return (
      <ConvexAvailabilityContext.Provider value={false}>
        {children}
      </ConvexAvailabilityContext.Provider>
    );
  }

  // If Convex is available, wrap children with the ConvexProvider
  return (
    <ConvexAvailabilityContext.Provider value={true}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ConvexAvailabilityContext.Provider>
  );
}
