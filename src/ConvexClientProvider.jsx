// src/convex/ConvexClientProvider.jsx
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Function to get the Convex URL from various possible sources
function getConvexUrl() {
  // Check all possible environment variable locations
  if (typeof process !== "undefined" && process.env) {
    if (process.env.REACT_APP_CONVEX_URL) {
      return process.env.REACT_APP_CONVEX_URL;
    }
    if (process.env.NEXT_PUBLIC_CONVEX_URL) {
      return process.env.NEXT_PUBLIC_CONVEX_URL;
    }
  }

  // For Vite and some other bundlers
  if (typeof import.meta !== "undefined" && import.meta.env) {
    if (import.meta.env.VITE_CONVEX_URL) {
      return import.meta.env.VITE_CONVEX_URL;
    }
    if (import.meta.env.REACT_APP_CONVEX_URL) {
      return import.meta.env.REACT_APP_CONVEX_URL;
    }
  }

  // Fallback to a hardcoded value (not recommended for production)
  // You can uncomment and update this for testing
  // return "https://valiant-lemur-724.convex.cloud";

  console.error(
    "No Convex URL found in environment variables. Make sure you have a .env.local file with REACT_APP_CONVEX_URL."
  );
  return "";
}

const convexUrl = getConvexUrl();

// Only create the client if we have a URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }) {
  if (!convex) {
    // You could render a fallback UI here if the Convex client isn't initialized
    return (
      <div>
        Error: Convex client not initialized. Check your environment variables.
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
