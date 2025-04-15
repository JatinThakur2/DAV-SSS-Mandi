// src/contexts/AuthContext.jsx
import React, { createContext, useContext } from "react";
import { useConvexAvailable } from "../utils/ConvexClientProvider";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Basic state for public pages - kept simple
  const isAuthenticated = false;
  const loading = false;
  const user = null;

  // Check if Convex is available
  const isConvexAvailable = useConvexAvailable();

  // Basic stub methods (for public pages we don't need Convex integration)
  const value = {
    isAuthenticated,
    loading,
    user,
    isConvexAvailable,
    // Add any non-Convex auth methods here if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
