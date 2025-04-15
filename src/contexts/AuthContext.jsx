// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // For non-admin routes, you might still want to have some basic state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Basic stub methods (you might not need these for public pages)
  const value = {
    isAuthenticated,
    loading,
    // Add any non-Convex auth methods here if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
