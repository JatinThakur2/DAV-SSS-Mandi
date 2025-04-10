// src/convex/ConvexClientProvider.jsx
import React, { createContext, useContext } from "react";

// Mock context for Convex
const ConvexContext = createContext({
  useMutation: () => () => {},
  useQuery: () => [],
  useAction: () => () => {},
});

// Custom hooks to mock Convex functions
export const useMutation = () => {
  return () => Promise.resolve({ success: true });
};

export const useQuery = () => {
  return [];
};

export const useAction = () => {
  return () => Promise.resolve({});
};

// Mock provider
export const ConvexProvider = ({ children }) => {
  const value = {
    useMutation,
    useQuery,
    useAction,
  };

  return (
    <ConvexContext.Provider value={value}>{children}</ConvexContext.Provider>
  );
};

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider>{children}</ConvexProvider>;
}
